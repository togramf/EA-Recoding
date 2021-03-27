var gui = new dat.GUI();
var params = {
    y: 2,
    x: 5,
    h: 0.5,
    w: 0.5,
    n: 0.5,
    m: 1,
    scale: 400,
    Download_Image: function () { return save(); },
};
gui.add(params, "y", 0, 20, 0.01);
gui.add(params, "x", 0, 20, 0.1);
gui.add(params, "h", 0, 1, 0.01);
gui.add(params, "w", 0, 1, 0.01);
gui.add(params, "n", 0, 20, 0.01);
gui.add(params, "m", 1, 20, 0.1);
gui.add(params, "scale", 0, 500, 0.1);
gui.add(params, "Download_Image");
function draw() {
    background(240);
    translate(width / 2, height / 2);
    strokeWeight(3);
    stroke(0);
    noFill();
    motif(1, -1);
    stroke(255, 102, 0);
    motif(-1, -1);
    stroke(102, 255, 0);
    motif(1, 1);
    stroke(0);
    motif(-1, 1);
}
function motif(a, b) {
    var w = params.w;
    var h = params.h;
    push();
    for (var i = 0.2; i < 1.2; i += 0.2) {
        beginShape();
        curveVertex(a * 0 * w * params.scale, b * 3 * h * params.scale);
        curveVertex(a * 1 * w * params.scale, b * 1.5 * h * params.scale);
        curveVertex(a * 0 * w * params.scale, b * .5 * h * params.scale);
        curveVertex(a * 0.1 * w * params.scale, b * .1 * h * params.scale);
        curveVertex(a * 3 * w * params.scale, b * 0 * h * params.scale);
        curveVertex(a * 6 * w * params.scale, b * 1.5 * h * params.scale);
        endShape(CLOSE);
        translate(0, b * (3 * h / 2 * params.scale));
        w = w / exp(i);
        h = h * exp(i);
    }
    pop();
}
function setup() {
    p6_CreateCanvas();
}
function windowResized() {
    p6_ResizeCanvas();
}
var __ASPECT_RATIO = 1;
var __MARGIN_SIZE = 25;
function __desiredCanvasWidth() {
    var windowRatio = windowWidth / windowHeight;
    if (__ASPECT_RATIO > windowRatio) {
        return windowWidth - __MARGIN_SIZE * 2;
    }
    else {
        return __desiredCanvasHeight() * __ASPECT_RATIO;
    }
}
function __desiredCanvasHeight() {
    var windowRatio = windowWidth / windowHeight;
    if (__ASPECT_RATIO > windowRatio) {
        return __desiredCanvasWidth() / __ASPECT_RATIO;
    }
    else {
        return windowHeight - __MARGIN_SIZE * 2;
    }
}
var __canvas;
function __centerCanvas() {
    __canvas.position((windowWidth - width) / 2, (windowHeight - height) / 2);
}
function p6_CreateCanvas() {
    __canvas = createCanvas(__desiredCanvasWidth(), __desiredCanvasHeight());
    __centerCanvas();
}
function p6_ResizeCanvas() {
    resizeCanvas(__desiredCanvasWidth(), __desiredCanvasHeight());
    __centerCanvas();
}
var p6_SaveImageSequence = function (durationInFrames, fileExtension) {
    if (frameCount <= durationInFrames) {
        noLoop();
        var filename_1 = nf(frameCount - 1, ceil(log(durationInFrames) / log(10)));
        var mimeType = (function () {
            switch (fileExtension) {
                case 'png':
                    return 'image/png';
                case 'jpeg':
                case 'jpg':
                    return 'image/jpeg';
            }
        })();
        __canvas.elt.toBlob(function (blob) {
            p5.prototype.downloadFile(blob, filename_1, fileExtension);
            setTimeout(function () { return loop(); }, 100);
        }, mimeType);
    }
};
//# sourceMappingURL=../src/src/build.js.map