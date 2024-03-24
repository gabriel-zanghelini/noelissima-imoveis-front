import bcrypt from 'bcrypt'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  if (!process.env.SEED_USER_PASSWORD) {
    console.log('No password for seed user!')
  } else {
    const user = await prisma.user.upsert({
      where: { email: 'noeli_admin@gmail.com' },
      update: {},
      create: {
        email: 'noeli_admin@gmail.com',
        password: await bcrypt.hash(process.env.SEED_USER_PASSWORD, 10),
      },
    })

    console.log({ user })
  }
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit()
  })
