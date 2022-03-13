import React from 'react';
import { PostDetailResponse } from '../types';
import Image from 'next/image';
import moment from 'moment';

const PostInfo: React.FC<{ post: PostDetailResponse }> = (props) => {
  return (
    <div className='block lg:flex text-center items-center justify-center mb-8 w-full'>
      <div className='flex items-center justify-center mb-4 lg:mb-0 w-full lg:w-auto mr-8'>
        <Image
          alt='author'
          height={30}
          width={30}
          className='align-middle rounded-full'
          src={props.post.author.photo.url}
        />
        <p className='inline align-middle text-gray-700 ml-2 text-lg'>
          {props.post.author.name}
        </p>
      </div>
      <div className='font-medium text-gray-700'>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          className='h-6 w-6 inline mr-2 text-yellow-700'
          fill='none'
          viewBox='0 0 24 24'
          stroke='currentColor'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth='2'
            d='M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z'
          />
        </svg>
        <span>{moment(props.post.createdAt).format('MMM DD, YYYY')}</span>
      </div>
    </div>
  );
};

export default PostInfo;
