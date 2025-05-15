"use strict";
(() => {
var exports = {};
exports.id = 306;
exports.ids = [306];
exports.modules = {

/***/ 9344:
/***/ ((module) => {

module.exports = require("jsonwebtoken");

/***/ }),

/***/ 7618:
/***/ ((module) => {

module.exports = import("bcryptjs");;

/***/ }),

/***/ 5475:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ handler)
/* harmony export */ });
/* harmony import */ var _utils_auth__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1445);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_utils_auth__WEBPACK_IMPORTED_MODULE_0__]);
_utils_auth__WEBPACK_IMPORTED_MODULE_0__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];

function handler(req, res) {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({
            error: "Unauthorized"
        });
    }
    const token = authHeader.split(" ")[1];
    try {
        const decoded = (0,_utils_auth__WEBPACK_IMPORTED_MODULE_0__/* .verifyJSONToken */ .HL)(token);
        return res.status(200).json({
            message: "Protected data",
            user: decoded
        });
    } catch (err) {
        console.error("Invalid token:", err);
        return res.status(401).json({
            error: "Invalid token"
        });
    }
}

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 1445:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "HL": () => (/* binding */ verifyJSONToken),
/* harmony export */   "JX": () => (/* binding */ createJSONToken),
/* harmony export */   "eW": () => (/* binding */ isValidPassword)
/* harmony export */ });
/* harmony import */ var jsonwebtoken__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(9344);
/* harmony import */ var jsonwebtoken__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(jsonwebtoken__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var bcryptjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(7618);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([bcryptjs__WEBPACK_IMPORTED_MODULE_1__]);
bcryptjs__WEBPACK_IMPORTED_MODULE_1__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];


const KEY = "supersecret";
function createJSONToken(email, userId) {
    return (0,jsonwebtoken__WEBPACK_IMPORTED_MODULE_0__.sign)({
        email,
        userId
    }, KEY, {
        expiresIn: "1d"
    });
}
function verifyJSONToken(token) {
    return (0,jsonwebtoken__WEBPACK_IMPORTED_MODULE_0__.verify)(token, KEY);
}
function isValidPassword(password, storedPassword) {
    return (0,bcryptjs__WEBPACK_IMPORTED_MODULE_1__.compare)(password, storedPassword);
}

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../webpack-api-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = (__webpack_exec__(5475));
module.exports = __webpack_exports__;

})();