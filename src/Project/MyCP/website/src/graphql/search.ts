import gql from 'graphql-tag';

const SearchQuery = () => {
  return gql`
    fragment searchResults on Item {
      ... on Page_0fa029cf427f4f7aa1dbdd526e92fe94 {
        navigationTitle {
          value
        }
      }
      url {
        path
      }
    }

    fragment searchPDFResults on Item {
      ... on Item {
        title: field(name: "Title") {
          value
        }
        description: field(name: "Description") {
          value
        }
        id
        extention: field(name: "Extension") {
          value
        }
      }
    }

    query (
      $language: String!
      $term: String!
      $templateId: String!
      $pdfFolderPath: String!
      $limit: Int!
      $after: String
    ) {
      pageresult: search(
        where: {
          OR: [
            {
              AND: [
                { name: "_templates", value: $templateId, operator: EQ }
                { name: "Exclude in Search", value: "0", operator: EQ }
                { name: "_language", value: $language }
                { OR: [{ name: "navigationTitle", value: $term, operator: CONTAINS }] }
              ]
            }
            {
              AND: [
                { name: "_path", value: $pdfFolderPath, operator: EQ }
                { name: "_language", value: $language }
                {
                  OR: [
                    { name: "title", value: $term, operator: CONTAINS }
                    { name: "description", value: $term, operator: CONTAINS }
                  ]
                }
              ]
            }
          ]
        }
        first: $limit
        after: $after
      ) {
        total
        pageInfo {
          endCursor
          hasNext
        }
        results {
          ...searchResults
          ...searchPDFResults
        }
      }
    }
  `;
};

export default SearchQuery;
