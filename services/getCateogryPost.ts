import { request, gql } from 'graphql-request';
import { GetPostResponse } from '../types';
import { PostNode as Post } from '../types/responses/GetPost';

const graphqlAPI = process.env.NEXT_PUBLIC_GRAPCMS_ENDPOINT || '';

const getCategoryPost = async (slug: string) => {
  const query = gql`
    query getCategoryPost($slug: String!) {
      posts(where: { categories_some: { slug: $slug } }) {
        author {
          name
          bio
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
          id
          name
          slug
        }
      }
    }
  `;

  const variables = {
    slug: slug,
  };

  const result = await request<{ posts: Post[] }>(graphqlAPI, query, variables);
  return result.posts;
};

export default getCategoryPost;
