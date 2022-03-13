import Author from "../Author";

type ThumbnailPostResponse = {
  title: string;
  slug: string;
  featuredImage: {url:string;};
  createdAt:string;
}

export default ThumbnailPostResponse;