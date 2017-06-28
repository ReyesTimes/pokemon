<template lang="html">
  <header>
    Pokédex Kanto
  </header>
</template>

<script>

export default {
  name: 'pokemon-header'
}

</script>

<style lang="scss">
    @import "../sass/variables.scss";

    header{
        color: $pokemon-white;
        background-color: $pokemon-red;
        border-bottom: 1px solid $helper-black-color;
        font-family: 'Signika', sans-serif;
        font-size: 1.5em;
        padding: 15px 23px;
        width: 100%;

        @media only screen and (max-width:769px){
            text-align: center;
        }
        @media only screen and (max-width:769px) and (-webkit-min-device-pixel-ratio: 2) and (orientation: landscape){
            font-size: 1.25em;
            padding: 13px;
        }
    }
</style>
