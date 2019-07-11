<template>
  <v-layout>
    <v-container fluid class="grid-list-md text-md-center">
      <v-layout row wrap>
        <v-flex md3>
          <pacients></pacients>
        </v-flex>
        <v-flex md9>
          <!-- Panel central -->
        </v-flex>
      </v-layout>
    </v-container>
  </v-layout>
</template>

<script>
import Pacients from '../components/desktop/Pacients.vue'

export default {
  components: {
    Pacients
  }
}
</script>
