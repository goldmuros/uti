<template>
  <v-layout row class="layer-scroll-pacients">
    <v-flex md12>
      <!-- <v-card 
        class='ma-3 text-xs-left elevation-5 light-green lighten-1 cursor' 
        v-for="(paciente, index) in pacientes"
        :key="index"> -->
      <v-card 
        class='ma-3 text-xs-left elevation-5 light-green lighten-1 cursor'>
        <v-container fluid grid-list-xs>
          <v-layout row wrap>
            <!-- Si tiene el permiso doctor -->
            <v-flex md7 @click="" v-if="user.role === 'doctor'">
              <div>Cama: <b>Veintiuno</b></div>
              <div>Nombre: <b>Jose perez</b></div>
            </v-flex>
            <!-- Si tiene el permiso enfermeria -->
            <!-- <v-flex md12 @click="cargarPaciente(paciente)" v-else>
              <div>Cama: <b>{{ paciente.cama }}</b></div>
              <div>Nombre: <b>{{ paciente.nombre }}</b></div>
            </v-flex> -->
            <!-- Si tiene el permiso doctor -->
            
          </v-layout>
        </v-container>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  data () {
    return {
      dialog_pase: false,
      motivo: '',
      class_boton_disable: '',
      paciente_dialog: {}
    }
  },
  computed: {
    pacientes () {
      return this.$store.getters.getPacientes
    },
    validarPase () {
      if (this.motivo != '')
        return true
      else
        return false
    },
    user () {
      return this.$store.getters.getUser
    }
  },
  watch: {
    motivo: function() {
      if (this.motivo != '')
        this.class_boton_disable = ''
      else
        this.class_boton_disable = 'disabled'
    }
  },
  methods: {
    cargarPaciente (paciente) {
      this.$store.commit('setShowPanelCentral', paciente.id)
      this.$store.commit('setPacienteId', paciente.id)

      this.$store.commit('setAbrirNuevosTratamientos')
    },
    setPacienteDialog (paciente) {
      this.dialog_pase = true
      this.paciente_dialog = paciente
    },
    ejecutarPase (paciente) {
      paciente.pase.estado = !paciente.pase.estado
      paciente.pase.motivo = this.motivo

      this.$store.commit('deletePaciente', paciente)
      this.dialog_pase = !this.dialog_pase

      this.motivo = ''
    }
  }
}
</script>

<style>
  .layer-scroll-pacients {
    padding-top: 0px;
    overflow-y: auto;
  }

  .cursor {
    pointer-events: auto;
  }
</style>