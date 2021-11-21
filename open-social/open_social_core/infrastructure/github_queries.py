initial_query = '''
query recentRepos($query: String!, $date_limit: GitTimestamp!, $after: String) {
  search(type: REPOSITORY, query: $query, first: 50, after: $after) {
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
          owner {
            avatarUrl
          }
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
          languages(first: 10) {
            nodes {
              name
            }
          }
          defaultBranchRef {
            target {
              ... on Commit {
                history(since: $date_limit) {
                  totalCount
                  edges {
                    node {
                      author {
                        name
                        date
                      }
                    }
                  }
                  pageInfo {
                    hasNextPage
                    endCursor
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

commit_query = '''
query recentCommits($repo_name: String!, $repo_owner: String!, $date_limit: GitTimestamp!, $after: String) {
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
