import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import Head from 'next/head';
import React from 'react';
import {
  Categories,
  PostWidget,
  Author,
  Comments,
  PostDetail,
  CommentForm,
} from '../../components';
import { getPaths, getPostDetail } from '../../services';
import { PostDetailResponse } from '../../types';

const PostDetails: NextPage<{ post: PostDetailResponse | undefined }> = (
  props
) => {
  return (
    <>
      <Head>
        <title>Blog post detail</title>
      </Head>
      <div className='container mx-auto px-10 mb-8'>
        <div className='grid grid-cols-1 lg:grid-cols-12 gap-12'>
          <div className='col-span-1 lg:col-span-8 text-white'>
            <PostDetail post={props.post!} />
            <Author author={props.post?.author!} />
            <CommentForm slug={props.post?.slug!} />
            <Comments slug={props.post?.slug!} />
          </div>
          <div className='col-span-1 lg:col-span-4'>
            <div className='relative lg:sticky top-8'>
              <PostWidget
                categories={props.post?.categories.map(
                  (category) => category.slug
                )}
                slug={props.post?.slug}
              />
              <Categories />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export const getStaticProps: GetStaticProps = async (context) => {
  let results: PostDetailResponse | undefined = undefined;
  if (context.params) {
    results = await getPostDetail(context.params.slug as string);
  }
  return {
    props: {
      post: results,
    },
  };
};

export const getStaticPaths: GetStaticPaths = async (context) => {
  const paths = await getPaths();
  return {
    paths: paths.map((path) => {
      return { params: { slug: path.slug } };
    }),
    fallback: 'blocking',
  };
};

export default PostDetails;
