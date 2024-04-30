function strEnc(r, e, a, n) {
    var t, s, o, c, f, i, m = r.length, u = "";
    if (null != e && "" != e && (t = getKeyBytes(e), c = t.length), null != a && "" != a && (s = getKeyBytes(a), 
    f = s.length), null != n && "" != n && (o = getKeyBytes(n), i = o.length), m > 0) if (4 > m) {
        var l, b = strToBt(r);
        if (null != e && "" != e && null != a && "" != a && null != n && "" != n) {
            var k, y, v, w;
            for (k = b, y = 0; c > y; y++) k = enc(k, t[y]);
            for (v = 0; f > v; v++) k = enc(k, s[v]);
            for (w = 0; i > w; w++) k = enc(k, o[w]);
            l = k;
        } else if (null != e && "" != e && null != a && "" != a) {
            var k, y, v;
            for (k = b, y = 0; c > y; y++) k = enc(k, t[y]);
            for (v = 0; f > v; v++) k = enc(k, s[v]);
            l = k;
        } else if (null != e && "" != e) {
            var k, y = 0;
            for (k = b, y = 0; c > y; y++) k = enc(k, t[y]);
            l = k;
        }
        u = bt64ToHex(l);
    } else {
        var g = parseInt(m / 4), A = m % 4, B = 0;
        for (B = 0; g > B; B++) {
            var l, x = r.substring(4 * B + 0, 4 * B + 4), h = strToBt(x);
            if (null != e && "" != e && null != a && "" != a && null != n && "" != n) {
                var k, y, v, w;
                for (k = h, y = 0; c > y; y++) k = enc(k, t[y]);
                for (v = 0; f > v; v++) k = enc(k, s[v]);
                for (w = 0; i > w; w++) k = enc(k, o[w]);
                l = k;
            } else if (null != e && "" != e && null != a && "" != a) {
                var k, y, v;
                for (k = h, y = 0; c > y; y++) k = enc(k, t[y]);
                for (v = 0; f > v; v++) k = enc(k, s[v]);
                l = k;
            } else if (null != e && "" != e) {
                var k, y;
                for (k = h, y = 0; c > y; y++) k = enc(k, t[y]);
                l = k;
            }
            u += bt64ToHex(l);
        }
        if (A > 0) {
            var l, j = r.substring(4 * g + 0, m), h = strToBt(j);
            if (null != e && "" != e && null != a && "" != a && null != n && "" != n) {
                var k, y, v, w;
                for (k = h, y = 0; c > y; y++) k = enc(k, t[y]);
                for (v = 0; f > v; v++) k = enc(k, s[v]);
                for (w = 0; i > w; w++) k = enc(k, o[w]);
                l = k;
            } else if (null != e && "" != e && null != a && "" != a) {
                var k, y, v;
                for (k = h, y = 0; c > y; y++) k = enc(k, t[y]);
                for (v = 0; f > v; v++) k = enc(k, s[v]);
                l = k;
            } else if (null != e && "" != e) {
                var k, y;
                for (k = h, y = 0; c > y; y++) k = enc(k, t[y]);
                l = k;
            }
            u += bt64ToHex(l);
        }
    }
    return u;
}

function strDec(r, e, a, n) {
    var t, s, o, c, f, i, m = r.length, u = "";
    null != e && "" != e && (t = getKeyBytes(e), c = t.length), null != a && "" != a && (s = getKeyBytes(a), 
    f = s.length), null != n && "" != n && (o = getKeyBytes(n), i = o.length);
    var l = parseInt(m / 16), b = 0;
    for (b = 0; l > b; b++) {
        var k = r.substring(16 * b + 0, 16 * b + 16), y = hexToBt64(k), v = new Array(64), w = 0;
        for (w = 0; 64 > w; w++) v[w] = parseInt(y.substring(w, w + 1));
        var g;
        if (null != e && "" != e && null != a && "" != a && null != n && "" != n) {
            var A, B, x, h;
            for (A = v, B = i - 1; B >= 0; B--) A = dec(A, o[B]);
            for (x = f - 1; x >= 0; x--) A = dec(A, s[x]);
            for (h = c - 1; h >= 0; h--) A = dec(A, t[h]);
            g = A;
        } else if (null != e && "" != e && null != a && "" != a) {
            var A, B, x, h;
            for (A = v, B = f - 1; B >= 0; B--) A = dec(A, s[B]);
            for (x = c - 1; x >= 0; x--) A = dec(A, t[x]);
            g = A;
        } else if (null != e && "" != e) {
            var A, B, x, h;
            for (A = v, B = c - 1; B >= 0; B--) A = dec(A, t[B]);
            g = A;
        }
        u += byteToString(g);
    }
    return u;
}

function getKeyBytes(r) {
    var e = new Array(), a = r.length, n = parseInt(a / 4), t = a % 4, s = 0;
    for (s = 0; n > s; s++) e[s] = strToBt(r.substring(4 * s + 0, 4 * s + 4));
    return t > 0 && (e[s] = strToBt(r.substring(4 * s + 0, a))), e;
}

function strToBt(r) {
    var e = r.length, a = new Array(64);
    if (4 > e) {
        var n = 0, t = 0, s = 0, o = 0;
        for (n = 0; e > n; n++) {
            var c = r.charCodeAt(n);
            for (t = 0; 16 > t; t++) {
                var f = 1, i = 0;
                for (i = 15; i > t; i--) f *= 2;
                a[16 * n + t] = parseInt(c / f) % 2;
            }
        }
        for (s = e; 4 > s; s++) {
            var c = 0;
            for (o = 0; 16 > o; o++) {
                var f = 1, i = 0;
                for (i = 15; i > o; i--) f *= 2;
                a[16 * s + o] = parseInt(c / f) % 2;
            }
        }
    } else for (n = 0; 4 > n; n++) {
        var c = r.charCodeAt(n);
        for (t = 0; 16 > t; t++) {
            var f = 1;
            for (i = 15; i > t; i--) f *= 2;
            a[16 * n + t] = parseInt(c / f) % 2;
        }
    }
    return a;
}

function bt4ToHex(r) {
    var e;
    switch (r) {
      case "0000":
        e = "0";
        break;

      case "0001":
        e = "1";
        break;

      case "0010":
        e = "2";
        break;

      case "0011":
        e = "3";
        break;

      case "0100":
        e = "4";
        break;

      case "0101":
        e = "5";
        break;

      case "0110":
        e = "6";
        break;

      case "0111":
        e = "7";
        break;

      case "1000":
        e = "8";
        break;

      case "1001":
        e = "9";
        break;

      case "1010":
        e = "A";
        break;

      case "1011":
        e = "B";
        break;

      case "1100":
        e = "C";
        break;

      case "1101":
        e = "D";
        break;

      case "1110":
        e = "E";
        break;

      case "1111":
        e = "F";
    }
    return e;
}

function hexToBt4(r) {
    var e;
    switch (r) {
      case "0":
        e = "0000";
        break;

      case "1":
        e = "0001";
        break;

      case "2":
        e = "0010";
        break;

      case "3":
        e = "0011";
        break;

      case "4":
        e = "0100";
        break;

      case "5":
        e = "0101";
        break;

      case "6":
        e = "0110";
        break;

      case "7":
        e = "0111";
        break;

      case "8":
        e = "1000";
        break;

      case "9":
        e = "1001";
        break;

      case "A":
        e = "1010";
        break;

      case "B":
        e = "1011";
        break;

      case "C":
        e = "1100";
        break;

      case "D":
        e = "1101";
        break;

      case "E":
        e = "1110";
        break;

      case "F":
        e = "1111";
    }
    return e;
}

function byteToString(r) {
    var e = "";
    for (i = 0; i < 4; i++) {
        var a = 0;
        for (j = 0; j < 16; j++) {
            var n = 1;
            for (m = 15; m > j; m--) n *= 2;
            a += r[16 * i + j] * n;
        }
        0 != a && (e += String.fromCharCode(a));
    }
    return e;
}

function bt64ToHex(r) {
    var e = "";
    for (i = 0; i < 16; i++) {
        var a = "";
        for (j = 0; j < 4; j++) a += r[4 * i + j];
        e += bt4ToHex(a);
    }
    return e;
}

function hexToBt64(r) {
    var e = "";
    for (i = 0; i < 16; i++) e += hexToBt4(r.substring(i, i + 1));
    return e;
}

function enc(r, e) {
    var a = generateKeys(e), n = initPermute(r), t = new Array(32), s = new Array(32), o = new Array(32), c = 0, f = 0, i = 0, m = 0, u = 0;
    for (i = 0; 32 > i; i++) t[i] = n[i], s[i] = n[32 + i];
    for (c = 0; 16 > c; c++) {
        for (f = 0; 32 > f; f++) o[f] = t[f], t[f] = s[f];
        var l = new Array(48);
        for (m = 0; 48 > m; m++) l[m] = a[c][m];
        var b = xor(pPermute(sBoxPermute(xor(expandPermute(s), l))), o);
        for (u = 0; 32 > u; u++) s[u] = b[u];
    }
    var k = new Array(64);
    for (c = 0; 32 > c; c++) k[c] = s[c], k[32 + c] = t[c];
    return finallyPermute(k);
}

function dec(r, e) {
    var a = generateKeys(e), n = initPermute(r), t = new Array(32), s = new Array(32), o = new Array(32), c = 0, f = 0, i = 0, m = 0, u = 0;
    for (i = 0; 32 > i; i++) t[i] = n[i], s[i] = n[32 + i];
    for (c = 15; c >= 0; c--) {
        for (f = 0; 32 > f; f++) o[f] = t[f], t[f] = s[f];
        var l = new Array(48);
        for (m = 0; 48 > m; m++) l[m] = a[c][m];
        var b = xor(pPermute(sBoxPermute(xor(expandPermute(s), l))), o);
        for (u = 0; 32 > u; u++) s[u] = b[u];
    }
    var k = new Array(64);
    for (c = 0; 32 > c; c++) k[c] = s[c], k[32 + c] = t[c];
    return finallyPermute(k);
}

function initPermute(r) {
    var e = new Array(64);
    for (i = 0, m = 1, n = 0; i < 4; i++, m += 2, n += 2) for (j = 7, k = 0; j >= 0; j--, 
    k++) e[8 * i + k] = r[8 * j + m], e[8 * i + k + 32] = r[8 * j + n];
    return e;
}

function expandPermute(r) {
    var e = new Array(48);
    for (i = 0; i < 8; i++) 0 == i ? e[6 * i + 0] = r[31] : e[6 * i + 0] = r[4 * i - 1], 
    e[6 * i + 1] = r[4 * i + 0], e[6 * i + 2] = r[4 * i + 1], e[6 * i + 3] = r[4 * i + 2], 
    e[6 * i + 4] = r[4 * i + 3], 7 == i ? e[6 * i + 5] = r[0] : e[6 * i + 5] = r[4 * i + 4];
    return e;
}

function xor(r, e) {
    var a = new Array(r.length);
    for (i = 0; i < r.length; i++) a[i] = r[i] ^ e[i];
    return a;
}

function sBoxPermute(r) {
    var e = new Array(32), a = "", n = [ [ 14, 4, 13, 1, 2, 15, 11, 8, 3, 10, 6, 12, 5, 9, 0, 7 ], [ 0, 15, 7, 4, 14, 2, 13, 1, 10, 6, 12, 11, 9, 5, 3, 8 ], [ 4, 1, 14, 8, 13, 6, 2, 11, 15, 12, 9, 7, 3, 10, 5, 0 ], [ 15, 12, 8, 2, 4, 9, 1, 7, 5, 11, 3, 14, 10, 0, 6, 13 ] ], t = [ [ 15, 1, 8, 14, 6, 11, 3, 4, 9, 7, 2, 13, 12, 0, 5, 10 ], [ 3, 13, 4, 7, 15, 2, 8, 14, 12, 0, 1, 10, 6, 9, 11, 5 ], [ 0, 14, 7, 11, 10, 4, 13, 1, 5, 8, 12, 6, 9, 3, 2, 15 ], [ 13, 8, 10, 1, 3, 15, 4, 2, 11, 6, 7, 12, 0, 5, 14, 9 ] ], s = [ [ 10, 0, 9, 14, 6, 3, 15, 5, 1, 13, 12, 7, 11, 4, 2, 8 ], [ 13, 7, 0, 9, 3, 4, 6, 10, 2, 8, 5, 14, 12, 11, 15, 1 ], [ 13, 6, 4, 9, 8, 15, 3, 0, 11, 1, 2, 12, 5, 10, 14, 7 ], [ 1, 10, 13, 0, 6, 9, 8, 7, 4, 15, 14, 3, 11, 5, 2, 12 ] ], o = [ [ 7, 13, 14, 3, 0, 6, 9, 10, 1, 2, 8, 5, 11, 12, 4, 15 ], [ 13, 8, 11, 5, 6, 15, 0, 3, 4, 7, 2, 12, 1, 10, 14, 9 ], [ 10, 6, 9, 0, 12, 11, 7, 13, 15, 1, 3, 14, 5, 2, 8, 4 ], [ 3, 15, 0, 6, 10, 1, 13, 8, 9, 4, 5, 11, 12, 7, 2, 14 ] ], c = [ [ 2, 12, 4, 1, 7, 10, 11, 6, 8, 5, 3, 15, 13, 0, 14, 9 ], [ 14, 11, 2, 12, 4, 7, 13, 1, 5, 0, 15, 10, 3, 9, 8, 6 ], [ 4, 2, 1, 11, 10, 13, 7, 8, 15, 9, 12, 5, 6, 3, 0, 14 ], [ 11, 8, 12, 7, 1, 14, 2, 13, 6, 15, 0, 9, 10, 4, 5, 3 ] ], f = [ [ 12, 1, 10, 15, 9, 2, 6, 8, 0, 13, 3, 4, 14, 7, 5, 11 ], [ 10, 15, 4, 2, 7, 12, 9, 5, 6, 1, 13, 14, 0, 11, 3, 8 ], [ 9, 14, 15, 5, 2, 8, 12, 3, 7, 0, 4, 10, 1, 13, 11, 6 ], [ 4, 3, 2, 12, 9, 5, 15, 10, 11, 14, 1, 7, 6, 0, 8, 13 ] ], i = [ [ 4, 11, 2, 14, 15, 0, 8, 13, 3, 12, 9, 7, 5, 10, 6, 1 ], [ 13, 0, 11, 7, 4, 9, 1, 10, 14, 3, 5, 12, 2, 15, 8, 6 ], [ 1, 4, 11, 13, 12, 3, 7, 14, 10, 15, 6, 8, 0, 5, 9, 2 ], [ 6, 11, 13, 8, 1, 4, 10, 7, 9, 5, 0, 15, 14, 2, 3, 12 ] ], u = [ [ 13, 2, 8, 4, 6, 15, 11, 1, 10, 9, 3, 14, 5, 0, 12, 7 ], [ 1, 15, 13, 8, 10, 3, 7, 4, 12, 5, 6, 11, 0, 14, 9, 2 ], [ 7, 11, 4, 1, 9, 12, 14, 2, 0, 6, 10, 13, 15, 3, 5, 8 ], [ 2, 1, 14, 7, 4, 10, 8, 13, 15, 12, 9, 0, 3, 5, 6, 11 ] ];
    for (m = 0; m < 8; m++) {
        var l = 0, b = 0;
        switch (l = 2 * r[6 * m + 0] + r[6 * m + 5], b = 2 * r[6 * m + 1] * 2 * 2 + 2 * r[6 * m + 2] * 2 + 2 * r[6 * m + 3] + r[6 * m + 4], 
        m) {
          case 0:
            a = getBoxBinary(n[l][b]);
            break;

          case 1:
            a = getBoxBinary(t[l][b]);
            break;

          case 2:
            a = getBoxBinary(s[l][b]);
            break;

          case 3:
            a = getBoxBinary(o[l][b]);
            break;

          case 4:
            a = getBoxBinary(c[l][b]);
            break;

          case 5:
            a = getBoxBinary(f[l][b]);
            break;

          case 6:
            a = getBoxBinary(i[l][b]);
            break;

          case 7:
            a = getBoxBinary(u[l][b]);
        }
        e[4 * m + 0] = parseInt(a.substring(0, 1)), e[4 * m + 1] = parseInt(a.substring(1, 2)), 
        e[4 * m + 2] = parseInt(a.substring(2, 3)), e[4 * m + 3] = parseInt(a.substring(3, 4));
    }
    return e;
}

function pPermute(r) {
    var e = new Array(32);
    return e[0] = r[15], e[1] = r[6], e[2] = r[19], e[3] = r[20], e[4] = r[28], e[5] = r[11], 
    e[6] = r[27], e[7] = r[16], e[8] = r[0], e[9] = r[14], e[10] = r[22], e[11] = r[25], 
    e[12] = r[4], e[13] = r[17], e[14] = r[30], e[15] = r[9], e[16] = r[1], e[17] = r[7], 
    e[18] = r[23], e[19] = r[13], e[20] = r[31], e[21] = r[26], e[22] = r[2], e[23] = r[8], 
    e[24] = r[18], e[25] = r[12], e[26] = r[29], e[27] = r[5], e[28] = r[21], e[29] = r[10], 
    e[30] = r[3], e[31] = r[24], e;
}

function finallyPermute(r) {
    var e = new Array(64);
    return e[0] = r[39], e[1] = r[7], e[2] = r[47], e[3] = r[15], e[4] = r[55], e[5] = r[23], 
    e[6] = r[63], e[7] = r[31], e[8] = r[38], e[9] = r[6], e[10] = r[46], e[11] = r[14], 
    e[12] = r[54], e[13] = r[22], e[14] = r[62], e[15] = r[30], e[16] = r[37], e[17] = r[5], 
    e[18] = r[45], e[19] = r[13], e[20] = r[53], e[21] = r[21], e[22] = r[61], e[23] = r[29], 
    e[24] = r[36], e[25] = r[4], e[26] = r[44], e[27] = r[12], e[28] = r[52], e[29] = r[20], 
    e[30] = r[60], e[31] = r[28], e[32] = r[35], e[33] = r[3], e[34] = r[43], e[35] = r[11], 
    e[36] = r[51], e[37] = r[19], e[38] = r[59], e[39] = r[27], e[40] = r[34], e[41] = r[2], 
    e[42] = r[42], e[43] = r[10], e[44] = r[50], e[45] = r[18], e[46] = r[58], e[47] = r[26], 
    e[48] = r[33], e[49] = r[1], e[50] = r[41], e[51] = r[9], e[52] = r[49], e[53] = r[17], 
    e[54] = r[57], e[55] = r[25], e[56] = r[32], e[57] = r[0], e[58] = r[40], e[59] = r[8], 
    e[60] = r[48], e[61] = r[16], e[62] = r[56], e[63] = r[24], e;
}

function getBoxBinary(r) {
    var e = "";
    switch (r) {
      case 0:
        e = "0000";
        break;

      case 1:
        e = "0001";
        break;

      case 2:
        e = "0010";
        break;

      case 3:
        e = "0011";
        break;

      case 4:
        e = "0100";
        break;

      case 5:
        e = "0101";
        break;

      case 6:
        e = "0110";
        break;

      case 7:
        e = "0111";
        break;

      case 8:
        e = "1000";
        break;

      case 9:
        e = "1001";
        break;

      case 10:
        e = "1010";
        break;

      case 11:
        e = "1011";
        break;

      case 12:
        e = "1100";
        break;

      case 13:
        e = "1101";
        break;

      case 14:
        e = "1110";
        break;

      case 15:
        e = "1111";
    }
    return e;
}

function generateKeys(r) {
    var e = new Array(56), a = new Array();
    a[0] = new Array(), a[1] = new Array(), a[2] = new Array(), a[3] = new Array(), 
    a[4] = new Array(), a[5] = new Array(), a[6] = new Array(), a[7] = new Array(), 
    a[8] = new Array(), a[9] = new Array(), a[10] = new Array(), a[11] = new Array(), 
    a[12] = new Array(), a[13] = new Array(), a[14] = new Array(), a[15] = new Array();
    var n = [ 1, 1, 2, 2, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 1 ];
    for (t = 0; 7 > t; t++) for (j = 0, k = 7; j < 8; j++, k--) e[8 * t + j] = r[8 * k + t];
    var t = 0;
    for (t = 0; 16 > t; t++) {
        var s = 0, o = 0;
        for (j = 0; j < n[t]; j++) {
            for (s = e[0], o = e[28], k = 0; k < 27; k++) e[k] = e[k + 1], e[28 + k] = e[29 + k];
            e[27] = s, e[55] = o;
        }
        var c = new Array(48);
        switch (c[0] = e[13], c[1] = e[16], c[2] = e[10], c[3] = e[23], c[4] = e[0], c[5] = e[4], 
        c[6] = e[2], c[7] = e[27], c[8] = e[14], c[9] = e[5], c[10] = e[20], c[11] = e[9], 
        c[12] = e[22], c[13] = e[18], c[14] = e[11], c[15] = e[3], c[16] = e[25], c[17] = e[7], 
        c[18] = e[15], c[19] = e[6], c[20] = e[26], c[21] = e[19], c[22] = e[12], c[23] = e[1], 
        c[24] = e[40], c[25] = e[51], c[26] = e[30], c[27] = e[36], c[28] = e[46], c[29] = e[54], 
        c[30] = e[29], c[31] = e[39], c[32] = e[50], c[33] = e[44], c[34] = e[32], c[35] = e[47], 
        c[36] = e[43], c[37] = e[48], c[38] = e[38], c[39] = e[55], c[40] = e[33], c[41] = e[52], 
        c[42] = e[45], c[43] = e[41], c[44] = e[49], c[45] = e[35], c[46] = e[28], c[47] = e[31], 
        t) {
          case 0:
            for (m = 0; m < 48; m++) a[0][m] = c[m];
            break;

          case 1:
            for (m = 0; m < 48; m++) a[1][m] = c[m];
            break;

          case 2:
            for (m = 0; m < 48; m++) a[2][m] = c[m];
            break;

          case 3:
            for (m = 0; m < 48; m++) a[3][m] = c[m];
            break;

          case 4:
            for (m = 0; m < 48; m++) a[4][m] = c[m];
            break;

          case 5:
            for (m = 0; m < 48; m++) a[5][m] = c[m];
            break;

          case 6:
            for (m = 0; m < 48; m++) a[6][m] = c[m];
            break;

          case 7:
            for (m = 0; m < 48; m++) a[7][m] = c[m];
            break;

          case 8:
            for (m = 0; m < 48; m++) a[8][m] = c[m];
            break;

          case 9:
            for (m = 0; m < 48; m++) a[9][m] = c[m];
            break;

          case 10:
            for (m = 0; m < 48; m++) a[10][m] = c[m];
            break;

          case 11:
            for (m = 0; m < 48; m++) a[11][m] = c[m];
            break;

          case 12:
            for (m = 0; m < 48; m++) a[12][m] = c[m];
            break;

          case 13:
            for (m = 0; m < 48; m++) a[13][m] = c[m];
            break;

          case 14:
            for (m = 0; m < 48; m++) a[14][m] = c[m];
            break;

          case 15:
            for (m = 0; m < 48; m++) a[15][m] = c[m];
        }
    }
    return a;
}

window.strEnc = strEnc, window.strDec = strDec;