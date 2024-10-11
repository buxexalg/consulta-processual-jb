import { TribunalEnum } from "@/types/processo.types";
import { Stack, Text, Title } from "@mantine/core";
import { formatDate } from "./utils";

interface Props {
  numeroCNJ: string;
  tribunal: TribunalEnum;
  data: Date;
}

export default function AccordionTitle({ numeroCNJ, tribunal, data }: Props) {
  return (
    <Stack>
      <Title order={3}>{`Processo n. ${numeroCNJ} do ${tribunal}`}</Title>
      <Text size="sm" c={"gray"}>{`Distribuído em ${formatDate(data)}`}</Text>
    </Stack>
  );
}
