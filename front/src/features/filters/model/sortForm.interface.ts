import { ILink, SearchParam } from '@/shared/model';

export interface ISortForm {
  [SearchParam.SortBy]: ILink;
}
