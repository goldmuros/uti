<template>
  <v-container class="capa-lista-tratamientos pt-4">
    <v-layout row>
      <v-flex md12 dark class="light-green lighten-2 text-md-left pl-3">
        Tratamientos del día: <b>{{ fechaSeleccionado }}</b>
      </v-flex>
    </v-layout>

    <Lista></Lista>
    <br/>
    <Botonera></Botonera>
  </v-container>
</template>

<script>
import Lista from './ListaDesktop.vue'
import Botonera from './BotoneraDesktop.vue'

export default {
  computed: {
    fechaSeleccionado () {
      return this.$store.getters.getFechaSeleccionada
    }
  },
  components: {
    Lista,
    Botonera
  }
}
</script>

<style>
  .capa-lista-tratamientos {
    padding: 0px!important;
    max-height:330px!important;
  }
</style>
