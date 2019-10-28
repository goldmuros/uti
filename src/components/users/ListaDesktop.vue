<template>
  <div>
    <v-card 
      class='ma-3 text-xs-left elevation-5 light-green lighten-1 cursor' 
      v-for="(user, index) in users"
      :key="index"
      @click="cargarUser(user)"
    >
      <v-container fluid grid-list-md>
        <v-layout row wrap>
          <v-flex>
            <div>Nombre: <b>{{ user.data.name }}</b></div>
            <div>Role: <b>{{ user.data.role }}</b></div>
          </v-flex>
        </v-layout>
      </v-container>
    </v-card>
  </div>
</template>

<script>
export default {
  computed: {
    users () {
      let users = this.$store.getters.getUsers
      return users
    }
  },
  methods: {
    cargarUser (user) {
      this.$store.commit('setUsuarioSeleccionado', user)
      this.$emit('open-dialog') // Abre el dialog de update usuario
    }
  },
  created () {
     this.$store.dispatch('getUsers')
  }
}
</script>