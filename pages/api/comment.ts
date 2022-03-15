import type { NextApiRequest, NextApiResponse } from 'next';
import { GraphQLClient, gql } from 'graphql-request';
import { CreateCommentResponse } from '../../types';

const graphqlEndPoint = process.env.NEXT_PUBLIC_GRAPCMS_ENDPOINT || '';

export default async function commentAPI(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const gqlClient = new GraphQLClient(graphqlEndPoint, {
    headers: {
      authorization: `Bearer ${process.env.GRAPHCMS_PAT}`,
    },
  });

  const query = gql`
    mutation createComment(
      $name: String!
      $email: String!
      $content: String!
      $slug: String!
    ) {
      createComment(
        data: {
          name: $name
          email: $email
          content: $content
          post: { connect: { slug: $slug } }
        }
      ) {
        id
      }
    }
  `;
  const variables = {
    name: req.body.name,
    email: req.body.email,
    content: req.body.content,
    slug: req.body.slug,
  };
  try {
    const result = await gqlClient.request<CreateCommentResponse>(
      query,
      variables
    );
    return res.status(200).send(result);
  } catch (error) {
    console.log(error);
    return res.status(400).send(error);
  }
}
