-- CreateEnum
CREATE TYPE "Tribunal" AS ENUM ('STF', 'STJ', 'TST', 'TSE', 'STM', 'CNJ', 'TJAC', 'TJAL', 'TJAM', 'TJAP', 'TJBA', 'TJCE', 'TJDFT', 'TJES', 'TJGO', 'TJMA', 'TJMG', 'TJMS', 'TJMT', 'TJPA', 'TJPB', 'TJPE', 'TJPI', 'TJPR', 'TJRJ', 'TJRN', 'TJRO', 'TJRR', 'TJRS', 'TJSC', 'TJSE', 'TJSP', 'TJTO', 'TRF1', 'TRF2', 'TRF3', 'TRF4', 'TRF5', 'TRT1', 'TRT2', 'TRT3', 'TRT4', 'TRT5', 'TRT6', 'TRT7', 'TRT8', 'TRT9', 'TRT10', 'TRT11', 'TRT12', 'TRT13', 'TRT14', 'TRT15', 'TRT16', 'TRT17', 'TRT18', 'TRT19', 'TRT20', 'TRT21', 'TRT22', 'TRT23', 'TRT24');

-- CreateEnum
CREATE TYPE "TipoParte" AS ENUM ('ADVOGADO', 'PARTE_ENVOLVIDA', 'JUIZ');

-- CreateTable
CREATE TABLE "Processo" (
    "id" SERIAL NOT NULL,
    "numeroCNJ" CHAR(25) NOT NULL,
    "tribunal" "Tribunal" NOT NULL,
    "data" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Processo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Movimentacao" (
    "id" SERIAL NOT NULL,
    "dataDaMovimentacao" TIMESTAMP(3) NOT NULL,
    "descricao" TEXT NOT NULL,
    "idProcesso" INTEGER NOT NULL,

    CONSTRAINT "Movimentacao_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Parte" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "tipo" "TipoParte" NOT NULL,
    "informacaoExtra" TEXT,

    CONSTRAINT "Parte_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ParteNoProcesso" (
    "processoId" INTEGER NOT NULL,
    "parteId" INTEGER NOT NULL,

    CONSTRAINT "ParteNoProcesso_pkey" PRIMARY KEY ("processoId","parteId")
);

-- CreateIndex
CREATE UNIQUE INDEX "Processo_numeroCNJ_key" ON "Processo"("numeroCNJ");

-- AddForeignKey
ALTER TABLE "Movimentacao" ADD CONSTRAINT "Movimentacao_idProcesso_fkey" FOREIGN KEY ("idProcesso") REFERENCES "Processo"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ParteNoProcesso" ADD CONSTRAINT "ParteNoProcesso_processoId_fkey" FOREIGN KEY ("processoId") REFERENCES "Processo"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ParteNoProcesso" ADD CONSTRAINT "ParteNoProcesso_parteId_fkey" FOREIGN KEY ("parteId") REFERENCES "Parte"("id") ON DELETE CASCADE ON UPDATE CASCADE;
