<template>
  <v-card>
    <v-card-title>
      <span class="red--text headline">Usuario guardado</span>
    </v-card-title>
    <v-card-text>
      Se ha guardado correctamente el usuario
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