<template>
  <div>
    <v-card>
      <v-card-title>
        <span class="headline">Modificar Usuario</span>
      </v-card-title>
      <v-card-text>
        <v-container grid-list-md>
          <v-layout wrap>
            <v-flex md12>
              <v-text-field
                label="Nombre y Apellido"
                required
                hint="Ejemplo: Roberto Gramajo"
                v-model="user.name"
                :rules="nombreRule"
                @keyup.enter="addUsuario"
              />
            </v-flex>
          </v-layout>
          <v-layout wrap>
            <v-flex md12>
              <v-text-field 
                label="Clave"
                hint="Password"
                :type="showPassword ? 'text' : 'password'"
                v-model="user.password"
                required
                :append-icon="showPassword ? 'visibility' : 'visibility_off'"
                :rules="passwordRule"
                @click:append="showPassword = !showPassword"
                @keyup.enter="addUsuario"
              />
            </v-flex>
          </v-layout>
          <v-layout wrap>
            <v-flex md12>
              <v-select
                :items="roles"
                v-model="user.role"
                label="Role del usuario"
                solo
              ></v-select>
            </v-flex>
          </v-layout>
        </v-container>
        <small>*indica campos obligatorios</small>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <!-- Eliminar usuario -->
        <v-tooltip top>
          <v-btn
            fab
            dark
            slot="activator"
            @click="dialog_delete_confirmacion = true"
          >
            <v-icon dark>delete_forever</v-icon>
          </v-btn>
          <span>Eliminar Usuario</span>
        </v-tooltip>
        <!-- Cerrar -->
        <v-tooltip top>
          <v-btn
            fab
            dark
            class="red ml-4"
            slot="activator"
            @click="$emit('close-dialog', 9)"
          >
            <v-icon dark>close</v-icon>
          </v-btn>
          <span>Cerrar Ventana</span>
        </v-tooltip>
        <!-- Confirmar Alta Usuario -->
        <v-tooltip top>
          <v-btn
            fab
            dark
            flat
            class="primary ml-4 mr-4"
            slot="activator"
            :disabled="!validarUsuario"
            @click="updateUsuario"
          >
            <v-icon dark>add</v-icon>
          </v-btn>
          <span>Confirmar Modificación Usuario</span>
        </v-tooltip>
      </v-card-actions>
    </v-card>

    <v-dialog
      max-width="50%"
      v-model="dialog_operacion_correcta"
    >
      <DialogOperacionCorrecta @close-dialog="closeDialog"/>
    </v-dialog>

    <v-dialog
      max-width="50%"
      v-model="dialog_error_operacion"
    >
      <DialogErrorOperacion @close-dialog="closeDialog"/>
    </v-dialog>

    <v-dialog
      max-width="50%"
      v-model="dialog_delete_confirmacion"
    >
      <DialogDeleteConfirmacion
        :texts="textosConfirmacion"
        :id="''"
        @open-dialog="openDialog"
        @close-dialog="closeDialog"/>
    </v-dialog>
  </div>
</template>

<script>
import { closeDialog, openDialog } from '@/utils/dialog-functions.js'

import DialogOperacionCorrecta from './DialogOperacionCorrecta.vue'
import DialogErrorOperacion from './DialogErrorOperacion.vue'
import DialogDeleteConfirmacion from './DialogDeleteConfirmacion.vue'

export default {
  data () {
    return {
      dialog_operacion_correcta: false,
      dialog_error_operacion: false,
      dialog_delete_confirmacion: false,
      textosConfirmacion: {
        title: 'Usuario',
        body: 'usuario'
      },
      showPassword: false,
      roles: ['Doctor', 'Enfermeria'],
      nombreRule: [
        (v) => !!v || 'Nombre requerido'
      ],
      passwordRule: [
        (v) => !!v || 'Clave requerido'
      ]
    }
  },
  computed: {
    validarUsuario () {
      if (this.user.name !== '' && this.user.password !== '' && this.user.role !== '')
        return true

      return false
    },
    user () {
      return this.$store.getters.getDataUserSeleccionado
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
    updateUsuario () {
      this.$store.dispatch('updateUsuario', this.user)
      .then(() => {
        this.dialog_operacion_correcta = true

        // Se cierra el Dialog
        this.$emit('close-dialog', 9)
      }).catch(() => {
          this.dialog_error_operacion = true
      })
    }
  },
  components: {
    DialogOperacionCorrecta,
    DialogErrorOperacion,
    DialogDeleteConfirmacion
  }
}
</script>