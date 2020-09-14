import { rest } from 'msw'

export const handlers = [
  rest.get('/projects', (req, res, ctx) => {
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
