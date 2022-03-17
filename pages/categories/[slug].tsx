import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import { getCategories, getCategoryPost } from '../../services';
import Head from 'next/head';
import { PostCard, PostWidget, Categories } from '../../components';
import { PostNode as Post } from '../../types/responses/GetPost';
import { Category } from '../../types';
import getOneCategory from '../../services/getOneCategory';

const CategoryPage: NextPage<{ posts: Post[]; categoryInfo: Category }> = (
  props
) => {
  console.log(props.posts);
  return (
    <div className='container mx-auto px-10 mb-8'>
      <Head>
        <title>
          {props.categoryInfo ? props.categoryInfo.name : 'Categorized Posts'}
        </title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <div className='grid grid-cols-1 lg:grid-cols-12 gap-12'>
        <div className='lg:col-span-8 col-span-1'>
          {props.posts.map((post, index) => (
            <PostCard post={post} key={index} />
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

export const getStaticPaths: GetStaticPaths = async () => {
  const categories = await getCategories();
  const paths = categories.map((category) => {
    return { params: { slug: category.slug } };
  });

  return {
    paths,
    fallback: 'blocking',
  };
};

export const getStaticProps: GetStaticProps = async (context) => {
  let posts: Post[] | undefined = undefined;
  let categoryInfo: Category | undefined = undefined;
  const slug = context.params?.slug;
  if (slug) {
    try {
      posts = await getCategoryPost(slug as string);
      categoryInfo = await getOneCategory(slug as string);
    } catch (error) {
      console.log(error);
    }
  }

  return {
    props: {
      posts: posts,
      categoryInfo: categoryInfo,
    },
  };
};

export default CategoryPage;
