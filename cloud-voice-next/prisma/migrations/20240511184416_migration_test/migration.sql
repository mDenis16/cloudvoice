/*
  Warnings:

  - You are about to drop the `Friends` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Friends";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "Friend" (
    "friendsOfId" INTEGER NOT NULL,
    "friendsId" INTEGER NOT NULL,

    PRIMARY KEY ("friendsId", "friendsOfId"),
    CONSTRAINT "Friend_friendsOfId_fkey" FOREIGN KEY ("friendsOfId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Friend_friendsId_fkey" FOREIGN KEY ("friendsId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
