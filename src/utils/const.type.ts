// import { MouseEventHandler } from "react-router/node_modules/@types/react";

export interface ArticleBoxType {
  title: string;
  view: number;
  favorite: number;
  comment: number;
  imgs?: string[];
  articleId: number;
  createAt: string;
  tag?: string[];
  showDetail: Function;
}
