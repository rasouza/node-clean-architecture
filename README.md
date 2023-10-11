![Code Coverage](https://img.shields.io/badge/coverage-96%25-green?style=flat-square)

# Node Clean Architecture

![Preview](preview.png)

## Table of Contents
- [Node Clean Architecture](#node-clean-architecture)
  - [Table of Contents](#table-of-contents)
  - [Libs](#libs)
  - [Installation](#installation)
  - [Testing](#testing)
  - [Clean Architecture](#clean-architecture)
    - [Folder structure](#folder-structure)
    - [The Dependency Rule](#the-dependency-rule)
    - [Typical Request](#typical-request)
  - [Troubleshooting](#troubleshooting)
    - [Log `connected to MongoDB database!` doesn't appear](#log-connected-to-mongodb-database-doesnt-appear)
    - [I'm getting `EADDRINUSE` upon application start](#im-getting-eaddrinuse-upon-application-start)


This backend implements a [RESTful](https://restfulapi.net/) CRUD interface for users and complies with Eric Evan's [DDD](https://en.wikipedia.org/wiki/Domain-driven_design) and Uncle Bob's [Clean Architecture](https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html) which is briefly explained here in the document. 

It also exposes a `/docs/` endpoint for further reference and `/coverage/` for test coverage.

## Libs
* [Restify](http://restify.com/)
* [Mongoose](https://mongoosejs.com/)
* [Lodash FP](https://github.com/lodash/lodash/wiki/FP-Guide) Functional Programming version
* [Awilix](https://github.com/jeffijoe/awilix) as Dependency Injection container
* [dotenv](https://www.npmjs.com/package/dotenv)

## Installation

```
docker-compose up -d
cp .env.example .env
npm start
```
You should get
```
restify listening at http://[::]:8080
connected to MongoDB database!
```
Access http://localhost:8080/docs/ and http://localhost:8080/coverage/

## Testing

```
npm test
```
It uses an in-memory DB to run tests so you don't need to have mongodb up and running

## Clean Architecture

![Cleab Architecture](https://blog.cleancoder.com/uncle-bob/images/2012-08-13-the-clean-architecture/CleanArchitecture.jpg)

### Folder structure
```


└ application                   → Application services layer
    └ use_cases                 → Application business rules 
└ domain                        → Enterprise core business layer such as domain model objects (Aggregates, Entities, Value Objects) and repository interfaces
└ infrastructure                → Frameworks, drivers and tools such as Database, the Web Framework, mailing/logging/glue code etc.
    └ config                    → Application configuration files, modules and services
        └ container.js          → Module that manage service implementations by environment
    └ database                  → Database ORMs middleware
        └ schemas               → Mongoose schemas
    └ repositories              → Implementation of domain repository interfaces
    └ webserver                 → Restify Web server configuration (server, routes, plugins, etc.)
        └ server.js             → Restify server definition
└ ports/http                    → Adapters and formatters for use cases and entities to external agency such as Database or the Web
    └ UserController.js         → Restify route handlers
    └ routes.js                 → Restify route definitions
    └ errors.js                 → Standard errors for the whole application
 └ index.js                     → Main application entry point
 ```

 ### The Dependency Rule

>The overriding rule that makes this architecture work is The Dependency Rule. This rule says that source code dependencies can only point inwards. Nothing in an inner circle can know anything at all about something in an outer circle. In particular, the name of something declared in an outer circle must not be mentioned by the code in the an inner circle. That includes, functions, classes. variables, or any other named software entity.

Extracted from https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html#the-dependency-rule

### Typical Request

![Request](architecture.jpg)

## Troubleshooting

### Log `connected to MongoDB database!` doesn't appear
The backend uses its own database (`users`) to run its business logic, so you need to ensure this database is created with proper user credentials. The script `mongo-init.js` is run when `docker-compose up` runs for the first time. 

Check in `docker-compose logs mongo` to see if something unusual is happening

### I'm getting `EADDRINUSE` upon application start
You need port `8080` to be free in order to boot up the application. Check if it's already in use and shut the application down before you `npm start` again

<div align="center">

# Stack Report
![](https://img.stackshare.io/repo.svg "repo") [rasouza/node-clean-architecture](https://github.com/rasouza/node-clean-architecture)![](https://img.stackshare.io/public_badge.svg "public")
<br/><br/>
|28<br/>Tools used|3<br/>Contributors|10/11/23 <br/>Report generated|06/06/22<br/>Last commit date|
|------|------|------|------|
</div>

## <img src='https://img.stackshare.io/languages.svg'/> Languages (2)
<table><tr>
  <td align='center'>
  <img width='36' height='36' src='https://img.stackshare.io/service/1209/javascript.jpeg' alt='JavaScript'>
  <br>
  <sub><a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript">JavaScript</a></sub>
  <br>
  <sub></sub>
</td>

<td align='center'>
  <img width='36' height='36' src='https://img.stackshare.io/service/6727/css.png' alt='CSS 3'>
  <br>
  <sub><a href="https://developer.mozilla.org/en-US/docs/Web/CSS/CSS3">CSS 3</a></sub>
  <br>
  <sub></sub>
</td>

</tr>
</table>

## <img src='https://img.stackshare.io/frameworks.svg'/> Frameworks (1)
<table><tr>
  <td align='center'>
  <img width='36' height='36' src='https://img.stackshare.io/service/7609/24939410.png' alt='Fastify'>
  <br>
  <sub><a href="http://www.fastify.io/">Fastify</a></sub>
  <br>
  <sub>v3.9.2</sub>
</td>

</tr>
</table>

## <img src=''/> Data (1)
<table><tr>
  <td align='center'>
  <img width='36' height='36' src='https://img.stackshare.io/service/1231/0TXzZU7W_400x400.jpg' alt='Mongoose'>
  <br>
  <sub><a href="http://mongoosejs.com/">Mongoose</a></sub>
  <br>
  <sub>v5.10.3</sub>
</td>

</tr>
</table>

## <img src='https://img.stackshare.io/devops.svg'/> DevOps (7)
<table><tr>
  <td align='center'>
  <img width='36' height='36' src='https://img.stackshare.io/service/8067/default_90dcb1286af7685c68df319c764b80704df1155b.png' alt='Dotenv'>
  <br>
  <sub><a href="https://github.com/motdotla/dotenv">Dotenv</a></sub>
  <br>
  <sub></sub>
</td>

<td align='center'>
  <img width='36' height='36' src='https://img.stackshare.io/service/3337/Q4L7Jncy.jpg' alt='ESLint'>
  <br>
  <sub><a href="http://eslint.org/">ESLint</a></sub>
  <br>
  <sub></sub>
</td>

<td align='center'>
  <img width='36' height='36' src='https://img.stackshare.io/service/1046/git.png' alt='Git'>
  <br>
  <sub><a href="http://git-scm.com/">Git</a></sub>
  <br>
  <sub></sub>
</td>

<td align='center'>
  <img width='36' height='36' src='https://img.stackshare.io/service/830/jest.png' alt='Jest'>
  <br>
  <sub><a href="http://facebook.github.io/jest/">Jest</a></sub>
  <br>
  <sub>v28.1.0</sub>
</td>

<td align='center'>
  <img width='36' height='36' src='https://img.stackshare.io/service/5848/44mC-kJ3.jpg' alt='Yarn'>
  <br>
  <sub><a href="https://yarnpkg.com/">Yarn</a></sub>
  <br>
  <sub></sub>
</td>

<td align='center'>
  <img width='36' height='36' src='https://img.stackshare.io/service/5577/preview.png' alt='nodemon'>
  <br>
  <sub><a href="http://nodemon.io/">nodemon</a></sub>
  <br>
  <sub>v2.0.4</sub>
</td>

<td align='center'>
  <img width='36' height='36' src='https://img.stackshare.io/service/1120/lejvzrnlpb308aftn31u.png' alt='npm'>
  <br>
  <sub><a href="https://www.npmjs.com/">npm</a></sub>
  <br>
  <sub></sub>
</td>

</tr>
</table>

## Other (2)
<table><tr>
  <td align='center'>
  <img width='36' height='36' src='https://img.stackshare.io/service/4631/default_c2062d40130562bdc836c13dbca02d318205a962.png' alt='Shell'>
  <br>
  <sub><a href="https://en.wikipedia.org/wiki/Shell_script">Shell</a></sub>
  <br>
  <sub></sub>
</td>

<td align='center'>
  <img width='36' height='36' src='https://img.stackshare.io/service/10156/12867925.png' alt='semantic-release'>
  <br>
  <sub><a href="https://github.com/semantic-release/semantic-release">semantic-release</a></sub>
  <br>
  <sub></sub>
</td>

</tr>
</table>


## <img src='https://img.stackshare.io/group.svg' /> Open source packages (15)</h2>

## <img width='24' height='24' src='https://img.stackshare.io/service/1120/lejvzrnlpb308aftn31u.png'/> npm (15)

|NAME|VERSION|SOURCE FILE|
|------|------|------|
|[@semantic-release/git](https://github.com/semantic-release/git)|v10.0.1|[yarn.lock](https://github.com/rasouza/node-clean-architecture/blob/master/yarn.lock)|
|[@types/jest](http://definitelytyped.org/)|v28.1.1|[yarn.lock](https://github.com/rasouza/node-clean-architecture/blob/master/yarn.lock)|
|[cross-env](https://github.com/kentcdodds/cross-env)|v7.0.3|[yarn.lock](https://github.com/rasouza/node-clean-architecture/blob/master/yarn.lock)|
|[dotenv](https://github.com/motdotla/dotenv)|v8.2.0|[yarn.lock](https://github.com/rasouza/node-clean-architecture/blob/master/yarn.lock)|
|[eslint-config-standard](https://github.com/standard/eslint-config-standard)|v16.0.2|[yarn.lock](https://github.com/rasouza/node-clean-architecture/blob/master/yarn.lock)|
|[eslint-plugin-import](https://github.com/benmosher/eslint-plugin-import)|v2.22.1|[yarn.lock](https://github.com/rasouza/node-clean-architecture/blob/master/yarn.lock)|
|[eslint-plugin-jest](https://github.com/jest-community/eslint-plugin-jest)|v26.5.3|[yarn.lock](https://github.com/rasouza/node-clean-architecture/blob/master/yarn.lock)|
|[eslint-plugin-node](https://github.com/mysticatea/eslint-plugin-node)|v11.1.0|[yarn.lock](https://github.com/rasouza/node-clean-architecture/blob/master/yarn.lock)|
|[eslint-plugin-promise](https://github.com/xjamundx/eslint-plugin-promise)|v4.2.1|[yarn.lock](https://github.com/rasouza/node-clean-architecture/blob/master/yarn.lock)|
|[eslint-plugin-standard](https://github.com/standard/eslint-plugin-standard)|v5.0.0|[yarn.lock](https://github.com/rasouza/node-clean-architecture/blob/master/yarn.lock)|
|[mongoose](https://mongoosejs.com)|v5.10.3|[yarn.lock](https://github.com/rasouza/node-clean-architecture/blob/master/yarn.lock)|
|[nyc](https://github.com/istanbuljs/nyc)|v15.1.0|[yarn.lock](https://github.com/rasouza/node-clean-architecture/blob/master/yarn.lock)|
|[pino](http://getpino.io)|v6.9.0|[yarn.lock](https://github.com/rasouza/node-clean-architecture/blob/master/yarn.lock)|
|[pino-pretty](https://github.com/pinojs/pino-pretty)|v4.3.0|[yarn.lock](https://github.com/rasouza/node-clean-architecture/blob/master/yarn.lock)|
|[semantic-release](https://github.com/semantic-release/semantic-release)|v19.0.2|[yarn.lock](https://github.com/rasouza/node-clean-architecture/blob/master/yarn.lock)|

<br/>
<div align='center'>

Generated via [Stack Reports](https://stackshare.io/stack-report)
