"use strict";
(() => {
var exports = {};
exports.id = 384;
exports.ids = [384];
exports.modules = {

/***/ 3524:
/***/ ((module) => {

module.exports = require("@prisma/client");

/***/ }),

/***/ 3948:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ handler)
/* harmony export */ });
/* harmony import */ var _prisma_client__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(3524);
/* harmony import */ var _prisma_client__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_prisma_client__WEBPACK_IMPORTED_MODULE_0__);

const prisma = new _prisma_client__WEBPACK_IMPORTED_MODULE_0__.PrismaClient();
async function handler(req, res) {
    if (req.method !== "DELETE") {
        return res.status(405).json({
            error: "Method not allowed"
        });
    }
    const { postId  } = req.body;
    if (!postId) {
        return res.status(400).json({
            error: "Post ID is required"
        });
    }
    try {
        const post = await prisma.post.findUnique({
            where: {
                id: postId
            }
        });
        if (!post) {
            return res.status(404).json({
                error: "Post not found"
            });
        }
        await prisma.post.delete({
            where: {
                id: postId
            }
        });
        return res.status(200).json({
            message: "Post deleted successfully!"
        });
    } catch (err) {
        console.error("Error deleting post:", err);
        return res.status(500).json({
            error: "Failed to delete the post"
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
var __webpack_exports__ = (__webpack_exec__(3948));
module.exports = __webpack_exports__;

})();