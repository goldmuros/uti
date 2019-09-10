<template>
  <v-card>
    <v-card-title>
      <span class="headline">Repetir Tratamientos</span>
    </v-card-title>
    <v-card-text>
      <v-container grid-list-md>
        <v-layout wrap>
          <v-flex md4>
            <v-date-picker
              :show-current="true"
              :first-day-of-week="0"
              v-model="fecha"
              locale="es-AR"
              :events="diasConTratamientos"
              event-color="green lighten-1"
              no-title
              scrollable >
            </v-date-picker>
          </v-flex>
          <v-flex md8>
            <v-container pt-0>
              <v-layout row>
                <v-flex md10></v-flex>
                <v-flex md2 pl-4 class="check-todos">
                  <v-checkbox
                    label="Todos"
                    v-model="seleccionar"
                    @click.native="seleccionarTodos">
                  </v-checkbox>
                </v-flex>
              </v-layout>
            </v-container>
            <v-list id="lista-nuevos-tratamientos" two-line class="capa-scroll">
              <v-list-tile
                class="caja mt-1"
                v-for="(tratamiento, index) in tratamientos"
                :key="index"
              >
                <v-list-tile-content>
                  <v-list-tile-title>{{ tratamiento.nombre }}</v-list-tile-title>
                  <v-list-tile-title>{{ tratamiento.dosis }}</v-list-tile-title>
                  <v-list-tile-title>{{ tratamiento.frecuencia }}</v-list-tile-title>
                </v-list-tile-content>
                <v-list-tile-action>
                  <v-checkbox
                    v-model="tratamiento.repetir"
                    @click.native="seleccionarTratamiento">
                  </v-checkbox>
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
          @click="$emit('close-dialog', 4)"
        >
          <v-icon dark>close</v-icon>
        </v-btn>
        <span>Cerrar Ventana</span>
      </v-tooltip>
      <!-- Agregar -->
      <v-tooltip top>
        <v-btn
          fab
          dark
          small
          flat 
          class="primary"
          slot="activator"
          :disabled="!validarSeleccion"
          @click="agregarTratamientos"
        >
          <v-icon dark>add</v-icon>
        </v-btn>
        <span>Agregar Tratameintos</span>
      </v-tooltip>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  data () {
    return {
      fecha: '',
      seleccionar: false,
      validarSeleccion: false
    }
  },
  computed: {
    diasConTratamientos () {
      return this.$store.getters.getDiasTratamientos
    },
    tratamientos () {
      // Carga el array para la lista de tratamientos del dia seleccionado
      let tratamientos = this.$store.getters.getTratamientos(this.fecha)
      
      // Creamos una array nuevo con los tratamientos pero se le agrega el atributo repetir, 
      // solo se usa en este componente el nuevo atributo
      let tratamientos_repetir = []

      tratamientos.forEach(element => {
        let tratamiento = {
          nombre: element.nombre,
          dosis: element.dosis,
          frecuencia: element.frecuencia,
          dia: element.estado,
          estado: element.estado,
          repetir: false
        }

        tratamientos_repetir.push(tratamiento)
      })

      return tratamientos_repetir
    }
  },
  methods: {
    agregarTratamientos () {
      let tratamientos = []
      
      this.tratamientos.forEach((elemento) => {
        if (!this.$store.getters.existeTratamiento(elemento.nombre)) {
          if (elemento.repetir) {
            let tratamiento = {
              nombre: elemento.nombre,
              dosis: elemento.dosis,
              frecuencia: elemento.frecuencia,
              estado: elemento.estado
            }
    
            tratamientos.push(tratamiento)
          }
        } else {
          // Abrir Dialog Error
          this.$emit('open-dialog', 1)
        }
      })

      this.$store.dispatch('addManyTratamientos', tratamientos).then(() => {
        // Se cierra el Dialog
        this.$emit('close-dialog', 0)
      }).catch(() => {
        // Abrir Dialog Error Operación
        this.$emit('open-dialog', 2)
      })

      // Limpiamos los checks
      this.seleccionar = false
      this.seleccionarTodos()
    },
    seleccionarTodos () {
      let seleccionar = this.seleccionar
      let checks = 0

      // Chequea todos los tratamientos
      this.tratamientos.forEach((tratamiento) => {
        tratamiento.repetir = seleccionar

        if (tratamiento.repetir)
          checks++
        else
          checks--
      })
      
      if (checks > 0)
        this.validarSeleccion = true // Activamos el boton de agregar tratamientos
      else
        this.validarSeleccion = false // Desactivamos el boton de agregar tratamientos
    },
    seleccionarTratamiento () {
      let checks = 0

      this.tratamientos.forEach((tratamiento) => {
        if (tratamiento.repetir)
          checks++
      })

      if (checks > 0)
        this.validarSeleccion = true // Activamos el boton de agregar tratamientos
      else
        this.validarSeleccion = false // Desactivamos el boton de agregar tratamientos

      if (this.tratamientos.length === checks)
        this.seleccionar = true // Se chequea el checkbox Todos
      else
        this.seleccionar = false // Se deschequea el checkbox Todos
    }
  }  
}
</script>

<style>
  .capa-scroll {
    padding-top: 0px;
    overflow-y: auto;
    height: 325px;
  }
</style>