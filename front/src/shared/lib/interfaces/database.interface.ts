export interface IDatabase {
  public: {
    Tables: {
      movies: {
        Insert: {
          data?: null | TypeJson; // nullable columns can be omitted
          // the data to be passed to .insert()
          id?: never; // generated columns must not be supplied
          name: string; // `not null` columns with no default must be supplied
        };
        Row: {
          data: null | TypeJson;
          // the data expected from .select()
          id: number;
          name: string;
        };
        Update: {
          data?: null | TypeJson;
          // the data to be passed to .update()
          id?: never;
          name?: string; // `not null` columns are optional on .update()
        };
      };
    };
  };
}

export type TypeJson =
  | boolean
  | null
  | number
  | string
  | TypeJson[]
  | {
      [key: string]: TypeJson | undefined;
    };
