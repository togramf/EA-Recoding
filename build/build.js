var gui = new dat.GUI();
var params = {
    y: 1,
    x: 1,
    h: 0,
    w: 0,
    n: 1,
    m: 1,
    scale: 0,
    Download_Image: function () { return save(); },
};
gui.add(params, "y", 0, 20, 0.1);
gui.add(params, "x", 0, 20, 0.1);
gui.add(params, "h", 0, 1, 0.01);
gui.add(params, "w", 0, 1, 0.01);
gui.add(params, "n", 1, 20, 0.1);
gui.add(params, "m", 1, 20, 0.1);
gui.add(params, "scale", 0, 500, 0.1);
gui.add(params, "Download_Image");
function draw() {
    background(0);
    translate(width / 2, height / 2);
    strokeWeight(3);
    stroke(240);
    noFill();
    beginShape();
    for (var a = 0; a < TWO_PI; a += 0.0001) {
        var x = -cos(a * params.x);
        var y = -params.n * sin(a * params.m) * sin(a * params.m);
        vertex(x * exp(-abs(y)) * params.w * params.scale, y * exp(-abs(x)) * params.h * params.scale);
    }
    endShape();
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