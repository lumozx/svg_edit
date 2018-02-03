(function($){
    $.fn.extend({
        'svg_edit' : function(t){
             this.find('svg').children().on('click', function() {
                $(this).toggleClass('selected');
            });
            var html = `<button >top</button><button>bottom</button><button>left</button><button>right</button><button>L</button><button>R</button><button>d</button><button>u</button>`;
            if (t) {
                html = html + `<button>changecolor</button>`;
            }
            $(this).append(html)
            $(this).find('button').eq(0).on('click',()=>{
                this.transform_svg('top',this)
            })
            $(this).find('button').eq(1).on('click',()=>{
                this.transform_svg('bottom',this)
            })
            $(this).find('button').eq(2).on('click',()=>{
                this.transform_svg('left',this)
            })
            $(this).find('button').eq(3).on('click',()=>{
                this.transform_svg('right',this)
            })
            $(this).find('button').eq(4).on('click',()=>{
                this.transform_svg('l',this)
            })
            $(this).find('button').eq(5).on('click',()=>{
                this.transform_svg('r',this)
            })
            $(this).find('button').eq(6).on('click',()=>{
                this.transform_svg('d',this)
            })
            $(this).find('button').eq(7).on('click',()=>{
                this.transform_svg('u',this)
            })
            $(this).find('button').eq(8).on('click',()=>{
                this.selectColor(this,t)
            })
        },
        'transform_svg' : function(e){
            var a = $(this).find('svg').attr('viewBox');
            var b = a.split(' ')
            var c = $.trim(b[3]) / 2; //获得旋转中心
            var le = $('.selected').length;
            switch (e) {
                case "l":
                case "r":
                    this.lin({lengths:le,action:'rotate',defaults:'0',direction:e,center:c});
                    break;
                case "d":
                case "u":
                    this.lin({lengths:le,action:'scale',defaults:'1',direction:e});
                    break;
                case "top":
                case "bottom":
                case "left":
                case "right":
                    this.lin({lengths:le,action:'translate',defaults:'0,0',direction:e});
                    break;
                default:
                    return;
            }
        },
        'selectColor' : function(t){
            t = $.trim(t);
            if ($('.selected').length === 0) {
                $(this).find('svg').children().attr('fill', t);
                return;
            }
            $('.selected').attr('fill', t);
        },
        'lin' : function({lengths,action,defaults,direction,center}){
            var n = $('.selected');
            if (!lengths) {
            n = $(this).find('svg').children();
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
                            var cs = `rotate(30,${center} ${center})`;
                            break;
                        case "r":
                            var cs = `rotate(-30,${center} ${center})`;
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
        }
    })
})(jQuery)
