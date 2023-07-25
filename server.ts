import { createServer } from 'http'
import { parse } from 'url'
import next from 'next'
import { wsUtil } from './utils/wsUtil'

const port = parseInt(process.env.PORT || '3000', 10)
const hostname = process.env.HOSTNAME;
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev, hostname, port })
const handle = app.getRequestHandler()

app.prepare().then(() => {
  let server = createServer((req, res) => {
    const parsedUrl = parse(req.url!, true)
    handle(req, res, parsedUrl)
  }).listen(port);
  wsUtil.onInit(server);

  console.log(
    `> Server listening at http://localhost:${port} as ${dev ?
      'development'
      :
      process.env.NODE_ENV
    }`
  )
})
