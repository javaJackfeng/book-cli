
import fs from 'fs'
import path from 'path'

export const checkProjectExists = (cmdPath, pathname) => {
    return fs.existsSync(path.resolve(cmdPath, pathname))    
}