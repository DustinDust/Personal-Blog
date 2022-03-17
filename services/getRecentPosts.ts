import { request, gql } from 'graphql-request';
import { ThumbnailPostResponse } from '../types';

const graphqlAPI = process.env.NEXT_PUBLIC_GRAPCMS_ENDPOINT || '';

const getRecentPost = async () => {
  const query = gql`
    query GetPostDetail {
      posts(orderBy: createdAt_DESC, first: 3) {
        title
        featuredImage {
          url
        }
        createdAt
        slug
      }
    }
  `;
  const result: { posts: ThumbnailPostResponse[] } = await request<{
    posts: ThumbnailPostResponse[];
  }>(graphqlAPI, query);
  return result.posts;
};
export default getRecentPost;
