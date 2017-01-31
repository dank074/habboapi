! function(e) {
    function t(d) {
        if (n[d]) return n[d].exports;
        var u = n[d] = {
            exports: {},
            id: d,
            loaded: !1
        };
        return e[d].call(u.exports, u, u.exports, t), u.loaded = !0, u.exports
    }
    var n = {};
    return t.m = e, t.c = n, t.p = "", t(0)
}([function(e, t, n) {
    "use strict";

    function d(e) {
        return e && e.__esModule ? e : {
            "default": e
        }
    }
    var u = n(1),
        i = d(u),
        r = n(4),
        o = d(r),
        c = n(6),
        a = d(c),
        l = n(9),
        s = d(l);
    ! function(e) {
        e.module("ngMaterialSidemenu", ["ngMaterial"]).directive(i["default"].name, i["default"].directive).directive(o["default"].name, o["default"].directive).directive(a["default"].name, a["default"].directive).directive(s["default"].name, s["default"].directive)
    }(angular)
}, function(e, t, n) {
    "use strict";

    function d(e) {
        return e && e.__esModule ? e : {
            "default": e
        }
    }
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var u = n(2),
        i = d(u),
        r = n(3),
        o = d(r),
        c = function() {
            return {
                restrict: "E",
                scope: {
                    locked: "@?mdLocked"
                },
                replace: !0,
                transclude: !0,
                template: i["default"],
                link: o["default"]
            }
        };
    t["default"] = {
        name: "mdSidemenu",
        directive: c
    }
}, function(e, t) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    }), t["default"] = function(e, t) {
        var n = t.locked && "md-sidemenu-locked";
        return '<div class="md-sidemenu ' + n + '" ng-transclude></div>'
    }
}, function(e, t) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    }), t["default"] = function(e, t, n) {
        e.$watch(function() {
            return n.locked
        }, function(e) {
            e ? t[0].classList.add("md-sidemenu-locked") : t[0].classList.remove("md-sidemenu-locked")
        })
    }
}, function(e, t, n) {
    "use strict";

    function d(e) {
        return e && e.__esModule ? e : {
            "default": e
        }
    }
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var u = n(5),
        i = d(u),
        r = function() {
            return {
                restrict: "E",
                replace: !0,
                transclude: !0,
                template: i["default"]
            }
        };
    t["default"] = {
        name: "mdSidemenuGroup",
        directive: r
    }
}, function(e, t) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    }), t["default"] = function() {
        return '<div class="md-sidemenu-group" flex layout="column" layout-align="start start" ng-transclude></div>'
    }
}, function(e, t, n) {
    "use strict";

    function d(e) {
        return e && e.__esModule ? e : {
            "default": e
        }
    }
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var u = n(7),
        i = d(u),
        r = n(8),
        o = d(r),
        c = function() {
            return {
                restrict: "E",
                scope: {
                    heading: "@mdHeading",
                    icon: "@?mdIcon",
                    svgIcon: "@?mdSvgIcon",
                    arrow: "@?mdArrow"
                },
                replace: !0,
                transclude: !0,
                template: o["default"],
                controller: i["default"],
                controllerAs: "$mdSidemenuContent",
                bindToController: !0
            }
        };
    t["default"] = {
        name: "mdSidemenuContent",
        directive: c
    }
}, function(e, t) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    }), t["default"] = function() {
        this.visible = !1, this.changeState = function() {
            this.visible = !this.visible
        }
    }
}, function(e, t) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    }), t["default"] = function() {
        return '\n<div class="md-sidemenu-content" layout="column">\n<md-button class="md-sidemenu-toggle" ng-if="$mdSidemenuContent.heading" ng-click="$mdSidemenuContent.changeState();" ng-class="{ \'md-active\': $mdSidemenuContent.visible }">\n  <div layout="row">\n    <md-icon ng-if="$mdSidemenuContent.svgIcon" md-svg-icon="$mdSidemenuContent.svgIcon"></md-icon>\n    <md-icon ng-if="$mdSidemenuContent.icon">{{ $mdSidemenuContent.icon }}</md-icon>\n    <span flex>{{ $mdSidemenuContent.heading }}</span>\n    <md-icon ng-if="$mdSidemenuContent.arrow">keyboard_arrow_down</md-icon>\n  </div>\n</md-button>\n\n<div class="md-sidemenu-wrapper" md-sidemenu-disable-animate ng-class="{ \'md-active\': $mdSidemenuContent.visible, \'md-sidemenu-wrapper-icons\':  $mdSidemenuContent.icon }" layout="column" ng-transclude></div>\n</div>\n'
    }
}, function(e, t, n) {
    "use strict";

    function d(e) {
        return e && e.__esModule ? e : {
            "default": e
        }
    }
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var u = n(10),
        i = d(u),
        r = n(11),
        o = d(r),
        c = function() {
            return {
                restrict: "E",
                scope: {
                    uiSref: "@?",
                    uiSrefActive: "@?",
                    href: "@?",
                    target: "@?"
                },
                transclude: !0,
                template: o["default"],
                controller: i["default"],
                controllerAs: "$mdSidemenuButton",
                bindToController: !0
            }
        };
    t["default"] = {
        name: "mdSidemenuButton",
        directive: c
    }
}, function(e, t) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    }), t["default"] = function() {}
}, function(e, t) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    }), t["default"] = function() {
		console.log('<md-button class="md-sidemenu-button" layout="column" ng-attr-ui-sref="{{ $mdSidemenuButton.uiSref }}" ng-attr-ui-sref-active="{{ $mdSidemenuButton.uiSrefActive }}" ng-attr-target="{{ $mdSidemenuButton.target }}"><div layout="row" layout-fill layout-align="start center" ng-transclude></div></md-button>');
        return '<md-button class="md-sidemenu-button" layout="column" ng-attr-ui-sref="{{ $mdSidemenuButton.uiSref }}" ng-attr-ui-sref-active="{{ $mdSidemenuButton.uiSrefActive }}" ng-attr-target="{{ $mdSidemenuButton.target }}"><div layout="row" layout-fill layout-align="start center" ng-transclude></div></md-button>'
    }
}]);