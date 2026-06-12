-- CreateTable
CREATE TABLE "Team" (
    "id" TEXT NOT NULL,
    "externalId" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "logo" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Team_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Game" (
    "id" TEXT NOT NULL,
    "externalId" INTEGER NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "timestamp" INTEGER NOT NULL,
    "statusLong" TEXT NOT NULL,
    "statusShort" TEXT NOT NULL,
    "elapsed" INTEGER,
    "round" TEXT NOT NULL,
    "homeTeamId" TEXT NOT NULL,
    "awayTeamId" TEXT NOT NULL,
    "homeGoals" INTEGER,
    "awayGoals" INTEGER,
    "halfHome" INTEGER,
    "halfAway" INTEGER,
    "fullHome" INTEGER,
    "fullAway" INTEGER,
    "canGuess" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Game_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Team_externalId_key" ON "Team"("externalId");

-- CreateIndex
CREATE UNIQUE INDEX "Game_externalId_key" ON "Game"("externalId");

-- CreateIndex
CREATE INDEX "Game_date_idx" ON "Game"("date");

-- CreateIndex
CREATE INDEX "Game_statusShort_idx" ON "Game"("statusShort");

-- AddForeignKey
ALTER TABLE "Game" ADD CONSTRAINT "Game_homeTeamId_fkey" FOREIGN KEY ("homeTeamId") REFERENCES "Team"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Game" ADD CONSTRAINT "Game_awayTeamId_fkey" FOREIGN KEY ("awayTeamId") REFERENCES "Team"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
