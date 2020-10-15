export interface INoteList {
  date: string;
  description: string;
  _id: string;
  title: string;
}

export const noteList = (): INoteList => ({
  date: "",
  description: "",
  _id: "",
  title: "",
});
