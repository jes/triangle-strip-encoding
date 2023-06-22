function makeMeshStripSVG(data, showGrid, hideTop, hideMid, hideBottom) {
    let even_ys = [20,0];
    let odd_ys = [60,40];
    let stepSize = 20;

    // turn the message into binary
    let bindata = str2bin(data);

    // turn the binary into y coordinates
    let ys = bin2ys(bindata, even_ys, odd_ys);

    let height = 61;
    let width = stepSize * ys.length + 1;
    let svg = '<svg width="' + width + '" height="' + height + '" xmlns="http://www.w3.org/2000/svg">';

    if (showGrid) {
        let xs = [];
        for (let x = 0; x <= width; x += stepSize)
            xs.push(x);
        svg += gridPathSVG(xs, even_ys.concat(odd_ys), width, height);
    }

    if (!hideMid)
        svg += meshPathSVG(0, stepSize, ys);
    if (!hideTop)
        svg += meshPathSVG(0, stepSize*2, evens(ys));
    if (!hideBottom)
        svg += meshPathSVG(stepSize, stepSize*2, odds(ys));

    svg += '</svg>';
    return svg;
}

function meshPathSVG(x, stepx, ys) {
    let path = "M " + x + " " + ys[0] + "\n";
    for (let i = 1; i < ys.length; i++) {
        x += stepx;
        path += "L " + x + " " + ys[i] + "\n";
    }

    return '<path stroke="black" fill="none" d="' + path + '"/>';
}

function gridPathSVG(xs, ys, w, h) {
    let svg = '';
    for (let y of ys) {
        svg += lineSVG(0, y, w, y);
    }
    for (let x of xs) {
        svg += lineSVG(x, 0, x, h);
    }
    return svg;
}

function lineSVG(x1, y1, x2, y2) {
    return '<line x1="' + x1 + '" y1="' + y1 + '" x2="' + x2 + '" y2="' + y2 + '" stroke="#ccc" />';
}

function evens(arr) {
    let a = [];
    for (let i = 0; i < arr.length; i += 2) {
        a.push(arr[i]);
    }
    return a;
}

function odds(arr) {
    return evens(arr.slice(1));
}

function str2bin(str) {
    let bin = [];
    for (let i = 0; i < str.length; i++) {
        let ch = str.charCodeAt(i);
        let v = 128;
        while (v >= 1) {
            bin.push((ch&v) ? 1 : 0);
            v /= 2;
        }
    }
    return bin;
}

function bin2ys(bin, even_ys, odd_ys) {
    let ys = [];
    for (let i = 0; i < bin.length; i++) {
        let d = i%2==0 ? even_ys : odd_ys;
        ys.push(d[bin[i]]);
    }
    return ys;
}
