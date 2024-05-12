-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "FriendRequest";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "FriendInvite" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "senderId" INTEGER NOT NULL,
    "receiverId" INTEGER NOT NULL,
    "status" INTEGER NOT NULL,
    CONSTRAINT "FriendInvite_senderId_fkey" FOREIGN KEY ("senderId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "FriendInvite_receiverId_fkey" FOREIGN KEY ("receiverId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
