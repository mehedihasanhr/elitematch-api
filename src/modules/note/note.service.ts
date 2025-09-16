import { Injectable } from '@nestjs/common';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';
import { PrismaService } from 'src/cores/modules/prisma/prisma.service';
import { paginate } from 'src/utils/paginate';

@Injectable()
export class NoteService {
  constructor(private prisma: PrismaService) {}

  async create(createNoteDto: CreateNoteDto, authId: number) {
    const { title, content, isPinned = false, publish } = createNoteDto;

    return this.prisma.note.create({
      data: {
        title,
        content,
        isPinned,
        publish: publish ? new Date(publish) : new Date(),
        authorId: authId,
      },
    });
  }

  /**
   * Find all notes with pagination
   * @param query - Query parameters containing page and limit
   */
  async findAll(query: Record<string, string>) {
    const page = parseInt(query.page) || 1;
    const limit = parseInt(query.limit) || 10;
    const skip = (page - 1) * limit;

    const [notes, total] = await this.prisma.$transaction([
      this.prisma.note.findMany({
        skip,
        take: limit,
        orderBy: { date: 'desc' },
        include: {
          author: {
            select: { id: true, firstName: true, lastName: true },
          },
        },
      }),
      this.prisma.note.count(),
    ]);

    return paginate(notes, { total, page, limit });
  }

  /**
   * f
   */
  async findOne(id: number) {
    return this.prisma.note.findUnique({ where: { id } });
  }

  async update(id: number, updateNoteDto: UpdateNoteDto) {
    // Optionally: check authorId matches authId for security
    return this.prisma.note.update({
      where: { id },
      data: { ...updateNoteDto },
    });
  }

  async remove(id: number) {
    return this.prisma.note.delete({ where: { id } });
  }
}
