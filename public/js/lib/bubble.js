// create: $('x').createBubble();
// 		   or
// 		   $('x').createBubble(config);
// 		   config = {
// 		   		interval:20, --> 泡泡创建间隔
//				scale:2      --> 画布缩放倍数
//				height:100      --> 画布高度
//				width:100      --> 画布宽度
// 		   }
// cancel: $('x').cancelBubble();
(function() {
    $.extend($.fn, {
        createBubble: function(config) {
            return this.each(function() {
                var _this = this;
                var dConfig = {
                    interval: 10,
                    scale: 1,
                    width: 0,
                    height: 0
                };
                this.cfg = $.extend({}, dConfig, config);
                if (!this.ctx) {
                    $(this).css('position', 'relative');
                    this.canvas = $('<canvas>');
                    this.canvas.css({
                        'position': 'absolute',
                        'top': 0,
                        'left': 0,
                        'opacity': .6
                    })
                    this.c_w = this.cfg.width ? this.cfg.width : $(this).width() * this.cfg.scale;
                    this.c_h = this.cfg.height ? this.cfg.height : $(this).height() * this.cfg.scale;
                    this.canvas.attr({ 'width': this.c_w, 'height': this.c_h });
                    $(this).prepend(this.canvas);
                    this.ctx = this.canvas.get(0).getContext('2d');
                }
                if (!this.timer) {
                    this.timer = setInterval(function() {
                        var time = new Date().getTime() / 640;
                        _this.animateBubble(time);
                    }, 10)
                }
                this.ctx.clearRect(0, 0, this.c_w, this.c_h);
                this.canvas.css('display', 'block');
                this.time = 0;
                this.bubbles = [];
                this.animateBubble = function(date) {
                    if (_this.time % _this.cfg.interval == 0) {
                        this.bubbles.push(new Bubble(_this));
                        if (_this.time > 1000) {
                            _this.cfg.interval = 5
                        }
                    }
                    _this.ctx.clearRect(0, 0, this.c_w * 2, this.c_h * 2);
                    for (var i = 0; i < _this.bubbles.length; i++) {
                        if (_this.bubbles[i]) {
                            _this.bubbles[i].move(date);
                            if (_this.bubbles[i].y < -100) {
                                _this.bubbles.splice(i, 1);
                            }
                            //if (_this.bubbles[i] !== undefined) _this.bubbles[i].update();
                        }
                    }
                    _this.time++;
                }
            })
        },
        cancelBubble: function() {
            return this.each(function() {
                if (this.timer) {
                    clearInterval(this.timer);
                    this.timer = 0;
                    this.canvas.css('display', 'none');
                }

            })
        }
    })

})()

function Bubble(obj) {
    this.x = rd(obj.c_w * 1 / 5, obj.c_w * 4 / 5);
    this.y = rd(obj.c_h * 2 / 3, obj.c_h);
    this.w = 0;
    this.py = rd(1, 2) * .5;
    this.mw = rd(obj.c_w * 1 / 4, obj.c_w * 1 / 3);
    this.obj = obj;
}
Bubble.prototype.move = function(date) {
    var px = this.py > 2 ? Math.sin(date) : Math.sin(date) * -.5;
    this.y -= this.py;
    this.x += px;
    if (this.w < this.mw) {
        this.w += .04;
    }
    if (this.y < -this.w || this.x < 0 || (this.x + this.w) > this.obj.c_w) {

    } else {
        this.obj.ctx.beginPath();
        this.obj.ctx.arc(this.x, this.y, this.w, 0, 2 * Math.PI);
        this.obj.ctx.fillStyle = "white";
        this.obj.ctx.fill();
    }
}

function rd(n, m) {
    var c = m - n + 1;
    return Math.floor(Math.random() * c + n);
}