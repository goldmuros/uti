<template>
  <v-card>
    <v-card-title>
      <span class="red--text headline">Operación correcta</span>
    </v-card-title>
    <v-card-text>
      Se ha realizado correctamente la operación
    </v-card-text>
    <v-card-actions>
      <v-spacer></v-spacer>
      <!-- Cerrar -->
      <v-btn class="green" fab @click="$emit('close-dialog', 7)">
        <v-icon dark>close</v-icon>
      </v-btn>
    </v-card-actions>
  </v-card>
</template>