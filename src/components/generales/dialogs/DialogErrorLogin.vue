<template>
  <v-card>
    <v-card-title>
      <span class="red--text headline">Error al ingresar</span>
    </v-card-title>
    <v-card-text>
      El Usuario o Password ingresados es incorrecto.
    </v-card-text>
    <v-card-actions>
      <v-spacer></v-spacer>
      <!-- Cerrar -->
      <v-btn 
        fab
        class="red"
        slot="activator"
        @click="$emit('close-dialog', 13)"
      >
        <v-icon dark>close</v-icon>
      </v-btn>
    </v-card-actions>
  </v-card>
</template>