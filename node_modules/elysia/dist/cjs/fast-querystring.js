"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/fast-querystring.ts
var fast_querystring_exports = {};
__export(fast_querystring_exports, {
  parseQuery: () => parseQuery
});
module.exports = __toCommonJS(fast_querystring_exports);
var import_fast_decode_uri_component = __toESM(require("fast-decode-uri-component"));
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
        if (shouldDecodeKey) key = (0, import_fast_decode_uri_component.default)(key) || key;
        if (!result[key]) {
          if (hasBothKeyValuePair) {
            value = input.slice(equalityIndex + 1, i);
            if (valueHasPlus) value = value.replace(plusRegex, " ");
            if (shouldDecodeValue)
              value = (0, import_fast_decode_uri_component.default)(value) || value;
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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  parseQuery
});
