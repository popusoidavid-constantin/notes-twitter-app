"use strict";
(() => {
var exports = {};
exports.id = 908;
exports.ids = [908];
exports.modules = {

/***/ 3524:
/***/ ((module) => {

module.exports = require("@prisma/client");

/***/ }),

/***/ 9344:
/***/ ((module) => {

module.exports = require("jsonwebtoken");

/***/ }),

/***/ 7618:
/***/ ((module) => {

module.exports = import("bcryptjs");;

/***/ }),

/***/ 1942:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ handler)
/* harmony export */ });
/* harmony import */ var _prisma_client__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(3524);
/* harmony import */ var _prisma_client__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_prisma_client__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _utils_auth__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(1445);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_utils_auth__WEBPACK_IMPORTED_MODULE_1__]);
_utils_auth__WEBPACK_IMPORTED_MODULE_1__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];



const prisma = new _prisma_client__WEBPACK_IMPORTED_MODULE_0__.PrismaClient();
async function handler(req, res) {
    if (req.method === "POST") {
        const { email , password  } = req.body;
        try {
            if (!email || !password) {
                return res.status(400).json({
                    error: "Email and password are required"
                });
            }
            const user = await prisma.user.findUnique({
                where: {
                    email
                }
            });
            if (!user) {
                return res.status(401).json({
                    error: "Invalid email or password"
                });
            }
            const isValidPw = await (0,_utils_auth__WEBPACK_IMPORTED_MODULE_1__/* .isValidPassword */ .eW)(password, user.password);
            if (!isValidPw) {
                return res.status(401).json({
                    error: "Invalid email or password"
                });
            }
            const token = (0,_utils_auth__WEBPACK_IMPORTED_MODULE_1__/* .createJSONToken */ .JX)(email, user.id);
            return res.status(200).json({
                message: "Login successful",
                token,
                user: {
                    id: user.id,
                    email: user.email,
                    username: user.username
                }
            });
        } catch (err) {
            console.error("Server error:", err);
            return res.status(500).json({
                error: "Internal Server Error"
            });
        }
    } else {
        res.setHeader("Allow", [
            "POST"
        ]);
        res.status(405).end(`Method ${req.method} Not Allowed`);
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
var __webpack_require__ = require("../../../webpack-api-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = (__webpack_exec__(1942));
module.exports = __webpack_exports__;

})();