import Image from 'next/image';
import React from 'react';
import { PostDetailResponse } from '../types';
import PostInfo from './PostInfo';
import parse, {
  HTMLReactParserOptions,
  Element,
  domToReact,
  attributesToProps,
} from 'html-react-parser';

const PostDetail: React.FC<{ post: PostDetailResponse }> = (props) => {
  const imgsrc = props.post.featuredImage.url;
  const parseOptions: HTMLReactParserOptions = {
    replace: (domnode) => {
      if (domnode instanceof Element && domnode.name === 'p') {
        return (
          <p className='mb-8'>{domToReact(domnode.children, parseOptions)}</p>
        );
      }
      if (domnode instanceof Element && domnode.name === 'h3') {
        return (
          <h3 className='text-xl font-semibold mb-4'>
            {domToReact(domnode.children, parseOptions)}
          </h3>
        );
      }
      if (domnode instanceof Element && domnode.name === 'h4') {
        return (
          <h4 className='text-md font-semibold mb-4'>
            {domToReact(domnode.children, parseOptions)}
          </h4>
        );
      }
      if (domnode instanceof Element && domnode.name === 'img') {
        const props = attributesToProps(domnode.attribs);
        return <img {...props} />;
      } else return;
    },
  };
  return (
    <div className='bg-white shadow-lg rounded-lg lg:p-8 pb-12 mb-8'>
      <div className='relative overflow-hidden shadow-md mb-6 pb-80'>
        <Image
          src={imgsrc}
          alt={props.post.title}
          layout='fill'
          className='absolute object-contain lg:object-cover w-full h-auto rounded-t-lg'
        />
      </div>
      <div className='px-4 lg:px-0'>
        <div className='flex items-center lg:mb-8 w-full'>
          <PostInfo post={props.post} />
        </div>
        <h1 className='mb-8 text-3xl font-semibold text-center'>
          {props.post.title}
        </h1>
      </div>
      <div className='px-4'>{parse(props.post.content.html, parseOptions)}</div>
    </div>
  );
};

export default PostDetail;
