import { AppShell, Flex } from "@mantine/core";
import Busca from "./components/busca";

export default function Home() {
  return (
    <AppShell
      header={{ height: 60 }}
      padding={{ base: "md", md: "xl", lg: "8em" }}
      display={"flex"}
    >
      <AppShell.Header px={{ base: "md", md: "xl", lg: "8em" }}>
        <svg
          height="100%"
          viewBox="0 -960 960 960"
          width="48px"
          fill="#000000"
        >
          <path d="M160-120v-80h480v80H160Zm226-194L160-540l84-86 228 226-86 86Zm254-254L414-796l86-84 226 226-86 86Zm184 408L302-682l56-56 522 522-56 56Z" />
        </svg>
        <Flex align="center" h={"100%"}></Flex>
      </AppShell.Header>

      <AppShell.Main w={"100%"}>
        <Busca />
      </AppShell.Main>
    </AppShell>
  );
}
