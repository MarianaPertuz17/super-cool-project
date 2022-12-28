import { useLocation } from "react-router-dom";

export function PokemonDetail () {

  const location = useLocation();
  const data = location.state?.data;

  window.autoScroll = true;

  console.log(window.autoScroll, 'goodby')

  return (
    <>
      <img alt='pokemon' style={{width:'30vh', height: '30vh'}} src={data.sprites.front_default}/>             
      <h1>{data && data.name }</h1>
    </>
  )
}