<template>
  <v-container fluid class="grid-list-md text-md-center">
    <!-- Admin Usuarios -->
    <Administracion v-if="role === 'supervisor'"/>
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
import Administracion from '@/components/desktop/Administracion.vue'

export default {
  // data () {
  //   return {
  //     role: ''
  //   }
  // },
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
  // beforeMounted () {
  //   this.role = this.$store.getters.getUserRole

  // },
  components: {
    Pacientes,
    PanelCentral,
    Administracion
  }
}
</script>
