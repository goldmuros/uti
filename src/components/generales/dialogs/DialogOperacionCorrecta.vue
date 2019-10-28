<template>
  <v-card>
    <v-card-title>
      <span class="green--text headline">Operación correcta</span>
    </v-card-title>
    <v-card-text>
      Se ha realizado correctamente la operación
    </v-card-text>
    <v-card-actions>
      <v-spacer></v-spacer>
      <!-- Cerrar -->
      <v-btn
        class="red"
        fab
        @click.stop="$emit('close-dialog', 7)"
      >
        <v-icon dark>close</v-icon>
      </v-btn>
    </v-card-actions>
  </v-card>
</template>