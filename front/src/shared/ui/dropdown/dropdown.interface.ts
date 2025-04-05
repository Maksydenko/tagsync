import { ReactNode } from "react";

import { ILink } from "@/shared/model";

export interface IDropdown extends Omit<ILink, "value"> {
  value: ILink["value"] | ReactNode;
}
