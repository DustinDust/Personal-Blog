import Link from 'next/link';
import { Category } from '../../types';
import { useState, useEffect } from 'react';
import { getCategories } from '../../services';

const Header = () => {
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    getCategories()
      .then((results) => setCategories(results))
      .catch((error) => {
        console.log(error);
      });
  }, [setCategories]);

  return (
    <div className='mx-auto mb-8 px-10'>
      <div className='border-b w-full inline-block border-yellow-600 py-8'>
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
                <span className='md:float-right mt-2 align-middle hover:text-yellow-600 transition-all hover:transition-all hover:scale-105 text-white ml-6 font-semibold cursor-pointer'>
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
