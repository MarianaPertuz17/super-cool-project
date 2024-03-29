import { useEffect, useState } from "react";
import { PokemonList } from "../../components/pokemonList";
import { pokemonServices } from "../../services/pokemonService";
import styles from './styles.module.css';


export function PokemonDashboard () {

  const [ poke, setPoke ] = useState([]);
  

  const scrollToSection = (reference = 0) => {
    window.scrollTo({
      top: reference,
    })
    sessionStorage.setItem("scroll-position-pokemon", 0);
  }


  useEffect(() => {
    const controller = new AbortController();
    const { signal } = controller;
    fetchCachedPokemon(signal);  
    return () => controller.abort();
  }, [])


  const fetchCachedPokemon = async (signal) => {
    if (!window.pokemonListCacheMap.has('list')) {
      await fetchRawPokemon(signal)
    } else {
      setPoke(window.pokemonListCacheMap.get('list'))
    } 
  }

  const fetchRawPokemon = async (signal) => {
    const res = await pokemonServices.getRawPokemon(signal);
    res?.results.forEach(pokemon => {
      (async function fetchFullPokemon () {
        const fullPokemon = await pokemonServices.getFullPokemon(pokemon.url);
        setPoke(prevState => [...prevState, fullPokemon]);
      })();
    })
    window.listLength = res?.results.length;
  }

  useEffect(() => {
    if (poke.length > 0 && poke.length === window.listLength) {
      window.pokemonListCacheMap.set('list', poke);
      scrollToSection(sessionStorage.getItem('scroll-position-pokemon'));
    }
  }, [poke]) //comment2

  const handleClick = () => {
    const position = window.scrollY;
    sessionStorage.setItem("scroll-position-pokemon", position);
  }

  return (
    <div className={styles.container}>   
      <div className={styles.grid}>
        <PokemonList list={poke} handleClick={handleClick}/>
      </div>
    </div>
  )
}