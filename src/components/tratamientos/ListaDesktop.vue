<template>
  <v-list id="lista-tratamientos" two-line class="capa-scroll">
    <v-list-tile 
                class="caja mt-1"
                :class="class_tratamiento(tratamiento.estado)"
                v-for="(tratamiento, index) in tratamientosFiltroDia"
                :key="index"
    >
      <v-list-tile-content>
        <v-list-tile-title>{{ tratamiento.nombre }}</v-list-tile-title>
        <v-list-tile-title>{{ tratamiento.dosis }}</v-list-tile-title>
        <v-list-tile-title>{{ tratamiento.frecuencia }}</v-list-tile-title>
      </v-list-tile-content>
      <v-list-tile-action v-if="user.role === 'doctor'">
        <v-tooltip left>
          <v-btn light
                 slot="activator"
                 class="activar mt-2"
                 v-if="tratamiento.estado === 'A'"
                 @click="setSuspender(tratamiento)"
          >
            Suspender
          </v-btn>
          <v-btn light
                 slot="activator"
                 class="activar mt-2"
                 v-else
                 @click="setSuspender(tratamiento)"
          >
            Activar
          </v-btn>
          <span v-if="tratamiento.estado === 'A'">Suspender tratamiento</span>
          <span v-else>Activar tratamiento</span>
        </v-tooltip>
      </v-list-tile-action>
    </v-list-tile>
  </v-list>
</template>

<script>
export default {
  computed: {
    paciente () {
      return this.$store.getters.getPaciente
    },
    tratamientosFiltroDia () {
      // Carga el array para la lista de tratamientos del dia seleccionado
      let diaSeleccionado = this.$store.getters.getFechaSeleccionada
      return this.$store.getters.getTratamientos(diaSeleccionado)
    },
    user () {
      return this.$store.getters.getUser
    }
  },
  methods: {
    setSuspender (tratamiento) {
      if (tratamiento.estado === 'A')
        tratamiento.estado = 'S'
      else
        tratamiento.estado = 'A'

      let payload = {
        tratamiento: tratamiento
      }

      this.$store.dispatch('updateEstado', payload).then(() => {
        if (tratamiento.estado === 'A')
          this.suspender = true
  
        this.suspender = false

      })
    },
    class_tratamiento (estado) {
      return estado != 'A' ? 'suspender' : ''
    }
  }
}
</script>

<style>
  @media only screen and ( min-width: 901px ) {
    .capa-scroll {
      padding-top: 0px;
      overflow-y: auto;
      height: 325px;
    }

    .caja {
      border: 1px solid #000000;
      background-color: white;
    }

    .suspender {
      background-color: grey;
      pointer-events: none;
    }

    .activar {
      pointer-events: auto!important;
    }

    #lista-tratamientos {
      background-color: #bdbdbd!important;
    }
  } 
</style>