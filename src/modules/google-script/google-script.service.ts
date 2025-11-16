import { Injectable } from '@nestjs/common';
import { CreateGoogleScriptDto } from './dto/create-google-script.dto';
import { PrismaService } from 'src/cores/modules/prisma/prisma.service';
import { GoogleScriptType } from '@prisma/client';

@Injectable()
export class GoogleScriptService {
  constructor(private prisma: PrismaService) {}

  findAll() {
    return this.prisma.googleScript.findMany();
  }

  async update(gtype: string, dto: CreateGoogleScriptDto) {
    return this.prisma.googleScript.upsert({
      where: { gtype: gtype as GoogleScriptType },
      update: dto,
      create: dto,
    });
  }
}
