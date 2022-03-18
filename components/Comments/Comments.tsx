import React, { useState, useEffect } from 'react';
import moment from 'moment';
import parse from 'html-react-parser';
import { Comment } from '../../types';
import { getComments } from '../../services';

const Comments: React.FC<{ slug: string }> = (props) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    getComments(props.slug)
      .then((result) => {
        setComments(result);
        setError(false);
      })
      .catch(() => setError(true));
  }, [setComments, props, setError]);

  return (
    <>
      {comments.length > 0 && !error && (
        <div className='bg-white shadow-lg rounded-lg p-8 pb-12 mb-8'>
          <h3 className='text-xl mb-8 font-semibold border-b pb-4'>
            {comments.length} Comments
          </h3>
          {comments.map((comment) => (
            <div
              key={comment.createdAt!}
              className='border-b border-gray-100 mb-4 pb-4'
            >
              <p className='mb-4'>
                <span className='font-semibold'>{comment.name}</span> on{' '}
                {moment(comment.createdAt!).format('MMM DD, YYYY')}
                <span className='font-light text-gray-700 ml-4'>
                  ({comment.email})
                </span>
              </p>
              <p className='whitespace-pre-line text-gray-600 w-full'>
                {comment.content}
              </p>
            </div>
          ))}
        </div>
      )}
      {comments.length === 0 && !error && (
        <div className='bg-white shadow-lg rounded-lg p-8 pb-12 mb-8'>
          <h3 className='text-xl mb-8 font-semibold border-b pb-4'>
            No comments
          </h3>
        </div>
      )}
      {error && (
        <div className='bg-white shadow-lg rounded-lg p-8 pb-12 mb-8'>
          <h3 className='text-xl text-red-400 mb-8 font-semibold border-b pb-4'>
            Error loading comments
          </h3>
        </div>
      )}
    </>
  );
};

export default Comments;
