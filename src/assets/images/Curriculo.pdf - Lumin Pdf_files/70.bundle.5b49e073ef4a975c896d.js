(window.webpackJsonp=window.webpackJsonp||[]).push([[70],{2268:function(e,_,t){"use strict";t.r(_),function(e){var a,r=t(38),l=t(152),o=t(1122),n=t(7),s=t(13),i=t(2269);(a="undefined"!=typeof reactHotLoaderGlobal?reactHotLoaderGlobal.enterModule:void 0)&&a(e);"undefined"!=typeof reactHotLoaderGlobal&&reactHotLoaderGlobal.default.signature;var p,u,c="AnnotationCreateRubberStamp",E=function(e){return{isDisabled:s.a.isElementDisabled(e,"stampOverlay"),isOpen:s.a.isElementOpen(e,"stampOverlay"),activeToolName:s.a.getActiveToolName(e),isActive:s.a.getActiveToolName(e)===c,toolButtonObjects:s.a.getToolButtonObjects(e),dataElement:s.a.getToolButtonObjects(e)[c].dataElement}},O={closeElements:n.a.closeElements,closeElement:n.a.closeElement,openElement:n.a.openElement,toggleElement:n.a.toggleElement},d=Object(r.b)(E,O)(Object(l.c)()(Object(o.a)(i.a)));_.default=d,(p="undefined"!=typeof reactHotLoaderGlobal?reactHotLoaderGlobal.default:void 0)&&(p.register(c,"TOOL_NAME","/usr/src/app/src/lumin-components/StampOverlay/index.js"),p.register(E,"mapStateToProps","/usr/src/app/src/lumin-components/StampOverlay/index.js"),p.register(O,"mapDispatchToProps","/usr/src/app/src/lumin-components/StampOverlay/index.js"),p.register(d,"default","/usr/src/app/src/lumin-components/StampOverlay/index.js")),(u="undefined"!=typeof reactHotLoaderGlobal?reactHotLoaderGlobal.leaveModule:void 0)&&u(e)}.call(this,t(2)(e))},2269:function(module,__webpack_exports__,__webpack_require__){"use strict";(function(module){var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__(8),_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default=__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__),_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__(15),_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default=__webpack_require__.n(_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__),_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__(26),_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_2___default=__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_2__),_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__(27),_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_3___default=__webpack_require__.n(_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_3__),_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__(21),_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_4___default=__webpack_require__.n(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_4__),_babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_5__=__webpack_require__(40),_babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_5___default=__webpack_require__.n(_babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_5__),_babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_6__=__webpack_require__(43),_babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_6___default=__webpack_require__.n(_babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_6__),_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_7__=__webpack_require__(25),_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_7___default=__webpack_require__.n(_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_7__),_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_8__=__webpack_require__(5),_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_8___default=__webpack_require__.n(_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_8__),react__WEBPACK_IMPORTED_MODULE_9__=__webpack_require__(0),react__WEBPACK_IMPORTED_MODULE_9___default=__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_9__),prop_types__WEBPACK_IMPORTED_MODULE_10__=__webpack_require__(1),prop_types__WEBPACK_IMPORTED_MODULE_10___default=__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_10__),classnames__WEBPACK_IMPORTED_MODULE_11__=__webpack_require__(1116),classnames__WEBPACK_IMPORTED_MODULE_11___default=__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_11__),helpers_getToolStylePopupPositionBasedOn__WEBPACK_IMPORTED_MODULE_12__=__webpack_require__(1262),core__WEBPACK_IMPORTED_MODULE_13__=__webpack_require__(3),constants_defaultTool__WEBPACK_IMPORTED_MODULE_14__=__webpack_require__(75),_StampOverlay_scss__WEBPACK_IMPORTED_MODULE_15__=__webpack_require__(2270),_StampOverlay_scss__WEBPACK_IMPORTED_MODULE_15___default=__webpack_require__.n(_StampOverlay_scss__WEBPACK_IMPORTED_MODULE_15__),enterModule;function _createSuper(e){function _(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(e){return!1}}return function(){var t,a=_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_7___default()(e);if(_()){var r=_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_7___default()(this).constructor;t=Reflect.construct(a,arguments,r)}else t=a.apply(this,arguments);return _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_6___default()(this,t)}}enterModule="undefined"!=typeof reactHotLoaderGlobal?reactHotLoaderGlobal.enterModule:void 0,enterModule&&enterModule(module);var __signature__="undefined"!=typeof reactHotLoaderGlobal?reactHotLoaderGlobal.default.signature:function(e){return e},TOOL_NAME="AnnotationCreateRubberStamp",canvasWidth=160,canvasHeight=58,StampOverlay=function(_React$Component){_babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_5___default()(StampOverlay,_React$Component);var _super=_createSuper(StampOverlay);function StampOverlay(e){var _;return _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_2___default()(this,StampOverlay),_=_super.call(this,e),_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_8___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_4___default()(_),"handleClickOutside",(function(e){var t=document.querySelector('[data-element="toolStylePopup"]'),a=document.querySelector('[data-element="toolsOverlay"]'),r=null==a?void 0:a.contains(e.target),l=document.querySelector('[data-element="header"]'),o=null==t?void 0:t.contains(e.target),n=null==l?void 0:l.contains(e.target),s=e.target.getAttribute("data-element")===_.props.dataElement;_.props.isActive&&_.props.toggleElement("stampOverlay"),s||(_.props.closeElement("stampOverlay"),_.props.activeToolName!==TOOL_NAME||o||n||r||_.state.isStampSelected||core__WEBPACK_IMPORTED_MODULE_13__.a.setToolMode(constants_defaultTool__WEBPACK_IMPORTED_MODULE_14__.a))})),_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_8___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_4___default()(_),"setOverlayPosition",(function(){var e=document.querySelector('[data-element="'.concat(_.props.dataElement,'"]'));if(e&&_.overlay.current){var t=Object(helpers_getToolStylePopupPositionBasedOn__WEBPACK_IMPORTED_MODULE_12__.a)(e,_.overlay);_.setState(t)}})),_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_8___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_4___default()(_),"getDefaultRubberStamps",function(){var e=_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default()(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark((function e(t){var a,r,l;return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(_.state.defaultAnnotations.length&&!t){e.next=7;break}return a=_.stampTool.getDefaultStampAnnotations(),e.next=4,Promise.all(a.map((function(e){var t=_.props.t("rubberStamp.".concat(e.Icon)),a={canvasWidth:canvasWidth,canvasHeight:canvasHeight,text:t};return _.stampTool.getPreview(e,a)})));case 4:r=e.sent,l=a.map((function(e,_){return{annotation:e,imgSrc:r[_]}})),_.setState({defaultAnnotations:l,language:_.props.i18n.language});case 7:case"end":return e.stop()}}),e)})));return function(_){return e.apply(this,arguments)}}()),_.overlay=react__WEBPACK_IMPORTED_MODULE_9___default.a.createRef(),_.state={left:0,right:"auto",top:0,defaultAnnotations:[],language:e.i18n.language,isStampSelected:!1},_.stampTool=core__WEBPACK_IMPORTED_MODULE_13__.a.getTool(TOOL_NAME),_}return _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_3___default()(StampOverlay,[{key:"componentDidUpdate",value:function(e){var _=this.state.language&&this.props.i18n.language!==this.state.language;e.activeToolName!==this.props.activeToolName&&this.props.activeToolName===TOOL_NAME?(this.setState({isStampSelected:!1}),this.props.openElement("stampOverlay"),this.setOverlayPosition(),this.getDefaultRubberStamps(_)):this.props.isOpen&&_&&this.getDefaultRubberStamps(_)}},{key:"setRubberStamp",value:function(e){core__WEBPACK_IMPORTED_MODULE_13__.a.setToolMode(TOOL_NAME),this.props.closeElement("stampOverlay");var _=this.props.t("rubberStamp.".concat(e.Icon));this.stampTool.setRubberStamp(e,_),this.stampTool.showPreview(),this.setState({isStampSelected:!0})}},{key:"render",value:function(){var e=this,_=this.state,t=_.left,a=_.top,r=_.defaultAnnotations,l=this.props,o=l.isDisabled,n=l.isOpen;if(o)return null;var s=null;n&&(s=r.map((function(_,t){var a=_.imgSrc,r=_.annotation;return react__WEBPACK_IMPORTED_MODULE_9___default.a.createElement("div",{key:t,className:"rubber-stamp",onClick:function(){return e.setRubberStamp(r)}},react__WEBPACK_IMPORTED_MODULE_9___default.a.createElement("img",{src:a}))})));var i=classnames__WEBPACK_IMPORTED_MODULE_11___default()({Overlay:!0,StampOverlay:!0,open:n,closed:!n});return react__WEBPACK_IMPORTED_MODULE_9___default.a.createElement("div",{className:i,ref:this.overlay,style:{left:t,top:a},"data-element":"stampOverlay"},react__WEBPACK_IMPORTED_MODULE_9___default.a.createElement("div",{className:"default-stamp-container"},react__WEBPACK_IMPORTED_MODULE_9___default.a.createElement("div",{className:"modal-body"},s)))}},{key:"__reactstandin__regenerateByEval",value:function __reactstandin__regenerateByEval(key,code){this[key]=eval(code)}}]),StampOverlay}(react__WEBPACK_IMPORTED_MODULE_9___default.a.Component);_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_8___default()(StampOverlay,"propTypes",{activeToolName:prop_types__WEBPACK_IMPORTED_MODULE_10___default.a.string,isDisabled:prop_types__WEBPACK_IMPORTED_MODULE_10___default.a.bool,isOpen:prop_types__WEBPACK_IMPORTED_MODULE_10___default.a.bool,isActive:prop_types__WEBPACK_IMPORTED_MODULE_10___default.a.bool,t:prop_types__WEBPACK_IMPORTED_MODULE_10___default.a.func.isRequired,i18n:prop_types__WEBPACK_IMPORTED_MODULE_10___default.a.any,toolButtonObjects:prop_types__WEBPACK_IMPORTED_MODULE_10___default.a.object.isRequired,openElement:prop_types__WEBPACK_IMPORTED_MODULE_10___default.a.func.isRequired,closeElement:prop_types__WEBPACK_IMPORTED_MODULE_10___default.a.func.isRequired,closeElements:prop_types__WEBPACK_IMPORTED_MODULE_10___default.a.func.isRequired,dataElement:prop_types__WEBPACK_IMPORTED_MODULE_10___default.a.string.isRequired,toggleElement:prop_types__WEBPACK_IMPORTED_MODULE_10___default.a.func.isRequired});var _default=StampOverlay,reactHotLoader,leaveModule;__webpack_exports__.a=_default,reactHotLoader="undefined"!=typeof reactHotLoaderGlobal?reactHotLoaderGlobal.default:void 0,reactHotLoader&&(reactHotLoader.register(TOOL_NAME,"TOOL_NAME","/usr/src/app/src/lumin-components/StampOverlay/StampOverlay.js"),reactHotLoader.register(canvasWidth,"canvasWidth","/usr/src/app/src/lumin-components/StampOverlay/StampOverlay.js"),reactHotLoader.register(canvasHeight,"canvasHeight","/usr/src/app/src/lumin-components/StampOverlay/StampOverlay.js"),reactHotLoader.register(StampOverlay,"StampOverlay","/usr/src/app/src/lumin-components/StampOverlay/StampOverlay.js"),reactHotLoader.register(_default,"default","/usr/src/app/src/lumin-components/StampOverlay/StampOverlay.js")),leaveModule="undefined"!=typeof reactHotLoaderGlobal?reactHotLoaderGlobal.leaveModule:void 0,leaveModule&&leaveModule(module)}).call(this,__webpack_require__(2)(module))},2270:function(e,_,t){var a=t(44),r=t(2271);"string"==typeof(r=r.__esModule?r.default:r)&&(r=[[e.i,r,""]]);var l={injectType:"singletonStyleTag",insert:"head",singleton:!0},o=(a(r,l),r.locals?r.locals:{});e.exports=o},2271:function(e,_,t){(_=t(45)(!1)).push([e.i,".open.StampOverlay{visibility:visible;opacity:1}.closed.StampOverlay{visibility:hidden;opacity:0}.StampOverlay{position:absolute;z-index:201;display:flex;flex-wrap:wrap;border:2px solid;font-size:14px;color:#273d57;border-radius:2px;box-shadow:0 6px 18px -7px #5e88b3;font-family:NunitoSans,Montserrat,sans-serif}.theme-light .StampOverlay{border-color:#c0d0df}.theme-dark .StampOverlay{border-color:#8093a7}.StampOverlay{top:46px;width:232px;border-radius:4px 0 0 4px;box-shadow:0 2px 16px 0 #e1e1e3;width:354px;padding:16px}.StampOverlay .rubber-stamp{float:left;height:48px;width:160px}.StampOverlay .rubber-stamp img{width:100%;height:100%;cursor:pointer}.StampOverlay .rubber-stamp:hover{background:#f6f6f6;background:var(--button-hover-color)}.default-stamp-container .column{padding:10px}.default-stamp-container .column:hover{background:#f6f6f6;background:var(--button-hover-color)}",""]),e.exports=_}}]);