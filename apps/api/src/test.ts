import { Elysia } from 'elysia'

new Elysia()
    .get('/', () => 'hello')
    .post('/hi', (ctx) => {
        console.log(ctx.body)
    })
    .listen(3000)