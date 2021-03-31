initial_query = '''
query recentRepos($query: String!, $date_limit: GitTimestamp!, $after: String) {
  search(type: REPOSITORY, query: $query, first: 100, after: $after) {
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
          commitsCount: object(expression: "HEAD") {
            ... on Commit {
              history(since: $date_limit) {
                pageInfo {
                  endCursor
                  hasNextPage
                }
                totalCount
                edges {
                  node {
                    author {
                      name
                      date
                    }
                  }
                }
              }
            }
          }
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

commit_query = '''
query recentRepos($repo_name: String!, $repo_owner: String!, $date_limit: GitTimestamp!, $after: String) {
  repository(name: $repo_name, owner: $repo_owner) {
    defaultBranchRef {
      target {
        ... on Commit {
          history(
            since: $date_limit
            first: 100
            after: $after
          ) {
            pageInfo {
              hasNextPage
              endCursor
            }
            edges {
              node {
                author {
                  name
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
'''
