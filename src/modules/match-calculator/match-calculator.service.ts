import { Injectable } from '@nestjs/common';
import { CreateMatchCalculatorDto } from './dto/create-match-calculator.dto';
import { UpdateMatchCalculatorDto } from './dto/update-match-calculator.dto';
import { PrismaService } from 'src/cores/modules/prisma/prisma.service';

@Injectable()
export class MatchCalculatorService {
  constructor(private prisma: PrismaService) {}

  create(createMatchCalculatorDto: CreateMatchCalculatorDto) {
    return 'This action adds a new matchCalculator';
  }

  findAll() {
    return `This action returns all matchCalculator`;
  }

  findOne(id: number) {
    return `This action returns a #${id} matchCalculator`;
  }

  update(id: number, updateMatchCalculatorDto: UpdateMatchCalculatorDto) {
    return `This action updates a #${id} matchCalculator`;
  }

  remove(id: number) {
    return `This action removes a #${id} matchCalculator`;
  }

  /**************** Utils ****************/
  async calculateMatchScore(userAId: number, userBId: number) {
    // Fetch profiles with relations
    const profileA = await this.prisma.profile.findUnique({
      where: { userId: userAId },
      include: {
        occupation: true,
        educationLevel: true,
        incomeRange: true,
        relationshipStatus: true,
      },
    });

    const profileB = await this.prisma.profile.findUnique({
      where: { userId: userBId },
      include: {
        occupation: true,
        educationLevel: true,
        incomeRange: true,
        relationshipStatus: true,
      },
    });

    if (!profileA || !profileB) {
      throw new Error('Profile not found');
    }

    const attributes = [
      { key: 'occupation', field: 'occupationId', type: 'exact' },
      { key: 'educationLevel', field: 'educationLevelId', type: 'exact' },
      { key: 'incomeRange', field: 'incomeRangeId', type: 'exact' },
      {
        key: 'relationshipStatus',
        field: 'relationshipStatusId',
        type: 'exact',
      },
      { key: 'gender', field: 'gender', type: 'exact' },
      { key: 'city', field: 'city', type: 'exact' },
      { key: 'state', field: 'state', type: 'exact' },
      { key: 'country', field: 'country', type: 'exact' },
      { key: 'height', field: 'height', type: 'range', tolerance: 5 },
      { key: 'weight', field: 'weight', type: 'range', tolerance: 10 },
      { key: 'noOfChildren', field: 'noOfChildren', type: 'exact' },
    ];

    const scores = {};
    let totalScore = 0;
    let totalAttributes = 0;

    for (const attr of attributes) {
      const valueA = (profileA as unknown as Record<string, any>)[attr.field];
      const valueB = (profileB as unknown as Record<string, any>)[attr.field];
      let score = 0;

      if (valueA && valueB) {
        if (attr.type === 'exact') {
          score = valueA === valueB ? 100 : 0;
        } else if (attr.type === 'range' && attr.tolerance !== undefined) {
          const numA =
            typeof valueA === 'string'
              ? parseFloat(valueA)
              : (valueA as number);
          const numB =
            typeof valueB === 'string'
              ? parseFloat(valueB)
              : (valueB as number);
          const diff = Math.abs(numA - numB);
          score =
            diff <= attr.tolerance
              ? 100
              : Math.max(0, 100 - (diff / attr.tolerance) * 100);
        }
      }

      scores[attr.key] = score;
      totalScore += score;
      totalAttributes++;
    }

    const overallPercentage =
      totalAttributes > 0 ? totalScore / totalAttributes : 0;

    return {
      overallMatch: Math.round(overallPercentage),
      attributeScores: scores,
    };
  }
}
