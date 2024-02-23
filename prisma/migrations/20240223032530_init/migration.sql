-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "State" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "City" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "state_id" TEXT NOT NULL,
    CONSTRAINT "City_state_id_fkey" FOREIGN KEY ("state_id") REFERENCES "State" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Neighborhood" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "city_id" TEXT NOT NULL,
    CONSTRAINT "Neighborhood_city_id_fkey" FOREIGN KEY ("city_id") REFERENCES "City" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "PropertyStage" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "PropertyType" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Property" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "building_name" TEXT NOT NULL,
    "dormitory_count" INTEGER NOT NULL,
    "suite_count" INTEGER NOT NULL,
    "private_garage_count" INTEGER NOT NULL,
    "shared_garage_count" INTEGER NOT NULL,
    "shower_count" INTEGER NOT NULL,
    "total_area_m" REAL NOT NULL,
    "private_area_m" REAL NOT NULL,
    "price" REAL NOT NULL,
    "description" TEXT NOT NULL,
    "property_type_id" TEXT,
    "stage_id" TEXT,
    CONSTRAINT "Property_property_type_id_fkey" FOREIGN KEY ("property_type_id") REFERENCES "PropertyType" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Property_stage_id_fkey" FOREIGN KEY ("stage_id") REFERENCES "PropertyStage" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "PropertyCharacteristics" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "PropertyDetails" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "PropertyDealTypes" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_PropertyToPropertyCharacteristics" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,
    CONSTRAINT "_PropertyToPropertyCharacteristics_A_fkey" FOREIGN KEY ("A") REFERENCES "Property" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_PropertyToPropertyCharacteristics_B_fkey" FOREIGN KEY ("B") REFERENCES "PropertyCharacteristics" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "_PropertyToPropertyDetails" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,
    CONSTRAINT "_PropertyToPropertyDetails_A_fkey" FOREIGN KEY ("A") REFERENCES "Property" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_PropertyToPropertyDetails_B_fkey" FOREIGN KEY ("B") REFERENCES "PropertyDetails" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "_PropertyToPropertyDealTypes" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,
    CONSTRAINT "_PropertyToPropertyDealTypes_A_fkey" FOREIGN KEY ("A") REFERENCES "Property" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_PropertyToPropertyDealTypes_B_fkey" FOREIGN KEY ("B") REFERENCES "PropertyDealTypes" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "City_state_id_key" ON "City"("state_id");

-- CreateIndex
CREATE UNIQUE INDEX "Neighborhood_city_id_key" ON "Neighborhood"("city_id");

-- CreateIndex
CREATE UNIQUE INDEX "PropertyStage_name_key" ON "PropertyStage"("name");

-- CreateIndex
CREATE UNIQUE INDEX "PropertyType_name_key" ON "PropertyType"("name");

-- CreateIndex
CREATE UNIQUE INDEX "_PropertyToPropertyCharacteristics_AB_unique" ON "_PropertyToPropertyCharacteristics"("A", "B");

-- CreateIndex
CREATE INDEX "_PropertyToPropertyCharacteristics_B_index" ON "_PropertyToPropertyCharacteristics"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_PropertyToPropertyDetails_AB_unique" ON "_PropertyToPropertyDetails"("A", "B");

-- CreateIndex
CREATE INDEX "_PropertyToPropertyDetails_B_index" ON "_PropertyToPropertyDetails"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_PropertyToPropertyDealTypes_AB_unique" ON "_PropertyToPropertyDealTypes"("A", "B");

-- CreateIndex
CREATE INDEX "_PropertyToPropertyDealTypes_B_index" ON "_PropertyToPropertyDealTypes"("B");
