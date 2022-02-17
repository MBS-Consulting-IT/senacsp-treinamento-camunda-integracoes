const CAMUNDA_API_URL = 'http://localhost:8080/engine-rest'
const CAMUNDA_FLOW_KEY = 'desenvolvimentoRpa'
const CAMUNDA_API_START_INSTANCE = `${CAMUNDA_API_URL}/process-definition/key/${CAMUNDA_FLOW_KEY}/start`

export async function CamundaApiStartProject (data) {
  return fetch(CAMUNDA_API_START_INSTANCE, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: await dataToVariables(data)
  })
    .then(response => response.json())
}

async function dataToVariables (data) {
  return JSON.stringify({
    variables: {
      nomeProjeto: {
        type: 'string',
        value: data.nomeProjeto
      },
      numeroEpm: {
        type: 'string',
        value: data.numeroEpm
      },
      observacoes: {
        type: 'string',
        value: data.observacoes
      },
      documentoHistorias: {
        type: 'file',
        value: await encodeBase64(data.documentoHistorias),
        valueInfo: {
          filename: data.documentoHistorias.name,
          mimetype: data.documentoHistorias.type || 'application/octet-stream',
          encoding: 'utf-8'
        }
      },
      sistemas: {
        type: 'object',
        value: JSON.stringify(data.sistemas),
        valueInfo: {
          serializationDataFormat: 'application/json',
          objectTypeName: 'java.util.ArrayList'
        }
      }
    }
  })
}

function encodeBase64 (file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()

    reader.readAsDataURL(file)
    reader.onload = () => resolve(
      reader.result
        .toString()
        .replace(/^data:(.*,)?/, '')
    )
    reader.onerror = error => reject(error)
  })
}
