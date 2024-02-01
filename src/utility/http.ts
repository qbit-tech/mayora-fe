import axios from "axios";
import queryString from "query-string";
import { getToken } from "../helpers/auth";
import { HttpParam } from "../types/config.type";

const CancelToken = axios.CancelToken;
let cancel: () => void | null;

export const Http = async (
  params: HttpParam,
  progress?: number | null,
  setProgress?: (any: any) => void
) => {

  try {
    let percentCompleted;
    params.showMessage =
      params.showMessage !== undefined ? params.showMessage : true;
    const token = localStorage.getItem('APP_AUTH_TOKEN')
    let query = params.query
      ? "?" + queryString.stringify(params.query, { arrayFormat: "bracket" })
      : "";
    let config: any = {
      method: params.method ? params.method : "GET",
      baseURL: process.env.REACT_APP_BASE_URL,
      url: params.path + (query || ""),
      data: params.data ? params.data : {},
      timeout: 1000 * 1200, //600 second / 10minutes
      headers: {
        Authorization: "Bearer " + (token ? token : ""),
        "Content-Type": params.content_type
          ? params.content_type
          : "application/json",
      },
      onUploadProgress: function (progressEvent: any) {
        if (progress !== undefined && setProgress !== undefined) {
          percentCompleted = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          if (progress || progress === 0) {
            setProgress(percentCompleted);
          }
        }
      },
      responseType: params.responseType || "",
    };

    let { data } = await axios(config, {
      cancelToken: new CancelToken(function executor(c) {
        // An executor function receives a cancel function as a parameter
        cancel = c;
      }),
    });

    return data;
  } catch (err: any) {
    if (err.response) {
      if (typeof cancel === "function") {
        cancel();
      }

      if (err.response.status === 401 || err.response.status === 403) {
        localStorage.removeItem("APP_AUTH_TOKEN");
        window.location.href = "/login";
      }

      console.log(err.response);
      return err.response.data;
    }
  }
};
