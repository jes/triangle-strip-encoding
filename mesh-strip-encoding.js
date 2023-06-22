function makeMeshStripSVG(data) {
    let even_ys = [30,10];
    let odd_ys = [70,50];
    let stepSize = 20;

    // turn the message into binary
    let bindata = str2bin(data);

    // turn the binary into y coordinates
    let ys = bin2ys(bindata, even_ys, odd_ys);

    let height = 80;
    let width = stepSize * ys.length;
    let svg = '<svg width="' + width + '" height="' + height + '" xmlns="http://www.w3.org/2000/svg">';
    svg += meshPathSVG(0, stepSize, ys);
    svg += meshPathSVG(0, stepSize*2, evens(ys));
    svg += meshPathSVG(stepSize, stepSize*2, odds(ys));

    svg += '</svg>';
    console.log(svg);
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
