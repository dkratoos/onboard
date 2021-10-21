import type { Schema } from "ajv";
import Ajv from "ajv";
import addFormats from "ajv-formats";

const ajv = new Ajv();

addFormats(ajv);

export function createValidator(schema: Schema) {
  const validate = ajv.compile(schema);

  return (value: unknown) => {
    if (!validate(value) && validate.errors) {
      throw new Error(validate.errors.map(err => `${err} ${err.message}`).join(", "));
    }
  };
}
