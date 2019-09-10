<template>
  <div>
    <v-card>
      <v-card-title>
        <span class="headline">Nuevo Usuario</span>
      </v-card-title>
      <v-card-text>
        <v-container grid-list-md>
          <v-layout wrap>
            <v-flex md12>
              <v-text-field
                label="Nombre y Apellido"
                required
                hint="Ejemplo: Roberto Gramajo"
                v-model="nombre"
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
                v-model="password"
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
                v-model="role"
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
        <!-- Cerrar -->
        <v-tooltip top>
          <v-btn
            fab
            dark
            class="red"
            slot="activator"
            @click="$emit('close-dialog', 8)"
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
            :disabled="!validarNuevoUsuario"
            @click="addUsuario"
          >
            <v-icon dark>add</v-icon>
          </v-btn>
          <span>Confirmar Alta Usuario</span>
        </v-tooltip>
      </v-card-actions>
    </v-card>

    <v-dialog
      max-width="50%"
      v-model="dialog_operacion_correcta"
    >
      <DialogOperacionCorrecta @close-dialog="closeDialog"/>
    </v-dialog>
  </div>
</template>

<script>
import { closeDialog } from '@/utils/dialog-functions.js'

import DialogOperacionCorrecta from './DialogOperacionCorrecta.vue'

export default {
  data () {
    return {
      dialog_operacion_correcta: false,
      showPassword: false,
      nombre: '',
      password: '',
      roles: ['Doctor', 'Enfermeria'],
      role: '',
      nombreRule: [
        (v) => !!v || 'Nombre requerido'
      ],
      passwordRule: [
        (v) => !!v || 'Clave requerido'
      ]
    }
  },
  computed: {
    validarNuevoUsuario () {
      if (this.nombre !== '' && this.password !== '' && this.role !== '')
        return true

      return false
    }
  },
  methods: {
    closeDialog (dialog) {
      let dialog_component = closeDialog(dialog)

      this[dialog_component] = false
    },
    addUsuario () {
      let usuario = {
        name: this.nombre,
        password: this.password,
        role: this.role
      }

      this.$store.dispatch('addUsuario', usuario)
      .then(() => {
        this.password = ''
        this.nombre = ''
        this.role = ''

        this.dialog_operacion_correcta = true

        // Se cierra el Dialog
        this.$emit('close-dialog', 8)
      }).catch(() => {
          this.dialog_error_operacion = true
      })
    }
  },
  components: {
    DialogOperacionCorrecta
  }
}
</script>