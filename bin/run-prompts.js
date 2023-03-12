import inquirer from 'inquirer';
import validate from 'validate-npm-package-name';

export const runInitPrompts = (argv) => {
    const name = String(typeof argv._[1] !== 'undefined' ? argv._[1] : argv.name)
    const promptList = [
        {
            type: 'input',
            message: 'library name',
            name: 'name',
            default: name,
            validate: (value) => {
                if (!value) {
                    return 'please enter name'
                }
                if (value.match(/\s+/g)) {
                    return 'forbidden library name'
                }
                return true
            }
        },
        {
            type: "input",
            message: "npm package name",
            name: 'npmname',
            default: name,
            validate: (value) => {
                if (!validate(value).validForNewPackages) {
                    return 'forbidden npm name'
                }
                return true
            }
        },
        {
            type: 'input',
            message: 'github username',
            name: 'username',
            default: 'fengyoubao'
        },
        {
            type: 'confirm',
            name: 'prettier',
            message: 'use prettier?',
            default: true
        },
        {
            type: 'confirm',
            name: 'eslint',
            message: 'use eslint?',
            default: true,
        },
        {
            type: 'checkbox',
            message: 'use commitlint',
            name: 'commitlint',
            choices: ['commitlint', 'standard-version'],
            default: ['commitlint'],
            filter: (values) => {
                return values.reduce((res, cur) => ({...res, [cur]: true}), {})
            }
        },
        {
            type: 'checkbox',
            message: 'use test',
            name: 'test',
            choices: ['mocha', 'puppeteer'],
            default: ['mocha'],
            filter: (values) => {
                return values.reduce((res, cur) => ({...res, [cur]: true}), {})
            }
        },
        {
            type: 'confirm',
            name: 'husky',
            message: 'use husky?',
            default: true
        },
        {
            type: 'list',
            message: 'use ci',
            name: 'ci',
            choices: ['github', 'circleci', 'travis', 'none'],
            filter: (value) => {
                return {
                    github: 'github',
                    circleci: 'circleci',
                    travis: 'travis',
                    none: null
                }[value]
            }
        },
        {
            type: 'list',
            message: 'package manager',
            name: 'manager',
            default: 'npm',
            choices: ['no install', 'npm', 'yarn', 'pnpm'],
            filter: (value) => {
                return {
                    npm: 'npm',
                    yarn: 'yarn',
                    pnpm: 'pnpm',
                    'no install': null
                }[value]
            }
        }
    ]

    return inquirer.prompt(promptList)
}