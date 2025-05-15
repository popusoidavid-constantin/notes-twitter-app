"use strict";
(() => {
var exports = {};
exports.id = 7;
exports.ids = [7];
exports.modules = {

/***/ 3524:
/***/ ((module) => {

module.exports = require("@prisma/client");

/***/ }),

/***/ 6080:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": () => (/* binding */ handler)
});

// EXTERNAL MODULE: external "@prisma/client"
var client_ = __webpack_require__(3524);
;// CONCATENATED MODULE: external "bcrypt"
const external_bcrypt_namespaceObject = require("bcrypt");
var external_bcrypt_default = /*#__PURE__*/__webpack_require__.n(external_bcrypt_namespaceObject);
;// CONCATENATED MODULE: ./pages/api/auth/register.tsx


const prisma = new client_.PrismaClient();
async function handler(req, res) {
    if (req.method === "POST") {
        const { email , password , username , role  } = req.body;
        try {
            if (!email || !password || !username || !role) {
                return res.status(400).json({
                    error: "Email, password, username and the role are required"
                });
            }
            const existingUser = await prisma.user.findUnique({
                where: {
                    email
                }
            });
            if (existingUser) {
                return res.status(409).json({
                    error: "User already exists"
                });
            }
            const hashedPassword = await external_bcrypt_default().hash(password, 10);
            const newUser = await prisma.user.create({
                data: {
                    email,
                    password: hashedPassword,
                    username,
                    role
                }
            });
            return res.status(201).json({
                message: "User registered successfully",
                user: {
                    id: newUser.id,
                    email: newUser.email,
                    username: newUser.username,
                    role: newUser.role
                }
            });
        } catch (err) {
            console.error("Error during user registration:", err);
            return res.status(500).json({
                error: "Internal Server Error",
                err
            });
        }
    } else {
        res.setHeader("Allow", [
            "POST"
        ]);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}


/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../../webpack-api-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = (__webpack_exec__(6080));
module.exports = __webpack_exports__;

})();