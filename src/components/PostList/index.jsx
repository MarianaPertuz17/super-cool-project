import { useRef, useState, useCallback } from 'react';
import { useSearch } from '../../hooks/useSearch';
import Post from '../Post';


export function PostList() {

  const [ pageNumber, setPageNumber ] = useState(1);
  const { isLoading, isError, error, results, hasNextPage } = useSearch(pageNumber);

  const intObserver = useRef(); //NO ENTIENDO ESTO

  console.log(intObserver, 'EL INT OBSERVER  ')

  const lastPostRef = useCallback(post => {
    if (isLoading) return;
    if (intObserver.current) intObserver.current.disconnect(); //stop looking if we already have one
    
    intObserver.current = new IntersectionObserver(posts => {
      if (posts[0].isIntersecting && hasNextPage) {
        setPageNumber(prev => prev + 1 );
        console.log('we are near the last post')
      }
    })

    if (post) intObserver.current.observe(post);
  }, [isLoading, hasNextPage])

  if ( isError ) return <p>Error: {error.message}</p>

  const content = results.map((post, i) => {
    if (results.length === i+1) return <Post ref={lastPostRef} key={post.id} post={post}/>
    return <Post key={post.id} post={post}/>
  })

  return (
    <>
      <div>Title</div>
      {content}
      {isLoading && <p>Loading more posts...</p>}
      <p><a href='#top'>Back to top</a></p>
    </>
  );
}

export default PostList;
