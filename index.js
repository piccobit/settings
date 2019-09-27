const mergeArrayByName = require('./lib/mergeArrayByName')

module.exports = (robot, _, Settings = require('./lib/settings')) => {
  robot.log.info('Ready, waiting for payloads...')

  app.on('push', async context => {
    context.log.debug('context: %O', context)

    const payload = context.payload
    const defaultBranch = payload.ref === 'refs/heads/' + payload.repository.default_branch

    const config = await context.config('settings.yml', {}, { arrayMerge: mergeArrayByName })

    const settingsModified = payload.commits.find(commit => {
      return commit.added.includes(Settings.FILE_NAME) ||
        commit.modified.includes(Settings.FILE_NAME)
    })

    if (defaultBranch && settingsModified) {
      return Settings.sync(context.github, context.repo(), config)
    }
  })
}
