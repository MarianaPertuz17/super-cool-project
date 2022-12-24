const url = 'https://pokeapi.co/api/v2/pokemon/';

export const pokemonServices = {};

pokemonServices.getRawPokemon = (signal) => {
  return fetch(url, {signal})
  .then(res => res.json())
  .then(data => data)
  .catch(e => {
    if (signal.aborted) return ;
    return e;
  });
}

pokemonServices.getFullPokemon = (pokeUrl) => {
  return fetch(pokeUrl)
  .then(res => res.json())
  .then(data => data)
  .catch(e => e);
}
