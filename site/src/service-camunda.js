const CAMUNDA_API_URL = 'http://localhost:8080/engine-rest'
const CAMUNDA_FLOW_KEY = '{key}'
const CAMUNDA_API_START_INSTANCE = `${CAMUNDA_API_URL}/process-definition/key/${CAMUNDA_FLOW_KEY}/start`

export async function CamundaApiStartProject (data) {
  return fakeFeatch(CAMUNDA_API_START_INSTANCE, data)
}

function fakeFeatch(url, data) {
  return new Promise((resolve) => {
    setTimeout(() => resolve(data), 500)
  })
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
