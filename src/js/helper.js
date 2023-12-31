import { async } from "regenerator-runtime";
import * as config from './config.js'

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};



export const getJsonFromUrl = async function (url) {
  try {
    const response = await Promise.race([fetch(url), timeout(config.TIMEOUT_SEC)]);
    const data = await response.json();
    if (!response.ok) throw new Error(`${data.message} (error code: ${response.status})`);
    return data;
  } catch (error) {
    throw error;
  }
}