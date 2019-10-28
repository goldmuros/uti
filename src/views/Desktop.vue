<template>
  <v-container fluid class="grid-list-md text-md-center pt-0 pl-0 pr-0">
    <!-- Admin Usuarios -->
    <Administracion v-if="role === 'supervisor'"/>
    <!-- Pacientes -->
    <v-layout row wrap v-else>
      <Pacientes/>
      <PanelCentral v-if="showPaciente"/>
    </v-layout>
  </v-container>
</template>

<script>
import Pacientes from '@/components/desktop/Pacientes.vue'
import PanelCentral from '@/components/desktop/PanelCentral.vue'
import Administracion from '@/components/desktop/Administracion.vue'

export default {
  computed: {
    showPaciente () {
      return this.$store.getters.getShowPacienteSeleccionado
    },
    role () {
      return this.$store.getters.getUserRole
    }
  },
  created () {
    this.$store.dispatch('getTratamientosFrecuentes')
  },
  components: {
    Pacientes,
    PanelCentral,
    Administracion
  }
}
</script>