import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/cores/modules/prisma/prisma.service';
import { CreateBlogTagDto } from './dto/create-blog-tag.dto';

@Injectable()
export class BlogTagService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createBlogTagDto: CreateBlogTagDto) {
    const tag = await this.prisma.blogTag.upsert({
      where: { name: createBlogTagDto.name },
      create: { name: createBlogTagDto.name },
      update: { name: createBlogTagDto.name },
    });

    return {
      data: tag,
      message: 'Tag created successfully',
      status: 'success',
      statusCode: 201,
    };
  }

  findAll() {
    const tags = this.prisma.blogTag.findMany();
    return tags;
  }
}
