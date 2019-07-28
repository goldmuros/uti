import Vue from 'vue'
import Vuex from 'vuex'
import { db } from './config/config-firebase.js'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    pacientes: [],
    user: {
      role: 'doctor',
      name: 'Bel'
    },
    activePage: '',
    mediaQuery: ''
  },
  getters: {
    getActivePage: state => {
      return state.activePage
    },
    getUser: state => {
      return state.user
    },
    getPacientes: state => {
      return state.pacientes
    }
  },
  mutations: {
    setMediaQuery (state, mediaQuery) {
      state.mediaQuery = mediaQuery
    },
    setPaciente (state, payload) {
      state.pacientes.push(payload)
    },
    deletePaciente (state, payload) {
      // Mostrar todos los índices, incluyendo los eliminados
      state.pacientes.find((paciente, index) => {

        // Eliminar el elemento 5 en la primera iteración
        if (paciente.id === payload.id) {
          state.pacientes.splice(index, 1)
        }
      })
    }
  },
  actions: {
    addPaciente ({commit,}, payload) {
      return new Promise((resolve, reject) => {
        let paciente = {
          cama: payload.cama,
          nombre: payload.nombre,
          pase: {
            estado: false,
            motivo: ''
          },
          dias: [],
          tratamientos: [],
          parametros: [
            {
              nombre: 'Presión Arterial',
              valores: [
                {fecha: '', valor: { tam: 0, ps: 0, pd: 0 }}
              ]
            },
            {
              nombre: 'Temperatura',
              valores: [
                {fecha: '', valor: 0}
              ]
            },
            {
              nombre: 'Diuresis',
              valores: [
                {fecha: '', valor: 0}
              ]
            },
            {
              nombre: 'Frecuencia Cardiaca',
              valores: [
                {fecha: '', valor: 0}
              ]
            },
            {
              nombre: 'Frecuencia Respiratoria',
              valores: [
                {fecha: '', valor: 0}
              ]
            }
          ]
        }

        db.collection('pacientes').add(paciente)
          .then((newDoc) => {
            let nuevoPaciente = {
              'id': newDoc.id,
              'data': {
                'cama': paciente.cama,
                'nombre': paciente.nombre
              }
            }
            commit('setPaciente', nuevoPaciente)
            return resolve()
        })
        .catch(() => {
          return reject()
        })
      })
    },
    getPacientes ({state}) {
      db.collection('pacientes').get().then((pacientes) => {
        pacientes.docs.forEach(paciente => {
          // Se obtienen los que tienen el ESTADO del pase es FALSE, o sea, no se los dieron de baja en la sala
          if (!paciente.data().pase.estado) {
            state.pacientes.push({
              'id': paciente.id,
              'data': paciente.data()})
          }
        })        
      })
    },
    deletePaciente ({commit}, paciente) {
      //Por el omento sera una baja logica
      db.collection('pacientes').doc(paciente.id).update({
        'pase': paciente.data.pase
      })
      .then(() => {
        commit('deletePaciente', paciente)
      })
    }
  }
})
