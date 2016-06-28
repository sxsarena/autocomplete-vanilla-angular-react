# Desafio Meliuz

## Observações

Foi colocado no código a regra de ser necessário mais de 2 caracteres para aparecer a sugestão de artistas.

## Instalação

### Pré-requisitos

- [Node.js](https://nodejs.org/)
- Grunt 

```bash
npm install -g grunt-cli
```

Comando para instalar as dependências:
```bash
npm install
```

## Visualizar

Roda o GruntJS e inicia o servidor local (abre automaticamente o endereço `http://localhost:8000`, no seu navegador):

```bash
npm start
```

## Documentação

`http://localhost:8000/doc/`

## Testes

```bash
npm test
```

## Artistas para a busca

- Pavement
- Radiohead
- Ramones
- Rancid


## Instruções para a execução do teste

- Criar um repositório privado no `https://bitbucket.org/`;

- Compartilhar com permissões de "admin" o projeto conosco (`pdf13`, `carnicelli`) para avaliarmos;

- Baixar os arquivos base do projeto: `https://www.dropbox.com/sh/yoyyps308cphw7d/AACGAW0bVh2p95E2QCqyKs9La?dl=0`

- Reproduzir a interface que está na pasta /design do projeto, de acordo com os fluxos e interações propostos;

- Usar a fonte Source Sans Pro (`https://www.google.com/fonts#UsePlace:use/Collection:Source+Sans+Pro`);

- Usar como fonte de dados para lista de artistas, o JSON que está em: `http://private-047f-meliuztestefrontend.apiary-mock.com/artists`

- Usar como fonte de dados para a lista de álbuns, o JSON que está em: `http://private-047f-meliuztestefrontend.apiary-mock.com/artists/{artist_id}/discography`, alterando {artist_id} pelo ID do artista desejado;

- Faça as páginas terem comportamento responsivo;

- Não é permitido o uso de frameworks CSS, como Bootstrap e Foundation;

- É permitido o uso de jQuery.

O que avaliaremos:

- Qualidade do código gerado (HTML estruturado e semântico);
- Capacidade de criar um código modular, limpo, organizado e de fácil compreensão por outros programadores;
- Desempenho do código criado;
- Capacidade de tomar decisões para os pontos não especificados no fluxo.

Se tiver alguma dúvida, use o bom senso e, se precisar, deixe isso registrado na documentação do projeto.

Esperamos que o tempo gasto com esse projeto seja em torno de 4 horas e que nos mande o resultado em até 2 dias.
