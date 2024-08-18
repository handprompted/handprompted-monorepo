// src/fast-querystring.ts
import fastDecode from "fast-decode-uri-component";
var plusRegex = /\+/g;
function parseQuery(input) {
  const result = {};
  if (typeof input !== "string") return result;
  const inputLength = input.length;
  let key = "";
  let value = "";
  let startingIndex = -1;
  let equalityIndex = -1;
  let shouldDecodeKey = false;
  let shouldDecodeValue = false;
  let keyHasPlus = false;
  let valueHasPlus = false;
  let hasBothKeyValuePair = false;
  let c = 0;
  for (let i = 0; i < inputLength + 1; i++) {
    c = i !== inputLength ? input.charCodeAt(i) : 38;
    if (c === 38) {
      hasBothKeyValuePair = equalityIndex > startingIndex;
      if (!hasBothKeyValuePair) equalityIndex = i;
      key = input.slice(startingIndex + 1, equalityIndex);
      if (hasBothKeyValuePair || key.length > 0) {
        if (keyHasPlus) key = key.replace(plusRegex, " ");
        if (shouldDecodeKey) key = fastDecode(key) || key;
        if (!result[key]) {
          if (hasBothKeyValuePair) {
            value = input.slice(equalityIndex + 1, i);
            if (valueHasPlus) value = value.replace(plusRegex, " ");
            if (shouldDecodeValue)
              value = fastDecode(value) || value;
          }
          result[key] = value;
        }
      }
      value = "";
      startingIndex = i;
      equalityIndex = i;
      shouldDecodeKey = false;
      shouldDecodeValue = false;
      keyHasPlus = false;
      valueHasPlus = false;
    } else if (c === 61) {
      if (equalityIndex <= startingIndex) equalityIndex = i;
      else shouldDecodeValue = true;
    } else if (c === 43) {
      if (equalityIndex > startingIndex) valueHasPlus = true;
      else keyHasPlus = true;
    } else if (c === 37) {
      if (equalityIndex > startingIndex) shouldDecodeValue = true;
      else shouldDecodeKey = true;
    }
  }
  return result;
}
export {
  parseQuery
};
