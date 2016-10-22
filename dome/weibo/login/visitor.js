/**
 * Created by wplct on 2016/10/14.
 */
window.ufp = window.ufp || {};
window.ufp.config = {
    platforms: [["Win", 1], ["Mac", 2], ["Linux", 3], ["FreeBSD", 4], ["iPhone", 21.1], ["iPod", 21.2], ["iPad", 21.3], ["Win.*CE", 12.1], ["Win.*Mobile", 12.2], ["Pocket\\s*PC", 12.3], ["", 999]],
    plugins: {
        "驱动精灵在线版1.0.0.5": {
            classid: "clsid:A9EA64C1-D146-4B99-86A7-68B1786D82C0",
            filename: "dgweb.dll",
            name: "驱动精灵在线版",
            version: "1.0.0.5"
        },
        "PPLive Lite Class ver 3.1.8.6046": {
            classid: "clsid:EF0D1A14-1033-41A2-A589-240C01EDC078",
            filename: "pplugin2.dll",
            name: "PPLive Lite Class",
            version: "3.1.8.6046"
        },
        "baiduplayer Browser Plugin": {
            classid: "clsid:02E2D748-67F8-48B4-8AB4-0A085374BB99",
            filename: "npxbdyy.dll",
            name: "BaiduPlayer Browser Plugin"
        },
        "webmod Class": {classid: "clsid:FEE3C8C5-9BEA-4079-AB36-63ECABFC7392", filename: "Alidcp.dll"}
    },
    Detectable_Components_in_Internet_Explorer_by_capclient: {
        "Address Book": "7790769C-0471-11D2-AF11-00C04FA35D02",
        "Windows Desktop Update NT": "89820200-ECBD-11CF-8B85-00AA005B4340",
        DirectAnimation: "283807B5-2C60-11D0-A31D-00AA00B92C03",
        "DirectAnimation Java Classes": "4F216970-C90C-11D1-B5C7-0000F8051515",
        DirectShow: "44BBA848-CC51-11CF-AAFA-00AA00B6015C",
        "Dynamic HTML Data Binding": "9381D8F2-0288-11D0-9501-00AA00B911A5",
        "Dynamic HTML Data Binding for Java": "4F216970-C90C-11D1-B5C7-0000F8051515",
        "Internet Connection Wizard": "5A8D6EE0-3E18-11D0-821E-444553540000",
        "Internet Explorer 5 Browser": "89820200-ECBD-11CF-8B85-00AA005B4383",
        "Internet Explorer 5 Browser": "89820200-ECBD-11CF-8B85-00AA005B4383",
        "Windows Internet Explorer Classes for Java": "08B0E5C0-4FCB-11CF-AAA5-00401C608555",
        "Internet Explorer Help": "45EA75A0-A269-11D1-B5BF-0000F8051515",
        "Internet Explorer Help Engine": "DE5AED00-A4BF-11D1-9948-00C04F98BBC9",
        "Windows Media Player": "22D6F312-B0F6-11D0-94AB-0080C74C7E95",
        "NetMeeting NT": "44BBA842-CC51-11CF-AAFA-00AA00B6015B",
        "Offline Browsing Pack": "3AF36230-A269-11D1-B5BF-0000F8051515",
        "Outlook Express": "44BBA840-CC51-11CF-AAFA-00AA00B6015C",
        "Task Scheduler": "CC2A9BA0-3BDD-11D0-821E-444553540000",
        "Microsoft virtual machine": "08B0E5C0-4FCB-11CF-AAA5-00401C608500"
    },
    flashUrl_fonts: "/images/visitor/fonts.swf",
    fpPostInterface: "visitor/genvisitor",
    fpCollectInterface: "visitor/record"
};
var swfobject = function () {
    var $ = "undefined", p = "object", T = "Shockwave Flash", P = "ShockwaveFlash.ShockwaveFlash", q = "application/x-shockwave-flash", U = "SWFObjectExprInst", u = "onreadystatechange", I = window, g = document, n = navigator, O = false, N = [i], d = [], H = [], K = [], e, R, _, D, L = false, b = false, c, B, f = true, G = function () {
        var B = typeof g.getElementById != $ && typeof g.getElementsByTagName != $ && typeof g.createElement != $, G = n.userAgent.toLowerCase(), E = n.platform.toLowerCase(), H = E ? /win/.test(E) : /win/.test(G), _ = E ? /mac/.test(E) : /mac/.test(G), K = /webkit/.test(G) ? parseFloat(G.replace(/^.*webkit\/(\d+(\.\d+)?).*$/, "$1")) : false, F = !+"\v1", D = [0, 0, 0], C = null;
        if (typeof n.plugins != $ && typeof n.plugins[T] == p) {
            C = n.plugins[T].description;
            if (C && !(typeof n.mimeTypes != $ && n.mimeTypes[q] && !n.mimeTypes[q].enabledPlugin)) {
                O = true;
                F = false;
                C = C.replace(/^.*\s+(\S+\s+\S+$)/, "$1");
                D[0] = parseInt(C.replace(/^(.*)\..*$/, "$1"), 10);
                D[1] = parseInt(C.replace(/^.*\.(.*)\s.*$/, "$1"), 10);
                D[2] = /[a-zA-Z]/.test(C) ? parseInt(C.replace(/^.*[a-zA-Z]+(.*)$/, "$1"), 10) : 0;
            }
        } else {
            if (typeof I.ActiveXObject != $) {
                try {
                    var A = new ActiveXObject(P);
                    if (A) {
                        C = A.GetVariable("$version");
                        if (C) {
                            F = true;
                            C = C.split(" ")[1].split(",");
                            D = [parseInt(C[0], 10), parseInt(C[1], 10), parseInt(C[2], 10)];
                        }
                    }
                } catch (J) {
                }
            }
        }
        return {w3: B, pv: D, wk: K, ie: F, win: H, mac: _};
    }(), h = function () {
        if (!G.w3) {
            return;
        }
        if ((typeof g.readyState != $ && g.readyState == "complete") || (typeof g.readyState == $ && (g.getElementsByTagName("body")[0] || g.body))) {
            V();
        }
        if (!L) {
            if (typeof g.addEventListener != $) {
                g.addEventListener("DOMContentLoaded", V, false);
            }
            if (G.ie && G.win) {
                g.attachEvent(u, function () {
                    if (g.readyState == "complete") {
                        g.detachEvent(u, arguments.callee);
                        V();
                    }
                });
                if (I == top) {
                    (function () {
                        if (L) {
                            return;
                        }
                        try {
                            g.documentElement.doScroll("left");
                        } catch ($) {
                            setTimeout(arguments.callee, 0);
                            return;
                        }
                        V();
                    })();
                }
            }
            if (G.wk) {
                (function () {
                    if (L) {
                        return;
                    }
                    if (!/loaded|complete/.test(g.readyState)) {
                        setTimeout(arguments.callee, 0);
                        return;
                    }
                    V();
                })();
            }
            o(V);
        }
    }();

    function V() {
        if (L) {
            return;
        }
        try {
            var B = g.getElementsByTagName("body")[0].appendChild(E("span"));
            B.parentNode.removeChild(B);
        } catch ($) {
            return;
        }
        L = true;
        var A = N.length;
        for (var _ = 0; _ < A; _++) {
            N[_]();
        }
    }

    function M($) {
        if (L) {
            $();
        } else {
            N[N.length] = $;
        }
    }

    function o(_) {
        if (typeof I.addEventListener != $) {
            I.addEventListener("load", _, false);
        } else {
            if (typeof g.addEventListener != $) {
                g.addEventListener("load", _, false);
            } else {
                if (typeof I.attachEvent != $) {
                    j(I, "onload", _);
                } else {
                    if (typeof I.onload == "function") {
                        var A = I.onload;
                        I.onload = function () {
                            A();
                            _();
                        };
                    } else {
                        I.onload = _;
                    }
                }
            }
        }
    }

    function i() {
        if (O) {
            Q();
        } else {
            J();
        }
    }

    function Q() {
        var B = g.getElementsByTagName("body")[0], _ = E(p);
        _.setAttribute("type", q);
        var C = B.appendChild(_);
        if (C) {
            var A = 0;
            (function () {
                if (typeof C.GetVariable != $) {
                    var D = C.GetVariable("$version");
                    if (D) {
                        D = D.split(" ")[1].split(",");
                        G.pv = [parseInt(D[0], 10), parseInt(D[1], 10), parseInt(D[2], 10)];
                    }
                } else {
                    if (A < 10) {
                        A++;
                        setTimeout(arguments.callee, 10);
                        return;
                    }
                }
                B.removeChild(_);
                C = null;
                J();
            })();
        } else {
            J();
        }
    }

    function J() {
        var H = d.length;
        if (H > 0) {
            for (var M = 0; M < H; M++) {
                var I = d[M].id, F = d[M].callbackFn, E = {success: false, id: I};
                if (G.pv[0] > 0) {
                    var L = a(I);
                    if (L) {
                        if (A(d[M].swfVersion) && !(G.wk && G.wk < 312)) {
                            k(I, true);
                            if (F) {
                                E.success = true;
                                E.ref = s(I);
                                F(E);
                            }
                        } else {
                            if (d[M].expressInstall && C()) {
                                var _ = {};
                                _.data = d[M].expressInstall;
                                _.width = L.getAttribute("width") || "0";
                                _.height = L.getAttribute("height") || "0";
                                if (L.getAttribute("class")) {
                                    _.styleclass = L.getAttribute("class");
                                }
                                if (L.getAttribute("align")) {
                                    _.align = L.getAttribute("align");
                                }
                                var J = {}, K = L.getElementsByTagName("param"), B = K.length;
                                for (var D = 0; D < B; D++) {
                                    if (K[D].getAttribute("name").toLowerCase() != "movie") {
                                        J[K[D].getAttribute("name")] = K[D].getAttribute("value");
                                    }
                                }
                                S(_, J, I, F);
                            } else {
                                r(L);
                                if (F) {
                                    F(E);
                                }
                            }
                        }
                    }
                } else {
                    k(I, true);
                    if (F) {
                        var N = s(I);
                        if (N && typeof N.SetVariable != $) {
                            E.success = true;
                            E.ref = N;
                        }
                        F(E);
                    }
                }
            }
        }
    }

    function s(_) {
        var B = null, A = a(_);
        if (A && A.nodeName == "OBJECT") {
            if (typeof A.SetVariable != $) {
                B = A;
            } else {
                var C = A.getElementsByTagName(p)[0];
                if (C) {
                    B = C;
                }
            }
        }
        return B;
    }

    function C() {
        return !b && A("6.0.65") && (G.win || G.mac) && !(G.wk && G.wk < 312);
    }

    function S(C, F, J, L) {
        b = true;
        _ = L || null;
        D = {success: false, id: J};
        var K = a(J);
        if (K) {
            if (K.nodeName == "OBJECT") {
                e = W(K);
                R = null;
            } else {
                e = K;
                R = J;
            }
            C.id = U;
            if (typeof C.width == $ || (!/%$/.test(C.width) && parseInt(C.width, 10) < 310)) {
                C.width = "310";
            }
            if (typeof C.height == $ || (!/%$/.test(C.height) && parseInt(C.height, 10) < 137)) {
                C.height = "137";
            }
            g.title = g.title.slice(0, 47) + " - Flash Player Installation";
            var B = G.ie && G.win ? "ActiveX" : "PlugIn", A = "MMredirectURL=" + I.location.toString().replace(/&/g, "%26") + "&MMplayerType=" + B + "&MMdoctitle=" + g.title;
            if (typeof F.flashvars != $) {
                F.flashvars += "&" + A;
            } else {
                F.flashvars = A;
            }
            if (G.ie && G.win && K.readyState != 4) {
                var H = E("div");
                J += "SWFObjectNew";
                H.setAttribute("id", J);
                K.parentNode.insertBefore(H, K);
                K.style.display = "none";
                (function () {
                    if (K.readyState == 4) {
                        K.parentNode.removeChild(K);
                    } else {
                        setTimeout(arguments.callee, 10);
                    }
                })();
            }
            m(C, F, J);
        }
    }

    function r($) {
        if (G.ie && G.win && $.readyState != 4) {
            var _ = E("div");
            $.parentNode.insertBefore(_, $);
            _.parentNode.replaceChild(W($), _);
            $.style.display = "none";
            (function () {
                if ($.readyState == 4) {
                    $.parentNode.removeChild($);
                } else {
                    setTimeout(arguments.callee, 10);
                }
            })();
        } else {
            $.parentNode.replaceChild(W($), $);
        }
    }

    function W(A) {
        var _ = E("div");
        if (G.win && G.ie) {
            _.innerHTML = A.innerHTML;
        } else {
            var B = A.getElementsByTagName(p)[0];
            if (B) {
                var $ = B.childNodes;
                if ($) {
                    var C = $.length;
                    for (var D = 0; D < C; D++) {
                        if (!($[D].nodeType == 1 && $[D].nodeName == "PARAM") && !($[D].nodeType == 8)) {
                            _.appendChild($[D].cloneNode(true));
                        }
                    }
                }
            }
        }
        return _;
    }

    function m(_, F, I) {
        var J, C = a(I);
        if (G.wk && G.wk < 312) {
            return J;
        }
        if (C) {
            if (typeof _.id == $) {
                _.id = I;
            }
            if (G.ie && G.win) {
                var K = "";
                for (var L in _) {
                    if (_[L] != Object.prototype[L]) {
                        if (L.toLowerCase() == "data") {
                            F.movie = _[L];
                        } else {
                            if (L.toLowerCase() == "styleclass") {
                                K += ' class="' + _[L] + '"';
                            } else {
                                if (L.toLowerCase() != "classid") {
                                    K += " " + L + '="' + _[L] + '"';
                                }
                            }
                        }
                    }
                }
                var M = "";
                for (var B in F) {
                    if (F[B] != Object.prototype[B]) {
                        M += '<param name="' + B + '" value="' + F[B] + '" />';
                    }
                }
                C.outerHTML = '<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"' + K + ">" + M + "</object>";
                H[H.length] = _.id;
                J = a(_.id);
            } else {
                var N = E(p);
                N.setAttribute("type", q);
                for (var A in _) {
                    if (_[A] != Object.prototype[A]) {
                        if (A.toLowerCase() == "styleclass") {
                            N.setAttribute("class", _[A]);
                        } else {
                            if (A.toLowerCase() != "classid") {
                                N.setAttribute(A, _[A]);
                            }
                        }
                    }
                }
                for (var D in F) {
                    if (F[D] != Object.prototype[D] && D.toLowerCase() != "movie") {
                        Y(N, D, F[D]);
                    }
                }
                C.parentNode.replaceChild(N, C);
                J = N;
            }
        }
        return J;
    }

    function Y(B, A, _) {
        var $ = E("param");
        $.setAttribute("name", A);
        $.setAttribute("value", _);
        B.appendChild($);
    }

    function t($) {
        var _ = a($);
        if (_ && _.nodeName == "OBJECT") {
            if (G.ie && G.win) {
                _.style.display = "none";
                (function () {
                    if (_.readyState == 4) {
                        Z($);
                    } else {
                        setTimeout(arguments.callee, 10);
                    }
                })();
            } else {
                _.parentNode.removeChild(_);
            }
        }
    }

    function Z(A) {
        var $ = a(A);
        if ($) {
            for (var _ in $) {
                if (typeof $[_] == "function") {
                    $[_] = null;
                }
            }
            $.parentNode.removeChild($);
        }
    }

    function a(A) {
        var _ = null;
        try {
            _ = g.getElementById(A);
        } catch ($) {
        }
        return _;
    }

    function E($) {
        return g.createElement($);
    }

    function j(A, _, $) {
        A.attachEvent(_, $);
        K[K.length] = [A, _, $];
    }

    function A(A) {
        var $ = G.pv, _ = A.split(".");
        _[0] = parseInt(_[0], 10);
        _[1] = parseInt(_[1], 10) || 0;
        _[2] = parseInt(_[2], 10) || 0;
        return ($[0] > _[0] || ($[0] == _[0] && $[1] > _[1]) || ($[0] == _[0] && $[1] == _[1] && $[2] >= _[2])) ? true : false;
    }

    function l(_, F, A, D) {
        if (G.ie && G.mac) {
            return;
        }
        var C = g.getElementsByTagName("head")[0];
        if (!C) {
            return;
        }
        var H = (A && typeof A == "string") ? A : "screen";
        if (D) {
            c = null;
            B = null;
        }
        if (!c || B != H) {
            var I = E("style");
            I.setAttribute("type", "text/css");
            I.setAttribute("media", H);
            c = C.appendChild(I);
            if (G.ie && G.win && typeof g.styleSheets != $ && g.styleSheets.length > 0) {
                c = g.styleSheets[g.styleSheets.length - 1];
            }
            B = H;
        }
        if (G.ie && G.win) {
            if (c && typeof c.addRule == p) {
                c.addRule(_, F);
            }
        } else {
            if (c && typeof g.createTextNode != $) {
                c.appendChild(g.createTextNode(_ + " {" + F + "}"));
            }
        }
    }

    function k(A, _) {
        if (!f) {
            return;
        }
        var $ = _ ? "visible" : "hidden";
        if (L && a(A)) {
            a(A).style.visibility = $;
        } else {
            l("#" + A, "visibility:" + $);
        }
    }

    function F(_) {
        var B = /[\\\"<>\.;]/, A = B.exec(_) != null;
        return A && typeof encodeURIComponent != $ ? encodeURIComponent(_) : _;
    }

    var X = function () {
        if (G.ie && G.win) {
            window.attachEvent("onunload", function () {
                var $ = K.length;
                for (var A = 0; A < $; A++) {
                    K[A][0].detachEvent(K[A][1], K[A][2]);
                }
                var D = H.length;
                for (var _ = 0; _ < D; _++) {
                    t(H[_]);
                }
                for (var B in G) {
                    G[B] = null;
                }
                G = null;
                for (var C in swfobject) {
                    swfobject[C] = null;
                }
                swfobject = null;
            });
        }
    }();
    return {
        registerObject: function (_, B, $, C) {
            if (G.w3 && _ && B) {
                var A = {};
                A.id = _;
                A.swfVersion = B;
                A.expressInstall = $;
                A.callbackFn = C;
                d[d.length] = A;
                k(_, false);
            } else {
                if (C) {
                    C({success: false, id: _});
                }
            }
        }, getObjectById: function ($) {
            if (G.w3) {
                return s($);
            }
        }, embedSWF: function (E, J, K, H, F, D, N, B, L, _) {
            var I = {success: false, id: J};
            if (G.w3 && !(G.wk && G.wk < 312) && E && J && K && H && F) {
                k(J, false);
                M(function () {
                    K += "";
                    H += "";
                    var P = {};
                    if (L && typeof L === p) {
                        for (var M in L) {
                            P[M] = L[M];
                        }
                    }
                    P.data = E;
                    P.width = K;
                    P.height = H;
                    var Q = {};
                    if (B && typeof B === p) {
                        for (var G in B) {
                            Q[G] = B[G];
                        }
                    }
                    if (N && typeof N === p) {
                        for (var O in N) {
                            if (typeof Q.flashvars != $) {
                                Q.flashvars += "&" + O + "=" + N[O];
                            } else {
                                Q.flashvars = O + "=" + N[O];
                            }
                        }
                    }
                    if (A(F)) {
                        var R = m(P, Q, J);
                        if (P.id == J) {
                            k(J, true);
                        }
                        I.success = true;
                        I.ref = R;
                    } else {
                        if (D && C()) {
                            P.data = D;
                            S(P, Q, J, _);
                            return;
                        } else {
                            k(J, true);
                        }
                    }
                    if (_) {
                        _(I);
                    }
                });
            } else {
                if (_) {
                    _(I);
                }
            }
        }, switchOffAutoHideShow: function () {
            f = false;
        }, ua: G, getFlashPlayerVersion: function () {
            return {major: G.pv[0], minor: G.pv[1], release: G.pv[2]};
        }, hasFlashPlayerVersion: A, createSWF: function (A, $, _) {
            if (G.w3) {
                return m(A, $, _);
            } else {
                return undefined;
            }
        }, showExpressInstall: function (B, $, A, _) {
            if (G.w3 && C()) {
                S(B, $, A, _);
            }
        }, removeSWF: function ($) {
            if (G.w3) {
                t($);
            }
        }, createCSS: function ($, B, _, A) {
            if (G.w3) {
                l($, B, _, A);
            }
        }, addDomLoadEvent: M, addLoadEvent: o, getQueryParamValue: function ($) {
            var B = g.location.search || g.location.hash;
            if (B) {
                if (/\?/.test(B)) {
                    B = B.split("?")[1];
                }
                if ($ == null) {
                    return F(B);
                }
                var _ = B.split("&");
                for (var A = 0; A < _.length; A++) {
                    if (_[A].substring(0, _[A].indexOf("=")) == $) {
                        return F(_[A].substring((_[A].indexOf("=") + 1)));
                    }
                }
            }
            return "";
        }, expressInstallCallback: function () {
            if (b) {
                var $ = a(U);
                if ($ && e) {
                    $.parentNode.replaceChild(e, $);
                    if (R) {
                        k(R, true);
                        if (G.ie && G.win) {
                            e.style.display = "block";
                        }
                    }
                    if (_) {
                        _(D);
                    }
                }
                b = false;
            }
        }
    };
}();
(function (G, H) {
    var K = G.ufp = G.ufp || {}, Q = K.util = K.util || {}, L = /[\d][\d\.\_,\-]*/, D = /[\.\_,\-]/g;
    Q.getActiveXObject = _;
    Q.isDefined = I;
    Q.isArray = N;
    Q.isFunc = C;
    Q.isString = R;
    Q.isNum = E;
    Q.isStrNum = F;
    Q.getNum = A;
    Q.formatNum = J;
    Q.garbage = B;
    Q.getAXOByClsid = P;
    Q.postData = $;
    Q.wload = G.wload = M;
    function M($) {
        M.stack.push($);
        if (M.isReady) {
            return M.run();
        }
        if (document.all) {
            G.attachEvent("onload", M.run);
        } else {
            G.addEventListener("load", M.run, false);
        }
    }

    M.run = function () {
        M.isReady = true;
        var $ = M.stack.shift();
        while (typeof $ == "function") {
            $();
            $ = M.stack.shift();
        }
    };
    M.stack = [];
    M.isReady = false;
    function _(A) {
        var _ = null;
        try {
            _ = new G.ActiveXObject(A);
        } catch ($) {
        }
        return _;
    }

    function I($) {
        return typeof $ != "undefined";
    }

    function N($) {
        return (/array/i).test(Object.prototype.toString.call($));
    }

    function C($) {
        return typeof $ == "function";
    }

    function R($) {
        return typeof $ == "string";
    }

    function E($) {
        return typeof $ == "number";
    }

    function F($) {
        return (typeof $ == "string" && (/\d/).test($));
    }

    function A(_, A) {
        var $ = F(_) ? (I(A) ? new RegExp(A) : L).exec(_) : null;
        return $ ? $[0] : null;
    }

    function J(_, B) {
        if (!F(_)) {
            return null;
        }
        if (!E(B)) {
            B = 4;
        }
        B--;
        var A = _.replace(/\s/g, "").split(D).concat(["0", "0", "0", "0"]);
        for (var $ = 0; $ < 4; $++) {
            if (/^(0+)(.+)$/.test(A[$])) {
                A[$] = RegExp.$2;
            }
            if ($ > B || !(/\d/).test(A[$])) {
                A[$] = "0";
            }
        }
        return A.slice(0, 4).join(",");
    }

    function B() {
        if (!G.CollectGarbage || B.enable) {
            return;
        }
        B.enable = 1;
        G.setTimeout(function () {
            B.enable = 0;
            G.CollectGarbage();
        }, 1000);
    }

    function P(A) {
        A = A.replace("clsid:", "");
        A = A.replace("{", "");
        A = A.replace("}", "");
        A = "clsid:" + A;
        var D = document.createElement("span"), _ = "<" + 'object classid="' + A + '" ' + 'id="deployJavaPlugin" width="0" height="0">' + "<" + "/" + "object" + ">", $ = false;
        D.innerHTML = _;
        var C = null;
        if (D.firstChild.object) {
            C = D.firstChild;
        }
        setTimeout(function () {
            D.innerHTML = "";
            B();
        }, 1000);
        return C;
    }

    function O() {
        var $ = false;
        try {
            $ = new ActiveXObject("Msxml2.XMLHTTP");
        } catch (A) {
            try {
                $ = new ActiveXObject("Microsoft.XMLHTTP");
            } catch (_) {
                $ = false;
            }
        }
        if (!$ && typeof XMLHttpRequest != "undefined") {
            $ = new XMLHttpRequest();
        }
        return $;
    }

    function $(B, A, _) {
        var $ = O();
        $.open("POST", B, true);
        $.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        $.setRequestHeader("If-Modified-Since", "0");
        if (typeof _ === "function") {
            $.onreadystatechange = function () {
                if ($.readyState == 4 && $.status == 200) {
                    var A = $.responseText;
                    _(A);
                }
            };
        }
        $.send(A);
    }
})(window);
(function (G, H) {
    G.Store = G.Store || {};
    var J = G.document, _ = G.indexedDB || G.webkitIndexedDB || G.mozIndexedDB || G.msIndexedDB, $ = G.IDBTransaction || G.webkitIDBTransaction, F = G.IDBKeyRange || G.webkitIDBKeyRange, O = ($ && $.READ_ONLY == 0) ? 0 : "readonly", K = ($ && $.READ_WRITE) || "readwrite", A = ($ && $.VERSION_CHANGE) || "versionchange", I = G.globalStorage && G.globalStorage[G.location.host], L = G.localStorage || I, C = {
        IDBKeyRange: F,
        TransactionType: {READ_ONLY: O, READ_WRITE: K, VERSION_CHANGE: A},
        indexedDB: _,
        name: "db_defalut",
        version: "1",
        tbName: "tb_dufault",
        db: null,
        status: 0,
        error: [],
        async: true,
        init: function (B) {
            var A = this, $;
            if (!_) {
                A.status = -1;
                return;
            }
            A.status = 2;
            if (B) {
                B.name ? A.name = B.name : "";
                B.version ? A.version = B.version : "";
                B.tbName ? A.tbName = B.tbName : "";
            }
            $ = _.open(A.name, A.version);
            if (!$) {
                A.status = -1;
                return;
            }
            $.onupgradeneeded = function ($) {
                A._initStore($.target.transaction);
            };
            $.onsuccess = function (_) {
                var $ = _.target.result;
                if ($.version != A.version) {
                    var B = $.setVersion(A.version);
                    B.onsuccess = function ($) {
                        A._initStore($.target.transaction);
                    };
                } else {
                    A.db = $;
                    A.status = 1;
                }
            };
            $.onerror = A._cbError;
        },
        get: function (D, B) {
            var C = this, $, _, A;
            $ = C.db.transaction(C.tbName, O);
            _ = $.objectStore(C.tbName);
            A = _.get(D);
            A.onsuccess = function ($) {
                B($.target.result);
            };
            A.onerror = function ($) {
                B(null, $);
            };
        },
        set: function (F, D, C) {
            var E = this, _ = E.db, $, A, B;
            $ = _.transaction(E.tbName, K);
            A = $.objectStore(E.tbName);
            B = A.put(D, F);
            B.onsuccess = function (_) {
                var $ = _.target.result;
                (C instanceof Function) ? C($) : "";
            };
            B.onerror = function ($) {
                (C instanceof Function) ? C(null, $) : "";
            };
        },
        _initStore: function (_) {
            var B = this, $ = _.db, A;
            if (!$.objectStoreNames.contains(B.tbName)) {
                A = $.createObjectStore(B.tbName);
            }
            _.oncomplete = function ($) {
                B.db = $.target.db;
                B.status = 1;
            };
            _.onerror = B._cbError;
            _.onabort = B._cbError;
        },
        _cbError: function (A) {
            var B = this, _ = A.target.error, $ = _.name + ": " + _.message;
            B.error.push([$, _]);
            B.status = -2;
        }
    }, M = {
        name: "_default", status: 0, db: null, error: null, init: function (B) {
            try {
                var A = this, _ = J.createElement("div");
                if (B) {
                    B.name ? A.name = B.name : "";
                }
                _.id = A.name;
                _.style.display = "none";
                _.style.behavior = "url('#default#userData')";
                J.body.appendChild(_);
                A.db = _;
                A.set("test", "ok");
                A.status = A.get("test") == "ok" ? 1 : -1;
            } catch ($) {
                A.error = $;
                A.status = -1;
            }
        }, set: function (A, $) {
            var _ = this.db;
            _.load(_.name);
            _.setAttribute(A, $);
            _.save(_.name);
        }, get: function (B, _) {
            var A = this.db, $;
            A.load(A.name);
            $ = A.getAttribute(B);
            _ ? _($) : "";
            return $;
        }
    }, N = {
        name: "_default",
        version: 1,
        status: 0,
        size: 1024,
        tbName: "table_default",
        db: null,
        async: true,
        init: function (A) {
            var _ = this, $;
            if (!G.openDatabase) {
                _.status = -1;
                return;
            }
            _.status = 2;
            if (A) {
                A.name ? _.name = A.name : "";
                A.version ? _.version = A.version : "";
                A.size ? _.size = A.size : "";
                A.tbName ? _.tbName = A.tbName : "";
            }
            $ = G.openDatabase(_.name, "", "", _.size);
            $.transaction(function ($) {
                $.executeSql("CREATE TABLE IF NOT EXISTS " + _.tbName + " (key unique, value)");
            }, function ($) {
                _.status = -1;
                throw"SQLError:" + $.message;
            });
            _.db = $;
            _.status = 1;
        },
        set: function (B, _) {
            var A = this, $ = A.db;
            $.transaction(function ($) {
                $.executeSql("SELECT COUNT(*) c FROM " + A.tbName + " WHERE key = ?", [B], function (C, D) {
                    var $ = "INSERT INTO " + A.tbName + " (value, key) VALUES(?, ?)";
                    if (D.rows.item(0).c > 0) {
                        $ = "UPDATE " + A.tbName + " SET value = ? WHERE key = ?";
                    }
                    C.executeSql($, [_, B]);
                });
            });
        },
        get: function (B, _) {
            var A = this, $ = A.db;
            $.readTransaction(function ($) {
                $.executeSql("SELECT value FROM " + A.tbName + " WHERE key = ?", [B], function ($, A) {
                    A.rows.length > 0 ? _(A.rows.item(0).value) : _(null);
                });
            });
        }
    }, E = {
        status: !!G.navigator.cookieEnabled / 1 || -1, db: J, set: function (B, A, $) {
            var _ = 356 * 24 * 60 * 60 * 1000, $ = new Date().valueOf() + (parseInt($) || _);
            document.cookie = B + "=" + A + ";expires=" + new Date($).toGMTString();
        }, get: function (C, B) {
            var A = new RegExp("(^| )" + C + "=([^;]*)(;|$)"), _ = document.cookie.match(A), $ = _ && _[2];
            B ? B($) : "";
            return $;
        }
    }, B = {
        status: !!L / 1 || -1, db: L, set: function (_, $) {
            L.setItem(_, $);
        }, get: function (A, _) {
            var $ = L.getItem(A);
            _ ? _($) : "";
            return $;
        }
    }, D = {
        conf: {name: "ufp", version: 1, tbName: "ufpInfo"},
        status: false,
        stores: [[C, 0], [N, 0], [M, 0], [E, 0], [B, 0]],
        init: function () {
            var B = D.stores, C, A, $, _;
            for (C = 0; C < B.length; C++) {
                A = B[C][0];
                if (A.status == 0) {
                    A.init(D.conf);
                }
            }
            $ = 100;
            _ = G.setInterval(function () {
                $--;
                for (var A = 0; A < B.length && $ > 0; A++) {
                    if (B[A][0].status == 0 || B[A][0].status == 2) {
                        return;
                    }
                    B[A][1] = B[A][0].status;
                }
                D.status = true;
                G.clearInterval(_);
            }, 10);
        },
        set: function (H, E, $, C) {
            try {
                if (D.status) {
                    var F = D.stores, I = 0, B, A = new Date().valueOf();
                    for (; I < F.length; I++) {
                        B = F[I][0];
                        if (B.status == 1) {
                            B.set(H, E, $, C);
                        }
                    }
                } else {
                    G.setTimeout(function () {
                        D.set(H, E, $, C);
                    }, 10);
                }
            } catch (_) {
            }
        },
        get: function (F, C) {
            if (D.status) {
                var E = D.stores, H = 0, B, A, $ = [];
                A = function (_) {
                    A.count--;
                    if (_) {
                        $.push(_);
                    }
                };
                A.count = 0;
                for (; H < E.length; H++) {
                    B = E[H][0];
                    if (B.status == 1) {
                        A.count++;
                        B.get(F, A);
                    }
                }
                var _ = G.setInterval(function () {
                    var B;
                    if (A.count == 0) {
                        if ($.length > 0) {
                            B = $[0];
                        } else {
                            B = null;
                        }
                        C(B);
                        G.clearInterval(_);
                    }
                }, 10);
            } else {
                G.setTimeout(function () {
                    D.get(F, C);
                }, 10);
            }
        }
    };
    G.Store.DB = D;
    G.Store.LocalStorageHelper = B;
    G.Store.CookieHelper = E;
    G.Store.WebSQLHelper = N;
    G.Store.UserDataHelper = M;
    G.Store.IndexedDBHelper = C;
})(window);
(function (Q, D) {
    var H = Q.ufp = Q.ufp || {}, W = H.util, F = H.config, _ = F.Detectable_Components_in_Internet_Explorer_by_capclient, C = Q.document, P = Q.navigator, E = H.browser = J(), L = H.OS = A();
    H.screenInfo = M();
    W.wload(function () {
        N(function ($) {
            H.fonts = $;
        });
        H.plugins = G();
    });
    function J() {
        var D = {}, A = P.userAgent || "", E = C.documentMode;
        try {
            C.documentMode = "";
        } catch (_) {
        }
        D.isIE = W.isNum(C.documentMode) ? !0 : !1;
        try {
            C.documentMode = E;
        } catch (_) {
        }
        D.verIE = null;
        if (D.isIE) {
            D.verIE = C.documentMode || ((/^(?:.*?[^a-zA-Z])??(?:MSIE|rv\s*\:)\s*(\d+\.?\d*)/i).test(A) ? parseFloat(RegExp.$1, 10) : 7);
        }
        if (!D.isIE) {
            var B = P.vendor || "", $ = P.product || "";
            D.isGecko = (/Gecko/i).test($) && (/Gecko\s*\/\s*\d/i).test(A);
            D.verGecko = D.isGecko ? W.formatNum((/rv\s*\:\s*([\.\,\d]+)/i).test(A) ? RegExp.$1 : "0.9") : null;
            D.isChrome = (/(Chrome|CriOS)\s*\/\s*(\d[\d\.]*)/i).test(A);
            D.verChrome = D.isChrome ? W.formatNum(RegExp.$2) : null;
            D.isSafari = !D.isChrome && ((/Apple/i).test(B) || !B) && (/Safari\s*\/\s*(\d[\d\.]*)/i).test(A);
            D.verSafari = D.isSafari && (/Version\s*\/\s*(\d[\d\.]*)/i).test(A) ? W.formatNum(RegExp.$1) : null;
            D.isOpera = (/Opera\s*[\/]?\s*(\d+\.?\d*)/i).test(A);
            D.verOpera = D.isOpera && ((/Version\s*\/\s*(\d+\.?\d*)/i).test(A) || 1) ? parseFloat(RegExp.$1, 10) : null;
        }
        if (D.isIE) {
            D.name = "IE";
            D.version = D.verIE;
        } else {
            if (D.isGecko) {
                D.name = "Gecko";
                D.version = D.verGecko;
            } else {
                if (D.isChrome) {
                    D.name = "Chrome";
                    D.version = D.verChrome;
                } else {
                    if (D.isSafari) {
                        D.name = "Safari";
                        D.version = D.verSafari;
                    } else {
                        if (D.isOpera) {
                            D.name = "Opera";
                            D.version = D.verOpera;
                        }
                    }
                }
            }
        }
        return D;
    }

    function T() {
        var $ = {enable: false, version: R()};
        if (/hasFlash\=true/.test(location)) {
            $.enable = true;
            return $;
        }
        if (/hasFlash\=false/.test(location)) {
            $.enable = false;
            return $;
        }
        $.enable = W.formatNum($.version.match(/\d+/g).join(",")) != "0,0,0,0";
        return $;
    }

    function R() {
        try {
            try {
                var _ = new ActiveXObject("ShockwaveFlash.ShockwaveFlash.6");
                try {
                    _.AllowScriptAccess = "always";
                } catch ($) {
                    return "6,0,0,0";
                }
            } catch ($) {
            }
            return new ActiveXObject("ShockwaveFlash.ShockwaveFlash").GetVariable("$version").replace(/\D+/g, ",").match(/^,?(.+),?$/)[1];
        } catch ($) {
            try {
                if (P.mimeTypes["application/x-shockwave-flash"].enabledPlugin) {
                    return (P.plugins["Shockwave Flash 2.0"] || P.plugins["Shockwave Flash"]).description.replace(/\D+/g, ",").match(/^,?(.+),?$/)[1];
                }
            } catch ($) {
            }
        }
        return "0,0,0,0";
    }

    function A() {
        var A = F.platforms, _ = 999, $ = P.platform || "";
        if ($) {
            for (var B = 0; B < A.length; B++) {
                if (A[B] && new RegExp(A[B][0], "i").test($)) {
                    return A[B][1];
                }
            }
        }
        return _;
    }

    function M() {
        var $ = Q.screen;
        return $.width + "*" + $.height + "*" + $.colorDepth;
    }

    function N(A) {
        var C = F.flashUrl_fonts, _ = 100;

        function $(C) {
            _--;
            if ((typeof C.getFonts) != "undefined" || _ < 0) {
                try {
                    fontsStr = C.getFonts();
                } catch (B) {
                    fontsStr = "";
                }
                A(fontsStr);
            } else {
                setTimeout(function () {
                    $(C);
                }, 200);
            }
        }

        B(C, $);
    }

    function B(I, D, _) {
        Q.loadFlash_guid = Q.loadFlash_guid || 1;
        var B = {}, G = {
            menu: "false",
            scale: "noScale",
            allowFullscreen: "true",
            allowScriptAccess: "always",
            wmode: "direct"
        }, F = {id: "swfid" + Q.loadFlash_guid++};
        if (!_) {
            _ = F.id + "continner";
            var A = C.createElement("div");
            A.style.position = "absolute";
            A.style.height = "1px";
            A.style.width = "1px";
            A.style.left = "1px";
            A.style.top = (C.body.scrollTop || C.documentElement.scrollTop) + "px";
            A.style.zIndex = "9999";
            C.body.appendChild(A);
            A.appendChild(C.createElement("div"));
            A.firstChild.id = _;
        }
        swfobject.embedSWF(I, _, "1px", "1px", "10.0.0", "expressInstall.swf", B, G, F);
        var H;

        function E() {
            D(H);
        }

        var J = 100;

        function $() {
            J--;
            H = C.getElementById(F.id);
            if (H && (typeof H.GetVariable) != "undefined") {
                E();
            } else {
                if (J > 0) {
                    setTimeout($, 100);
                }
            }
        }

        $();
    }

    function I() {
        if (I.cc) {
            return I.cc;
        }
        if (I.init || !E.isIE || L != 1) {
            return false;
        }
        I.init = 1;
        var _ = C.createElement("div");
        _.style.height = "1px";
        _.style.width = "1px";
        _.style.left = "1px";
        _.style.top = "1px";
        _.id = "oClientCaps";
        _.position = "absolute";
        _.style.behavior = "url('#default#clientcaps')";
        try {
            _.getComponentVersion("{7790769C-0471-11D2-AF11-00C04FA35D02}", "ComponentID");
            I.cc = _;
            return _;
        } catch ($) {
            return null;
        }
    }

    function V(C, $) {
        C = C.replace("clsid:", "");
        C = C.replace("{:", "");
        C = C.replace("}:", "");
        var B = false, A;
        for (A in _) {
            if (_[A] == C) {
                B = true;
                break;
            }
        }
        if (B && $) {
            return $.getComponentVersion("{" + C + "}", "ComponentID") || "";
        }
        return "";
    }

    function O(_) {
        var B = false, A;
        if (_) {
            B = _.javaEnabled;
            A = K(_);
        }
        A = A || X() || $() || S();
        B = B || !!A;
        return {enable: B, version: A};
    }

    function X() {
        var A = 0, $, _;
        for (; A < P.mimeTypes.length; ++A) {
            $ = P.mimeTypes[A].type;
            _ = $.match(/^application\/x-java-applet;jpi-version=(.*)$/);
            if (_) {
                return _[1];
            }
        }
        return "";
    }

    function $() {
        if ((!P.plugins) || (!P.plugins.length)) {
            return false;
        }
        var $ = P.platform.toLowerCase(), A = 0, _;
        for (; A < P.plugins.length; ++A) {
            _ = P.plugins[A].description;
            if (_.search(/\bJava\b/) != -1) {
                /Plug-in ([\d,.]+)/.test(_);
                return RegExp.$1 || "";
            }
        }
    }

    function K($) {
        var _ = "08B0E5C0-4FCB-11CF-AAA5-00401C608500";
        return V(_, $);
    }

    function S() {
        var F = C.createElement("span"), B = "<" + 'object classid="clsid:CAFEEFAC-DEC7-0000-0000-ABCDEFFEDCBA" ' + 'id="deployJavaPlugin" width="0" height="0">' + "<" + "/" + "object" + ">", $ = false, E = null, A, _, D = 0;
        F.innerHTML = B;
        if (F.firstChild.object) {
            A = [];
            E = F.firstChild.object;
            _ = E.jvms;
            for (; D < _.getLength(); D++) {
                A[D] = _.get(D).version;
            }
            $ = A.join(",");
        }
        F.innerHTML = "";
        W.garbage();
        return $;
    }

    function G() {
        var B = P.plugins, A = [], H, K, G, D = F.plugins;
        if (B.length > 0) {
            for (K = 0; K < B.length; K++) {
                H = B[K];
                A.push(H.description + "::" + H.filename + "::" + H.name);
            }
        } else {
            if (E.isIE) {
                var C = I(), J = O(C), $ = T();
                A.push("Flash: " + $.enable + "," + $.version);
                A.push("Java: " + J.enabled + "," + J.version);
                for (K in D) {
                    G = U(K, D[K]);
                    if (G) {
                        A.push(K + ":1");
                    }
                }
                if (C) {
                    for (K in _) {
                        H = _[K];
                        G = V(H);
                        if (G) {
                            A.push(K + ":" + G);
                        }
                    }
                }
            }
        }
        return A.join("|");
    }

    function U(I, F) {
        var H = F || {}, D = H.classid || "", E = H.type || "", K = H.codebase || "", G = H.version || "", L = C.createElement("span"), J = "", B = "", _ = '<object width="1" height="1" style="display:none;" ' + (K ? "codebase=" + K + (G ? "#version=" + G : "") : ""), A = ' classid="' + D + '"' + ' type="' + E + '"' + ">" + B + "<" + "/object>", $ = false;
        L.innerHTML = _ + J + A;
        if (L.firstChild.object) {
            x = L.firstChild.object;
            $ = true;
        }
        L.innerHTML = "";
        W.garbage();
        return $;
    }
})(window);
wload(function () {
    var ufp = window.ufp, util = ufp.util, postUrl = ufp.config.fpPostInterface, sendUrl = ufp.config.fpCollectInterface;
    Store.DB.init();
    var tid = {
        key: "tid",
        value: "",
        recover: 0,
        confidence: "",
        postInterface: postUrl,
        fpCollectInterface: sendUrl,
        callbackStack: [],
        init: function () {
            tid.get();
        },
        runstack: function () {
            var $;
            while ($ = tid.callbackStack.pop()) {
                $(tid.value, tid.recover, tid.confidence);
            }
        },
        get: function ($) {
            $ = $ || function () {
                };
            tid.callbackStack.push($);
            if (tid.value) {
                return tid.runstack();
            }
            Store.DB.get(tid.key, function ($) {
                if (!$) {
                    tid.getTidFromServer();
                } else {
                    if (Store.CookieHelper.get(tid.key) != $) {
                        tid.recover = 1;
                    }
                    tid.value = $;
                    tid.confidence = "100";
                    if (/(.*)\_{2}(\d{3})$/.test($)) {
                        tid.value = RegExp.$1;
                        tid.confidence = RegExp.$2;
                    }
                    Store.DB.set(tid.key, $);
                    tid.runstack();
                    if (window.use_fp && tid.confidence == "100") {
                        tid.sendTidInfo();
                    }
                }
            });
        },
        getTidFromServer: function () {
            tid.getTidFromServer = function () {
            };
            if (window.use_fp) {
                gewindow.ufp = window.ufp || {};
                window.ufp.config = {
                    platforms: [["Win", 1], ["Mac", 2], ["Linux", 3], ["FreeBSD", 4], ["iPhone", 21.1], ["iPod", 21.2], ["iPad", 21.3], ["Win.*CE", 12.1], ["Win.*Mobile", 12.2], ["Pocket\\s*PC", 12.3], ["", 999]],
                    plugins: {
                        "驱动精灵在线版1.0.0.5": {
                            classid: "clsid:A9EA64C1-D146-4B99-86A7-68B1786D82C0",
                            filename: "dgweb.dll",
                            name: "驱动精灵在线版",
                            version: "1.0.0.5"
                        },
                        "PPLive Lite Class ver 3.1.8.6046": {
                            classid: "clsid:EF0D1A14-1033-41A2-A589-240C01EDC078",
                            filename: "pplugin2.dll",
                            name: "PPLive Lite Class",
                            version: "3.1.8.6046"
                        },
                        "baiduplayer Browser Plugin": {
                            classid: "clsid:02E2D748-67F8-48B4-8AB4-0A085374BB99",
                            filename: "npxbdyy.dll",
                            name: "BaiduPlayer Browser Plugin"
                        },
                        "webmod Class": {classid: "clsid:FEE3C8C5-9BEA-4079-AB36-63ECABFC7392", filename: "Alidcp.dll"}
                    },
                    Detectable_Components_in_Internet_Explorer_by_capclient: {
                        "Address Book": "7790769C-0471-11D2-AF11-00C04FA35D02",
                        "Windows Desktop Update NT": "89820200-ECBD-11CF-8B85-00AA005B4340",
                        DirectAnimation: "283807B5-2C60-11D0-A31D-00AA00B92C03",
                        "DirectAnimation Java Classes": "4F216970-C90C-11D1-B5C7-0000F8051515",
                        DirectShow: "44BBA848-CC51-11CF-AAFA-00AA00B6015C",
                        "Dynamic HTML Data Binding": "9381D8F2-0288-11D0-9501-00AA00B911A5",
                        "Dynamic HTML Data Binding for Java": "4F216970-C90C-11D1-B5C7-0000F8051515",
                        "Internet Connection Wizard": "5A8D6EE0-3E18-11D0-821E-444553540000",
                        "Internet Explorer 5 Browser": "89820200-ECBD-11CF-8B85-00AA005B4383",
                        "Windows Internet Explorer Classes for Java": "08B0E5C0-4FCB-11CF-AAA5-00401C608555",
                        "Internet Explorer Help": "45EA75A0-A269-11D1-B5BF-0000F8051515",
                        "Internet Explorer Help Engine": "DE5AED00-A4BF-11D1-9948-00C04F98BBC9",
                        "Windows Media Player": "22D6F312-B0F6-11D0-94AB-0080C74C7E95",
                        "NetMeeting NT": "44BBA842-CC51-11CF-AAFA-00AA00B6015B",
                        "Offline Browsing Pack": "3AF36230-A269-11D1-B5BF-0000F8051515",
                        "Outlook Express": "44BBA840-CC51-11CF-AAFA-00AA00B6015C",
                        "Task Scheduler": "CC2A9BA0-3BDD-11D0-821E-444553540000",
                        "Microsoft virtual machine": "08B0E5C0-4FCB-11CF-AAA5-00401C608500"
                    },
                    flashUrl_fonts: "/images/visitor/fonts.swf",
                    fpPostInterface: "visitor/genvisitor",
                    fpCollectInterface: "visitor/record"
                };
                var swfobject = function () {
                    var $ = "undefined", p = "object", T = "Shockwave Flash", P = "ShockwaveFlash.ShockwaveFlash", q = "application/x-shockwave-flash", U = "SWFObjectExprInst", u = "onreadystatechange", I = window, g = document, n = navigator, O = false, N = [i], d = [], H = [], K = [], e, R, _, D, L = false, b = false, c, B, f = true, G = function () {
                        var B = typeof g.getElementById != $ && typeof g.getElementsByTagName != $ && typeof g.createElement != $, G = n.userAgent.toLowerCase(), E = n.platform.toLowerCase(), H = E ? /win/.test(E) : /win/.test(G), _ = E ? /mac/.test(E) : /mac/.test(G), K = /webkit/.test(G) ? parseFloat(G.replace(/^.*webkit\/(\d+(\.\d+)?).*$/, "$1")) : false, F = !+"\v1", D = [0, 0, 0], C = null;
                        if (typeof n.plugins != $ && typeof n.plugins[T] == p) {
                            C = n.plugins[T].description;
                            if (C && !(typeof n.mimeTypes != $ && n.mimeTypes[q] && !n.mimeTypes[q].enabledPlugin)) {
                                O = true;
                                F = false;
                                C = C.replace(/^.*\s+(\S+\s+\S+$)/, "$1");
                                D[0] = parseInt(C.replace(/^(.*)\..*$/, "$1"), 10);
                                D[1] = parseInt(C.replace(/^.*\.(.*)\s.*$/, "$1"), 10);
                                D[2] = /[a-zA-Z]/.test(C) ? parseInt(C.replace(/^.*[a-zA-Z]+(.*)$/, "$1"), 10) : 0;
                            }
                        } else {
                            if (typeof I.ActiveXObject != $) {
                                try {
                                    var A = new ActiveXObject(P);
                                    if (A) {
                                        C = A.GetVariable("$version");
                                        if (C) {
                                            F = true;
                                            C = C.split(" ")[1].split(",");
                                            D = [parseInt(C[0], 10), parseInt(C[1], 10), parseInt(C[2], 10)];
                                        }
                                    }
                                } catch (J) {
                                }
                            }
                        }
                        return {w3: B, pv: D, wk: K, ie: F, win: H, mac: _};
                    }(), h = function () {
                        if (!G.w3) {
                            return;
                        }
                        if ((typeof g.readyState != $ && g.readyState == "complete") || (typeof g.readyState == $ && (g.getElementsByTagName("body")[0] || g.body))) {
                            V();
                        }
                        if (!L) {
                            if (typeof g.addEventListener != $) {
                                g.addEventListener("DOMContentLoaded", V, false);
                            }
                            if (G.ie && G.win) {
                                g.attachEvent(u, function () {
                                    if (g.readyState == "complete") {
                                        g.detachEvent(u, arguments.callee);
                                        V();
                                    }
                                });
                                if (I == top) {
                                    (function () {
                                        if (L) {
                                            return;
                                        }
                                        try {
                                            g.documentElement.doScroll("left");
                                        } catch ($) {
                                            setTimeout(arguments.callee, 0);
                                            return;
                                        }
                                        V();
                                    })();
                                }
                            }
                            if (G.wk) {
                                (function () {
                                    if (L) {
                                        return;
                                    }
                                    if (!/loaded|complete/.test(g.readyState)) {
                                        setTimeout(arguments.callee, 0);
                                        return;
                                    }
                                    V();
                                })();
                            }
                            o(V);
                        }
                    }();

                    function V() {
                        if (L) {
                            return;
                        }
                        try {
                            var B = g.getElementsByTagName("body")[0].appendChild(E("span"));
                            B.parentNode.removeChild(B);
                        } catch ($) {
                            return;
                        }
                        L = true;
                        var A = N.length;
                        for (var _ = 0; _ < A; _++) {
                            N[_]();
                        }
                    }

                    function M($) {
                        if (L) {
                            $();
                        } else {
                            N[N.length] = $;
                        }
                    }

                    function o(_) {
                        if (typeof I.addEventListener != $) {
                            I.addEventListener("load", _, false);
                        } else {
                            if (typeof g.addEventListener != $) {
                                g.addEventListener("load", _, false);
                            } else {
                                if (typeof I.attachEvent != $) {
                                    j(I, "onload", _);
                                } else {
                                    if (typeof I.onload == "function") {
                                        var A = I.onload;
                                        I.onload = function () {
                                            A();
                                            _();
                                        };
                                    } else {
                                        I.onload = _;
                                    }
                                }
                            }
                        }
                    }

                    function i() {
                        if (O) {
                            Q();
                        } else {
                            J();
                        }
                    }

                    function Q() {
                        var B = g.getElementsByTagName("body")[0], _ = E(p);
                        _.setAttribute("type", q);
                        var C = B.appendChild(_);
                        if (C) {
                            var A = 0;
                            (function () {
                                if (typeof C.GetVariable != $) {
                                    var D = C.GetVariable("$version");
                                    if (D) {
                                        D = D.split(" ")[1].split(",");
                                        G.pv = [parseInt(D[0], 10), parseInt(D[1], 10), parseInt(D[2], 10)];
                                    }
                                } else {
                                    if (A < 10) {
                                        A++;
                                        setTimeout(arguments.callee, 10);
                                        return;
                                    }
                                }
                                B.removeChild(_);
                                C = null;
                                J();
                            })();
                        } else {
                            J();
                        }
                    }

                    function J() {
                        var H = d.length;
                        if (H > 0) {
                            for (var M = 0; M < H; M++) {
                                var I = d[M].id, F = d[M].callbackFn, E = {success: false, id: I};
                                if (G.pv[0] > 0) {
                                    var L = a(I);
                                    if (L) {
                                        if (A(d[M].swfVersion) && !(G.wk && G.wk < 312)) {
                                            k(I, true);
                                            if (F) {
                                                E.success = true;
                                                E.ref = s(I);
                                                F(E);
                                            }
                                        } else {
                                            if (d[M].expressInstall && C()) {
                                                var _ = {};
                                                _.data = d[M].expressInstall;
                                                _.width = L.getAttribute("width") || "0";
                                                _.height = L.getAttribute("height") || "0";
                                                if (L.getAttribute("class")) {
                                                    _.styleclass = L.getAttribute("class");
                                                }
                                                if (L.getAttribute("align")) {
                                                    _.align = L.getAttribute("align");
                                                }
                                                var J = {}, K = L.getElementsByTagName("param"), B = K.length;
                                                for (var D = 0; D < B; D++) {
                                                    if (K[D].getAttribute("name").toLowerCase() != "movie") {
                                                        J[K[D].getAttribute("name")] = K[D].getAttribute("value");
                                                    }
                                                }
                                                S(_, J, I, F);
                                            } else {
                                                r(L);
                                                if (F) {
                                                    F(E);
                                                }
                                            }
                                        }
                                    }
                                } else {
                                    k(I, true);
                                    if (F) {
                                        var N = s(I);
                                        if (N && typeof N.SetVariable != $) {
                                            E.success = true;
                                            E.ref = N;
                                        }
                                        F(E);
                                    }
                                }
                            }
                        }
                    }

                    function s(_) {
                        var B = null, A = a(_);
                        if (A && A.nodeName == "OBJECT") {
                            if (typeof A.SetVariable != $) {
                                B = A;
                            } else {
                                var C = A.getElementsByTagName(p)[0];
                                if (C) {
                                    B = C;
                                }
                            }
                        }
                        return B;
                    }

                    function C() {
                        return !b && A("6.0.65") && (G.win || G.mac) && !(G.wk && G.wk < 312);
                    }

                    function S(C, F, J, L) {
                        b = true;
                        _ = L || null;
                        D = {success: false, id: J};
                        var K = a(J);
                        if (K) {
                            if (K.nodeName == "OBJECT") {
                                e = W(K);
                                R = null;
                            } else {
                                e = K;
                                R = J;
                            }
                            C.id = U;
                            if (typeof C.width == $ || (!/%$/.test(C.width) && parseInt(C.width, 10) < 310)) {
                                C.width = "310";
                            }
                            if (typeof C.height == $ || (!/%$/.test(C.height) && parseInt(C.height, 10) < 137)) {
                                C.height = "137";
                            }
                            g.title = g.title.slice(0, 47) + " - Flash Player Installation";
                            var B = G.ie && G.win ? "ActiveX" : "PlugIn", A = "MMredirectURL=" + I.location.toString().replace(/&/g, "%26") + "&MMplayerType=" + B + "&MMdoctitle=" + g.title;
                            if (typeof F.flashvars != $) {
                                F.flashvars += "&" + A;
                            } else {
                                F.flashvars = A;
                            }
                            if (G.ie && G.win && K.readyState != 4) {
                                var H = E("div");
                                J += "SWFObjectNew";
                                H.setAttribute("id", J);
                                K.parentNode.insertBefore(H, K);
                                K.style.display = "none";
                                (function () {
                                    if (K.readyState == 4) {
                                        K.parentNode.removeChild(K);
                                    } else {
                                        setTimeout(arguments.callee, 10);
                                    }
                                })();
                            }
                            m(C, F, J);
                        }
                    }

                    function r($) {
                        if (G.ie && G.win && $.readyState != 4) {
                            var _ = E("div");
                            $.parentNode.insertBefore(_, $);
                            _.parentNode.replaceChild(W($), _);
                            $.style.display = "none";
                            (function () {
                                if ($.readyState == 4) {
                                    $.parentNode.removeChild($);
                                } else {
                                    setTimeout(arguments.callee, 10);
                                }
                            })();
                        } else {
                            $.parentNode.replaceChild(W($), $);
                        }
                    }

                    function W(A) {
                        var _ = E("div");
                        if (G.win && G.ie) {
                            _.innerHTML = A.innerHTML;
                        } else {
                            var B = A.getElementsByTagName(p)[0];
                            if (B) {
                                var $ = B.childNodes;
                                if ($) {
                                    var C = $.length;
                                    for (var D = 0; D < C; D++) {
                                        if (!($[D].nodeType == 1 && $[D].nodeName == "PARAM") && !($[D].nodeType == 8)) {
                                            _.appendChild($[D].cloneNode(true));
                                        }
                                    }
                                }
                            }
                        }
                        return _;
                    }

                    function m(_, F, I) {
                        var J, C = a(I);
                        if (G.wk && G.wk < 312) {
                            return J;
                        }
                        if (C) {
                            if (typeof _.id == $) {
                                _.id = I;
                            }
                            if (G.ie && G.win) {
                                var K = "";
                                for (var L in _) {
                                    if (_[L] != Object.prototype[L]) {
                                        if (L.toLowerCase() == "data") {
                                            F.movie = _[L];
                                        } else {
                                            if (L.toLowerCase() == "styleclass") {
                                                K += ' class="' + _[L] + '"';
                                            } else {
                                                if (L.toLowerCase() != "classid") {
                                                    K += " " + L + '="' + _[L] + '"';
                                                }
                                            }
                                        }
                                    }
                                }
                                var M = "";
                                for (var B in F) {
                                    if (F[B] != Object.prototype[B]) {
                                        M += '<param name="' + B + '" value="' + F[B] + '" />';
                                    }
                                }
                                C.outerHTML = '<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"' + K + ">" + M + "</object>";
                                H[H.length] = _.id;
                                J = a(_.id);
                            } else {
                                var N = E(p);
                                N.setAttribute("type", q);
                                for (var A in _) {
                                    if (_[A] != Object.prototype[A]) {
                                        if (A.toLowerCase() == "styleclass") {
                                            N.setAttribute("class", _[A]);
                                        } else {
                                            if (A.toLowerCase() != "classid") {
                                                N.setAttribute(A, _[A]);
                                            }
                                        }
                                    }
                                }
                                for (var D in F) {
                                    if (F[D] != Object.prototype[D] && D.toLowerCase() != "movie") {
                                        Y(N, D, F[D]);
                                    }
                                }
                                C.parentNode.replaceChild(N, C);
                                J = N;
                            }
                        }
                        return J;
                    }

                    function Y(B, A, _) {
                        var $ = E("param");
                        $.setAttribute("name", A);
                        $.setAttribute("value", _);
                        B.appendChild($);
                    }

                    function t($) {
                        var _ = a($);
                        if (_ && _.nodeName == "OBJECT") {
                            if (G.ie && G.win) {
                                _.style.display = "none";
                                (function () {
                                    if (_.readyState == 4) {
                                        Z($);
                                    } else {
                                        setTimeout(arguments.callee, 10);
                                    }
                                })();
                            } else {
                                _.parentNode.removeChild(_);
                            }
                        }
                    }

                    function Z(A) {
                        var $ = a(A);
                        if ($) {
                            for (var _ in $) {
                                if (typeof $[_] == "function") {
                                    $[_] = null;
                                }
                            }
                            $.parentNode.removeChild($);
                        }
                    }

                    function a(A) {
                        var _ = null;
                        try {
                            _ = g.getElementById(A);
                        } catch ($) {
                        }
                        return _;
                    }

                    function E($) {
                        return g.createElement($);
                    }

                    function j(A, _, $) {
                        A.attachEvent(_, $);
                        K[K.length] = [A, _, $];
                    }

                    function A(A) {
                        var $ = G.pv, _ = A.split(".");
                        _[0] = parseInt(_[0], 10);
                        _[1] = parseInt(_[1], 10) || 0;
                        _[2] = parseInt(_[2], 10) || 0;
                        return ($[0] > _[0] || ($[0] == _[0] && $[1] > _[1]) || ($[0] == _[0] && $[1] == _[1] && $[2] >= _[2])) ? true : false;
                    }

                    function l(_, F, A, D) {
                        if (G.ie && G.mac) {
                            return;
                        }
                        var C = g.getElementsByTagName("head")[0];
                        if (!C) {
                            return;
                        }
                        var H = (A && typeof A == "string") ? A : "screen";
                        if (D) {
                            c = null;
                            B = null;
                        }
                        if (!c || B != H) {
                            var I = E("style");
                            I.setAttribute("type", "text/css");
                            I.setAttribute("media", H);
                            c = C.appendChild(I);
                            if (G.ie && G.win && typeof g.styleSheets != $ && g.styleSheets.length > 0) {
                                c = g.styleSheets[g.styleSheets.length - 1];
                            }
                            B = H;
                        }
                        if (G.ie && G.win) {
                            if (c && typeof c.addRule == p) {
                                c.addRule(_, F);
                            }
                        } else {
                            if (c && typeof g.createTextNode != $) {
                                c.appendChild(g.createTextNode(_ + " {" + F + "}"));
                            }
                        }
                    }

                    function k(A, _) {
                        if (!f) {
                            return;
                        }
                        var $ = _ ? "visible" : "hidden";
                        if (L && a(A)) {
                            a(A).style.visibility = $;
                        } else {
                            l("#" + A, "visibility:" + $);
                        }
                    }

                    function F(_) {
                        var B = /[\\\"<>\.;]/, A = B.exec(_) != null;
                        return A && typeof encodeURIComponent != $ ? encodeURIComponent(_) : _;
                    }

                    var X = function () {
                        if (G.ie && G.win) {
                            window.attachEvent("onunload", function () {
                                var $ = K.length;
                                for (var A = 0; A < $; A++) {
                                    K[A][0].detachEvent(K[A][1], K[A][2]);
                                }
                                var D = H.length;
                                for (var _ = 0; _ < D; _++) {
                                    t(H[_]);
                                }
                                for (var B in G) {
                                    G[B] = null;
                                }
                                G = null;
                                for (var C in swfobject) {
                                    swfobject[C] = null;
                                }
                                swfobject = null;
                            });
                        }
                    }();
                    return {
                        registerObject: function (_, B, $, C) {
                            if (G.w3 && _ && B) {
                                var A = {};
                                A.id = _;
                                A.swfVersion = B;
                                A.expressInstall = $;
                                A.callbackFn = C;
                                d[d.length] = A;
                                k(_, false);
                            } else {
                                if (C) {
                                    C({success: false, id: _});
                                }
                            }
                        }, getObjectById: function ($) {
                            if (G.w3) {
                                return s($);
                            }
                        }, embedSWF: function (E, J, K, H, F, D, N, B, L, _) {
                            var I = {success: false, id: J};
                            if (G.w3 && !(G.wk && G.wk < 312) && E && J && K && H && F) {
                                k(J, false);
                                M(function () {
                                    K += "";
                                    H += "";
                                    var P = {};
                                    if (L && typeof L === p) {
                                        for (var M in L) {
                                            P[M] = L[M];
                                        }
                                    }
                                    P.data = E;
                                    P.width = K;
                                    P.height = H;
                                    var Q = {};
                                    if (B && typeof B === p) {
                                        for (var G in B) {
                                            Q[G] = B[G];
                                        }
                                    }
                                    if (N && typeof N === p) {
                                        for (var O in N) {
                                            if (typeof Q.flashvars != $) {
                                                Q.flashvars += "&" + O + "=" + N[O];
                                            } else {
                                                Q.flashvars = O + "=" + N[O];
                                            }
                                        }
                                    }
                                    if (A(F)) {
                                        var R = m(P, Q, J);
                                        if (P.id == J) {
                                            k(J, true);
                                        }
                                        I.success = true;
                                        I.ref = R;
                                    } else {
                                        if (D && C()) {
                                            P.data = D;
                                            S(P, Q, J, _);
                                            return;
                                        } else {
                                            k(J, true);
                                        }
                                    }
                                    if (_) {
                                        _(I);
                                    }
                                });
                            } else {
                                if (_) {
                                    _(I);
                                }
                            }
                        }, switchOffAutoHideShow: function () {
                            f = false;
                        }, ua: G, getFlashPlayerVersion: function () {
                            return {major: G.pv[0], minor: G.pv[1], release: G.pv[2]};
                        }, hasFlashPlayerVersion: A, createSWF: function (A, $, _) {
                            if (G.w3) {
                                return m(A, $, _);
                            } else {
                                return undefined;
                            }
                        }, showExpressInstall: function (B, $, A, _) {
                            if (G.w3 && C()) {
                                S(B, $, A, _);
                            }
                        }, removeSWF: function ($) {
                            if (G.w3) {
                                t($);
                            }
                        }, createCSS: function ($, B, _, A) {
                            if (G.w3) {
                                l($, B, _, A);
                            }
                        }, addDomLoadEvent: M, addLoadEvent: o, getQueryParamValue: function ($) {
                            var B = g.location.search || g.location.hash;
                            if (B) {
                                if (/\?/.test(B)) {
                                    B = B.split("?")[1];
                                }
                                if ($ == null) {
                                    return F(B);
                                }
                                var _ = B.split("&");
                                for (var A = 0; A < _.length; A++) {
                                    if (_[A].substring(0, _[A].indexOf("=")) == $) {
                                        return F(_[A].substring((_[A].indexOf("=") + 1)));
                                    }
                                }
                            }
                            return "";
                        }, expressInstallCallback: function () {
                            if (b) {
                                var $ = a(U);
                                if ($ && e) {
                                    $.parentNode.replaceChild(e, $);
                                    if (R) {
                                        k(R, true);
                                        if (G.ie && G.win) {
                                            e.style.display = "block";
                                        }
                                    }
                                    if (_) {
                                        _(D);
                                    }
                                }
                                b = false;
                            }
                        }
                    };
                }();
                (function (G, H) {
                    var K = G.ufp = G.ufp || {}, Q = K.util = K.util || {}, L = /[\d][\d\.\_,\-]*/, D = /[\.\_,\-]/g;
                    Q.getActiveXObject = _;
                    Q.isDefined = I;
                    Q.isArray = N;
                    Q.isFunc = C;
                    Q.isString = R;
                    Q.isNum = E;
                    Q.isStrNum = F;
                    Q.getNum = A;
                    Q.formatNum = J;
                    Q.garbage = B;
                    Q.getAXOByClsid = P;
                    Q.postData = $;
                    Q.wload = G.wload = M;
                    function M($) {
                        M.stack.push($);
                        if (M.isReady) {
                            return M.run();
                        }
                        if (document.all) {
                            G.attachEvent("onload", M.run);
                        } else {
                            G.addEventListener("load", M.run, false);
                        }
                    }

                    M.run = function () {
                        M.isReady = true;
                        var $ = M.stack.shift();
                        while (typeof $ == "function") {
                            $();
                            $ = M.stack.shift();
                        }
                    };
                    M.stack = [];
                    M.isReady = false;
                    function _(A) {
                        var _ = null;
                        try {
                            _ = new G.ActiveXObject(A);
                        } catch ($) {
                        }
                        return _;
                    }

                    function I($) {
                        return typeof $ != "undefined";
                    }

                    function N($) {
                        return (/array/i).test(Object.prototype.toString.call($));
                    }

                    function C($) {
                        return typeof $ == "function";
                    }

                    function R($) {
                        return typeof $ == "string";
                    }

                    function E($) {
                        return typeof $ == "number";
                    }

                    function F($) {
                        return (typeof $ == "string" && (/\d/).test($));
                    }

                    function A(_, A) {
                        var $ = F(_) ? (I(A) ? new RegExp(A) : L).exec(_) : null;
                        return $ ? $[0] : null;
                    }

                    function J(_, B) {
                        if (!F(_)) {
                            return null;
                        }
                        if (!E(B)) {
                            B = 4;
                        }
                        B--;
                        var A = _.replace(/\s/g, "").split(D).concat(["0", "0", "0", "0"]);
                        for (var $ = 0; $ < 4; $++) {
                            if (/^(0+)(.+)$/.test(A[$])) {
                                A[$] = RegExp.$2;
                            }
                            if ($ > B || !(/\d/).test(A[$])) {
                                A[$] = "0";
                            }
                        }
                        return A.slice(0, 4).join(",");
                    }

                    function B() {
                        if (!G.CollectGarbage || B.enable) {
                            return;
                        }
                        B.enable = 1;
                        G.setTimeout(function () {
                            B.enable = 0;
                            G.CollectGarbage();
                        }, 1000);
                    }

                    function P(A) {
                        A = A.replace("clsid:", "");
                        A = A.replace("{", "");
                        A = A.replace("}", "");
                        A = "clsid:" + A;
                        var D = document.createElement("span"), _ = "<" + 'object classid="' + A + '" ' + 'id="deployJavaPlugin" width="0" height="0">' + "<" + "/" + "object" + ">", $ = false;
                        D.innerHTML = _;
                        var C = null;
                        if (D.firstChild.object) {
                            C = D.firstChild;
                        }
                        setTimeout(function () {
                            D.innerHTML = "";
                            B();
                        }, 1000);
                        return C;
                    }

                    function O() {
                        var $ = false;
                        try {
                            $ = new ActiveXObject("Msxml2.XMLHTTP");
                        } catch (A) {
                            try {
                                $ = new ActiveXObject("Microsoft.XMLHTTP");
                            } catch (_) {
                                $ = false;
                            }
                        }
                        if (!$ && typeof XMLHttpRequest != "undefined") {
                            $ = new XMLHttpRequest();
                        }
                        return $;
                    }

                    function $(B, A, _) {
                        var $ = O();
                        $.open("POST", B, true);
                        $.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
                        $.setRequestHeader("If-Modified-Since", "0");
                        if (typeof _ === "function") {
                            $.onreadystatechange = function () {
                                if ($.readyState == 4 && $.status == 200) {
                                    var A = $.responseText;
                                    _(A);
                                }
                            };
                        }
                        $.send(A);
                    }
                })(window);
                (function (G, H) {
                    G.Store = G.Store || {};
                    var J = G.document, _ = G.indexedDB || G.webkitIndexedDB || G.mozIndexedDB || G.msIndexedDB, $ = G.IDBTransaction || G.webkitIDBTransaction, F = G.IDBKeyRange || G.webkitIDBKeyRange, O = ($ && $.READ_ONLY == 0) ? 0 : "readonly", K = ($ && $.READ_WRITE) || "readwrite", A = ($ && $.VERSION_CHANGE) || "versionchange", I = G.globalStorage && G.globalStorage[G.location.host], L = G.localStorage || I, C = {
                        IDBKeyRange: F,
                        TransactionType: {READ_ONLY: O, READ_WRITE: K, VERSION_CHANGE: A},
                        indexedDB: _,
                        name: "db_defalut",
                        version: "1",
                        tbName: "tb_dufault",
                        db: null,
                        status: 0,
                        error: [],
                        async: true,
                        init: function (B) {
                            var A = this, $;
                            if (!_) {
                                A.status = -1;
                                return;
                            }
                            A.status = 2;
                            if (B) {
                                B.name ? A.name = B.name : "";
                                B.version ? A.version = B.version : "";
                                B.tbName ? A.tbName = B.tbName : "";
                            }
                            $ = _.open(A.name, A.version);
                            if (!$) {
                                A.status = -1;
                                return;
                            }
                            $.onupgradeneeded = function ($) {
                                A._initStore($.target.transaction);
                            };
                            $.onsuccess = function (_) {
                                var $ = _.target.result;
                                if ($.version != A.version) {
                                    var B = $.setVersion(A.version);
                                    B.onsuccess = function ($) {
                                        A._initStore($.target.transaction);
                                    };
                                } else {
                                    A.db = $;
                                    A.status = 1;
                                }
                            };
                            $.onerror = A._cbError;
                        },
                        get: function (D, B) {
                            var C = this, $, _, A;
                            $ = C.db.transaction(C.tbName, O);
                            _ = $.objectStore(C.tbName);
                            A = _.get(D);
                            A.onsuccess = function ($) {
                                B($.target.result);
                            };
                            A.onerror = function ($) {
                                B(null, $);
                            };
                        },
                        set: function (F, D, C) {
                            var E = this, _ = E.db, $, A, B;
                            $ = _.transaction(E.tbName, K);
                            A = $.objectStore(E.tbName);
                            B = A.put(D, F);
                            B.onsuccess = function (_) {
                                var $ = _.target.result;
                                (C instanceof Function) ? C($) : "";
                            };
                            B.onerror = function ($) {
                                (C instanceof Function) ? C(null, $) : "";
                            };
                        },
                        _initStore: function (_) {
                            var B = this, $ = _.db, A;
                            if (!$.objectStoreNames.contains(B.tbName)) {
                                A = $.createObjectStore(B.tbName);
                            }
                            _.oncomplete = function ($) {
                                B.db = $.target.db;
                                B.status = 1;
                            };
                            _.onerror = B._cbError;
                            _.onabort = B._cbError;
                        },
                        _cbError: function (A) {
                            var B = this, _ = A.target.error, $ = _.name + ": " + _.message;
                            B.error.push([$, _]);
                            B.status = -2;
                        }
                    }, M = {
                        name: "_default", status: 0, db: null, error: null, init: function (B) {
                            try {
                                var A = this, _ = J.createElement("div");
                                if (B) {
                                    B.name ? A.name = B.name : "";
                                }
                                _.id = A.name;
                                _.style.display = "none";
                                _.style.behavior = "url('#default#userData')";
                                J.body.appendChild(_);
                                A.db = _;
                                A.set("test", "ok");
                                A.status = A.get("test") == "ok" ? 1 : -1;
                            } catch ($) {
                                A.error = $;
                                A.status = -1;
                            }
                        }, set: function (A, $) {
                            var _ = this.db;
                            _.load(_.name);
                            _.setAttribute(A, $);
                            _.save(_.name);
                        }, get: function (B, _) {
                            var A = this.db, $;
                            A.load(A.name);
                            $ = A.getAttribute(B);
                            _ ? _($) : "";
                            return $;
                        }
                    }, N = {
                        name: "_default",
                        version: 1,
                        status: 0,
                        size: 1024,
                        tbName: "table_default",
                        db: null,
                        async: true,
                        init: function (A) {
                            var _ = this, $;
                            if (!G.openDatabase) {
                                _.status = -1;
                                return;
                            }
                            _.status = 2;
                            if (A) {
                                A.name ? _.name = A.name : "";
                                A.version ? _.version = A.version : "";
                                A.size ? _.size = A.size : "";
                                A.tbName ? _.tbName = A.tbName : "";
                            }
                            $ = G.openDatabase(_.name, "", "", _.size);
                            $.transaction(function ($) {
                                $.executeSql("CREATE TABLE IF NOT EXISTS " + _.tbName + " (key unique, value)");
                            }, function ($) {
                                _.status = -1;
                                throw"SQLError:" + $.message;
                            });
                            _.db = $;
                            _.status = 1;
                        },
                        set: function (B, _) {
                            var A = this, $ = A.db;
                            $.transaction(function ($) {
                                $.executeSql("SELECT COUNT(*) c FROM " + A.tbName + " WHERE key = ?", [B], function (C, D) {
                                    var $ = "INSERT INTO " + A.tbName + " (value, key) VALUES(?, ?)";
                                    if (D.rows.item(0).c > 0) {
                                        $ = "UPDATE " + A.tbName + " SET value = ? WHERE key = ?";
                                    }
                                    C.executeSql($, [_, B]);
                                });
                            });
                        },
                        get: function (B, _) {
                            var A = this, $ = A.db;
                            $.readTransaction(function ($) {
                                $.executeSql("SELECT value FROM " + A.tbName + " WHERE key = ?", [B], function ($, A) {
                                    A.rows.length > 0 ? _(A.rows.item(0).value) : _(null);
                                });
                            });
                        }
                    }, E = {
                        status: !!G.navigator.cookieEnabled / 1 || -1, db: J, set: function (B, A, $) {
                            var _ = 356 * 24 * 60 * 60 * 1000, $ = new Date().valueOf() + (parseInt($) || _);
                            document.cookie = B + "=" + A + ";expires=" + new Date($).toGMTString();
                        }, get: function (C, B) {
                            var A = new RegExp("(^| )" + C + "=([^;]*)(;|$)"), _ = document.cookie.match(A), $ = _ && _[2];
                            B ? B($) : "";
                            return $;
                        }
                    }, B = {
                        status: !!L / 1 || -1, db: L, set: function (_, $) {
                            L.setItem(_, $);
                        }, get: function (A, _) {
                            var $ = L.getItem(A);
                            _ ? _($) : "";
                            return $;
                        }
                    }, D = {
                        conf: {name: "ufp", version: 1, tbName: "ufpInfo"},
                        status: false,
                        stores: [[C, 0], [N, 0], [M, 0], [E, 0], [B, 0]],
                        init: function () {
                            var B = D.stores, C, A, $, _;
                            for (C = 0; C < B.length; C++) {
                                A = B[C][0];
                                if (A.status == 0) {
                                    A.init(D.conf);
                                }
                            }
                            $ = 100;
                            _ = G.setInterval(function () {
                                $--;
                                for (var A = 0; A < B.length && $ > 0; A++) {
                                    if (B[A][0].status == 0 || B[A][0].status == 2) {
                                        return;
                                    }
                                    B[A][1] = B[A][0].status;
                                }
                                D.status = true;
                                G.clearInterval(_);
                            }, 10);
                        },
                        set: function (H, E, $, C) {
                            try {
                                if (D.status) {
                                    var F = D.stores, I = 0, B, A = new Date().valueOf();
                                    for (; I < F.length; I++) {
                                        B = F[I][0];
                                        if (B.status == 1) {
                                            B.set(H, E, $, C);
                                        }
                                    }
                                } else {
                                    G.setTimeout(function () {
                                        D.set(H, E, $, C);
                                    }, 10);
                                }
                            } catch (_) {
                            }
                        },
                        get: function (F, C) {
                            if (D.status) {
                                var E = D.stores, H = 0, B, A, $ = [];
                                A = function (_) {
                                    A.count--;
                                    if (_) {
                                        $.push(_);
                                    }
                                };
                                A.count = 0;
                                for (; H < E.length; H++) {
                                    B = E[H][0];
                                    if (B.status == 1) {
                                        A.count++;
                                        B.get(F, A);
                                    }
                                }
                                var _ = G.setInterval(function () {
                                    var B;
                                    if (A.count == 0) {
                                        if ($.length > 0) {
                                            B = $[0];
                                        } else {
                                            B = null;
                                        }
                                        C(B);
                                        G.clearInterval(_);
                                    }
                                }, 10);
                            } else {
                                G.setTimeout(function () {
                                    D.get(F, C);
                                }, 10);
                            }
                        }
                    };
                    G.Store.DB = D;
                    G.Store.LocalStorageHelper = B;
                    G.Store.CookieHelper = E;
                    G.Store.WebSQLHelper = N;
                    G.Store.UserDataHelper = M;
                    G.Store.IndexedDBHelper = C;
                })(window);
                (function (Q, D) {
                    var H = Q.ufp = Q.ufp || {}, W = H.util, F = H.config, _ = F.Detectable_Components_in_Internet_Explorer_by_capclient, C = Q.document, P = Q.navigator, E = H.browser = J(), L = H.OS = A();
                    H.screenInfo = M();
                    W.wload(function () {
                        N(function ($) {
                            H.fonts = $;
                        });
                        H.plugins = G();
                    });
                    function J() {
                        var D = {}, A = P.userAgent || "", E = C.documentMode;
                        try {
                            C.documentMode = "";
                        } catch (_) {
                        }
                        D.isIE = W.isNum(C.documentMode) ? !0 : !1;
                        try {
                            C.documentMode = E;
                        } catch (_) {
                        }
                        D.verIE = null;
                        if (D.isIE) {
                            D.verIE = C.documentMode || ((/^(?:.*?[^a-zA-Z])??(?:MSIE|rv\s*\:)\s*(\d+\.?\d*)/i).test(A) ? parseFloat(RegExp.$1, 10) : 7);
                        }
                        if (!D.isIE) {
                            var B = P.vendor || "", $ = P.product || "";
                            D.isGecko = (/Gecko/i).test($) && (/Gecko\s*\/\s*\d/i).test(A);
                            D.verGecko = D.isGecko ? W.formatNum((/rv\s*\:\s*([\.\,\d]+)/i).test(A) ? RegExp.$1 : "0.9") : null;
                            D.isChrome = (/(Chrome|CriOS)\s*\/\s*(\d[\d\.]*)/i).test(A);
                            D.verChrome = D.isChrome ? W.formatNum(RegExp.$2) : null;
                            D.isSafari = !D.isChrome && ((/Apple/i).test(B) || !B) && (/Safari\s*\/\s*(\d[\d\.]*)/i).test(A);
                            D.verSafari = D.isSafari && (/Version\s*\/\s*(\d[\d\.]*)/i).test(A) ? W.formatNum(RegExp.$1) : null;
                            D.isOpera = (/Opera\s*[\/]?\s*(\d+\.?\d*)/i).test(A);
                            D.verOpera = D.isOpera && ((/Version\s*\/\s*(\d+\.?\d*)/i).test(A) || 1) ? parseFloat(RegExp.$1, 10) : null;
                        }
                        if (D.isIE) {
                            D.name = "IE";
                            D.version = D.verIE;
                        } else {
                            if (D.isGecko) {
                                D.name = "Gecko";
                                D.version = D.verGecko;
                            } else {
                                if (D.isChrome) {
                                    D.name = "Chrome";
                                    D.version = D.verChrome;
                                } else {
                                    if (D.isSafari) {
                                        D.name = "Safari";
                                        D.version = D.verSafari;
                                    } else {
                                        if (D.isOpera) {
                                            D.name = "Opera";
                                            D.version = D.verOpera;
                                        }
                                    }
                                }
                            }
                        }
                        return D;
                    }

                    function T() {
                        var $ = {enable: false, version: R()};
                        if (/hasFlash\=true/.test(location)) {
                            $.enable = true;
                            return $;
                        }
                        if (/hasFlash\=false/.test(location)) {
                            $.enable = false;
                            return $;
                        }
                        $.enable = W.formatNum($.version.match(/\d+/g).join(",")) != "0,0,0,0";
                        return $;
                    }

                    function R() {
                        try {
                            try {
                                var _ = new ActiveXObject("ShockwaveFlash.ShockwaveFlash.6");
                                try {
                                    _.AllowScriptAccess = "always";
                                } catch ($) {
                                    return "6,0,0,0";
                                }
                            } catch ($) {
                            }
                            return new ActiveXObject("ShockwaveFlash.ShockwaveFlash").GetVariable("$version").replace(/\D+/g, ",").match(/^,?(.+),?$/)[1];
                        } catch ($) {
                            try {
                                if (P.mimeTypes["application/x-shockwave-flash"].enabledPlugin) {
                                    return (P.plugins["Shockwave Flash 2.0"] || P.plugins["Shockwave Flash"]).description.replace(/\D+/g, ",").match(/^,?(.+),?$/)[1];
                                }
                            } catch ($) {
                            }
                        }
                        return "0,0,0,0";
                    }

                    function A() {
                        var A = F.platforms, _ = 999, $ = P.platform || "";
                        if ($) {
                            for (var B = 0; B < A.length; B++) {
                                if (A[B] && new RegExp(A[B][0], "i").test($)) {
                                    return A[B][1];
                                }
                            }
                        }
                        return _;
                    }

                    function M() {
                        var $ = Q.screen;
                        return $.width + "*" + $.height + "*" + $.colorDepth;
                    }

                    function N(A) {
                        var C = F.flashUrl_fonts, _ = 100;

                        function $(C) {
                            _--;
                            if ((typeof C.getFonts) != "undefined" || _ < 0) {
                                try {
                                    fontsStr = C.getFonts();
                                } catch (B) {
                                    fontsStr = "";
                                }
                                A(fontsStr);
                            } else {
                                setTimeout(function () {
                                    $(C);
                                }, 200);
                            }
                        }

                        B(C, $);
                    }

                    function B(I, D, _) {
                        Q.loadFlash_guid = Q.loadFlash_guid || 1;
                        var B = {}, G = {
                            menu: "false",
                            scale: "noScale",
                            allowFullscreen: "true",
                            allowScriptAccess: "always",
                            wmode: "direct"
                        }, F = {id: "swfid" + Q.loadFlash_guid++};
                        if (!_) {
                            _ = F.id + "continner";
                            var A = C.createElement("div");
                            A.style.position = "absolute";
                            A.style.height = "1px";
                            A.style.width = "1px";
                            A.style.left = "1px";
                            A.style.top = (C.body.scrollTop || C.documentElement.scrollTop) + "px";
                            A.style.zIndex = "9999";
                            C.body.appendChild(A);
                            A.appendChild(C.createElement("div"));
                            A.firstChild.id = _;
                        }
                        swfobject.embedSWF(I, _, "1px", "1px", "10.0.0", "expressInstall.swf", B, G, F);
                        var H;

                        function E() {
                            D(H);
                        }

                        var J = 100;

                        function $() {
                            J--;
                            H = C.getElementById(F.id);
                            if (H && (typeof H.GetVariable) != "undefined") {
                                E();
                            } else {
                                if (J > 0) {
                                    setTimeout($, 100);
                                }
                            }
                        }

                        $();
                    }

                    function I() {
                        if (I.cc) {
                            return I.cc;
                        }
                        if (I.init || !E.isIE || L != 1) {
                            return false;
                        }
                        I.init = 1;
                        var _ = C.createElement("div");
                        _.style.height = "1px";
                        _.style.width = "1px";
                        _.style.left = "1px";
                        _.style.top = "1px";
                        _.id = "oClientCaps";
                        _.position = "absolute";
                        _.style.behavior = "url('#default#clientcaps')";
                        try {
                            _.getComponentVersion("{7790769C-0471-11D2-AF11-00C04FA35D02}", "ComponentID");
                            I.cc = _;
                            return _;
                        } catch ($) {
                            return null;
                        }
                    }

                    function V(C, $) {
                        C = C.replace("clsid:", "");
                        C = C.replace("{:", "");
                        C = C.replace("}:", "");
                        var B = false, A;
                        for (A in _) {
                            if (_[A] == C) {
                                B = true;
                                break;
                            }
                        }
                        if (B && $) {
                            return $.getComponentVersion("{" + C + "}", "ComponentID") || "";
                        }
                        return "";
                    }

                    function O(_) {
                        var B = false, A;
                        if (_) {
                            B = _.javaEnabled;
                            A = K(_);
                        }
                        A = A || X() || $() || S();
                        B = B || !!A;
                        return {enable: B, version: A};
                    }

                    function X() {
                        var A = 0, $, _;
                        for (; A < P.mimeTypes.length; ++A) {
                            $ = P.mimeTypes[A].type;
                            _ = $.match(/^application\/x-java-applet;jpi-version=(.*)$/);
                            if (_) {
                                return _[1];
                            }
                        }
                        return "";
                    }

                    function $() {
                        if ((!P.plugins) || (!P.plugins.length)) {
                            return false;
                        }
                        var $ = P.platform.toLowerCase(), A = 0, _;
                        for (; A < P.plugins.length; ++A) {
                            _ = P.plugins[A].description;
                            if (_.search(/\bJava\b/) != -1) {
                                /Plug-in ([\d,.]+)/.test(_);
                                return RegExp.$1 || "";
                            }
                        }
                    }

                    function K($) {
                        var _ = "08B0E5C0-4FCB-11CF-AAA5-00401C608500";
                        return V(_, $);
                    }

                    function S() {
                        var F = C.createElement("span"), B = "<" + 'object classid="clsid:CAFEEFAC-DEC7-0000-0000-ABCDEFFEDCBA" ' + 'id="deployJavaPlugin" width="0" height="0">' + "<" + "/" + "object" + ">", $ = false, E = null, A, _, D = 0;
                        F.innerHTML = B;
                        if (F.firstChild.object) {
                            A = [];
                            E = F.firstChild.object;
                            _ = E.jvms;
                            for (; D < _.getLength(); D++) {
                                A[D] = _.get(D).version;
                            }
                            $ = A.join(",");
                        }
                        F.innerHTML = "";
                        W.garbage();
                        return $;
                    }

                    function G() {
                        var B = P.plugins, A = [], H, K, G, D = F.plugins;
                        if (B.length > 0) {
                            for (K = 0; K < B.length; K++) {
                                H = B[K];
                                A.push(H.description + "::" + H.filename + "::" + H.name);
                            }
                        } else {
                            if (E.isIE) {
                                var C = I(), J = O(C), $ = T();
                                A.push("Flash: " + $.enable + "," + $.version);
                                A.push("Java: " + J.enabled + "," + J.version);
                                for (K in D) {
                                    G = U(K, D[K]);
                                    if (G) {
                                        A.push(K + ":1");
                                    }
                                }
                                if (C) {
                                    for (K in _) {
                                        H = _[K];
                                        G = V(H);
                                        if (G) {
                                            A.push(K + ":" + G);
                                        }
                                    }
                                }
                            }
                        }
                        return A.join("|");
                    }

                    function U(I, F) {
                        var H = F || {}, D = H.classid || "", E = H.type || "", K = H.codebase || "", G = H.version || "", L = C.createElement("span"), J = "", B = "", _ = '<object width="1" height="1" style="display:none;" ' + (K ? "codebase=" + K + (G ? "#version=" + G : "") : ""), A = ' classid="' + D + '"' + ' type="' + E + '"' + ">" + B + "<" + "/object>", $ = false;
                        L.innerHTML = _ + J + A;
                        if (L.firstChild.object) {
                            x = L.firstChild.object;
                            $ = true;
                        }
                        L.innerHTML = "";
                        W.garbage();
                        return $;
                    }
                })(window);
                wload(function () {
                    var ufp = window.ufp, util = ufp.util, postUrl = ufp.config.fpPostInterface, sendUrl = ufp.config.fpCollectInterface;
                    Store.DB.init();
                    var tid = {
                        key: "tid",
                        value: "",
                        recover: 0,
                        confidence: "",
                        postInterface: postUrl,
                        fpCollectInterface: sendUrl,
                        callbackStack: [],
                        init: function () {
                            tid.get();
                        },
                        runstack: function () {
                            var $;
                            while ($ = tid.callbackStack.pop()) {
                                $(tid.value, tid.recover, tid.confidence);
                            }
                        },
                        get: function ($) {
                            // $ = $ || function () {
                            //     };
                            tid.callbackStack.push($);
                            if (tid.value) {
                                return tid.runstack();
                            }
                            Store.DB.get(tid.key, function ($) {
                                if (!$) {
                                    tid.getTidFromServer();
                                } else {
                                    if (Store.CookieHelper.get(tid.key) != $) {
                                        tid.recover = 1;
                                    }
                                    tid.value = $;
                                    tid.confidence = "100";
                                    if (/(.*)\_{2}(\d{3})$/.test($)) {
                                        tid.value = RegExp.$1;
                                        tid.confidence = RegExp.$2;
                                    }
                                    Store.DB.set(tid.key, $);
                                    tid.runstack();
                                    if (window.use_fp && tid.confidence == "100") {
                                        tid.sendTidInfo();
                                    }
                                }
                            });
                        },
                        getTidFromServer: function () {
                            tid.getTidFromServer = function () {
                            };
                            if (window.use_fp) {
                                getFp(function (data) {
                                    util.postData(window.location.protocol + "//" + window.location.host + "/" + tid.postInterface, "cb=gen_callback&fp=" + encodeURIComponent(data), function (res) {
                                        if (res) {
                                            eval(res);
                                        }
                                    });
                                });
                            } else {
                                util.postData(window.location.protocol + "//" + window.location.host + "/" + tid.postInterface, "cb=gen_callback", function (res) {
                                    if (res) {
                                        eval(res);
                                    }
                                });
                            }
                        },
                        sendTidInfo: function () {
                            tid.sendTidInfo = function () {
                            };
                            getFp(function ($) {
                                util.postData(window.location.protocol + "//" + window.location.host + "/" + tid.fpCollectInterface, "tid=" + encodeURIComponent(tid.value) + "&confidence=" + tid.confidence + "&fp=" + encodeURIComponent($));
                            });
                        }
                    };

                    function getFp(_) {
                        if (ufp.fonts || getFp.time > 300) {
                            var B = {
                                os: ufp.OS,
                                browser: ufp.browser.name + ufp.browser.version,
                                fonts: ufp.fonts,
                                screenInfo: ufp.screenInfo,
                                plugins: ufp.plugins
                            }, $ = '{"os":"[os]","browser":"[browser]","fonts":"[fonts]","screenInfo":"[screenInfo]","plugins":"[plugins]"}';
                            for (var A in B) {
                                $ = $.replace(new RegExp("\\[" + A + "\\]", "g"), (B[A] + "").replace(/['"]/g, "\\$&"));
                            }
                            _($);
                        } else {
                            getFp.time ? getFp.time++ : getFp.time = 1;
                            setTimeout((function ($) {
                                return function () {
                                    getFp($);
                                };
                            })(_), 10);
                        }
                    }

                    window.gen_callback = function (A) {
                        var $ = false, _;
                        if (A) {
                            if (A.retcode == 20000000) {
                                _ = typeof(A.data.confidence) != "undefined" ? "000" + A.data.confidence : "100";
                                // wplct _ = 100
                                tid.recover = A.data.new_tid ? 3 : 2;
                                // wplct: tid.recover=3
                                tid.confidence = _ = _.substring(_.length - 3);
                                $ = A.data.tid;
                                Store.DB.set(tid.key, $ + "__" + _);
                            }
                        }
                        tid.value = $;
                        tid.runstack();
                    };
                    tid.init();
                    window.tid = tid;
                });
                tFp(function (data) {
                    util.postData(window.location.protocol + "//" + window.location.host + "/" + tid.postInterface, "cb=gen_callback&fp=" + encodeURIComponent(data), function (res) {
                        if (res) {
                            eval(res);
                        }
                    });
                });
            } else {
                util.postData(window.location.protocol + "//" + window.location.host + "/" + tid.postInterface, "cb=gen_callback", function (res) {
                    if (res) {
                        eval(res);
                    }
                });
            }
        },
        sendTidInfo: function () {
            tid.sendTidInfo = function () {
            };
            getFp(function ($) {
                util.postData(window.location.protocol + "//" + window.location.host + "/" + tid.fpCollectInterface, "tid=" + encodeURIComponent(tid.value) + "&confidence=" + tid.confidence + "&fp=" + encodeURIComponent($));
            });
        }
    };

    function getFp(_) {
        if (ufp.fonts || getFp.time > 300) {
            var B = {
                os: ufp.OS,
                browser: ufp.browser.name + ufp.browser.version,
                fonts: ufp.fonts,
                screenInfo: ufp.screenInfo,
                plugins: ufp.plugins
            }, $ = '{"os":"[os]","browser":"[browser]","fonts":"[fonts]","screenInfo":"[screenInfo]","plugins":"[plugins]"}';
            for (var A in B) {
                $ = $.replace(new RegExp("\\[" + A + "\\]", "g"), (B[A] + "").replace(/['"]/g, "\\$&"));
            }
            _($);
        } else {
            getFp.time ? getFp.time++ : getFp.time = 1;
            setTimeout((function ($) {
                return function () {
                    getFp($);
                };
            })(_), 10);
        }
    }

    window.gen_callback = function (A) {
        var $ = false, _;
        if (A) {
            if (A.retcode == 20000000) {
                _ = typeof(A.data.confidence) != "undefined" ? "000" + A.data.confidence : "100";
                tid.recover = A.data.new_tid ? 3 : 2;
                tid.confidence = _ = _.substring(_.length - 3);
                $ = A.data.tid;
                Store.DB.set(tid.key, $ + "__" + _);
            }
        }
        tid.value = $;
        tid.runstack();
    };
    tid.init();
    window.tid = tid;
});