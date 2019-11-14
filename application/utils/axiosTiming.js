export default (instance, callback) => {
  instance.interceptors.request.use((request) => {
    request.ts = Date.now();
    return request
  })

  instance.interceptors.response.use((response) => {
    callback(response.request.responseURL ,Number(Date.now() - response.config.ts))
    return response
  })
}
