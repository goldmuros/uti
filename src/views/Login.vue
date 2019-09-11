<template>
  <div>
    <v-card class="capa-login">
      <v-card-title>
        <h1 class="display-1">Ingrese Usuario y password</h1>
      </v-card-title>
      <v-card-text>
        <v-form>
          <v-text-field
            label="Usuario"
            hint="Ejemplo: caehlich"
            required
            v-model="usuario"
            :rules="usuarioRegla"
            autofocus
            prepend-icon="account_circle"
          />
          <v-text-field
            required
            :type="showPassword ? 'text' : 'password'"
            label="Clave"
            prepend-icon="lock"
            :append-icon="showPassword ? 'visibility' : 'visibility_off'"
            @click:append="showPassword = !showPassword"
            v-model="password"
            :rules="passwordRegla"
            @keyup.enter="login"
          />
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-tooltip top>
          <v-btn
            color="primary"
            slot="activator"
            @click="login"
          >
            Inicio
          </v-btn>
          <span>Inicio</span>
        </v-tooltip>
        <v-tooltip top>
          <v-btn
            slot="activator"
            @click="limpiar">Limpiar</v-btn>
          <span>Borrar campos</span>
        </v-tooltip>
      </v-card-actions>
    </v-card>

    <v-dialog v-model="dialog_error_login" max-width="50%">
      <DialogErrorLogin @close-dialog="closeDialog" />
    </v-dialog>
  </div>
</template>

<script>
import { closeDialog } from '@/utils/dialog-functions.js'

import DialogErrorLogin from '../components/generales/dialogs/DialogErrorLogin.vue'

export default {
  name: 'Login',
  data () {
    return {
      showPassword: false,
      dialog_error_login: false,
      usuario: '',
      password: '',
      usuarioRegla: [
        (v) => !!v || 'Usuario requerido'
      ],
      passwordRegla: [
        (v) => !!v || 'Password requerido'
      ]
    }
  },
  methods: {
    closeDialog (dialog) {
      let dialog_component = closeDialog(dialog)

      this[dialog_component] = false
    },
    login () {
      if (this.usuario !== '' && this.password !== '') {
        let usuario = {
          name: this.usuario.toLowerCase(),
          password: this.password.toLowerCase()
        }

        this.$store.dispatch('getUser', usuario).then(() => {
          this.$router.push('/desktop')
        })
        .catch(() => {
          this.dialog_error_login = true
        })
      }
    },
    limpiar () {
      this.usuario = ''
      this.password = ''
    }
  },
  components: {
    DialogErrorLogin
  }
}
</script>

<style>
  @media only screen and ( max-width: 360px ) and (orientation : portrait) {
    .capa-login {
      height: 93vh;
    }
  }

  @media only screen and ( max-width: 900px ) and (orientation : landscape) {
    .capa-login {
      height: 56vh;
    }
  }

  .background-blanco {
    background-color: white;
  }

  .formUsuario {
    overflow-y: auto!important;
  }
</style>
