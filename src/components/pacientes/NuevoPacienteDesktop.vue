<template>
  <!-- <v-layout row> -->
    <v-flex md12 class="text-xs-center">
      <v-tooltip right>
        <v-btn fab dark class="indigo" slot="activator" @click.stop="dialog_nuevo_paciente = true">
          <v-icon dark>person_add</v-icon>
        </v-btn>
        <span>Agregar paciente</span>
      </v-tooltip>
      <v-dialog v-model="dialog_nuevo_paciente" max-width="50%">
        <v-card>
          <v-card-title>
            <span class="headline">Nuevo Paciente</span>
          </v-card-title>
          <v-card-text>
            <v-container grid-list-md>
              <v-layout wrap>
                <v-flex xs12 sm6 md3>
                  <v-text-field 
                    label="Cama"
                    hint="Ejemplo: 5"
                    v-model="cama"
                    required
                    :rules="[
                      () => !!cama || 'Campo obligatorio',
                      this.validarCama || 'El valor debe ser numérico'
                    ]"
                    :error-messages="errorMensaje">
                  </v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md9>
                  <v-text-field
                    label="Nombre y Apellido"
                    required
                    hint="Ejemplo: Roberto Gramajo"
                    v-model="nombre"
                    @keyup.enter="crearPaciente">
                  </v-text-field>
                </v-flex>
              </v-layout>
            </v-container>
            <small>*indica campos obligatorios</small>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <!-- Cerrar -->
            <v-tooltip top>
              <v-btn fab dark class="red" slot="activator" @click="dialog_nuevo_paciente = false">
                <v-icon dark>close</v-icon>
              </v-btn>
              <span>Cerrar Ventana</span>
            </v-tooltip>
            <!-- Confirmar Alta Paciente -->
            <v-tooltip top>
              <v-btn fab dark class="primary ml-4 mr-4" slot="activator" flat :class="class_boton_disable" 
                :disabled="!validarNuevoPaciente" @click="crearPaciente">
                <v-icon dark>add</v-icon>
              </v-btn>
              <span>Confirmar Alta Paciente</span>
            </v-tooltip>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <!-- Popup de mensaje de error al guardar el paciente -->
      <v-dialog v-model="dialog_error_operacion" max-width="50%">
        <v-card>
          <v-card-title>
            <span class="red--text headline">Error al guardar al paciente</span>
          </v-card-title>
          <v-card-text>
            Ha habido un problema al guardar el paciente, por favor intentelo nuevamente
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <!-- Cerrar -->
            <v-btn class="red" fab @click="dialog_error_operacion = false">
              <v-icon dark>close</v-icon>
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <!-- Popup de mensaje correcto al guardar el paciente -->
      <v-dialog v-model="dialog_operacion_correcta" max-width="50%">
        <v-card>
          <v-card-title>
            <span class="red--text headline">Paciente guardado</span>
          </v-card-title>
          <v-card-text>
            Se ha guardado correctamente el paciente
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <!-- Cerrar -->
            <v-btn class="green" fab @click="dialog_operacion_correcta = false">
              <v-icon dark>close</v-icon>
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-flex>
  <!-- </v-layout>  -->
</template>

<script>
export default {
  data () {
    return {
      dialog_nuevo_paciente: false,
      dialog_operacion_correcta: false,
      dialog_error_operacion: false,
      nombre: '',
      cama: '',
      class_boton_disable: '',
      errorMensaje: []
    }
  },
  computed: {
    validarNuevoPaciente () {
      if (this.cama !== '' && this.nombre !== '')
        return true
      else  
        return false
    }
  },
  methods: {
    crearPaciente () {
      let paciente = {
        cama: this.cama,
        nombre: this.nombre
      }

      this.$store.dispatch('addPaciente', paciente).then(() => {
        this.cama = ''
        this.nombre = ''
        this.dialog_operacion_correcta = true
        // Se cierra el Dialog de Nuevo Paciente
        this.dialog_nuevo_paciente = false
  
        // Se muestra el panel central
        this.show_panel_central = true  
      }).catch(() => {
          this.dialog_error_operacion = true
      })
    },
    validarCama () {
      if (!isNaN(this.cama)) {
        this.errorMensaje = []
        return true
      }

      this.errorMensaje.push('El valor debe ser numérico')
      return false
    }
  }
}
</script>

<style>
  .disabled {
    color: green;
    opacity: .4;
    pointer-events: none;
  }
</style>
