import { Injectable, NotFoundException } from '@nestjs/common';
import { paginate } from 'src/utils/paginate';
import { PrismaService } from 'src/cores/modules/prisma/prisma.service';
import type { Prisma } from '@prisma/client';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { FileService } from '../../cores/modules/file/file.service';

@Injectable()
export class ProfileService {
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
  async create(data: CreateProfileDto, file: Express.Multer.File) {
    let coverId: number | null = null;

    if (file) {
      const savedFile = await this.fileService.processAndSaveFile(file);
      coverId = savedFile.id;
    }

    const payload: Prisma.ProfileUncheckedCreateInput = {
      userId: data.userId,
      avatarId: coverId ?? undefined,
      introductionVideoLink: data.introductionVideoLink,
      dateOfBirth: new Date(data.dateOfBirth),
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
    } as Prisma.ProfileUncheckedCreateInput;

    const profile = await this.prisma.profile.create({ data: payload });

    // record file use
    if (coverId) {
      await this.prisma.fileUsage.create({
        data: {
          fileId: coverId,
          model: 'profile',
          modelId: profile.id,
        },
      });
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
  async findOne(id: number) {
    const item = await this.prisma.profile.findUnique({ where: { id } });
    if (!item) throw new NotFoundException('Profile not found');
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
  async update(id: number, data: UpdateProfileDto, file?: Express.Multer.File) {
    const payload: Prisma.ProfileUncheckedUpdateInput =
      {} as Prisma.ProfileUncheckedUpdateInput;
    let newFileId: number | null = null;
    if (file) {
      const savedFile = await this.fileService.processAndSaveFile(file);
      newFileId = savedFile.id;
    }
    if (newFileId !== null) {
      payload.avatarId = newFileId;
    } else if (data.avatarId !== undefined) {
      payload.avatarId = data.avatarId;
    }
    if (data.occupationId !== undefined)
      payload.occupationId = data.occupationId;
    if (data.educationLevelId !== undefined)
      payload.educationLevelId = data.educationLevelId;
    if (data.incomeRangeId !== undefined)
      payload.incomeRangeId = data.incomeRangeId;
    if (data.relationshipStatusId !== undefined)
      payload.relationshipStatusId = data.relationshipStatusId;
    if (data.dateOfBirth !== undefined) {
      payload.dateOfBirth = new Date(data.dateOfBirth);
    }
    if (data.bio !== undefined) payload.bio = data.bio;
    if (data.city !== undefined) payload.city = data.city;

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
}
