initial_query = '''
query recentRepos($query: String!, $date_limit: GitTimestamp!) {
  search(type: REPOSITORY, query: $query, first: 100) {
    pageInfo {
      startCursor
      hasNextPage
      endCursor
    }
    repos: edges {
      repo: node {
        ... on Repository {
          nameWithOwner
          url
          pushedAt
          description
          forkCount
          watchers {
            totalCount
          }
          stargazerCount
          createdAt
          updatedAt
          isArchived
          primaryLanguage {
            name
          }
          languages(first: 10) {
            nodes {
              name
            }
          }
          issues(states: OPEN) {
            totalCount
          }
          commitsCount: object(expression: "master") {
            ... on Commit {
              history(since: $date_limit) {
                totalCount
                edges {
                  node {
                    author {
                      date
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}
'''
