import { request, gql } from 'graphql-request';
import type { PostNode as Post } from '../types/responses/GetPost';

const graphcmsEndPoint = process.env.NEXT_PUBLIC_GRAPCMS_ENDPOINT || '';

const getFeaturedPost = async () => {
  const query = gql`
    query getFeaturedPosts {
      posts(where: { featuredPost: true }) {
        author {
          bio
          name
          photo {
            url
          }
        }
        title
        createdAt
        slug
        featuredImage {
          url
        }
      }
    }
  `;

  const result = await request<{ posts: Post }>(graphcmsEndPoint, query);
  return result.posts;
};

export default getFeaturedPost;
