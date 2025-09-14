import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/cores/modules/prisma/prisma.service';
import { CreateRelationDto } from './dto/create-relation.dto';
import { UpdateRelationDto } from './dto/update-relation.dto';

// Small typed shape for Prisma delegate operations we use here.
type PrismaCrudDelegate = {
  create: (args: { data: unknown }) => Promise<unknown>;
  findMany: (args?: unknown) => Promise<unknown[]>;
  findUnique: (args: { where: { id: number } }) => Promise<unknown>;
  update: (args: { where: { id: number }; data: unknown }) => Promise<unknown>;
  delete: (args: { where: { id: number } }) => Promise<unknown>;
};

@Injectable()
export class ProfileRelationsService {
  constructor(private prisma: PrismaService) {}

  private supportedModels = new Set([
    'lifeStyle',
    'coreValues',
    'culturalReligiousPreference',
    'socialActivity',
    'relocation',
    'relationshipExpectation',
    'idealRelationship',
    'relationshipTimeline',
    'familyAspiration',
    'personalityTrait',
    'personalInterest',
    'intellectualInterest',
    'wellnessInterest',
    'socialCircle',
    'luxuryAlignment',
    'ethnicity',
    'religion',
    'partnerQuality',
    'backgroundPreference',
    'physicalAttribute',
    'agePreference',
  ]);

  private modelNameToPrismaKey(name: string) {
    const map: Record<string, string> = {
      lifeStyle: 'lifeStyle',
      coreValues: 'coreValues',
      culturalReligiousPreference: 'culturalReligiousPreference',
      socialActivity: 'socialActivity',
      relocation: 'relocation',
      relationshipExpectation: 'relationshipExpectation',
      idealRelationship: 'idealRelationship',
      relationshipTimeline: 'relationshipTimeline',
      familyAspiration: 'familyAspiration',
      personalityTrait: 'personalityTrait',
      personalInterest: 'personalInterest',
      intellectualInterest: 'intellectualInterest',
      wellnessInterest: 'wellnessInterest',
      socialCircle: 'socialCircle',
      luxuryAlignment: 'luxuryAlignment',
      ethnicity: 'ethnicity',
      religion: 'religion',
      partnerQuality: 'partnerQuality',
      backgroundPreference: 'backgroundPreference',
      physicalAttribute: 'physicalAttribute',
      agePreference: 'agePreference',
    };
    return map[name];
  }

  private ensureSupported(model: string) {
    if (!this.supportedModels.has(model)) {
      throw new BadRequestException(`Model ${model} not supported`);
    }
  }

  /**
   * Return a typed Prisma delegate for basic CRUD operations.
   * Throws BadRequestException when the delegate is not present on the Prisma client.
   */
  private getDelegate(key: string): PrismaCrudDelegate {
    const clientAsRecord = this.prisma as unknown as Record<string, unknown>;
    const maybe = clientAsRecord[key];
    if (!maybe || typeof maybe !== 'object') {
      const msg = 'Prisma delegate for key "' + key + '" not found';
      throw new BadRequestException(msg);
    }
    return maybe as PrismaCrudDelegate;
  }

  /**
   * Create a new record for the specified profile-related relation model.
   * Inputs: model - model key, data - partial object for the target model.
   * Returns: created record from Prisma.
   */
  async create(
    model: string,
    dto: CreateRelationDto,
    userId?: number,
  ): Promise<unknown> {
    this.ensureSupported(model);
    const key = this.modelNameToPrismaKey(model);
    const delegate = this.getDelegate(key);

    const data = { ...dto } as Record<string, unknown>;
    if (userId !== undefined) {
      data['createdBy'] = userId;
      data['updatedBy'] = userId;
    }

    return await delegate.create({
      data,
    });
  }

  /**
   * Retrieve all records for the specified relation model.
   * Returns an array of records.
   */
  async findAll(model: string): Promise<unknown[]> {
    this.ensureSupported(model);
    const key = this.modelNameToPrismaKey(model);
    const delegate = this.getDelegate(key);
    return await delegate.findMany();
  }

  /**
   * Retrieve a single record by id. Throws NotFoundException when missing.
   */
  async findOne(model: string, id: number): Promise<unknown> {
    this.ensureSupported(model);
    const key = this.modelNameToPrismaKey(model);
    const delegate = this.getDelegate(key);
    const item = await delegate.findUnique({ where: { id } });
    if (!item) throw new NotFoundException();
    return item;
  }

  /**
   * Update an existing record by id. Returns the updated record.
   */
  async update(
    model: string,
    id: number,
    dto: UpdateRelationDto,
    userId?: number,
  ): Promise<unknown> {
    this.ensureSupported(model);
    const key = this.modelNameToPrismaKey(model);
    const delegate = this.getDelegate(key);
    const data = { ...dto } as Record<string, unknown>;
    if (userId !== undefined) data['updatedBy'] = userId;
    return await delegate.update({ where: { id }, data });
  }

  /**
   * Permanently delete a record by id. Returns the deleted record.
   */
  async remove(model: string, id: number): Promise<unknown> {
    this.ensureSupported(model);
    const key = this.modelNameToPrismaKey(model);
    const delegate = this.getDelegate(key);
    return await delegate.delete({ where: { id } });
  }
}
