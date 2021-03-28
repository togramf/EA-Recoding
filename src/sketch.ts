//RECODING 
//ALGEBRAISCHE KURVEN
//MARGOT FAUCHON 

// -------------------
//  Parameters and UI
// -------------------

const gui = new dat.GUI()
const params = {
    background: 0,
    origin: 0,
    bezier: 1,
    curve: 0,
    trigo1: 0,
    trigo2: 0,
    trigo3: 0,
    y: 0,
    x: 0,
    scale :40,
    h: 0.25,
    w: 0.9,
    n: 0,
    m: 0,
    trigox: 2,
    trigoy: 5,
    
    Download_Image: () => save(),
}

gui.add(params, "background", 0, 1,1)
gui.add(params, "origin", 0, 1,1)
gui.add(params, "bezier", 0, 1,1)
gui.add(params, "curve", 0, 1,1)
gui.add(params, "trigo1", 0, 1,1)
gui.add(params, "trigo2", 0, 1,1)
gui.add(params, "trigo3", 0, 1,1)
gui.add(params, "y", -5, 5, 0.001)
gui.add(params, "x", -5, 5, 0.001)
gui.add(params, "scale", 0, 500, 0.1)
gui.add(params, "h", 0, 1, 0.01)
gui.add(params, "w", 0, 1, 0.01)
gui.add(params, "n", -5, 5, 0.01)
gui.add(params, "m", -5, 5, 0.01)
gui.add(params, "trigox", -50,50,0.1)
gui.add(params, "trigoy", -50,50,0.1)
gui.add(params, "Download_Image")

// -------------------
//       Drawing
// -------------------

function draw() {
    if (params.background)
        background(255)

    translate(width/2 + params.x * params.scale, height/2 + params.y * params.scale)
    strokeWeight(2)
    noFill()

    if (params.origin){
        drawOrigin()
        stroke(0)
    }
        

    if (params.bezier){
        motifBezier(1,-1)
        motifBezier(-1,-1)
        motifBezier(1,1)
        motifBezier(-1,1)

    } else if (params.curve){
        motifCurve(1,-1)
        motifCurve(-1,-1)
        motifCurve(1,1)
        motifCurve(-1,1)

    } else if (params.trigo1){
        trigo1()

    } else if (params.trigo2){
        trigo2(1)
        trigo2(-1)

    } else if (params.trigo3){
        trigo3()
    }

}   

function drawOrigin(){
    stroke(255, 0 ,0)
    line(-width/2, 0 , width/2, 0)
    line(0 ,-height/2, 0 , height/2)
}

function motifBezier(a, b){
    let w = params.w;
    let h = params.h; 

    push()
    translate(a* params.m * params.scale, b* params.n * params.scale)
    for (let i = 0; i <1.5 ; i+=0.3){
        w=w/2;
        h=h *exp(i*0.4);
        bezier( a* 0 * w * params.scale, b* 6 * h  * params.scale,
            a* 2 * w  * params.scale, b*3* h  * params.scale, 
            a* (-1.5 + i)/3 * w  * params.scale, b*1.5* h  * params.scale, 
            a* 0.1 * w  * params.scale, b*0.35* h  * params.scale)
        bezier ( a* 0.1 * w  * params.scale, b* .35* h  * params.scale,
            a * .2 * w * params.scale, b * 0 * h * params.scale,
            a* 2 * w  * params.scale, b* -0.1* h  * params.scale,
            a* 4 * w  * params.scale, b*0.3* h  * params.scale)
        bezier( a* 4 * w  * params.scale, b*0.3* h  * params.scale,
            a* 5 * w  * params.scale, b*.5* h  * params.scale,
            a* 12 * w  * params.scale, b*2* h  * params.scale,
            a* 0 * w * params.scale, b* 6 * h  * params.scale)
        translate(0, b*(6 * h /3) * params.scale);
    }
    pop()
}

function motifCurve(a,b){
    let w = params.w;
    let h = params.h; 
    push()
    translate(a* params.m * params.scale, b* params.n * params.scale)
    for (let i = 0; i <1.5 ; i+=0.3){
        w=w/2;
        h=h *exp(i*0.4);
        beginShape()
            curveVertex( a* 0 * w * params.scale, b* 6 * h  * params.scale)
            curveVertex(a* 1.5 * w  * params.scale, b*3* h  * params.scale) 
            curveVertex( a* 0 * w  * params.scale, b*1* h  * params.scale)
            curveVertex(a * 1 * w * params.scale, b * 0 * h * params.scale)
            curveVertex(a* 4 * w  * params.scale, b*.2* h  * params.scale)
            curveVertex(a* 6.5 * w  * params.scale, b*2* h  * params.scale)
            
        endShape(CLOSE)
        translate(0, b*(6 * h /3) * params.scale);
    }
    pop()
}

function trigo1(){
    beginShape()
        for (let a=0; a<TWO_PI; a+= 0.001){
            const x = cos (a * params.trigox) 
            const y = a * params.m - params.n * sin(a * params.trigoy)
            vertex (x * exp(-abs(y)) * params.w * params.scale, y * exp(-abs(x))* params.h * params.scale)
        }
    endShape()
}

function trigo2 (i){
    beginShape()
    for (let a=0; a<TWO_PI; a+= 0.0001){
        const x =  - params.m * cos (a * params.trigox) 
        const y =  i* params.n * sin(a * params.trigoy) * sin(a * params.trigoy)
        vertex (x * exp(-abs(y)) * params.w * params.scale, y * exp(-abs(x))* params.h * params.scale)
    }
    endShape()
}

function trigo3(){
    beginShape()
        for (let a=0; a<TWO_PI; a+= 0.001){
            const x = cos (a * params.trigox) 
            const y = params.n * sin(a * params.trigoy) * tan(params.m * a)
            vertex (x * exp(-abs(y)) * params.w * params.scale, y * exp(-abs(x))* params.h * params.scale)
        }
    endShape()
}

// -------------------
//    Initialization
// -------------------

function setup() {
    p6_CreateCanvas()
}

function windowResized() {
    p6_ResizeCanvas()
}