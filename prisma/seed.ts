import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  if (!process.env.SEED_USER_PASSWORD) {
    console.log('No password for seed user!')
  } else {
    const user = await prisma.user.upsert({
      where: { username: 'noeli_admin' },
      update: {},
      create: {
        username: 'noeli_admin',
        password: process.env.SEED_USER_PASSWORD,
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
