import { TribunalEnum } from "@/types/processo.types";
import {
  Button,
  InputBase,
  NativeSelect,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { useRouter } from "next/navigation";
import { IMaskInput } from "react-imask";

const setNativeSelectValues = () => {
  const finalArray = [{ label: "Tribunal", value: "" }];

  Object.values(TribunalEnum).forEach((objectValue) =>
    finalArray.push({
      label: objectValue,
      value: objectValue,
    })
  );

  return finalArray;
};

export default function Busca() {
  const router = useRouter();

  const nativeSelectValues = setNativeSelectValues();

  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      numeroCNJ: "",
      tribunal: nativeSelectValues[0],
    },

    validate: {
      tribunal: (tribunal) => {
        if (!tribunal.value && !form.values.numeroCNJ) {
          return "Selecione um tribunal ou insira um CNJ";
        }
      },
      numeroCNJ: (value) => {
        if (value) {
          return /^\d{7}-\d{2}\.\d{4}\.\d{1}\.\d{2}\.\d{4}$/.test(value)
            ? null
            : "Valor inválido de CNJ. O formato deve ser NNNNNNN-NN.NNNN.N.NN.NNNN";
        }
        return null;
      },
    },
  });

  const handleSubmit = async (values: typeof form.values) => {
    if (values.numeroCNJ) {
      router.push(`/processos/${values.numeroCNJ}`);
    } else if (!!values.tribunal.value) {
      router.push(`/processos/${values.tribunal}`);
    }
  };

  return (
    <Stack
      justify="space-between"
      bg={"#F8F9FA"}
      p={{ base: "sm", lg: "xl" }}
      style={{ borderRadius: "1em" }}
      h={{ base: "100%", lg: "auto" }}
    >
      <Stack>
        <Title order={1}>Buscar</Title>
        <Text size="md">
          Selecione um tribunal para listar os processos ou buscar pelo número
          unificado
        </Text>
      </Stack>
      <Stack align="stretch" justify="center" gap={"xl"}>
        <form
          onSubmit={form.onSubmit(handleSubmit)}
          style={{ display: "flex", flexDirection: "column", gap: "32px" }}
        >
          <NativeSelect
            data={nativeSelectValues}
            key={form.key("tribunal")}
            {...form.getInputProps("tribunal")}
          />
          <InputBase
            component={IMaskInput}
            mask="0000000-00.0000.0.00.0000"
            placeholder="Número de processo"
            key={form.key("numeroCNJ")}
            {...form.getInputProps("numeroCNJ")}
          />
          <Button type="submit" variant="filled" color="black" size="xl">
            Buscar
          </Button>
        </form>
      </Stack>
    </Stack>
  );
}
