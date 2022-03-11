import Link from 'next/link';
import { Category } from '../types';

const categories: Category[] = [
  { name: 'React', slug: 'react', id: '1' },
  { name: 'Web development', slug: 'web-dev', id: '2' },
];

const Header = () => {
  return (
    <div className='mx-auto mb-8 px-10'>
      <div className='border-b w-full inline-block border-blue-400 py-8'>
        <div className='md:float-left block'>
          <Link href='/' passHref>
            <span className='cursor-pointer font-bold text-4xl text-white'>
              {"Dustin's Personal Blog"}
            </span>
          </Link>
        </div>
        <div className='hidden md:float-left md:contents'>
          {categories.map((category) => {
            return (
              <Link
                key={category.slug}
                href={`/categories/${category.slug}`}
                passHref
              >
                <span className='md:float-right mt-2 align-middle text-white ml-4 font-semibold cursor-pointer'>
                  {category.name}
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};
export default Header;
