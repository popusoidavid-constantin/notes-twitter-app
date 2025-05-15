"use strict";
(() => {
var exports = {};
exports.id = 569;
exports.ids = [569];
exports.modules = {

/***/ 3524:
/***/ ((module) => {

module.exports = require("@prisma/client");

/***/ }),

/***/ 9344:
/***/ ((module) => {

module.exports = require("jsonwebtoken");

/***/ }),

/***/ 4530:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ handler)
/* harmony export */ });
/* harmony import */ var _prisma_client__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(3524);
/* harmony import */ var _prisma_client__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_prisma_client__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var jsonwebtoken__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(9344);
/* harmony import */ var jsonwebtoken__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(jsonwebtoken__WEBPACK_IMPORTED_MODULE_1__);


const KEY = "supersecret";
const prisma = new _prisma_client__WEBPACK_IMPORTED_MODULE_0__.PrismaClient();
async function handler(req, res) {
    if (req.method !== "GET") {
        return res.status(405).json({
            error: "Method not allowed"
        });
    }
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
        return res.status(401).json({
            error: "Unauthorized"
        });
    }
    try {
        const decoded = jsonwebtoken__WEBPACK_IMPORTED_MODULE_1___default().verify(token, KEY);
        const userId = decoded.userId;
        if (!userId) {
            return res.status(400).json({
                error: "Invalid token: userId not found"
            });
        }
        const user = await prisma.user.findUnique({
            where: {
                id: userId
            }
        });
        const userNotes = await prisma.note.findMany({
            where: {
                authorId: user.id
            }
        });
        const userPosts = await prisma.post.findMany({
            where: {
                authorId: user.id
            }
        });
        if (!user) {
            return res.status(404).json({
                error: "User not found"
            });
        }
        return res.status(200).json({
            user,
            userNotes,
            userPosts
        });
    } catch (err) {
        console.error("Error fetching user data:", err.message);
        return res.status(500).json({
            error: "Internal server error"
        });
    }
}


/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../../webpack-api-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = (__webpack_exec__(4530));
module.exports = __webpack_exports__;

})();