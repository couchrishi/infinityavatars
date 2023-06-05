"use strict";
(() => {
var exports = {};
exports.id = 565;
exports.ids = [565];
exports.modules = {

/***/ 551:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
// const generateAction = async (req, res) => {
//   console.log('Received request')
// }
// export default generateAction;
const bufferToBase64 = (buffer)=>{
    let arr = new Uint8Array(buffer);
    const base64 = btoa(arr.reduce((data, byte)=>data + String.fromCharCode(byte), ""));
    return `data:image/png;base64,${base64}`;
};
const generateAction = async (req, res)=>{
    console.log("Received request");
    const input = JSON.parse(req.body).finalInput;
    const response = await fetch(`https://api-inference.huggingface.co/models/couchrishi/saibalajifaces`, {
        headers: {
            Authorization: `Bearer ${process.env.HF_AUTH_KEY}`,
            //Authorization: `Bearer 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`,
            "Content-Type": "application/json"
        },
        method: "POST",
        body: JSON.stringify({
            inputs: input
        })
    });
    // Check for different statuses to send proper payload
    if (response.ok) {
        const buffer = await response.arrayBuffer();
        // Convert to base64
        const base64 = bufferToBase64(buffer);
        // Make sure to change to base64
        res.status(200).json({
            image: base64
        });
    } else if (response.status === 503) {
        const json = await response.json();
        res.status(503).json(json);
    } else {
        const json = await response.json();
        res.status(response.status).json({
            error: response.statusText
        });
    }
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (generateAction);


/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../webpack-api-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = (__webpack_exec__(551));
module.exports = __webpack_exports__;

})();