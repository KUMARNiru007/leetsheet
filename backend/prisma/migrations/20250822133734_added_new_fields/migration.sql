-- AlterTable
ALTER TABLE "User" ADD COLUMN     "accessToken" TEXT,
ADD COLUMN     "isVerified" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "lastloginDate" TIMESTAMP(3),
ADD COLUMN     "loginMap" JSONB,
ADD COLUMN     "longestCount" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "refreshToken" TEXT,
ADD COLUMN     "streakCount" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "verificationToken" TEXT;
