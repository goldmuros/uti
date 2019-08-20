<template>
  <v-card>
    <v-card-title>
      <span class="headline">{{ nombre }}</span>
    </v-card-title>
    <v-card-text>
      <v-data-table
        hide-actions
        class="tabla"
        v-bind:headers="cabeceraDialog"
        :items="valores"
      >
        <template slot="items" slot-scope="props">
          <td class="text-xs-center">{{ props.item.fecha }}</td>
          <td class="text-xs-center">{{ props.item.hora }}</td>
          <td class="text-xs-center" v-if="nombre==='Presión Arterial'">
            <b>{{ props.item.valor.tam }}</b>
          </td>
          <td class="text-xs-center" v-else><b>{{ props.item.valor }}</b></td>
        </template>
      </v-data-table>
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
          class="red"
          @click="$emit('close-dialog', 6)"
        >
          <v-icon dark>close</v-icon>
        </v-btn>
        <span>Cerrar Ventana</span>
      </v-tooltip>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  props: ['parametro'],
  data () {
    return {
      cabeceraDialog: [
        { text: 'Fecha', value: 'fecha', sortable: false, align: 'center' },
        { text: 'Hora', value: 'hora', sortable: false, align: 'center' },
        { text: 'Valor', value: 'valor', sortable: false, align: 'center' }
      ]
    }
  },
  computed: {
    nombre () {
      return this.parametro.nombre // Nombre del parametro
    },
    valores () {
      return this.parametro.valores // Array de valores que tiene el parametro
    }
  }
}
</script>

<style scoped>
  .tabla {
    height: 52vh;
    overflow-y: auto;
  }
</style>