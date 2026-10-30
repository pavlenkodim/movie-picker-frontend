const regionNames = new Intl.DisplayNames(["en"], { type: "region" });

export const getCountryName = (code: string): string => {
  try {
    return regionNames.of(code.toUpperCase()) ?? code;
  } catch {
    return code;
  }
};
