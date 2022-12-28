import { useEffect, useRef, useState } from "react";
import { PokemonList } from "../../components/pokemonList";
import { pokemonServices } from "../../services/pokemonService";
import styles from './styles.module.css';


export function PokemonDashboard () {

  const [ poke, setPoke ] = useState([]);
  const counter = useRef(0);

  const scrollToSection = (reference = 0) => {
    window.scrollTo({
      top: reference,
      behavior: "smooth",
    })
  
  }


  useEffect(() => {
    const controller = new AbortController();
    const { signal } = controller;
    fetchRawPokemon(signal);  
    console.log('hola')
    console.log(counter.current, 'antes del dif 0')
    if (counter.current !== 0) {
      counter.current = 0;
      console.log(counter.current, 'despues del dif 0')
      sessionStorage.setItem("scroll-position-pokemon", 0);  
    } 
    
    return () => controller.abort();
  }, [])

  useEffect(() => {
    scrollToSection(sessionStorage.getItem('scroll-position-pokemon'));
    
  }, [poke])

  const fetchRawPokemon = async (signal) => {
    const res = await pokemonServices.getRawPokemon(signal);
    res?.results.forEach(pokemon => {
      (async function fetchFullPokemon () {
        const fullPokemon = await pokemonServices.getFullPokemon(pokemon.url);
        setPoke(prevState => [...prevState, fullPokemon]);
      })();
      
    })
  }

  const handleClick = () => {
    const position = window.scrollY;
    sessionStorage.setItem("scroll-position-pokemon", position);
    counter.current = counter.current + 1;
  }

  return (
    <div className={styles.container}>   
      <div className={styles.grid}>
      {poke.length && <PokemonList list={poke} handleClick={handleClick}/>}
      </div>
    </div>
  )
}