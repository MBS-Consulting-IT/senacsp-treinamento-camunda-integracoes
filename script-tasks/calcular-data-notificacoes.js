const REMOCAO_DIAS = 5
let notificaoPassagem = new Date(dataPassagemConhecimento)
let notificaoAlinhamento = new Date(dataAlinhamento)

notificaoPassagem.setDate(notificaoPassagem.getDate() - REMOCAO_DIAS)
notificaoAlinhamento.setDate(notificaoAlinhamento.getDate() - REMOCAO_DIAS)

execution.setVariable('notificacaoPassagemConhecimento', notificaoPassagem.toISOString())
execution.setVariable('notificacaoAlinhamento', notificaoAlinhamento.toISOString())
