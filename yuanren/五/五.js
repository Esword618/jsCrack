function a(e, t, n, a, r, o, s) {
    return i(t & n | ~t & a, e, t, r, o, s)
}

function t(e, t) {
    var n = (65535 & e) + (65535 & t);
    return (e >> 16) + (t >> 16) + (n >> 16) << 16 | 65535 & n
}

function n(e, t) {
    return e << t | e >>> 32 - t
}

function i(e, i, a, r, o, s) {
    return t(n(t(t(i, e), t(r, s)), o), a)
}

window = global;
var _$8K = window
    , _$r7 = String;
var _$7T = Error
    , _$Kj = Array
    , _$Uj = Math
    , _$zp = parseInt
    , _$R4 = Date
    // , _$Is = document
    , _$n3 = Object
    , _$J9 = unescape
    , _$ZH = encodeURIComponent
    , _$zk = Function;
// $_zw[9] = "eval";
_$UH = [];
_$UH[608] = "XMLHttpRequest";
_$UH[8] = "prototype";
_$UH[108] = "length";
_$UH[31] = "toString";
_$UH[276] = "fromCharCode";
_$UH[15] = "charCodeAt";
_$UH[39] = "charCodeAt";
_$UH[255] = "parse";

function _$f$() {
    return _$R4[_$UH[255]](new _$R4())
}

function _$TT() {
    return (new _$R4())['valueOf']()
}

_$tt = _$f$();

function r(e, t, n, a, r, o, s) {
    return i(t & a | n & ~a, e, t, r, o, s)
}

var _$cq = 'T';
var _$Hv;

function o(e, t, n, a, r, o, s) {
    return i(t ^ n ^ a, e, t, r, o, s)
}

var _$pv = 1;
var _$m2 = 0;
var _$AN;

function s(e, t, n, a, r, o, s) {
    return i(n ^ (t | ~a), e, t, r, o, s)
}

//该函数是加密的核心函数，含有很多try..catch..语句，加断点，得到变量的值，简化结构，不然会报错
function l(e, n) {
    e[n >> 5] |= 128 << n % 32,
        e[14 + (n + 64 >>> 9 << 4)] = n;
    // try {
    //     var $_XML = _$8K[_$UH[608]][_$UH[8]]['DONE'] * 4
    // } catch (e) {
    //     var $_XML = 1
    // }
    // try {
    //     _$8K.$_z2[0] = 'Q'
    // } catch (e) {
    //     try {
    //         op = _$8K['$_zw'][_$UH[108]]
    //     } catch (e) {
    //         var total = 0;
    //         for (var i = 0; i < 1000000; i++) {
    //             total = total + i[_$UH[31]]();
    //             // history.pushState(0, 0, total)
    //         }
    //     }
    //      op = 26
    //     if (op > 20) {
    //         b64pad = 1
    //         // eval("b64pad = _$8K.$_zw[9]['length']")
    //     } else if (op < 10) {
    //         _$8K['$_zw'] = [1, 8, 2, 4, 23, 45, 8, 15, 81, 68, 13, 72, 70]
    //     }
    // }
    // // var i, l, c, d, u, h = $_oi, f = $_po, p = $_sb, m = $_xn;
    // try {
    //     if (_$8K['_$6_']) {} else {
    //         _$8K['_$6_'] = 8821003647
    //     }
    // } catch (e) {
    //     _$8K['_$6_'] = 37885443
    // }
    var $_XML = 16
    op = 26
    var b64pad = 1;
    var $_oi = 1732584193;
    var $_po = -271733879;
    var $_sb = -1732584194;
    var $_xn = 271733878;
    var i, l, c, d, u, h = $_oi, f = $_po, p = $_sb, m = $_xn;

    _$8K['_$6_'] = -389564586;
    _$8K['_$tT'] = -660478335;
     _$8K['_$Jy'] = -405537848;
    for (i = 0; i < e[_$UH[108]]; i += $_XML)
        l = h,
            c = f,
            d = p,
            u = m,
            h = a(h, f, p, m, e[i], 7, 513548),
            m = a(m, h, f, p, e[i + 1], 12, _$8K['_$6_']),
            p = a(p, m, h, f, e[i + 2], 17, 606105819),
            f = a(f, p, m, h, e[i + 3], 22, -1044525330),
            h = a(h, f, p, m, e[i + 4], 7, -176418897),
            m = a(m, h, f, p, e[i + 5], 12, 1200080426),
            p = a(p, m, h, f, e[i + 6], 17, -1473231341),
            f = a(f, p, m, h, e[i + 7], 22, -45705983),
            h = a(h, f, p, m, e[i + 8], 7, 1770035416),
            m = a(m, h, f, p, e[i + 9], 12, -1958414417),
            p = a(p, m, h, f, e[i + 10], 17, -42063),
            f = a(f, p, m, h, e[i + 11], 22, -1990404162),
            h = a(h, f, p, m, e[i + 12], 7, 1804603682),
            m = a(m, h, f, p, e[i + 13], 12, -40341101),
            p = a(p, m, h, f, e[i + 14], 17, -1502002290),
            f = a(f, p, m, h, e[i + 15], 22, 1236535329),
            h = r(h, f, p, m, e[i + 1], 5, -165796510),
            m = r(m, h, f, p, e[i + 6], 9, -1069501632),
            p = r(p, m, h, f, e[i + 11], 14, 643717713),
            f = r(f, p, m, h, e[i], 20, -373897302),
            h = r(h, f, p, m, e[i + 5], 5, -701558691),
            m = r(m, h, f, p, e[i + 10], 9, 38016083),
            p = r(p, m, h, f, e[i + 15], 14, _$8K['_$tT']),
            f = r(f, p, m, h, e[i + 4], 20, _$8K['_$Jy']),
            h = r(h, f, p, m, e[i + 9], 5, 568446438),
            m = r(m, h, f, p, e[i + 14], 9, -1019783690),
            p = r(p, m, h, f, e[i + 3], 14, -187363961),
            f = r(f, p, m, h, e[i + 8], 20, 1163531501),
            h = r(h, f, p, m, e[i + 13], 5, -1554681467),
            m = r(m, h, f, p, e[i + 2], 9, -51403784),
            p = r(p, m, h, f, e[i + 7], 14, 1735328473),
            f = r(f, p, m, h, e[i + 12], 20, -1926607734),
            h = o(h, f, p, m, e[i + 5], 4, -37824558),
            m = o(m, h, f, p, e[i + 8], 11, -2022574463),
            p = o(p, m, h, f, e[i + 11], 16, 1839030562),
            f = o(f, p, m, h, e[i + 14], 23, -35309556),
            h = o(h, f, p, m, e[i + 1], 4, -1530992060 * (b64pad)),
            m = o(m, h, f, p, e[i + 4], 11, 1272893353),
            p = o(p, m, h, f, e[i + 7], 16, -155497632),
            f = o(f, p, m, h, e[i + 10], 23, -1094730640),
            h = o(h, f, p, m, e[i + 13], 4, 681279174),
            m = o(m, h, f, p, e[i], 11, -358537222),
            p = o(p, m, h, f, e[i + 3], 16, -722521979),
            f = o(f, p, m, h, e[i + 6], 23, 760291289),
            h = o(h, f, p, m, e[i + 9], 4, -64036887),
            m = o(m, h, f, p, e[i + 12], 11, -421815835),
            p = o(p, m, h, f, e[i + 15], 16, 530742520),
            f = o(f, p, m, h, e[i + 2], 23, -995338651),
            h = s(h, f, p, m, e[i], 6, -198630844),
            m = s(m, h, f, p, e[i + 7], 10, 1126891415),
            p = s(p, m, h, f, e[i + 14], 15, -1416354905),
            f = s(f, p, m, h, e[i + 5], 21, -57434055),
            h = s(h, f, p, m, e[i + 12], 6, 1700485571),
            m = s(m, h, f, p, e[i + 3], 10, -1894746606),
            p = s(p, m, h, f, e[i + 10], 15, -105181523),
            f = s(f, p, m, h, e[i + 1], 21, -2054922799),
            h = s(h, f, p, m, e[i + 8], 6, 1873313359),
            m = s(m, h, f, p, e[i + 15], 10, -30611744),
            p = s(p, m, h, f, e[i + 6], 15, -1560198380),
            f = s(f, p, m, h, e[i + 13], 21, 1309151649),
            h = s(h, f, p, m, e[i + 4], 6, -145523070),
            m = s(m, h, f, p, e[i + 11], 10, -1120210379),
            p = s(p, m, h, f, e[i + 2], 15, 718787259),
            f = s(f, p, m, h, e[i + 9], 21, -343485441),
            h = t(h, l),
            f = t(f, c),
            p = t(p, d),
            m = t(m, u);
    return [h, f, p, m]
}

function c(e) {
    var t, n = "", i = 32 * e[_$UH[108]];
    for (t = 0; t < i; t += 8)
        n += _$r7[_$UH[276]](e[t >> 5] >>> t % 32 & 255);
    return n
}

function d(e) {
    var t, n = [];
    for (n[(e[_$UH[108]] >> 2) - 1] = void 0,
             t = 0; t < n[_$UH[108]]; t += 1)
        n[t] = 0;
    var i = 8 * e[_$UH[108]];
    for (t = 0; t < i; t += 8)
        n[t >> 5] |= (255 & e[_$UH[15]](t / 8)) << t % 32;
    return n
}

function u(e) {
    return c(l(d(e), 8 * e[_$UH[108]]))
}

_$ue = _$UH[39];

function f(e) {
    var t, n, i = "0123456789abcdef", a = "";
    for (n = 0; n < e[_$UH[108]]; n += 1)
        t = e[_$UH[15]](n),
            a += i.charAt(t >>> 4 & 15) + i.charAt(15 & t);
    return a
}

function p(e) {
    return unescape(encodeURIComponent(e))
}

_$Fe = _$UH[39];

function m(e) {
    return u(p(e))
}

function g(e) {
    return f(m(e))
}

function b(e, t, n) {
    return t ? n ? v(t, e) : y(t, e) : n ? m(e) : g(e)
}

function get_my(m) {
    // console.log(b(160000000000))
    return b(m)
}

get_my()