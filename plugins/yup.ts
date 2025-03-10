import * as Yup from "yup";
import { configure, Form, Field, ErrorMessage } from "vee-validate";

declare module "yup" {
  interface StringSchema {
    numeric(msg?: string): StringSchema;
    alphaNum(msg?: string): StringSchema;
  }
}
export default defineNuxtPlugin(() => {
  const nuxtApp = useNuxtApp();
  nuxtApp.vueApp.component("Form", Form);
  nuxtApp.vueApp.component("Field", Field);
  nuxtApp.vueApp.component("ErrorMessage", ErrorMessage);

  configure({
    validateOnBlur: true, // controls if `blur` events should trigger validation with `handleChange` handler
    validateOnChange: true, // controls if `change` events should trigger validation with `handleChange` handler
    validateOnInput: false, // controls if `input` events should trigger validation with `handleChange` handler
    validateOnModelUpdate: true, // controls if `update:modelValue` events should trigger validation with `handleChange` handler
  });

  function numeric(this: Yup.StringSchema, msg: string = "") {
    return this.test({
      name: "numeric",
      message: () => msg || "Invalid value",
      test: (digits) => {
        if (!digits) {
          return true;
        }
        return /^[\d]*$/.test(digits);
      },
    });
  }

  function alphaNum(this: Yup.StringSchema, msg: string = "") {
    return this.test({
      name: "alphaNum",
      message: () => msg || "Invalid value",
      test: (digits) => {
        if (!digits) {
          return true;
        }
        return /^[a-zA-Z0-9]*$/.test(digits);
      },
    });
  }

  Yup.addMethod(Yup.string, "numeric", numeric);
  Yup.addMethod(Yup.string, "alphaNum", alphaNum);

  return {
    provide: {
      yup: Yup,
    },
  };
});
