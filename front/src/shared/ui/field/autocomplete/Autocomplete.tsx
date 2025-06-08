import { ReactNode } from "react";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { clsx } from "clsx";
import {
  FieldValues,
  Path,
  PathValue,
  RegisterOptions,
  UseFormReturn,
} from "react-hook-form";

import {
  Combobox,
  ComboboxButton,
  ComboboxInput,
  ComboboxOption,
  ComboboxOptions,
} from "@headlessui/react";

import {
  checkKeyByTypes,
  ILink,
  ILinkWithIcon,
  Translation,
} from "@/shared/model";

import { Img } from "../../img/Img";

import s from "./Autocomplete.module.scss";

interface AutocompleteProps<T extends FieldValues> {
  className?: string;
  formReturn: UseFormReturn<T>;
  items: (
    | ILink<(() => unknown) | string>
    | ILinkWithIcon<(() => unknown) | string>
  )[];
  name: Path<T>;
  options?: RegisterOptions<T>;
}

export const Autocomplete = <T extends FieldValues>({
  className,
  formReturn: { register, setValue, watch },
  items,
  name,
  options,
  ...props
}: AutocompleteProps<T>): ReactNode => {
  const {
    /* eslint-disable-next-line @typescript-eslint/no-unused-vars */
    onChange,
    ...restRegister
  } = register(name, options);
  const selected = watch(name);

  const tShared = useTranslations(Translation.Shared);

  return (
    <div className={clsx(s.autocomplete, className)}>
      <Combobox
        value={selected}
        // onChange={(value) => setSelected(value)}
        onClose={() => setValue(name, "" as PathValue<T, Path<T>>)}
      >
        <div className={s.autocomplete__body}>
          <ComboboxInput
            className={clsx(s.autocomplete__input)}
            displayValue={(item: ILink) => item.label}
            onChange={({ target: { value } }) => {
              setValue(name, value as PathValue<T, Path<T>>);
            }}
            {...props}
            {...restRegister}
          />
          <ComboboxButton
            aria-label={tShared("form.search.label")}
            className={s.autocomplete__btn}
          >
            <Img
              alt={tShared("form.search.label")}
              className={s.autocomplete__icon}
              src="/img/icons/form/loupe.svg"
              isSvg
            />
          </ComboboxButton>
        </div>

        <ComboboxOptions
          anchor="bottom"
          className={s.autocomplete__options}
          transition
        >
          {items.map((item) => {
            const { label, value } = item;
            const icon = checkKeyByTypes<
              ILinkWithIcon<(() => unknown) | string>,
              ILink<(() => unknown) | string>
            >(item, "icon")
              ? item?.icon
              : null;

            return (
              <ComboboxOption
                key={label}
                className={s.autocomplete__option}
                value={item}
              >
                {icon && (
                  <Img
                    alt={label}
                    className={s.autocomplete__icon}
                    src={icon}
                    isSvg
                  />
                )}
                {typeof value === "string" ? (
                  <Link href={value}>{label}</Link>
                ) : (
                  <button type="button" onClick={value}>
                    {label}
                  </button>
                )}
              </ComboboxOption>
            );
          })}
        </ComboboxOptions>
      </Combobox>
    </div>
  );
};
