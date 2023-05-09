import crypto from 'crypto'
import {Request} from 'express'
import multer, {FileFilterCallback} from 'multer'
import {resolve} from 'node:path'

const twoMegaBytes = 2 * 1024 * 1024

const storageType = {
  local: multer.diskStorage({
    destination: resolve(__dirname, '..', '..', '..', 'uploads'),
    filename(request, file: Express.Multer.File, callback) {
      const hash = crypto.randomBytes(6).toString('hex')

      file.filename = `${hash}-${file.originalname}`

      callback(null, file.filename)
    }
  }),

  localTest: multer.diskStorage({
    destination: resolve(__dirname, '..', '..', '..', 'test', 'uploads'),
    filename(request, file: Express.Multer.File, callback) {
      const hash = crypto.randomBytes(6).toString('hex')

      file.filename = `${hash}-${file.originalname}`

      callback(null, file.filename)
    }
  })
}

export default {
  destination: () => {
    if (process.env.STORAGE_TYPE === 'local') {
      resolve(__dirname, '..', '..', 'uploads')
    }

    if (process.env.STORAGE_TYPE === 'test') {
      resolve(__dirname, '..', '..', 'test/uploads')
    }
  },
  storage: process.env.STORAGE_TYPE === 'local' ? storageType.local : storageType.localTest,
  limits: {
    fileSize: twoMegaBytes
  },

  fileFilter(request: Request, file: Express.Multer.File, callback: FileFilterCallback) {
    const allowedMimes = ['text/csv']

    if (allowedMimes.includes(file.mimetype)) {
      callback(null, true)
    } else {
      callback(null, false)
      callback(new Error('Tipo de arquivo inválido.'))
    }
  }
}
