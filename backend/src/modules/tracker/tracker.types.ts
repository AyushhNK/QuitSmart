export interface CreateSmokingEntryInput {
  trigger?: string;
  mood?: string;
  location?: string;
  note?: string;
}

export interface SmokingQuery {
  from?: string;
  to?: string;
}
