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
          v-if="role === 'enfermeria'"
          @click="dialog_nuevos_parametros = true"
        >
          <v-icon dark>add</v-icon>
        </v-btn>
        <span>Agregar nuevos valores a los parámetros</span>
      </v-tooltip>

      <v-dialog
        v-model="dialog_nuevos_parametros"
        max-width="75%"
        v-if="role === 'enfermeria'"
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
        <DialogErrorOperacion @close-dialog="closeDialog"/>
      </v-dialog>
    </v-flex>
  </v-layout>
</template>

<script>
import DialogNuevoParametros from '../generales/dialogs/DialogNuevoParametros.vue'
import DialogErrorOperacion from '../generales/dialogs/DialogErrorOperacion.vue'

export default {
  data () {
    return {
      dialog_nuevos_parametros: false,
      dialog_error_firebase: false
    }
  },
  computed: {
    role () {
      return this.$store.getters.getUserRole
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
    DialogErrorOperacion
  }
}
</script>