exports.id = 194;
exports.ids = [194];
exports.modules = {

/***/ 46:
/***/ ((module) => {

// Exports
module.exports = {
	"spinner": "Loading_spinner__0OVPs",
	"spin": "Loading_spin__BEOIA"
};


/***/ }),

/***/ 2058:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _Loading_module_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(46);
/* harmony import */ var _Loading_module_css__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_Loading_module_css__WEBPACK_IMPORTED_MODULE_1__);


const Loading = ()=>{
    return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
        className: "flex flex-row justify-center items-center h-screen bg-[#15202B] ",
        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
            className: `${(_Loading_module_css__WEBPACK_IMPORTED_MODULE_1___default().spinner)} border-4 border-t-4 border-blue-500 font-black border-solid rounded-full`,
            children: "."
        })
    });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Loading);


/***/ }),

/***/ 3070:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "b": () => (/* binding */ getUserInfo)
/* harmony export */ });
const getUserInfo = async (token)=>{
    if (token) {
        try {
            const response = await fetch("/api/profile/dashboard", {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            if (!response.ok) {
                console.error("Failed to fetch user data");
                return;
            }
            const data = await response.json();
            return data.user;
        } catch (err) {
            console.error("Error fetching user data:", err);
        }
    }
};


/***/ })

};
;