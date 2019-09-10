<template>
  <div>
    <v-layout row wrap align-content-center justify-center fill-height>
      <v-flex md12 justify-center>
        <Lista
          @retrieveTratamientoFrecuente="retrieveTratamientoFrecuente"
        />
      </v-flex>
    </v-layout>
    <v-layout row align-content-center justify-center fill-height>
      <v-tooltip right>
        <v-btn
          fab
          dark 
          class="indigo"
          slot="activator"
          @click="openTratamientoFrecuente('nuevo')"
        >
          <v-icon dark>assignment</v-icon>
        </v-btn>
        <span>Agregar tratamientos frecuentes</span>
      </v-tooltip>
    </v-layout>

    <v-dialog
      max-width="50%"
      v-model="dialog_form_tratamiento_frecuente"
      v-if="dialog_form_tratamiento_frecuente"
    >
      <DialogFormTratamientoFrecuente
        :tipoOperacion="tipoOperacion"
        :tratamientoFrecuente="tratamientoFrecuente"
        @close-dialog="closeDialog"
        @open-dialog="openDialog"
      />
    </v-dialog>

    <v-dialog
      max-width="50%"
      v-model="dialog_error_operacion"
    >
      <DialogErrorOperacion @close-dialog="closeDialog"/>
    </v-dialog>

    <v-dialog
      max-width="50%"
      v-model="dialog_operacion_correcta"
    >
      <DialogOperacionCorrecta @close-dialog="closeDialog"/>
    </v-dialog>

    <v-dialog
      v-model="dialog_error_nuevo_tratamiento"
      max-width="50%"
    >
      <DialogErrorNuevoTratamiento 
        :texts="textosErrorNuevoTratamiento"
        @close-dialog="closeDialog"
      ></DialogErrorNuevoTratamiento>
    </v-dialog>
  </div>
</template>

<script>
import { closeDialog, openDialog } from '@/utils/dialog-functions.js'

import Lista from './ListaDesktop.vue'
import DialogFormTratamientoFrecuente from '../generales/dialogs/DialogFormTratamientoFrecuente.vue'
import DialogErrorOperacion from '../generales/dialogs/DialogErrorOperacion.vue'
import DialogOperacionCorrecta from '../generales/dialogs/DialogOperacionCorrecta.vue'
import DialogErrorNuevoTratamiento from '../generales/dialogs/DialogErrorNuevoTratamiento.vue'

export default {
  data () {
    return {
      tratamientoFrecuente: {},
      dialog_form_tratamiento_frecuente: false,
      dialog_error_operacion: false,
      dialog_operacion_correcta: false,
      dialog_error_nuevo_tratamiento: false,
      textosErrorNuevoTratamiento: {
        title: 'Tratamiento Frecuente',
        body: 'El tratamiento frecuente ya existe.'
      },
      tipoOperacion: '' // tipo de operacion que se realizara en el dialog nuevo tratamiento frecuente
    }
  },
  methods: {
    closeDialog (dialog) {
      let dialog_component = closeDialog(dialog)

      this[dialog_component] = false
    },
    openDialog (dialog) {
      let dialog_component = openDialog(dialog)

      this[dialog_component] = true
    },
    retrieveTratamientoFrecuente (tratamientoFrecuente) {
      this.tratamientoFrecuente = tratamientoFrecuente // Recibe los datos del tratamiento seleccionado en la lista
      this.openTratamientoFrecuente()
    },
    openTratamientoFrecuente (operacion) {
      this.tipoOperacion = operacion

      if (operacion === 'nuevo')
        this.tratamientoFrecuente = {}
        
      this.dialog_form_tratamiento_frecuente = true
    }
  },
  components: {
    Lista,
    DialogFormTratamientoFrecuente,
    DialogErrorOperacion,
    DialogOperacionCorrecta,
    DialogErrorNuevoTratamiento
  }  
}
</script>