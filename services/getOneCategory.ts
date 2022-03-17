import { request, gql } from 'graphql-request';
import { Category } from '../types';

const graphqlAPI = process.env.NEXT_PUBLIC_GRAPCMS_ENDPOINT || '';

const getOneCategory = async (slug: string) => {
  const query = gql`
    query getCategoryDetail($slug: String!) {
      category(where: { slug: $slug }) {
        id
        name
        slug
      }
    }
  `;
  const variables = {
    slug: slug,
  };

  const result = await request<{ category: Category }>(
    graphqlAPI,
    query,
    variables
  );
  return result.category;
};

export default getOneCategory;
