<template>
  <v-card>
    <v-card-text class="subheading">
      Ha habido un problema con la operación, intentelo en unos minutos.
    </v-card-text>
    <v-card-actions>
      <v-spacer></v-spacer>
      <!-- Cerrar -->
      <v-btn
        fab
        class="red"
        @click.stop="$emit('close-dialog', 2)"
      >
        <v-icon dark>close</v-icon>
      </v-btn>
    </v-card-actions>
  </v-card>
</template>