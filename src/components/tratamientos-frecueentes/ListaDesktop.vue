<template>
  <div>
    <v-card 
      class='ma-3 text-xs-left elevation-5 light-green lighten-1 cursor' 
      v-for="(tratamiento, index) in tratamientos"
      :key="index"
      @click="$emit('retrieveTratamientoFrecuente', tratamiento)"
    >
      <v-container fluid grid-list-md>
        <v-layout row wrap>
          <v-flex>
            <div>Nombre: <b>{{ tratamiento.data.nombre }}</b></div>
          </v-flex>
        </v-layout>
      </v-container>
    </v-card>
  </div>
</template>

<script>
export default {
  computed: {
    tratamientos () {
      return this.$store.getters.getTratamientosFrecuentes
    }
  }
}
</script>