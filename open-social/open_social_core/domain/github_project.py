from datetime import datetime, timedelta
from dataclasses import dataclass, field


@dataclass(frozen=True)
class GithubProjectDTO:
    full_name: str
    project_name: str
    avatar_url: str
    description: str
    homepage: str
    contributors: int
    open_issues: int
    watchers: int
    stargazers: int
    forks: int
    project_url: str
    pushed: str
    created: str
    updated: str
    language: str
    total_commits: int
    commits_graph_data: list[dict]
    rate: float
    topic: str
    sorting: int
    _ttl: int = field(init=False, repr=False)

    def __post_init__(self) -> None:
        object.__setattr__(
            self, '_ttl', int((datetime.today() + timedelta(days=7)).timestamp())
        )
