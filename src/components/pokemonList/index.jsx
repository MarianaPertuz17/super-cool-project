import { Card } from "../pokemonCard";


export function PokemonList ({list, handleClick}) {

  return (
    <>
      {list.map((ele, index) => <Card pokemon={ele} key={index} handleClick={handleClick}/>)}
    </>
  )
}