import React from 'react'

const Post = React.forwardRef(({post}, ref) => {

  console.log('Im in Post', post.id)
  const postBody = (
    <>
      <h2>{post.title}</h2>
      <p>{post.body}</p>
      <p>Post ID: {post.id}</p>
    </>
  )

  const content = ref 
    ? <article ref={ref}>{postBody}</article>
    : <article>{postBody}</article>

  return content;
})

/*
why are we doing forwardRef? --> components can't just have refs on them without this. we need a ref because we need to know
which post is the last one
*/

export default Post
