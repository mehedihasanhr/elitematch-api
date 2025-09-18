import { Injectable } from '@nestjs/common';
import { CreateGoogleScriptDto } from './dto/create-google-script.dto';
import { UpdateGoogleScriptDto } from './dto/update-google-script.dto';
import { PrismaService } from 'src/cores/modules/prisma/prisma.service';

@Injectable()
export class GoogleScriptService {
  constructor(private prisma: PrismaService) {}

  async create(createGoogleScriptDto: CreateGoogleScriptDto) {
    const googleScript = await this.prisma.goolgeScript.create({
      data: { ...createGoogleScriptDto },
    });

    return {
      data: googleScript,
      message: 'Google Script created successfully',
      status: 'success',
      statusCode: 201,
    };
  }

  findAll() {
    return this.prisma.goolgeScript.findMany();
  }

  async update(id: number, updateGoogleScriptDto: UpdateGoogleScriptDto) {
    return this.prisma.goolgeScript.update({
      where: { id },
      data: { ...updateGoogleScriptDto },
    });
  }

  async remove(id: number) {
    await this.prisma.goolgeScript.delete({ where: { id } });
    return {
      data: null,
      message: 'Google Script deleted successfully',
      status: 'success',
      statusCode: 200,
    };
  }
}
