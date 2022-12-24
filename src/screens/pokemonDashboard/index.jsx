import { useEffect, useState } from "react"
import { pokemonServices } from "../../services/pokemonService"

export function PokemonDashboard () {

  const [ rawPokemon, setRawPokemon ] = useState([]);

  useEffect(() => {
    fetchRawPokemon();
  }, [])

  const fetchRawPokemon = async () => {
    const res = await pokemonServices.getRawPokemon();
    console.log(res, 'la resposta')
  }

  return (
    <>
    </>
  )
}