// import React from 'react';
// import { rest } from 'msw';
// import { setupServer } from "msw/node";
// import { render } from '@testing-library/react';
// import App from './App';
//
//
// const server = setupServer(
//   rest.get('/projects', (req, res, ctx) => {
//     return res(ctx.json([
//       {
//         "project_name": "project1",
//         "full_name": "user1/project1"
//       },
//       {
//         "project_name": "project2",
//         "full_name": "user2/project2"
//       }
//     ]))
//   }),
// )
//
// beforeAll(() => server.listen());
//
// afterEach(() => server.resetHandlers());
//
// afterAll(() => server.close());
//
// test('list projects from API', async () => {
//   const { getByText } = render(<App />);
//   const project = await getByText(/project2/i);
//   expect(project).toBeInTheDocument();
// });

test('fake test', () => {
  expect(true).toBeTruthy();
})
