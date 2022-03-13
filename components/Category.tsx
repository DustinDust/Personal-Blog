import { Category } from '../types';
import Link from 'next/link';
import { MdKeyboardArrowRight } from 'react-icons/md';

const Category: React.FC<{ category: Category }> = (props) => {
  return (
    <div>
      <Link href={`/categories/${props.category.slug}`} passHref>
        <div className='flex flex-row hover:text-yellow-700 after:duration-200 after:contents after:absolute relative after:h-px after:scale-x-0 after:hover:scale-100 after:origin-left after:transition-all transition-all after:w-full after:-bottom-1 after:left-0 after:bg-yellow-700 items-center gap-6 mb-8 cursor-pointer hover:scale-105'>
          <MdKeyboardArrowRight />
          <p>{props.category.name}</p>
        </div>
      </Link>
    </div>
  );
};
export default Category;
