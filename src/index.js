const { response, request } = require('express');
const express = require('express');
const {uuid, isUuid} = require('uuidv4');

const app = express();

app.use(express.json()); //para o expresse começar a aceitar o formato jason

/**
 * get: buscar
 * post: criar
 * put: alterar
 * delete:
 * Navegadores não conseguem testar metodos do tipo put/ post/ delete
 * ou seja, por isso se usa insomnia.
 */

/**
 * tipos de parametros
 * 
 * query params: filtros e paginação - fazer um filtro de busca por exemplo
 *    base_url/projects?title=react&owner=humberto   ---- vai buscar por titulolo react e dono humberto
 * 
 * route params: identificar recursos na hora de atualizar ou deletar;;; no caso é aquele ":id", que eu coloco no js
 * e número no insominia: exemplo no "app.put"
 * 
 * request params: o resto; conteúdo na hora de criar ou editar um recurso
 *    informaçoes vem através de json. 
 */

/**
 * middlware
 * 
 * interceptador de requesição, ou altera ddos da requisição
 */


//primeiro qual indereço observar
//request: (sennha, email, etc) guarda as informaçoes que os usuários estão enviando  
//segundo parametro é uma função que primeiro pede a requisiçao e segundo resposta
const projects = []

function logRequest(request, response, next) { //geralmente se usa quando que disparar um trecho automatico de codigo em uma ou mais rotas
  const { method, url} = request;
  const logLabel = `[${method.toLocaleUpperCase()} ${url}]`;
  console.time(logLabel);

  // return next(); //proximo middlware. 

  console.timeEnd(logLabel);
}

function validateProjecId(request, response, next) { //para validar se o id de put e delite é valido.
  if (!isUuid(id)) { // se chagar nesse return será interrompido mesmo com o next a seguir
    return response.status(400).json({error: 'invalid project id'});
  }
  return next();
}
app.use(logRequest); // nesse caso o middlware interronpeu totalmente a requisição.
app.use('/projects/:id', validateProjecId);

app.get('/projects', logRequest, (request, response) => { //se eu quisesse jogar ele só nessa rota

  const {title} = request.query;

  const results = title
    ? projects.filter(project => project.title.includes(title))
    : projects;

  return response.json(results);
});
/**
  const query = request.query;
  console.log(query);

  const {title, owner} = request.query;
  console.log(title);
  console.log(owner);

  return response.json({
    projeto: 'projeto 1',
    projects1: 'projeto 2'
}); //resposta ao usuário
});
*/

app.post('/projects',(request, response) => {

  const {title, owner} = request.body;

  const project = {id: uuid(), title, owner}; //uuid () serve para criar um id
  
  projects.push(project); //vai jogar o projeto no final do array

  return response.json(project);
});
  /**
  const body = request.body;
  console.log(body);

  return response.json([
    'Projeto 1',
    'projeto 2',
    'projeto 3'
  ]);
});
*/

// https//:localhost:3333/projects/:id (numero no insominia)
app.put('/projects/:id', (request, response) =>{

  const {id} = request.params;
  const {title, owner} = request.body;

  const projectIndex = projects.findIndex(project => project.id == id);

  if(projectIndex < 0) {
    return response.status(400).json({error: 'Project not found'})

  }
  const project = {
    id,
    title,
    owner
  };

  projects[projectIndex] = project

  return response.json(project);
  /**
  const params = request.params;
  console.log(params);

  return response.json([
    'Projeto 4',
    'projeto 2',
    'projeto 3'
  ]);
});
*/
})

app.delete('/projects/:id', validateProjecId, (request, response) =>{

const {id} = request.params;

const projectIndex = projects.findIndex(project => project.id == id);

if (projectIndex < 0) {
  return response.status(400).json({error: deletado})
}
projects.splice(projectIndex, 1); // deletar o conteudo do array

return response.status(204).send(); // retorna em branco
/**  
  return response.json([
    'Projeto 1',
    'projeto 3'
  ]);
});

*/
});

app.listen(3333, () => {
  console.log("started") //para avisar no terminal quando esta "rodando" // segunda função recebeu o console.
});
