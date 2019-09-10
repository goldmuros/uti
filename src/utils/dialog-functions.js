const dialog_component = (dialog) => {
  let component

  switch (dialog) {
    case 0: // Nuevo Tratamitneo
      component = 'dialog_nuevo_tratamiento'
      break
    case 1: // Error Nuevo Tratamiento
      component = 'dialog_error_nuevo_tratamiento'
      break
    case 2: // Error Firebase
      component = 'dialog_error_operacion'
      break
    case 3: // Calendario
      component = 'dialog_calendario'
      break
    case 4: // Repetir Tratamiento
      component = 'dialog_repetir_tratamientos'
      break
    case 5: // Nuevos Parametros
      component = 'dialog_nuevos_parametros'
      break
    case 6: // Detalle Parametros
      component = 'dialog_detalle_parametro'
      break
    case 7: // Operacion correcta
      component = 'dialog_operacion_correcta'
      break
    case 8: // Nuevo usuario
      component = 'dialog_nuevo_usuario'
      break
    case 9: // Update usuario
      component = 'dialog_update_usuario'
      break
    case 10: // Delete confirmacion
      component = 'dialog_delete_confirmacion'
      break
    case 11: // Formulario Tratamiento Frecuente
      component = 'dialog_form_tratamiento_frecuente'
      break
    case 12: // Lista Tratamientos Frecuentea
      component = 'dialog_list_tratamientos_frecuentes'
      break
  }

  return component
}

const closeDialog = (dialog) => {
  return dialog_component(dialog)
}

const openDialog = (dialog) => {
  return dialog_component(dialog)
}

export {
  closeDialog,
  openDialog
}