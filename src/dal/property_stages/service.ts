import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function getAll() {
  const propertyTypes = await prisma.propertyStage.findMany()

  return propertyTypes
}

export default { getAll }
