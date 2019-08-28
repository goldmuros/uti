<template>
  <v-card class="mx-auto">
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
    <v-card-action>
      <v-btn
        color="primary"
        @click="login"
      >
        Inicio
      </v-btn>
      <v-btn @click="limpiar">Limpiar</v-btn>
    </v-card-action>
  </v-card>
</template>

<script>
export default {
  data () {
    return {
      showPassword: false,
      // dialog_error_usuario: false,
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
    login () {
      if (this.$refs.form.validate()) {
        let usuario = {
          name: this.usuario.toLowerCase(),
          password: this.password.toLowerCase()
        }

        let user = this.$store.getters.getValidarUsuario(usuario)

        if (user) {
          this.$router.push('/principal')
        } else {
          this.dialog_error_usuario = true
        }
      }
    },
    limpiar () {
      this.$refs.form.reset()
    }
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
