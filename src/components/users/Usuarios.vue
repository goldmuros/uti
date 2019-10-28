<template>
  <v-layout align-content-center justify-center fill-height class="user_layout pr-1 pt-1">
    <v-flex md12 >
      <v-layout row class="text-xs-center user_list" justify-center>
        <Lista @open-dialog="openDialog"/>
        <v-tooltip left>
          <v-btn
            fab
            absolute
            botton
            right
            dark 
            class="indigo button_add_user"
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
      v-model="dialog_error_operacion"
    >
      <DialogErrorOperacion @close-dialog="closeDialog"/>
    </v-dialog>
  </v-layout>
</template>

<script>
import { closeDialog } from '@/utils/dialog-functions.js'

import Lista from './ListaDesktop.vue'
import DialogNuevoUsuario from '../generales/dialogs/DialogNuevoUsuario.vue'
import DialogErrorOperacion from '../generales/dialogs/DialogErrorOperacion.vue'
import DialogUpdateUsuario from '../generales/dialogs/DialogUpdateUsuario.vue'

export default {
  data () {
    return {
      dialog_nuevo_usuario: false,
      dialog_error_operacion: false,
      dialog_update_usuario: false,
      user: {}
    }
  },
  methods: {
    closeDialog (dialog) {
      let dialog_component = closeDialog(dialog)

      this[dialog_component] = false
    },
    openDialog () {
      this.dialog_update_usuario = true
    }
  },
  components: {
    Lista,
    DialogNuevoUsuario,
    DialogErrorOperacion,
    DialogUpdateUsuario
  }
}
</script>

<style scoped>
  .user_layout {
    height: 88vh;
  }

  .user_list {
    height: 100%;
    overflow-y: auto;
  }

  .button_add_user {
    position: absolute;
    right: 3vw;
    bottom: 10vh!important;
  }
</style>