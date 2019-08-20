<template>
  <v-container class="capa-lista-parametros">
    <v-layout row>
      <v-flex md12>
        <Lista></Lista>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import Lista from './ListaDesktop.vue'

export default {
  components: {
    Lista
  }  
}
</script>

<style scoped>
  .capa-lista-parametros {
    padding: 0px !important;
  }
</style>