/**
 * 环境配置模块
 */

type EnvType = 'stg' | 'pre' | 'prod'

/**
 * 获取当前系统对应环境变量
 * @returns 返回当前环境变量
 */
export function getEnv(): EnvType {
  const data = document.documentElement.dataset
  const env: EnvType = (data.vanEnv || 'stg') as EnvType
  return env
}

const env = getEnv()

/**
 * 生成随机数
 */
const getRandom = () => {
  return Number(Math.random().toString().slice(3, 10) + Date.now()).toString(36)
}
/**
 * 根据当前环境获取对应配置信息
 */

const getBaseApi = (cur_env?: EnvType) => {
  const envName = cur_env || env
  let api = ''
  switch (envName) {
    case 'stg':
      api = 'https://mdap-fb-h5-api-stg.huolala.cn'
      break
    case 'pre':
      api = 'https://mdap-fb-h5-api-pre.huolala.cn'
      break
    case 'prod':
      api = 'https://mdap-fb-h5-api.huolala.cn'
      break
    default:
      api = 'https://mdap-fb-h5-api.huolala.cn'
      break
  }
  return api
}

export { env, getBaseApi, getRandom }
