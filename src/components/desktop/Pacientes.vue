<template>
  <v-flex>
    <Lista></Lista>
    <NuevoPaciente v-if="role === 'doctor'"></NuevoPaciente>
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
