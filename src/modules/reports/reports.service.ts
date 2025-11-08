import { Injectable } from '@nestjs/common';
import {
  format,
  parseISO,
  isValid,
  subDays,
  eachDayOfInterval,
} from 'date-fns';
import { PrismaService } from 'src/cores/modules/prisma/prisma.service';
import { RevenueReportQueryDto } from './dto/revenue-report-query.dto';

@Injectable()
export class ReportsService {
  constructor(private readonly prisma: PrismaService) {}

  /**
   * Collect various statistics for the admin dashboard
   */
  async getStatistics() {
    const statistics = await this.prisma.$transaction(async (q) => {
      // total active subscribers
      const subscribers = await q.subscription.count({
        where: {
          endDate: {
            gte: new Date(),
          },
        },
      });

      // total users without match makers
      const users = await q.user.count({
        where: { matchMaker: null },
      });

      // total match makers
      const matchMakers = await q.matchMaker.count();

      // total revenue generated (sum of subscription plan prices)
      const subsWithPlan = await q.subscription.findMany({
        include: { plan: true },
      });
      const revenueTotal = subsWithPlan.reduce(
        (acc, s) => acc + (s.plan?.price ?? 0),
        0,
      );

      return {
        subscribers,
        users,
        matchMakers,
        revenue: revenueTotal,
      };
    });

    return statistics;
  }

  /**
   * Get revenue and subscribers report
   * @QueryParams from: string (YYYY-MM-DD)
   * @QueryParams to: string (YYYY-MM-DD)
   *
   *  if from and to are not provided, default to last 30 days
   */
  async getRevenueAndSubscribersReport(query: RevenueReportQueryDto) {
    const { from, to } = this.parseDateRange(query);

    const report = await this.prisma.$transaction(async (q) => {
      // fetch subscriptions in range
      const subs = await q.subscription.findMany({
        where: {
          AND: [{ createdAt: { gte: from } }, { createdAt: { lte: to } }],
        },
        include: {
          plan: { select: { id: true, name: true, price: true } },
        },
      });

      // fetch users created in range (new subscribers/users)
      const newUsers = await q.user.findMany({
        where: { createdAt: { gte: from, lte: to } },
        select: { id: true, createdAt: true },
      });

      // snapshot of active subscribers (isActive true and endDate not passed OR endDate null)
      const activeSubscribers = await q.subscription.count({
        where: {
          OR: [{ endDate: { gte: new Date() } }],
        },
      });

      // revenue total
      const revenueTotal = subs.reduce(
        (acc, s) => acc + (s.plan?.price ?? 0),
        0,
      );

      // date series (UTC) inclusive for daily breakdown
      const days = this.buildDateSeries(from, to);
      const revenueByDay: Record<string, number> = Object.fromEntries(
        days.map((d) => [d, 0]),
      );
      const newUsersByDay: Record<string, number> = Object.fromEntries(
        days.map((d) => [d, 0]),
      );

      for (const s of subs) {
        const key = this.toDayKey(s.createdAt);
        if (key in revenueByDay) {
          revenueByDay[key] += s.plan?.price ?? 0;
        }
      }
      for (const u of newUsers) {
        const key = this.toDayKey(u.createdAt);
        if (key in newUsersByDay) {
          newUsersByDay[key] += 1;
        }
      }

      // plan breakdown
      const planBreakdownMap = new Map<
        string,
        { planId: number | null; name: string; count: number; revenue: number }
      >();
      for (const s of subs) {
        const planId = s.plan?.id ?? null;
        const name = s.plan?.name ?? 'Unknown';
        const price = s.plan?.price ?? 0;
        const key = `${planId ?? 'null'}`;
        const cur = planBreakdownMap.get(key) ?? {
          planId,
          name,
          count: 0,
          revenue: 0,
        };
        cur.count += 1;
        cur.revenue += price;
        planBreakdownMap.set(key, cur);
      }

      return {
        range: { from: from.toISOString(), to: to.toISOString() },
        totals: {
          revenue: revenueTotal,
          newUsers: newUsers.length,
          activeSubscribers,
        },
        daily: days.map((d) => ({
          date: d,
          revenue: revenueByDay[d],
          newUsers: newUsersByDay[d],
        })),
        planBreakdown: Array.from(planBreakdownMap.values()),
      };
    });

    return report;
  }

  /**
   * Parse date range from query with defaults to last 30 days
   */
  private parseDateRange(query?: { from?: string; to?: string }) {
    const now = new Date();
    // default range: last 30 full days ending today
    let rawFrom = query?.from ? parseISO(query.from) : subDays(now, 30);
    let rawTo = query?.to ? parseISO(query.to) : now;

    if (!isValid(rawFrom)) rawFrom = subDays(now, 30);
    if (!isValid(rawTo)) rawTo = now;

    // Ensure chronological order
    if (rawFrom > rawTo) {
      const tmp = rawFrom;
      rawFrom = rawTo;
      rawTo = tmp;
    }

    // Normalize to UTC midnight boundaries (inclusive)
    const fromUtc = new Date(
      Date.UTC(
        rawFrom.getUTCFullYear(),
        rawFrom.getUTCMonth(),
        rawFrom.getUTCDate(),
      ),
    );
    const toUtc = new Date(
      Date.UTC(rawTo.getUTCFullYear(), rawTo.getUTCMonth(), rawTo.getUTCDate()),
    );

    return { from: fromUtc, to: toUtc };
  }

  /**
   * Build a list of YYYY-MM-DD (UTC) between from and to inclusive
   */
  private buildDateSeries(from: Date, to: Date): string[] {
    // both from/to are already UTC midnight dates
    const list = eachDayOfInterval({ start: from, end: to });
    return list.map((d) => this.toDayKey(d));
  }

  /**
   * Convert a date to YYYY-MM-DD (UTC)
   */
  private toDayKey(d: Date): string {
    // Format UTC date (midnight) with date-fns
    const utcMidnight = new Date(
      Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate()),
    );
    return format(utcMidnight, 'yyyy-MM-dd');
  }
}
