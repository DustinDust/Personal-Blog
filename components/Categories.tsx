import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { getCategories } from '../services';
import { Category } from '../types';
import { MdKeyboardArrowRight } from 'react-icons/md';

const Categories = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  useEffect(() => {
    getCategories()
      .then((results) => {
        console.log(results);
        setCategories(results);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [setCategories]);

  return (
    <div className='flex w-full flex-col p-8 mb-8 bg-white rounded-lg shadow-lg'>
      <h3 className='text-xl font-semibold mb-8 pb-4 border-b border-b-gray-300'>
        Categories
      </h3>
      {categories.map((category) => {
        return (
          <div key={category.id}>
            <Link href={`/categories/${category.slug}`} passHref>
              <div className='flex flex-row hover:text-yellow-700 after:duration-200 after:contents after:absolute relative after:h-px after:scale-x-0 after:hover:scale-100 after:origin-left after:transition-all transition-all after:w-full after:-bottom-1 after:left-0 after:bg-yellow-700 items-center gap-6 mb-8 cursor-pointer hover:scale-105'>
                <MdKeyboardArrowRight />
                <p>{category.name}</p>
              </div>
            </Link>
          </div>
        );
      })}
    </div>
  );
};
export default Categories;
