/**
 * Welcome to Cloudflare Workers! This is your first worker.
 *
 * - Run `npm run dev` in your terminal to start a development server
 * - Open a browser tab at http://localhost:8787/ to see your worker in action
 * - Run `npm run deploy` to publish your worker
 *
 * Bind resources to your worker in `wrangler.toml`. After adding bindings, a type definition for the
 * `Env` object can be regenerated with `npm run cf-typegen`.
 *
 * Learn more at https://developers.cloudflare.com/workers/
 */

// module worker - object that get exported as the default for this file
// fetch - new request coming in to the workers application

// adding Hono to the project:
import { Hono } from 'hono';
import { Ai } from '@cloudflare/ai'

export interface Env {
	AI: any
} 

const app = new Hono<{ Bindings: Env }>()

app.get('/', async c => {
	const ai = new Ai(c.env.AI)

	const messages = [
		{ role: 'system', content: 'You are a friendly assistent' },
		{ role: 'user', content: 'what is the origin of the phrase Hello, world' }
	]
	const inputs = { messages }

	const response = await ai.run('@cf/mistral/mistral-7b-instruct-v0.1', inputs)
	return c.json(response)
})

export default app
	
// because we are using Hono the code below is managed by it and there fore all of it can be omited now instead of exporting all of it you just export default app!
// 	{
// 		async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
// 			// this is a promiss and the response is where you return the requestes made for instace:
// 				// make a database request
// 				// process input from the request 	
// 		// return new Response('Hello World!');
// 		// you can pass a second paramenter to Response that will hold options
// 		return new Response(JSON.stringify({ hello: "world" }), { headers: {
// 			'Content-Type': 'aplication/json'
// 		}});
// 	},
// };
