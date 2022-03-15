import { Comment, CreateCommentResponse } from '../types';

type ResObj = {
  request: Object;
  response: { error: CreateCommentResponse };
};

const submitComment = async (obj: Comment) => {
  const result = await fetch('/api/comment', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(obj),
  });
  if (result.ok) {
    return result.json();
  } else {
    const err = (await result.json()) as ResObj;
    console.log(err);
    return Promise.reject('');
  }
};

export default submitComment;
