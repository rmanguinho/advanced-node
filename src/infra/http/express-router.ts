import { Controller } from '@/application/controllers'

import { RequestHandler } from 'express'

export const adaptExpressRoute = (controller: Controller): RequestHandler => {
  return async (req, res) => {
    const { statusCode, data } = await controller.handle({ ...req.body })
    const json = statusCode === 200 ? data : { error: data.message }
    res.status(statusCode).json(json)
  }
}
