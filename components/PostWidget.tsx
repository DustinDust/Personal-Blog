import moment from 'moment';
import Link from 'next/link';
import Image from 'next/image';
import React, { useState, useEffect } from 'react';
import getRecentPost from '../services/getRecentPosts';
import getSimilarPosts from '../services/getSimilarPosts';
import { ThumbnailPostResponse } from '../types';

const PostWidget: React.FC<{
  categories?: string[] | undefined;
  slug?: string | undefined;
}> = (props) => {
  const [relatedPosts, setRelatedPosts] = useState<ThumbnailPostResponse[]>([]);
  useEffect(() => {
    if (props.slug && props.categories) {
      getSimilarPosts(props.slug, props.categories)
        .then((results) => {
          console.log(results);
          setRelatedPosts(results);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      getRecentPost()
        .then((result) => {
          console.log(result);
          setRelatedPosts(result);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [setRelatedPosts, props]);
  return (
    <div className='bg-white shadow-lg rounded-lg p-8 mb-8'>
      <h3 className='text-xl mb-8 font-semibold border-b pb-4'>
        {props.slug ? 'Related Posts' : 'Recent posts'}
      </h3>
      <div>
        {relatedPosts.map((post) => (
          <div key={post.slug} className='flex items-center w-full mb-4'>
            <div className='w-16 flex-none'>
              <Image
                alt={post.title}
                width={60}
                height={60}
                src={post.featuredImage.url}
                className='align-middle object-scale-down bg-gray-100 rounded-full'
              />
            </div>
            <div className='flex-grow ml-4'>
              <p className='text-gray-500 text-xs'>
                {moment(post.createdAt).format('MMM DD, YYYY')}
              </p>
              <p className='text-gray-700 text-base hover:text-yellow-700 hover:transition-all transition-all hover:scale-105'>
                <Link href={`/post/${post.slug}`}>{post.title}</Link>
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default PostWidget;
