import Image from 'next/image';
import React from 'react';
import { PostDetailResponse } from '../types';

const PostDetail: React.FC<{ post: PostDetailResponse }> = (props) => {
  return (
    <div className='bg-white shadow-lg rounded-lg lg:p-8 pb-12 mb-8'>
      <div className='relative overflow-hidden shadow-md mb-6'>
        <Image
          src={props.post.featuredImage.url}
          alt={`${props.post.title} featured image`}
          layout='fill'
          className='object-top w-full h-auto rounded-t-lg'
        />
      </div>
    </div>
  );
};

export default PostDetail;
