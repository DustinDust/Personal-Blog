import Author from "../Author";

type RecentPostResponse = {
  title: string;
  slug: string;
  featuredImage: {url:string;};
  createdAt:string;
}

export default RecentPostResponse;