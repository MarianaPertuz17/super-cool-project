const url = 'https://pokeapi.co/api/v2/pokemon/';

const pokemonServices = {};

pokemonServices.getRawPokemon = () => {
  return fetch(url)
  .then(res => res.json())
  .then(data => data)
  .catch(e => e);
}