<template>
  <v-container fluid grid-list-xs>
    <v-layout row>
      <v-flex md12>
        <v-container class="light-green darken-3 letras-blanco">
          <v-layout row class="title">
            <v-flex md3 text-md-left>Cama: {{ cama }}</v-flex>
            <v-flex md9 text-md-left>Nombre: {{ nombre }}</v-flex>
          </v-layout>
        </v-container>
        <v-tabs dark fixed centered color="green">
          <v-tabs-slider color="yellow"></v-tabs-slider>
          <v-tab href="#tab-tratamientos">Tratamientos</v-tab>
          <v-tab href="#tab-parametros">Parámetros</v-tab>

          <v-tab-item :value="'tab-tratamientos'">
            <Tratamientos></Tratamientos>
            <br>
            <!-- <botones-tratamientos v-if="permiso === 'doctor'"></botones-tratamientos> -->
          </v-tab-item>
          <v-tab-item :value="'tab-parametros'">
            <!-- <lista-parametros></lista-parametros> -->
          </v-tab-item>
        </v-tabs>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import Tratamientos from '../tratamientos/Tratamientos.vue'
// import BotonesTratamientos from './Tratamientos/BotonesTratamientos.vue'
// import ListaParametros from './Parametros/ListaParametros.vue'

export default {
  computed: {
    cama () {
      return this.$store.getters.getDataPacienteSeleccionado.cama
    },
    nombre () {
      return this.$store.getters.getDataPacienteSeleccionado.nombre
    }
  },
  components: {
    Tratamientos: Tratamientos
    // BotonesTratamientos: BotonesTratamientos,
    // ListaParametros: ListaParametros
  }
}
</script>

<style>
  .letras-blanco {
    color: white;
  }
</style>
