<template>
  <v-card>
    <v-card-title>
      <span class="headline">Parámetros</span>
    </v-card-title>
    <v-card-text>
      <v-container grid-list-md>
        <v-layout wrap>
          <v-flex md4>
            <v-text-field
              label="Presión Sistolica"
              required
              hint="120"
              v-model="presionSistolica">
            </v-text-field>
          </v-flex>
          <v-flex md4>
            <v-text-field
              label="Presión Diastolica"
              required
              hint="80"
              v-model="presionDiastolica">
            </v-text-field>
          </v-flex>
          <v-flex md4>
            <v-text-field
              label="Temperatura"
              required
              hint="37.6"
              v-model="temperatura">
            </v-text-field>
          </v-flex>
        </v-layout>
        <v-layout wrap>
          <v-flex md4>
            <v-text-field
              label="Diuresis"
              required
              hint="300"
              v-model="diuresis">
            </v-text-field>
          </v-flex>
          <v-flex md4>
            <v-text-field
              label="Frecuencia Cardiaca"
              required
              hint="100"
              v-model="frecuenciaCardiaca">
            </v-text-field>
          </v-flex>
          <v-flex md4>
            <v-text-field
              label="Frecuencia Respiratoria"
              required
              hint="22"
              v-model="frecuenciaRespiratoria">
            </v-text-field>
          </v-flex>
          <v-flex md4></v-flex>
        </v-layout>
      </v-container>
      <small>*indica campos obligatorios</small>
    </v-card-text>
    <v-card-actions>
      <v-spacer></v-spacer>
      <!-- Cerrar -->
      <v-tooltip top>
        <v-btn
          fab
          dark
          small
          class="red mr-4"
          slot="activator"
          @click.stop="$emit('close-dialog', 5)"
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
          :disabled="!validarParametros"
          @click.stop="addParametros"
        >
          <v-icon dark>add</v-icon>
        </v-btn>
        <span>Agregar Parámetros</span>
      </v-tooltip>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  data () {
    return {
      presionSistolica: '',
      presionDiastolica: '',
      temperatura: '',
      diuresis: '',
      frecuenciaCardiaca: '',
      frecuenciaRespiratoria: ''
    }
  },
  computed: {
    validarParametros () {
      if (this.presionSistolica !== '' && this.presionDiastolica !== '' && this.temperatura !== '' &&
          this.diuresis !== '' && this.frecuenciaCardiaca !== '' && this.frecuenciaRespiratoria !== '')
        return true
      else
        return false
    }
  },
  methods: {
    addParametros () {
      let pacienteData = this.$store.getters.getDataPacienteSeleccionado

      let parametros = {
        presionSistolica: parseInt(this.presionSistolica),
        presionDiastolica: parseInt(this.presionDiastolica),
        temperatura: this.temperatura,
        diuresis: this.diuresis,
        frecuenciaCardiaca: this.frecuenciaCardiaca,
        frecuenciaRespiratoria: this.frecuenciaRespiratoria,
        parametros: pacienteData.parametros // Enviamos los array de parametros
      }

      this.$store.dispatch('addParametros', parametros).then(() => {
        this.presionSistolica = ''
        this.presionDiastolica = ''
        this.temperatura = ''
        this.diuresis = ''
        this.frecuenciaCardiaca = ''
        this.frecuenciaRespiratoria = ''

        this.$emit('close-dialog', 5)
      }).catch(() => {
        // Abrir Dialog Error Operación
        this.$emit('open-dialog', 2)
      })
    }
  }
}
</script>