<template>
  <v-card>
    <v-card-title>
      <span class="headline" v-if="tipoOperacion === 'nuevo'">Nuevo Tratamiento Frecuente</span>
      <span class="headline" v-else>Modificación Tratamiento Frecuente</span>
    </v-card-title>
    <v-card-text class="pt-0">
      <v-layout wrap>
        <v-flex md8>
          <v-text-field 
            label="Nombre"
            hint="Ejemplo: Reliveran"
            required
            v-model="nombre">
          </v-text-field>
        </v-flex>
      </v-layout>
      <v-layout wrap>
        <v-flex md12>
          <div class="title">Tratamientos</div>
          <div class="pt-2">
            <v-card
              v-for="(tratamiento, index) in tratamientos"
              :key="index"
            >
              <v-card-text>
                <div>{{ tratamiento.nombre }}</div>
                <div>{{ tratamiento.dosis }}</div>
                <div>{{ tratamiento.frecuencia }}</div>
              </v-card-text>
            </v-card>
          </div>
          <div>
            <v-tooltip right>
              <v-btn
                fab
                small
                dark 
                class="indigo"
                slot="activator"
                @click.stop="dialog_nuevo_tratamiento = true"
              >
                <v-icon dark>add</v-icon>
              </v-btn>
              <span>Agregar tratamiento</span>
            </v-tooltip>
          </div>
        </v-flex>
      </v-layout>
    </v-card-text>
    <v-card-actions>
      <v-spacer></v-spacer>
      <!-- Eliminar tratamiento frecuente -->
      <v-tooltip top v-if="tipoOperacion !== 'nuevo'">
        <v-btn
          fab
          dark
          small
          slot="activator"
          @click="dialog_delete_confirmacion = true"
        >
          <v-icon dark>delete_forever</v-icon>
        </v-btn>
        <span>Eliminar Tratamiento Frecuente</span>
      </v-tooltip>
      <!-- Cerrar -->
      <v-tooltip top>
        <v-btn
          fab
          dark
          small
          class="red"
          slot="activator"
          @click="$emit('close-dialog', 11)"
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
          @click="addTratamientoFrecuente"
        >
          <v-icon dark>check</v-icon>
        </v-btn>
        <span>Agregar Tratamientos</span>
      </v-tooltip>
    </v-card-actions>

    <v-dialog
      max-width="50%"
      v-model="dialog_nuevo_tratamiento"
    >
      <DialogNuevoTratamiento
        :isFrecuente="true"
        @close-dialog="closeDialog"
        @open-dialog="openDialog"
        @retrieve-tratamiento="retrieveTratamiento">
      </DialogNuevoTratamiento>
    </v-dialog>

    <v-dialog
      max-width="50%"
      v-model="dialog_error_operacion"
    >
      <DialogErrorOperacion @close-dialog="closeDialog"/>
    </v-dialog>

    <v-dialog
      max-width="50%"
      v-model="dialog_operacion_correcta"
    >
      <DialogOperacionCorrecta @close-dialog="closeDialog"/>
    </v-dialog>

    <v-dialog
      max-width="50%"
      v-model="dialog_delete_confirmacion"
    >
      <DialogDeleteConfirmacion
        :texts="textosConfirmacion"
        :id="id"
        @open-dialog="openDialog"
        @close-dialog="closeDialog"/>
    </v-dialog>
  </v-card>
</template>

<script>
import { closeDialog, openDialog } from '@/utils/dialog-functions.js'

import DialogNuevoTratamiento from './DialogNuevoTratamiento.vue'
import DialogDeleteConfirmacion from './DialogDeleteConfirmacion.vue'
import DialogErrorOperacion from './DialogErrorOperacion.vue'
import DialogOperacionCorrecta from './DialogOperacionCorrecta.vue'

export default {
  props: ['tipoOperacion', 'tratamientoFrecuente'],
  data () {
    return {
      dialog_nuevo_tratamiento: false,
      dialog_delete_confirmacion: false,
      dialog_error_operacion: false,
      dialog_operacion_correcta: false,
      textosConfirmacion: {
        title: 'Tratamiento Frecuente',
        body: 'tratamiento frecuente'
      },
      id: '',
      nombre: '',
      tratamientos: []
    }
  },
  computed: {
    validarTratamiento () {
      if (this.nombre !== '' && this.tratamientos.length > 0)
        return true
      else
        return false
    }
  },
  methods: {
    closeDialog (dialog) {
      let dialog_component = closeDialog(dialog)

      this[dialog_component] = false

      if (this.dialog_operacion_correcta) {
        // this.limpiar()
        this.$emit('close-dialog', 11)
      }
    },
    openDialog (dialog) {
      let dialog_component = openDialog(dialog)

      this[dialog_component] = true
    },
    limpiar () {
      this.id = ''
      this.nombre = ''
      this.tratamientos = []
    },
    retrieveTratamiento (tratamiento) {
      this.tratamientos.push(tratamiento)
    },
    addTratamientoFrecuente () {
      if (!this.$store.getters.existeTratamientoFrecuente(this.nombre)) {
        let tratamientoFrecuente = {
          'id': this.id,
          'nombre': this.nombre,
          'tratamientos': this.tratamientos
        }

        let operacion = 'updateTratamientoFrecuente'
        if (this.tipoOperacion === 'nuevo')
          operacion = 'addTratamientoFrecuente'

        this.$store.dispatch(operacion, tratamientoFrecuente).then(() => {
          this.nombre = ''
          this.tratamientos = []

          // Se cierra el Dialog
          this.$emit('close-dialog', 11)
        }).catch(() => {
          // Abrir Dialog Error Operación
          this.$emit('open-dialog', 2)
        })
      } else {
        // Abrir Dialog Error
        this.$emit('open-dialog', 1)
      }
    }
  },
  created () {
    if (this.tratamientoFrecuente.data !== undefined) { // cuando es una modificación
      this.id = this.tratamientoFrecuente.id
      this.nombre = this.tratamientoFrecuente.data.nombre
      this.tratamientos = this.tratamientoFrecuente.data.tratamientos
    }
  },
  components: {
    DialogNuevoTratamiento,
    DialogErrorOperacion,
    DialogDeleteConfirmacion,
    DialogOperacionCorrecta
  }
}
</script>

<style scoped>
  .list-tratamientos {
    height: 350px;
  }
</style>