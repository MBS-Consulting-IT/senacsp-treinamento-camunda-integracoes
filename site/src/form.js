import { CamundaApiStartProject } from './service-camunda.js'

const form = document.getElementById('rpa-form')
const btnSend = document.getElementById('rpa-send')

export function Form () {
  form.addEventListener('submit', onSumbit)
}

function onSumbit (event) {
  event.preventDefault()

  form.classList.add('was-validated')

  if (form.checkValidity()) {
    sendProject()
  }
}

function sendProject () {
  const data = getFormData()

  addLoading()

  CamundaApiStartProject(data)
    .then(console.log)
    .catch(console.error)
    .finally(removeLoading)
}

function getFormData () {
  return [...form.querySelectorAll('.form-control, .form-check-input')]
  .reduce((fields, field) => {
    const { id, value } = getFieldData(field)

    if (!value) return fields

    if (fields[id] && value) {
      fields[id] = [...fields[id], ...value]
      return fields
    }

    return {
      ...fields,
      [id]: value
    }
  }, {})
}

function getFieldData (field) {
  if (field.type === 'file') {
    return {
      id: field.id,
      value: field.files[0]
    }
  }

  if (field.type === 'checkbox') {
    return {
      id: field.name,
      value: field.checked ? [field.value] : null
    }
  }

  return {
    id: field.id,
    value: field.value
  }
}

function addLoading () {
  btnSend.innerHTML = `
    <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
    <span class="sr-only">Enviando...</span>
  `
  btnSend.disabled = true
}

function removeLoading () {
  btnSend.innerHTML = `
    <span>Enviar Solicitação</span>
  `
  btnSend.disabled = false
}
