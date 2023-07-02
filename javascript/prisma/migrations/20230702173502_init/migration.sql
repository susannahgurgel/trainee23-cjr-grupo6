-- CreateTable
CREATE TABLE "User" (
    "id" VARCHAR(50) NOT NULL,
    "username" VARCHAR(50) NOT NULL,
    "senha" VARCHAR(250) NOT NULL,
    "gender" CHAR(5) NOT NULL,
    "email" VARCHAR(250) NOT NULL,
    "cargo" VARCHAR(250) NOT NULL,
    "admin" BOOLEAN NOT NULL,
    "created_at" TIMESTAMP NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
