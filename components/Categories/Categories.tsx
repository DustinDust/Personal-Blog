import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { getCategories } from '../../services';
import type { Category as CategoryType } from '../../types';
import { MdKeyboardArrowRight } from 'react-icons/md';
import Category from './Category';

const Categories = () => {
  const [categories, setCategories] = useState<CategoryType[]>([]);
  useEffect(() => {
    getCategories()
      .then((results) => {
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
        return <Category key={category.id} category={category} />;
      })}
    </div>
  );
};
export default Categories;
