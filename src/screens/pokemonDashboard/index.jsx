import { useEffect, useState } from "react";
import { PokemonList } from "../../components/pokemonList";
import { pokemonServices } from "../../services/pokemonService";
import styles from './styles.module.css';


export function PokemonDashboard () {

  const [ poke, setPoke ] = useState([]);

  const scrollToSection = (reference = 0) => {
    console.log(reference, 'never be me')
    window.scrollTo({
      top: sessionStorage.getItem('scroll-position-pokemon'),
      behavior: "smooth",
    })
    console.log(reference, 'never be me 2')
    sessionStorage.setItem("scroll-position-pokemon", 0);
  }


  useEffect(() => {
    const controller = new AbortController();
    const { signal } = controller;
    fetchRawPokemon(signal);
    console.log(window.autoScroll, 'goodby2')
    if (window.autoScroll) scrollToSection(sessionStorage.getItem('scroll-position-pokemon'));
    return () => controller.abort();
  }, [])

  // useEffect(() => {
  //   scrollToSection(sessionStorage.getItem('scroll-position-pokemon'));
  // }, [poke])


  const fetchRawPokemon = async (signal) => {
    const res = await pokemonServices.getRawPokemon(signal);
    res?.results.forEach(pokemon => {
      (async function fetchFullPokemon () {
        const fullPokemon = await pokemonServices.getFullPokemon(pokemon.url);
        setPoke(prevState => [...prevState, fullPokemon]);
      })();
    })
  }

  // useEffect(() => {
  //   console.log(poke, 'POKE')
  //   if (poke.length === 20) scrollToSection(sessionStorage.getItem('scroll-position-pokemon'));
  // }, [poke])

  const handleClick = () => {
    const position = window.scrollY;
    sessionStorage.setItem("scroll-position-pokemon", position);
  }

  return (
    <div className={styles.container}>   
      <div className={styles.grid}>
      {poke.length && <PokemonList list={poke} handleClick={handleClick}/>}
      </div>
    </div>
  )
}