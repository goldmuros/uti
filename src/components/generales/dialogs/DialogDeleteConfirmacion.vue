<template>
  <v-card>
    <v-card-title>
      <span class="headline">Eliminar {{ texts.title }}</span>
    </v-card-title>
    <v-card-text>
      Se eliminará al {{ texts.body }}, desea continuar?
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
          @click.stop="$emit('close-dialog', 10)"
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
          class="red ml-4"
          slot="activator"
          @click.stop="deleteThis"
        >
          <v-icon dark>done</v-icon>
        </v-btn>
        <span>Eliminar {{ texts.title }}</span>
      </v-tooltip>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  props: ['texts', 'id'],
  methods: {
    deleteThis () {
      let action = ''

      switch (this.texts.body) {
        case 'usuario':
          action = 'deleteUsuario'
          break
        case 'tratamiento frecuente':
          action = 'deleteTratamientoFrecuente'
          break
      }

      this.$store.dispatch(action, this.id)
      .then(() => {
        // Abre dialog Operacion Correcta
        this.$emit('open-dialog', 7)

        // Se cierra el Dialog
        this.$emit('close-dialog', 10)
      }).catch(() => {
        // Abre dialog Error Operacion
        this.$emit('open-dialog', 1)
      })
    }
  }
}
</script>