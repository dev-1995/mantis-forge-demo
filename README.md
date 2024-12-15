# TypeScript Node.js Framework

This is a Node.js framework built with TypeScript that supports custom plugin registration and is easy to set up. It includes features such as routing, database management, authentication, logging, and error handling.

## Features

- Custom plugin registration
- Router for each plugin
- Built-in database management with PostgreSQL
- Basic JWT-based authentication
- Logging system using Winston
- Error handling system
- Configuration and environment instance management

## Getting Started

1. Install dependencies:

```bash
npm install
```

2. Set up your environment variables in a `.env` file:

```
PORT=3000
JWT_SECRET=your-secret-key
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=password
DB_NAME=myapp
```

3. Run the development server:

```bash
npm run dev
```

4. Build the project:

```bash
npm run build
```

5. Run tests:

```bash
npm test
```

## Usage

To use this framework in your project, create a new instance of the `App` class and register your plugins:

```typescript
import App from 'ts-node-framework';
import examplePlugin from './plugins/examplePlugin';

const app = new App({
  config: {
    // Your custom configuration
  },
});

app.registerPlugin(examplePlugin);

app.start();
```

## Creating Plugins

To create a new plugin, follow the structure in the `plugins/examplePlugin` directory. Your plugin should export an object that conforms to the `Plugin` interface:

```typescript
import { Plugin } from 'ts-node-framework';

const myPlugin: Plugin = {
  name: 'myPlugin',
  prefix: '/my-plugin',
  register: (app, config, env) => {
    // Plugin implementation
  },
};

export default myPlugin;
```

## License

This project is licensed under the MIT License.
