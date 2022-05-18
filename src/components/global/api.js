import axios from "axios";
// import AxiosLogger from "axios-logger";

let BasrUrl = `https://adminchannel.ir/api/v1/`;

//config of header

const axiosInstance = axios.create();
//show log of axios
// axiosInstance.interceptors.request.use(AxiosLogger.requestLogger);
axios.interceptors.request.use(request => {
  console.log("Starting Request", request);
  return request;
});

//all of setting about api
/*eslint spaced-comment:0*/
export default class ApiTools {
  //api post with callback
  static Post(url, data, callbackfunction) {
    axiosInstance
      .post(BasrUrl + url, data)
      .then(res => {
        callbackfunction(res);
      })
      .catch(function(error) {
        callbackfunction(error);
      });
  }
  //api post with prommis
  static PostPromis(url, data) {
    return new Promise(resolve => {
      axiosInstance
        .post(BasrUrl + url, data)
        .then(res => {
          resolve(res);
        })
        .catch(function(error) {
          resolve(error);
        });
    });
  }
  //api get with promis
  static GetPromis(url, data) {
    return new Promise(resolve => {
      axiosInstance
        .get(BasrUrl + url, data)
        .then(res => {
          resolve(res);
        })
        .catch(function(error) {
          resolve(error);
        });
    });
  }
  //api get with callback
  static Get(url, data, callbackfunction) {
    axiosInstance
      .get(BasrUrl + url, data)
      .then(res => {
        callbackfunction(res);
      })
      .catch(function(error) {
        callbackfunction(error);
      });
  }
}
