import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import type { Prisma } from '@prisma/client';
import { FileService } from 'src/cores/modules/file/file.service';
import { PrismaService } from 'src/cores/modules/prisma/prisma.service';
import { paginate } from 'src/utils/paginate';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';

@Injectable()
export class ProfileService {
  private baseInclude = {
    user: {
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
      },
    },
    avatars: true,
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
  };

  /**
   * ProfileService constructor
   * @param prisma - PrismaService instance used to access the database.
   */
  constructor(
    private prisma: PrismaService,
    private fileService: FileService,
  ) {}

  /**
   * Create a new profile record.
   *
   * Maps the incoming CreateProfileDto to a Prisma-compatible payload and
   * persists it to the database.
   *
   * @param data - DTO containing profile fields supplied by the client.
   * @returns The newly created profile record.
   */
  async create(data: CreateProfileDto, files: Express.Multer.File[]) {
    const coverIds: number[] = [];

    if (files) {
      for (const file of files) {
        const savedFile = await this.fileService.processAndSaveFile(file);
        coverIds.push(savedFile.id);
      }
    }

    const existingProfile = await this.prisma.profile.findUnique({
      where: { userId: data.userId },
    });

    if (existingProfile)
      throw new BadRequestException('User already has a profile');

    const payload: Prisma.ProfileUncheckedCreateInput = {
      userId: data.userId,
      avatars: {
        connect: coverIds.map((id) => ({ id })),
      },
      introductionVideoLink: data.introductionVideoLink,
      dateOfBirth: data.dateOfBirth ? new Date(data.dateOfBirth) : undefined,
      occupationId: data.occupationId ?? undefined,
      educationLevelId: data.educationLevelId ?? undefined,
      incomeRangeId: data.incomeRangeId ?? undefined,
      relationshipStatusId: data.relationshipStatusId ?? undefined,
      gender: data.gender ?? undefined,
      bio: data.bio ?? undefined,
      city: data.city ?? undefined,
      state: data.state ?? undefined,
      zipCode: data.zipCode ?? undefined,
      country: data.country ?? undefined,
      height: data.height ?? undefined,
      weight: data.weight ?? undefined,
      noOfChildren: data.noOfChildren ?? undefined,
      specificPartnerPreferences: data.specificPartnerPreferences ?? undefined,
      expectationsFromMatchmaker: data.expectationsFromMatchmaker ?? undefined,
      questionForMatchmaker: data.questionForMatchmaker ?? undefined,
      pastRelationshipExperience: data.pastRelationshipExperience ?? undefined,
      lessonsLearnedFromPastRelationships:
        data.lessonsLearnedFromPastRelationships ?? undefined,
      patternsToAvoidInRelationships:
        data.patternsToAvoidInRelationships ?? undefined,
      ethnicities: data.ethnicities
        ? { connect: data.ethnicities.map((id) => ({ id })) }
        : undefined,
      religions: data.religions
        ? { connect: data.religions.map((id) => ({ id })) }
        : undefined,
      partnerQualities: data.partnerQualities
        ? { connect: data.partnerQualities.map((id) => ({ id })) }
        : undefined,
      backgroundPreferences: data.backgroundPreferences
        ? { connect: data.backgroundPreferences.map((id) => ({ id })) }
        : undefined,
      physicalAttributes: data.physicalAttributes
        ? { connect: data.physicalAttributes.map((id) => ({ id })) }
        : undefined,
      agePreferences: data.agePreferences
        ? { connect: data.agePreferences.map((id) => ({ id })) }
        : undefined,
      lifeStyle: data.lifeStyle
        ? { connect: data.lifeStyle.map((id) => ({ id })) }
        : undefined,
      coreValues: data.coreValues
        ? { connect: data.coreValues.map((id) => ({ id })) }
        : undefined,
      socialActivities: data.socialActivities
        ? { connect: data.socialActivities.map((id) => ({ id })) }
        : undefined,
      relocation: data.relocation
        ? { connect: data.relocation.map((id) => ({ id })) }
        : undefined,
      relationshipExpectations: data.relationshipExpectations
        ? { connect: data.relationshipExpectations.map((id) => ({ id })) }
        : undefined,
      idealRelationships: data.idealRelationships
        ? { connect: data.idealRelationships.map((id) => ({ id })) }
        : undefined,
      relationshipTimeline: data.relationshipTimeline
        ? { connect: data.relationshipTimeline.map((id) => ({ id })) }
        : undefined,
      familyAspirations: data.familyAspirations
        ? { connect: data.familyAspirations.map((id) => ({ id })) }
        : undefined,
      personalityTraits: data.personalityTraits
        ? { connect: data.personalityTraits.map((id) => ({ id })) }
        : undefined,
      personalInterests: data.personalInterests
        ? { connect: data.personalInterests.map((id) => ({ id })) }
        : undefined,
      intellectualInterests: data.intellectualInterests
        ? { connect: data.intellectualInterests.map((id) => ({ id })) }
        : undefined,
      wellnessInterests: data.wellnessInterests
        ? { connect: data.wellnessInterests.map((id) => ({ id })) }
        : undefined,
      socialCircles: data.socialCircles
        ? { connect: data.socialCircles.map((id) => ({ id })) }
        : undefined,
      luxuryAlignment: data.luxuryAlignment
        ? { connect: data.luxuryAlignment.map((id) => ({ id })) }
        : undefined,
      allergies: data.allergies
        ? { connect: data.allergies.map((id) => ({ id })) }
        : undefined,
      culturalFits: data.culturalFits
        ? { connect: data.culturalFits.map((id) => ({ id })) }
        : undefined,
      loveLanguage: data.loveLanguage
        ? { connect: data.loveLanguage.map((id) => ({ id })) }
        : undefined,
      preferedDates: data.preferedDates
        ? { connect: data.preferedDates.map((id) => ({ id })) }
        : undefined,
      reasonsForUsing: data.reasonsForUsing
        ? { connect: data.reasonsForUsing.map((id) => ({ id })) }
        : undefined,
    };

    const profile = await this.prisma.profile.create({ data: payload });

    // record file use
    if (coverIds) {
      await Promise.all(
        coverIds.map(
          async (id) =>
            await this.prisma.fileUsage.create({
              data: {
                fileId: id,
                model: 'profile',
                modelId: profile.id,
              },
            }),
        ),
      );
    }

    return profile;
  }

  /**
   * Retrieve all profile records.
   *
   * This returns a list of profiles. Pagination, filtering and projection
   * can be added later if needed.
   *
   * @returns An array of profile records.
   */
  async findAll(page = 1, limit = 20) {
    const take = Math.max(1, Number(limit));
    const currentPage = Math.max(1, Number(page));

    const [items, total] = await this.prisma.$transaction([
      this.prisma.profile.findMany({
        skip: (currentPage - 1) * take,
        take,
        orderBy: { id: 'desc' },
        include: this.baseInclude,
      }),
      this.prisma.profile.count(),
    ]);

    return paginate(items, { total, page: currentPage, limit: take });
  }

  /**
   * Retrieve a single profile by its numeric identifier.
   *
   * Throws NotFoundException when the profile does not exist.
   *
   * @param id - Numeric identifier of the profile to retrieve.
   * @returns The profile record if found.
   * @throws NotFoundException when no profile matches the given id.
   */
  async findOne(id: number, viewerId: number) {
    const item = await this.prisma.profile.findUnique({
      where: { id },
      include: this.baseInclude,
    });

    if (!item) {
      throw new NotFoundException('Profile not found');
    }

    // Prevent self-chat (optional, but recommended)
    if (viewerId === item.user.id) {
      return {
        ...item,
        existingChat: null,
      };
    }

    // Correctly find chat that includes BOTH users
    const existingChat = await this.prisma.chat.findFirst({
      where: {
        AND: [
          { users: { some: { id: viewerId } } },
          { users: { some: { id: item.user.id } } },
        ],
        users: {
          // Ensure exactly 2 users (optional: only if you want strict 1-on-1)
          // Remove this if you allow group chats that include both
          // none: { id: { notIn: [viewerId, item.user.id] } }, // no extra users
        },
      },
      select: { id: true },
      orderBy: { updatedAt: 'desc' },
    });
    return {
      ...item,
      existingChat: existingChat ?? null,
    };
  }

  async findByUserId(id: number) {
    const item = await this.prisma.profile.findUnique({
      where: { userId: id },
      include: this.baseInclude,
    });

    if (!item) {
      throw new NotFoundException('Profile not found');
    }

    return item;
  }

  /**
   * Update an existing profile.
   *
   * Only the fields provided in the UpdateProfileDto will be written to the
   * database. The method maps optional DTO fields into a Prisma update payload
   * and performs a partial update.
   *
   * @param id - Numeric identifier of the profile to update.
   * @param data - DTO containing fields to update.
   * @returns The updated profile record.
   */
  async update(
    id: number,
    data: UpdateProfileDto,
    files?: Express.Multer.File[],
  ) {
    const coverIds: number[] = [];

    if (files) {
      for (const file of files) {
        const savedFile = await this.fileService.processAndSaveFile(file);
        coverIds.push(savedFile.id);
        await this.prisma.fileUsage.create({
          data: {
            fileId: savedFile.id,
            model: 'profile',
            modelId: id,
          },
        });
      }
    }

    const payload: Prisma.ProfileUncheckedUpdateInput = {
      ...(data.userId ? { userId: data.userId } : {}),
      avatars: {
        connect: coverIds.map((id) => ({ id })),
      },
      introductionVideoLink: data.introductionVideoLink,
      dateOfBirth: data.dateOfBirth ? new Date(data.dateOfBirth) : undefined,
      occupationId: data.occupationId ?? undefined,
      educationLevelId: data.educationLevelId ?? undefined,
      incomeRangeId: data.incomeRangeId ?? undefined,
      relationshipStatusId: data.relationshipStatusId ?? undefined,
      gender: data.gender ?? undefined,
      bio: data.bio ?? undefined,
      city: data.city ?? undefined,
      state: data.state ?? undefined,
      zipCode: data.zipCode ?? undefined,
      country: data.country ?? undefined,
      height: data.height ?? undefined,
      weight: data.weight ?? undefined,
      noOfChildren: data.noOfChildren ?? undefined,
      specificPartnerPreferences: data.specificPartnerPreferences ?? undefined,
      expectationsFromMatchmaker: data.expectationsFromMatchmaker ?? undefined,
      questionForMatchmaker: data.questionForMatchmaker ?? undefined,
      pastRelationshipExperience: data.pastRelationshipExperience ?? undefined,
      lessonsLearnedFromPastRelationships:
        data.lessonsLearnedFromPastRelationships ?? undefined,
      patternsToAvoidInRelationships:
        data.patternsToAvoidInRelationships ?? undefined,
      ethnicities: data.ethnicities
        ? { connect: data.ethnicities.map((id) => ({ id })) }
        : undefined,
      religions: data.religions
        ? { connect: data.religions.map((id) => ({ id })) }
        : undefined,
      partnerQualities: data.partnerQualities
        ? { connect: data.partnerQualities.map((id) => ({ id })) }
        : undefined,
      backgroundPreferences: data.backgroundPreferences
        ? { connect: data.backgroundPreferences.map((id) => ({ id })) }
        : undefined,
      physicalAttributes: data.physicalAttributes
        ? { connect: data.physicalAttributes.map((id) => ({ id })) }
        : undefined,
      agePreferences: data.agePreferences
        ? { connect: data.agePreferences.map((id) => ({ id })) }
        : undefined,
      lifeStyle: data.lifeStyle
        ? { connect: data.lifeStyle.map((id) => ({ id })) }
        : undefined,
      coreValues: data.coreValues
        ? { connect: data.coreValues.map((id) => ({ id })) }
        : undefined,
      socialActivities: data.socialActivities
        ? { connect: data.socialActivities.map((id) => ({ id })) }
        : undefined,
      relocation: data.relocation
        ? { connect: data.relocation.map((id) => ({ id })) }
        : undefined,
      relationshipExpectations: data.relationshipExpectations
        ? { connect: data.relationshipExpectations.map((id) => ({ id })) }
        : undefined,
      idealRelationships: data.idealRelationships
        ? { connect: data.idealRelationships.map((id) => ({ id })) }
        : undefined,
      relationshipTimeline: data.relationshipTimeline
        ? { connect: data.relationshipTimeline.map((id) => ({ id })) }
        : undefined,
      familyAspirations: data.familyAspirations
        ? { connect: data.familyAspirations.map((id) => ({ id })) }
        : undefined,
      personalityTraits: data.personalityTraits
        ? { connect: data.personalityTraits.map((id) => ({ id })) }
        : undefined,
      personalInterests: data.personalInterests
        ? { connect: data.personalInterests.map((id) => ({ id })) }
        : undefined,
      intellectualInterests: data.intellectualInterests
        ? { connect: data.intellectualInterests.map((id) => ({ id })) }
        : undefined,
      wellnessInterests: data.wellnessInterests
        ? { connect: data.wellnessInterests.map((id) => ({ id })) }
        : undefined,
      socialCircles: data.socialCircles
        ? { connect: data.socialCircles.map((id) => ({ id })) }
        : undefined,
      luxuryAlignment: data.luxuryAlignment
        ? { connect: data.luxuryAlignment.map((id) => ({ id })) }
        : undefined,
      allergies: data.allergies
        ? { connect: data.allergies.map((id) => ({ id })) }
        : undefined,
      culturalFits: data.culturalFits
        ? { connect: data.culturalFits.map((id) => ({ id })) }
        : undefined,
      loveLanguage: data.loveLanguage
        ? { connect: data.loveLanguage.map((id) => ({ id })) }
        : undefined,
      preferedDates: data.preferedDates
        ? { connect: data.preferedDates.map((id) => ({ id })) }
        : undefined,
      reasonsForUsing: data.reasonsForUsing
        ? { connect: data.reasonsForUsing.map((id) => ({ id })) }
        : undefined,
    };

    return this.prisma.profile.update({ where: { id }, data: payload });
  }

  /**
   * Remove a profile record by its identifier.
   *
   * Performs a hard delete of the record. Consider soft-delete if you need an
   * audit trail or undo capability.
   *
   * @param id - Numeric identifier of the profile to delete.
   * @returns The deleted profile record.
   */
  async remove(id: number) {
    return this.prisma.profile.delete({ where: { id } });
  }

  /**
   * Unlock profile
   * @param id - Numeric identifier of the profile to unlock.
   * @param userId - User identifier of the user performing the unlock.
   */
  async unlockProfile(id: number, userId: number) {
    console.log({ id, userId });
    // check user have active subscription
    const activeSubscription = await this.prisma.subscription.findFirst({
      where: {
        userId,
        AND: [{ endDate: { gte: new Date() } }, { isActive: true }],
      },
    });

    if (!activeSubscription) {
      throw new BadRequestException('No active subscription found');
    }

    if (activeSubscription.profileViewsLeft <= 0) {
      throw new BadRequestException(
        'No profile views left in your subscription',
      );
    }

    const profile = await this.prisma.unlockedProfile.create({
      data: {
        profile: { connect: { id } },
        user: { connect: { id: userId } },
        expiry: new Date(activeSubscription.endDate!),
      },
      include: {
        profile: {
          select: {
            id: true,
            user: {
              select: { id: true, firstName: true, lastName: true },
            },
          },
        },

        user: {
          select: { id: true, firstName: true, lastName: true },
        },
      },
    });

    // decrement profileViewsLeft
    await this.prisma.subscription.update({
      where: { id: activeSubscription.id },
      data: { profileViewsLeft: { decrement: 1 } },
    });

    return {
      data: profile,
    };
  }

  /**
   *
   * List unlocked profiles for a user
   * @param userId - User identifier of the user
   */
  async getUnlockedProfiles(userId: number) {
    console.log({ userId });
    const profiles = await this.prisma.unlockedProfile.findMany({
      where: { userId },
      include: {
        profile: {
          select: {
            id: true,
            avatars: {
              select: { id: true, url: true },
            },
            user: {
              select: {
                id: true,
                firstName: true,
                lastName: true,
                avatar: { select: { id: true, url: true } },
              },
            },
          },
        },
      },
    });

    return {
      data: profiles.map((p) => p.profile),
    };
  }

  /**
   *
   * @param id - Numeric identifier of the profile to unlock.
   * @param userId - User identifier of the user performing the unlock.
   */
  async deleteProfileFile(userId: number, fileId: number) {
    // get profile
    const profile = await this.prisma.profile.findFirst({
      where: { userId },
      include: { avatars: true },
    });

    if (!profile) {
      throw new NotFoundException('Profile not found');
    }

    const isFileAssociated = profile.avatars.some(
      (avatar) => avatar.id === fileId,
    );

    if (!isFileAssociated) {
      throw new NotFoundException('File not associated with the user profile');
    }

    // remove association
    await this.prisma.profile.update({
      where: { id: profile.id },
      data: {
        avatars: {
          disconnect: { id: fileId },
        },
      },
    });

    // delete file usage record
    await this.prisma.fileUsage.deleteMany({
      where: {
        fileId,
        model: 'profile',
        modelId: profile.id,
      },
    });

    // optionally delete the file
    await this.fileService.removeExistingFile(fileId);

    return {
      message: 'File deleted successfully',
      status: 'success',
      data: null,
      statusCode: 200,
    };
  }
}
