import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

type PropertyWrite = {
  title: string
  building_name: string
  dormitory_count: number
  suite_count: number
  private_garage_count: number
  shared_garage_count: number
  shower_count: number
  total_area_m: number
  private_area_m: number
  price: number
  description: string
  property_type_id: string
  stage_id: string
}

async function create(data: PropertyWrite) {
  const { property_type_id, stage_id, ...rest } = data

  const property = await prisma.property.create({
    data: {
      ...rest,
      property_type: { connect: { id: property_type_id } },
      stage: { connect: { id: stage_id } },
    },
  })

  return property
}

async function getAll() {
  const properties = await prisma.property.findMany({
    where: { stage: { isNot: { name: 'Vendido' } } },
    include: {
      characteristics: true,
      details: true,
      property_type: true,
      stage: true,
      deals: true,
    },
  })

  return properties
}

export default { create, getAll }
