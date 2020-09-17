import { rest } from 'msw'

const api_url = 'https://01ruue3xk0.execute-api.eu-west-1.amazonaws.com';

export const handlers = [
  rest.get(api_url + '/dev/projects', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json([
        {
          "project_name": "project1",
          "full_name": "user1/project1"
        },
        {
          "project_name": "project2",
          "full_name": "user2/project2"
        }
      ]),
    )
  }),
]
