import { ReactNode, useEffect, useState } from "react";
import { clsx } from "clsx";
import {
  FieldValues,
  Path,
  PathValue,
  RegisterOptions,
  UseFormReturn,
} from "react-hook-form";
import PhoneInputWithCountrySelect, {
  Country,
  getCountries,
  getCountryCallingCode,
  Value,
} from "react-phone-number-input";

import s from "./Phone.module.scss";

interface PhoneProps<T extends FieldValues> {
  className?: string;
  formReturn: UseFormReturn<T>;
  name: Path<T>;
  options?: RegisterOptions<T>;
  placeholder?: string;
}

export const Phone = <T extends FieldValues>({
  className,
  formReturn,
  name,
  options,
  placeholder,
  ...props
}: PhoneProps<T>): ReactNode => {
  const [currentCountry, setCurrentCountry] = useState<Country | undefined>();

  const {
    formState: { errors },
    register,
    setValue,
    watch,
  } = formReturn;
  const phoneValue = watch(name);

  const handleChange = (value: Value) => {
    setValue(name, value as PathValue<T, Path<T>>);
  };

  useEffect(() => {
    if (!phoneValue) {
      return;
    }

    const countryCode = phoneValue.slice(1).split(" ")[0];

    const matchedCountry = getCountries().find(
      (country) => getCountryCallingCode(country) === countryCode
    );

    if (!matchedCountry) {
      return;
    }

    setCurrentCountry(matchedCountry as Country);
  }, [phoneValue]);

  return (
    <PhoneInputWithCountrySelect
      {...register(name, options)}
      {...props}
      className={clsx(s.phone, errors[name] && s.phone_error, className)}
      defaultCountry={currentCountry}
      id={name}
      placeholder={placeholder}
      international
      onChange={handleChange}
    />
  );
};
