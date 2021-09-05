var CryptoJS = require("crypto-js");

function sha1(msg) {
    return CryptoJS.SHA1(msg).toString()
}

function aesDecrypt(msg, secret) {
    var bytes = CryptoJS.AES.decrypt(msg, secret);
    return bytes.toString(CryptoJS.enc.Utf8)
}

function encrypt(skey, params, pc_eversion) {
    data = {
        secret: {
            "3c5ad16dbc06cd16ae1fd3344d87f16b": "U2FsdGVkX1/f3zYuiRoYm9vb5Z9R2sDcnm/4rC23IgvW9E8as+kKYw1cSmpBB0eFUycxirbwr17ynjGWr7QAyg=="
        },
        aes: {
            secret: "qyrohlf5sjazleru"
        }
    }
    if (typeof params === "object") {
        var arr = [];
        for (var i in params) {
            if (params[i] === undefined || params[i] === null)
                params[i] = "";
            arr.push(i + "=" + encodeURIComponent(params[i]))
        }
        params = arr.join("&")
    }
    var iv = CryptoJS.lib.WordArray.random(16);
    var secret = data.secret[skey] ? data.secret[skey] : "";
    secret = aesDecrypt(secret, data.aes.secret);
    // console.log(secret)
    var key = CryptoJS.MD5(secret)
    var encrypted = CryptoJS.AES.encrypt(params, key, {
        iv: iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7
    });
    var output = CryptoJS.lib.WordArray.create(iv.words.slice(0));
    output.concat(encrypted.ciphertext);
    edata = output.toString(CryptoJS.enc.Base64);
    // console.log(edata)
    return edata
}

function vipParamsEncrypt(data) {
    skey = "3c5ad16dbc06cd16ae1fd3344d87f16b"
    return encrypt(skey, data)
}

function pc_edata(data) {
    pc_edata = vipParamsEncrypt(data)
    return pc_edata

}

// -----------------------------------

function getCookie(cookie, name) {
    var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
    if (arr = cookie.match(reg))
        if (arr[2])
            return unescape(arr[2]);
    return ""
}

function getEncryptData(data) {
    return {
        // api_key: data && data.api_key ? data.api_key : "70f71280d5d547b2a7bb370a529aeea1",
        api_key: "70f71280d5d547b2a7bb370a529aeea1",
        pc_eversion: 1,
        skey: "3c5ad16dbc06cd16ae1fd3344d87f16b",
        pc_edata: data
    }
}

function hashParam(param, url) {
    var rs = "";
    var keyAry = [];
    if (url && url.indexOf("?") != -1) {
        url = url.split("?")[1];
        if (url.indexOf("#") != -1)
            url = url.split("#")[0];
        var aryUrl = url.split("&");
        for (var i in aryUrl) {
            var arySplit = aryUrl[i].split("=");
            param[arySplit[0]] = arySplit[1] ? arySplit[1] : ""
        }
    }
    for (var i in param)
        keyAry.push(i);
    keyAry = keyAry.sort();
    for (var j in keyAry) {
        if (keyAry[j] == "api_key")
            continue;
        rs += "&" + keyAry[j] + "=" + (param[keyAry[j]] !== undefined && param[keyAry[j]] !== null ? param[keyAry[j]] : "")
    }
    if (rs.length > 0)
        rs = rs.substring(1);
    rs = sha1(rs);
    return rs
}

function getSecret(param) {
    data = {
        "secret": "qyrohlf5sjazleru",
        "enString": {
            "70f71280d5d547b2a7bb370a529aeea1": "U2FsdGVkX197SM3Eh62XyjAwTXznW9DdALdNR1gKNsewAg3fzwA0x/+UQldlbi3oYBn8eFHgTtBUcGneYPCjIA==",
            "8cec5243ade04ed3a02c5972bcda0d3f": "U2FsdGVkX1+ZmG8rT/n9qDbrWBnK0K3G0gsoPo0N6/6qx8AklnZmXLyulj0KAy07ixFAu6oMKmOY0+VH3DjQ2Q==",
            "adf779847ac641dd9590ccc5674e25d2": "U2FsdGVkX1/VI+95aRUsSZCDB3rmMe2DPSUO+rSH7U/tlNnA5u9anTM3oHI+XgIeHWA5XDAo0Z19ddwzFeHFXA=="
        }
    }
    var rs = "";
    var enString = param.api_key && data.enString[param.api_key] ? data.enString[param.api_key] : "";
    return aesDecrypt(enString, data.secret)
}

function replaceHost(url) {
    if (url) {
        url = url.replace(/^http:\/\/[^\/]*/, "");
        url = url.replace(/^https:\/\/[^\/]*/, "");
        url = url.replace(/^\/\/[^\/]*/, "")
    }
    return url
}

function getSign(url, param, cookie) {
        var rs = "";
        var api = replaceHost(url);
        var hashparam = hashParam(param, url);
        var cid = getCookie(cookie, "mars_cid") ? getCookie(cookie, "mars_cid") : "";
        var sid = getCookie(cookie, "mars_sid") ? getCookie(cookie, "mars_sid") : "";
        var secret = getSecret(param);
        rs = sha1(api + hashparam + sid + cid + secret);
        rs = "OAuth api_sign=" + rs;
        return rs
}

function getsign(url, params, cookie) {
    // var singString = getSign(url, params);
    // try {
    //     singString = window.sign ? window.sign.getSign(url, params) : ""
    // } catch (error) {
    //     singString = ""
    // }
    return getSign(url, params, cookie)
}

function Authorization(pc_edata, cookie) {
    url = "https://passport.vip.com/login/postLogin"
    return getsign(url, getEncryptData(pc_edata), cookie)
}

function postLogin(data, cookie) {
    pc_edata = pc_edata(data)
    authorization = Authorization(pc_edata, cookie)
    return {'pc_edata': pc_edata, "authorization": authorization}
}

rand = function (a) {
    var b = "0123456789abcdef"
        , c = ""
        , d = 0;
    for (a = a || 32; d < a; d++)
        c += b.charAt(Math.ceil(1e8 * Math.random()) % b.length);
    return c
}

pad = function (a, b) {
    for (var c = a.toString().length; c < b;)
        a = "0" + a,
            c++;
    return a
}

encryptCid = function (a) {
    var b = a.split("_")
        , c = b[0]
        , d = b[1];
    if (!c || !d)
        return a;
    for (var e = 0, f = c.length, g = 0; g < f; g++)
        e += parseInt(c[g]);
    for (var h = e % 32, i = e, j = d.length, g = 0; g < j; g++)
        g !== h && (i += parseInt(d[g], 16));
    var k = (i % 16).toString(16);
    return c + "_" + d.substr(0, h) + k.toString() + d.substr(h + 1, j)
}

guid = function () {
    for (var a = 0, b = []; a < 8;)
        b.push((65536 * (1 + Math.random()) | 0).toString(16).substring(1)),
            a++;
    return b.join("").toUpperCase()
}

function mars_cid() {
    k = encryptCid(pad((new Date).getTime(), 13) + "_" + rand());
    return k
}

// console.log(mars_cid())

// console.log(postLogin())
// cookie = "vip_first_visitor=1; vip_address=%257B%2522pid%2522%253A%2522103103%2522%252C%2522cid%2522%253A%2522103103102%2522%252C%2522pname%2522%253A%2522%255Cu6d59%255Cu6c5f%255Cu7701%2522%252C%2522cname%2522%253A%2522%255Cu5b81%255Cu6ce2%255Cu5e02%2522%257D; vip_province=103103; vip_province_name=%E6%B5%99%E6%B1%9F%E7%9C%81; vip_city_name=%E5%AE%81%E6%B3%A2%E5%B8%82; vip_city_code=103103102; vip_wh=VIP_SH; vip_ipver=31; user_class=a; VipUINFO=luc%3Aa%7Csuc%3Aa%7Cbct%3Ac_new%7Chct%3Ac_new%7Cbdts%3A0%7Cbcts%3A0%7Ckfts%3A0%7Cc10%3A0%7Crcabt%3A0%7Cp2%3A0%7Cp3%3A0%7Cp4%3A0%7Cp5%3A0%7Cul%3A3105; mars_sid=9785d52680ec0b8c802c6b0bb6f01ecc; mars_pid=0; visit_id=C07EC38FFAC284AED620CAD8BA8E1AAA; VIP_QR_FIRST=1; vipshop_passport_src=https%3A%2F%2Fwww.vip.com%2F; _jzqco=%7C%7C%7C%7C%7C1.683378774.1630821411115.1630821411115.1630821411115.1630821411115.1630821411115.0.0.0.1.1; pg_session_no=3; vip_tracker_source_from=; mars_cid=1630821407660_7d49cf4a8113b0d21ab6c4462858833e"
cookie = "mars_cid=1630824921519_b9d68130d3b398a2215a6de6f6f8bee7; mars_pid=0; mars_sid=137209a57f609b4ab02bff638f70098d; visit_id=3AEAE5348E60FC5426275BE52FFF9447; VipUINFO=luc%3Aa%7Csuc%3Aa%7Cbct%3Ac_new%7Chct%3Ac_new%7Cbdts%3A0%7Cbcts%3A0%7Ckfts%3A0%7Cc10%3A0%7Crcabt%3A0%7Cp2%3A0%7Cp3%3A1%7Cp4%3A0%7Cp5%3A0%7Cul%3A3105; user_class=a; vip_address=%257B%2522pid%2522%253A%2522103103%2522%252C%2522cid%2522%253A%2522103103102%2522%252C%2522pname%2522%253A%2522%255Cu6d59%255Cu6c5f%255Cu7701%2522%252C%2522cname%2522%253A%2522%255Cu5b81%255Cu6ce2%255Cu5e02%2522%257D; vip_city_code=103103102; vip_city_name=%E5%AE%81%E6%B3%A2%E5%B8%82; vip_first_visitor=1; vip_ipver=31; vip_province=103103; vip_province_name=%E6%B5%99%E6%B1%9F%E7%9C%81; vip_wh=VIP_SH; vipshop_passport_src=https%3A%2F%2Fwww.vip.com\n"
console.log(getCookie(cookie,"mars_sid"))