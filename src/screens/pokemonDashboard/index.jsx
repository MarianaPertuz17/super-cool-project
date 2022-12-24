import { useEffect, useState } from "react"
import { pokemonServices } from "../../services/pokemonService"

export function PokemonDashboard () {

  const [ poke, setPoke ] = useState([]);

  useEffect(() => {
    const controller = new AbortController();
    const { signal } = controller;
    fetchRawPokemon(signal);

    return () => controller.abort();//H mmm
  }, [])

  const fetchRawPokemon = async (signal) => {
    const res = await pokemonServices.getRawPokemon(signal);
    res.results.forEach(pokemon => {
      (async function fetchFullPokemon () {
        const fullPokemon = await pokemonServices.getFullPokemon(pokemon.url);
        setPoke(prevState => [...prevState, fullPokemon]);
      })();
      
    })
  }

  return (
    <>
    {poke.length && poke.map((ele, index)=> <img alt='pokemon' key={index} src={ele.sprites.front_default}/>)}
    </>
  )
}