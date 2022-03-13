import { gql, request } from 'graphql-request';

interface Path {
  id: string;
  title: string;
  slug: string;
}

const graphqlAPI = process.env.NEXT_PUBLIC_GRAPCMS_ENDPOINT || '';

const getPaths = async () => {
  const query = gql`
    query getPaths {
      posts {
        id
        title
        slug
      }
    }
  `;

  const results = await request<{ posts: Path[] }>(graphqlAPI, query);
  return results.posts;
};

export default getPaths;
