#!/usr/bin/env node

const fs = require('fs')
const chalk = require('chalk')
const path = require('path')
const { lstat } = fs.promises

const targetDir = process.argv[2] || process.cwd()

console.log(targetDir)

fs.readdir(targetDir, async (err, filenames) => {
  if (err) {
    console.log(err)
  }

  try {
    const lstatPromises = filenames.map((filename) => {
      return lstat(path.join(targetDir, filename))
    })

    const allStats = await Promise.all(lstatPromises)

    for (let stats of allStats) {
      const index = allStats.indexOf(stats)
      if (stats.isFile()) {
        console.log(filenames[index])
      } else {
        console.log(chalk.bold(filenames[index]))
      }
    }
  } catch (err) {
    console.log(err)
  }
})
