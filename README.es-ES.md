

<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo_text.svg" width="320" alt="Logotipo de Nest" /></a>
</p>

[travis-image]: https://api.travis-ci.org/nestjs/nest.svg?branch=master
[travis-url]: https://travis-ci.org/nestjs/nest
[linux-image]: https://img.shields.io/travis/nestjs/nest/master.svg?label=linux
[linux-url]: https://travis-ci.org/nestjs/nest
  
  <p align="center">Un framework progresivo para <a href="http://nodejs.org" target="blank">Node.js</a> para construir aplicaciones del lado del servidor eficientes y escalables, fuertemente inspirado en <a href="https://angular.io" target="blank">Angular</a>.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="Versión de NPM" /></a>
<a href="https://www.npmjs.com/~nestjscore"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Licencia del Paquete" /></a>
<a href="https://www.npmjs.com/~nestjscore"><img src="https://img.shields.io/npm/dm/@nestjs/core.svg" alt="Descargas de NPM" /></a>
<a href="https://travis-ci.org/nestjs/nest"><img src="https://api.travis-ci.org/nestjs/nest.svg?branch=master" alt="Travis" /></a>
<a href="https://travis-ci.org/nestjs/nest"><img src="https://img.shields.io/travis/nestjs/nest/master.svg?label=linux" alt="Linux" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#5" alt="Cobertura" /></a>
<a href="https://gitter.im/nestjs/nestjs?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=body_badge"><img src="https://badges.gitter.im/nestjs/nestjs.svg" alt="Gitter" /></a>
<a href="https://opencollective.com/nest#backer"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers en Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Patrocinadores en Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec"><img src="https://img.shields.io/badge/Donate-PayPal-dc3d53.svg"/></a>
  <a href="https://twitter.com/nestframework"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Descripción

Repositorio inicial del framework [Nest](https://github.com/nestjs/nest) en TypeScript.

## Instalación

```bash
$ npm install
```

## Ejecutar la aplicación

```bash
# desarrollo
$ npm run start

# modo de observación
$ npm run start:dev

# modo de producción
$ npm run start:prod
```

## Pruebas

```bash
# pruebas unitarias
$ npm run test

# pruebas e2e
$ npm run test:e2e

# cobertura de pruebas
$ npm run test:cov
```

## Soporte

Nest es un proyecto de código abierto con licencia MIT. Puede crecer gracias a los patrocinadores y al apoyo de los increíbles partidarios. Si te gustaría unirte a ellos, por favor [leer más aquí](https://docs.nestjs.com/support).

## Mantente en contacto

- Autor - [Kamil Myśliwiec](https://kamilmysliwiec.com)
- Sitio web - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## Licencia

  Nest tiene [licencia MIT](LICENSE).

## Instrucciones

- Coloca el archivo .dev.env en la carpeta raíz del proyecto.
- Rellénalo con tus propias variables.
- Crea la base de datos que utilizarás.


## Rutas

- Crear proyecto - /projects (solicitud POST)
    - Recibe los campos de datos del formulario status, title, details, deadline y file

- Todos los proyectos (incluidas las capacidades de filtrado utilizando parámetro de consulta) - /projects?search=topic (solicitud GET)

- Actualizar proyecto - /projects/:id (solicitud PATCH)
    - Recibe los campos de datos del formulario status, title, price, details, deadline, assigneeId y file

- Eliminar proyecto - /projects/:id (solicitud DELETE)

- Obtener archivo del proyecto - /projects/project-files/:file-name (solicitud GET)

- Envío de proyecto - /projects/:id/submit (solicitud PATCH)
    - Recibe los campos de datos del formulario submitText y file

- Registro - /auth/sign-up (solicitud POST)
    - Recibe los campos de datos del formulario username y password
    - username debe tener más de 4 letras
    - password debe tener más de 8 caracteres, debe tener al menos una letra mayúscula, un número y un carácter especial.
    - el nuevo usuario debe confirmarse antes de permitir el acceso al sistema

- Inicio de sesión - /auth/sign-in (solicitud POST)
    - Recibe los campos de datos del formulario username y password
    - username debe tener más de 4 letras
    - password debe tener más de 8 caracteres, debe tener al menos una letra mayúscula, un número y un carácter especial.
    - devuelve la cadena accessToken
    
- Obtener todos los usuarios (incluidas las capacidades de filtrado utilizando parámetro de consulta) - /users?search=kofi (solicitud GET)
    
NOTA: Las rutas Crear proyecto, Actualizar proyecto y Envío de proyecto pueden recibir un archivo llamado file.
