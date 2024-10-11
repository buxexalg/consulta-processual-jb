import { buscarProcessoPorCNJ, buscarProcessosPorTribunal } from "@/api/api";
import { Processo, TipoParte, TribunalEnum } from "@/types/processo.types";
import {
  Accordion,
  AppShell,
  Divider,
  Flex,
  Group,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import { formatInTimeZone } from "date-fns-tz";
import { GetServerSidePropsContext } from "next";
import Link from "next/link";

interface pageProps {
  processos: Processo[];
}

const formatDate = (date: Date) => {
  return formatInTimeZone(new Date(date), "UTC", "dd/MM/yyyy");
};

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

function converterTipoParte(tipoParte: string): TipoParte | string {
  switch (tipoParte) {
    case "ADVOGADO":
      return TipoParte.ADVOGADO;
    case "PARTE_ENVOLVIDA":
      return TipoParte.PARTE_ENVOLVIDA;
    case "JUIZ":
      return TipoParte.JUIZ;
    default:
      return "";
  }
}

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
              xmlns="http://www.w3.org/2000/svg"
              height="100%"
              viewBox="0 -960 960 960"
              width="24px"
              fill="#000000"
            >
              <path d="m313-440 224 224-57 56-320-320 320-320 57 56-224 224h487v80H313Z" />
            </svg>
          </Link>

          <svg
            xmlns="http://www.w3.org/2000/svg"
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
                  <Flex direction={"column"}>
                    <Title
                      order={3}
                    >{`Processo n. ${processo.numeroCNJ} do ${processo.tribunal}`}</Title>
                    <Text size="sm" c={"gray"}>{`Distribuído em ${formatDate(
                      processo.data
                    )}`}</Text>
                  </Flex>
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
                        <>
                          <Title order={5}>{`${formatDate(
                            movimentacao?.dataDaMovimentacao
                          )}`}</Title>
                          <Text size="sm">{`${movimentacao?.descricao}`}</Text>
                          {i !== processo.movimentacoes.length - 1 && (
                            <Divider orientation="vertical" my="xs" />
                          )}
                        </>
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
                        <>
                          <Title order={5}>{`${parte?.nome}`}</Title>
                          <Text size="sm">{`${converterTipoParte(
                            parte?.tipo
                          )}`}</Text>
                          {parte?.informacaoExtra && (
                            <Text
                              size="sm"
                              c={"gray"}
                            >{`${parte?.informacaoExtra}`}</Text>
                          )}
                          {i !== processo.partes.length - 1 && (
                            <Divider my="xs" />
                          )}
                        </>
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
