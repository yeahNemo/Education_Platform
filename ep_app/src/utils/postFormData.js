import axios from 'axios'
export default function postFormData (url, params) {
  return new Promise((resolve, reject) => {
    axios
      .post(url, params, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      .then((res) => {
        resolve(res.data)
        console.log('请求成功！')
      })
      .catch((err) => {
        reject(err.data)
      })
  })
}
