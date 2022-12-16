import { useRef, useState } from 'react';
import './App.css';
import { useSearch } from './hooks/useSearch';
import Post from './Post';

function App() {

  const [ pageNumber, setPageNumber ] = useState(1);
  const { isLoading, isError, error, results, hasNextPage } = useSearch(pageNumber);

  console.log(results);

  if ( isError ) return <p>Error: {error}</p>

  // const lastPostRef = useRef();

  const content = results.map((post, i) => {
    if (results.length === i+1) console.log(post, 'las element');
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
