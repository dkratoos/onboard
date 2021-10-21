interface StrMapper {
  [key: string]:
    | {
        [key: string]: string | undefined;
      }
    | undefined;
}

const strings: StrMapper = {
  "en-us": {
    "Testando $1 $2": "Testing $2 $1",
  },
};

function replaceWithArgs(str: string, args: unknown[]) {
  return args.reduce((acc: string, curr, i) => acc.replace(`$${i + 1}`, `${curr}`), str);
}

export function trFactory(lang: string) {
  return function tr(str: TemplateStringsArray, ...args: unknown[]) {
    const rawStr = str.reduce((acc, curr, i) => acc.concat(curr, args[i] ? `$${i + 1}` : ""), "");

    return replaceWithArgs(strings[lang]?.[rawStr] ?? rawStr, args);
  };
}
