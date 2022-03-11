import Author from "./Author";
import Category from "./Category";

type Post = {
  title:string;
  excerpt: string;
  author:Author;
  featuredPost: boolean;
  content: string;
  categories: Category[]
  featuredImage: string;
  createdAt: string;
  id: string;
}

export default Post;
