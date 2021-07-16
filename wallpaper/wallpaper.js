const express = require("express");
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));

var CryptoJS = require("crypto-js");
function _0x43f1b9(_0x393fb6) {
    var _0x4d513d = arguments["length"] > 1 && undefined !== arguments[1] ? arguments[1] : "XwKsGlMcdPMEhR1B",
        _0x4b1647 =  CryptoJS.enc.Utf8.parse(_0x4d513d),
        _0x2e1dac =  CryptoJS.enc.Utf8.parse(_0x393fb6),
        _0x84666d = CryptoJS.AES.encrypt(_0x2e1dac, _0x4b1647, {
            "mode": CryptoJS.mode.ECB,
            "padding": CryptoJS.pad.Pkcs7
        });
    return _0x84666d.toString();
}

function pointJson(moveBlockLeft,secretKey) {
    _0x4b1647 = moveBlockLeft
    pointJson =  secretKey ? _0x43f1b9(JSON['stringify']({
            'x': _0x4b1647,
            'y': 0x5
        }), secretKey) : JSON['stringify']({
            'x': _0x4b1647,
            'y': 0x5
        });
    return pointJson

}


e = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";

function atob(r) {
    var o = String(r).replace(/=+$/, "");
    if (o.length % 4 == 1) throw new t("'atob' failed: The string to be decoded is not correctly encoded.");
    for (var n, a, i = 0, c = 0, d = ""; a = o.charAt(c++); ~a && (n = i % 4 ? 64 * n + a : a, i++ % 4) ? d += String.fromCharCode(255 & n >> (-2 * i & 6)) : 0) a = e.indexOf(a);
    return d
}

function btoa(r) {
    for (var o, n, a = String(r), i = 0, c = e, d = ""; a.charAt(0 | i) || (c = "=", i % 1); d += c.charAt(63 & o >> 8 - i % 1 * 8)) {
        if (n = a.charCodeAt(i += .75), n > 255) throw new t("'btoa' failed: The string to be encoded contains characters outside of the Latin1 range.");
        o = o << 8 | n
    }
    return d
}

function _0x41d299(_0x29df17) {
    for (var _0xea945 = [-111, 52, 91, 65, -65, 116, 119, 106, -121, -82, -5, 80, 51, 97, 68, -83, -112, -51, 23, -46, -34, -114, -55, -11, -127, 90, 33, 22, -31, 50, -17, 20, -44, 15, -94, -123, 118, -23, -61, 114, 71, -104, -126, -117, -81, -54, -18, -110, -4, -95, -91, 94, -80, -14, 120, 105, 85, 104, -86, -108, 67, 25, 101, 108, 16, -105, 111, -10, 117, -73, 77, 89, -29, -98, -68, 112, 107, -1, 86, 121, 88, -101, -124, 69, -30, -8, -113, -74, -118, 57, -25, 12, -115, -106, 95, 127, 84, 124, -102, -28, 73, 43, -60, 28, 46, 115, 30, 122, -75, 125, -67, -77, 3, -7, -53, -13, 53, 78, -72, 1, 11, -71, -39, -79, -3, 19, 41, 126, -43, -125, -27, 34, 63, 8, 72, -35, -41, -63, 60, -24, 102, 47, -119, -103, -22, 45, 59, 64, -96, 49, 83, -107, -120, -57, -70, 0, -38, -84, -40, 24, 14, 48, 29, 44, -36, -47, 56, -92, 38, 37, 4, -50, 103, 10, -89, 55, 113, -26, 110, 54, 36, -20, -78, -12, -116, 70, -37, 5, -62, -76, -48, -64, 79, 100, 40, 6, -58, -90, -19, -9, 39, 93, -99, 21, 7, 26, -2, 27, -45, 81, 58, -122, 76, -66, 2, 92, -42, 98, -16, 9, 61, 62, -15, 99, -21, 31, -56, 87, 17, -52, -69, -33, -59, -85, 66, 74, 18, -93, -128, -87, -32, 42, 32, -88, 109, 96, 13, -6, 75, -100, -49, 35, -97, 82, -109, 123], _0x537ece = 0, _0x5c5042 = 0, _0x56d562 = 0, _0x25aa83 = new Array(), _0x5998d = 0; _0x5998d < _0x29df17["length"]; _0x5998d++) {
        _0x537ece = _0x537ece + 1 & 255, _0x5c5042 = (255 & _0xea945[_0x537ece]) + _0x5c5042 & 255;
        var _0x41d299 = _0xea945[_0x537ece];
        _0xea945[_0x537ece] = _0xea945[_0x5c5042], _0xea945[_0x5c5042] = _0x41d299, _0x56d562 = (255 & _0xea945[_0x537ece]) + (255 & _0xea945[_0x5c5042]) & 255, _0x25aa83["push"](_0x29df17[_0x5998d] ^ _0xea945[_0x56d562]);
    }

    return _0x25aa83;
}

function _0x438891(_0x29df17) {
    for (var _0xea945, _0x537ece, _0x5c5042 = "", _0x56d562 = 0; _0x56d562 < _0x29df17["length"];) _0xea945 = _0x29df17[_0x56d562], _0x537ece = 0, _0xea945 >>> 7 === 0 ? (_0x5c5042 += String["fromCharCode"](_0x29df17[_0x56d562]), _0x56d562 += 1) : 252 === (252 & _0xea945) ? (_0x537ece = (3 & _0x29df17[_0x56d562]) << 30, _0x537ece |= (63 & _0x29df17[_0x56d562 + 1]) << 24, _0x537ece |= (63 & _0x29df17[_0x56d562 + 2]) << 18, _0x537ece |= (63 & _0x29df17[_0x56d562 + 3]) << 12, _0x537ece |= (63 & _0x29df17[_0x56d562 + 4]) << 6, _0x537ece |= 63 & _0x29df17[_0x56d562 + 5], _0x5c5042 += String["fromCharCode"](_0x537ece), _0x56d562 += 6) : 248 === (248 & _0xea945) ? (_0x537ece = (7 & _0x29df17[_0x56d562]) << 24, _0x537ece |= (63 & _0x29df17[_0x56d562 + 1]) << 18, _0x537ece |= (63 & _0x29df17[_0x56d562 + 2]) << 12, _0x537ece |= (63 & _0x29df17[_0x56d562 + 3]) << 6, _0x537ece |= 63 & _0x29df17[_0x56d562 + 4], _0x5c5042 += String["fromCharCode"](_0x537ece), _0x56d562 += 5) : 240 === (240 & _0xea945) ? (_0x537ece = (15 & _0x29df17[_0x56d562]) << 18, _0x537ece |= (63 & _0x29df17[_0x56d562 + 1]) << 12, _0x537ece |= (63 & _0x29df17[_0x56d562 + 2]) << 6, _0x537ece |= 63 & _0x29df17[_0x56d562 + 3], _0x5c5042 += String["fromCharCode"](_0x537ece), _0x56d562 += 4) : 224 === (224 & _0xea945) ? (_0x537ece = (31 & _0x29df17[_0x56d562]) << 12, _0x537ece |= (63 & _0x29df17[_0x56d562 + 1]) << 6, _0x537ece |= 63 & _0x29df17[_0x56d562 + 2], _0x5c5042 += String["fromCharCode"](_0x537ece), _0x56d562 += 3) : 192 === (192 & _0xea945) ? (_0x537ece = (63 & _0x29df17[_0x56d562]) << 6, _0x537ece |= 63 & _0x29df17[_0x56d562 + 1], _0x5c5042 += String["fromCharCode"](_0x537ece), _0x56d562 += 2) : (_0x5c5042 += String["fromCharCode"](_0x29df17[_0x56d562]), _0x56d562 += 1);

    return _0x5c5042;
}

function _0x21a6fa(_0x29df17) {
    for (var _0xea945 = atob(_0x29df17), _0x537ece = new Int8Array(_0xea945["length"]), _0x5c5042 = 0; _0x5c5042 < _0xea945["length"]; _0x5c5042++) _0x537ece[_0x5c5042] = _0xea945["charCodeAt"](_0x5c5042);

    return _0x537ece;
}

function _0xbe7c1c(_0x29df17) {
    return _0x438891(_0x41d299(_0x21a6fa(_0x29df17)));
}

function decode(str) {
    var info = _0xbe7c1c(str)
    info_dict = JSON.parse(info)
    // console.log(info_dict)
    return info_dict
}

function captcha(moveBlockLeft,token,secretKey) {
    var captcha = secretKey ? _0x43f1b9(token + '---' + JSON['stringify']({
        'x': moveBlockLeft,
        'y': 0x5
    }), secretKey) : token + '---' + JSON["stringify"]({
        'x': moveBlockLeft,
        'y': 0x5
    });
    return captcha
}
var md5 = require('md5-node');


function _0x50ecce(_0x29df17) {
    for (var _0xea945 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789", _0x537ece = "", _0x5c5042 = 0; _0x5c5042 < _0x29df17; _0x5c5042++) _0x537ece += _0xea945["charAt"](Math["floor"](Math["random"]() * _0xea945["length"]));
    return _0x537ece;
}

function url(_0x29df17, _0xea945) {
    var _0x537ece = "YQTJLVCqattV1T0fhuhJTW1vyH7ZdyE3",
        _0x5998d = "https://doge.zzzmh.cn",
        _0x5c5042 = _0x50ecce(32),
        _0x56d562 = parseInt((_0xea945 || Date["now"]()) / 1000) + 1800,
        _0x25aa83 = _0x29df17["substring"](_0x5998d["length"], -1 == _0x29df17["lastIndexOf"]("?") ? _0x29df17["length"] : _0x29df17["lastIndexOf"]("?")),
        _0x41d299 = _0x56d562 + "-" + _0x5c5042 + "-0-" + md5(_0x25aa83 + "-" + _0x56d562 + "-" + _0x5c5042 + "-0-" + _0x537ece);

    return _0x29df17 + (_0x29df17["indexOf"]("?") < 0 ? "?" : "&") + "auth_key=" + _0x41d299;
}

app.post('/',function(req,res){
    console.log(req.body)
    data = req.body['data']
    var value = eval(data);
    console.log('-------------------------------------------------------')
    res.send(value)
});

app.listen(3000,()=>{
    console.log("监听端口3000成功")
});

// moveBlockLeft = 210.35714285714286;
// token = "4ea3e15a1389475ab778720879fd6322";
// secretKey = "IXDFS4XzLdTpIpty"
// captcha(moveBlockLeft,token,secretKey)

// result = "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"
// console.log(decode(result))
