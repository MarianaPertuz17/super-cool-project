import { useRef } from "react";
import { Card } from "../pokemonCard";


export function PokemonList ({list, handleClick}) {

  const pokemonRef = useRef(null);

  return (
    <>
      {list.map((ele, index) => <Card pokemonRef={pokemonRef} pokemon={ele} key={index} handleClick={handleClick}/>)}
    </>
  )
}