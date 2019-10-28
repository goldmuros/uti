<template>
  <v-container class="pt-1">
    <Lista></Lista>
    <Botonera></Botonera>
  </v-container>
</template>

<script>
import Lista from './ListaDesktop.vue'
import Botonera from './BotoneraDesktop.vue'

export default {
  components: {
    Lista,
    Botonera
  }  
}
</script>
