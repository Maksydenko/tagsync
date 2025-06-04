import { TypedUseSelectorHook, useSelector } from "react-redux";

import { RootState } from "@/application/store";

export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;
