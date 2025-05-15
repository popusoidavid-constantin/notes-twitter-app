(() => {
var exports = {};
exports.id = 888;
exports.ids = [888];
exports.modules = {

/***/ 3397:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": () => (/* binding */ _app)
});

// EXTERNAL MODULE: external "react/jsx-runtime"
var jsx_runtime_ = __webpack_require__(997);
// EXTERNAL MODULE: external "react"
var external_react_ = __webpack_require__(6689);
// EXTERNAL MODULE: external "next/router"
var router_ = __webpack_require__(1853);
// EXTERNAL MODULE: ../../packages/app-main/utils/getUserInfo.tsx
var getUserInfo = __webpack_require__(3070);
// EXTERNAL MODULE: ../../node_modules/.pnpm/next@13.1.1_react-dom@18.2.0_react@18.2.0__react@18.2.0/node_modules/next/link.js
var next_link = __webpack_require__(8317);
var link_default = /*#__PURE__*/__webpack_require__.n(next_link);
// EXTERNAL MODULE: ./components/ui/loading.tsx
var ui_loading = __webpack_require__(2058);
;// CONCATENATED MODULE: ../../packages/app-main/src/MainApp.tsx






function MainApp({ children  }) {
    const router = (0,router_.useRouter)();
    const [user, setUser] = (0,external_react_.useState)(null);
    const [loading, setLoading] = (0,external_react_.useState)(true);
    const isActiveLink = (path)=>router.pathname === path;
    const fetchUserInfo = async (token)=>{
        try {
            const userInfo = await (0,getUserInfo/* getUserInfo */.b)(token);
            setUser(userInfo);
        } catch (err) {
            console.error("Failed to fetch user info:", err);
        } finally{
            setLoading(false);
        }
    };
    (0,external_react_.useEffect)(()=>{
        const token = localStorage.getItem("token");
        if (!token) {
            router.replace("/");
            return;
        }
        fetchUserInfo(token);
    }, [
        router
    ]);
    const handleLogout = async ()=>{
        try {
            const res = await fetch("/api/auth/logout", {
                method: "POST"
            });
            if (res.ok) {
                localStorage.removeItem("token");
                router.push("/");
            } else {
                console.error("Failed to log out");
            }
        } catch (err) {
            console.error("An error occurred during logout:", err);
        }
    };
    if (loading) {
        return /*#__PURE__*/ jsx_runtime_.jsx(ui_loading/* default */.Z, {});
    }
    if (!user) {
        return /*#__PURE__*/ (0,jsx_runtime_.jsxs)(jsx_runtime_.Fragment, {
            children: [
                /*#__PURE__*/ jsx_runtime_.jsx("p", {
                    children: "User not found."
                }),
                /*#__PURE__*/ (0,jsx_runtime_.jsxs)("button", {
                    onClick: ()=>{
                        localStorage.removeItem("token");
                        router.push("/");
                    },
                    children: [
                        " ",
                        "Go to login"
                    ]
                })
            ]
        });
    }
    let navBar;
    if (router.pathname.startsWith("/notes") && user.role === "STUDENT") {
        navBar = /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
            className: "w-[50%] h-16 bg-[#263340] flex justify-between items-center px-6 text-white",
            children: [
                /*#__PURE__*/ jsx_runtime_.jsx((link_default()), {
                    href: "/notes/new",
                    className: `px-4 py-2 ${isActiveLink("/notes/new") ? "underline" : ""} hover:bg-blue-700 rounded-lg`,
                    children: "New Note"
                }),
                /*#__PURE__*/ jsx_runtime_.jsx((link_default()), {
                    href: "/notes/my-notes",
                    className: `px-4 py-2 ${isActiveLink("/notes/my-notes") ? "underline" : ""} hover:bg-blue-700 rounded-lg`,
                    children: "My Notes"
                }),
                /*#__PURE__*/ jsx_runtime_.jsx((link_default()), {
                    href: "/notes",
                    className: `px-4 py-2 ${isActiveLink("/notes") ? "underline" : ""} hover:bg-blue-700 rounded-lg`,
                    children: "Public Notes"
                })
            ]
        });
    }
    if (router.pathname.startsWith("/notes") && user.role === "TEACHER") {
        navBar = /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
            className: "w-[50%] h-16 bg-[#263340] flex justify-between items-center px-6 text-white",
            children: [
                /*#__PURE__*/ jsx_runtime_.jsx((link_default()), {
                    href: "/notes/new",
                    className: `px-4 py-2 ${isActiveLink("/notes/new") ? "underline" : ""} hover:bg-blue-700 rounded-lg`,
                    children: "New Note"
                }),
                /*#__PURE__*/ jsx_runtime_.jsx((link_default()), {
                    href: "/notes/my-notes",
                    className: `px-4 py-2 ${isActiveLink("/notes/my-notes") ? "underline" : ""} hover:bg-blue-700 rounded-lg`,
                    children: "My Notes"
                }),
                /*#__PURE__*/ jsx_runtime_.jsx((link_default()), {
                    href: "/notes/students-notes",
                    className: `px-4 py-2 ${isActiveLink("/notes/students-notes") ? "underline" : ""} hover:bg-blue-700 rounded-lg`,
                    children: "Student Notes"
                }),
                /*#__PURE__*/ jsx_runtime_.jsx((link_default()), {
                    href: "/notes",
                    className: `px-4 py-2 ${isActiveLink("/notes") ? "underline" : ""} hover:bg-blue-700 rounded-lg`,
                    children: "Public Notes"
                })
            ]
        });
    }
    if (router.pathname.startsWith("/twitter")) {
        navBar = /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
            className: "w-[50%] h-16 bg-[#263340] flex justify-between items-center px-6 text-white",
            children: [
                /*#__PURE__*/ jsx_runtime_.jsx((link_default()), {
                    href: "/twitter/new",
                    className: `px-4 py-2 ${isActiveLink("/twitter/new") ? "underline" : ""} hover:bg-blue-700 rounded-lg`,
                    children: "New Post"
                }),
                /*#__PURE__*/ jsx_runtime_.jsx((link_default()), {
                    href: "/twitter/my-posts",
                    className: `px-4 py-2 ${isActiveLink("/twitter/my-posts") ? "underline" : ""} hover:bg-blue-700 rounded-lg`,
                    children: "My Posts"
                }),
                /*#__PURE__*/ jsx_runtime_.jsx((link_default()), {
                    href: "/twitter",
                    className: `px-4 py-2 ${isActiveLink("/twitter") ? "underline" : ""} hover:bg-blue-700 rounded-lg`,
                    children: "Feed"
                })
            ]
        });
    }
    return /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
        className: "flex h-screen bg-[#15202B]",
        children: [
            /*#__PURE__*/ (0,jsx_runtime_.jsxs)("aside", {
                className: "w-20 bg-blue-900 flex flex-col items-center pt-6 space-y-6",
                children: [
                    /*#__PURE__*/ jsx_runtime_.jsx("button", {
                        onClick: ()=>router.push("/notes"),
                        className: "border-2 border-white text-white px-4 py-2 rounded-xl hover:bg-blue-700 transition duration-200",
                        children: "\uD83D\uDCDD"
                    }),
                    /*#__PURE__*/ jsx_runtime_.jsx("button", {
                        onClick: ()=>router.push("/twitter"),
                        className: "border-2 border-white text-white px-4 py-2 rounded-xl hover:bg-blue-700 transition duration-200",
                        children: "\uD83D\uDC26"
                    })
                ]
            }),
            /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                className: "flex-1 flex flex-col",
                children: [
                    /*#__PURE__*/ (0,jsx_runtime_.jsxs)("header", {
                        className: "h-16 bg-[#1E2732] flex justify-between items-center px-6 text-white",
                        children: [
                            navBar,
                            /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                                className: "w-[20%] h-16 flex justify-between items-center px-4",
                                children: [
                                    /*#__PURE__*/ jsx_runtime_.jsx((link_default()), {
                                        href: "/dashboard",
                                        className: "text-lg font-semibold hover:text-blue-400 transition duration-200",
                                        children: user.username
                                    }),
                                    /*#__PURE__*/ jsx_runtime_.jsx("button", {
                                        onClick: handleLogout,
                                        className: "px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition duration-200",
                                        children: "Logout"
                                    })
                                ]
                            })
                        ]
                    }),
                    /*#__PURE__*/ jsx_runtime_.jsx("main", {
                        className: "flex-1 overflow-auto p-6",
                        children: children
                    })
                ]
            })
        ]
    });
}

// EXTERNAL MODULE: ./styles/globals.css
var globals = __webpack_require__(960);
;// CONCATENATED MODULE: ./pages/_app.tsx





function MyApp({ Component , pageProps  }) {
    const [token, setToken] = (0,external_react_.useState)("");
    const router = (0,router_.useRouter)();
    (0,external_react_.useEffect)(()=>{
        const storedToken = localStorage.getItem("token");
        if (!storedToken) {
            setToken(undefined);
        }
        setToken(storedToken);
    }, [
        router
    ]);
    if (token === undefined) {
        router.replace("/");
    }
    if (!token) {
        return /*#__PURE__*/ jsx_runtime_.jsx(Component, {
            ...pageProps
        });
    }
    return /*#__PURE__*/ jsx_runtime_.jsx(MainApp, {
        children: /*#__PURE__*/ jsx_runtime_.jsx(Component, {
            ...pageProps
        })
    });
}
/* harmony default export */ const _app = (MyApp);


/***/ }),

/***/ 960:
/***/ (() => {



/***/ }),

/***/ 3280:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/app-router-context.js");

/***/ }),

/***/ 2796:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/head-manager-context.js");

/***/ }),

/***/ 4014:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/i18n/normalize-locale-path.js");

/***/ }),

/***/ 8524:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/is-plain-object.js");

/***/ }),

/***/ 8020:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/mitt.js");

/***/ }),

/***/ 4406:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/page-path/denormalize-page-path.js");

/***/ }),

/***/ 4964:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/router-context.js");

/***/ }),

/***/ 1751:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/router/utils/add-path-prefix.js");

/***/ }),

/***/ 6220:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/router/utils/compare-states.js");

/***/ }),

/***/ 299:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/router/utils/format-next-pathname-info.js");

/***/ }),

/***/ 3938:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/router/utils/format-url.js");

/***/ }),

/***/ 9565:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/router/utils/get-asset-path-from-route.js");

/***/ }),

/***/ 5789:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/router/utils/get-next-pathname-info.js");

/***/ }),

/***/ 1897:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/router/utils/is-bot.js");

/***/ }),

/***/ 1428:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/router/utils/is-dynamic.js");

/***/ }),

/***/ 8854:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/router/utils/parse-path.js");

/***/ }),

/***/ 1292:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/router/utils/parse-relative-url.js");

/***/ }),

/***/ 4567:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/router/utils/path-has-prefix.js");

/***/ }),

/***/ 979:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/router/utils/querystring.js");

/***/ }),

/***/ 3297:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/router/utils/remove-trailing-slash.js");

/***/ }),

/***/ 6052:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/router/utils/resolve-rewrites.js");

/***/ }),

/***/ 4226:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/router/utils/route-matcher.js");

/***/ }),

/***/ 5052:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/router/utils/route-regex.js");

/***/ }),

/***/ 9232:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/utils.js");

/***/ }),

/***/ 1853:
/***/ ((module) => {

"use strict";
module.exports = require("next/router");

/***/ }),

/***/ 6689:
/***/ ((module) => {

"use strict";
module.exports = require("react");

/***/ }),

/***/ 6405:
/***/ ((module) => {

"use strict";
module.exports = require("react-dom");

/***/ }),

/***/ 997:
/***/ ((module) => {

"use strict";
module.exports = require("react/jsx-runtime");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, [757,324,317,194], () => (__webpack_exec__(3397)));
module.exports = __webpack_exports__;

})();