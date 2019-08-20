<template>
  <v-card>
    <v-card-title>
      <span class="headline">Nuevo Tratamiento</span>
    </v-card-title>
    <v-card-text>
      <v-container grid-list-md>
        <v-layout wrap>
          <v-flex xs12 sm6 md9>
            <v-text-field 
              label="Nombre"
              hint="Ejemplo: Reliveran"
              required
              v-model="nombre">
            </v-text-field>
          </v-flex>
          <v-flex xs12 sm6 md9>
            <v-text-field
              label="Dosis"
              required
              hint="1 ampolla endovenosa (E.V.)"
              v-model="dosis">
            </v-text-field>
          </v-flex>
          <v-flex xs12 sm6 md9>
            <v-text-field
              label="Frecuencia"
              required
              hint="8 hs"
              v-model="frecuencia">
            </v-text-field>
          </v-flex>
        </v-layout>
      </v-container>
      <small>*indica campos obligatorios</small>
    </v-card-text>
    <v-card-actions>
      <v-spacer></v-spacer>
      <!-- Tratamientos Frecuentes -->
      <v-tooltip top>
        <v-btn
          fab
          dark
          small
          class="primary"
          slot="activator">
          <!-- @click="abrirTratamientosFrecuentes('agregar')"> -->
          <v-icon dark>replay</v-icon>
        </v-btn>
        <span>Tratamientos Frecuentes</span>
      </v-tooltip>
      <!-- Repetir Tratamientos -->
      <v-tooltip top>
        <v-btn
          fab
          dark
          small
          class="primary"
          slot="activator"
          @click="dialog_repetir_tratamientos = true"
        >
          <v-icon dark>autorenew</v-icon>
        </v-btn>
        <span>Repetir Tratamientos</span>
      </v-tooltip>
      <!-- Cerrar -->
      <v-tooltip top>
        <v-btn
          fab
          dark
          small
          class="red"
          slot="activator"
          @click="$emit('close-dialog', 0)"
        >
          <v-icon dark>close</v-icon>
        </v-btn>
        <span>Cerrar Ventana</span>
      </v-tooltip>
      <!-- Agregar -->
      <v-tooltip top>
        <v-btn
          fab
          dark
          small
          flat
          class="primary" 
          slot="activator"
          :disabled="!validarTratamiento"
          @click="crearTratamiento">
          <v-icon dark>add</v-icon>
        </v-btn>
        <span>Agregar Tratamientos</span>
      </v-tooltip>
    </v-card-actions>

    <!-- Dialog Repetir Tratamientos -->
    <v-dialog v-model="dialog_repetir_tratamientos" max-width="75%">
      <DialogRepetirTratamiento
        @close-dialog="closeDialog"
        @open-dialog="openDialog">
      </DialogRepetirTratamiento>
    </v-dialog>
  </v-card>
</template>

<script>
import DialogRepetirTratamiento from './DialogRepetirTratamiento.vue'

export default {
  data () {
    return {
      nombre: '',
      dosis: '',
      frecuencia: '',
      dialog_repetir_tratamientos: false
    }
  },
  computed: {
    validarTratamiento () {
      if (this.nombre !== '' && this.dosis !== '' && this.frecuencia !== '')
        return true
      else
        return false
    }
  },
  methods: {
    closeDialog (dialog) {
      switch (dialog) {
        case 4: // Repetir Tratamiento
          this.dialog_repetir_tratamientos = false
          break
      }
    },
    openDialog (dialog) {
      switch (dialog) {
        case 1: // Error de tratamiento repetido
          this.$emit('open-dialog', 1)
          break
      }
    },
    crearTratamiento () {
      if (!this.$store.getters.existeTratamiento(this.nombre)) {
        let tratamiento = {
          nombre: this.nombre,
          dosis: this.dosis,
          frecuencia: this.frecuencia
        }

        this.$store.dispatch('addTratamiento', tratamiento).then(() => {
          this.nombre = ''
          this.dosis = ''
          this.frecuencia = ''

          // Se cierra el Dialog
          this.$emit('close-dialog', 0)
        }).catch(() => {
          // Abrir Dialog Error Firebase
          this.$emit('open-dialog', 2)
        })
      } else {
        // Abrir Dialog Error
        this.$emit('open-dialog', 1)
      }
    }
  },
  components: {
    DialogRepetirTratamiento
  }
}
</script>
