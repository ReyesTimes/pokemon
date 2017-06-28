<template lang="html">
    <main>
        <pokemon-filters
            v-on:filter="searchValues"
            v-on:deleteFilters="deleteFilters"
            :filters="filters"
        ></pokemon-filters>
        <div class="container-pokemon-list">
            <button type="button" name="init" class="init" v-on:click="goToTop">Inicio</button>
            <ul class="pokemon-list" v-if="lists.length > 0">
                <li
                    v-on:click="selectPokemon(element_value)"
                    v-for="element_value in lists"
                >
                    <img v-if="captured.indexOf(element_value.id) > -1" src="https://upload.wikimedia.org/wikipedia/en/3/39/Pokeball.PNG" class="captured">
                    <div class="container-image-pokemon">
                        <img :src="element_value.img" :alt="element_value.name + ' | Pokemon'">
                    </div>
                    <div class="pokemon-information-list">
                        <span class="name">{{element_value.num}}</span>
                        <span class="number">{{element_value.name}}</span>
                    </div>
                </li>
            </ul>
            <div v-if="lists.length === 0 && (filters.name || filters.type)" class="not-pokemon">
                <strong>
                    No se encontró algún Pokemon con ningúno de los filtros seleccionados
                </strong>
            </div>
        </div>
    </main>
</template>

<script>
import PokemonFilters from './PokemonFilters.vue';

export default {
  name: 'pokemon-main',
  props: [ 'captured', 'lists', 'filters' ],
  components: {
      PokemonFilters: PokemonFilters
  },
  methods: {
      selectPokemon: function(pokemon) {
          this.$emit('pokemon', pokemon, true);
      },
      searchValues: function(filters) {
          this.$emit('filtersPokemon', filters);
      },
      deleteFilters: function(value) {
          this.$emit('deleteFilters', value);
      },
      goToTop: function() {
          window.scrollTo(0, 0);
      }
  }
}
</script>

<style lang="scss">
    @import "../sass/variables.scss";

    main{
        width: 67%;
        border-right: 1px solid $helper-black-color;
        display: flex;
        flex-direction: column;
        @media only screen and (max-width:769px){
            width: 100%;
            border-right: none;
            display: block;
        }
    }
    .container-pokemon-list {
        overflow: auto;
        height: 93%;
        .init{
            display: none
        }
        @media only screen and (max-width:769px){
            height: auto;
            overflow: auto;
            .not-pokemon{
                padding: 16px;
                text-align: center;
            }
            .init{
                display: block;
                position: fixed;
                right: 15px;
                bottom: 15px;
                background-color: transparent;
                border: 1px solid #dd092f;
                border-radius: 4px;
                font-weight: bold;
                color: #dd092f;
                padding: 7px 10px;
                z-index: 1;
            }
        }
        .not-pokemon{
            height: 100%;
            display: flex;
            justify-content: center;
            align-items: center
        }
    }
    .pokemon-list{
        list-style: none;
        display: flex;
        flex-wrap: wrap;
        padding:0px;
        margin:0px;
        margin-top: 10px;
        li {
            text-align: center;
            width: 20%;
            position: relative;
            margin-bottom: 10px;
            cursor: pointer;
            opacity: 0.75;
            transition: opacity 0.2s ease-in;
            &:hover{
                opacity: 1;
            }
            .captured{
                position: absolute;
                right: 12%;
                top: 5%;
                width: 17px;
            }
            .pokemon-information-list{
                display: flex;
                justify-content: center;
                flex-direction: column;
                align-items: center;
                margin-top: 5px;
                .name{
                    font-size: 0.875em;
                }
                .number{
                    font-size: 0.938em;
                    margin-top: 5px;
                }
            }
            .container-image-pokemon{
                min-height: 90px;
                display: flex;
                justify-content: center;
                align-items: center;
            }
            img{
                width: 68%;
            }

        }
        @media only screen and (min-width:1100px){
            justify-content: center;
            li{
                width: 14%;
                .captured{
                    right: 35%;
                }
            }
        }
        @media only screen and (max-width:769px){
            justify-content: center;
            li{
                width: 75%;
                img{
                    width: auto;
                }
            }
        }
    }
</style>
