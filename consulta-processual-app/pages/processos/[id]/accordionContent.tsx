import { Divider, Text, Title } from "@mantine/core";

interface Props {
  title: string;
  description: string;
  extraInfo?: string;
  showDivider: boolean;
}

export default function AccordionContent({
  title,
  description,
  extraInfo,
  showDivider,
}: Props) {
  return (
    <>
      <Title order={5}>{`${title}`}</Title>
      <Text size="sm">{`${description}`}</Text>
      {extraInfo && <Text size="sm" c={"gray"}>{`${extraInfo}`}</Text>}
      {showDivider && <Divider orientation="vertical" my="xs" />}
    </>
  );
}
