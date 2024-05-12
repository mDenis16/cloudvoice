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

-- CreateTable
CREATE TABLE "FriendRequest" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "senderId" INTEGER NOT NULL,
    "receiverId" INTEGER NOT NULL,
    "status" INTEGER NOT NULL,
    CONSTRAINT "FriendRequest_senderId_fkey" FOREIGN KEY ("senderId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "FriendRequest_receiverId_fkey" FOREIGN KEY ("receiverId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

