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
    </v-flex>
  </v-layout>
</template>

<script>
import DialogNuevoTratamiento from '../generales/dialogs/DialogNuevoTratamiento.vue'
import DialogErrorNuevoTratamiento from '../generales/dialogs/DialogErrorNuevoTratamiento.vue'
import DialogErrorFirebase from '../generales/dialogs/DialogErrorFirebase.vue'
import DialogCalendario from '../generales/dialogs/DialogCalendario.vue'

export default {
  data () {
    return {
      dialog_nuevo_tratamiento: false,
      dialog_calendario: false,
      dialog_error_nuevo_tratamiento: false,
      dialog_error_firebase: false
    }
  },
  methods: {
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