import { z } from "zod";

/// TL;DR cannot trigger by a key of a field, only by field name
/// hack to get around, GH issue referenced
/// https://github.com/react-hook-form/react-hook-form/issues/2379
const getAllNamesByKey = (values: any, key: any) => {
  // Choose which parser we are using, as arrays use [ ] notation in useForm
  const parseArray = (stack: any, property: any) => `${stack}[${property}]`;
  const parseObj = (stack: any, property: any) => `${stack}.${property}`;
  // Recursively unpack the keys
  const unpackKeys = (
    obj: { [x: string]: any; hasOwnProperty: (arg0: string) => any },
    stack: string,
    toReturn: any[],
  ) => {
    // Check which parser we will use
    const parser = Array.isArray(obj) ? parseArray : parseObj;
    for (const property in obj) {
      if (obj.hasOwnProperty(property)) {
        const returnString = parser(stack, property);
        // If its an object, recurse
        if (typeof obj[property] == "object") {
          unpackKeys(obj[property], returnString, toReturn);
        } else {
          // This has a leading "." in it due to the start step in the
          // recursion.  Remove it using slice.
          toReturn.push(returnString.slice(1));
        }
      }
    }
  };
  const toReturn: any[] = [];
  unpackKeys(values, "", toReturn);
  return toReturn.filter((fullKey) => fullKey.startsWith(key));
};

export const triggerByKeyGenerate =
  (getValues: () => any, trigger: (arg0: any) => any) => (key: any) => {
    const values = getValues();
    const namesToTrigger = getAllNamesByKey(values, key);
    namesToTrigger.map((name) => trigger(name));
  };

const nonEmptyString = (obj: z.ZodTypeAny) =>
  z.number().or(z.string().trim().min(1)).pipe(obj);

export const timeSchema = z.object({
  hour: nonEmptyString(z.coerce.number().gte(0, "non zero").max(24)),
  minute: nonEmptyString(z.coerce.number().gte(0, "non zero").max(59)),
});

export type TimeSchema = z.infer<typeof timeSchema>;

export const defaultBreakObj = {
  away: {
    hour: 0,
    minute: 0,
  },
  back: {
    hour: 0,
    minute: 0,
  },
};
