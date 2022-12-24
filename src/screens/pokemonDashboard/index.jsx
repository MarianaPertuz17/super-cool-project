import { useEffect, useState } from "react"
import { pokemonServices } from "../../services/pokemonService"

export function PokemonDashboard () {

  const [ poke, setPoke ] = useState([]);

  useEffect(() => {
    fetchRawPokemon();
    console.log(poke, 'el poke bobo')
  }, [])

  const fetchRawPokemon = async () => {
    const res = await pokemonServices.getRawPokemon();
    res.results.forEach(pokemon => {
      (async function fetchFullPokemon () {
        const fullPokemon = await pokemonServices.getFullPokemon(pokemon.url);
        console.log(fullPokemon,poke, 'el fSull');
        setPoke(prevState => [...prevState, fullPokemon]);
      })();
      
    })
  }

  return (
    <>
    {poke.length && poke.map(ele => <img alt='pokemon' src={ele.sprites.front_default}/>)}
    </>
  )
}