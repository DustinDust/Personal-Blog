import { request, gql } from "graphql-request";
import { RecentPostResponse } from "../types";

const graphqlAPI = process.env.NEXT_PUBLIC_GRAPCMS_ENDPOINT || '';

const getRecentPost = async () => {
  const query = gql`
    query GetPostDetail{
      posts(
        orderBy: createdAt_ASC
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
  const result:{posts: RecentPostResponse[]} = await request<{posts: RecentPostResponse[]}>(graphqlAPI, query);
  return result.posts;
}
export default getRecentPost;