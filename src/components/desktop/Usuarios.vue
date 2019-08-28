<template>
  <v-layout row wrap align-content-center justify-center fill-height>
    <v-flex md12>
      <v-layout row class="text-xs-center" justify-center>
        <Lista @open-dialog="openDialog"/>
      </v-layout>
      <v-layout row class="text-xs-center" justify-center>
        <v-tooltip right>
          <v-btn
            fab
            dark 
            class="indigo"
            slot="activator"
            @click.stop="dialog_nuevo_usuario = true"
          >
            <v-icon dark>person_add</v-icon>
          </v-btn>
          <span>Agregar usuario</span>
        </v-tooltip>
      </v-layout>
    </v-flex>

    <v-dialog
      max-width="50%"
      v-model="dialog_nuevo_usuario"
    >
      <DialogNuevoUsuario @close-dialog="closeDialog"/>
    </v-dialog>

    <v-dialog
      max-width="50%"
      v-model="dialog_update_usuario"
    >
      <DialogUpdateUsuario @close-dialog="closeDialog"/>
    </v-dialog>

    <v-dialog
      max-width="50%"
      v-model="dialog_error_firebase"
    >
      <DialogErrorFirebase @close-dialog="closeDialog"/>
    </v-dialog>
  </v-layout>
</template>

<script>
import Lista from '../users/ListaDesktop.vue'
import DialogNuevoUsuario from '../generales/dialogs/DialogNuevoUsuario.vue'
import DialogErrorFirebase from '../generales/dialogs/DialogErrorFirebase.vue'
import DialogUpdateUsuario from '../generales/dialogs/DialogUpdateUsuario.vue'


export default {
  data () {
    return {
      dialog_nuevo_usuario: false,
      dialog_error_firebase: false,
      dialog_update_usuario: false,
      user: {}
    }
  },
  methods: {
    closeDialog (dialog) {
      switch (dialog) {
        case 2: // Error Firebase
          this.dialog_error_firebase = false
          break
        case 8: // Nuevo usuario
          this.dialog_nuevo_usuario = false
          break
        case 9: // Update usuario
          this.dialog_update_usuario = false
          break
      }
    },
    openDialog () {
      this.dialog_update_usuario = true
    }
  },
  components: {
    Lista,
    DialogNuevoUsuario,
    DialogErrorFirebase,
    DialogUpdateUsuario
  }
}
</script>