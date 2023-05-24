import { Request, Response, NextFunction } from 'express'

export const getErrors = (
  err: Error,
  _: Request,
  res: Response,
  __: NextFunction
) => {
  if (err instanceof Error) {
    return res.status(400).json({
      status: 'error',
      message: err.message
    })
  }
  return res.status(500).json({
    status: 'error',
    message: 'Internal server error'
  })
}
