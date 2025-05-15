"use strict";
(() => {
var exports = {};
exports.id = 47;
exports.ids = [47];
exports.modules = {

/***/ 3524:
/***/ ((module) => {

module.exports = require("@prisma/client");

/***/ }),

/***/ 3789:
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
        const { title , content , authorId , imageUrl  } = req.body;
        if (!title || !content || !authorId || !imageUrl) {
            return res.status(400).json({
                error: "All fields including image are required."
            });
        }
        const user = await prisma.user.findUnique({
            where: {
                id: authorId
            }
        });
        if (!user) {
            return res.status(400).json({
                error: "Invalid authorId. User does not exist."
            });
        }
        const post = await prisma.post.create({
            data: {
                title,
                content,
                authorId,
                imageUrl
            }
        });
        return res.status(200).json(post);
    } catch (err) {
        console.error("Post creation failed:", err.message);
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
var __webpack_exports__ = (__webpack_exec__(3789));
module.exports = __webpack_exports__;

})();