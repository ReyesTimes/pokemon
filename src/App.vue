<template>
  <div id="app">
    <pokemon-header></pokemon-header>
    <div class="general">
        <pokemon-main
            v-on:pokemon="getPokemon"
            :captured="pokemon_captured"
            :lists="pokemon_list"
            :filters="filters"
            v-on:deleteFilters="deleteFilters"
            v-on:filtersPokemon="filtersPokemon"
        ></pokemon-main>
        <pokemon-aside
            :pokemon="pokemon_selected"
            :captured="pokemon_captured"
            :showAside="show_aside"
            v-on:capture="capturePokemon"
            v-on:closeAside="closeAside"
        ></pokemon-aside>
    </div>
  </div>
</template>

<script>

import PokemonHeader from './components/PokemonHeader.vue';
import PokemonAside from './components/PokemonAside.vue';
import PokemonMain from './components/PokemonMain.vue';
import getListsPokemon from './services/lists.js';

export default {
  name: 'app',
  data () {
      return {
          pokemon_selected: {},
          pokemon_captured: [],
          pokemon_list: [],
          pokemon_origin_list: [],
          filters: {
              name: '',
              type: ''
          },
          show_aside: false
      }
  },
  methods: {
    getPokemon: function(pokemon, value) {
        let copy_pokemon = pokemon;

        if (pokemon.next_evolution) {
            pokemon.next_evolution.map(element_value => {
                this.pokemon_origin_list.map(pokemon => {
                    if (pokemon.num == element_value.num) {
                        element_value.img = pokemon.img;
                    }
                });
            });
        }

        if (pokemon.prev_evolution) {
            pokemon.prev_evolution.map(element_value => {
                this.pokemon_origin_list.map(pokemon => {
                    if (pokemon.num == element_value.num) {
                        element_value.img = pokemon.img;
                    }
                });
            });
        }

        this.pokemon_selected = pokemon;
        this.show_aside = value;
    },
    capturePokemon: function(pokemon_id, captured) {
        if (captured) {
            let index = this.pokemon_captured.indexOf(pokemon_id);
            this.pokemon_captured.splice(index, 1);
        }
        else {
            this.pokemon_captured.push(pokemon_id);
        }
        localStorage.setItem("captured", JSON.stringify(this.pokemon_captured))
    },
    deleteFilters: function(value) {
        this.pokemon_list = this.pokemon_origin_list;
        this.filters = {
            name: '',
            type: ''
        }
    },
    filtersPokemon: function(filters) {
        let selector_pokemon = {
            not_match: false
        };
        let pokemons = [];

        this.pokemon_origin_list.map(element => {
            let filters_pokemon = {
                name: element.num + ' ' + element.name.toLowerCase()
            };

            Object.keys(filters).map( (key, index) => {
                switch (key) {
                    case 'name':
                        if (filters_pokemon[key].indexOf(filters[key]) > -1) {
                            selector_pokemon.pokemon = element;
                            selector_pokemon.not_match = false;
                        }
                        else {
                            selector_pokemon.not_match = true;
                        }
                        break;
                    case 'type':
                        if (filters[key] !== '' && !selector_pokemon.not_match) {
                            if (element[key].indexOf(filters[key]) > -1) {
                                if (!selector_pokemon.pokemon) {
                                    selector_pokemon.pokemon = element;
                                    selector_pokemon.not_match = false;
                                }
                            }
                            else {
                                delete selector_pokemon.pokemon;
                                selector_pokemon.not_match = true;
                            }
                        }
                        break;
                    default:

                }
            });

            if (selector_pokemon.pokemon) {
                pokemons.push(selector_pokemon.pokemon);
                delete selector_pokemon.pokemon;
            }

            this.pokemon_list = pokemons;
        });
    },
    closeAside: function(value) {
        this.show_aside = false;
    }
  },
  components: {
    PokemonHeader: PokemonHeader,
    PokemonMain: PokemonMain,
    PokemonAside: PokemonAside,
  },
  mounted: function() {
      const self = this;
      getListsPokemon()
        .then(function(data) {
            self.pokemon_list = data.pokemon;
            self.pokemon_origin_list = data.pokemon;
        });

      if (localStorage.getItem("captured") !== null) {
          self.pokemon_captured = JSON.parse(localStorage.getItem("captured"))
      }
  }
}
</script>

<style lang="scss">
    @import url(https://fonts.googleapis.com/css?family=Signika);
    @import url(https://fonts.googleapis.com/css?family=Montserrat);
    @import "./sass/variables.scss";

    html, body {
        height: 100%
    }
    body {
        margin:0;
        font-size: 16px;
        font-family: 'Montserrat', sans-serif;
    }

    *, *:before, *:after {
        box-sizing: border-box;
    }
    #app{
        height: 100%;
    }
    button{ cursor: pointer; }
    textarea, input, button { outline: none; }

    .general{
        display: flex;
        height: 91%;

        @media only screen and (max-width:769px){
            flex-direction: column;
        }
    }
</style>
