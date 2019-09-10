<template>
  <v-layout row>
    <v-flex md12 class="text-xs-center">
      <!-- Repetir Tratamientos -->
      <v-tooltip top>
        <v-btn 
          fab
          small
          dark
          class="indigo"
          slot="activator"
          @click="openCalendario"
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
        max-width="35%"
        v-model="dialog_calendario"
        v-if="dialog_calendario"
      >
        <DialogCalendario
          :diasConTratamientos="dias"
          @close-dialog="closeDialog">
        </DialogCalendario>
      </v-dialog>
   
      <v-dialog
        v-model="dialog_nuevo_tratamiento"
        max-width="50%"
      >
        <DialogNuevoTratamiento
          :isFrecuente="false"
          @close-dialog="closeDialog"
          @open-dialog="openDialog">
        </DialogNuevoTratamiento>
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

      <v-dialog
        v-model="dialog_error_operacion"
        max-width="50%"
      >
        <DialogErrorOperacion @close-dialog="closeDialog"/>
      </v-dialog>
    </v-flex>
  </v-layout>
</template>

<script>
import { closeDialog, openDialog } from '@/utils/dialog-functions.js'

import DialogNuevoTratamiento from '../generales/dialogs/DialogNuevoTratamiento.vue'
import DialogErrorNuevoTratamiento from '../generales/dialogs/DialogErrorNuevoTratamiento.vue'
import DialogErrorOperacion from '../generales/dialogs/DialogErrorOperacion.vue'
import DialogCalendario from '../generales/dialogs/DialogCalendario.vue'

export default {
  data () {
    return {
      dialog_nuevo_tratamiento: false,
      dialog_calendario: false,
      dialog_error_nuevo_tratamiento: false,
      dialog_error_operacion: false,
      textosErrorNuevoTratamiento: {
        title: 'Tratamiento',
        body: 'El tratamiento ya fue ingresado para el día de hoy. Ingrese otro tratamiento.'
      },
      dias: []
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
    openCalendario () {
      this.dias = this.$store.getters.getDiasTratamientos
      this.dialog_calendario = true
    }
  },
  components: {
    DialogNuevoTratamiento,
    DialogErrorNuevoTratamiento,
    DialogErrorOperacion,
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