import { request, gql } from 'graphql-request';
import { PostDetailResponse } from '../types';

const grapqlAPI = process.env.NEXT_PUBLIC_GRAPCMS_ENDPOINT || '';

const getPostDetail = async (slug: string) => {
  const query = gql`
    query getPostDetail($slug: String!) {
      post(where: { slug: $slug }) {
        author {
          name
          bio
          photo {
            url
          }
        }
        title
        content {
          html
        }
        createdAt
        slug
        featuredImage {
          url
        }
        categories {
          slug
          name
          id
        }
      }
    }
  `;

  const variables = {
    slug: slug,
  };

  const results = await request<{ post: PostDetailResponse }>(
    grapqlAPI,
    query,
    variables
  );
  return results.post;
};

export default getPostDetail;
