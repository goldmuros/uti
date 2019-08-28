<template>
  <v-card>
    <v-card-title>
      <span class="headline">Eliminar Usuario</span>
    </v-card-title>
    <v-card-text>
      Se eliminará al usuario, desea continuar?
    </v-card-text>
    <v-card-actions>
      <v-spacer></v-spacer>
      <!-- Cerrar -->
      <v-tooltip top>
        <v-btn
          fab
          dark
          small
          slot="activator"
          @click="$emit('close-dialog', 10)"
        >
          <v-icon dark>close</v-icon>
        </v-btn>
        <span>Cerrar Ventana</span>
      </v-tooltip>
      <!-- Aceptar -->
      <v-tooltip top>
        <v-btn
          fab
          dark
          small
          flat
          class="red"
          slot="activator"
          @click="deleteUsuario"
        >
          <v-icon dark>done</v-icon>
        </v-btn>
        <span>Eliminar Usuario</span>
      </v-tooltip>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  methods: {
    deleteUsuario () {
      this.$store.dispatch('deleteUsuario')
      .then(() => {
        // Abre dialog Operacion Correcta
        this.$emit('open-dialog', 7)

        // Se cierra el Dialog
        this.$emit('close-dialog', 10)
      }).catch(() => {
        // Abre dialog Error Operacion
        this.$emit('open-dialog', 11)
      })
    }
  }
}
</script>