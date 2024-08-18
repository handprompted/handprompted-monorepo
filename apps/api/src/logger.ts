// import { createLogger, format, transports } from 'winston';

// const logger = createLogger({
//   level: 'info',
//   format: format.combine(
//     format.timestamp(),
//     format.json()
//   ),
//   transports: [
//     new transports.Console(),
//     new transports.File({ filename: 'combined.log' })
//   ],
// });

// export default logger;


// import { Elysia } from 'elysia';
// import { createLogger, format, transports } from 'winston';

// // Create a Winston logger instance
// const logger = createLogger({
//   level: 'info',
//   format: format.combine(
//     format.timestamp(),
//     format.json()
//   ),
//   transports: [
//     new transports.Console(),
//     new transports.File({ filename: 'combined.log' })
//   ],
// });

// // Integrate the logger into your Elysia application
// const app = new Elysia();

// // Example route that logs a message
// app.get('/log-example', () => {
//   logger.info('This is an example log message');
//   return { message: 'Check your logs!' };
// });

// // Middleware to log every request
// app.use((req, res, next) => {
//   logger.info(`Received request: ${req.method} ${req.url}`);
//   next();
// });

// app.listen(3000);

// logger.info('Server running at http://localhost:3000');

// export default app;
