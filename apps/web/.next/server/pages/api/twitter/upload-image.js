"use strict";
(() => {
var exports = {};
exports.id = 69;
exports.ids = [69];
exports.modules = {

/***/ 3524:
/***/ ((module) => {

module.exports = require("@prisma/client");

/***/ }),

/***/ 6705:
/***/ ((module) => {

module.exports = import("formidable");;

/***/ }),

/***/ 7147:
/***/ ((module) => {

module.exports = require("fs");

/***/ }),

/***/ 3059:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {


// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "R": () => (/* binding */ supabaseServer)
});

;// CONCATENATED MODULE: external "@supabase/supabase-js"
const supabase_js_namespaceObject = require("@supabase/supabase-js");
;// CONCATENATED MODULE: ./db/supabaseServer.tsx

const supabaseServer = (0,supabase_js_namespaceObject.createClient)("https://lorioanjlqcungjqjqqa.supabase.co", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxvcmlvYW5qbHFjdW5nanFqcXFhIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc0NTUxODQ3MywiZXhwIjoyMDYxMDk0NDczfQ.1TlLUlgkYl8h7MajkIW2NlxAD1IdCIkFc3JewMxVYMY");


/***/ }),

/***/ 963:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "config": () => (/* binding */ config),
/* harmony export */   "default": () => (/* binding */ handler)
/* harmony export */ });
/* harmony import */ var formidable__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(6705);
/* harmony import */ var fs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(7147);
/* harmony import */ var fs__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(fs__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _prisma_client__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(3524);
/* harmony import */ var _prisma_client__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_prisma_client__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _db_supabaseServer__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(3059);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([formidable__WEBPACK_IMPORTED_MODULE_0__]);
formidable__WEBPACK_IMPORTED_MODULE_0__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];




const config = {
    api: {
        bodyParser: false
    }
};
const prisma = new _prisma_client__WEBPACK_IMPORTED_MODULE_2__.PrismaClient();
async function handler(req, res) {
    const form = (0,formidable__WEBPACK_IMPORTED_MODULE_0__["default"])({
        keepExtensions: true
    });
    form.parse(req, async (err, fields, files)=>{
        if (err) return res.status(500).json({
            error: "Form parse error"
        });
        const userId = fields.userId?.[0];
        if (!userId) return res.status(400).json({
            error: "Missing userId"
        });
        const user = await prisma.user.findUnique({
            where: {
                id: userId
            }
        });
        if (!user) return res.status(401).json({
            error: "Unauthorized"
        });
        const file = files.file?.[0];
        if (!file) return res.status(400).json({
            error: "No file uploaded"
        });
        const fileBuffer = fs__WEBPACK_IMPORTED_MODULE_1___default().readFileSync(file.filepath);
        const fileName = `${Date.now()}-${file.originalFilename}`;
        const filePath = `posts/${user.id}/${fileName}`;
        const { error: uploadError  } = await _db_supabaseServer__WEBPACK_IMPORTED_MODULE_3__/* .supabaseServer.storage.from */ .R.storage.from("posts-images").upload(filePath, fileBuffer, {
            contentType: file.mimetype || "image/png",
            upsert: false
        });
        if (uploadError) return res.status(500).json({
            error: uploadError.message
        });
        const { data: { publicUrl  }  } = _db_supabaseServer__WEBPACK_IMPORTED_MODULE_3__/* .supabaseServer.storage.from */ .R.storage.from("posts-images").getPublicUrl(filePath);
        return res.status(200).json({
            url: publicUrl,
            path: filePath
        });
    });
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
var __webpack_exports__ = (__webpack_exec__(963));
module.exports = __webpack_exports__;

})();