import Author from '../Author';
import Category from '../Category';

export default interface PostDetail {
  author: Author;
  title: string;
  content: { html: string };
  createdAt: string;
  slug: string;
  featuredImage: { url: string };
  categories: Category[];
}
