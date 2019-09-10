<template>
  <v-layout row class="layer-scroll-pacients">
    <v-flex md12>
      <v-card 
        class='ma-3 text-xs-left elevation-5 light-green lighten-1 cursor' 
        v-for="(paciente, index) in pacientes"
        :key="index" @click="cargarPaciente(paciente)">
        <v-container fluid grid-list-xs>
          <v-layout row wrap>
            <!-- Si tiene el permiso doctor -->
            <v-flex v-if="role === 'doctor'">
              <div>Cama: <b>{{ paciente.data.cama }}</b></div>
              <div>Nombre: <b>{{ paciente.data.nombre }}</b></div>
            </v-flex>
            <!-- Si tiene el permiso enfermeria -->
            <v-flex v-else>
              <div>Cama: <b>{{ paciente.data.cama }}</b></div>
              <div>Nombre: <b>{{ paciente.data.nombre }}</b></div>
            </v-flex>
          </v-layout>
          <v-layout>
            <pase v-if="role === 'doctor'"
              v-bind:paciente="paciente">
            </pase>
          </v-layout>
        </v-container>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import Pase from './Pase.vue'

export default {
  data () {
    return {
      dialog_pase: false,
      motivo: '',
      class_boton_disable: ''
    }
  },
  computed: {
    pacientes () {
      return this.$store.getters.getPacientes
    },
    role () {
      return this.$store.getters.getUserRole
    }
  },
  methods: {
    cargarPaciente (paciente) {
      this.$store.commit('setPacienteSeleccionado', paciente)
    }
  },
  created () {
    this.$store.dispatch('getPacientes')
  },
  components: {
    Pase
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