const url = 'https://pokeapi.co/api/v2/pokemon/';

export const pokemonServices = {};

pokemonServices.getRawPokemon = () => {
  return fetch(url)
  .then(res => res.json())
  .then(data => data)
  .catch(e => e);
}

pokemonServices.getFullPokemon = (pokeUrl) => {
  return fetch(pokeUrl)
  .then(res => res.json())
  .then(data => data)
  .catch(e => e);
}
