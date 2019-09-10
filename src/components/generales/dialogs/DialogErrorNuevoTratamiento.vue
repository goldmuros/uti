<template>
  <v-card>
    <v-card-title>
      <span class="red--text headline">{{ texts.title }} Repetido</span>
    </v-card-title>
    <v-card-text>
      {{ texts.body }}
    </v-card-text>
    <v-card-actions>
      <v-spacer></v-spacer>
      <!-- Cerrar -->
      <v-tooltip top>
        <v-btn
          fab
          dark
          small
          class="red"
          slot="activator"
          @click="$emit('close-dialog', 1)">
          <v-icon dark>close</v-icon>
        </v-btn>
        <span>Cerrar Ventana</span>
      </v-tooltip>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  props:['texts']
}
</script>