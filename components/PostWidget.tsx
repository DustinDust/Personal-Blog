import moment from 'moment';
import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import getRecentPost from '../services/getRecentPosts';
import { Category, RecentPostResponse } from '../types';

const PostWidget: React.FC<{
  categories?: Category;
  slug?: string | undefined;
}> = (props) => {
  const [relatedPosts, setRelatedPosts] = useState<RecentPostResponse[]>([]);
  useEffect(() => {
    if (props.slug) {
      //get similar post
    } else {
      getRecentPost().then((result) => {
        console.log(result);
        setRelatedPosts(result);
      });
    }
  }, [setRelatedPosts, props]);
  return <div></div>;
};
export default PostWidget;
