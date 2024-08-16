/**
 * 封装原生请求函数
 * @param {string} url 请求地址
 * @param {object} data 请求参数
 * @param {object} options 请求配置
 * @returns
 */

/**
 * 参数转换
 * { name:'jack' } =>  'name=jack'
 * @param {object} data
 * @returns ''
 */
export function getQueryString(data: any = {}) {
  let paramStr = ''
  for (const key in data) {
    paramStr += `&${key}=${data[key]}`
  }
  return paramStr ? paramStr.slice(1) : ''
}

// get 请求
export function get(url = '', data = {}, options = {}) {
  // 拼接query参数
  let params = getQueryString(data)
  if (params) url += '?' + params
  const config: RequestInit = {
    method: 'GET',
    mode: 'cors',
    credentials: 'omit',
    ...options
  }
  return fetch(url, config).then((response) => response.json())
}

// post 请求
export function post(url = '', data = {}, options = {}) {
  const config: RequestInit = {
    method: 'POST',
    mode: 'cors',
    credentials: 'same-origin',
    //请求的头信息
    headers: {
      'user-agent': 'Mozilla/4.0 MDN Example',
      'content-type': 'application/x-www-form-urlencoded'
    },
    body: getQueryString(data),
    ...options
  }
  return fetch(url, config).then((response) => response.json())
}
// 上传 请求
export function upload(url = '', data: FormData, options = {}) {
  const config: RequestInit = {
    method: 'POST',
    mode: 'cors',
    credentials: 'same-origin',
    body: data,
    ...options
  }
  return fetch(url, config).then((response) => response.json())
}
