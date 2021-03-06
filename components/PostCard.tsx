import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { PostNode } from '../types/responses/GetPost';
import moment from 'moment';

const PostCard: React.FC<{ post: PostNode }> = (props) => {
  return (
    <div className='bg-white shadow-lg rounded-lg p-0 lg:p-8 pb-12 mb-8'>
      <div className='relative overflow-hidden shadow-md pb-80 mb-6'>
        <Image
          src={props.post.featuredImage.url}
          alt={props.post.title}
          layout='fill'
          className='absolute object-contain lg:object-cover h-auto w-full shadow-lg rounded-t-lg lg:rounded-lg'
        />
      </div>
      <h1 className='transition duration-300 hover:transition hover:duration-300 text-center mb-8 cursor-pointer hover:text-yellow-700 text-2xl px-4  lg:text-3xl md:text-3xl font-semibold'>
        <Link href={`/post/${props.post.slug}`}>{props.post.title}</Link>
      </h1>
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
      <p className='text-center lg:text-lg text-gray-700 font-normal px-8 text-sm lg:p-20 mb-8'>
        {props.post.excerpt}
      </p>
      <div className='text-center'>
        <Link href={`/post/${props.post.slug}`} passHref>
          <span className='text-lg cursor-pointer bg-yellow-700 px-8 py-3 rounded-full inline-block text-white transform hover:-translate-y-2 transition duration-300 font-bold '>
            Read more
          </span>
        </Link>
      </div>
    </div>
  );
};
export default PostCard;
