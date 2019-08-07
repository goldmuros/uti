<template>
  <v-layout>
    <v-container fluid class="grid-list-md text-md-center">
      <v-layout row wrap>
        <v-flex md3>
          <Pacientes></Pacientes>
        </v-flex>
        <v-flex md9 v-if="showPaciente">
          <panel-central></panel-central>
        </v-flex>
      </v-layout>
    </v-container>
  </v-layout>
</template>

<script>
import Pacientes from '../components/desktop/Pacientes.vue'
import PanelCentral from '../components/desktop/PanelCentral.vue'

export default {
  computed: {
    showPaciente () {
      return this.$store.getters.getShowPacienteSeleccionado
    }
  },
  components: {
    Pacientes,
    PanelCentral
  }
}
</script>
