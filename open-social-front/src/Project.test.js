import React from 'react';
import { render } from '@testing-library/react';
import { rest } from 'msw'
import Project from "./Project";

const project = {
  project_name: 'project1',
  full_name: 'user1/project1'
}

test('renders a project information', () => {
  const { getByText } = render(<Project project={project}/>);
  const projectName = getByText(/project1/i);
  const projectFullName = getByText(/user1\/project1/i)
  expect(projectName).toBeInTheDocument();
  expect(projectFullName).toBeInTheDocument();
});
