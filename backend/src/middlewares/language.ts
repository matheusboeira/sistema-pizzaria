import { Request, Response, NextFunction } from 'express'
import i18next from 'i18next'

export const setLanguage = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const language = req.headers['accept-language'] || 'en'
  i18next.changeLanguage(language)
  next()
}
