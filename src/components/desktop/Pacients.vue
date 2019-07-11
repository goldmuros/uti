<template>
  <v-flex>
    <list></list>
    <!-- cambiar la validacion a admin -->
    <!-- <nuevo-paciente v-if="user.role === 'doctor'"></nuevo-paciente> -->
  </v-flex>
</template>

<script>
import List from '../pacients/ListDesktop.vue'

export default {
  computed: {
    user () {
      return this.$store.getters.getUser
    }
  },
  components: {
    List
  }
}
</script>
