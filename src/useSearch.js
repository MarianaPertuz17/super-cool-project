import { useEffect, useState } from "react";
import axios from "axios";

export function useSearch(query, pageNumber) {

  useEffect(() => {
    axios({ 
      method: 'GET',
      url: 'https://jsonplaceholder.typicode.com/posts', //'http://openlibrary.org/trending/daily'
      params: { q: query, page: pageNumber}
    }).then(res => {
      console.log(res.data)
    })

  }, [query, pageNumber])

  return null
}
