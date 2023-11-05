# ExpressJS API server boilerplate

- TypeScript
- Logger
- JWT & Auth
- DTO validation
- Static file server
- Environment & configuration
- Graceful process shutdown

## Install/Build

### Install dependencies
Production: `npm i --omit=dev`  
Development: `npm i`

### Scripts
🛠 Build: `npm run build`  
🌐 Start server: `npm run start` or `npm start`

## Structure

```
.
├── dist/ (auto generated, javascript/transpiled code)
│
├── logs/ (auto generated, log files)
│
├── public/ (shared via API server with path '/static')
│
└── src/ (source code - converts to dist/)
```

## Architecture

Application starts at `./src/server.ts`  
`server.ts` creates and starts API server (express application) & initializes process exit helper (used for graceful shutdown).  
`ExpressApplication.ts` configures, creates & closes the http server & sets API routers.  

A **Router** (similar to controller) routes the incoming request to desired handler (similar to method) or other routers.  
`setRouters.ts` handles cookie parsing and authentication, routing request to other routers or directly to handlers.  


Middlewares:
1. `logger.ts` binds a callback on response finish event and writes/logs request information.
2. `jwtResolve.ts` reads token from _cookie_ and attaches the payload into `res.locals.user`; This middleware must be called after cookie parser.
3. `authGuard.ts` checks if `res.locals.user` object is defined or not; Responses _401_ (unauthorized) if user payload is not defined, passes the request to next middleware/handler if user payload is defined. Must be called after `jwtResolve.ts`.
4. `dtoValidator.ts` validates user inputs. Requires a DTO constructor, calls express `json()` middleware, validates query parameters on _GET_ method and request body on _POST_ method (as JSON); Responses _400_ (bad request) if DTO validation fails, attaches the DTO into `res.locals.dto` & passes the request to next middleware/handler if DTO is valid.
