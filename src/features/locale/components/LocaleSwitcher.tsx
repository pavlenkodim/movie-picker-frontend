"use client";
import { locales } from "@/shared/i18n/config";
import { useLocale } from "next-intl";
import RadioSwitcher from "@/shared/ui/RadioSwitcher";
import { setLocale } from "@/shared/i18n/actions";

const LocaleSwitcher = () => {
  const current = useLocale();
  const alllocales = locales;

  const onChange = (newLocale: string) => setLocale(newLocale);

  return (
    <RadioSwitcher
      name="locale"
      options={alllocales.map((locale) => ({
        label: locale.toLocaleUpperCase(),
        value: locale,
      }))}
      selectedValue={current}
      onValueChange={onChange}
    />
  );
};

export default LocaleSwitcher;
