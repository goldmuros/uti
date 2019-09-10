<template>
  <v-layout row wrap align-content-center justify-center fill-height>
    <v-flex md12>
      <v-tabs dark fixed centered color="green">
        <v-tabs-slider color="yellow"></v-tabs-slider>
        <v-tab href="#tab-usuarios">Usuarios</v-tab>
        <v-tab href="#tab-tratamientos-frecuentes">Tratamientos Frecuentes</v-tab>

        <v-tab-item :value="'tab-usuarios'">
          <Usuarios/>
        </v-tab-item>
        <v-tab-item :value="'tab-tratamientos-frecuentes'">
          <TratamientosFrecuentes/>
        </v-tab-item>
      </v-tabs>
    </v-flex>
  </v-layout>
</template>

<script>
import Usuarios from '../users/Usuarios.vue'
import TratamientosFrecuentes from '../tratamientos-frecueentes/TratamientosFrecuentes.vue'

export default {
  components: {
    Usuarios,
    TratamientosFrecuentes
  }
}
</script>