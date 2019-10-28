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
      <v-tooltip top v-if="!isFrecuente">
        <v-btn
          fab
          dark
          small
          class="primary mr-4"
          slot="activator"
          @click="dialog_list_tratamientos_frecuentes = true"
        >
          <v-icon dark>replay</v-icon>
        </v-btn>
        <span>Tratamientos Frecuentes</span>
      </v-tooltip>
      <!-- Repetir Tratamientos -->
      <v-tooltip top v-if="!isFrecuente">
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
          class="red ml-4 mr-4"
          slot="activator"
          @click.stop="$emit('close-dialog', 0)"
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
          @click.stop="crearTratamiento">
          <v-icon dark>add</v-icon>
        </v-btn>
        <span>Agregar Tratamientos</span>
      </v-tooltip>
    </v-card-actions>

    <!-- Dialog Repetir Tratamientos -->
    <v-dialog
      max-width="75%"
      v-model="dialog_repetir_tratamientos"
      v-if="!isFrecuente && dialog_repetir_tratamientos"
    >
      <DialogRepetirTratamiento
        @close-dialog="closeDialog"
        @open-dialog="openDialog"
      />
    </v-dialog>

    <!-- Tratamientos Frecuentes -->
    <v-dialog
      max-width="75%"
      v-model="dialog_list_tratamientos_frecuentes"
    >
      <DialogListTratamientosFrecuentes
        @close-dialog="closeDialog"
        @open-dialog="openDialog"
      />
    </v-dialog>

    <v-dialog
      v-model="dialog_error_nuevo_tratamiento"
      max-width="50%"
    >
      <DialogErrorNuevoTratamiento 
        :texts="textosErrorNuevoTratamiento"
        @close-dialog="closeDialog"
      ></DialogErrorNuevoTratamiento>
    </v-dialog>
  </v-card>
</template>

<script>
import { closeDialog } from '@/utils/dialog-functions.js'

import DialogRepetirTratamiento from './DialogRepetirTratamiento.vue'
import DialogListTratamientosFrecuentes from './DialogListTratamientosFrecuentes.vue'
import DialogErrorNuevoTratamiento from './DialogErrorNuevoTratamiento.vue'

export default {
  props: ['isFrecuente'],
  data () {
    return {
      nombre: '',
      dosis: '',
      frecuencia: '',
      dialog_repetir_tratamientos: false,
      dialog_list_tratamientos_frecuentes: false,
      dialog_error_nuevo_tratamiento: false,
      textosErrorNuevoTratamiento: {
        title: 'Tratamiento',
        body: 'El tratamiento ya fue ingresado para el día de hoy.'
      }
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
      let dialog_component = closeDialog(dialog)

      this[dialog_component] = false
    },
    openDialog (dialog) {
      switch (dialog) {
        case 1: // Error de tratamiento repetido
          this.$emit('open-dialog', 1)
          break
      }
    },
    crearTratamiento () {
      let tratamiento = {
        nombre: this.nombre,
        dosis: this.dosis,
        frecuencia: this.frecuencia
      }

      if (this.isFrecuente) { // si se ingreso por Tratamientos Frecuentes
        this.$emit('retrieve-tratamiento', tratamiento)

        this.nombre = ''
        this.dosis = ''
        this.frecuencia = ''

        // Se cierra el Dialog
        this.$emit('close-dialog', 0)
      } else { // Si se ingreso por Tratamientos
        if (!this.$store.getters.existeTratamiento(this.nombre)) {
          this.$store.dispatch('addTratamiento', tratamiento).then(() => {
            this.nombre = ''
            this.dosis = ''
            this.frecuencia = ''
  
            // Se cierra el Dialog
            this.$emit('close-dialog', 0)
          }).catch(() => {
            // Abrir Dialog Error Operación
            this.$emit('open-dialog', 2)
          })
        } else {
          // Abrir Dialog Error
          this.$emit('open-dialog', 1)
        }
      }
    }
  },
  components: {
    DialogRepetirTratamiento,
    DialogListTratamientosFrecuentes,
    DialogErrorNuevoTratamiento
  }
}
</script>
