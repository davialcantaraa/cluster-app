export interface IDocument {
  id: string;
  created_at?: Date;
  user_id: string;
  content: string;
  updated_at: Date;
  title: string;
}
