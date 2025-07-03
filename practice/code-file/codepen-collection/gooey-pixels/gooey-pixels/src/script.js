var svgns = "http://www.w3.org/2000/svg";

// Define a color palette for the lava lamp effect
var colorPalette = [
    '#8F00Ff', // Purple
    '#FF1966', // Warm Orange
    '#66FF66', // Vivid Green
    '#66FFFD', // Aqua Blue
    '#6666FF', // Deep Blue
    '#fee12b', // Pineapple
];

function rectan() {
    // Set the number of circles
    for (var i = 0; i < 60; i++) {
        // Randomize circle's initial position and size
        var x = Math.random() * window.innerWidth;
        var y = Math.random() * window.innerHeight;
        var r = Math.random() * 50 + 1; // Circle radius between 1 and 40

        var circ = document.createElementNS(svgns, 'circle');
        circ.setAttributeNS(null, 'cx', x);
        circ.setAttributeNS(null, 'cy', y);
        circ.setAttributeNS(null, 'r', r);
        
        // Set the circle's fill color from the color palette
        circ.setAttributeNS(null, 'fill', colorPalette[Math.floor(Math.random() * colorPalette.length)]);

        // Randomize animation end points for x and y to move across the entire window
        var a = Math.random() * window.innerWidth;
        var b = Math.random() * window.innerHeight;
        var str = x + ';' + a + ';' + x;

        var c = Math.random() * window.innerHeight;
        var d = Math.random() * window.innerHeight;
        var stry = y + ';' + c + ';' + y;

        // Create x animation with random duration and easing
        var anix = document.createElementNS(svgns, 'animate');
        anix.setAttributeNS(null, 'attributeName', 'cx');
        anix.setAttributeNS(null, 'values', str);
        anix.setAttributeNS(null, 'dur', (8 + Math.random() * 6) + "s"); // Duration between 8s and 14s
        anix.setAttributeNS(null, 'repeatCount', "indefinite");
        anix.setAttributeNS(null, 'calcMode', 'spline');
        anix.setAttributeNS(null, 'keyTimes', '0;0.5;1');
        anix.setAttributeNS(null, 'keySplines', '0.25 0.1 0.25 1;0.25 0.1 0.25 1'); // Mild easing

        // Create y animation with random duration and easing
        var aniy = document.createElementNS(svgns, 'animate');
        aniy.setAttributeNS(null, 'attributeName', 'cy');
        aniy.setAttributeNS(null, 'values', stry);
        aniy.setAttributeNS(null, 'dur', (18 + Math.random() * 30) + "s"); // Duration between 18s and 48s
        aniy.setAttributeNS(null, 'repeatCount', "indefinite");
        aniy.setAttributeNS(null, 'calcMode', 'spline');
        aniy.setAttributeNS(null, 'keyTimes', '0;0.5;1');
        aniy.setAttributeNS(null, 'keySplines', '0.25 0.1 0.25 1;0.25 0.1 0.25 1'); // Mild easing

        // Append animations to circle and add circle to the SVG
        circ.appendChild(anix);
        circ.appendChild(aniy);
        document.getElementById('svgOne').appendChild(circ);
    }
}

rectan();
