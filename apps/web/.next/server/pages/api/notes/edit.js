"use strict";
(() => {
var exports = {};
exports.id = 379;
exports.ids = [379];
exports.modules = {

/***/ 3524:
/***/ ((module) => {

module.exports = require("@prisma/client");

/***/ }),

/***/ 3915:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ handler)
/* harmony export */ });
/* harmony import */ var _prisma_client__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(3524);
/* harmony import */ var _prisma_client__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_prisma_client__WEBPACK_IMPORTED_MODULE_0__);

const prisma = new _prisma_client__WEBPACK_IMPORTED_MODULE_0__.PrismaClient();
async function handler(req, res) {
    if (req.method === "PUT") {
        const { title , content , noteId , isPublic , teacherId  } = req.body;
        if (!title || !content || !noteId || isPublic === undefined) {
            return res.status(400).json({
                message: "Title, content, and userId are required"
            });
        }
        try {
            const existingNote = await prisma.note.findUnique({
                where: {
                    id: noteId
                }
            });
            if (!existingNote) {
                return res.status(404).json({
                    message: "Note not found"
                });
            }
            const updatedNote = await prisma.note.update({
                where: {
                    id: noteId
                },
                data: {
                    title,
                    content,
                    isPublic
                }
            });
            if (teacherId) {
                const teacher = await prisma.user.findUnique({
                    where: {
                        id: teacherId
                    }
                });
                if (!teacher || teacher.role !== "TEACHER") {
                    return res.status(404).json({
                        message: "Teacher not found or invalid role"
                    });
                }
                const existingSharedNote = await prisma.sharedNote.findFirst({
                    where: {
                        teacherId: teacher.id,
                        noteId: noteId
                    }
                });
                if (existingSharedNote) {
                    return res.status(400).json({
                        error: "This note is already shared with this teacher."
                    });
                }
                await prisma.sharedNote.create({
                    data: {
                        noteId,
                        teacherId
                    }
                });
            }
            return res.status(200).json({
                message: "Note updated successfully",
                note: updatedNote
            });
        } catch (error) {
            console.error("Error updating note:", error);
            return res.status(500).json({
                error: "Internal Server Error"
            });
        }
    } else {
        res.setHeader("Allow", [
            "PUT"
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
var __webpack_exports__ = (__webpack_exec__(3915));
module.exports = __webpack_exports__;

})();