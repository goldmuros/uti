import Vue from 'vue'
import Vuex from 'vuex'
import { db } from './config/config-firebase.js'

let fechaActual = () => {
  let date = new Date(),
    month = '' + (date.getMonth() + 1),
    day = '' + date.getDate(),
    year = date.getFullYear();

  if (month.length < 2) month = '0' + month;
  if (day.length < 2) day = '0' + day;

  return [year, month, day].join('-');
}

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    pacientes: [],
    pacienteSeleccionado: {
      show: false,
      data: {}
    },
    user: {
      role: 'doctor',
      name: 'Bel'
    },
    activePage: '',
    mediaQuery: '',
    fechaSeleccionada: '',
    diasTratamiento: []
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
    },
    getShowPacienteSeleccionado: state => {
      return state.pacienteSeleccionado.show
    },
    getDataPacienteSeleccionado: state => {
      return state.pacienteSeleccionado.data
    },
    getPacienteSeleccionado: state => {
      return state.pacienteSeleccionado
    },
    getFechaSeleccionada: state => {
      if (state.fechaSeleccionada === '')
        state.fechaSeleccionada = fechaActual()

      return state.fechaSeleccionada
    },
    getTratamientos: (state) => (dia) => {
      let tratamientos = []

      if (state.pacienteSeleccionado.data.tratamientos.length > 0) {
        state.pacienteSeleccionado.data.tratamientos.filter((tratamiento) => {
          if(tratamiento.dia === dia)
            tratamientos.push(tratamiento)
        })
      }

      return tratamientos
    },
    getDiasTratamientos: (state) => {
      let tratamientos = state.pacienteSeleccionado.data.tratamientos

      if (tratamientos.length > 0) {
        tratamientos.forEach((tratamiento) => {
          if (state.diasTratamiento.includes(tratamiento.dia) === false)
            state.diasTratamiento.push(tratamiento.dia)
        })
      }

      return state.diasTratamiento
    },
    existeTratamiento: (state) => (nombre) => {
      let tratamientos = state.pacienteSeleccionado.data.tratamientos

      return tratamientos.find((tratamiento) => {
        if (tratamiento.nombre === nombre && tratamiento.dia === fechaActual())
          return true
        
        return false
      })
    },
    getUltimoParametro: (state) => {
      let parametros = []

      state.pacienteSeleccionado.data.parametros.forEach((parametro) => {
        let ultimoParametro = parametro.valores[parametro.valores.length - 1]

        let param = {
          nombre: parametro.nombre,
          valor: ultimoParametro.valor,
          fecha: ultimoParametro.dia,
          hora: ultimoParametro.hora,
          clase: '',
          valores: parametro.valores
        }

        // Se asigna un color dependiendo el parámetro
        switch (parametro.nombre) {
          case 'Presión Arterial':
            param.clase = 'presionArterial'
            break
          case 'Temperatura':
            param.clase = 'temperatura'
            break
          case 'Diuresis':
            param.clase = 'diuresis'
            break
          case 'Frecuencia Cardiaca':
            param.clase = 'frecuenciaCardiaca'
            break
          case 'Frecuencia Respiratoria':
            param.clase = 'frecuenciaRespiratoria'
            break
        }

        parametros.push(param)
      })

      return parametros
    }
  },
  mutations: {
    setPacienteSeleccionado (state, payload) {
      if (state.pacienteSeleccionado.data.id != payload.id) {
        state.pacienteSeleccionado.show = true
        state.pacienteSeleccionado.data = payload.data
        state.pacienteSeleccionado.id = payload.id
      } else {
        state.pacienteSeleccionado.show = false
        state.pacienteSeleccionado.data = {}
        state.pacienteSeleccionado.id = ''
      }
    },
    setMediaQuery (state, mediaQuery) {
      state.mediaQuery = mediaQuery
    },
    setPaciente (state, payload) {
      state.pacientes.push(payload)
    },
    deletePaciente (state, payload) {
      state.pacientes.find((paciente, index) => {
        if (paciente.id === payload.id) {
          state.pacientes.splice(index, 1)
        }
      })
    },
    setTratamiento (state, payload) {
      state.pacienteSeleccionado.data.tratamientos = payload.data.tratamientos
      state.pacienteSeleccionado.data.dias = payload.data.dias
    },
    updateTratamientos (state, payload) {
      state.pacienteSeleccionado.data.tratamientos = payload
    },
    setFechaSeleccionada (state, fecha) {
      state.fechaSeleccionada = fecha
    }
  },
  actions: {
    updateEstado ({commit, getters}, payload) {
      return new Promise((resolve, reject) => {
        let tratamiento = payload.tratamiento

        let paciente = getters.getPacienteSeleccionado

        paciente.data.tratamientos.find((elemento) => {
          if (elemento.nombre === tratamiento.nombre)
            elemento.estado = tratamiento.estado
        })

        // Se busca el paciente
        db.collection('pacientes').doc(paciente.id).update(
          paciente.data
        )
        .then(() => {
          commit('setTratamiento', paciente.data.tratamientos)
          return resolve()
        })
        .catch(() => {
          return reject()
        })
      })
    },
    addManyTratamientos ({dispatch}, tratamientos) {
      // Se agregan varios tratamientos, llama individualmente a addTratamiento
      return new Promise((resolve, reject) => {
        tratamientos.forEach(tratamiento => {
          dispatch('addTratamiento', tratamiento)
          .catch(() => {
            return reject()
          })
        })

        return resolve()
      })
    },
    addTratamiento ({commit, getters}, payload) {
      return new Promise((resolve, reject) => {
        let tratamiento = {
          nombre: payload.nombre,
          dosis: payload.dosis,
          frecuencia: payload.frecuencia,
          dia: fechaActual(),
          estado: 'A'
        }

        let paciente = getters.getPacienteSeleccionado

        paciente.data.tratamientos.push(tratamiento)
        paciente.data.dias.push(fechaActual())

        // Se busca el paciente
        db.collection('pacientes').doc(paciente.id).update(
          paciente.data
        )
        .then(() => {
          commit('setTratamiento', paciente)
          return resolve()
        })
        .catch(() => {
          return reject()
        })
      })
    },
    addPaciente ({commit}, payload) {
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
              'data': paciente
            }
            commit('setPaciente', nuevoPaciente)
            commit('setPacienteSeleccionado', nuevoPaciente)
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
      //Por el momento sera una baja logica
      db.collection('pacientes').doc(paciente.id).update({
        'pase': paciente.data.pase
      })
      .then(() => {
        commit('deletePaciente', paciente)
      })
    }
  }
})
