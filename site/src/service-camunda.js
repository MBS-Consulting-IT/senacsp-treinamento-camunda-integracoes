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
      }
      // documentoHistorias: {
      //   type: 'string',
      //   value: data.documentoHistorias
      // },
      // sistemas: {
      //   type: 'object',
      //   value: data.sistemas,
      //   valueInfo: {
      //     serializationDataFormat: 'application/json',
      //     objectTypeName: 'java.util.ArrayList'
      //   }
      // }
    }
  })
}
