import { setGlobalConfig } from '~/configs'
export default function (context) {
  const { $config } = context

  // 只有服务端可访问
  if (process.server) {
    setGlobalConfig({
      ...$config,
      host: {
        ...$config.host.server,
      },
    })
  } else if (process.client) {
    setGlobalConfig({
      ...$config,
      host: {
        ...$config.host.browser,
      },
    })
  }
}
