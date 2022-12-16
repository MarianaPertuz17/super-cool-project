import { useRef, useState } from 'react';
import './App.css';
import { useSearch } from './hooks/useSearch';
import Post from './Post';

function App() {

  const [ pageNumber, setPageNumber ] = useState(1);
  const { isLoading, isError, error, results, hasNextPage } = useSearch(pageNumber);

  const lastPostRef = useRef();

  if ( isError ) return <p>Error: {error}</p>

  const content = results.map((post, i) => {
    if (results.length === i+1) return <Post ref={lastPostRef} key={post.id} post={post}/>
    return <Post key={post.id} post={post}/>
  })

  return (
    <>
      <div>Title</div>
      {content}
      {isLoading && <p>Loading more posts...</p>}
      <p>Back to top</p>
    </>
  );
}

export default App;
