-- CreateTable
CREATE TABLE "KudoCard" (
    "id" SERIAL NOT NULL,
    "kudoBoardId" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "gifUrl" TEXT NOT NULL,
    "author" TEXT NOT NULL,
    "likes" INTEGER NOT NULL,

    CONSTRAINT "KudoCard_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "KudoCard_id_key" ON "KudoCard"("id");

-- AddForeignKey
ALTER TABLE "KudoCard" ADD CONSTRAINT "KudoCard_kudoBoardId_fkey" FOREIGN KEY ("kudoBoardId") REFERENCES "kudoBoard"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
