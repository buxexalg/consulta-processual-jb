import { gql } from "@apollo/client";
import createApolloClient from "./apollo-client";
import { TribunalEnum } from "@/types/processo.types";

const buscarProcessoPorCNJQuery = gql`
  query buscarProcessoPorCNJ($numeroCNJ: String!) {
    buscarProcessoPorCNJ(numeroCNJ: $numeroCNJ) {
      id
      numeroCNJ
      tribunal
      data
      movimentacoes {
        id
        dataDaMovimentacao
        descricao
      }
      partes {
        id
        nome
        tipo
        informacaoExtra
      }
    }
  }
`;

export const buscarProcessosPorTribunalQuery = gql`
  query buscarProcessosPorTribunal($tribunal: Tribunal!) {
    buscarProcessosPorTribunal(tribunal: $tribunal) {
      id
      numeroCNJ
      tribunal
      data
      movimentacoes {
        id
        dataDaMovimentacao
        descricao
      }
      partes {
        id
        nome
        tipo
        informacaoExtra
      }
    }
  }
`;

export async function buscarProcessoPorCNJ(numeroCNJ: string) {
  const client = createApolloClient();
  const { data } = await client.query({
    query: buscarProcessoPorCNJQuery,
    variables: {
      numeroCNJ,
    },
  });

  return {
    props: {
      processo: data,
    },
  };
}

export async function buscarProcessosPorTribunal(tribunal: TribunalEnum) {
  const client = createApolloClient();

  const { data } = await client.query({
    query: buscarProcessosPorTribunalQuery,
    variables: {
      tribunal,
    },
  });

  return {
    props: {
      processo: data,
    },
  };
}
