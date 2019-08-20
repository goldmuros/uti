<template>
  <v-layout row pt-5>
    <v-flex md12>
      <!-- Gráfico todos los parámetros -->
      <v-tooltip top>
        <v-btn
          fab
          small
          dark
          class="indigo"
          slot="activator"
        >
          <!-- @click="abrirGraficoParametros" -->
          <v-icon dark>assessment</v-icon>
        </v-btn>
        <span>Gráfico de todos los parámetros</span>
      </v-tooltip>
      <!-- Agregar valores a los parámetros -->
      <v-tooltip top>
        <v-btn
          fab
          small
          dark
          class="indigo"
          slot="activator"
          v-if="user.role === 'enfermeria'"
          @click="dialog_nuevos_parametros = true"
        >
          <v-icon dark>add</v-icon>
        </v-btn>
        <span>Agregar nuevos valores a los parámetros</span>
      </v-tooltip>

      <v-dialog
        v-model="dialog_nuevos_parametros"
        max-width="75%"
        v-if="user.role === 'enfermeria'"
      >
        <DialogNuevoParametros
          @close-dialog="closeDialog"
          @open-dialog="openDialog">
        </DialogNuevoParametros>
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
import DialogNuevoParametros from '../generales/dialogs/DialogNuevoParametros.vue'
import DialogErrorFirebase from '../generales/dialogs/DialogErrorFirebase.vue'

export default {
  data () {
    return {
      dialog_nuevos_parametros: false,
      dialog_error_firebase: false
    }
  },
  computed: {
    user () {
      return this.$store.getters.getUser
    }
  },
  methods: {
    closeDialog (dialog) {
      switch (dialog) {
        case 2: //Error Firebase
          this.dialog_error_firebase = false
          break
        case 5: // Nuevos Parametros
          this.dialog_nuevos_parametros = false
          break
      }
    },
    openDialog (dialog) {
      switch (dialog) {
        case 2: //Error Firebase
          this.dialog_error_firebase = true
          break
      }
    }
  },
  components: {
    DialogNuevoParametros,
    DialogErrorFirebase
  }
}
</script>