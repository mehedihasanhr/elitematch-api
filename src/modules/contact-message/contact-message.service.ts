import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateContactMessageDto } from './dto/create-contact-message.dto';
import { UpdateContactMessageDto } from './dto/update-contact-message.dto';
import { PrismaService } from 'src/cores/modules/prisma/prisma.service';
import { paginate } from 'src/utils/paginate';
import { Prisma } from '@prisma/client';

@Injectable()
export class ContactMessageService {
  constructor(private readonly prisma: PrismaService) {}

  /**
   * Create a new contact message
   * @param createContactMessageDto - Data Transfer Object for creating a contact message
   */
  async create(createContactMessageDto: CreateContactMessageDto) {
    const contactMessage = await this.prisma.contactMessage.create({
      data: createContactMessageDto,
    });

    return {
      data: contactMessage,
      message: 'Contact message created successfully',
      status: 'success',
      statusCode: 201,
    };
  }

  /**
   * Find all contact messages.
   * query: Record<string, any> - Query parameters for filtering and pagination.
   */
  async findAll(query: Record<string, any>) {
    const page = query.page ? parseInt(String(query.page), 10) : 1;
    const limit = query.limit ? parseInt(String(query.limit), 10) : 10;

    const [contactMessages, total] = await this.prisma.$transaction([
      this.prisma.contactMessage.findMany({
        skip: (page - 1) * limit,
        take: limit,
        orderBy: { createdAt: 'desc' },
      }),
      this.prisma.contactMessage.count(),
    ]);

    return paginate(contactMessages, { total, page, limit });
  }

  /**
   * Find a contact message by its ID.
   * @param id - The ID of the contact message to find.
   */
  async findOne(id: number) {
    if (!id) throw new Error('ID is required');

    try {
      const contactMessage = await this.prisma.contactMessage.findUniqueOrThrow(
        { where: { id } },
      );

      return contactMessage;
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          throw new NotFoundException('Contact message not found');
        }
      }

      throw new InternalServerErrorException({
        message: 'An error occurred while fetching the contact message',
      });
    }
  }

  /**
   * Update a contact message by its ID.
   * @param id - The ID of the contact message to update.
   * @param updateContactMessageDto - Data Transfer Object for updating a contact message.
   */
  async update(id: number, updateContactMessageDto: UpdateContactMessageDto) {
    if (!id) throw new Error('ID is required');
    await this.findOne(id);
    const contactMessage = await this.prisma.contactMessage.update({
      where: { id },
      data: updateContactMessageDto,
    });
    return contactMessage;
  }

  /**
   * Remove a contact message by its ID.
   * @param id - The ID of the contact message to remove.
   */
  async remove(id: number) {
    await this.findOne(id);
    const contactMessage = await this.prisma.contactMessage.delete({
      where: { id },
    });
    return contactMessage;
  }
}
