import { request, gql } from 'graphql-request';
import { GetPostResponse } from '../types';

type ResponseType = {
  postsConnection: { edges: GetPostResponse[] };
};
const grapqlAPI = process.env.NEXT_PUBLIC_GRAPCMS_ENDPOINT || '';

const getPosts = async () => {
  const query = gql`
    query MyQuery {
      postsConnection {
        edges {
          node {
            author {
              bio
              name
              id
              photo {
                url
              }
            }
            createdAt
            slug
            title
            excerpt
            featuredImage {
              url
            }
            categories {
              name
              slug
              id
            }
          }
        }
      }
    }
  `;

  const results: ResponseType = await request<ResponseType>(grapqlAPI, query);
  return results.postsConnection.edges;
};

export default getPosts;