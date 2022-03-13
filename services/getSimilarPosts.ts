import { gql, request } from "graphql-request";
import { ThumbnailPostResponse } from "../types";


const graphqlAPI = process.env.NEXT_PUBLIC_GRAPCMS_ENDPOINT || '';

const getSimilarPosts = async (slug: string, categories: string[]) => {
  const query = gql`
    query getPostDetail($slug: String!, $categories:[String!]!) {
      posts (
        where: {slug_not: $slug, AND: {categories_some: {slug_in: $categories}}}
        last: 3
      ) {
        title
        featuredImage {
          url
        }
        createdAt
        slug
      }
    }
  `;
  const variables = {
    slug:  slug,
    categories: categories,
  }
  const results = await request<{posts: ThumbnailPostResponse[]}>(graphqlAPI, query, variables);
  return results.posts;
}
export default getSimilarPosts;