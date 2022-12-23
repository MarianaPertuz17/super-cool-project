import React from 'react';
import styles from './styles.module.css'

const Post = React.forwardRef(({post}, ref) => {

  const postBody = (
    <div className={styles.container}>
      <h2>{post.title}</h2>
      <p>{post.body}</p>
      <p>Post ID: {post.id}</p>
    </div>
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
