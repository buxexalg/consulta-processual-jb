import { buscarProcessoPorCNJ, buscarProcessosPorTribunal } from "@/api/api";
import { Processo, TribunalEnum } from "@/types/processo.types";
import {
  Accordion,
  AppShell,
  Divider,
  Group,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import { GetServerSidePropsContext } from "next";
import Link from "next/link";
import AccordionContent from "./accordionContent";
import AccordionTitle from "./accordionTitle";
import { converterTipoParte, formatDate } from "./utils";

interface pageProps {
  processos: Processo[];
}

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const queryString = context.query.id as string;

  if (!queryString) {
    return;
  }

  let data;

  if (Object.values(TribunalEnum).includes(queryString as TribunalEnum)) {
    data = await buscarProcessosPorTribunal(queryString as TribunalEnum);

    return {
      props: {
        processos: data.props.processo.buscarProcessosPorTribunal,
      },
    };
  }

  data = await buscarProcessoPorCNJ(queryString);

  return {
    props: {
      processos: [data.props.processo.buscarProcessoPorCNJ],
    },
  };
};

export default function Page({ processos }: pageProps) {
  return (
    <AppShell
      header={{ height: 60 }}
      padding={{ base: "md", md: "xl", lg: "8em" }}
    >
      <AppShell.Header
        px={{ base: "md", md: "xl", lg: "8em" }}
        display={"flex"}
      >
        <Group justify="space-between" w={"100%"}>
          <Link href="/" style={{ display: "flex" }}>
            <svg
              height="100%"
              viewBox="0 -960 960 960"
              width="24px"
              fill="#000000"
            >
              <path d="m313-440 224 224-57 56-320-320 320-320 57 56-224 224h487v80H313Z" />
            </svg>
          </Link>

          <svg
            height="100%"
            viewBox="0 -960 960 960"
            width="48px"
            fill="#000000"
          >
            <path d="M160-120v-80h480v80H160Zm226-194L160-540l84-86 228 226-86 86Zm254-254L414-796l86-84 226 226-86 86Zm184 408L302-682l56-56 522 522-56 56Z" />
          </svg>
        </Group>
      </AppShell.Header>

      <AppShell.Main w={"100%"}>
        <Accordion variant="separated">
          {processos.length > 0 ? (
            processos.map((processo) => (
              <Accordion.Item
                key={processo.numeroCNJ}
                value={processo.numeroCNJ}
              >
                <Accordion.Control>
                  <AccordionTitle
                    numeroCNJ={processo.numeroCNJ}
                    tribunal={processo.tribunal}
                    data={processo.data}
                  />
                </Accordion.Control>
                <Accordion.Panel>
                  <Stack>
                    <Divider
                      my="xs"
                      size="lg"
                      label={
                        <>
                          <Text size="md">{`Movimentações`}</Text>
                        </>
                      }
                      labelPosition="left"
                    />
                    {processo.movimentacoes.length &&
                      processo.movimentacoes.map((movimentacao, i) => (
                        <AccordionContent
                          key={i}
                          title={formatDate(movimentacao.dataDaMovimentacao)}
                          description={movimentacao.descricao}
                          showDivider={i !== processo.movimentacoes.length - 1}
                        />
                      ))}
                  </Stack>
                  <Stack>
                    <Divider
                      my="lg"
                      size="lg"
                      label={
                        <>
                          <Text size="md">{`Partes envolvidas`}</Text>
                        </>
                      }
                      labelPosition="left"
                    />
                    {processo.partes.length &&
                      processo.partes.map((parte, i) => (
                        <AccordionContent
                          key={i}
                          title={parte?.nome}
                          description={converterTipoParte(parte?.tipo)}
                          extraInfo={parte?.informacaoExtra ?? ""}
                          showDivider={i !== processo.partes.length - 1}
                        />
                      ))}
                  </Stack>
                </Accordion.Panel>
              </Accordion.Item>
            ))
          ) : (
            <Title order={5}>Nenhum processo encontrado.</Title>
          )}
        </Accordion>
      </AppShell.Main>
    </AppShell>
  );
}
