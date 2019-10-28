<template>
  <v-flex md3>
    <v-layout row class="lista">
      <Lista/>
    </v-layout>
    <v-layout>
      <NuevoPaciente v-if="role === 'doctor'"></NuevoPaciente>
    </v-layout>
  </v-flex>
</template>

<script>
import Lista from '../pacientes/ListaDesktop.vue'
import NuevoPaciente from '../pacientes/NuevoPacienteDesktop.vue'

export default {
  computed: {
    role () {
      return this.$store.getters.getUserRole
    }
  },
  components: {
    Lista,
    NuevoPaciente
  }
}
</script>

<style scoped>
  .lista {
    height: 77vh;
    overflow-y: auto;
    overflow-x: hidden;
  }
</style>