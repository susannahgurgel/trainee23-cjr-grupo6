/*
  Warnings:

  - You are about to alter the column `user_id` on the `Comments` table. The data in that column could be lost. The data in that column will be cast from `String` to `Int`.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Comments" (
    "comment_id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "post_id" INTEGER NOT NULL,
    "user_id" INTEGER NOT NULL,
    "content_coments" TEXT NOT NULL,
    CONSTRAINT "Comments_post_id_fkey" FOREIGN KEY ("post_id") REFERENCES "Post" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Comments_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Comments" ("comment_id", "content_coments", "post_id", "user_id") SELECT "comment_id", "content_coments", "post_id", "user_id" FROM "Comments";
DROP TABLE "Comments";
ALTER TABLE "new_Comments" RENAME TO "Comments";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
