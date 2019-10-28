<template>
  <v-container class="pt-1 pl-0 pr-0">
    <v-layout class="ml-0 mr-0">
      <v-flex md12 dark class="light-green lighten-2 text-md-left pl-3">
        Tratamientos del día: <b>{{ fechaSeleccionado }}</b>
      </v-flex>
    </v-layout>
    <Lista/>
    <Botonera v-if="role === 'doctor'"></Botonera>
  </v-container>
</template>

<script>
import Lista from './ListaDesktop.vue'
import Botonera from './BotoneraDesktop.vue'

export default {
  computed: {
    fechaSeleccionado () {
      return this.$store.getters.getFechaSeleccionada
    },
    role () {
      return this.$store.getters.getUserRole
    }
  },
  components: {
    Lista,
    Botonera
  }
}
</script>
