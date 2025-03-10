import { toTypedSchema } from "@vee-validate/yup";
import type * as Yup from "yup";

type SchemaConstructor = (yup: typeof Yup) => {
  [field: string]: Yup.Schema;
};

export const useYup = (schemaConstructor: SchemaConstructor) => {
  const { $yup } = useNuxtApp();
  return toTypedSchema($yup.object(schemaConstructor($yup)));
};
