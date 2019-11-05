
import {InputProps} from "@tarojs/components/types/Input";

export type AnyObject={
  [key: string]: any;
  [kk: number]: any;
}
export type OuterClass={  // 用来处理组件内部的class无法接收到外部的问题
  "outer-class": string;
}
export type BookItemProps= {
  imgUrl: string;
  title: string;
  author: string;
  price: number;
  comments: number;
  goodComments: number;
  bookId: string;
}
export type BookListProps=BookItemProps[]

export type ClassificationIconProps={
  title: string;
  imgUrl: string;
  onClick: (title: string) => void
}
export type SearchBarProps=InputProps & AnyObject

type ClassificationItem={
  imgUrl: string;
  title: string
}
export type IndexState={
  classifications: ClassificationItem[][],
  books: BookItemProps[];
}

export  type SearchItem = string;

export enum FilterTabType{
  默认,
  销量,
  价格升序,
  价格降序,
  好评,
  出版时间
}
export type FilterTabProps={
  currentTab: FilterTabType,
  onChange: (tab: FilterTabType) => void
}
export type SearchCandidateItem={
  title: string;
  resultCount: number;
}
export type SearchCandidateListProps={
  list: SearchCandidateItem[];
  onClick: (title: string) => any
}
export type SearchBarWithTipsProps={
  searchCandidateProps: SearchCandidateListProps;
  searchBarProps: SearchBarProps;
  searchButtonProps: {
    text: string;
    onClick: (title: string) => any
  };
  "button-class"?: string;
}
