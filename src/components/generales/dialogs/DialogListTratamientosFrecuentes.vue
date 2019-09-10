<template>
  <v-card>
    <v-card-title>
      <span class="headline">Tratamientos Frecuentes</span>
    </v-card-title>
    <v-card-text>
      <v-container grid-list-md class="dialog-tratamientos-frecuentes">
        <v-layout wrap>
          <v-flex md4>
            <v-list id="lista-tratamientos-frecuentes" two-line class="capa-scroll">
              <v-list-tile
                class="caja mt-1"
                :key="index"
                v-for="(tratamiento, index) in tratamientosFrecuentes"
                @click="openTratamientoFrecuente(index)"
              >
                <v-list-tile-content>
                  <v-list-tile-title>{{ tratamiento.nombre }}</v-list-tile-title>
                </v-list-tile-content>
                <v-list-tile-action>
                  <v-checkbox 
                    v-model="tratamiento.usar"
                    @click.stop="seleccionarTratamientoFrecuente(index)"
                  ></v-checkbox>
                </v-list-tile-action>
              </v-list-tile>
            </v-list>
            <!-- <v-card  class="ma-3"
              :key="index"
              v-for="(tratamiento, index) in tratamientosFrecuentes">
              <v-card-text>
                <v-layout wrap>
                <v-flex md4>
                  <v-checkbox
                    @click="seleccionarTratamientoFrecuente(index)"
                  >
                  </v-checkbox>
                </v-flex>
                <v-flex md8>
                  {{ tratamiento.data.nombre }}
                </v-flex>
                </v-layout>
              </v-card-text>
            </v-card> -->
          </v-flex>
          <v-flex md8>
            <v-list id="lista-tratamientos-frecuente-seleccionado" two-line class="capa-scroll">
              <v-list-tile
                class="caja mt-1"
                :key="index"
                v-for="(tratamiento, index) in tratamientos"
              >
                <v-list-tile-content>
                  <v-list-tile-title>{{ tratamiento.nombre }}</v-list-tile-title>
                  <v-list-tile-title v-bind:title="tratamiento.dosis">{{ tratamiento.dosis }}</v-list-tile-title>
                  <v-list-tile-title v-if="tratamiento.frecuencia !== ''">{{ tratamiento.frecuencia }}</v-list-tile-title>
                  <v-list-tile-title v-else>Sin frecuencia</v-list-tile-title>
                </v-list-tile-content>
                <v-list-tile-action>
                  <v-checkbox
                    v-model="tratamiento.usar"
                    @click.stop="checkTratamiento(index)"
                  />
                </v-list-tile-action>
              </v-list-tile>
            </v-list>
          </v-flex>
        </v-layout>
      </v-container>
    </v-card-text>
    <v-card-actions>
      <v-spacer></v-spacer>
      <!-- Cerrar -->
      <v-tooltip top>
        <v-btn
          fab
          dark
          small
          class="red"
          slot="activator"
          @click="$emit('close-dialog', 12)">
          <v-icon dark>close</v-icon>
        </v-btn>
        <span>Cerrar Ventana</span>
      </v-tooltip>
      <!-- Agregar Tratameintos Frecuentes -->
      <v-tooltip top>
        <v-btn
          fab
          dark
          small
          flat
          class="primary"
          slot="activator"
          :disabled="!validarSeleccion"
          @click="addTratamientosFrecuentes">
          <v-icon dark>add</v-icon>
        </v-btn>
        <span>Agregar Tratameintos Frecuentes</span>
      </v-tooltip>
    </v-card-actions>
  </v-card>
</template>

<script>
let buscarTratamientoSeleccionado = (tratamientosSeleccionados, nombre) => {
  if (tratamientosSeleccionados.length > 0) {
    let posicion = -1

    tratamientosSeleccionados.find((tratamiento, index) => {
      if (tratamiento.nombre === nombre)
        posicion = index
    })

    return posicion
  } 

  return -1
}

export default {
  data () {
    return {
      tratamientosFrecuentes: [],
      tratamientos: [],
      tratamientosSeleccionados: []
    }
  },
  computed: {
    validarSeleccion () {
      if (this.tratamientosSeleccionados.length > 0)
        return true

      return false
    }
  },
  methods: {
    openTratamientoFrecuente (index) {
      this.tratamientos = this.tratamientosFrecuentes[index].tratamientos
    },
    seleccionarTratamientoFrecuente (index) {
      this.openTratamientoFrecuente(index)

      this.tratamientosFrecuentes[index].usar = !this.tratamientosFrecuentes[index].usar

      this.tratamientos.forEach((tratamiento) => {
        tratamiento.usar = this.tratamientosFrecuentes[index].usar

        let posicionTratamientosSeleccionados = buscarTratamientoSeleccionado(this.tratamientosSeleccionados, tratamiento.nombre)

        if (tratamiento.usar) {
          // Se agrega el tratamiento si no existe en el array
          if (posicionTratamientosSeleccionados === -1) 
            this.tratamientosSeleccionados.push(tratamiento)
        } else {
          // Se elimina el tratamiento si existe en el array
          if (posicionTratamientosSeleccionados > -1) 
            this.tratamientosSeleccionados.splice(posicionTratamientosSeleccionados, 1)
        }
      })
    },
    // Se agregan o eliminan Tratamientos del array tratamientosSeleccionado
    checkTratamiento(index) {
      this.tratamientos[index].usar = !this.tratamientos[index].usar // Cambia el estado de la variable
      
      // Buscar si existe el tratamiento en el array
      let posicionTratamientosSeleccionados = buscarTratamientoSeleccionado(this.tratamientosSeleccionados ,this.tratamientos[index].nombre)
      
      if (this.tratamientos[index].usar) {
        // Se agrega el tratamiento si no existe en el array
        if (posicionTratamientosSeleccionados === -1) 
          this.tratamientosSeleccionados.push(this.tratamientos[index])
      } else {
        // Se elimina el tratamiento si existe en el array
        if (posicionTratamientosSeleccionados > -1) 
          this.tratamientosSeleccionados.splice(posicionTratamientosSeleccionados, 1)
      }
    },
    addTratamientosFrecuentes () {
      let tratamientos = []

      this.tratamientosSeleccionados.forEach((elemento) => {
        if (!this.$store.getters.existeTratamiento(elemento.nombre)) {
          let tratamiento = {
            nombre: elemento.nombre,
            dosis: elemento.dosis,
            frecuencia: elemento.frecuencia,
            estado: 'A'
          }
    
          tratamientos.push(tratamiento)
        } else {
          // Abrir Dialog Error Tratamiento Repetido
          this.$emit('open-dialog', 1)
        }
      })

      if (tratamientos.length > 0) {
        this.$store.dispatch('addManyTratamientos', tratamientos).then(() => {
          // Se cierra el Dialog
          this.$emit('close-dialog', 12)
        }).catch(() => {
          // Abrir Dialog Error Operación
          this.$emit('open-dialog', 2)
        })
      }
    }
  },
  created () {
    let tratamientosFrecuentes = this.$store.getters.getTratamientosFrecuentes

    // si existen los tratamientos frecuentes los cargamos
    if (tratamientosFrecuentes !== undefined) {
      // Recorremos los Tratamientos Frecuentes
      tratamientosFrecuentes.forEach((tratamientoFrecuente) => {
        let tratamientos = []
        // Recorremos los Tratamientos de cada Tratamiento Frecuente
        tratamientoFrecuente.data.tratamientos.forEach((tratamiento) => {
          tratamientos.push({
            'nombre': tratamiento.nombre,
            'dosis': tratamiento.dosis,
            'frecuencia': tratamiento.frecuencia,
            'usar': false // Parametro para validar si hay que agregarlo al paciente
          })
        })

        this.tratamientosFrecuentes.push({
          'nombre': tratamientoFrecuente.data.nombre,
          'tratamientos': tratamientos,
          'usar': false
        })
      })
    }
  }
}
</script>

<style scoped>
  .dialog-tratamientos-frecuentes, #lista-tratamientos-frecuentes, #lista-tratamientos-frecuente-seleccionado {
    background-color: #bdbdbd!important;
  }
</style>