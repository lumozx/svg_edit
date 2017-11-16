;

function svg_edit(id, t) {
    $(id).find('svg').children().on('click', function() {
        $(this).toggleClass('selected');
    });
    var html = `<button onclick="transform('top','${id}')">top</button>`
    + `<button onclick="transform('bottom','${id}')">bottom</button>`
    + `<button onclick="transform('left','${id}')">left</button>`
    + `<button onclick="transform('right','${id}')">right</button>`
    + `<button onclick="transform('l','${id}')">L</button>`
    + `<button onclick="transform('r','${id}')">R</button>`
    + `<button onclick="transform('d','${id}')">d</button>`
    + `<button onclick="transform('u','${id}')">u</button>`;
    if (t) {
        html = html + `<button onclick="selectColor('${id}','${t}')">changecolor</button>`;
    }
    $(id).append(html)
}

function transform(e, id) {
    var a = $(id + ' svg').attr('viewBox');
    var b = a.split(' ')
    var c = $.trim(b[3]) / 2; //获得旋转中心
    var le = $('.selected').length;
    switch (e) {
        case "l":
        case "r":
            lin({lengths:le,action:'rotate',defaults:'0',direction:e,id:id,center:c});
            break;
        case "d":
        case "u":
        lin({lengths:le,action:'scale',defaults:'1',direction:e,id:id});
            break;
        case "top":
        case "bottom":
        case "left":
        case "right":
        lin({lengths:le,action:'translate',defaults:'0,0',direction:e,id:id});
            break;
        default:
            return;
    }
};

function selectColor(id, t) {
    t = $.trim(t);
    if ($('.selected').length === 0) {
        $(id).find('svg').children().attr('fill', t);
        return;
    }
    $('.selected').attr('fill', t);
}

function lin({lengths,action,defaults,direction,id,center}) { //le val de e id c
    var n = $('.selected');
    if (!lengths) {
    n = $(id).find('svg').children();
    lengths = n.length;
    }
    for (let il = 0; il < lengths; il++) {
        if (n.eq(il).attr('transform')) {
            var d = n.eq(il).attr('transform');
            if (d.indexOf(action) !== -1) {
                var fl = d.indexOf(action)
                var zuo = d.indexOf("(", fl);
                var you = d.indexOf(")", zuo);
                var f = d.substring(zuo + 1, you)
            } else {
                f = defaults;
            }
            var g = f.split(',');
            switch (direction) {
                case "l":
                    var h = parseInt($.trim(g[0])) + 30;
                    var k = d.replace('rotate(' + f + ')', "rotate(" + h + "," + center + " " + center + ")");
                    if (k === d) {
                        k = d + "rotate(" + h + "," + center + " " + center + ")";
                    }
                    break;
                case "r":
                    h = parseInt($.trim(g[0])) - 30;
                    k = d.replace('rotate(' + f + ')', "rotate(" + h + "," + center + " " + center + ")");
                    if (k === d) {
                        k = d + "rotate(" + h + "," + center + " " + center + ")";
                    }
                    break;
                case "d":
                    h = (parseFloat($.trim(g[0])) - 0.1).toFixed(1);
                    if (h < 0.1) {
                        h = 0.1;
                    }
                    k = d.replace('scale(' + f + ')', "scale(" + h + "," + h + ")");
                    if (k === d && h !== 0.1) {
                        k = d + "scale(" + h + "," + h + ")";
                    }
                    break;
                case "u":
                    h = (parseFloat($.trim(g[0])) + 0.1).toFixed(1);
                    k = d.replace('scale(' + f + ')', "scale(" + h + "," + h + ")");
                    if (k === d) {
                        k = d + "scale(" + h + "," + h + ")";
                    }
                    break;
                case "top":
                    h = parseFloat($.trim(g[1])) - 10;
                    k = d.replace('translate(' + f + ')', "translate(" + parseFloat($.trim(g[0])) + "," + h + ")");
                    if (k === d) {
                        k = d + "translate(" + parseFloat($.trim(g[0])) + "," + h + ")";
                    }
                    break;
                case "bottom":
                    h = parseFloat($.trim(g[1])) + 10;
                    k = d.replace('translate(' + f + ')', "translate(" + parseFloat($.trim(g[0])) + "," + h + ")");
                    if (k === d) {
                        k = d + "translate(" + parseFloat($.trim(g[0])) + "," + h + ")";
                    }
                    break;
                case "left":
                    h = parseFloat($.trim(g[0])) - 10;
                    k = d.replace('translate(' + f + ')', "translate(" + h + "," + parseFloat($.trim(g[1])) + ")");
                    if (k === d) {
                        k = d + "translate(" + h + "," + parseFloat($.trim(g[1])) + ")";
                    }
                    break;
                case "right":
                    h = parseFloat($.trim(g[0])) + 10;
                    k = d.replace('translate(' + f + ')', "translate(" + h + "," + parseFloat($.trim(g[1])) + ")");
                    if (k === d) {
                        k = d + "translate(" + h + "," + parseFloat($.trim(g[1])) + ")";
                    }
                    break;
                default:
                    return;
            }
            n.eq(il).attr('transform', k)
        } else {
            switch (direction) {
                case "l":
                    var cs = "rotate(30," + center + " " + center + ")";
                    break;
                case "r":
                    var cs = "rotate(-30," + center + " " + center + ")";
                    break;
                case "d":
                    var cs = "scale(0.9,0.9)";
                    break;
                case "u":
                    var cs = "scale(1.1,1.1)";
                    break;
                case "top":
                    var cs = "translate(0,-10)";
                    break;
                case "bottom":
                    var cs = "translate(0,10)";
                    break;
                case "left":
                    var cs = "translate(-10,0)";
                    break;
                case "right":
                    var cs = "translate(10,0)";
                    break;
                default:
                    return;
            }
            n.eq(il).attr('transform', cs)
        }
    }
};