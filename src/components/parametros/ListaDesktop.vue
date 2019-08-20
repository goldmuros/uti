<template>
  <v-layout row>
    <v-flex md12>
      <v-card 
        :key="index"
        class="mt-1 ml-1 mr-1 mb-1"
        v-for="(parametro, index) in parametros"
      >
        <v-container
          fluid
          grid-list-xs
          :class="parametro.clase"
          class="caja title pt-3 pl-2"
          @click="openParametro(parametro)"
        >
          <v-layout row>
            <v-flex md9>
              {{ parametro.nombre }}
            </v-flex>
            <v-flex md3 v-if="parametro.nombre === 'Presión Arterial'">
              {{ parametro.valor.tam }}
            </v-flex>
            <v-flex sm3 xs3 v-else>
              {{ parametro.valor }}
            </v-flex>
          </v-layout>
        </v-container>
      </v-card>
    </v-flex>

    <v-dialog
      max-width="75%"
      v-model="dialog_detalle_parametro"
    >
      <DialogDetalleParametro 
        @close-dialog="closeDialog"
        v-bind:parametro="parametro"
      >
      </DialogDetalleParametro>
    </v-dialog>
  </v-layout>
</template>

<script>
import DialogDetalleParametro from '../generales/dialogs/DialogDetalleParametro.vue'

export default {
  data () {
    return {
      dialog_detalle_parametro: false,
      parametro: {}
    }
  },
  computed: {
    parametros () {
      return this.$store.getters.getUltimoParametro
    }
  },
  methods: {
    closeDialog (dialog) {
      switch (dialog) {
        case 2: //Error Firebase
          this.dialog_error_firebase = false
          break
        case 6: // Detalle Parametros
          this.dialog_detalle_parametro = false
          break
      }
    },
    openParametro (item) {
      this.parametro = item
      this.dialog_detalle_parametro = true
    }
  },
  components: {
    DialogDetalleParametro
  }
}
</script>

<style scoped>
  .presionArterial {
    background-color: red;
  }
  
  .temperatura {
    background-color: white;
  }

  .diuresis {
    background-color: white;
  }

  .frecuenciaCardiaca {
    background-color: green;
  }

  .frecuenciaRespiratoria {
    background-color: yellow;
  }

  .caja {
    border: 1px solid #000000;
    height: 8vh!important;
  }
</style>