import { gql, request } from 'graphql-request';
import { Category } from '../types';

const graphqlAPI = process.env.NEXT_PUBLIC_GRAPCMS_ENDPOINT || '';

const getCategories = async () => {
  const query = gql`
    query getCategories {
      categories {
        name
        slug
        id
      }
    }
  `;

  const results = await request<{ categories: Category[] }>(graphqlAPI, query);
  return results.categories;
};

export default getCategories;
