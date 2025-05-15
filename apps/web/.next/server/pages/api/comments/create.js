"use strict";
(() => {
var exports = {};
exports.id = 44;
exports.ids = [44];
exports.modules = {

/***/ 3524:
/***/ ((module) => {

module.exports = require("@prisma/client");

/***/ }),

/***/ 7345:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ handler)
/* harmony export */ });
/* harmony import */ var _prisma_client__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(3524);
/* harmony import */ var _prisma_client__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_prisma_client__WEBPACK_IMPORTED_MODULE_0__);

const prisma = new _prisma_client__WEBPACK_IMPORTED_MODULE_0__.PrismaClient();
async function handler(req, res) {
    if (req.method !== "POST") {
        return res.status(405).json({
            error: "Method not allowed"
        });
    }
    try {
        const { postId , authorId , content  } = req.body;
        if (!postId || !authorId || !content || content.trim() === "") {
            return res.status(400).json({
                error: "Missing or invalid fields"
            });
        }
        const user = await prisma.user.findUnique({
            where: {
                id: authorId
            }
        });
        if (!user) {
            return res.status(404).json({
                error: "User not found"
            });
        }
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
        const comment = await prisma.comment.create({
            data: {
                content,
                postId,
                authorId
            }
        });
        return res.status(200).json({
            message: "Comment added successfully",
            comment
        });
    } catch (err) {
        console.error("Comment creation failed:", err);
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
var __webpack_exports__ = (__webpack_exec__(7345));
module.exports = __webpack_exports__;

})();