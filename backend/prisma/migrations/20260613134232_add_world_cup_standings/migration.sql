-- CreateTable
CREATE TABLE "Standing" (
    "id" TEXT NOT NULL,
    "group" TEXT NOT NULL,
    "rank" INTEGER NOT NULL,
    "points" INTEGER NOT NULL,
    "played" INTEGER NOT NULL,
    "win" INTEGER NOT NULL,
    "draw" INTEGER NOT NULL,
    "lose" INTEGER NOT NULL,
    "goalsFor" INTEGER NOT NULL,
    "goalsAgainst" INTEGER NOT NULL,
    "goalsDiff" INTEGER NOT NULL,
    "teamId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Standing_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Standing_group_idx" ON "Standing"("group");

-- CreateIndex
CREATE INDEX "Standing_rank_idx" ON "Standing"("rank");

-- CreateIndex
CREATE UNIQUE INDEX "Standing_group_teamId_key" ON "Standing"("group", "teamId");

-- AddForeignKey
ALTER TABLE "Standing" ADD CONSTRAINT "Standing_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "Team"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
