/**
 * @author wzc0x0@gmail.com
 * @description Git merge tools
 */

const chalk = require('chalk')
const inquirer = require('inquirer')
const utils = require('./utils')

const current_branch = 'hb-1.0'
const origin_branch = {
    default: 'develop',
    choices: ['develop', 'release']
}

inquirer.prompt([{
    type: 'list',
    default: origin_branch.default,
    name: 'branch',
    message: `which branch will you wanna merge the ${current_branch}?`,
    choices: origin_branch.choices
}]).then(answers => {
    let {
        branch
    } = answers
    utils.series([
        `git checkout ${branch}`,
        'git pull',
        `git merge ${current_branch}`,
        'git push',
        `git checkout ${current_branch}`,
        'git pull'
    ], function(err) {
        if (err) {
            console.log(chalk.red(err))
            process.exit(0)
        }
        console.log(chalk.green(`Git merge ${branch} finished!`))
        process.exit(0)
    })
}).catch(err => {
    console.log(chalk.red(err))
    process.exit(0)
})