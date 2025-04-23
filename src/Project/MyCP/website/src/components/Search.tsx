import React, { useCallback, useEffect, useRef, useState } from 'react';
import SearchQuery from 'src/graphql/search';
import { GraphQLSearchClient } from 'src/shared/GraphQLRequestClient';
import { SearchResult, SearchResultItem } from 'lib/component-props/search';
import { useI18n } from 'next-localization';

interface SearchProps {
  params: {
    Limit: number;
    IsCustomerSerchPage: boolean;
  };
}

type Pagination = {
  after: string;
  page: number;
};

export const Default = ({ params }: SearchProps): JSX.Element => {
  const { locale } = useI18n();
  const [pageInfo, setPageInfo] = useState<Pagination[]>([{ page: 1, after: '' }]);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [searchResults, setSearchResults] = useState<SearchResultItem[]>([]);
  const [pageCount, setPageCount] = useState<number>(0);
  const [total, setTotal] = useState<number>(0);
  const [limit] = useState<number>(params.Limit || 10);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const nextButtonRef = useRef<HTMLSpanElement>(null);
  const prevButtonRef = useRef<HTMLSpanElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);
  const [callApi, setCallApi] = useState<number>(1);
  const [after, setAfter] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const getSearchVariables = useCallback((after: string, term: string) => {
    return {
      term: term,
      templateId: params.IsCustomerSerchPage
        ? 'b81ba5bf9ba14904a50ce323f2c0868c'
        : '965889625d574bb2a701b67c1c511788',
      pdfFolderPath: '6388a9a2637f4455bf0937430e4883ed',
      limit: limit,
      after: after,
      language: locale(),
    };
  }, []);

  const handleNextButtonClick = useCallback(() => {
    const pagination = pageInfo.find((info) => info.page === currentPage + 1);
    setAfter(pagination?.after || '');
    setCurrentPage(currentPage + 1);
    setCallApi(callApi + 1);
  }, [pageInfo, currentPage, callApi]);

  const handlePrevButtonClick = useCallback(() => {
    const pagination = pageInfo.find((info) => info.page === currentPage - 1);
    setAfter(pagination?.after || '');
    setCurrentPage(currentPage - 1);
    setCallApi(callApi + 1);
  }, [pageInfo, currentPage, callApi]);

  const handleSearchButtonClick = useCallback(() => {
    setCurrentPage(1);
    setAfter('');
    setPageInfo([{ page: 1, after: '' }]);
    setSearchTerm(searchRef.current?.value || '');
    setCallApi(callApi + 1);
  }, [callApi]);

  const handleSearchKeyDown = useCallback(
    async (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter' && searchRef.current?.value !== searchTerm) {
        handleSearchButtonClick();
      }
    },
    [searchTerm]
  );

  const fetchData = async (after: string, term: string) => {
    const graphClient = GraphQLSearchClient();
    const data = await graphClient.request<SearchResult>(
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      SearchQuery() as any,
      getSearchVariables(after, term)
    );
    return data;
  };

  const fetchDataAsync = useCallback(async () => {
    const data = await fetchData(after, searchTerm);
    if (data.pageresult.total > 0) {
      const totalResultCount = data.pageresult.total;
      const page: number =
        Math.floor(totalResultCount / limit) + (totalResultCount % limit > 0 ? 1 : 0);
      setTotal(totalResultCount);
      setPageCount(page);
      setSearchResults(data.pageresult.results);
      const updatedPageInfo = {
        after: data.pageresult.pageInfo.endCursor,
        page: currentPage + 1,
      };
      setPageInfo([...pageInfo, updatedPageInfo]);
      setIsLoading(true);
    } else {
      setTotal(0);
      setPageCount(0);
      setSearchResults([]);
      setPageInfo([]);
      setCurrentPage(1);
    }
  }, [after, searchTerm]);

  useEffect(() => {
    fetchDataAsync();
  }, [callApi]);

  return (
    <div className="component content col-12 page-title-section text-start">
      <div className="component-content">
        <div className="row component-search-result">
          <div className="form-component p-0">
            <div className="container remove-tablet-default-padding">
              <div className="row justify-content-lg-center">
                <div className="col-lg-10 col-xl-8">
                  <div className="search-result-container">
                    <div className="component mycp-search-box  col-12">
                      <div className="component-content">
                        <span className="twitter-typeahead form-group">
                          <input
                            type="text"
                            className="form-control search-box-input tt-input"
                            placeholder="Please type keywords to search"
                            id="search-box-input"
                            ref={searchRef}
                            onKeyDown={handleSearchKeyDown}
                          ></input>
                        </span>
                        <button
                          className="search-box-button"
                          type="submit"
                          onClick={handleSearchButtonClick}
                        >
                          Search
                        </button>
                      </div>
                    </div>
                    {searchResults.length > 0 ? (
                      <div className="row">
                        <div className="component search-results-count col-12">
                          <div className="component-content">
                            <div className="results-count">
                              {limit * (currentPage - 1) + 1} -{' '}
                              {pageCount === currentPage ? total : limit * currentPage} of {total}
                            </div>
                            <div className="progress"></div>
                          </div>
                        </div>

                        <div className="component search-results">
                          <ul className="search-result-list">
                            {searchResults.map((result, index) => (
                              <li key={index}>
                                <a
                                  href={
                                    result.navigationTitle?.value
                                      ? result.url.path
                                      : `/-/media/${result.id}.${result.extention?.value}`
                                  }
                                  target={result.navigationTitle?.value ? '_self' : '_blank'}
                                  className="h5"
                                >
                                  {result.navigationTitle?.value || result.title?.value}
                                </a>
                                {result.description?.value && <p>{result.description.value}</p>}
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div className="component mycp-page-selector col-12">
                          <ul className="page-selector-list justify-content-center">
                            <li
                              className={`page-selector-item-previous ${
                                currentPage === 1 ? 'inactive' : ''
                              }`}
                            >
                              <span ref={prevButtonRef} onClick={handlePrevButtonClick}>
                                <i className="fa-solid fa-angle-left"></i>
                                <span className="sr-only">Previous</span>
                              </span>
                            </li>
                            <li className="select-container">
                              <input
                                type="text"
                                disabled={true}
                                value={currentPage}
                                className="form-control page-selector-input"
                                id="page-selector-input"
                              ></input>
                            </li>
                            <li className="page-selector-item-last">
                              <span>of {pageCount}</span>
                            </li>
                            <li
                              className={`page-selector-item-next ${
                                currentPage === pageCount ? 'inactive' : ''
                              }`}
                            >
                              <span ref={nextButtonRef} onClick={handleNextButtonClick}>
                                <i className="fa-solid fa-angle-right"></i>
                                <span className="sr-only">Next</span>
                              </span>
                            </li>
                          </ul>
                        </div>
                      </div>
                    ) : (
                      isLoading && <div className="no-results">No Results</div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
