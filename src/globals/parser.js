import logger from "../utils/logger.js";

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

export const blobToString = blob => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        const text = reader.result;
        resolve(text);
      };
      reader.onerror = reject;
      reader.readAsText(blob);
    });
  }