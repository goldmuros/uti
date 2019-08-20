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
          </v-tab-item>
          <v-tab-item :value="'tab-parametros'">
            <Parametros></Parametros>
          </v-tab-item>
        </v-tabs>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import Tratamientos from '../tratamientos/Tratamientos.vue'
import Parametros from '../parametros/Parametros.vue'

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
    Tratamientos,
    Parametros
  }
}
</script>

<style>
  .letras-blanco {
    color: white;
  }
</style>
