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
          name
          description
          issues(states: OPEN) {
            totalCount
          }
          watchers {
            totalCount
          }
          stargazerCount
          forkCount
          url
          pushedAt
          createdAt
          updatedAt
          primaryLanguage {
            name
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
          isArchived
          languages(first: 10) {
            nodes {
              name
            }
          }
        }
      }
    }
  }
}
'''
