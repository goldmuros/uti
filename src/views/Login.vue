<template>
  <v-container align-center :class="capaLogin" class="text-md-center">
    <v-card>
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
        <v-layout align-center class="pb-3">
          <v-flex md7>
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
          </v-flex>
          <v-flex md5>
            <a @click="dialog_forgot_pass = true" class="forgot-pw">Olvido su Password?</a>
          </v-flex>
        </v-layout>
      </v-card-actions>
    </v-card>

    <v-dialog v-model="dialog_error_login" max-width="50%">
      <DialogErrorLogin @close-dialog="closeDialog" />
    </v-dialog>

    <v-dialog v-model="dialog_forgot_pass" max-width="50%">
      <DialogForgotPass @close-dialog="closeDialog" />
    </v-dialog>
  </v-container>
</template>

<script>
import { closeDialog } from '@/utils/dialog-functions.js'

import DialogErrorLogin from '../components/generales/dialogs/DialogErrorLogin.vue'
import DialogForgotPass from '../components/generales/dialogs/DialogForgotPass.vue'

export default {
  name: 'Login',
  data () {
    return {
      showPassword: false,
      dialog_error_login: false,
      dialog_forgot_pass: false,
      usuario: '',
      password: '',
      usuarioRegla: [
        (v) => !!v || 'Usuario requerido'
      ],
      passwordRegla: [
        (v) => !!v || 'Password requerido'
      ],
      capaLogin: ''
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
    }
  },
  components: {
    DialogErrorLogin,
    DialogForgotPass
  },
  created() {
    this.capaLogin = this.$store.getters.getMediaQuery
  }

}
</script>

<style>
  .mobile {
    height: 93vh;
  }

  .desktop {
    height: 56vh;
    width: 500px;
  }
</style>
