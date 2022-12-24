import { Link } from "react-router-dom";
import styles from './styles.module.css'

export function Card ({pokemonRef, pokemon, handleClick}) {

  return(
    <Link ref={pokemonRef} className={styles.card} to={`pokemon/${pokemon.name}`} state={{ data: pokemon }}>
      <button onClick={() => handleClick(pokemonRef)}>
        <img alt='pokemon' style={{width:'30vh', height: '30vh'}} src={pokemon.sprites.front_default}/>
        <h3>{(pokemon.name).toUpperCase()}</h3> 
      </button>
    </Link>
  )
}