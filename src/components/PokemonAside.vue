<template lang="html">
    <aside class="information-pokedex" :class="{active: showAside}">
        <span class="number-captured" v-if="pokemon.id">{{captured.length}} de 150</span>
        <div class="region-description" v-if="!pokemon.id">
            <h2>
                Kanto
            </h2>
            <p>
                Aquí podras ver la información de todos los Pokemon y donde podras <strong>capturarlos</strong>.
            </p>
            <p>
                Comienza tu aventura <strong>seleccionado</strong> un Pokemon.
            </p>
            <p>
                No olvides capturarlos a todos, son <strong>151 Pokemon</strong>.
            </p>
        </div>
        <div class="pokemon-container" v-if="pokemon.id">
            <button
                type="close"
                name="button"
                class="close"
                v-on:click="closeAside"
            >
                ×
            </button>
            <div class="container-image">
                <img
                    v-if="captured.indexOf(pokemon.id) > -1"
                    src="https://upload.wikimedia.org/wikipedia/en/3/39/Pokeball.PNG"
                    class="captured"
                >
                <img :src="pokemon.img" :alt="pokemon.name  + ' | Pokemon descripción'">
            </div>
            <div class="pokemon-information">
                <span class="name">{{pokemon.num}}</span>
                <span class="number">{{pokemon.name}}</span>
            </div>
            <div class="characteristics pokemon-look">
                <span><strong>Peso</strong> {{pokemon.height}}</span>
                <span><strong>Altura</strong> {{pokemon.weight}}</span>
            </div>
            <div class="characteristics">
                <span
                    v-for="type in pokemon.type"
                    :class="type.toLowerCase() + ' types'"
                >
                    {{type}}
                </span>
            </div>
            <ul class="evolution">
                <li
                    v-for="prev in pokemon.prev_evolution"
                    v-if="pokemon.prev_evolution"
                    class="not-active"
                >
                    <img :src="prev.img" alt="">
                </li>
                <li>
                    <img :src="pokemon.img" alt="">
                </li>
                <li
                    v-for="next in pokemon.next_evolution"
                    v-if="pokemon.next_evolution"
                    class="not-active"
                >
                    <img :src="next.img" alt="">
                </li>
            </ul>
            <button
                type="button"
                name="capture-pokemon"
                class="capture-pokemon"
                :class="{captured: (captured.indexOf(pokemon.id) > -1)}"
                v-on:click="capturePokemon"
            >
                <span v-if="captured.indexOf(pokemon.id) > -1">
                    Liberar pokemon
                </span>
                <span v-if="captured.indexOf(pokemon.id) === -1">
                    <span>
                        Capturar pokemon
                    </span>
                    <img
                        src="https://upload.wikimedia.org/wikipedia/en/3/39/Pokeball.PNG"
                        class="captured"
                    >
                </span>
            </button>
        </div>
    </aside>
</template>

<script>
export default {
    name: 'pokemon-aside',
    props: [ 'pokemon', 'captured', 'showAside' ],
    methods: {
        capturePokemon: function() {
            if (this.captured.indexOf(this.pokemon.id) > -1) {
                this.$emit('capture', this.pokemon.id, true);
            }
            else {
                this.$emit('capture', this.pokemon.id, false);

            }
        },
        closeAside: function() {
            this.$emit('closeAside', true);
        }
    }
}
</script>

<style lang="scss">
    @import "../sass/variables.scss";
    @import "../sass/types.scss";

    aside.information-pokedex{
        width: 33%;
        padding: 15px;
        text-align: center;
        display: flex;
        flex-direction: column;
        justify-content: center;
        position: relative;

        .number-captured{
            position: absolute;
            top: 12px;
            left: 12px;
            font-size: 0.85em;
            color: #e50b2f;
        }
        .close{
            display: none;
        }

        .region-description{
            padding: 8px;
            strong{
                color: $pokemon-red;
            }
        }
        h2{
            font-size: 2.5em;
            margin: 0px;
            color: $pokemon-red;
            font-family: 'Signika', sans-serif;
        }
        p{
            font-size: 1em;
            line-height: 25px;
        }

        .pokemon-container{
            .container-image{
                position: relative;
                .captured{
                    position: absolute;
                    right: 32%;
                    top: 5%;
                    width: 17px;
                }
            }
            .pokemon-information{
                display: flex;
                justify-content: center;
                flex-direction: column;
                align-items: center;
                margin-top: 5px;
                margin-bottom: 15px;
                .name{
                    font-size: 0.875em;
                }
                .number{
                    font-size: 0.938em;
                    margin-top: 5px;
                }
            }
            .pokemon-look.characteristics{
                font-size: 0.78em;
            }
            .characteristics{
                display: flex;
                font-size: 0.938em;
                justify-content: center;
                margin-bottom: 15px;
                span:first-child{
                    margin-right: 5px;
                }
            }
            .capture-pokemon{
                background-color: white;
                padding: 7px 12px;
                border: 1px solid $pokemon-red;
                border-radius: 3px;
                font-weight: bold;
                color: #e50b2f;
                & > span{
                    display: flex;
                    align-items: center;
                }
                img{
                    width: 15px;
                    margin-left: 5px;
                }
                &.captured{
                    border: none;
                    font-weight: normal;
                    color: $helper-black-color;
                    opacity: 0.65;
                    margin-top: 5px;
                    border-bottom: 1px solid #666666;
                    border-radius: 0px;
                }
            }
            .evolution{
                list-style: none;
                display: flex;
                padding: 0px;
                align-items: center;
                justify-content: center;
                li{
                    width: 38px;
                    margin: 0px 3px;
                    img{
                        width: 100%;
                    }
                }
                li.not-active{
                    opacity: 0.68;
                }
            }
        }
    }

    @media only screen and (max-width:769px){
        aside.information-pokedex {
            display: none;
            .number-captured{
                font-weight: normal;
                top: 19px;
            }
        }
        aside.information-pokedex.active.information-pokedex{
            display: block;
            position: fixed;
            bottom: 0;
            width: 100%;
            background-color: white;
            border-top: 1px solid #666666;
            padding-bottom: 21px;

            .close{
                display: block;
                position: absolute;
                right: 25px;
                padding: 7px;
                background-color: white;
                border-radius: 100%;
                border: 1px solid #666666;
                width: 31px;
                height: 31px;
                font-weight: bold;
                z-index: 2;
            }
        }
    }
    @media only screen and (max-width:769px) and (-webkit-min-device-pixel-ratio: 2) and (orientation: landscape){
        aside.information-pokedex.active.information-pokedex{
            height: 100%;
            .pokemon-container {
                .pokemon-information, .pokemon-look.characteristics{
                    margin-bottom: 10px;
                }
                .evolution{
                    margin: 10px auto;
                }
            }
        }
    }
</style>
