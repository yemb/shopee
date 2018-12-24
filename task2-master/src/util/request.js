import {getValue} from './storage'

/**
 * 拉取远程数据
 */
const request = function (reqUrl, param, type, headers, BodyNeedJsonFormat = true) {
  const requestType = type || 'GET'

  const defaultHeaders = requestType === 'DELETE' ? {} : {
    'Accept': 'application/json,text/plain,*/*;',
    'Content-Type': 'application/json;charset=UTF-8',
    'Connection': 'Keep-Alive'
  }

  // 如有token，header中带上,这步应该在before-request阶段对需要的请求统一处理，这里简化
  const user = getValue('user')
  const hasToken = user && user.token !== undefined
  if (hasToken) {
    defaultHeaders['X-BLACKCAT-TOKEN'] = user.token
  }

  const newHeaders = Object.assign({}, defaultHeaders, headers)
  const cfg = {
    headers: newHeaders,
    method: requestType,
    credentials: 'include'
  }

  if (requestType === 'POST' || requestType === 'PUT') {
    cfg.body = BodyNeedJsonFormat ? JSON.stringify(param) : param
  } else if (param) {
    reqUrl += '?' + getParamStr(param)
  }

  const p = Promise.race([
    fetch(reqUrl, cfg),
    new Promise((resolve, reject) => {
      setTimeout(() => reject(new Error('REQUEST TIMEOUT')), 10 * 1000)
    })
  ])
  return new Promise((resolve, reject) => {
    p.then(response => {
      const contentType = response.headers.get('content-type')
      if (contentType && contentType.indexOf('application/json') !== -1) {
        response.json().then((resData) => {
          resolve(resData)
        }).catch(error => {
          reject(error)
        })
      } else {
        response.text().then(res => {
          resolve(res)
        }).catch(error => {
          reject(error)
        })
      }
    }).catch(error => {
      console.log('reqUrl', reqUrl)
      console.log('error', error)
      reject(error)
    })
  })
}

function getParamStr (param) {
  const arr = []
  for (let key in param) {
    if (param.hasOwnProperty(key)) {
      arr.push(key + '=' + param[key])
    }
  }
  return arr.join('&')
}

export default request
