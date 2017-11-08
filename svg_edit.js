;

function svg_edit(id, t) {
    $(id).find('svg').children().on('click', function() {
        $(this).toggleClass('selected');
    });
    var html = ``;
    var html = html + `<button onclick="transform('top','${id}')">top</button>`;
    var html = html + `<button onclick="transform('bottom','${id}')">bottom</button>`;
    var html = html + `<button onclick="transform('left','${id}')">left</button>`;
    var html = html + `<button onclick="transform('right','${id}')">right</button>`;
    var html = html + `<button onclick="transform('l','${id}')">L</button>`;
    var html = html + `<button onclick="transform('r','${id}')">R</button>`;
    var html = html + `<button onclick="transform('d','${id}')">d</button>`;
    var html = html + `<button onclick="transform('u','${id}')">u</button>`;
    if (t) {
        var html = html + `<button onclick="selectColor('${id}','${t}')">changecolor</button>`;
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
            lin(le, 'rotate', "0", e, id, c);
            break;
        case "d":
        case "u":
            lin(le, 'scale', "1", e, id);
            break;
        case "top":
        case "bottom":
        case "left":
        case "right":
            lin(le, 'translate', "0,0", e, id);
            break;
        default:
            return;
    }
};

function selectColor(id, t) {
    var t = $.trim(t);
    if ($('.selected').length == 0) {
        $(id).find('svg').children().attr('fill', t);
        return;
    }
    $('.selected').attr('fill', t);
}

function lin(le, val, de, e, id, c) { //'transform'   'rotate'   "0"    'l'
    var n = $('.selected');
    if (!le) {
        var n = $(id).find('svg').children();
        var le = n.length;
    }
    for (let il = 0; il < le; il++) {
        if (n.eq(il).attr('transform')) {
            var d = n.eq(il).attr('transform');
            if (d.indexOf(val) != -1) {
                var fl = d.indexOf(val)
                var zuo = d.indexOf("(", fl);
                var you = d.indexOf(")", zuo);
                var f = d.substring(zuo + 1, you)
            } else {
                var f = de
            }
            var g = f.split(',');
            switch (e) {
                case "l":
                    var h = parseInt($.trim(g[0])) + 30;
                    var k = d.replace('rotate(' + f + ')', "rotate(" + h + "," + c + " " + c + ")");
                    if (k == d) {
                        k = d + "rotate(" + h + "," + c + " " + c + ")";
                    }
                    break;
                case "r":
                    var h = parseInt($.trim(g[0])) - 30;
                    var k = d.replace('rotate(' + f + ')', "rotate(" + h + "," + c + " " + c + ")");
                    if (k == d) {
                        k = d + "rotate(" + h + "," + c + " " + c + ")";
                    }
                    break;
                case "d":
                    var h = (parseFloat($.trim(g[0])) - 0.1).toFixed(1);
                    if (h < 0.1) {
                        h = 0.1;
                    }
                    var k = d.replace('scale(' + f + ')', "scale(" + h + "," + h + ")");
                    if (k == d && h != 0.1) {
                        k = d + "scale(" + h + "," + h + ")";
                    }
                    break;
                case "u":
                    var h = (parseFloat($.trim(g[0])) + 0.1).toFixed(1);
                    var k = d.replace('scale(' + f + ')', "scale(" + h + "," + h + ")");
                    if (k == d) {
                        k = d + "scale(" + h + "," + h + ")";
                    }
                    break;
                case "top":
                    var h = parseFloat($.trim(g[1])) - 10;
                    var k = d.replace('translate(' + f + ')', "translate(" + parseFloat($.trim(g[0])) + "," + h + ")");
                    if (k == d) {
                        k = d + "translate(" + parseFloat($.trim(g[0])) + "," + h + ")";
                    }
                    break;
                case "bottom":
                    var h = parseFloat($.trim(g[1])) + 10;
                    var k = d.replace('translate(' + f + ')', "translate(" + parseFloat($.trim(g[0])) + "," + h + ")");
                    if (k == d) {
                        k = d + "translate(" + parseFloat($.trim(g[0])) + "," + h + ")";
                    }
                    break;
                case "left":
                    var h = parseFloat($.trim(g[0])) - 10;
                    var k = d.replace('translate(' + f + ')', "translate(" + h + "," + parseFloat($.trim(g[1])) + ")");
                    if (k == d) {
                        k = d + "translate(" + h + "," + parseFloat($.trim(g[1])) + ")";
                    }
                    break;
                case "right":
                    var h = parseFloat($.trim(g[0])) + 10;
                    var k = d.replace('translate(' + f + ')', "translate(" + h + "," + parseFloat($.trim(g[1])) + ")");
                    if (k == d) {
                        k = d + "translate(" + h + "," + parseFloat($.trim(g[1])) + ")";
                    }
                    break;
                default:
                    return;
            }
            n.eq(il).attr('transform', k)
        } else {
            switch (e) {
                case "l":
                    var cs = "rotate(30," + c + " " + c + ")";
                    break;
                case "r":
                    var cs = "rotate(-30," + c + " " + c + ")";
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