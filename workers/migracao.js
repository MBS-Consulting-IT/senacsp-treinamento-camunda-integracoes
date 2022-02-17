/**
 * @docs Referência - Repositório Oficial
 * https://github.com/camunda/camunda-external-task-client-js
 */

 const { Client, Variables, logger } = require('camunda-external-task-client-js')
 const axios = require('axios')

 const config = {
   baseUrl: 'http://localhost:8080/engine-rest',
   use: logger
 }

 const client = new Client(config)


 client.subscribe('APROVAR_MIGRACAO', async function({ task, taskService }) {
   // Habilita a criação de novas variáveis
   const processVariables = new Variables()

   // Carrega o valor de variáveis existentes
   const nomeProjeto = task.variables.get('nomeProjeto')
   const numeroEpm = task.variables.get('numeroEpm')
   const observacoes = task.variables.get('observacoes')
   const sistemas = task.variables.get('sistemas')

   console.log('Executando worker em APROVAR_MIGRACAO')

   // Define uma nova variável e seu valor
   processVariables.set('envioAprovacao', true)
   processVariables.set('dataEnvioAprovacao', { type: "date", value: (new Date()).toISOString(), valueInfo: {} })

   // Utiliza axios para comunicação via HTTP com sistemas externos
   await axios.post('http://localhost:3000/preproducao', {
     camundaInstanceId: task.processInstanceId,
     nomeProjeto,
     numeroEpm,
     observacoes,
     sistemas,
   })

   // Finaliza a tarefa de serviço
   await taskService.complete(task, processVariables)
 })
