import React from 'react';
import { render } from '@testing-library/react';
import Project from "./Project";

const project = {
  project_name: 'project1',
  full_name: 'user1/project1',
  description: 'fake_description',
  contributors: '19',
  open_issues: '25',
  total_commits: '10',
  watchers: '17',
  stargazers: '35',
  project_url: 'https://github.com/user1/project1',
  pushed: '2018-09-11T17:30:35Z',
  created: '2018-09-12T16:30:35Z',
  updated: '2020-03-28T18:27:57Z',
  forks: '2313',
  language: 'Python',
  last_commit_dates: ['2020-11-23T19:50:55Z', '2020-11-23T19:50:11Z']
}

test('renders a project information', () => {
  const { getByText } = render(<Project project={project}/>);
  const projectName = getByText(project.project_name);
  const projectFullName = getByText(project.full_name, { exact: false });
  const description = getByText(project.description, { exact: false });
  const contributors = getByText(project.contributors, { exact: false });
  const openIssues = getByText(project.open_issues, { exact: false });
  const totalCommits = getByText(project.total_commits, { exact: false });
  const watchers = getByText(project.watchers, { exact: false });
  const stargazers = getByText(project.stargazers, { exact: false });
  const pushed = getByText(project.pushed.split('T')[0], { exact: false });
  const created = getByText(project.created.split('T')[0], { exact: false });
  const updated = getByText(project.updated.split('T')[0], { exact: false });
  const forks = getByText(project.forks, { exact: false });
  const language = getByText(project.language, { exact: false });

  expect(projectName).toBeInTheDocument();
  expect(projectFullName).toBeInTheDocument();
  expect(description).toBeInTheDocument();
  expect(contributors).toBeInTheDocument();
  expect(openIssues).toBeInTheDocument();
  expect(totalCommits).toBeInTheDocument();
  expect(watchers).toBeInTheDocument();
  expect(stargazers).toBeInTheDocument();
  expect(pushed).toBeInTheDocument();
  expect(created).toBeInTheDocument();
  expect(updated).toBeInTheDocument();
  expect(forks).toBeInTheDocument();
  expect(language).toBeInTheDocument();
});
