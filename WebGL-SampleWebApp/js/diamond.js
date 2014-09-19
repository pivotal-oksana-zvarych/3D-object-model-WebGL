var diamondVertexPositionBuffer;
var diamondVertexColorBuffer;
var diamondVertexIndexBuffer;

var point = { x: 0, y: 0, z: 0 };

function Point() {
    this.x = 0;
    this.y = 0;
    this.z = 0;

}

var numSides = 7;
var height = 2;
var rad = 1;
var dimention = 3;
var colourDimention = 4;

function numberOfItems(sides) {
    var total = sides * 3 * 2;
    return total;
}

function initBuffers() {
    
    diamondVertexPositionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, diamondVertexPositionBuffer);
    var vertices = makeDiamondVertecies(height, rad, numSides);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
    diamondVertexPositionBuffer.itemSize = dimention;
    diamondVertexPositionBuffer.numItems = numberOfItems(numSides);

    diamondVertexColorBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, diamondVertexColorBuffer);

    var colour = [47/255, 198/255, 1.0, 1.0];
    var colourArray = createColourPallet(colour);
    
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colourArray), gl.STATIC_DRAW);
    diamondVertexColorBuffer.itemSize = colourDimention;
    diamondVertexColorBuffer.numItems = numberOfItems(numSides);
}

function makeDiamondVertecies(height, radius, sides) {

    var points = [];
    var top = [];
    var bottom = [];

    for (var i = 0; i < sides; i++) {
        top = drawSide(i, sides, radius, height); // top triangle
        points.concat(top);
        bottom = drawSide(i, sides, radius, -height); // bottom triangle
        points.concat(bottom);
    }

    return (points);
}

function drawSide(sideNum, totalSides, radius, height) {
    var triangleVertices = [];

    var alpha = 2 * Math.PI / totalSides * sideNum;
    var beta = 2 * Math.PI / totalSides * (sideNum + 1) % totalSides;

    var point1 = createPoint(radius, alpha);
    var point2 = createPoint(radius, beta);
    var point3 = [0, height, 0];

    triangleVertices.concat(point1);
    triangleVertices.concat(point2);
    triangleVertices.concat(point3);
    
    return triangleVertices;
} 

function createPoint(radius, theta) {
    var point = new Point();

    point.x = radius * Math.cos(theta);
    point.y = 0;
    point.z = radius * Math.sin(theta);

    return [point.x, point.y, point.z];
}

function createColourPallet(colour) {
    var colourPallet = [];
    for (var i = 0; i < numSides; i++) {
        colourPallet = colourPallet.concat(colour);
    }
    return colourPallet;
}