import { useState } from 'react';
import './App.css';
import { useSearch } from './hooks/useSearch';

function App() {

  // const handleSearch = (e) => {
  //   const { value } = e.target;
  //   setQuery(value);
  //   setPageNumber(1);
  // }

  // useSearch(query, pageNumber)
  return (
    <>
      {/* <input type='text' onChange={handleSearch}/> */}
      <div>Title</div>
      <div>Loading...</div>
      <div>Error</div>
    </>
  );
}

export default App;
