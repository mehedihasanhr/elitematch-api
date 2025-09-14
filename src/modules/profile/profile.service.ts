import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/cores/modules/prisma/prisma.service';
import type { Prisma } from '@prisma/client';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';

@Injectable()
export class ProfileService {
  /**
   * ProfileService constructor
   * @param prisma - PrismaService instance used to access the database.
   */
  constructor(private prisma: PrismaService) {}

  /**
   * Create a new profile record.
   *
   * Maps the incoming CreateProfileDto to a Prisma-compatible payload and
   * persists it to the database.
   *
   * @param data - DTO containing profile fields supplied by the client.
   * @returns The newly created profile record.
   */
  async create(data: CreateProfileDto) {
    const payload: Prisma.ProfileUncheckedCreateInput = {
      userId: data.userId,
      avatar: data.avatar,
      occupation: data.occupation,
      dateOfBirth: new Date(data.dateOfBirth),
      bio: data.bio,
      city: data.city,
    } as Prisma.ProfileUncheckedCreateInput;

    return this.prisma.profile.create({ data: payload });
  }

  /**
   * Retrieve all profile records.
   *
   * This returns a list of profiles. Pagination, filtering and projection
   * can be added later if needed.
   *
   * @returns An array of profile records.
   */
  async findAll() {
    return this.prisma.profile.findMany();
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
  async update(id: number, data: UpdateProfileDto) {
    const payload: Prisma.ProfileUncheckedUpdateInput =
      {} as Prisma.ProfileUncheckedUpdateInput;
    if (data.userId !== undefined) payload.userId = data.userId;
    if (data.avatar !== undefined) payload.avatar = data.avatar;
    if (data.occupation !== undefined) payload.occupation = data.occupation;
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
