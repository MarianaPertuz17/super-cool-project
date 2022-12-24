import { useRef, useState, useCallback } from 'react';
import { useSearch } from '../../hooks/useSearch';
import Post from '../post';
import styles from './styles.module.css'

function PostList() {

  const [ pageNumber, setPageNumber ] = useState(1);
  const { isLoading, isError, error, results, hasNextPage } = useSearch(pageNumber);
  const intObserver = useRef();

  /*
  Con useRef() se está creando un objeto que contiene current que es el valor actual. Con esto se mantiene el 
  valor de la variable entre cambios de estado. Si se cambia el current, la aplicacion no se va a volver a renderizar 
  No es como useState que cambia toda la pagina
  */

  const lastPostRef = useCallback(post => {
    if (isLoading) return;
    if (intObserver.current) intObserver.current.disconnect(); //stop looking if we already have one, so that we disconnect the observer until we get a new one.
    
    intObserver.current = new IntersectionObserver(posts => {
      if (posts[0].isIntersecting && hasNextPage) { //we want to get the first entry because we observe one by one. isIntersecting means if its on the page somewhere
        setPageNumber(prev => prev + 1 );
        console.log('we are near the last post', intObserver)
      }
    })

    if (post) intObserver.current.observe(post); //if we get the last element, then we observe it.
  }, [isLoading, hasNextPage])

  if ( isError ) return <p>Error: {error.message}</p>

  const content = results.map((post, i) => {
    if (results.length === i+1) return <Post ref={lastPostRef} key={post.id} post={post}/> //aqui es donde estoy haciendo que el ref se setee al whatever el post sea el que estoy renderizando aqui
    return <Post key={post.id} post={post}/>
  })

  return (
    <div className={styles.container}>
      <div>POSTS</div>      
      {content}
      {isLoading && <p>Loading more posts...</p>}
      <p><a href='#top'>Back to top</a></p>
    </div>
  );
}

export default PostList;
