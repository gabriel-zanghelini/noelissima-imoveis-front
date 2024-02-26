import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function getAll() {
  const propertyTypes = await prisma.propertyDealTypes.findMany()

  return propertyTypes
}

export default { getAll }
