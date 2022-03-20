import { PostNode as Post } from '../../types/responses/GetPost';
import Image from 'next/image';
import moment from 'moment';
import Link from 'next/link';

const FeaturedPostCard: React.FC<{ post: Post }> = (props) => {
  return (
    <div className='bg-white relative h-72 rounded-lg'>
      <div
        className='absolute rounded-lg bg-center bg-no-repeat bg-cover shadow-md inline-block w-full h-72'
        style={{ backgroundImage: `url('${props.post.featuredImage.url}')` }}
      />
      <div className='absolute rounded-lg bg-center bg-gradient-to-b opacity-90 from-gray-600 via-gray-800 to-gray-900 w-full h-72' />
      <div className='flex flex-col rounded-lg p-4 items-center justify-center absolute w-full h-full'>
        <p className='text-white mb-4 text-shadow font-semibold text-xs'>
          {moment(props.post.createdAt).format('MMM DD, YYYY')}
        </p>
        <p className='text-white mb-4 text-shadow font-semibold text-2xl text-center'>
          {props.post.title}
        </p>
        <div className='flex items-center absolute bottom-5 w-full justify-center'>
          <Image
            unoptimized
            alt={props.post.author.name}
            height='30px'
            width='30px'
            className='align-middle drop-shadow-lg rounded-full'
            src={props.post.author.photo.url}
          />
          <p className='inline align-middle text-white text-shadow ml-2 font-medium'>
            {props.post.author.name}
          </p>
        </div>
      </div>
      <Link passHref href={`/post/${props.post.slug}`}>
        <span className='cursor-pointer absolute w-full h-full' />
      </Link>
    </div>
  );
};

export default FeaturedPostCard;
