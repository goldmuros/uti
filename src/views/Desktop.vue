<template>
  <v-container fluid class="grid-list-md text-md-center">
    <!-- Admin Usuarios -->
    <Usuarios v-if="role === 'supervisor'"/>
    <!-- Pacientes -->
    <v-layout row wrap v-else>
      <v-flex md3>
        <Pacientes/>
      </v-flex>
      <v-flex md9 v-if="showPaciente">
        <PanelCentral/>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import Pacientes from '@/components/desktop/Pacientes.vue'
import PanelCentral from '@/components/desktop/PanelCentral.vue'
import Usuarios from '@/components/desktop/Usuarios.vue'

export default {
  computed: {
    showPaciente () {
      return this.$store.getters.getShowPacienteSeleccionado
    },
    role () {
      return this.$store.getters.getUserRole
    }
  },
  components: {
    Pacientes,
    PanelCentral,
    Usuarios
  }
}
</script>
