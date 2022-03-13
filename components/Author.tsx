import Image from 'next/image';
import React from 'react';
import type { Author as AuthorType } from '../types';

const Author: React.FC<{ author: AuthorType }> = (props) => {
  return (
    <div className='text-center mt-20 mb-8 p-12 relative rounded-lg bg-black bg-opacity-20'>
      <div className='absolute left-0 right-0 -top-14'>
        <Image
          src={props.author.photo.url}
          alt={props.author.name}
          width={100}
          height={100}
          className='align-middle rounded-full'
        />
      </div>
      <h3 className='text-white text-xl font-bold my-4'>{props.author.name}</h3>
      <p className='text-white text-lg'>{props.author.bio}</p>
    </div>
  );
};

export default Author;
