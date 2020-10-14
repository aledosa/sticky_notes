export interface IPostList {
  description: string;
  title: string;
}

export const postList = (): IPostList => ({
  description: "",
  title: "",
});
