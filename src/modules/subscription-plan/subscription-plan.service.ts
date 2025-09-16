import { Injectable, NotFoundException } from '@nestjs/common';
import type { SubscriptionPlan } from '@prisma/client';
import { PrismaService } from 'src/cores/modules/prisma/prisma.service';
import { CreateSubscriptionPlanDto } from './dto/create-subscription-plan.dto';
import { UpdateSubscriptionPlanDto } from './dto/update-subcription-plan.dto';

@Injectable()
export class SubscriptionPlanService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateSubscriptionPlanDto): Promise<SubscriptionPlan> {
    const created = await this.prisma.subscriptionPlan.create({
      data: {
        name: dto.name,
        description: dto.description,
        price: dto.price,
        duration: dto.duration,
        maxProfileView: dto.maxProfileView ?? 1,
        maxMessages: dto.maxMessages ?? 1,
        maxVideoCallMake: dto.maxVideoCallMake ?? 1,
        matchMakerAccess: dto.matchMakerAccess ?? false,
        isActive: dto.isActive ?? true,
      },
    });
    return created;
  }

  async findAll(): Promise<SubscriptionPlan[]> {
    const items = await this.prisma.subscriptionPlan.findMany({
      orderBy: { createdAt: 'desc' },
    });
    return items;
  }

  async findOne(id: number): Promise<SubscriptionPlan> {
    const plan = await this.prisma.subscriptionPlan.findUnique({
      where: { id },
    });
    if (!plan) throw new NotFoundException('Subscription plan not found');
    return plan;
  }

  async update(
    id: number,
    dto: UpdateSubscriptionPlanDto,
  ): Promise<SubscriptionPlan> {
    await this.findOne(id);

    const updated = await this.prisma.subscriptionPlan.update({
      where: { id },
      data: dto,
    });
    return updated;
  }

  async remove(id: number): Promise<{ message: string; id: number }> {
    await this.findOne(id);

    await this.prisma.subscriptionPlan.delete({ where: { id } });
    return { message: 'Subscription plan deleted', id };
  }
}
