import { Logger } from '@nestjs/common';
import { PaymentProvider, PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcryptjs';
import chalk from 'chalk';

const prisma = new PrismaClient();
const logger = new Logger('Seed');

async function main() {
  logger.log('🌱 Seeding database...');
  await createTestAdmin();
  await seedPaymentProviders();
  logger.log(chalk.greenBright('✅ Default subscription plans seeded'));
  logger.log(chalk.greenBright('🌱 Seeding complete!'));
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });

async function createTestAdmin() {
  const superAdminEmail = 'developer@stackrover.com';
  const password = 'password';
  const hashedPassword = await bcrypt.hash(password, 10);

  const superAdmin = await prisma.user.upsert({
    where: { email: superAdminEmail },
    update: {},
    create: {
      firstName: 'StackRover',
      lastName: 'Developer',
      email: superAdminEmail,
      password: hashedPassword,
    },
  });

  logger.log(chalk.yellow(`✅ Super admin created: ${superAdmin.email}`));
}

async function seedPaymentProviders() {
  const providers = [PaymentProvider.STRIPE];

  for (const provider of providers) {
    await prisma.paymentConfig.upsert({
      where: { provider },
      update: {},
      create: {
        provider,
        secretApiKey: '',
        publicApiKey: '',
        version: '',
        webhookSecret: '',
        isActive: false,
      },
    });
  }
  logger.log(
    chalk.yellow('✅ Payment providers seeded:', providers.join(', ')),
  );
}
