import logger from "../utils/logger.js";
import { URLSearchParams } from 'url';

export const jsonToString = json => {
    try {
        if (typeof json === "string") return json;
        else if (typeof json == "object") return JSON.stringify(json);
    } catch (err) {
        logger.err("Error parsing JSON : " + err)
        return null
    }
}
  
/**
 * JSON -> Object 형 변환
 * @param {*} json 형 변환하고자 하는 객체
 * @returns
 */
export const jsonToObject = json => {
    try {
        if (typeof json === "string") return JSON.parse(json)
        else if (typeof json == "object") return json
    } catch (err) {
        logger.err("Error parsing JSON : " + err)
        return null
    }
}