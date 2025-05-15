"use strict";
(() => {
var exports = {};
exports.id = 406;
exports.ids = [406];
exports.modules = {

/***/ 3524:
/***/ ((module) => {

module.exports = require("@prisma/client");

/***/ }),

/***/ 9344:
/***/ ((module) => {

module.exports = require("jsonwebtoken");

/***/ }),

/***/ 4990:
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
        console.log(decoded);
        const teacherId = decoded.userId;
        if (!teacherId) {
            return res.status(400).json({
                error: "Invalid token: userId not found"
            });
        }
        const teacher = await prisma.user.findUnique({
            where: {
                id: teacherId
            }
        });
        if (!teacher) {
            return res.status(404).json({
                error: "User not found"
            });
        }
        const sharedNotes = await prisma.sharedNote.findMany({
            where: {
                teacherId: teacher.id
            },
            include: {
                note: true
            }
        });
        if (sharedNotes.length === 0) {
            return res.status(404).json({
                error: "You don't have any notes yet."
            });
        }
        const notes = sharedNotes.map((sharedNote)=>sharedNote.note);
        if (notes.length === 0) {
            return res.status(404).json({
                error: "You don't have any notes yet."
            });
        }
        return res.status(200).json({
            notes
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
var __webpack_exports__ = (__webpack_exec__(4990));
module.exports = __webpack_exports__;

})();