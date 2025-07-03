$(document).ready(function() {
    $('body').mousemove(function(event) {
        cx = Math.ceil($('body').width() * 0.5);
        cy = Math.ceil($('body').height() * 0.5);
        dx = event.pageX - cx;
        dy = event.pageY - cy;

        tiltx = (dy / cy);
        tilty = - (dx / cx);
        radius = Math.sqrt(Math.pow(tiltx,2) + Math.pow(tilty,2));
        degree = (radius * 20);
        TweenLite.set("#container", {transform:'rotate3d(' + tiltx + ', ' + tilty + ', 0, ' + degree + 'deg)'});
    });
});