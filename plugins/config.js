import { setGlobalConfig } from '~/configs'
export default function (context, inject) {
  const { $config } = context

  setGlobalConfig($config)
}
