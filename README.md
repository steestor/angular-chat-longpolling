# Angular Chat con Long Polling

Este proyecto implementa un chat en tiempo real utilizando Angular y la técnica de Long Polling para la comunicación entre el cliente y el servidor.

## Demo en vivo

Puedes ver la aplicación funcionando en [GitHub Pages](https://steestor.github.io/angular-chat-long-polling/).

## Características

- Chat en tiempo real utilizando Long Polling
- Interfaz de usuario con Angular 17
- Diseño responsivo con Bootstrap
- Componentes de DevExtreme

## Requisitos previos

- Node.js (versión 18 o superior)
- Angular CLI

## Instalación

1. Clona este repositorio
   ```bash
   git clone https://github.com/steestor/angular-chat-long-polling.git
   cd angular-chat-long-polling
   ```

2. Instala las dependencias
   ```bash
   npm install
   ```

3. Inicia el servidor
   ```bash
   cd server
   node server.js   # O nodemon server.js si tienes nodemon instalado
   ```

4. En otra terminal, inicia la aplicación Angular
   ```bash
   npm start
   ```

5. Abre tu navegador en http://127.0.0.1:4200

## Cómo funciona el Long Polling

1. El cliente hace una solicitud al servidor y mantiene la conexión abierta
2. El servidor espera hasta que haya un nuevo mensaje disponible
3. Cuando hay un mensaje, el servidor responde y la conexión se cierra
4. El cliente inmediatamente abre una nueva conexión
5. Este ciclo proporciona una experiencia en "tiempo real" sin usar WebSockets

## Despliegue

Para desplegar en GitHub Pages:

```bash
npm run deploy
```

## Estructura del proyecto

- `/src`: Código fuente de la aplicación Angular
- `/server`: Servidor Node.js para la comunicación Long Polling
- `/.github/workflows`: Configuración para despliegue automático en GitHub Pages

## Desarrollo

```bash
# Generar un nuevo componente
ng generate component nombre-componente

# Ejecutar pruebas unitarias
ng test

# Construir el proyecto para producción
ng build
```

## Tecnologías utilizadas

- [Angular](https://angular.io/) - Framework frontend
- [Express](https://expressjs.com/) - Framework Node.js para el servidor
- [Bootstrap](https://getbootstrap.com/) - Framework CSS
- [DevExtreme](https://js.devexpress.com/) - Componentes UI

## Licencia

Este proyecto está bajo la Licencia ISC.
