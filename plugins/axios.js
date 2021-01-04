export default function (context) {
  const { $axios, error, route, $winstonLog } = context

  $axios.onError((err) => {
    if (process.server) {
      const { req } = context
      $winstonLog.info(`error from route:${route.fullPath},url:${req.url}`)
    }
    const statusCode = parseInt(err.response && err.response.status) || 500
    error({ statusCode, message: err.response })
  })
}
