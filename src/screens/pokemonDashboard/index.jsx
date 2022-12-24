import { useEffect, useRef, useState } from "react";
import { PokemonList } from "../../components/pokemonList";
import { pokemonServices } from "../../services/pokemonService";
import styles from './styles.module.css';


export function PokemonDashboard () {

  const [ poke, setPoke ] = useState([]);
  const intObserver = useRef();

  const scrollToSection = (reference) => {
    console.log(reference, 'la refe')
    window.scrollTo({
      top: reference.current.offsetTop
    })
  }

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

  const handleClick = () => {
    scrollToSection(intObserver);
  }

  return (
    <div className={styles.container}>   
      <div className={styles.grid}>
      {poke.length && <PokemonList list={poke} handleClick={handleClick}/>}
      </div>
    </div>
  )
}