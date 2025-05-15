"use strict";
(() => {
var exports = {};
exports.id = 770;
exports.ids = [770];
exports.modules = {

/***/ 3524:
/***/ ((module) => {

module.exports = require("@prisma/client");

/***/ }),

/***/ 8262:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ handler)
/* harmony export */ });
/* harmony import */ var _prisma_client__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(3524);
/* harmony import */ var _prisma_client__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_prisma_client__WEBPACK_IMPORTED_MODULE_0__);

const prisma = new _prisma_client__WEBPACK_IMPORTED_MODULE_0__.PrismaClient();
async function handler(req, res) {
    if (req.method === "POST") {
        const { title , content , userId  } = req.body;
        if (!title || !content || !userId) {
            return res.status(400).json({
                error: "Title, content, and userId are required"
            });
        }
        try {
            const note = await prisma.note.create({
                data: {
                    title,
                    content,
                    authorId: userId
                }
            });
            return res.status(201).json({
                message: "Note created successfully",
                note
            });
        } catch (error) {
            console.error("Error creating note:", error);
            return res.status(500).json({
                error: "Internal Server Error"
            });
        }
    } else {
        res.setHeader("Allow", [
            "POST"
        ]);
        return res.status(405).json({
            error: `Method ${req.method} Not Allowed`
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
var __webpack_exports__ = (__webpack_exec__(8262));
module.exports = __webpack_exports__;

})();