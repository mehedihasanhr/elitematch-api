import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/cores/modules/prisma/prisma.service';
import { paginate } from 'src/utils/paginate';
import { CreateMatchCalculatorDto } from './dto/create-match-calculator.dto';

@Injectable()
export class MatchCalculatorService {
  constructor(private prisma: PrismaService) { }

  async create(
    createMatchCalculatorDto: CreateMatchCalculatorDto,
    authId: number,
  ) {
    const matchCouples = await this.prisma.matchCouple.create({
      data: {
        ...createMatchCalculatorDto,
        creatorId: authId,
      },
    });

    return {
      data: matchCouples,
      message: 'Match couple created successfully',
      status: 'success',
      statusCode: 201,
    };
  }

  /**
   *  List all match calculations with pagination and optional filtering.
   *  @param query - Query parameters for pagination and filtering
   */
  async findAll(query?: Record<string, unknown>, authId?: number) {
    const page = query?.page ? Number(query.page) : 1;
    const limit = query?.limit ? Number(query.limit) : 10;
    const skip = (page - 1) * limit;
    // const search =
    //   typeof query?.search === 'string'
    //     ? String(query.search).toLowerCase()
    //     : null;

    const [items, total] = await this.prisma.$transaction([
      this.prisma.user.findMany({
        where: { id: { not: authId }, matchMaker: null },
        skip,
        take: limit,
        orderBy: { id: 'asc' },
      }),
      this.prisma.user.count({
        where: { id: { not: authId }, matchMaker: null },
      }),
    ]);

    if (!items?.length) {
      return paginate(items, { total, page, limit });
    }

    const withMatchScores = await Promise.all(
      items.map(async (user) => {
        const matchScore = await this.calculateMatchScore(authId || 0, user.id);
        return { ...user, matchScore };
      }),
    );

    return paginate(withMatchScores, {
      total,
      page,
      limit,
    });
  }

  /**
   * Update match couple details
   *
   * @param id - ID of the match couple to update
   * @param data - Data to update the match couple with
   * @returns Updated match couple
   */
  async updateMatchCouple(id: number, data: Partial<CreateMatchCalculatorDto>) {
    const matchCouple = await this.prisma.matchCouple.findUnique({
      where: { id },
    });

    if (!matchCouple) {
      throw new NotFoundException('Match couple not found');
    }

    const updatedMatchCouple = await this.prisma.matchCouple.update({
      where: { id },
      data,
    });

    return {
      data: updatedMatchCouple,
      message: 'Match couple updated successfully',
      status: 'success',
      statusCode: 200,
    };
  }

  /**
   * Delete a match couple by ID
   *
   * @param id - ID of the match couple to delete
   * @returns Deleted match couple
   */
  async deleteMatchCouple(id: number) {
    const matchCouple = await this.prisma.matchCouple.findUnique({
      where: { id },
    });

    if (!matchCouple) {
      throw new NotFoundException('Match couple not found');
    }

    await this.prisma.matchCouple.delete({
      where: { id },
    });

    return {
      data: matchCouple,
      message: 'Match couple deleted successfully',
      status: 'success',
      statusCode: 200,
    };
  }

  /**
   * Match Couple created by match makers
   * @param id - ID of the match couple to retrieve
   */
  async findOneMatchCouple(id: number) {
    const matchCouple = await this.prisma.matchCouple.findUnique({
      where: { id },
      include: {
        matchMaker: { omit: { password: true } },
        coupleA: { omit: { password: true } },
        coupleB: { omit: { password: true } },
      },
    });
    return matchCouple;
  }

  /**
   * Match created by match makers
   *
   * @param query - Query parameters for pagination and filtering
   */
  async findAllMatchCouples(query?: Record<string, unknown>) {
    const page = query?.page ? Number(query.page) : 1;
    const limit = query?.limit ? Number(query.limit) : 10;
    const skip = (page - 1) * limit;
    const search =
      typeof query?.search === 'string'
        ? String(query.search).trim().toLowerCase()
        : null;

    let where = {};

    if (search) {
      const terms = search.split(/\s+/); // split "super admin" → ["super", "admin"]

      where = {
        AND: terms.map((term) => ({
          OR: [
            {
              coupleA: {
                OR: [
                  { firstName: { contains: term } },
                  { lastName: { contains: term } },
                  { email: { contains: term } },
                ],
              },
            },
            {
              coupleB: {
                OR: [
                  { firstName: { contains: term } },
                  { lastName: { contains: term } },
                  { email: { contains: term } },
                ],
              },
            },
          ],
        })),
      };
    }

    const [items, total] = await this.prisma.$transaction([
      this.prisma.matchCouple.findMany({
        skip,
        take: limit,
        orderBy: { id: 'asc' },
        where,
        include: {
          matchMaker: {
            omit: { password: true },
          },
          coupleA: {
            omit: { password: true },
          },
          coupleB: {
            omit: { password: true },
          },
        },
      }),
      this.prisma.matchCouple.count({ where }),
    ]);

    return paginate(items, {
      total,
      page,
      limit,
    });
  }

  /**
   * Calculate the match score between two users based on their profiles.
   * @param userAId - The ID of the first user
   * @param userBId - The ID of the second user
   * @returns An object containing the match score and breakdown
   */
  async calculateMatchScore(userAId: number, userBId: number) {
    const include = {
      user: {
        select: { id: true, firstName: true, lastName: true, email: true },
      },
      occupation: true,
      educationLevel: true,
      incomeRange: true,
      relationshipStatus: true,
      ethnicities: true,
      religions: true,
      partnerQualities: true,
      backgroundPreferences: true,
      physicalAttributes: true,
      agePreferences: true,
      lifeStyle: true,
      coreValues: true,
      socialActivities: true,
      relocation: true,
      relationshipExpectations: true,
      idealRelationships: true,
      relationshipTimeline: true,
      familyAspirations: true,
      personalityTraits: true,
      personalInterests: true,
      intellectualInterests: true,
      wellnessInterests: true,
      socialCircles: true,
      luxuryAlignment: true,
      allergies: true,
      culturalFits: true,
      loveLanguage: true,
      preferedDates: true,
      reasonsForUsing: true,
      avatars: true,
    } as const;

    const [profileA, profileB] = await Promise.all([
      this.prisma.profile.findUnique({ where: { userId: userAId }, include }),
      this.prisma.profile.findUnique({ where: { userId: userBId }, include }),
    ]);

    if (!profileA || !profileB) {
      throw new NotFoundException('One or both profiles not found');
    }

    // helpers
    const getAge = (dob?: Date | string | null): number | null => {
      if (!dob) return null;
      let d: Date;
      if (dob instanceof Date) d = dob;
      else d = new Date(String(dob));
      if (Number.isNaN(d.getTime())) return null;
      const diff = Date.now() - d.getTime();
      return Math.floor(diff / (1000 * 60 * 60 * 24 * 365.25));
    };

    const extractId = (x: unknown): number | string | null => {
      if (x === null || x === undefined) return null;
      if (typeof x === 'object') {
        const obj = x as Record<string, unknown>;
        const id = obj['id'];
        if (id === null || id === undefined) return null;
        if (typeof id === 'number' || typeof id === 'string') return id;
        return null;
      }
      if (typeof x === 'number' || typeof x === 'string') return x;
      return null;
    };

    const jaccard = (a?: unknown[] | null, b?: unknown[] | null): number => {
      const idsA = (a || [])
        .map((x) => extractId(x))
        .filter((v): v is number | string => v !== null);
      const idsB = (b || [])
        .map((x) => extractId(x))
        .filter((v): v is number | string => v !== null);

      const setA = new Set(idsA);
      const setB = new Set(idsB);
      if (setA.size === 0 && setB.size === 0) return 0.5;
      const intersection = [...setA].filter((x) => setB.has(x));
      const union = new Set([...setA, ...setB]);
      return intersection.length / (union.size || 1);
    };

    const equalScalar = (a: unknown, b: unknown): number => {
      if (a !== undefined && b !== undefined && a !== null && b !== null) {
        return a === b ? 1 : 0;
      }
      return 0.5;
    };

    // weights (sum ~1)
    const weights = {
      age: 0.15,
      location: 0.12,
      education: 0.06,
      occupation: 0.06,
      income: 0.06,
      coreValues: 0.1,
      personality: 0.1,
      interests: 0.1,
      lifestyle: 0.05,
      cultureReligion: 0.05,
      loveLanguage: 0.03,
      preferedDates: 0.02,
      other: 0.06,
    } as const;

    // age
    const ageA = getAge(profileA.dateOfBirth as Date | string | null);
    const ageB = getAge(profileB.dateOfBirth as Date | string | null);
    let ageScore = 0.5;
    if (ageA !== null && ageB !== null) {
      const diff = Math.abs(ageA - ageB);
      ageScore = Math.max(0, 1 - diff / 20);
    }

    // location
    let locationScore = 0.5;
    if (profileA.city && profileB.city && profileA.city === profileB.city) {
      locationScore = 1;
    } else if (
      profileA.country &&
      profileB.country &&
      profileA.country === profileB.country
    ) {
      locationScore = 0.8;
    } else if (profileA.country || profileB.country) {
      locationScore = 0.3;
    }

    const educationScore = equalScalar(
      profileA.educationLevelId,
      profileB.educationLevelId,
    );
    const occupationScore = equalScalar(
      profileA.occupationId,
      profileB.occupationId,
    );
    const incomeScore = equalScalar(
      profileA.incomeRangeId,
      profileB.incomeRangeId,
    );

    const coreValuesScore = jaccard(profileA.coreValues, profileB.coreValues);
    const personalityScore = jaccard(
      profileA.personalityTraits,
      profileB.personalityTraits,
    );

    const interestsA = [
      ...(profileA.personalInterests || []),
      ...(profileA.intellectualInterests || []),
      ...(profileA.wellnessInterests || []),
    ];
    const interestsB = [
      ...(profileB.personalInterests || []),
      ...(profileB.intellectualInterests || []),
      ...(profileB.wellnessInterests || []),
    ];
    const interestsScore = jaccard(interestsA, interestsB);

    const lifestyleScore = jaccard(profileA.lifeStyle, profileB.lifeStyle);

    const cultureRel1 = jaccard(profileA.religions, profileB.religions);
    const cultureRel2 = jaccard(profileA.culturalFits, profileB.culturalFits);
    const cultureRel3 = jaccard(profileA.ethnicities, profileB.ethnicities);
    const cultureReligionScore = (cultureRel1 + cultureRel2 + cultureRel3) / 3;

    const loveLanguageScore = jaccard(
      profileA.loveLanguage,
      profileB.loveLanguage,
    );
    const preferedDatesScore = jaccard(
      profileA.preferedDates,
      profileB.preferedDates,
    );

    const other1 = jaccard(
      profileA.partnerQualities,
      profileB.partnerQualities,
    );
    const other2 = jaccard(
      profileA.backgroundPreferences,
      profileB.backgroundPreferences,
    );
    const other3 = jaccard(
      profileA.relationshipExpectations,
      profileB.relationshipExpectations,
    );
    const otherScore = (other1 + other2 + other3) / 3;

    const total =
      ageScore * weights.age +
      locationScore * weights.location +
      educationScore * weights.education +
      occupationScore * weights.occupation +
      incomeScore * weights.income +
      coreValuesScore * weights.coreValues +
      personalityScore * weights.personality +
      interestsScore * weights.interests +
      lifestyleScore * weights.lifestyle +
      cultureReligionScore * weights.cultureReligion +
      loveLanguageScore * weights.loveLanguage +
      preferedDatesScore * weights.preferedDates +
      otherScore * weights.other;

    const score = Math.round(Math.min(1, Math.max(0, total)) * 100);

    const breakdown = {
      age: Math.round(ageScore * 100),
      location: Math.round(locationScore * 100),
      education: Math.round(educationScore * 100),
      occupation: Math.round(occupationScore * 100),
      income: Math.round(incomeScore * 100),
      coreValues: Math.round(coreValuesScore * 100),
      personality: Math.round(personalityScore * 100),
      interests: Math.round(interestsScore * 100),
      lifestyle: Math.round(lifestyleScore * 100),
      cultureReligion: Math.round(cultureReligionScore * 100),
      loveLanguage: Math.round(loveLanguageScore * 100),
      preferedDates: Math.round(preferedDatesScore * 100),
      other: Math.round(otherScore * 100),
    };

    return {
      score,
      breakdown,
      profileA: {
        userId: profileA.userId,
        id: profileA.id,
        avatars: profileA.avatars,
        firstName: profileA.user?.firstName,
        lastName: profileA.user?.lastName,
        email: profileA.user?.email,
      },
      profileB: {
        userId: profileB.userId,
        id: profileB.id,
        avatars: profileB.avatars,
        firstName: profileB.user?.firstName,
        lastName: profileB.user?.lastName,
        email: profileB.user?.email,
      },
    };
  }
}
