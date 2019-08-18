<template>
  <v-layout row>
    <v-flex md12 class="text-xs-center">
      <!-- Tratamientos Frecuentes -->
      <v-tooltip top>
        <!-- <v-btn fab small dark class="indigo" slot="activator" @click="abrirTratamientosFrecuentes('ver')"> -->
        <v-btn 
          fab
          small
          dark
          class="indigo"
          slot="activator"
        >
          <v-icon dark>replay</v-icon>
        </v-btn>
        <span>Ver Tratamientos Frecuentes</span>
      </v-tooltip>
      <!-- Repetir Tratamientos -->
      <v-tooltip top>
        <v-btn 
          fab
          small
          dark
          class="indigo"
          slot="activator"
          @click="dialog_calendario = true"
        >
          <v-icon dark>date_range</v-icon>
        </v-btn>
        <span>Ver calendario de tratamientos</span>
      </v-tooltip>
      <!-- Nuevos Tratamientos -->
      <v-tooltip top>
        <v-btn
          fab
          small
          dark
          class="indigo"
          slot="activator"
          @click="dialog_nuevo_tratamiento = true"
        >
          <v-icon dark>add</v-icon>
        </v-btn>
        <span>Nuevo tratamiento</span>
      </v-tooltip>

      <v-dialog
        v-model="dialog_calendario"
        max-width="35%"
      >
        <DialogCalendario
          @close-dialog="closeDialog">
        </DialogCalendario>
      </v-dialog>
   
      <v-dialog
        v-model="dialog_nuevo_tratamiento"
        max-width="50%"
      >
        <DialogNuevoTratamiento
          @close-dialog="closeDialog"
          @open-dialog="openDialog">
        </DialogNuevoTratamiento>
      </v-dialog>

      <v-dialog
        v-model="dialog_error_nuevo_tratamiento"
        max-width="50%"
      >
        <DialogErrorNuevoTratamiento 
          @close-dialog="closeDialog"
        ></DialogErrorNuevoTratamiento>
      </v-dialog>

      <v-dialog
        v-model="dialog_error_firebase"
        max-width="50%"
      >
        <DialogErrorFirebase 
          @close-dialog="closeDialog"
        ></DialogErrorFirebase>
      </v-dialog>

      <!-- Dialog Repetir Tratamientos -->
      <v-dialog v-model="dialog_repetir_tratamientos" max-width="75%">
        
      </v-dialog>

      <!-- Tratamientos Frecuentes -->
      <v-dialog v-model="dialog_tratamientos_frecuentes" max-width="75%">
        
      </v-dialog>
    </v-flex>
  </v-layout>
</template>

<script>
import DialogNuevoTratamiento from './DialogNuevoTratamiento.vue'
import DialogErrorNuevoTratamiento from './DialogErrorNuevoTratamiento.vue'
import DialogErrorFirebase from './DialogErrorFirebase.vue'
import DialogCalendario from './DialogCalendario.vue'

export default {
  data () {
    return {
      fechaCalendario: '',
      dialog_nuevo_tratamiento: false,
      dialog_calendario: false,
      dialog_error_nuevo_tratamiento: false,
      dialog_error_firebase: false,
      dialog_repetir_tratamientos: false,
      dialog_tratamientos_frecuentes: false,
      class_boton_disable: '',
      tratamientosAnteriores: [],
      tratamientosFrecuentes: [],
      fechaRepetirTratamientos: '',
      diasRepetirTratamientos: [],
      tratamientosFrecuenteSeleccionado: [],
      seleccionar: false,
      verAgregarTratamientosFrecuentes: false
    }
  },
  computed: {
    validarSeleccionTratamientosFrecuentes () {
      // let tratamientosFrecuentes = this.$store.getters.getTratamientosFrecuentes.filter((tratamientoFrecuente) => {
      //   return tratamientoFrecuente.seleccionarFrecuente === true
      // })

      // let usarTratamientos = false

      // tratamientosFrecuentes.forEach((tratamientoFrecuente) => {
      //   tratamientoFrecuente.tratamientos.forEach((tratamiento) => {
      //     if (tratamiento.usar) {
      //       usarTratamientos = true
      //     } else {
      //       usarTratamientos = false
      //     }
      //   })
      // })

      // if (usarTratamientos) {
      //   this.class_boton_disable = ''
      //   return true
      // } else {
      //   this.class_boton_disable = 'disabled'
      //   return false
      // }
      return false
    }
  },
  watch: {
    frecuencia: function () {
      if (this.nombre !== '' && this.dosis !== '' && this.frecuencia !== '')
        this.class_boton_disable = ''
      else
        this.class_boton_disable = 'disabled'
    },
    diasRepetirTratamientos: function () {
      // if (this.dialog_repetir_tratamientos)
      //   diasTratamiento = this.$store.getters.getDiasTratamiento
      // else 
      //   diasTratamiento = []
    }
  },
  methods: {
    // diasConTratamientos: dia => diasTratamiento.indexOf(dia) !== -1,
    closeDialog (dialog) {
      switch (dialog) {
        case 0: // Nuevo Tratamitneo
          this.dialog_nuevo_tratamiento = false
          break
        case 1: // Error Nuevo Tratamiento
          this.dialog_error_nuevo_tratamiento = false
          break
        case 2: //Error Firebase
          this.dialog_error_firebase = false
          break
        case 3: // Calendario
          this.dialog_calendario = false
          break
      }
    },
    openDialog (dialog) {
      switch (dialog) {
        case 0:
          this.dialog_nuevo_tratamiento = true
          break
        case 1:
          this.dialog_error_nuevo_tratamiento = true
          break
        case 2:
          this.dialog_error_firebase = true
          break
      }
    },
    abrirRepetirTratamientos () {
      this.fechaRepetirTratamientos = this.$store.getters.getFechaActual
      this.diasRepetirTratamientos = this.$store.getters.getDiasTratamiento
      this.dialog_repetir_tratamientos = !this.dialog_repetir_tratamientos
    },
    mostrarTratamientosAnteriores () {
      let paciente = this.$store.getters.getPaciente

      this.tratamientosAnteriores = paciente.tratamientos.filter((tratamiento) => {
        tratamiento.repetir = false

        return tratamiento.dia === this.fechaRepetirTratamientos
      })
    },
    abrirTratamientosFrecuentes (tipo) {
      if (tipo === 'agregar') {
        this.verAgregarTratamientosFrecuentes = true
      } else {
        this.verAgregarTratamientosFrecuentes = false
      }

      this.tratamientosFrecuentes = this.$store.getters.getTratamientosFrecuentes
      this.dialog_tratamientos_frecuentes = !this.dialog_tratamientos_frecuentes
    },
    abrirTratamientoFrecuente (index) {
      this.tratamientosFrecuenteSeleccionado = this.tratamientosFrecuentes[index].tratamientos
    },
    seleccionarTratamientoFrecuente (index) {
      this.tratamientosFrecuentes[index].seleccionarFrecuente = !this.tratamientosFrecuentes[index].seleccionarFrecuente

      this.tratamientosFrecuentes[index].tratamientos.forEach((tratamiento) => {
        tratamiento.usar = this.tratamientosFrecuentes[index].seleccionarFrecuente
      })
    },
    cerrarTratamientosFrecuentes () {
      this.tratamientosFrecuentes.forEach((tratamientoFrecuente) => {
        tratamientoFrecuente.seleccionarFrecuente = false

        tratamientoFrecuente.tratamientos.forEach((tratamiento) => {
          tratamiento.usar = false
        })
      })

      this.dialog_tratamientos_frecuentes = !this.dialog_tratamientos_frecuentes
      this.tratamientosFrecuenteSeleccionado = []
    },
    cerrarRepetirTratamientos () {
      this.seleccionar = false
      this.dialog_repetir_tratamientos = !this.dialog_repetir_tratamientos
      this.tratamientosAnteriores = []
    },
    agregarTratamientosFrecuentes () {
      let tratamientosFrecuentesSeleccionados = this.tratamientosFrecuentes.filter((tratamientoFrecuente) => {
        return tratamientoFrecuente.seleccionarFrecuente === true
      })

      tratamientosFrecuentesSeleccionados.forEach((tratamientoFrecuente) => {
        let tratamientos = tratamientoFrecuente.tratamientos.filter((tratamiento) => {
          return tratamiento.usar === true
        })

        tratamientos.some((tratamiento) => {
          if (!this.$store.getters.existeTratamiento(tratamiento.nombre)) {
            let payload = {
              nombre: tratamiento.nombre,
              dosis: tratamiento.dosis,
              frecuencia: tratamiento.frecuencia
            }

            this.$store.commit('crearTratamiento', payload)
          } else {
            this.dialog_error_nuevo_tratamiento = !this.dialog_error_nuevo_tratamiento

            tratamientos.filter((tratamiento) => {
              return tratamiento.usar === true
            }).forEach((tratamiento) => {
              tratamiento.usar = !tratamiento.usar
            })

            return true
          }
        })
      })

      this.cerrarTratamientosFrecuentes()
    }
  },
  components: {
    DialogNuevoTratamiento,
    DialogErrorNuevoTratamiento,
    DialogErrorFirebase,
    DialogCalendario
  }
}
</script>

<style>
  @media only screen and ( min-width: 901px ) {
    .disabled {
      color: green;
      opacity: .4;
      pointer-events: none;
    }

    #lista-repetir-tratamientos {
      background-color: #bdbdbd!important;
      max-height: 300px;
    }

    .check-todos {
      max-height: 30px;
    }

    .dialog-tratamientos-frecuentes, #lista-tratamientos-frecuentes, #lista-tratamientos-frecuente-seleccionado {
      background-color: #bdbdbd!important;
    }
  }
</style>