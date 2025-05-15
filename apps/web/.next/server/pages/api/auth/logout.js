"use strict";
(() => {
var exports = {};
exports.id = 845;
exports.ids = [845];
exports.modules = {

/***/ 768:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ handler)
/* harmony export */ });
function handler(req, res) {
    if (req.method === "POST") {
        res.setHeader("Set-Cookie", "token=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT; HttpOnly; Secure; SameSite=Strict");
        return res.status(200).json({
            message: "Logged out successfully"
        });
    } else {
        res.setHeader("Allow", [
            "POST"
        ]);
        return res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}


/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../../webpack-api-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = (__webpack_exec__(768));
module.exports = __webpack_exports__;

})();