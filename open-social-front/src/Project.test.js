import React from 'react';
import { render } from '@testing-library/react';
import Project from "./Project";

const project = {
  project_name: 'project1',
  full_name: 'user1/project1',
  stargazers: '34',
  watchers: '17',
  project_url: 'https://github.com/user1/project1',
  created: '2018-09-12T16:30:35Z',
  updated: '2020-03-28T18:27:57Z'
}

test('renders a project information', () => {
  const { getByText } = render(<Project project={project}/>);
  const projectName = getByText(project.project_name);
  const projectFullName = getByText(project.full_name, { exact: false })
  const stargazers = getByText(project.stargazers, { exact: false });
  const watchers = getByText(project.watchers, { exact: false });
  const created = getByText(project.created, { exact: false });
  const updated = getByText(project.updated, { exact: false });

  expect(projectName).toBeInTheDocument();
  expect(projectName).toHaveAttribute('href', project.project_url);
  expect(projectFullName).toBeInTheDocument();
  expect(stargazers).toBeInTheDocument();
  expect(watchers).toBeInTheDocument();
  expect(created).toBeInTheDocument();
  expect(updated).toBeInTheDocument();
});
