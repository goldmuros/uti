import Vue from 'vue'
import Vuex from 'vuex'
import { db } from './config/config-firebase.js'

const clearData = (state) => {
  state.userLogin = {}
  state.pacientes = []
  state.pacienteSeleccionado = {
    id: '',
    show: false,
    data: {}
  }
  state.users = []
  state.userSelected = {
    id: '',
    data: {}
  }
  state.userLogin = {}
  state.mediaQuery = ''
  state.fechaSeleccionada = ''
  state.diasTratamiento = []
  state.tratamientosFrecuentes = []
}

let fechaActual = () => {
  let date = new Date(),
    mes = '' + (date.getMonth() + 1),
    dia = '' + date.getDate(),
    ano = date.getFullYear(),
    horas = '' + date.getHours(),
    minutos = '' + date.getMinutes()

  if (mes.length < 2) mes = '0' + mes
  if (dia.length < 2) dia = '0' + dia
  if (horas.length < 2) horas = '0' + horas
  if (minutos.length < 2) minutos = '0' + minutos

  return {
    'fecha': [ano, mes, dia].join('-'),
    'hora': [horas, minutos].join(':')
  }
}

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    pacientes: [],
    pacienteSeleccionado: {
      id: '',
      show: false,
      data: {}
    },
    users: [],
    userSelected: {
      id: '',
      data: {}
    },
    userLogin: {},
    activePage: '',
    mediaQuery: '',
    fechaSeleccionada: '',
    diasTratamiento: [],
    tratamientosFrecuentes: []
  },
  getters: {
    getValidarUsuario: (state) => (payload) => {
      let user = state.users.find((usuario) => {
        if (usuario.name === payload.name && usuario.password === payload.password) {
          state.userLogin = usuario

          return true
        }

        return false
      })

      return user
    },
    getActivePage: state => {
      return state.activePage
    },
    getPacientes: state => {
      return state.pacientes
    },
    getShowPacienteSeleccionado: state => {
      return state.pacienteSeleccionado.show
    },
    getIdPacienteSeleccionado: state => {
      return state.pacienteSeleccionado.id
    },
    getDataPacienteSeleccionado: state => {
      return state.pacienteSeleccionado.data
    },
    getPacienteSeleccionado: state => {
      return state.pacienteSeleccionado
    },
    getFechaSeleccionada: state => {
      if (state.fechaSeleccionada === '')
        state.fechaSeleccionada = fechaActual().fecha

      return state.fechaSeleccionada
    },
    getTratamientos: (state) => (dia) => {
      let tratamientos = []

      if (state.pacienteSeleccionado.data.tratamientos.length > 0) {
        state.pacienteSeleccionado.data.tratamientos.filter((tratamiento) => {
          if(tratamiento.dia.fecha === dia)
            tratamientos.push(tratamiento)
        })
      }

      return tratamientos
    },
    getDiasTratamientos: (state) => {
      let tratamientos = state.pacienteSeleccionado.data.tratamientos

      if (tratamientos != undefined && tratamientos.length > 0) {
        tratamientos.forEach((tratamiento) => {
          if (state.diasTratamiento.includes(tratamiento.dia) === false)
            state.diasTratamiento.push(tratamiento.dia.fecha)
        })
      }

      return state.diasTratamiento
    },
    existeTratamiento: (state) => (nombre) => {
      let tratamientos = state.pacienteSeleccionado.data.tratamientos

      return tratamientos.find((tratamiento) => {
        if (tratamiento.nombre === nombre && tratamiento.dia.fecha === fechaActual().fecha)
          return true
        
        return false
      })
    },
    existeTratamientoFrecuente: (state) => (nombre) => {
      return state.tratamientosFrecuentes.find((tratamientoFrecuente) => {
        if (tratamientoFrecuente.data.nombre === nombre)
          return true
        
        return false
      })
    },
    getUltimoParametro: (state) => {
      let parametros = []

      if (state.pacienteSeleccionado.show) {

        state.pacienteSeleccionado.data.parametros.forEach((parametro) => {
          let ultimoParametro = parametro.valores[parametro.valores.length - 1]
  
          let param = {
            nombre: parametro.nombre,
            valor: ultimoParametro.valor,
            fecha: ultimoParametro.fecha,
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
      }

      return parametros
    },
    getUser: state => {
      return state.userLogin
    },
    getUserRole: state => {
      return state.userLogin.role
    },
    getIdUserSeleccionado: state => {
      return state.userSelected.id
    },
    getDataUserSeleccionado: state => {
      return state.userSelected.data
    },
    getUsers: state => {
      return state.users
    },
    getTratamientosFrecuentes: state => {
      return state.tratamientosFrecuentes
    },
    getMediaQuery: state => {
      return state.mediaQuery
    }
  },
  mutations: {
    logout (state) {
      clearData(state)
    },
    setPacienteSeleccionado (state, payload) {
      if (state.pacienteSeleccionado.id != payload.id) {
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
    },
    setParametros (state, payload) {
      state.pacienteSeleccionado.data.parametros = payload
    },
    setUsuarioSeleccionado (state, payload) {
      if (state.userSelected.id !== payload.id) {
        state.userSelected.data = payload.data
        state.userSelected.id = payload.id
      }
    },
    setUserActive (state, payload) {
      state.userLogin = payload
    },
    setUser (state, payload) {
      state.users.push(payload)
    },
    setUpdateUserSeleccionado (state, payload) {
      if (state.userSelected.id === payload.id)
        state.userSelected.data = payload.data
    },
    setDeleteUser (state, userId) {
      state.users.find((user, index) => {
        if (user.id === userId) {
          state.users.splice(index, 1)
        }
      })
    },
    setTratamientoFrecuente (state, tratamientoFrecuente) {
      state.tratamientosFrecuentes.push(tratamientoFrecuente)
    },
    updateTratamientoFrecuente (state, updatedTratamientoFrecuente) {
      state.tratamientosFrecuentes.find((tratamiento, index) => {
        if (tratamiento.id === updatedTratamientoFrecuente.id)
          state.tratamientosFrecuentes[index] = updatedTratamientoFrecuente // pisamos el tratamiento con el nuevo tratamiento
      })
    },
    deleteTratamientoFrecuente (state, idTratamientoFrecuente) {
      state.tratamientosFrecuentes.find((tratamiento, index) => {
        if (tratamiento.id === idTratamientoFrecuente) {
          state.tratamientosFrecuentes.splice(index, 1)
          return true
        }
      })
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
        let user = getters.getUser

        let tratamiento = {
          nombre: payload.nombre,
          dosis: payload.dosis,
          frecuencia: payload.frecuencia,
          dia: fechaActual(),
          estado: 'A',
          profesional: user.id
        }

        let paciente = getters.getPacienteSeleccionado

        paciente.data.tratamientos.push(tratamiento)
        paciente.data.dias.push(fechaActual().fecha)

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
                {fecha: '', hora: '', valor: { tam: 0, ps: 0, pd: 0 }}
              ]
            },
            {
              nombre: 'Temperatura',
              valores: [
                {fecha: '', hora: '', valor: 0}
              ]
            },
            {
              nombre: 'Diuresis',
              valores: [
                {fecha: '', hora: '', valor: 0}
              ]
            },
            {
              nombre: 'Frecuencia Cardiaca',
              valores: [
                {fecha: '', hora: '', valor: 0}
              ]
            },
            {
              nombre: 'Frecuencia Respiratoria',
              valores: [
                {fecha: '', hora: '', valor: 0}
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
    getPacientes ({commit}) {
      db.collection('pacientes').get().then((pacientes) => {
        pacientes.docs.forEach(paciente => {
          // Se obtienen los que tienen el ESTADO del pase es FALSE, o sea, no se los dieron de baja en la sala
          if (!paciente.data().pase.estado) {
            let nuevoPaciente = {
              'id': paciente.id,
              'data': paciente.data()
            }

            commit('setPaciente', nuevoPaciente)
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
        commit('setPacienteSeleccionado', paciente)
      })
    },
    addParametros ({commit, getters}, payload) {
      return new Promise((resolve, reject) => {
        let parametros = payload.parametros

        let user = getters.getUser

        parametros.forEach(parametro => {
          if (parametro.valores[0].fecha == '' &&
              parametro.valores[0].hora == '')
            parametro.valores.shift() // se elimina el primer valor si esta vacio

          let valor = {// un valor para el tratamiento
            fecha: fechaActual().fecha,
            hora: fechaActual().hora,
            valor: {},
            profesional: user.id
          }

          switch (parametro.nombre) {
            case 'Presión Arterial': {
              let presionMedia = payload.presionDiastolica + (payload.presionSistolica - payload.presionDiastolica) / 3
              valor.valor = {
                tam: presionMedia,
                ps: payload.presionSistolica,
                pd: payload.presionDiastolica
              }
              break
            }
            case 'Temperatura': {
              valor.valor = payload.temperatura
              break
            }
            case 'Diuresis': {
              valor.valor = payload.diuresis
              break
            }
            case 'Frecuencia Cardiaca': {
              valor.valor = payload.frecuenciaCardiaca
              break
            }
            case 'Frecuencia Respiratoria': {
              valor.valor = payload.frecuenciaRespiratoria
              break
            }
          }
          
          parametro.valores.push(valor)
        })

        let pacienteId = getters.getIdPacienteSeleccionado

        // Se busca el paciente
        db.collection('pacientes').doc(pacienteId).update({
          'parametros': parametros
        })
        .then(() => {
          commit('setParametros', parametros)
          return resolve()
        })
        .catch(() => {
          return reject()
        })
      })
    },
    getUser ({commit}, payload) {
      return new Promise((resolve, reject) => {
        db.collection('usuarios').where('name', '==', payload.name)
        .where('password', '==', payload.password)
        .get().then((user) => {
          let userActive = {
            'id': user.docs[0].id,
            'name': user.docs[0].data().name,
            'role': user.docs[0].data().role
          }

          commit('setUserActive', userActive)
          return resolve()
        })
        .catch(() => {
          return reject()
        })
      })
    },
    getUsers ({commit}) {
      db.collection('usuarios').get().then((users) => {
        users.docs.forEach(user => {
          let newUser = {
            'id': user.id,
            'data': user.data()
          }

          commit('setUser', newUser)
        })        
      })
    },
    addUsuario ({commit}, payload) {
      return new Promise((resolve, reject) => {
        db.collection('usuarios').add(payload)
        .then((newDoc) => {
          let usuario = {
            'id': newDoc.id,
            'data': payload
          }
          commit('setUser', usuario)
          return resolve()
        })
        .catch(() => {
          return reject()
        })
      })
    },
    updateUsuario ({commit, getters}, payload) {
      return new Promise((resolve, reject) => {
        let userId = getters.getIdUserSeleccionado

        // Update del Usuario
        db.collection('usuarios').doc(userId).update(
          payload
        )
        .then(() => {
          let user = {
            id: userId,
            data: payload
          }

          commit('setUpdateUserSeleccionado', user)
          return resolve()
        })
        .catch(() => {
          return reject()
        })
      })
    },
    deleteUsuario ({commit, getters}) {
      return new Promise((resolve, reject) => {
        let userId = getters.getIdUserSeleccionado

        // Update del Usuario
        db.collection('usuarios').doc(userId).delete()
        .then(() => {
          commit('setDeleteUser', userId)
          return resolve()
        })
        .catch(() => {
          return reject()
        })
      })
    },
    getTratamientosFrecuentes ({commit}) {
      return new Promise((resolve, reject) => {
        db.collection('tratamientos-frecuentes').get()
        .then((tratamientosFrecuentes) => {
          tratamientosFrecuentes.docs.forEach(tratamientoFrecuente => {
            let tratamiento = {
              'id': tratamientoFrecuente.id,
              'data': tratamientoFrecuente.data()
            }
  
            commit('setTratamientoFrecuente', tratamiento)
          })
          
          return resolve()
        })
        .catch(() => {
          return reject()
        })
      })
    },
    addTratamientoFrecuente: ({commit}, payload) => {
      return new Promise((resolve, reject) => {
        let tratamientoFrecuente = {
          nombre: payload.nombre,
          tratamientos: payload.tratamientos
        }

        // Se busca el paciente
        db.collection('tratamientos-frecuentes').add(tratamientoFrecuente)
        .then((nuevoTratamiento) => {
          let tratamiento = {
            'id': nuevoTratamiento.id,
            'data': tratamientoFrecuente
          }

          commit('setTratamientoFrecuente', tratamiento)
          return resolve()
        })
        .catch(() => {
          return reject()
        })
      })
    },
    updateTratamientoFrecuente: ({commit}, payload) => {
      return new Promise((resolve, reject) => {
        let tratamientoFrecuente = {
          nombre: payload.nombre,
          tratamientos: payload.tratamientos
        }

        // Se busca el paciente
        db.collection('tratamientos-frecuentes').doc(payload.id).update(
          tratamientoFrecuente
        )
        .then(() => {
          commit('updateTratamientoFrecuente', payload)
          return resolve()
        })
        .catch(() => {
          return reject()
        })
      })
    },
    deleteTratamientoFrecuente ({commit}, idTratamiento) {
      return new Promise((resolve, reject) => {
        // Eliminacion del Tratamiento Frecuente
        db.collection('tratamientos-frecuentes').doc(idTratamiento).delete()
        .then(() => {
          commit('deleteTratamientoFrecuente', idTratamiento)
          return resolve()
        })
        .catch(() => {
          return reject()
        })
      })
    }
  }
})
