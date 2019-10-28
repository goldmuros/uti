<template>
  <v-card>
    <v-card-title>
      <span class="red--text headline">Se olvido su Password?</span>
    </v-card-title>
    <v-card-text>
      Contacte con el supervisor a cargo.
    </v-card-text>
    <v-card-actions>
      <v-spacer></v-spacer>
      <!-- Cerrar -->
      <v-btn 
        fab
        class="red"
        slot="activator"
        @click.stop="$emit('close-dialog', 14)"
      >
        <v-icon dark>close</v-icon>
      </v-btn>
    </v-card-actions>
  </v-card>
</template>