const URL = 'https://raw.githubusercontent.com/Biuni/PokemonGO-Pokedex/master/pokedex.json';

export default function getListsPokemon() {
    return fetch(URL)
        .then(res => res.json())
        .then(json => json)
}
