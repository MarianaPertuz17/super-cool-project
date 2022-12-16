import { useState } from 'react';
import './App.css';
import { useSearch } from './hooks/useSearch';

function App() {

  const [ pageNumber, setPageNumber ] = useState(1);
  const { isLoading, isError, error, results, hasNextPage } = useSearch(pageNumber);

  console.log(results);
  return (
    <>
      <div>Title</div>
      <div>Loading...</div>
      <div>Error</div>
    </>
  );
}

export default App;
