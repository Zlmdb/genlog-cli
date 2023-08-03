#!/usr/bin/env node

const chalk = require("chalk");
const inquirer = require("inquirer");
const program = require("commander");
const moment = require("moment");
const current_time = moment(Date.now()).format("YYYY-MM-DD HH:mm:ss");
const getQuestions = require("./getQuestions");
const { version } = require(`${process.cwd()}/package.json`);

program
  .version(version, "-V, --version")
  .command("add")
  .description("请为每个版本号添加日志信息")
  .action(async () => {
    const questions = await getQuestions();
    const answers = await inquirer.prompt(questions);
    const description = (answers || {}).description || "-";

    try {
      import("mem-fs").then((res) => {
        const store = res.create();
        import("mem-fs-editor").then((editor) => {
          const fs = editor.create(store);
          fs.append(
            `${process.cwd()}/CHANGELOG.md`,
            `## ${version}  (${current_time}) \n note：${description}`,
            { create: true }
          );
          fs.commit();
          console.log(chalk.green("日志生成成功！"));
        });
      });
    } catch (ex) {
      console.log(ex);
      console.log(chalk.red("日志生成失败！"));
      return;
    }
  });

program.parse(process.argv);
