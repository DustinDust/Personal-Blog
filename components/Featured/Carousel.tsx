import React from 'react';
import Carousel from 'react-multi-carousel';
import { PostNode as Post } from '../../types/responses/GetPost';
import FeaturedPostCard from './FeaturedPostCard';
import 'react-multi-carousel/lib/styles.css';

const FeaturedCarousel: React.FC<{ posts: Post[] }> = (props) => {
  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 1024 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 1024, min: 768 },
      items: 3,
    },
    tablet: {
      breakpoint: { max: 768, min: 640 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 640, min: 0 },
      items: 1,
    },
  };

  return (
    <div className='my-2 mx-1 lg:mx-4 lg:my-8 rounded-lg bg-transparent'>
      <Carousel infinite itemClass='px-4' responsive={responsive} swipeable>
        {props.posts.map((post) => {
          return <FeaturedPostCard post={post} key={post.slug} />;
        })}
      </Carousel>
    </div>
  );
};

export default FeaturedCarousel;
