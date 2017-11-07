'use strict'
const exec = require('child_process').exec
const co = require('co')
const prompt = require('co-prompt')
const config = require('./templates')
const chalk = require('chalk')

module.exports = () => {
 co(function *() {
    // 处理用户输入
    	let isCopy = yield prompt("Do you want get a duplicate project?(y|n):");
    	if(isCopy!='y' &&  isCopy!='n'){
		 console.log(chalk.red('\n sorry, input is illegal!'))
        process.exit()
	}
      let tplName = yield prompt('Template name: ')
      let projectName = yield prompt('Project name: ')
      let gitUrl
      let branch

    if (!config.tpl[tplName]) {
        console.log(chalk.red('\n sorry, Template does not exit!'))
        process.exit()
    }
    gitUrl = config.tpl[tplName].url
    branch = config.tpl[tplName].branch
	
	if(isCopy=='y'){
		// git命令，远程拉取项目并自定义项目名
   	 	let cmdStr = `git clone ${gitUrl} ${projectName} && cd ${projectName} && git checkout ${branch} && rm -rf .git`
	}else{
		// git命令，远程拉取项目并自定义项目名
   		 let cmdStr = `git clone ${gitUrl} ${projectName} && cd ${projectName} && git checkout ${branch}`
	}

    console.log(chalk.white('\n Start generating...'))

    exec(cmdStr, (error, stdout, stderr) => {
      if (error) {
        console.log(error)
        process.exit()
      }
      console.log(chalk.green('\n √ Generation completed!'))
      console.log(`\n cd ${projectName} && npm install or yarn \n`)
      process.exit()
    })
  })
}