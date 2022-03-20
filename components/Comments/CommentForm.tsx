import React, {
  useState,
  useEffect,
  useRef,
  TextareaHTMLAttributes,
} from 'react';
import { toast } from 'react-toastify';
import { submitComment } from '../../services';
import { Comment } from '../../types';

const PostDetail: React.FC<{ slug: string }> = (props) => {
  const [error, setError] = useState<string | undefined>('');
  const [loading, setLoading] = useState<boolean>(false);
  const commentEl = useRef<HTMLTextAreaElement>(null);
  const nameEl = useRef<HTMLInputElement>(null);
  const emailEl = useRef<HTMLInputElement>(null);
  const storeDataEl = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const name = localStorage.getItem('name');
    const email = localStorage.getItem('email');
    if (name && email && nameEl.current && emailEl.current) {
      nameEl.current.value = name;
      emailEl.current.value = email;
    }
  }, [nameEl, emailEl]);

  const handleCommentSubmission = () => {
    setLoading(true);
    setError(undefined);
    const comment = commentEl.current?.value;
    const name = nameEl.current?.value;
    const email = emailEl.current?.value;
    const storeData = storeDataEl.current?.value;
    if (!comment || !name || !email) {
      setError('All field must not be empty');
      setLoading(false);
      return;
    }
    if (!/^[A-Za-z0-9-_.]+@[A-Za-z0-9-_.]+\.[A-Za-z0-9-_.]+$/.test(email)) {
      setError('Email is invalid');
      setLoading(false);
      return;
    }
    setError(undefined);

    const commentObj: Comment = {
      name,
      email,
      content: comment,
      slug: props.slug,
    };

    if (storeData) {
      localStorage.setItem('name', name);
      localStorage.setItem('email', email);
    } else {
      localStorage.removeItem('name');
      localStorage.removeItem('email');
    }

    toast
      .promise(submitComment(commentObj), {
        pending: 'Submitting...',
        success: 'Success!',
        error: 'Some error occured.',
      })
      .then((res) => {
        if (res.createComment) {
          setError(undefined);
        }
      })
      .catch((err) => {
        setError(err.message);
      })
      .finally(() => {
        if (nameEl.current?.value && !storeData) nameEl.current.value = '';
        if (emailEl.current?.value && !storeData) emailEl.current.value = '';
        if (commentEl.current?.value) commentEl.current.value = '';
        setLoading(false);
      });
  };

  return (
    <div className='bg-white rounded-lg shadow-lg p-8 pb-12 mb-8'>
      <h3 className='text-xl mb-8 font-semibold border-b pb-4'>
        Submit a comment
      </h3>
      <div className='grid grid-cols-1 gap-4 mb-4'>
        <textarea
          ref={commentEl}
          className='p-4 outline-none w-full rounded-lg focus:ring-2 focus:ring-gray-200 bg-gray-100 text-gray-700'
          placeholder='Comment'
          name='comment'
          disabled={loading ? true : false}
          required
        ></textarea>
      </div>
      <div className='grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4'>
        <input
          type='text'
          ref={nameEl}
          className='py-2 px-4 outline-none w-full rounded-lg focus:ring-2 focus:ring-gray-200 bg-gray-100 text-gray-700'
          placeholder='Name'
          name='name'
          disabled={loading ? true : false}
          required
        />
        <input
          type='text'
          ref={emailEl}
          className='py-2 px-4 outline-none w-full rounded-lg focus:ring-2 focus:ring-gray-200 bg-gray-100 text-gray-700'
          placeholder='Email'
          name='email'
          disabled={loading ? true : false}
          required
        />
      </div>
      <div>
        <input
          type='checkbox'
          ref={storeDataEl}
          value='true'
          id='storeData'
          name='storeData'
          disabled={loading ? true : false}
        />
        <label
          className='text-gray-500 cursor-pointer ml-2'
          htmlFor='storeData'
        >
          Save my information for the mext time I comment
        </label>
      </div>
      {error && <p className='text-sx text-red-500'>{error}</p>}
      <div className='mt-8'>
        <button
          type={'button'}
          onClick={handleCommentSubmission}
          className='transition duration-500 disabled:hover:bg-gray-400 disabled:cursor-default disabled:bg-gray-400 ease hover:bg-sky-400 bg-sky-500 text-lg rounded-full text-white px-8 py-3 cursor-pointer inline-block'
          disabled={loading ? true : false}
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default PostDetail;
