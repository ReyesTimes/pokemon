<template lang="html">
    <div class="filter">
        <div class="filter-left">
            <div class="container-text-pokemon">
                <input
                    type="text"
                    class="search-pokemon-text"
                    placeholder="Busca un pokemon"
                    v-bind:class="{active : filters.name}"
                    v-on:keyup="searchValues"
                    v-model="filters.name"
                />
                <img src="http://static.pokemonpets.com/images/monsters-images-300-300/4217-Unown-Q.png" alt="">
            </div>
            <select
                class="types-pokemon"
                v-bind:class="{active : filters.type}"
                name="type-pokemon"
                v-model="filters.type"
                v-on:change="searchValues"
            >
                <option
                    value=""
                    disabled selected
                >
                    Tipo
                </option>
                <option v-for="option in pokemon_types" v-bind:value="option">
                    {{ option }}
                </option>
            </select>
        </div>
        <div class="filter-right" v-bind:class="(!filters.type && !filters.name) ? 'disable' : ''" v-on:click="deleteFilters">
            <span>Limpiar filtros</span>
            <img
                src="https://vignette4.wikia.nocookie.net/es.pokemon/images/7/7f/Voltorb_%28dream_world%29.png/revision/latest?cb=20101023012431"
                alt="voltorb delete filters"
                class="delete-filters"
            >
        </div>
    </div>
</template>

<script>
import getTypesPokemon from '../services/constants.js';


export default {
    name: 'pokemon-filters',
    data () {
        return {
            pokemon_types: []
        }
    },
    props: [ 'filters' ],
    methods: {
        searchValues: function(event) {
            this.$emit('filter', this.filters);
        },
        deleteFilters: function() {
            this.$emit('deleteFilters', true);
        }
    },
    mounted: function() {
        const self = this;
        this.pokemon_types = getTypesPokemon();
    }
}
</script>

<style lang="scss">
    @import "../sass/variables.scss";

    .filter{
        border-bottom: 1px solid $helper-black-color;
        padding: 7px;
        padding-left: 23px;
        padding-right: 13px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        .filter-left, .filter-right{
            display: flex;
            align-items: center;
        }
        .filter-right{
            font-size: 0.84em;
            color: $pokemon-red;
            cursor: pointer;
            opacity: 0.85;
            img{
                margin-left: 5px;
            }
            &:hover {
                opacity: 1;
            }
            &.disable{
                filter: grayscale(100%);
            }
        }
        .container-text-pokemon{
            position: relative;
            margin-right: 12px;
            img{
                width: 16px;
                top: 5.5px;
                opacity: 0.4;
                right: 8px;
                transform: rotate(90deg) scaleX(1);
                position: absolute;
                transition: opacity 0.2s ease;
            }
            .search-pokemon-text{
                border: 1px solid $helper-black-color;
                border-radius: 5px;
                padding: 5px;
                color: $helper-black-color;

                &.active{
                    border-color: $pokemon-red;
                }
                &:focus + img{
                    opacity: 0.9;
                }
            }
        }
        .types-pokemon{
            background-color: $pokemon-white;
            border: 1px solid $helper-black-color;
            color: $helper-black-color;
            border-radius: 4px;
            min-width: 70px;
            padding: 4px;
            margin-right: 12px;
            &.active{
                border-color: $pokemon-red;
            }
        }
        .delete-filters{
            width: 17px;
            height: 17px;
            cursor: pointer;
        }
        @media only screen and (max-width:769px){
            width: 100%;
            flex-direction: column;
            padding: 10px 21px;
            padding-left: 21px;
            padding-right: 21px;

            .filter-left{
                flex-direction: column;
                width: 100%;
                & input, select, .container-text-pokemon{
                    width: 100%;
                    margin-bottom: 6px;
                    margin-right: 0px;
                }
                .container-text-pokemon{
                    margin-bottom: 0px;
                }
            }
            .filter-right{
                margin-top: 5px;
            }
        }
        @media only screen and (max-width:769px) and (-webkit-min-device-pixel-ratio: 2) and (orientation: landscape){
            .filter-left{
                flex-direction: row;
                justify-content: space-around;
                .types-pokemon, .container-text-pokemon{
                    width: 47%;
                }
            }
        }
    }
</style>
