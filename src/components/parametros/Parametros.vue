<template>
  <v-container class="capa-lista-parametros">
    <Lista></Lista>
    <Botonera></Botonera>
  </v-container>
</template>

<script>
import Lista from './ListaDesktop.vue'
import Botonera from './BotoneraDesktop.vue'

export default {
  components: {
    Lista,
    Botonera
  }  
}
</script>

<style scoped>
  .capa-lista-parametros {
    padding: 0px !important;
  }
</style>