import pino from 'pino'

import pretty from 'pino-pretty'

const stream = pretty({
  levelFirst: true,
  colorize: true,
  ignore: 'time,hostname,pid',
})

export const Logger = pino(
  {
    name: 'MyLogger',
  },
  stream,
)
