import Author from "../Author";
import Category from "../Category";

export type PostNode = {
  author: Author;
  createdAt: string;
  slug:string;
  title:string;
  excerpt: string;
  featuredImage: {url:string}
  categories:Category[];
}

type GetPostResponse = {
  node: PostNode;
}

export default GetPostResponse;