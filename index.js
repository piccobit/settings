const mergeArrayByName = require('./lib/mergeArrayByName')

module.exports = (robot, _, Settings = require('./lib/settings')) => {
  robot.on('push', async context => {
    const payload = context.payload
    const defaultBranch = payload.ref === 'refs/heads/' + payload.repository.default_branch

    if (!defaultBranch) {
      // Not the default branch, nothing to see here!
      return;
    }
    const config = await context.config('settings.yml', {}, { arrayMerge: mergeArrayByName })

      return Settings.sync(context.github, context.repo(), config)
  })
}
