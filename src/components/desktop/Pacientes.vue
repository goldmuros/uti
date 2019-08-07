<template>
  <v-flex>
    <Lista></Lista>
    <NuevoPaciente v-if="user.role === 'doctor'"></NuevoPaciente>
  </v-flex>
</template>

<script>
import Lista from '../pacientes/ListaDesktop.vue'
import NuevoPaciente from '../pacientes/NuevoPacienteDesktop.vue'

export default {
  computed: {
    user () {
      return this.$store.getters.getUser
    }
  },
  components: {
    Lista,
    NuevoPaciente
  }
}
</script>
