"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SpaceMe = exports.PadMe = exports.CypressTestDecorator = exports.getComponent = void 0;
var react_1 = __importDefault(require("react"));
var styled_components_1 = __importStar(require("styled-components"));
// plasma-web
var typo_1 = require("@sberdevices/plasma-tokens-web/typo");
var themes_1 = require("@sberdevices/plasma-tokens-web/themes");
// plasma-ui
var themes_2 = require("@sberdevices/plasma-tokens/themes");
// plasma-b2c
var themes_3 = require("@sberdevices/plasma-tokens-b2c/themes");
var typo_2 = require("@sberdevices/plasma-tokens-b2c/typo");
// TODO: better naming
var TypoThemeStyle = styled_components_1.createGlobalStyle(typo_1.web);
var ColorThemeStyle = styled_components_1.createGlobalStyle(themes_1.light);
var ThemeStyle = styled_components_1.createGlobalStyle(themes_2.darkSber);
var TypoB2CStyle = styled_components_1.createGlobalStyle(typo_2.b2c);
var ColorB2CStyle = styled_components_1.createGlobalStyle(themes_3.dark);
exports.getComponent = function (componentName) {
    // eslint-disable-next-line
    // @ts-ignore
    var pkgName = Cypress.env('package');
    if (!pkgName) {
        throw new Error('Add package env to your Cypress config');
    }
    var check = function (component) {
        if (!component) {
            throw new Error("Library " + pkgName + " has no " + componentName);
        }
    };
    if (pkgName === 'plasma-ui') {
        // eslint-disable-next-line
        var pkg = require('../../../packages/plasma-ui');
        var component = pkg[componentName];
        check(component);
        return component;
    }
    if (pkgName === 'plasma-web') {
        // eslint-disable-next-line
        var pkg = require('../../../packages/plasma-web');
        var component = pkg[componentName];
        check(component);
        return component;
    }
    if (pkgName === 'plasma-b2c') {
        // eslint-disable-next-line
        var pkg = require('../../../packages/plasma-b2c');
        var component = pkg[componentName];
        check(component);
        return component;
    }
    throw new Error("Library " + pkgName + " is not required in plasma-core/CypressHelpers:getComponent");
};
exports.CypressTestDecorator = function (_a) {
    var children = _a.children;
    // eslint-disable-next-line
    // @ts-ignore
    var pkgName = Cypress.env('package');
    if (pkgName === 'plasma-ui') {
        var DeviceThemeProvider = exports.getComponent('DeviceThemeProvider');
        return (react_1.default.createElement(DeviceThemeProvider, null,
            react_1.default.createElement(ThemeStyle, null),
            children));
    }
    if (pkgName === 'plasma-web') {
        return (react_1.default.createElement(react_1.default.Fragment, null,
            react_1.default.createElement(TypoThemeStyle, null),
            react_1.default.createElement(ColorThemeStyle, null),
            children));
    }
    if (pkgName === 'plasma-b2c') {
        return (react_1.default.createElement(react_1.default.Fragment, null,
            react_1.default.createElement(TypoB2CStyle, null),
            react_1.default.createElement(ColorB2CStyle, null),
            children));
    }
    return react_1.default.createElement(react_1.default.Fragment, null, children);
};
exports.PadMe = styled_components_1.default.div(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n    padding: 5px;\n"], ["\n    padding: 5px;\n"])));
exports.SpaceMe = styled_components_1.default.span(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n    padding: 5px;\n"], ["\n    padding: 5px;\n"])));
var templateObject_1, templateObject_2;
//# sourceMappingURL=CypressHelpers.js.map