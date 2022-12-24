import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { pokemonServices } from "../../services/pokemonService";
import styles from './styles.module.css';


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

  const openPokemon = () => {

  }

  return (
    <div className={styles.container}>   
      <div className={styles.grid}>
      {poke.length && 
        poke.map((ele, index) => {
          return(
            <Link to={`pokemon/${ele.name}`}>
              <button className={styles.card} onClick={openPokemon}>
                <img alt='pokemon' style={{width:'30vh', height: '30vh'}} key={index} src={ele.sprites.front_default}/>
                <h3>{(ele.name).toUpperCase()}</h3> 
              </button>
            </Link>
          )
          })
      }
      </div>
    </div>
  )
}