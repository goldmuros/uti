<template>
  <v-flex>
    <v-tooltip right>
      <v-btn light slot="activator" hover @click="dialog_pase = true">Pase</v-btn>
      <span>Pase paciente</span>
    </v-tooltip>
    <!-- Pase -->
    <v-dialog v-model="dialog_pase" max-width="50%">
      <v-card >
        <v-card-title>
          <span class="headline">Pase</span>
        </v-card-title>
        <v-card-text>
          <v-container grid-list-md>
            <v-layout wrap>
            <v-flex md12>
              <v-textarea v-model="motivo" auto-grow box
                label="Motivo" rows="1" required background-color="white"
                hint="Ejemplo: Pase a sala" 
                @keyup.enter="ejecutarPase()"></v-textarea>
            </v-flex>
            </v-layout>
          </v-container>
          <small>* campos obligatorios</small>
        </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <!-- Cerrar -->
            <v-tooltip top>
              <v-btn fab dark class="red" slot="activator" @click="dialog_pase = false">
                <v-icon dark>close</v-icon>
              </v-btn>
              <span>Cerrar Ventana</span>
            </v-tooltip>
            <!-- Confirmar Pase -->
            <v-tooltip top>
              <v-btn fab dark class="primary ml-4 mr-4" slot="activator" flat :class="class_boton_disable" 
                :disabled="!validarPase" @click="ejecutarPase()">
                <v-icon dark>add</v-icon>
              </v-btn>
              <span>Confirmar Pase</span>
            </v-tooltip>
          </v-card-actions>
      </v-card>
    </v-dialog>
  </v-flex>
</template>

<script>
export default {
  props: ['paciente'],
  data () {
    return {
      motivo: '',
      dialog_pase: false,
      class_boton_disable: ''
    }
  },
  computed: {
    validarPase () {
      if (this.motivo != '')
        return true
      else
        return false
    }
  },
  watch: {
    motivo: function() {
      if (this.motivo != '')
        this.class_boton_disable = ''
      else
        this.class_boton_disable = 'disabled'
    }
  },
  methods: {
    ejecutarPase () {
      this.paciente.data.pase.estado = true
      this.paciente.data.pase.motivo = this.motivo

      this.$store.dispatch('deletePaciente', this.paciente).then(() => {
        this.dialog_pase = false
        this.motivo = ''
      })
    }
  }
}
</script>

