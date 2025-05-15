"use strict";
(() => {
var exports = {};
exports.id = 22;
exports.ids = [22];
exports.modules = {

/***/ 3524:
/***/ ((module) => {

module.exports = require("@prisma/client");

/***/ }),

/***/ 5358:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ handler)
/* harmony export */ });
/* harmony import */ var _prisma_client__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(3524);
/* harmony import */ var _prisma_client__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_prisma_client__WEBPACK_IMPORTED_MODULE_0__);

const prisma = new _prisma_client__WEBPACK_IMPORTED_MODULE_0__.PrismaClient();
async function handler(req, res) {
    const postIdParam = req.query.postId;
    const postId = Array.isArray(postIdParam) ? postIdParam[0] : postIdParam;
    if (req.method !== "GET") {
        return res.status(405).json({
            error: "Method not allowed"
        });
    }
    if (!postId) {
        return res.status(400).json({
            error: "Invalid postId"
        });
    }
    try {
        const comments = await prisma.comment.findMany({
            where: {
                postId
            },
            include: {
                author: {
                    select: {
                        id: true,
                        username: true
                    }
                }
            },
            orderBy: {
                createdAt: "desc"
            }
        });
        return res.status(200).json({
            comments
        });
    } catch (err) {
        console.error("Fetching comments failed:", err);
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
var __webpack_exports__ = (__webpack_exec__(5358));
module.exports = __webpack_exports__;

})();