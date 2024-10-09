/*
  Warnings:

  - You are about to drop the `Movimentacao` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Parte` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ParteNoProcesso` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Processo` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Movimentacao" DROP CONSTRAINT "Movimentacao_idProcesso_fkey";

-- DropForeignKey
ALTER TABLE "ParteNoProcesso" DROP CONSTRAINT "ParteNoProcesso_parteId_fkey";

-- DropForeignKey
ALTER TABLE "ParteNoProcesso" DROP CONSTRAINT "ParteNoProcesso_processoId_fkey";

-- DropTable
DROP TABLE "Movimentacao";

-- DropTable
DROP TABLE "Parte";

-- DropTable
DROP TABLE "ParteNoProcesso";

-- DropTable
DROP TABLE "Processo";

-- CreateTable
CREATE TABLE "processo" (
    "id" SERIAL NOT NULL,
    "numeroCNJ" CHAR(25) NOT NULL,
    "tribunal" "Tribunal" NOT NULL,
    "data" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "processo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "movimentacao" (
    "id" SERIAL NOT NULL,
    "dataDaMovimentacao" TIMESTAMP(3) NOT NULL,
    "descricao" TEXT NOT NULL,
    "idProcesso" INTEGER NOT NULL,

    CONSTRAINT "movimentacao_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "parte" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "tipo" "TipoParte" NOT NULL,
    "informacaoExtra" TEXT,

    CONSTRAINT "parte_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "parteNoProcesso" (
    "processoId" INTEGER NOT NULL,
    "parteId" INTEGER NOT NULL,

    CONSTRAINT "parteNoProcesso_pkey" PRIMARY KEY ("processoId","parteId")
);

-- CreateIndex
CREATE UNIQUE INDEX "processo_numeroCNJ_key" ON "processo"("numeroCNJ");

-- AddForeignKey
ALTER TABLE "movimentacao" ADD CONSTRAINT "movimentacao_idProcesso_fkey" FOREIGN KEY ("idProcesso") REFERENCES "processo"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "parteNoProcesso" ADD CONSTRAINT "parteNoProcesso_processoId_fkey" FOREIGN KEY ("processoId") REFERENCES "processo"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "parteNoProcesso" ADD CONSTRAINT "parteNoProcesso_parteId_fkey" FOREIGN KEY ("parteId") REFERENCES "parte"("id") ON DELETE CASCADE ON UPDATE CASCADE;
