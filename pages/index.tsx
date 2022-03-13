import type { GetStaticProps, NextPage } from 'next';
import Head from 'next/head';
import { PostCard, PostWidget, Categories } from '../components';
import type { GetPostResponse, Post } from '../types';
import 'tailwindcss/tailwind.css';
import { getPosts } from '../services';

const Home: NextPage<{ posts: GetPostResponse[] }> = (props) => {
  return (
    <div className='container mx-auto px-10 mb-8'>
      <Head>
        <title>Personal Blog</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <div className='grid grid-cols-1 lg:grid-cols-12 gap-12'>
        <div className='lg:col-span-8 col-span-1'>
          {props.posts.map((post, index) => (
            <PostCard post={post.node} key={index} />
          ))}
        </div>
        <div className='lg:col-span-4 col-span-1'>
          <div className='lg:sticky relative top-8'>
            <PostWidget />
            <Categories />
          </div>
        </div>
      </div>
    </div>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const posts = (await getPosts()) || [];
  return {
    props: {
      posts,
    },
  };
};

export default Home;
