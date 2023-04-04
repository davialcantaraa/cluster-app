import { IDocument } from "./document";

interface Database {
  public: {
    Tables: {
      documents: {
        Row: IDocument; // The data expected to be returned from a "select" statement.
        Insert: IDocument; // The data expected passed to an "insert" statement.
        Update: IDocument; // The data expected passed to an "update" statement.
      };
    };
  };
}
