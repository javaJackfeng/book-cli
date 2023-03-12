import fs from 'fs'
import path from 'path'
import copydir from 'copy-dir'
import template from 'template_js'
import { extend } from './extend.js'

const readTmpl = (from, data) => {
    const text = fs.readFileSync(from, { encoding: 'utf-8' })
    return template(text, data)
}

export const copyTmpl = (from, to, data = {}) => {
    if (path.extname(from) !== '.tmpl') {
        return copyFile(from, to)
    }
    const parentPath = path.dirname(to)
    mkdirSyncGuard(parentPath)
    fs.writeFileSync(to, readTmpl(from, data), { encoding: 'utf-8' })
}

const mergeObj2JSON = (object, to) => {
    const json = JSON.parse(fs.readFileSync(to, { encoding: 'utf-8' }))
    extend(object, to)
    fs.writeFileSync(to, JSON.stringify(json, null, ' '), { encoding: 'utf-8'})
}

export const mergeJSON2JSON = (from, to) => {
    const json = JSON.parse(fs.readFileSync(from, { encoding: 'utf-8' }))
    mergeObj2JSON(json, to)
}

export const mergeTmpl2JSON = (from, to, data = {}) => {
    const json = JSON.parse(readTmpl(from, data))
    mergeObj2JSON(json, to)
}


const mkdirSyncGuard = (target) => {
    try {
        fs.mkdirSync(target, { recursive: true})
    } catch (error) {
        const mkdrip = (dir) =>  {
            if (fs.existsSync(dir)) {
                return 
            }
            const dirname = path.dirname(dir)
            mkdrip(dirname)
            fs.mkdirSync(dir)
        }
        mkdirp(target)
    }
}

export const copyFile = (from, to) => {
    const buffer = fs.readFileSync(from)
    const parentPath = path.dirname(to)

    mkdirSyncGuard(parentPath)
    fs.writeFileSync(to, buffer)
}

export const copyDir = (from, to, options) => {
    copydir.sync(from, to, options);
}