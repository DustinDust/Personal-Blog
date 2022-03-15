import { request, gql } from 'graphql-request';
import { Comment } from '../types';

const graphqlAPIEndPoint = process.env.NEXT_PUBLIC_GRAPCMS_ENDPOINT || '';

const getComments = async (slug: string) => {
  const query = gql`
    query getComments($slug: String!) {
      comments(where: { post: { slug: $slug } }) {
        name
        email
        createdAt
        content
      }
    }
  `;

  const result = await request<{ comments: Comment[] }>(
    graphqlAPIEndPoint,
    query,
    { slug: slug }
  );
  return result.comments;
};

export default getComments;
