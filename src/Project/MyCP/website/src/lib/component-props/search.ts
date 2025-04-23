export interface SearchResult {
  pageresult: {
    pageInfo: PageInfo;
    results: SearchResultItem[];
    total: number;
  };
}

interface PageInfo {
  endCursor: string;
  hasNext: boolean;
}

type Value = {
  value: string;
};

export type SearchResultItem = {
  description: Value | null;
  title: Value | null;
  url: { path: string };
  navigationTitle?: Value;
  id?: string;
  extention?: Value;
};

export type SearchTypes = {
  templateId: string;
  language: string;
  searchContent: string;
};
