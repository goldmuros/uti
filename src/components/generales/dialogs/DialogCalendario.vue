<template>
  <v-card>
    <v-card-title>
      <span class="headline">Calendario de Tratamientos</span>
    </v-card-title>
    <v-card-text>
      <v-container class="pt-0 pl-5 pb-0">
        <v-layout>
          <v-date-picker
            :show-current="true"
            :first-day-of-week="0"
            v-model="fecha"
            locale="es-AR"
            :events="diasConTratamientos"
            event-color="green lighten-1"
            no-title
            scrollable 
            @click.native="seleccionarFecha"
          />
        </v-layout>
        <v-layout>
          <v-spacer></v-spacer>
          <!-- Cerrar -->
          <v-tooltip top>
            <v-btn
              fab
              dark
              small
              class="red"
              slot="activator"
              @click.stop="$emit('close-dialog', 3)"
            >
              <v-icon dark>close</v-icon>
            </v-btn>
            <span>Cerrar Ventana</span>
          </v-tooltip>
        </v-layout>
      </v-container>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  props: ['diasConTratamientos'],
  data () {
    return {
      fecha: ''
    }
  },
  methods: {
    seleccionarFecha () {
      this.$store.commit('setFechaSeleccionada', this.fecha)
      this.$emit('close-dialog', 3)
    }
  }
}
</script>