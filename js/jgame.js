if(!window.performance) {
    window.performance = {
    };
}
if(!performance.now) {
    performance.now = Date.now;
}
window.requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame || ((function () {
    var lastTime = performance.now();
    var frame = 1000 / 60;
    return function (func) {
        var currentTime = performance.now();
        var _id = setTimeout(function () {
            func(performance.now());
        }, Math.max(0, lastTime + frame - currentTime));
        lastTime = currentTime;
        return _id;
    };
})());
window.createCanvas = function (width, height) {
    var canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;
    if("imageSmoothingEnabled" in window) {
        var browser = JGUtil.getBrowser();
        if(browser.opera) {
            canvas.style["imageRendering"] = "-o-crisp-edges";
        } else if(browser.msie) {
            canvas.style["msInterpolationMode"] = "nearest-neighbor";
        } else if(browser.safari) {
            canvas.style["imageRendering"] = "-webkit-optimize-contrast";
        }
        var context = canvas.getContext("2d");
        if(context["imageSmoothingEnabled"]) {
            context["imageSmoothingEnabled"] = false;
        }
        if(context["webkitImageSmoothingEnabled"]) {
            context["webkitImageSmoothingEnabled"] = false;
        }
        if(context["mozImageSmoothingEnabled"]) {
            context["mozImageSmoothingEnabled"] = false;
        }
    }
    return canvas;
};
var Angle;
(function (Angle) {
    Angle._map = [];
    Angle._map[0] = "left";
    Angle.left = 0;
    Angle._map[1] = "right";
    Angle.right = 1;
    Angle._map[2] = "up";
    Angle.up = 2;
    Angle._map[3] = "down";
    Angle.down = 3;
})(Angle || (Angle = {}));
var Rectangle = (function () {
    function Rectangle(left, top, right, bottom) {
        this.left = left;
        this.top = top;
        this.right = right;
        this.bottom = bottom;
    }
    Rectangle.prototype.hitTest = function (point) {
        return (this.left <= point.x && this.right >= point.x && this.top <= point.y && this.bottom >= point.y);
    };
    Rectangle.prototype.fit = function (point) {
        if(point.y < this.top) {
            point.y = this.top;
        } else if(point.y > this.bottom) {
            point.y = this.bottom;
        }
        if(point.x < this.left) {
            point.x = this.left;
        } else if(point.x > this.right) {
            point.x = this.right;
        }
    };
    Rectangle.prototype.width = function () {
        return Math.abs(this.right - this.left);
    };
    Rectangle.prototype.height = function () {
        return Math.abs(this.bottom - this.top);
    };
    return Rectangle;
})();
var Easing = (function () {
    function Easing() { }
    Easing.LINEAR = function LINEAR(t, b, c, d) {
        return c * t / d + b;
    };
    Easing.SWING = function SWING(t, b, c, d) {
        return c * (0.5 - Math.cos(((t / d) * Math.PI)) / 2) + b;
    };
    Easing.QUAD_EASEIN = function QUAD_EASEIN(t, b, c, d) {
        return c * (t /= d) * t + b;
    };
    Easing.QUAD_EASEOUT = function QUAD_EASEOUT(t, b, c, d) {
        return -c * (t /= d) * (t - 2) + b;
    };
    Easing.QUAD_EASEINOUT = function QUAD_EASEINOUT(t, b, c, d) {
        if((t /= d / 2) < 1) {
            return c / 2 * t * t + b;
        }
        return -c / 2 * ((--t) * (t - 2) - 1) + b;
    };
    Easing.CUBIC_EASEIN = function CUBIC_EASEIN(t, b, c, d) {
        return c * (t /= d) * t * t + b;
    };
    Easing.CUBIC_EASEOUT = function CUBIC_EASEOUT(t, b, c, d) {
        return c * ((t = t / d - 1) * t * t + 1) + b;
    };
    Easing.CUBIC_EASEINOUT = function CUBIC_EASEINOUT(t, b, c, d) {
        if((t /= d / 2) < 1) {
            return c / 2 * t * t * t + b;
        }
        return c / 2 * ((t -= 2) * t * t + 2) + b;
    };
    Easing.QUART_EASEIN = function QUART_EASEIN(t, b, c, d) {
        return c * (t /= d) * t * t * t + b;
    };
    Easing.QUART_EASEOUT = function QUART_EASEOUT(t, b, c, d) {
        return -c * ((t = t / d - 1) * t * t * t - 1) + b;
    };
    Easing.QUART_EASEINOUT = function QUART_EASEINOUT(t, b, c, d) {
        if((t /= d / 2) < 1) {
            return c / 2 * t * t * t * t + b;
        }
        return -c / 2 * ((t -= 2) * t * t * t - 2) + b;
    };
    Easing.QUINT_EASEIN = function QUINT_EASEIN(t, b, c, d) {
        return c * (t /= d) * t * t * t * t + b;
    };
    Easing.QUINT_EASEOUT = function QUINT_EASEOUT(t, b, c, d) {
        return c * ((t = t / d - 1) * t * t * t * t + 1) + b;
    };
    Easing.QUINT_EASEINOUT = function QUINT_EASEINOUT(t, b, c, d) {
        if((t /= d / 2) < 1) {
            return c / 2 * t * t * t * t * t + b;
        }
        return c / 2 * ((t -= 2) * t * t * t * t + 2) + b;
    };
    Easing.SIN_EASEIN = function SIN_EASEIN(t, b, c, d) {
        return -c * Math.cos(t / d * (Math.PI / 2)) + c + b;
    };
    Easing.SIN_EASEOUT = function SIN_EASEOUT(t, b, c, d) {
        return c * Math.sin(t / d * (Math.PI / 2)) + b;
    };
    Easing.SIN_EASEINOUT = function SIN_EASEINOUT(t, b, c, d) {
        return -c / 2 * (Math.cos(Math.PI * t / d) - 1) + b;
    };
    Easing.CIRC_EASEIN = function CIRC_EASEIN(t, b, c, d) {
        return -c * (Math.sqrt(1 - (t /= d) * t) - 1) + b;
    };
    Easing.CIRC_EASEOUT = function CIRC_EASEOUT(t, b, c, d) {
        return c * Math.sqrt(1 - (t = t / d - 1) * t) + b;
    };
    Easing.CIRC_EASEINOUT = function CIRC_EASEINOUT(t, b, c, d) {
        if((t /= d / 2) < 1) {
            return -c / 2 * (Math.sqrt(1 - t * t) - 1) + b;
        }
        return c / 2 * (Math.sqrt(1 - (t -= 2) * t) + 1) + b;
    };
    Easing.ELASTIC_EASEIN = function ELASTIC_EASEIN(t, b, c, d, a, p) {
        if(t === 0) {
            return b;
        }
        if((t /= d) === 1) {
            return b + c;
        }
        if(!p) {
            p = d * 0.3;
        }
        var s;
        if(!a || a < Math.abs(c)) {
            a = c;
            s = p / 4;
        } else {
            s = p / (2 * Math.PI) * Math.asin(c / a);
        }
        return -(a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p)) + b;
    };
    Easing.ELASTIC_EASEOUT = function ELASTIC_EASEOUT(t, b, c, d, a, p) {
        if(t === 0) {
            return b;
        }
        if((t /= d) === 1) {
            return b + c;
        }
        if(!p) {
            p = d * 0.3;
        }
        var s;
        if(!a || a < Math.abs(c)) {
            a = c;
            s = p / 4;
        } else {
            s = p / (2 * Math.PI) * Math.asin(c / a);
        }
        return (a * Math.pow(2, -10 * t) * Math.sin((t * d - s) * (2 * Math.PI) / p) + c + b);
    };
    Easing.ELASTIC_EASEINOUT = function ELASTIC_EASEINOUT(t, b, c, d, a, p) {
        if(t === 0) {
            return b;
        }
        if((t /= d / 2) === 2) {
            return b + c;
        }
        if(!p) {
            p = d * (0.3 * 1.5);
        }
        var s;
        if(!a || a < Math.abs(c)) {
            a = c;
            s = p / 4;
        } else {
            s = p / (2 * Math.PI) * Math.asin(c / a);
        }
        if(t < 1) {
            return -0.5 * (a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p)) + b;
        }
        return a * Math.pow(2, -10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p) * 0.5 + c + b;
    };
    Easing.BOUNCE_EASEOUT = function BOUNCE_EASEOUT(t, b, c, d) {
        if((t /= d) < (1 / 2.75)) {
            return c * (7.5625 * t * t) + b;
        } else if(t < (2 / 2.75)) {
            return c * (7.5625 * (t -= (1.5 / 2.75)) * t + 0.75) + b;
        } else if(t < (2.5 / 2.75)) {
            return c * (7.5625 * (t -= (2.25 / 2.75)) * t + 0.9375) + b;
        } else {
            return c * (7.5625 * (t -= (2.625 / 2.75)) * t + 0.984375) + b;
        }
    };
    Easing.BOUNCE_EASEIN = function BOUNCE_EASEIN(t, b, c, d) {
        return c - Easing.BOUNCE_EASEOUT(d - t, 0, c, d) + b;
    };
    Easing.BOUNCE_EASEINOUT = function BOUNCE_EASEINOUT(t, b, c, d) {
        if(t < d / 2) {
            return Easing.BOUNCE_EASEIN(t * 2, 0, c, d) * 0.5 + b;
        } else {
            return Easing.BOUNCE_EASEOUT(t * 2 - d, 0, c, d) * 0.5 + c * 0.5 + b;
        }
    };
    Easing.BACK_EASEIN = function BACK_EASEIN(t, b, c, d, s) {
        if(s === undefined) {
            s = 1.70158;
        }
        return c * (t /= d) * t * ((s + 1) * t - s) + b;
    };
    Easing.BACK_EASEOUT = function BACK_EASEOUT(t, b, c, d, s) {
        if(s === undefined) {
            s = 1.70158;
        }
        return c * ((t = t / d - 1) * t * ((s + 1) * t + s) + 1) + b;
    };
    Easing.BACK_EASEINOUT = function BACK_EASEINOUT(t, b, c, d, s) {
        if(s === undefined) {
            s = 1.70158;
        }
        if((t /= d / 2) < 1) {
            return c / 2 * (t * t * (((s *= (1.525)) + 1) * t - s)) + b;
        }
        return c / 2 * ((t -= 2) * t * (((s *= (1.525)) + 1) * t + s) + 2) + b;
    };
    Easing.EXPO_EASEIN = function EXPO_EASEIN(t, b, c, d) {
        return (t === 0) ? b : c * Math.pow(2, 10 * (t / d - 1)) + b;
    };
    Easing.EXPO_EASEOUT = function EXPO_EASEOUT(t, b, c, d) {
        return (t === d) ? b + c : c * (-Math.pow(2, -10 * t / d) + 1) + b;
    };
    Easing.EXPO_EASEINOUT = function EXPO_EASEINOUT(t, b, c, d) {
        if(t === 0) {
            return b;
        }
        if(t === d) {
            return b + c;
        }
        if((t /= d / 2) < 1) {
            return c / 2 * Math.pow(2, 10 * (t - 1)) + b;
        }
        return c / 2 * (-Math.pow(2, -10 * --t) + 2) + b;
    };
    Easing.RANDOM = function RANDOM() {
        var ary = [];
        for(var i in Easing) {
            if(i != "RANDOM") {
                ary.push(i);
            }
        }
        return Easing[ary[Math.floor(Math.random() * ary.length)]];
    };
    return Easing;
})();
var ENTITY_OPTIONS_DEFAULT_VALUES = {
    rotate: 0,
    translate: {
        x: 0,
        y: 0
    },
    transform: {
        m11: 1,
        m12: 0,
        m21: 0,
        m22: 1,
        dx: 0,
        dy: 0
    },
    scale: {
        x: 1,
        y: 1
    },
    globalAlpha: undefined,
    font: undefined,
    fillStyle: undefined,
    strokeStyle: undefined,
    lineCap: undefined,
    lineJoin: undefined,
    lineWidth: undefined,
    miterLimit: undefined,
    shadowBlur: undefined,
    shadowColor: undefined,
    shadowOffsetX: undefined,
    shadowOffsetY: undefined,
    strokeStyle: undefined,
    textAlign: undefined,
    textBaseline: undefined,
    globalCompositeOperation: undefined
};
(function () {
    var canvas = document.createElement("canvas");
    var context = canvas.getContext("2d");
    for(var p in ENTITY_OPTIONS_DEFAULT_VALUES) {
        if(ENTITY_OPTIONS_DEFAULT_VALUES[p] == undefined) {
            ENTITY_OPTIONS_DEFAULT_VALUES[p] = context[p];
        }
    }
})();
var E = (function () {
    function E() {
    }
    E.prototype.enablePointingEvent = function () {
        this.pointCapture = true;
        if(!this.pointDown) {
            this.pointDown = new Trigger();
        }
        if(!this.pointUp) {
            this.pointUp = new Trigger();
        }
        if(!this.pointMove) {
            this.pointMove = new Trigger();
        }
    };
    E.prototype.disablePointingEvent = function () {
        delete this.pointCapture;
    };
    E.prototype.removeDrawOption = function (name) {
        if(!this.options) {
            return;
        }
        if(this.options[name] !== undefined) {
            delete this.options[name];
        }
        var cnt = 0;
        for(var i in this.options) {
            cnt++;
            break;
        }
        if(!cnt) {
            delete this.options;
        }
    };
    E.prototype.setDrawOption = function (name, value) {
        if(!this.options) {
            this.options = {
            };
        }
        this.options[name] = value;
        this.updated();
    };
    E.prototype.getDrawOption = function (name) {
        if(!this.options || this.options[name] == undefined) {
            return ENTITY_OPTIONS_DEFAULT_VALUES[name];
        }
        return this.options[name];
    };
    E.prototype.moveTo = function (x, y) {
        this.x = x;
        this.y = y;
        this.updated();
    };
    E.prototype.moveBy = function (x, y) {
        this.x += x;
        this.y += y;
        this.updated();
    };
    E.prototype.scrollTo = function (x, y) {
        this.scroll = {
            x: x,
            y: y
        };
        this.updated();
    };
    E.prototype.scrollBy = function (x, y) {
        if(!this.scroll) {
            this.scroll = {
                x: 0,
                y: 0
            };
        }
        this.scroll.x += x;
        this.scroll.y += y;
        this.updated();
    };
    E.prototype.activate = function () {
        if(this.active_queue) {
            var f;
            while(f = this.active_queue.shift()) {
                f.call(this);
            }
            delete this.active_queue;
        }
        if(this.entities) {
            for(var i = 0; i < this.entities.length; i++) {
                if(!this.entities[i].scene) {
                    this.entities[i].scene = this.scene;
                    this.entities[i].activate();
                }
            }
        }
    };
    E.prototype.addActiveQueue = function (f) {
        if(this.scene) {
            f.call(this);
            return;
        }
        if(!this.active_queue) {
            this.active_queue = [];
        }
        this.active_queue.push(f);
    };
    E.prototype.appendTo = function (scene, layerName) {
        scene.append(this, layerName);
    };
    E.prototype.remove = function () {
        if(this.parent) {
            this.parent.removeChild(this);
        } else {
            throw "Can not remove layer. (use scene.deleteLayer)";
        }
    };
    E.prototype.insert = function (entity, index) {
        if(!this.entities) {
            throw "Can not call append of non-container entity";
        }
        entity.scene = this.scene;
        entity.parent = this;
        if(typeof index != "number") {
            for(var i = 0; i < this.entities.length; i++) {
                if(this.entities[i] == index) {
                    index = i;
                    break;
                }
            }
        }
        this.entities.splice(index, 0, entity);
        entity.activate();
    };
    E.prototype.append = function (entity) {
        if(!this.entities) {
            throw "Can not call append of non-container entity";
        }
        entity.scene = this.scene;
        entity.parent = this;
        this.entities.push(entity);
        if(this.scene) {
            entity.activate();
        }
    };
    E.prototype.removeChild = function (entity) {
        if(!this.entities) {
            throw "Can not call removeChild of non-container entity";
        }
        for(var i = 0; i < this.entities.length; i++) {
            if(this.entities[i] == entity) {
                if(entity.entities) {
                    var childEntity;
                    while(childEntity = entity.entities.pop()) {
                        entity.removeChild(childEntity);
                    }
                }
                this.entities.splice(i, 1);
                entity.destroy();
                return true;
            }
        }
        return false;
    };
    E.prototype.start = function () {
        if(this.started) {
            return;
        }
        this.started = true;
        if(this.scene) {
            this.scene.game.update.handle(this, this.update);
        } else {
            this.addActiveQueue(function () {
                this.scene.game.update.handle(this, this.update);
            });
        }
    };
    E.prototype.stop = function () {
        if(!this.started) {
            return;
        }
        this.started = false;
        if(this.scene) {
            this.scene.game.update.remove(this, this.update);
        } else {
            this.addActiveQueue(function () {
                this.scene.game.update.remove(this, this.update);
            });
        }
    };
    E.prototype.startTimer = function (wait, method) {
        if(this.scene) {
            this.scene.game.addTimer(wait, this, method ? method : this.interval);
        } else {
            this.addActiveQueue(function () {
                this.scene.game.addTimer(wait, this, method ? method : this.interval);
            });
        }
    };
    E.prototype.stopTimer = function (wait, method) {
        if(this.scene) {
            this.scene.game.removeTimer(wait, this, method ? method : this.interval);
        } else {
            this.addActiveQueue(function () {
                this.scene.game.removeTimer(wait, this, method ? method : this.interval);
            });
        }
    };
    E.prototype.updated = function () {
        if(this.parent) {
            this.parent.updated();
        } else {
            this.isUpdated = true;
        }
    };
    E.prototype.isUpdate = function () {
        return this.isUpdated;
    };
    E.prototype.reflected = function () {
        this.isUpdated = false;
    };
    E.prototype.tl = function () {
        if(!this._tl) {
            this._tl = new Timeline(this);
        }
        return this._tl;
    };
    E.prototype.destroy = function () {
        if(this._tl) {
            this._tl.clear();
            delete this._tl;
        }
        this.stop();
        if(this.scene) {
            this.scene.game.removeTimerAll(this);
            this.scene = null;
        }
        delete this.parent;
        if(this.entities) {
            var childEntity;
            while(childEntity = this.entities.pop()) {
                childEntity.destroy();
            }
        }
        if(this.pointDown) {
            this.pointDown.destroy();
            delete this.pointDown;
        }
        if(this.pointUp) {
            this.pointUp.destroy();
            delete this.pointUp;
        }
        if(this.pointMove) {
            this.pointMove.destroy();
            delete this.pointMove;
        }
    };
    E.prototype.offset = function () {
        var parent_offset = this.parent ? this.parent.offset() : {
            x: 0,
            y: 0
        };
        return {
            x: this.x + parent_offset.x,
            y: this.y + parent_offset.y
        };
    };
    E.prototype.rect = function () {
        var offset = this.offset();
        return new Rectangle(offset.x, offset.y, offset.x + this.width, offset.y + this.height);
    };
    E.prototype.hitTest = function (point) {
        return this.rect().hitTest(point);
    };
    E.prototype.getDistance = function (point) {
        var area = point;
        if(area.width && area.height) {
            return {
                x: Math.abs((area.x + area.width / 2) - (this.x + this.width / 2)),
                y: Math.abs((area.y + area.height / 2) - (this.y + this.height / 2))
            };
        } else {
            return {
                x: Math.abs(point.x - (this.x + this.width / 2)),
                y: Math.abs(point.y - (this.y + this.height / 2))
            };
        }
    };
    E.prototype.getEntityByPoint = function (point, force) {
        if(this.entities) {
            for(var i = this.entities.length - 1; i >= 0; i--) {
                if(force || this.entities[i].pointCapture) {
                    var p = this.entities[i].getEntityByPoint(point);
                    if(p) {
                        return p;
                    }
                }
            }
        }
        if((force || this.pointCapture) && this.hitTest(point)) {
            return this;
        }
        return null;
    };
    E.prototype.createSprite = function () {
        var buffer = new BufferedRenderer({
            width: this.width,
            height: this.height
        });
        var x = this.x;
        var y = this.y;
        this.x = 0;
        this.y = 0;
        buffer.renderUnit(this);
        this.x = x;
        this.y = y;
        return buffer.createSprite();
    };
    E.prototype.update = function (t) {
    };
    E.prototype.interval = function () {
    };
    E.prototype.draw = function (context) {
    };
    return E;
})();
var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var ShapeStyle;
(function (ShapeStyle) {
    ShapeStyle._map = [];
    ShapeStyle._map[0] = "stroke";
    ShapeStyle.stroke = 0;
    ShapeStyle._map[1] = "fill";
    ShapeStyle.fill = 1;
})(ShapeStyle || (ShapeStyle = {}));
var ShapeType;
(function (ShapeType) {
    ShapeType._map = [];
    ShapeType._map[0] = "rect";
    ShapeType.rect = 0;
    ShapeType._map[1] = "arc";
    ShapeType.arc = 1;
})(ShapeType || (ShapeType = {}));
var Shape = (function (_super) {
    __extends(Shape, _super);
    function Shape(width, height, style, color, type) {
        _super.call(this);
        this.x = 0;
        this.y = 0;
        this.width = width;
        this.height = height;
        this.style = style ? style : ShapeStyle.stroke;
        if(color) {
            this.setColor(color);
        }
        this.type = type ? type : ShapeType.rect;
    }
    Shape.PI_200_PER = Math.PI * 2;
    Shape.prototype.setClip = function (value) {
        this.clip = value;
        if(this.clip) {
            this.disableTransform = true;
        } else {
            delete this.disableTransform;
        }
    };
    Shape.prototype.setStyle = function (style) {
        this.style = style;
        this.setColor(this.getColor());
    };
    Shape.prototype.setLineWidth = function (width) {
        this.setDrawOption("lineWidth", width);
    };
    Shape.prototype.getLineWidth = function () {
        return this.getDrawOption("lineWidth");
    };
    Shape.prototype.setColor = function (color) {
        if(this.style == ShapeStyle.stroke) {
            this.setDrawOption("strokeStyle", color);
        } else {
            this.setDrawOption("fillStyle", color);
        }
    };
    Shape.prototype.getColor = function () {
        if(this.style == ShapeStyle.stroke) {
            return this.getDrawOption("strokeStyle");
        } else {
            return this.getDrawOption("filltyle");
        }
    };
    Shape.prototype.synchronize = function (syncObj, syncFunc) {
        this.syncObj = syncObj;
        this.syncFunc = syncFunc;
    };
    Shape.prototype.draw = function (context) {
        if(this.syncObj) {
            this.syncFunc.call(this.syncObj, this);
        }
        if(this.clip) {
            context.save();
            context.translate(this.x, this.y);
            if(this.options) {
                this.scene.game.renderer.useDrawOption(this, context);
            }
        }
        context.beginPath();
        switch(this.type) {
            case ShapeType.rect:
                context.rect(0, 0, this.width, this.height);
                break;
            case ShapeType.arc:
                var w2 = this.width / 2;
                context.arc(w2, w2, w2, 0, Shape.PI_200_PER, false);
                break;
        }
        if(this.clip) {
            context.restore();
            context.clip();
        } else if(this.style == ShapeStyle.fill) {
            context.fill();
        } else {
            context.stroke();
        }
    };
    return Shape;
})(E);
var Trigger = (function () {
    function Trigger() {
        this.handlers = [];
    }
    Trigger.prototype.handleInsert = function (index, owner, handler) {
        this.handlers.splice(index, 0, {
            owner: owner,
            handler: handler
        });
    };
    Trigger.prototype.handle = function (owner, handler) {
        if(!handler) {
            this.handlers.push({
                owner: window,
                handler: owner
            });
        } else {
            this.handlers.push({
                owner: owner,
                handler: handler
            });
        }
    };
    Trigger.prototype.destroy = function () {
        this.handlers = new Array();
    };
    Trigger.prototype.removeAll = function (owner) {
        var ret = [];
        var tmp;
        while(tmp = this.handlers.pop()) {
            if(tmp.owner != owner) {
                ret.push(tmp);
            }
        }
        this.handlers = ret;
    };
    Trigger.prototype.removeAllByHandler = function (handler) {
        var ret = [];
        var tmp;
        while(tmp = this.handlers.pop()) {
            if(tmp.handler != handler) {
                ret.push(tmp);
            }
        }
        this.handlers = ret;
    };
    Trigger.prototype.remove = function (owner, handler) {
        var ret = [];
        var tmp;
        if(!handler) {
            handler = owner;
            owner = window;
        }
        while(tmp = this.handlers.pop()) {
            if(tmp.handler != handler || tmp.owner != owner) {
                ret.push(tmp);
            }
        }
        this.handlers = ret;
    };
    Trigger.prototype.fire = function (param) {
        if(this.handlers.length == 0) {
            return;
        }
        var handlers = [];
        for(var i = 0; i < this.handlers.length; i++) {
            handlers[i] = this.handlers[i];
        }
        for(var i = 0; i < handlers.length; i++) {
            handlers[i].handler.call(handlers[i].owner, param);
        }
    };
    Trigger.prototype.fastFire = function (param) {
        for(var i = 0; i < this.handlers.length; i++) {
            this.handlers[i].handler.call(this.handlers[i].owner, param);
        }
    };
    return Trigger;
})();
var SimpleSound = (function () {
    function SimpleSound() { }
    SimpleSound.getAudioContext = function getAudioContext() {
        if(SimpleSound.context) {
            return SimpleSound.context;
        }
        SimpleSound.context = SimpleSound._getAudioContext();
        return SimpleSound.context;
    };
    SimpleSound._getAudioContext = function _getAudioContext() {
        if(window["AudioContext"]) {
            return new window["AudioContext"]();
        } else if(window["webkitAudioContext"]) {
            return new window["webkitAudioContext"]();
        } else {
            return null;
        }
    };
    SimpleSound.play = function play(sound, loop, when, gain) {
        var context = SimpleSound.getAudioContext();
        var bufferSource = context.createBufferSource();
        if(loop) {
            bufferSource.loop = true;
        }
        bufferSource.buffer = sound;
        if(gain) {
            bufferSource.connect(gain);
        } else {
            if(!SimpleSound.soundGain) {
                var soundGain = context.createGain();
                soundGain.connect(context.destination);
                SimpleSound.soundGain = soundGain;
            }
            bufferSource.connect(SimpleSound.soundGain);
        }
        bufferSource.start(when === undefined ? 0 : when);
        return bufferSource;
    };
    SimpleSound.hasBgm = function hasBgm() {
        return SimpleSound.bgmSource !== undefined;
    };
    SimpleSound.playBgm = function playBgm(sound, loop, when) {
        if(SimpleSound.bgmSource) {
            SimpleSound.stopBgm();
        }
        if(!SimpleSound.bgmGain) {
            var context = SimpleSound.getAudioContext();
            var bgmGain = context.createGain();
            bgmGain.connect(context.destination);
            SimpleSound.bgmGain = bgmGain;
        }
        SimpleSound.bgmSource = SimpleSound.play(sound, loop, when, SimpleSound.bgmGain);
        return SimpleSound.bgmSource;
    };
    SimpleSound.stop = function stop(source, when) {
        if(!source) {
            return;
        }
        source.stop(when === undefined ? 0 : when);
    };
    SimpleSound.stopBgm = function stopBgm(when) {
        SimpleSound.stop(SimpleSound.bgmSource, when);
        delete SimpleSound.bgmSource;
    };
    SimpleSound.tone = function tone(hertz, seconds) {
        hertz = hertz !== undefined ? hertz : 200;
        seconds = seconds !== undefined ? seconds : 1;
        var nChannels = 1;
        var sampleRate = 44100;
        var amplitude = 2;
        var context = SimpleSound.getAudioContext();
        var buffer = context.createBuffer(nChannels, seconds * sampleRate, sampleRate);
        var fArray = buffer.getChannelData(0);
        for(var i = 0; i < fArray.length; i++) {
            var time = i / buffer.sampleRate;
            var angle = hertz * time * Math.PI;
            fArray[i] = Math.sin(angle) * amplitude;
        }
        return buffer;
    };
    return SimpleSound;
})();
var ResourceLoader = (function () {
    function ResourceLoader(resource) {
        this.resource = resource;
    }
    ResourceLoader.prototype.load = function (url, identifier) {
    };
    return ResourceLoader;
})();
var ImageResourceLoader = (function (_super) {
    __extends(ImageResourceLoader, _super);
    function ImageResourceLoader() {
        _super.apply(this, arguments);

    }
    ImageResourceLoader.prototype.load = function (url, identifier) {
        var image = new Image();
        image.src = "img/" + url;
        var caller = this;
        var callback = this.completed;
        image.onerror = function () {
            callback.call(caller, identifier, image, false);
        };
        image.onload = function () {
            callback.call(caller, identifier, image, true);
        };
    };
    ImageResourceLoader.prototype.completed = function (name, image, is_success) {
        if(!is_success) {
            console.log("error: " + name);
        } else {
            this.resource.images[name] = image;
        }
        this.resource.requestCompleted(name);
    };
    return ImageResourceLoader;
})(ResourceLoader);
var ScriptResourceLoader = (function (_super) {
    __extends(ScriptResourceLoader, _super);
    function ScriptResourceLoader() {
        _super.apply(this, arguments);

    }
    ScriptResourceLoader.prototype.load = function (url, identifier) {
        var _this = this;
        var script = document.createElement("script");
        var heads = document.getElementsByTagName("head");
        if(heads.length == 0) {
            throw "can not find head tag";
        }
        script.src = url + "?" + (new Date()).getTime();
        var callback = this.completed;
        script.onload = function () {
            callback.call(_this, identifier, script, true);
        };
        script.onerror = function () {
            callback.call(_this, identifier, script, false);
        };
        heads[0].appendChild(script);
    };
    ScriptResourceLoader.prototype.completed = function (name, script, is_success) {
        if(!is_success) {
            console.log("error: " + name);
        } else {
            this.resource.scripts[name] = script;
        }
        this.resource.requestCompleted(name);
    };
    return ScriptResourceLoader;
})(ResourceLoader);
var SoundResourceLoader = (function (_super) {
    __extends(SoundResourceLoader, _super);
    function SoundResourceLoader() {
        _super.apply(this, arguments);

    }
    SoundResourceLoader.prototype.load = function (url, identifier) {
        var _this = this;
        var request = new XMLHttpRequest();
        request.open("GET", "sound/" + url, true);
        request.responseType = "arraybuffer";
        var callback = this.completed;
        request.onload = function () {
            var context = SimpleSound.getAudioContext();
            if(context) {
                context.decodeAudioData(request.response, function (decodedAudio) {
                    callback.call(_this, identifier, decodedAudio, true);
                }, function () {
                    callback.call(_this, identifier, null, false);
                });
            } else {
                callback.call(_this, identifier, null, false);
            }
        };
        request.onerror = function () {
            callback.call(_this, identifier, null, false);
        };
        request.send();
    };
    SoundResourceLoader.prototype.completed = function (name, audio, is_success) {
        if(!is_success) {
            console.log("error: " + name);
        } else {
            this.resource.sounds[name] = audio;
        }
        this.resource.requestCompleted(name);
    };
    return SoundResourceLoader;
})(ResourceLoader);
var Resource = (function () {
    function Resource() {
        this.requests = [];
        this.loaded = new Trigger();
        this.images = {
        };
        this.scripts = {
        };
        this.sounds = {
        };
        this.loaders = {
        };
        this.loaders["js"] = new ScriptResourceLoader(this);
        this.loaders["default"] = new ImageResourceLoader(this);
        this.loaders["mp3"] = new SoundResourceLoader(this);
        this.loaders["ogg"] = this.loaders["mp3"];
        this.loaders["wav"] = this.loaders["mp3"];
        this.loaders["mid"] = this.loaders["mp3"];
    }
    Resource.getInstance = function getInstance() {
        return (function () {
            if(!Resource.instance) {
                Resource.instance = new Resource();
            }
            return Resource.instance;
        })();
    };
    Resource.prototype.get = function (name) {
        return this.images[name];
    };
    Resource.prototype.sound = function (name) {
        return this.sounds[name];
    };
    Resource.prototype.requestCompleted = function (name) {
        for(var i = 0; i < this.requests.length; i++) {
            if(this.requests[i] == name) {
                this.requests.splice(i, 1);
                break;
            }
        }
        this.loaded.fire(this.requests.length);
    };
    Resource.prototype.load = function (name, url) {
        if(!url) {
            url = name;
        }
        this.requests.push(name);
        var dot = url.split(/\./g);
        var ext;
        if(dot.length == 0) {
            ext = "";
        } else {
            ext = dot[dot.length - 1];
        }
        ext = ext.toLowerCase();
        if(this.loaders[ext]) {
            this.loaders[ext].load(url, name);
        } else {
            this.loaders["default"].load(url, name);
        }
    };
    return Resource;
})();
var Scene = (function () {
    function Scene(game) {
        this.game = game;
        this.layers = {
        };
        this.root = new Layer(this);
        this.layers["root"] = this.root;
        this.layerCount = 1;
        this.mode = new Array();
        this.started = new Trigger();
        this.ended = new Trigger();
        this.showed = new Trigger();
        this.hid = new Trigger();
    }
    Scene.prototype.currentMode = function () {
        return this.mode.length == 0 ? null : this.mode[this.mode.length - 1];
    };
    Scene.prototype.getLayerArray = function () {
        var ret = new Array();
        for(var i in this.layers) {
            ret.push(this.layers[i]);
        }
        return ret;
    };
    Scene.prototype.enablePointingEvent = function () {
        this.root.enablePointingEvent();
        if(!this.pointDown) {
            this.pointDown = new Trigger();
        }
        if(!this.pointMove) {
            this.pointMove = new Trigger();
        }
        if(!this.pointUp) {
            this.pointUp = new Trigger();
        }
    };
    Scene.prototype.disablePointingEvent = function () {
        this.root.disablePointingEvent();
    };
    Scene.prototype.changeMode = function (mode) {
        var linkMode = this.currentMode();
        if(linkMode && this[linkMode + "Hide"]) {
            this[linkMode + "Hide"]();
        }
        this.mode.push(mode);
        if(mode) {
            if(this[mode + "Start"]) {
                this[mode + "Start"]();
            }
            if(this[mode + "Show"]) {
                this[mode + "Show"]();
            }
        }
    };
    Scene.prototype.endCurrentMode = function (newMode) {
        if(this.mode.length == 0) {
            this.end();
            return;
        }
        var mode = this.mode.pop();
        if(mode) {
            if(this[mode + "End"]) {
                this[mode + "End"]();
            }
        }
        var linkMode = this.currentMode();
        if(linkMode && this[linkMode + "Show"]) {
            this[linkMode + "Show"]();
        }
        if(newMode) {
            this.changeMode(newMode);
        }
    };
    Scene.prototype.createLayer = function (name, size) {
        for(var i in this.layers) {
            if(!this.layers[i].hasBuffer()) {
                this.layers[i].createBuffer();
            }
        }
        this.layers[name] = new Layer(this);
        if(size) {
            this.layers[name].width = size.width;
            this.layers[name].height = size.height;
        }
        this.layers[name].createBuffer();
        this.layerCount++;
        return this.layers[name];
    };
    Scene.prototype.deleteLayer = function (name) {
        if(name == "root") {
            throw "can not delete root layer";
        }
        this.layers[name].destroy();
        delete this.layers[name];
        this.layerCount--;
        if(this.layerCount == 1) {
            this.root.deleteBuffer();
        }
    };
    Scene.prototype.destroy = function () {
        for(var i in this.layers) {
            this.layers[i].destroy();
        }
        if(this.keyDown) {
            this.keyDown.destroy();
        }
        if(this.keyUp) {
            this.keyUp.destroy();
        }
        if(this.pointDown) {
            this.pointDown.destroy();
        }
        if(this.pointUp) {
            this.pointUp.destroy();
        }
        if(this.pointMove) {
            this.pointMove.destroy();
        }
    };
    Scene.prototype.end = function () {
        this.game.endScene();
    };
    Scene.prototype.refresh = function () {
        for(var i in this.layers) {
            this.layers[i].refresh();
            this.layers[i].updated();
        }
    };
    Scene.prototype.scrollTo = function (x, y, layerName) {
        if(!layerName) {
            layerName = "root";
        }
        this.layers[layerName].scrollTo(x, y);
    };
    Scene.prototype.scrollBy = function (x, y, layerName) {
        if(x == 0 && y == 0) {
            return;
        }
        if(!layerName) {
            layerName = "root";
        }
        this.layers[layerName].scrollBy(x, y);
    };
    Scene.prototype.append = function (entity, layerName) {
        if(!layerName) {
            this.root.append(entity);
        } else {
            this.layers[layerName].append(entity);
        }
    };
    Scene.prototype.removeEntity = function (entity) {
        for(var i in this.layers) {
            this.layers[i].removeChild(entity);
        }
    };
    return Scene;
})();
var Sprite = (function (_super) {
    __extends(Sprite, _super);
    function Sprite(width, height, image) {
        _super.call(this);
        this.x = 0;
        this.y = 0;
        this.width = width;
        this.height = height;
        this.image = image;
        this.sep = Math.floor(this.image.width / this.width);
        this.frame = [
            0
        ];
        this.fno = 0;
    }
    Sprite.prototype.draw = function (context) {
        context.drawImage(this.image, (this.frame[this.fno] % this.sep) * this.width, Math.floor(this.frame[this.fno] / this.sep) * this.height, this.width, this.height, 0, 0, this.width, this.height);
    };
    Sprite.prototype.refresh = function () {
        if(this.image instanceof HTMLCanvasElement) {
        }
    };
    return Sprite;
})(E);
var Character = (function (_super) {
    __extends(Character, _super);
    function Character(width, height, image, wait) {
        _super.call(this, width, height, image);
        this.moving = false;
        if(!wait) {
            wait = 200;
        }
        this.startTimer(wait);
        this.animeCnt = 2;
        this.charaSeq = 0;
        this.charaCol = 1;
        this.movePixel = 64;
        this.moveTime = 300;
        this.animation = true;
    }
    Character.prototype.moveLeft = function (stackNext) {
        if(this.move(-this.movePixel, 0, this.moveTime)) {
            this.angle(Angle.left);
            return true;
        }
        if(stackNext && this.moveInfo.t * 2 >= this.moveInfo.f) {
            this.nextMove = "Left";
        }
        return false;
    };
    Character.prototype.moveRight = function (stackNext) {
        if(this.move(this.movePixel, 0, this.moveTime)) {
            this.angle(Angle.right);
            return true;
        }
        if(stackNext && this.moveInfo.t * 2 >= this.moveInfo.f) {
            this.nextMove = "Right";
        }
        return false;
    };
    Character.prototype.moveUp = function (stackNext) {
        if(this.move(0, -this.movePixel, this.moveTime)) {
            this.angle(Angle.up);
            return true;
        }
        if(stackNext && this.moveInfo.t * 2 >= this.moveInfo.f) {
            this.nextMove = "Up";
        }
        return false;
    };
    Character.prototype.moveDown = function (stackNext) {
        if(this.move(0, 64, this.moveTime)) {
            this.angle(Angle.down);
            return true;
        }
        if(stackNext && this.moveInfo.t * 2 >= this.moveInfo.f) {
            this.nextMove = "Down";
        }
        return false;
    };
    Character.prototype.move = function (x, y, f) {
        if(this.moving) {
            return false;
        }
        this.moving = true;
        this.moveInfo = {
            x: this.x,
            y: this.y,
            dx: this.x + x,
            dy: this.y + y,
            f: f,
            t: 0
        };
        this.start();
        return true;
    };
    Character.prototype.update = function (t) {
        if(this.moving) {
            this.moveInfo.t += t;
            if(this.moveInfo.t < this.moveInfo.f) {
                this.moveTo(this.moveInfo.x + Math.round((this.moveInfo.dx - this.moveInfo.x) / this.moveInfo.f * this.moveInfo.t), this.moveInfo.y + Math.round((this.moveInfo.dy - this.moveInfo.y) / this.moveInfo.f * this.moveInfo.t));
            } else {
                this.moveTo(this.moveInfo.dx, this.moveInfo.dy);
                this.endMove();
            }
        }
    };
    Character.prototype.endMove = function () {
        this.moving = false;
        this.stop();
        var e = {
        };
        if(this.nextMove) {
            e.nextMove = this.nextMove;
            delete this.nextMove;
        }
        if(this.moved) {
            this.moved.fire(e);
        }
        if(e.nextMove) {
            this["move" + e.nextMove]();
        }
    };
    Character.prototype.angle = function (angle) {
        this.currentAngle = angle;
        var rowP = Math.floor(this.charaSeq / this.charaCol) * 4;
        switch(angle) {
            case Angle.up:
                rowP += (this.angleSeq ? this.angleSeq[Angle.up] : 3);
                break;
            case Angle.down:
                rowP += (this.angleSeq ? this.angleSeq[Angle.down] : 0);
                break;
            case Angle.left:
                rowP += (this.angleSeq ? this.angleSeq[Angle.left] : 1);
                break;
            case Angle.right:
                rowP += (this.angleSeq ? this.angleSeq[Angle.right] : 2);
                break;
        }
        var f = this.animeCnt * (this.charaSeq % this.charaCol) + this.charaCol * this.animeCnt * rowP;
        this.frame = [];
        if(this.animeCnt % 2 == 1) {
            for(var i = 0; i < this.animeCnt; i++) {
                this.frame.push(i + f);
            }
            for(var i = this.animeCnt - 2; i > 0; i--) {
                this.frame.push(i + f);
            }
        } else {
            for(var i = 0; i < this.animeCnt; i++) {
                this.frame.push(i + f);
            }
        }
    };
    Character.prototype.interval = function () {
        if(this.animation) {
            this.fno = (this.fno + 1) % this.frame.length;
            this.updated();
        }
    };
    return Character;
})(Sprite);
var CharacterFactory = (function () {
    function CharacterFactory(width, height, image) {
        this.width = width;
        this.height = height;
        this.image = image;
        this.wait = 200;
        this.charaCol = 1;
        this.animeCnt = 2;
        this.moveTime = 300;
        this.movePixel = 64;
        this.angle = Angle.down;
        this.createClass = Character;
    }
    CharacterFactory.prototype.create = function (charaSeq, offset, angle) {
        var c = new this.createClass(this.width, this.height, this.image, this.wait);
        var black = [
            "width", 
            "height", 
            "image", 
            "wait", 
            "angle"
        ];
        for(var i in this) {
            if(typeof this[i] == "function") {
                continue;
            }
            if(black.indexOf(i) >= 0) {
                continue;
            }
            c[i] = this[i];
        }
        c.charaSeq = charaSeq;
        c.angle(angle == undefined ? this.angle : angle);
        if(offset) {
            c.moveTo(offset.x, offset.y);
        }
        return c;
    };
    return CharacterFactory;
})();
var Label = (function (_super) {
    __extends(Label, _super);
    function Label(text, fontSize, fontColor, baseline) {
        _super.call(this);
        this.x = 0;
        this.y = 0;
        if(text) {
            this.setText(text);
        } else {
            this.setText("");
            this.width = 0;
            this.height = 0;
        }
        this.setTextBaseline(baseline ? baseline : "top");
        this.setFontSize(fontSize ? fontSize : 14);
        this.setColor(fontColor ? fontColor : "black");
    }
    Label.prototype.setMaxWidth = function (maxWidth) {
        this.maxWidth = maxWidth;
        this.updateSize();
    };
    Label.prototype.updateSize = function () {
        var canvas = window.createCanvas(10, 10);
        var ctx = canvas.getContext("2d");
        ctx.font = this.getFont();
        var metrix = ctx.measureText(this.text);
        this.width = metrix.width;
        this.height = this.getFontSize();
    };
    Label.prototype.addShadow = function (color) {
        this.setDrawOption("shadowBlur", 2);
        this.setDrawOption("shadowColor", color ? color : "black");
    };
    Label.prototype.removeShadow = function () {
        this.removeDrawOption("shadowBlur");
        this.removeDrawOption("shadowColor");
    };
    Label.prototype.setText = function (text) {
        this.text = text;
        this.updateSize();
        this.updated();
    };
    Label.prototype.setFont = function (fontString) {
        this.setDrawOption("font", fontString);
        this.updateSize();
    };
    Label.prototype.getFont = function () {
        return this.getDrawOption("font");
    };
    Label.prototype.setFontSize = function (size) {
        var font = this.getFont();
        var firstPos = font.indexOf(" ");
        this.setFont(size + "px " + font.substr(firstPos + 1));
    };
    Label.prototype.getFontSize = function () {
        var font = this.getFont();
        var firstPos = font.indexOf(" ");
        try  {
            return parseInt(font.substr(0, firstPos - 2));
        } catch (ex) {
        }
        return this.height;
    };
    Label.prototype.setTextAlign = function (align) {
        this.setDrawOption("textAlign", align);
    };
    Label.prototype.getTextAlign = function () {
        return this.getDrawOption("textAlign");
    };
    Label.prototype.setTextBaseline = function (baseline) {
        this.setDrawOption("textBaseline", baseline);
    };
    Label.prototype.getTextBaseline = function () {
        return this.getDrawOption("textBaseline");
    };
    Label.prototype.setColor = function (color) {
        this.setDrawOption("fillStyle", color);
    };
    Label.prototype.getColor = function () {
        return this.getDrawOption("fillStyle");
    };
    Label.prototype.synchronize = function (obj, prop, round) {
        this.syncObj = obj;
        this.syncProp = prop;
        this.syncRound = round;
    };
    Label.prototype.draw = function (context) {
        if(this.syncObj) {
            var val;
            if(typeof this.syncObj[this.syncProp] == "function") {
                val = this.syncObj[this.syncProp](this);
            } else {
                val = this.syncObj[this.syncProp];
            }
            this.text = this.syncRound ? Math.round(val) : val;
        }
        if(this.maxWidth) {
            context.fillText(this.text, 0, 0, this.maxWidth);
        } else {
            context.fillText(this.text, 0, 0);
        }
    };
    return Label;
})(E);
var TextLineInfo = (function () {
    function TextLineInfo(offsetY) {
        this.width = 0;
        this.height = 0;
        this.offsetY = offsetY;
    }
    return TextLineInfo;
})();
var MultilineScriptAnalyzer = (function () {
    function MultilineScriptAnalyzer() { }
    MultilineScriptAnalyzer.prototype.init = function (owner, context, pos) {
        this.mode = 0;
        this.owner = owner;
        this.context = context;
        this.pos = pos;
    };
    MultilineScriptAnalyzer.prototype.next = function (c) {
        if(this.mode) {
            if(c == " ") {
                this.mode = 0;
                if(this.buf == "page") {
                    return -1;
                }
            } else {
                this.buf += c;
            }
            return 1;
        }
        if(c == "#") {
            this.mode = 1;
            this.buf = "";
            return 1;
        }
        return 0;
    };
    return MultilineScriptAnalyzer;
})();
var MultilineText = (function (_super) {
    __extends(MultilineText, _super);
    function MultilineText(size, offset) {
        _super.call(this);
        this.scriptAnalyzer = new MultilineScriptAnalyzer();
        this.width = size.width;
        this.height = size.height;
        if(offset) {
            this.moveTo(offset.x, offset.y);
        } else {
            this.moveTo(0, 0);
        }
        this.defaultStyle = "#000";
        this.defaultFont = "18px sans-serif";
        this.defaultBlur = 0.6;
        this.defaultShadowColor = "#000";
        this.defaultShadowOffsetX = 0.3;
        this.defaultShadowOffsetY = 0.3;
        this.clip = new Line({
            x: 0,
            y: 0
        });
        this.clip.addLine(this.width, 0);
        this.clip.addLine(this.width, this.height);
        this.clip.addLine(0, this.height);
        this.clip.addLine(0, this.height);
        this.clip.addLine(0, this.height);
        this.clip.closePath = true;
        this.clip.setClip(true);
        this.entities = new Array();
        this.entities.push(this.clip);
        this.animeSpeed = 400;
        this.animated = new Trigger();
    }
    MultilineText.LINE_HEIGHT_NORMAL = 1.2;
    MultilineText.BROWSER_BASELINE_MARGIN = 0;
    MultilineText.prototype.setText = function (text, offset) {
        var plainScript = text;
        return this.setScript(plainScript, offset);
    };
    MultilineText.prototype.setScript = function (script, offset) {
        this.script = script.replace(/\r\n?/g, "\n");
        this.updated();
        return this.createBuffer(offset);
    };
    MultilineText.prototype.getLineHeight = function (c) {
        var font = c.font;
        var firstPos = font.indexOf("px");
        var lastPos = font.lastIndexOf(" ", firstPos);
        if(lastPos < 0) {
            lastPos = 0;
        }
        if(firstPos < 0) {
            return 16;
        }
        var fontSize = parseInt(font.substring(lastPos, firstPos));
        var line_height = Math.round(fontSize * MultilineText.LINE_HEIGHT_NORMAL);
        return line_height;
    };
    MultilineText.prototype.createBuffer = function (offset) {
        var _this = this;
        if(!this.buffer) {
            this.buffer = window.createCanvas(this.width, this.height);
        }
        if(offset === undefined) {
            offset = 0;
        }
        var script = this.script;
        var len = script.length;
        var pos = {
            x: 0,
            y: 0
        };
        var c = this.buffer.getContext("2d");
        var s;
        var m = MultilineText.BROWSER_BASELINE_MARGIN;
        this.lines = new Array();
        if(this.bufferBg) {
            c.putImageData(this.bufferBg, 0, 0);
        } else {
            c.clearRect(0, 0, this.width, this.height);
        }
        c.fillStyle = this.defaultStyle;
        c.font = this.defaultFont;
        c.textBaseline = "top";
        if(!this.disableShadow) {
            c.shadowBlur = this.defaultBlur;
            c.shadowColor = this.defaultShadowColor;
            c.shadowOffsetX = this.defaultShadowOffsetX;
            c.shadowOffsetY = this.defaultShadowOffsetY;
        }
        var lineHeight = this.getLineHeight(c);
        var lineInfo = new TextLineInfo(0);
        lineInfo.height = lineHeight;
        this.lines.push(lineInfo);
        var _newLine = function () {
            pos.x = 0;
            pos.y += lineInfo.height;
            if((pos.y + lineInfo.height) > _this.height) {
                return false;
            }
            lineInfo = new TextLineInfo(pos.y);
            lineInfo.height = lineHeight;
            _this.lines.push(lineInfo);
            return true;
        };
        this.scriptAnalyzer.init(this, c, pos);
        while(offset < len) {
            s = script.substr(offset, 1);
            var script_ret = this.scriptAnalyzer.next(s);
            if(script_ret) {
                lineHeight = lineInfo.height;
                if(script_ret < 0) {
                    offset -= script_ret;
                    break;
                }
                offset += script_ret;
                continue;
            }
            if(s == "\n") {
                offset++;
                if(!_newLine()) {
                    break;
                }
                continue;
            }
            var metric = c.measureText(s);
            if((pos.x + metric.width) > this.width) {
                if(!_newLine()) {
                    break;
                }
            }
            c.fillText(s, pos.x, pos.y + m);
            pos.x += metric.width;
            lineInfo.width += metric.width;
            offset++;
        }
        this.sprite = new Sprite(this.width, this.height, this.buffer);
        this.sprite.moveTo(0, 0);
        if(this.entities.length == 1) {
            this.entities.push(this.sprite);
        } else {
            this.entities[1] = this.sprite;
        }
        return offset == len ? -1 : offset;
    };
    MultilineText.prototype.refresh = function () {
        delete this.buffer;
        this.createBuffer();
    };
    MultilineText.prototype.startAnimation = function (animeSpeed) {
        this.start();
        this.animeLine = 0;
        this.animePos = {
            x: 0,
            y: this.lines[this.animeLine].height
        };
        if(animeSpeed !== undefined) {
            this.animeSpeed = animeSpeed;
        }
        this.hideAll();
        this.clip.p[4].y = this.animePos.y;
        this.clip.p[5].y = this.animePos.y;
    };
    MultilineText.prototype.update = function (t) {
        this.animePos.x += this.animeSpeed / 1000 * t;
        if(this.animePos.x >= this.lines[this.animeLine].width) {
            this.animePos.x = 0;
            this.animePos.y += this.lines[this.animeLine].height;
            this.animeLine++;
            if(this.animeLine < this.lines.length) {
                this.clip.p[2].y = this.lines[this.animeLine].offsetY;
                this.clip.p[3].y = this.clip.p[2].y;
                this.clip.p[4].y = this.animePos.y;
                this.clip.p[5].y = this.animePos.y;
            }
        }
        if(this.animeLine >= this.lines.length) {
            this.showAll();
        } else {
            this.clip.p[3].x = this.animePos.x;
            this.clip.p[4].x = this.clip.p[3].x;
        }
        this.updated();
    };
    MultilineText.prototype.hideAll = function () {
        this.clip.p[0] = {
            x: 0,
            y: 0
        };
        this.clip.p[1] = {
            x: this.width,
            y: 0
        };
        this.clip.p[2] = {
            x: this.width,
            y: 0
        };
        this.clip.p[3] = {
            x: 0,
            y: 0
        };
        this.clip.p[4] = {
            x: 0,
            y: 0
        };
        this.clip.p[5] = {
            x: 0,
            y: 0
        };
    };
    MultilineText.prototype.showAll = function () {
        this.clip.p[0] = {
            x: 0,
            y: 0
        };
        this.clip.p[1] = {
            x: this.width,
            y: 0
        };
        this.clip.p[2] = {
            x: this.width,
            y: this.height
        };
        this.clip.p[3] = {
            x: 0,
            y: this.height
        };
        this.clip.p[4] = {
            x: 0,
            y: this.height
        };
        this.clip.p[5] = {
            x: 0,
            y: this.height
        };
        this.stop();
        this.animated.fire();
    };
    return MultilineText;
})(E);
var Tile = (function (_super) {
    __extends(Tile, _super);
    function Tile(tileWidth, tileHeight, image) {
        _super.call(this);
        this.tileWidth = tileWidth;
        this.tileHeight = tileHeight;
        this.image = image;
        this.x = 0;
        this.y = 0;
        this.sep = Math.floor(this.image.width / this.tileWidth);
        this.disableTransform = true;
    }
    Tile.prototype.generate = function (data, width, height) {
        this.data = data;
        if(!width) {
            width = this.data.length;
        }
        if(!height) {
            height = this.data[0].length;
        }
        this.chipCount = {
            width: width,
            height: height
        };
        this.width = this.tileWidth * width;
        this.height = this.tileHeight * height;
        this.refresh();
    };
    Tile.prototype.refresh = function () {
        this.canvas = window.createCanvas(this.width, this.height);
        var c = this.canvas.getContext("2d");
        for(var x = 0; x < this.chipCount.width; x++) {
            for(var y = 0; y < this.chipCount.height; y++) {
                c.drawImage(this.image, (this.data[x][y] % this.sep) * this.tileWidth, Math.floor(this.data[x][y] / this.sep) * this.tileHeight, this.tileWidth, this.tileHeight, x * this.tileWidth, y * this.tileHeight, this.tileWidth, this.tileHeight);
            }
        }
    };
    Tile.prototype.draw = function (context) {
        var parent = this.parent ? this.parent : this;
        var scroll = parent.scroll ? parent.scroll : {
            x: 0,
            y: 0
        };
        var src = {
            x: -scroll.x,
            y: -scroll.y,
            width: parent.width,
            height: parent.height
        };
        var dist = {
            x: -scroll.x,
            y: -scroll.y,
            width: parent.width,
            height: parent.height
        };
        if(src.x < 0) {
            src.width += src.x;
            if(src.width <= 0) {
                return;
            }
            dist.x -= src.x;
            dist.width += src.x;
            src.x = 0;
        } else if((src.x + src.width) > this.width) {
            var p = ((src.x + src.width) - this.width);
            src.width -= p;
            if(src.width <= 0) {
                return;
            }
            dist.width -= p;
        }
        if(src.y < 0) {
            src.height += src.y;
            if(src.height <= 0) {
                return;
            }
            dist.y -= src.y;
            dist.height += src.y;
            src.y = 0;
        } else if((src.y + src.height) > this.height) {
            var p = ((src.y + src.height) - this.height);
            src.height -= p;
            if(src.height <= 0) {
                return;
            }
            dist.height -= p;
        }
        context.drawImage(this.canvas, src.x, src.y, src.width, src.height, dist.x, dist.y, dist.width, dist.height);
    };
    return Tile;
})(E);
var Layer = (function (_super) {
    __extends(Layer, _super);
    function Layer(scene) {
        _super.call(this);
        this.entities = [];
        this.x = 0;
        this.y = 0;
        this.scene = scene;
        this.width = this.scene.game.width;
        this.height = this.scene.game.height;
        this.isUpdated = true;
    }
    Layer.prototype.hasBuffer = function () {
        if(this.canvas) {
            return true;
        }
        return false;
    };
    Layer.prototype.createBuffer = function () {
        this.refresh(true);
    };
    Layer.prototype.refresh = function (must) {
        if(must || this.hasBuffer()) {
            this.canvas = window.createCanvas(this.width, this.height);
            this.context = this.canvas.getContext("2d");
            this.updated();
        }
        if(this.entities) {
            for(var i = 0; i < this.entities.length; i++) {
                if(this.entities[i]["refresh"]) {
                    this.entities[i]["refresh"]();
                }
            }
        }
    };
    Layer.prototype.deleteBuffer = function () {
        delete this.context;
        delete this.canvas;
    };
    Layer.prototype.destroy = function () {
        _super.prototype.destroy.call(this);
        if(this.hasBuffer()) {
            this.deleteBuffer();
        }
    };
    return Layer;
})(E);
var LoadingScene = (function (_super) {
    __extends(LoadingScene, _super);
    function LoadingScene(game, resource, noShape) {
        _super.call(this, game);
        this.resource = resource;
        this.resource.loaded.handle(this, this.complete);
        this.requestCount = this.resource.requests.length;
        this.jgameRequestCount = this.requestCount;
        this.finished = new Trigger();
        this.otherResources = {
        };
        this.otherResourceCount = 0;
        this.otherResourceCompleted = 0;
        this.lastCnt = 0;
        if(!noShape) {
            this.shape = new Shape(game.width, 32);
            this.shape.moveTo(0, game.height / 2 - 16);
            this.shapeP = new Shape(1, 32, ShapeStyle.fill);
            this.shapeP.moveTo(0, game.height / 2 - 16);
            this.append(this.shape);
            this.append(this.shapeP);
        }
    }
    LoadingScene.prototype.addOtherResource = function (identify) {
        this.requestCount++;
        this.otherResourceCount++;
    };
    LoadingScene.prototype.otherResourceComplete = function (identify) {
        this.otherResources[identify]--;
        this.otherResourceCompleted++;
        this.complete(this.lastCnt);
    };
    LoadingScene.prototype.complete = function (cnt) {
        this.lastCnt = cnt;
        var per = (this.jgameRequestCount - cnt + this.otherResourceCompleted) / this.requestCount;
        this.shapeP.width = this.game.width * per;
        this.shapeP.updated();
        if(per == 1) {
            this.resource.loaded.remove(this, this.complete);
            this.end();
            this.finished.fire();
        }
    };
    return LoadingScene;
})(Scene);
var InputEventType;
(function (InputEventType) {
    InputEventType._map = [];
    InputEventType._map[0] = "Keyboard";
    InputEventType.Keyboard = 0;
    InputEventType._map[1] = "Point";
    InputEventType.Point = 1;
})(InputEventType || (InputEventType = {}));
var Keytype;
(function (Keytype) {
    Keytype._map = [];
    Keytype._map[0] = "left";
    Keytype.left = 0;
    Keytype._map[1] = "right";
    Keytype.right = 1;
    Keytype._map[2] = "up";
    Keytype.up = 2;
    Keytype._map[3] = "down";
    Keytype.down = 3;
    Keytype._map[4] = "enter";
    Keytype.enter = 4;
    Keytype._map[5] = "esc";
    Keytype.esc = 5;
})(Keytype || (Keytype = {}));
var InputEvent = (function () {
    function InputEvent(type, param) {
        this.type = type;
        this.param = param;
    }
    return InputEvent;
})();
var InputKeyboardEvent = (function (_super) {
    __extends(InputKeyboardEvent, _super);
    function InputKeyboardEvent(key, e) {
        _super.call(this, InputEventType.Keyboard, e);
        this.key = key;
    }
    return InputKeyboardEvent;
})(InputEvent);
var InputPointEvent = (function (_super) {
    __extends(InputPointEvent, _super);
    function InputPointEvent(e, entity, scale) {
        _super.call(this, InputEventType.Point, e);
        var entityOffset = entity.offset();
        this.entity = entity;
        this.point = {
            x: scale ? e.offsetX / scale : e.offsetX,
            y: scale ? e.offsetY / scale : e.offsetY
        };
        this.x = this.point.x - entityOffset.x;
        this.y = this.point.y - entityOffset.y;
    }
    return InputPointEvent;
})(InputEvent);
var Renderer = (function () {
    function Renderer() {
        var _this = this;
        this.radian = Math.PI / 180;
        this.drawOptionFunctions = {
            transform: function (c, entity, params) {
                c.transform(params.m11, params.m12, params.m21, params.m22, params.dx, params.dy);
            },
            translate: function (c, entity, params) {
                c.translate(params.x, params.y);
            },
            scale: function (c, entity, params) {
                c.transform.apply(c, _this.getMatrix(entity.width, entity.height, params.x, params.y, 0));
            },
            rotate: function (c, entity, params) {
                c.transform.apply(c, _this.getMatrix(entity.width, entity.height, 1, 1, params));
            }
        };
    }
    Renderer.prototype.getMatrix = function (width, height, scaleX, scaleY, angle) {
        var r = angle * this.radian;
        var _cos = Math.cos(r);
        var _sin = Math.sin(r);
        var a = _cos * scaleX;
        var b = _sin * scaleX;
        var c = _sin * scaleY;
        var d = _cos * scaleY;
        var w = width / 2;
        var h = height / 2;
        return [
            a, 
            b, 
            -c, 
            d, 
            (-a * w + c * h + w), 
            (-b * w - d * h + h)
        ];
    };
    Renderer.prototype.renderParent = function (parent, c) {
        if(parent.orderDraw) {
            parent.orderDraw();
        }
        c.save();
        if(parent.options) {
            if(this.useDrawOption(parent, c)) {
                c.restore();
                return;
            }
        }
        if(parent.scroll) {
            c.translate(parent.scroll.x, parent.scroll.y);
        }
        for(var i = 0; i < parent.entities.length; i++) {
            this.renderEntity(parent.entities[i], c);
        }
        c.restore();
    };
    Renderer.prototype.renderEntity = function (entity, c) {
        if(entity.disableTransform) {
            entity.draw(c);
        } else {
            c.save();
            c.translate(entity.x, entity.y);
            if(entity.options) {
                if(this.useDrawOption(entity, c)) {
                    c.restore();
                    return;
                }
            }
            if(entity.filter) {
                this.filterDraw(entity, c);
            } else {
                entity.draw(c);
                if(entity.entities) {
                    if(entity.scroll) {
                        c.translate(entity.scroll.x, entity.scroll.y);
                    }
                    for(var i = 0; i < entity.entities.length; i++) {
                        this.renderEntity(entity.entities[i], c);
                    }
                }
            }
            c.restore();
        }
    };
    Renderer.prototype.renderPure = function (entity, c) {
        entity.draw(c);
        if(entity.entities) {
            for(var i = 0; i < entity.entities.length; i++) {
                this.renderEntity(entity.entities[i], c);
            }
        }
    };
    Renderer.prototype.filterDraw = function (entity, c) {
        var buffer = new BufferedRenderer(entity);
        buffer.filter = entity.filter;
        buffer.renderPure(entity, buffer.c);
        buffer.applyFilter(buffer.c, entity);
        buffer.draw(c);
    };
    Renderer.prototype.useDrawOption = function (entity, c) {
        for(var p in entity.options) {
            if(this.drawOptionFunctions[p]) {
                this.drawOptionFunctions[p].call(this, c, entity, entity.options[p]);
            } else {
                if(entity.options[p] === 0 && p == "globalAlpha") {
                    return true;
                }
                c[p] = entity.options[p];
            }
        }
    };
    return Renderer;
})();
var RenderTransferMode;
(function (RenderTransferMode) {
    RenderTransferMode._map = [];
    RenderTransferMode._map[0] = "Transfer";
    RenderTransferMode.Transfer = 0;
    RenderTransferMode._map[1] = "Flip";
    RenderTransferMode.Flip = 1;
    RenderTransferMode._map[2] = "Direct";
    RenderTransferMode.Direct = 2;
})(RenderTransferMode || (RenderTransferMode = {}));
var GameRenderer = (function (_super) {
    __extends(GameRenderer, _super);
    function GameRenderer(game, container, transferMode, disableBg) {
        _super.call(this);
        this.game = game;
        this.container = container ? container : document.getElementById("jgame");
        if(!this.container) {
            var div = document.createElement("div");
            div.id = "jgame";
            var bodies = document.getElementsByTagName("body");
            if(bodies.length == 0) {
                throw "can not initialize game engine";
            }
            bodies[0].appendChild(div);
            this.container = div;
        }
        this.handler = document.createElement("div");
        this.container.appendChild(this.handler);
        this.changeTransferMode(transferMode ? transferMode : RenderTransferMode.Transfer);
        if(!disableBg) {
            this.bg = this.fc.getImageData(0, 0, this.game.width, this.game.height);
            for(var i = 0; i < this.bg.data.length; i++) {
                this.bg.data[i] = 255;
            }
        }
    }
    GameRenderer.prototype.changeFrontCanvasSize = function (size, offset) {
        this.frontCanvasSize = size;
        this.frontCanvasOffset = offset;
        this.refresh();
    };
    GameRenderer.prototype.changeTransferMode = function (mode) {
        this.transferMode = mode;
        if(this.transferMode == RenderTransferMode.Flip) {
            this.handler.style.position = "relative";
            this.handler.style.width = this.game.width + "px";
            this.handler.style.height = this.game.height + "px";
        }
        this.refresh();
    };
    GameRenderer.prototype.changeScene = function (scene) {
        this.scene = scene;
    };
    GameRenderer.prototype.flip = function () {
        var c = this.fc;
        this.fc = this.bc;
        this.bc = this.fc;
        this.flipNo = this.flipNo ? 0 : 1;
        this.buffer[this.flipNo].style.zIndex = "1";
        this.buffer[this.flipNo ? 0 : 1].style.zIndex = "0";
    };
    GameRenderer.prototype.render = function () {
        var hasUpdate = false;
        if(this.scene.layerCount == 1) {
            var layer = this.scene.root;
            if(!layer.isUpdate()) {
            } else {
                hasUpdate = true;
                if(!this.disableClear) {
                    this.bc.putImageData(this.bg, 0, 0);
                }
                this.renderParent(layer, this.bc);
                layer.reflected();
            }
        } else {
            for(var i in this.scene.layers) {
                if(this.scene.layers[i].isUpdate()) {
                    hasUpdate = true;
                    break;
                }
            }
            if(hasUpdate) {
                if(!this.disableClear) {
                    this.bc.putImageData(this.bg, 0, 0);
                }
                for(var i in this.scene.layers) {
                    var layer = this.scene.layers[i];
                    if(layer.isUpdate()) {
                        layer.context.clearRect(0, 0, layer.width, layer.height);
                        this.renderParent(layer, layer.context);
                    }
                    this.bc.drawImage(layer.canvas, layer.x, layer.y);
                    layer.reflected();
                }
            }
        }
        if(hasUpdate) {
            if(this.filter) {
                var imageData = this.bc.getImageData(0, 0, this.game.width, this.game.height);
                this.filter.filter(imageData);
                this.fc.putImageData(imageData, 0, 0);
            } else {
                if(this.bc != this.fc) {
                    this.fc.drawImage(this.buffer[1], 0, 0);
                } else if(this.transferMode == RenderTransferMode.Flip) {
                    this.flip();
                }
            }
        }
    };
    GameRenderer.prototype.refresh = function () {
        delete this.buffer;
        this.buffer = new Array();
        if(this.transferMode == RenderTransferMode.Flip) {
            this.handler.innerHTML = "";
            for(var i = 0; i < 2; i++) {
                this.buffer[i] = window.createCanvas(this.game.width, this.game.height);
                ;
                this.buffer[i].style.position = "absolute";
                this.buffer[i].style.zIndex = i.toString();
                this.handler.appendChild(this.buffer[i]);
            }
            this.fc = this.buffer[1].getContext("2d");
            this.bc = this.buffer[0].getContext("2d");
            this.flipNo = 1;
            if(this.frontCanvasSize) {
                this.buffer[1].style.width = this.frontCanvasSize.width + "px";
                this.buffer[1].style.height = this.frontCanvasSize.height + "px";
            }
        } else if(this.transferMode == RenderTransferMode.Transfer) {
            this.handler.innerHTML = "";
            for(var i = 0; i < 2; i++) {
                this.buffer[i] = window.createCanvas(this.game.width, this.game.height);
                ;
            }
            this.handler.appendChild(this.buffer[0]);
            this.fc = this.buffer[0].getContext("2d");
            this.bc = this.buffer[1].getContext("2d");
        } else {
            this.handler.innerHTML = "";
            this.buffer[0] = window.createCanvas(this.game.width, this.game.height);
            ;
            this.handler.appendChild(this.buffer[0]);
            this.fc = this.buffer[0].getContext("2d");
            this.bc = this.fc;
        }
        if(this.frontCanvasSize) {
            this.buffer[0].style.width = this.frontCanvasSize.width + "px";
            this.buffer[0].style.height = this.frontCanvasSize.height + "px";
            if(this.frontCanvasOffset) {
                this.handler.style.position = "relative";
                this.handler.style.left = this.frontCanvasOffset.x + "px";
                this.handler.style.top = this.frontCanvasOffset.y + "px";
            }
        }
    };
    return GameRenderer;
})(Renderer);
var BufferedRenderer = (function (_super) {
    __extends(BufferedRenderer, _super);
    function BufferedRenderer(size) {
        _super.call(this);
        this.size = size;
        this.refresh();
    }
    BufferedRenderer.prototype.clear = function () {
        this.c.clearRect(0, 0, this.size.width, this.size.height);
    };
    BufferedRenderer.prototype.createImage = function (area, distArea) {
        if(!area) {
            area = {
                x: 0,
                y: 0,
                width: this.size.width,
                height: this.size.height
            };
        }
        if(!distArea) {
            distArea = {
                x: 0,
                y: 0,
                width: area.width,
                height: area.height
            };
        }
        var canvas = window.createCanvas(area.width, area.height);
        var context = canvas.getContext("2d");
        context.drawImage(this.buffer, area.x, area.y, area.width, area.height, distArea.x, distArea.y, distArea.width, distArea.height);
        if(this.filter) {
            this.applyFilter(context, area);
        }
        return canvas;
    };
    BufferedRenderer.prototype.createSprite = function (area, distArea) {
        if(!area) {
            area = {
                x: 0,
                y: 0,
                width: this.size.width,
                height: this.size.height
            };
        }
        if(!distArea) {
            distArea = {
                x: 0,
                y: 0,
                width: area.width,
                height: area.height
            };
        }
        return new Sprite(area.width, area.height, this.createImage(area, distArea));
    };
    BufferedRenderer.prototype.applyFilter = function (c, size) {
        var imageData = c.getImageData(0, 0, size.width, size.height);
        this.filter.filter(imageData);
        c.putImageData(imageData, 0, 0);
    };
    BufferedRenderer.prototype.renderUnit = function (entity) {
        var area = {
            x: 0,
            y: 0,
            width: entity.width,
            height: entity.height
        };
        this.renderEntity(entity, this.c);
    };
    BufferedRenderer.prototype.renderLayer = function (layer) {
        this.renderParent(layer, this.c);
    };
    BufferedRenderer.prototype.renderScene = function (scene) {
        this.clear();
        for(var i in scene.layers) {
            this.renderLayer(scene.layers[i]);
        }
    };
    BufferedRenderer.prototype.refresh = function () {
        delete this.buffer;
        this.buffer = window.createCanvas(this.size.width, this.size.height);
        this.c = this.buffer.getContext("2d");
    };
    BufferedRenderer.prototype.draw = function (context) {
        context.drawImage(this.buffer, 0, 0, this.size.width, this.size.height, 0, 0, this.size.width, this.size.height);
    };
    return BufferedRenderer;
})(Renderer);
var GameTimer = (function () {
    function GameTimer(wait) {
        this.wait = wait;
        this.tick = performance.now() + this.wait;
        this.trigger = new Trigger();
    }
    GameTimer.prototype.tryFire = function (t) {
        if(t >= this.tick) {
            this.fire(t);
        }
    };
    GameTimer.prototype.fire = function (t) {
        this.tick = t + this.wait;
        this.trigger.fastFire(t);
    };
    return GameTimer;
})();
var Game = (function () {
    function Game(width, height) {
        this._exit = false;
        this.width = width;
        this.height = height;
        this.targetFps = 0;
        this.loaded = new Trigger();
        this.update = new Trigger();
        this.pointDown = new Trigger();
        this.pointUp = new Trigger();
        this.pointMove = new Trigger();
        this.keyDown = new Trigger();
        this.keyUp = new Trigger();
        this.timers = new Array();
        this.scene = new Scene(this);
        this.scenes = new Array();
        this.scenes.push(this.scene);
        this.resource = Resource.getInstance();
        var container, transferMode;
        for(var i = 2; i < arguments.length; i++) {
            if(arguments[i] instanceof HTMLElement) {
                container = arguments[i];
            } else if(typeof arguments[i] == "string") {
                this.renderer = new window[arguments[i]](this, container, transferMode);
                this.renderer.changeScene(this.scene);
            } else {
                transferMode = arguments[i];
            }
        }
        if(!this.renderer) {
            this.renderer = new GameRenderer(this, container, transferMode);
            this.renderer.changeScene(this.scene);
        }
        this.keyboardHandler();
        this.pointHandler();
        if(document.getElementById("fps_show")) {
            this.fps = document.getElementById("fps_show");
        }
        this.main();
    }
    Game.prototype.getWindowSize = function () {
        return {
            width: document.documentElement.clientWidth,
            height: document.documentElement.clientHeight
        };
    };
    Game.prototype.fitToWindow = function (no_center) {
        var elem = this.renderer.container.parentElement;
        elem.style.margin = "0";
        elem.style.padding = "0";
        elem.style.overflow = "hidden";
        this.renderer.container.style.margin = "0";
        this.renderer.container.style.padding = "0";
        var size = this.getWindowSize();
        this.renderer.container.style.width = size.width + "px";
        this.renderer.container.style.height = size.height + "px";
        this.scale = Math.min(size.width / this.width, size.height / this.height);
        var size2 = {
            width: Math.floor(this.width * this.scale),
            height: Math.floor(this.height * this.scale)
        };
        this.renderer.changeFrontCanvasSize(size2, no_center ? undefined : {
            x: Math.floor((size.width - size2.width) / 2),
            y: Math.floor((size.height - size2.height) / 2)
        });
    };
    Game.prototype.setBgColor = function (r, g, b, a) {
        for(var i = 0; i < this.renderer.bg.data.length; i += 4) {
            this.renderer.bg.data[i] = r;
            this.renderer.bg.data[i + 1] = g;
            this.renderer.bg.data[i + 2] = b;
            this.renderer.bg.data[i + 3] = a;
        }
    };
    Game.prototype.refresh = function () {
        if(document.addEventListener) {
            if(this.isTouchEnable()) {
                this.renderer.handler.removeEventListener("mousedown", this.onmousedown, false);
                this.renderer.handler.removeEventListener("mousemove", this.onmousemove, false);
                this.renderer.handler.removeEventListener("mouseup", this.onmouseup, false);
            } else {
                this.renderer.handler.removeEventListener("mousedown", this.onmousedown, false);
                this.renderer.handler.removeEventListener("mousemove", this.onmousemove, false);
                this.renderer.handler.removeEventListener("mouseup", this.onmouseup, false);
            }
        } else {
            if(this.isTouchEnable()) {
                this.renderer.handler.detachEvent("onmousedown", this.onmousedown);
                this.renderer.handler.detachEvent("onmousemove", this.onmousemove);
                this.renderer.handler.detachEvent("onmouseup", this.onmouseup);
            } else {
                this.renderer.handler.detachEvent("onmousedown", this.onmousedown);
                this.renderer.handler.detachEvent("onmousemove", this.onmousemove);
                this.renderer.handler.detachEvent("onmouseup", this.onmouseup);
            }
        }
        this.renderer.refresh();
        for(var i = 0; i < this.scenes.length; i++) {
            this.scenes[i].refresh();
        }
        this.pointHandler();
    };
    Game.prototype.isTouchEnable = function () {
        var div = document.createElement('div');
        div.setAttribute('ontouchstart', 'return');
        return typeof div.ontouchstart === 'function';
    };
    Game.prototype.pointHandler = function () {
        var _this = this;
        var dragParam = null;
        this.onmousedown = function (e) {
            var layers = _this.scene.getLayerArray();
            var layer;
            var offset = {
                x: _this.scale ? e.offsetX / _this.scale : e.offsetX,
                y: _this.scale ? e.offsetY / _this.scale : e.offsetY
            };
            while(layer = layers.pop()) {
                if(!layer.pointCapture) {
                    continue;
                }
                var dragObj = layer.getEntityByPoint(offset);
                if(!dragObj) {
                    dragObj = layer;
                }
                dragParam = new InputPointEvent(e, dragObj, _this.scale);
                _this.pointDown.fire(dragParam);
                if(_this.scene.pointDown) {
                    _this.scene.pointDown.fire(dragParam);
                }
                if(dragObj.pointDown) {
                    dragObj.pointDown.fire(dragParam);
                }
                break;
            }
            e.preventDefault();
        };
        this.onmousemove = function (e) {
            if(!dragParam) {
                return;
            }
            var param = new InputPointEvent(e, dragParam.entity, _this.scale);
            if(dragParam.entity.pointMove) {
                dragParam.entity.pointMove.fire(param);
            }
            if(_this.scene.pointMove) {
                _this.scene.pointMove.fire(param);
            }
            _this.pointMove.fire(param);
            e.preventDefault();
        };
        this.onmouseup = function (e) {
            if(!dragParam) {
                return;
            }
            var param = new InputPointEvent(e, dragParam.entity, _this.scale);
            if(dragParam.entity.pointUp) {
                dragParam.entity.pointUp.fire(param);
            }
            if(_this.scene.pointUp) {
                _this.scene.pointUp.fire(param);
            }
            _this.pointUp.fire(param);
            dragParam = null;
            e.preventDefault();
        };
        if(document.addEventListener) {
            if(this.isTouchEnable()) {
                this.renderer.handler.addEventListener("mousedown", this.onmousedown, false);
                this.renderer.handler.addEventListener("mousemove", this.onmousemove, false);
                this.renderer.handler.addEventListener("mouseup", this.onmouseup, false);
            } else {
                this.renderer.handler.addEventListener("mousedown", this.onmousedown, false);
                this.renderer.handler.addEventListener("mousemove", this.onmousemove, false);
                this.renderer.handler.addEventListener("mouseup", this.onmouseup, false);
            }
        } else {
            if(this.isTouchEnable()) {
                this.renderer.handler.attachEvent("onmousedown", onmousedown);
                this.renderer.handler.attachEvent("onmousemove", onmousemove);
                this.renderer.handler.attachEvent("onmouseup", onmouseup);
            } else {
                this.renderer.handler.attachEvent("onmousedown", onmousedown);
                this.renderer.handler.attachEvent("onmousemove", onmousemove);
                this.renderer.handler.attachEvent("onmouseup", onmouseup);
            }
        }
    };
    Game.prototype.keyboardHandler = function () {
        var _this = this;
        this.keymap = {
            13: Keytype.enter,
            27: Keytype.esc,
            37: Keytype.left,
            38: Keytype.up,
            39: Keytype.right,
            40: Keytype.down
        };
        var onkeydown = function (e) {
            var keyParam = new InputKeyboardEvent(_this.keymap[e.keyCode], e);
            _this.keyDown.fire(keyParam);
            if(_this.scene.keyDown) {
                _this.scene.keyDown.fire(keyParam);
            }
            if(_this.keymap[e.keyCode] != undefined) {
                e.preventDefault();
            }
        };
        var onkeyup = function (e) {
            var keyParam = new InputKeyboardEvent(_this.keymap[e.keyCode], e);
            _this.keyUp.fire(keyParam);
            if(_this.scene.keyUp) {
                _this.scene.keyUp.fire(keyParam);
            }
            if(_this.keymap[e.keyCode] != undefined) {
                e.preventDefault();
            }
        };
        if(document.addEventListener) {
            document.addEventListener("keydown", onkeydown, false);
            document.addEventListener("keyup", onkeyup, false);
        } else {
            document.attachEvent("onkeydown", onkeydown);
            document.attachEvent("onkeyup", onkeyup);
        }
    };
    Game.prototype.addTimer = function (wait, owner, handler) {
        var timer = null;
        for(var i = 0; i < this.timers.length; i++) {
            if(this.timers[i].wait == wait) {
                timer = this.timers[i];
                break;
            }
        }
        if(timer == null) {
            timer = new GameTimer(wait);
            this.timers.push(timer);
        }
        timer.trigger.handle(owner, handler);
    };
    Game.prototype.removeTimer = function (wait, owner, handler) {
        var timer = null;
        for(var i = 0; i < this.timers.length; i++) {
            if(this.timers[i].wait == wait) {
                timer = this.timers[i];
                break;
            }
        }
        if(timer == null) {
            throw "error removeTimer: dont have " + wait + " timer";
        }
        timer.trigger.remove(owner, handler);
    };
    Game.prototype.removeTimerAll = function (owner) {
        for(var i = 0; i < this.timers.length; i++) {
            this.timers[i].trigger.removeAll(owner);
        }
    };
    Game.prototype.exit = function () {
        this._exit = true;
    };
    Game.prototype.changeScene = function (scene, effect, endOldScene) {
        var _this = this;
        if(effect) {
            var currentScene = this.scene;
            Effect.sceneEffect(this, currentScene, scene, effect, function () {
                _this.endScene();
                _this.changeScene(scene);
            }, endOldScene);
            return;
        }
        this.scenes.push(scene);
        scene.game = this;
        this.scene.hid.fire();
        this.scene = scene;
        this.renderer.changeScene(this.scene);
        this.scene.started.fire();
    };
    Game.prototype.endScene = function (effect) {
        var _this = this;
        if(this.scenes.length == 1) {
            this.exit();
            return;
        }
        if(effect) {
            Effect.sceneEffect(this, this.scene, this.scenes[this.scenes.length - 2], effect, function () {
                _this.endScene();
            }, true);
            return;
        }
        this.scene.destroy();
        this.scenes.pop();
        this.scene.ended.fire();
        this.scene = this.scenes[this.scenes.length - 1];
        this.renderer.changeScene(this.scene);
        this.scene.showed.fire();
    };
    Game.prototype.r = function (name) {
        return this.resource.get(name);
    };
    Game.prototype.s = function (name) {
        return this.resource.sound(name);
    };
    Game.prototype.preload = function (ary, loadingScene) {
        if(ary instanceof Array) {
            for(var i = 0; i < ary.length; i++) {
                this.resource.load(ary[i], ary[i]);
            }
        } else if(typeof ary == "string") {
            var hasLoadingScene = false;
            for(var i = 0; i < arguments.length; i++) {
                if(typeof arguments[i] != "string") {
                    loadingScene = arguments[i];
                    hasLoadingScene = true;
                } else {
                    this.resource.load(arguments[i], arguments[i]);
                }
            }
            if(!hasLoadingScene) {
                loadingScene = new LoadingScene(this, this.resource);
            }
        } else {
            for(var i in ary) {
                this.resource.load(i, ary[i]);
            }
        }
        if(!loadingScene) {
            loadingScene = new LoadingScene(this, this.resource);
        }
        loadingScene.finished.handle(this, this.preloadComplete);
        this.changeScene(loadingScene);
    };
    Game.prototype.preloadOther = function (identity) {
        var loadingScene = this.scene;
        loadingScene.addOtherResource(identity);
    };
    Game.prototype.preloadCompleteOther = function (identity) {
        var loadingScene = this.scene;
        loadingScene.otherResourceComplete(identity);
    };
    Game.prototype.preloadComplete = function () {
        this.loaded.fire();
    };
    Game.prototype.end = function () {
        this.renderer.render();
        this._exit = true;
    };
    Game.prototype.main = function () {
        var _this = this;
        var fps_stack = new Array();
        var _main = function () {
            var t = performance.now();
            if(_this.tick > (t + 10000) || (_this.tick + 10000) < t) {
                _this.tick = t - 1;
                _this.renderTick = t - _this.targetFps;
                if(_this.enterFrame) {
                    _this.enterFrameTick = t - 1;
                }
                _this.refresh();
            }
            if(_this.tick < t) {
                _this.update.fire(t - _this.tick);
                _this.tick = t;
            }
            if(_this.enterFrame) {
                if(!_this.enterFrameTick) {
                    _this.enterFrameTick = t - 1;
                }
                while((_this.enterFrameTick + 16) < t) {
                    _this.enterFrameTick += 16;
                    _this.enterFrame.fire();
                }
            }
            for(var i = 0; i < _this.timers.length; i++) {
                _this.timers[i].tryFire(t);
            }
            if(_this.targetFps == 0 || _this.renderTick <= t) {
                if(_this.render) {
                    _this.render.fire();
                }
                _this.renderer.render();
                if(_this.targetFps) {
                    _this.renderTick = t + _this.targetFps;
                }
                if(_this.fps) {
                    if(fps_stack.length == 19) {
                        _this.fps.innerHTML = Math.round(20000 / (t - fps_stack[0])).toString();
                        fps_stack = [];
                    } else {
                        fps_stack.push(t);
                    }
                }
            }
            if(!_this._exit) {
                window.requestAnimationFrame(_main);
            }
        };
        this.tick = performance.now();
        this.renderTick = this.tick - this.targetFps;
        window.requestAnimationFrame(_main);
    };
    Game.prototype.fullscreen = function () {
        var t = this.renderer.container;
        if(t["requestFullScreen"]) {
            t["requestFullScreen"]();
        } else if(t["webkitRequestFullScreen"]) {
            t["webkitRequestFullScreen"]();
        } else if(t["mozRequestFullScreen"]) {
            t["mozRequestFullScreen"]();
        } else {
            return false;
        }
        return true;
    };
    Game.prototype.exitFullscreen = function () {
        var t = this.renderer.container;
        if(t["exitFullscreen"]) {
            t["exitFullscreen"]();
        } else if(t["webkitCancelFullScreen"]) {
            t["webkitCancelFullScreen"]();
        } else if(t["mozCancelFullScreen"]) {
            t["mozCancelFullScreen"]();
        } else {
            return false;
        }
        return true;
    };
    return Game;
})();
var ImageFilter;
(function (ImageFilter) {
    var FilterChain = (function () {
        function FilterChain() {
            this.filters = new Array();
        }
        FilterChain.prototype.get = function (index) {
            return this.filters[index];
        };
        FilterChain.prototype.add = function (filter) {
            this.filters.push(filter);
            return this;
        };
        FilterChain.prototype.set = function (filter) {
            this.filters = [
                filter
            ];
            return this;
        };
        FilterChain.prototype.insert = function (index, filter) {
            for(var i = 1; i < arguments.length; i++) {
                this.filters.splice(index, 0, arguments[i]);
            }
            return this;
        };
        FilterChain.prototype.remove = function (filter) {
            for(var i = 0; i < this.filters.length; i++) {
                if(this.filters[i] == filter) {
                    this.filters.splice(i, 1);
                    return;
                }
            }
        };
        FilterChain.prototype.clear = function () {
            this.filters = [];
            return this;
        };
        FilterChain.prototype.count = function () {
            return this.filters.length;
        };
        FilterChain.prototype.has = function () {
            return this.filters.length > 0;
        };
        FilterChain.prototype.createSprite = function (entity) {
            var buffer = new BufferedRenderer({
                width: entity.width,
                height: entity.height
            });
            buffer.filter = this;
            var x = entity.x;
            var y = entity.y;
            entity.x = 0;
            entity.y = 0;
            buffer.renderUnit(entity);
            entity.x = x;
            entity.y = y;
            return buffer.createSprite();
        };
        FilterChain.prototype.createImage = function (entity) {
            var buffer = new BufferedRenderer({
                width: entity.image.width,
                height: entity.image.height
            });
            var image = new Sprite(entity.image.width, entity.image.height, entity.image);
            image.x = 0;
            image.y = 0;
            buffer.filter = this;
            buffer.renderUnit(image);
            return buffer.createImage();
        };
        FilterChain.prototype.filter = function (pixels) {
            var length = this.filters.length;
            for(var i = 0; i < length; i++) {
                this.filters[i].filter(pixels);
            }
        };
        return FilterChain;
    })();
    ImageFilter.FilterChain = FilterChain;    
    var Filter = (function () {
        function Filter() {
            this.opt = {
            };
        }
        Filter.prototype.filter = function (pixels) {
        };
        Filter.prototype.getOption = function (name, defaultValue) {
            if(this.opt[name] === undefined) {
                return defaultValue;
            }
            return this.opt[name];
        };
        Filter.prototype.findColorDifference = function (dif, dest, src) {
            return (dif * dest + (1 - dif) * src);
        };
        Filter.prototype.createColor = function (src) {
            src = src.replace(/^#/, '');
            if(src.length == 3) {
                src = src.replace(/(.)/g, '$1$1');
            }
            return src;
        };
        Filter.prototype.applyMatrix = function (pixels, matrix, amount) {
            var data = pixels.data, imgWidth = pixels.width, height = pixels.height;
            var datalen = data.length;
            var bufferedData = new Array(data.length);
            for(var i = 0; i < datalen; i++) {
                bufferedData[i] = data[i];
            }
            var matrixSize = Math.sqrt(matrix.length);
            var kernelRadius = Math.floor(matrixSize / 2);
            for(var i = 1; i < imgWidth - 1; i++) {
                for(var j = 1; j < height - 1; j++) {
                    var sumR = 0, sumG = 0, sumB = 0;
                    for(var h = 0; h < matrixSize; h++) {
                        for(var w = 0; w < matrixSize; w++) {
                            var i2 = ((i + w - kernelRadius) + (j + h - kernelRadius) * imgWidth) << 2;
                            sumR += bufferedData[i2] * matrix[w + h * matrixSize];
                            sumG += bufferedData[i2 + 1] * matrix[w + h * matrixSize];
                            sumB += bufferedData[i2 + 2] * matrix[w + h * matrixSize];
                        }
                    }
                    var ref = (i + j * imgWidth) << 2;
                    var r = data[ref], g = data[ref + 1], b = data[ref + 2];
                    data[ref] = this.findColorDifference(amount, sumR, r);
                    data[ref + 1] = this.findColorDifference(amount, sumG, g);
                    data[ref + 2] = this.findColorDifference(amount, sumB, b);
                }
            }
            return (pixels);
        };
        Filter.prototype.checkRGBBoundary = function (val) {
            if(val < 0) {
                return 0;
            } else if(val > 255) {
                return 255;
            }
            return val;
        };
        return Filter;
    })();
    ImageFilter.Filter = Filter;    
    var UniversalTransitionFilter = (function (_super) {
        __extends(UniversalTransitionFilter, _super);
        function UniversalTransitionFilter(image, amount, repeat) {
                _super.call(this);
            this.opt.amount = amount;
            this.opt.image = image;
            this.opt.repeat = repeat;
        }
        UniversalTransitionFilter.prototype.getImageData = function (image, canvas) {
            var context;
            if(!canvas) {
                canvas = window.createCanvas(image.width, image.height);
                context = canvas.getContext("2d");
                context.drawImage(image, 0, 0);
            } else {
                context = canvas.getContext("2d");
            }
            return context.getImageData(0, 0, image.width, image.height);
        };
        UniversalTransitionFilter.prototype.createRuleImage = function () {
            var image = this.opt.image;
            if(image instanceof ImageData) {
                this.ruleImage = image;
            } else if(image instanceof HTMLCanvasElement) {
                this.ruleImage = this.getImageData(image, image);
            } else if(image instanceof HTMLImageElement || image instanceof HTMLVideoElement) {
                this.ruleImage = this.getImageData(image);
            } else {
                var sprite = image.createSprite();
                this.ruleImage = this.getImageData(sprite.image);
            }
        };
        UniversalTransitionFilter.prototype.filter = function (pixels) {
            if(!this.ruleImage) {
                this.createRuleImage();
            }
            var amount = this.getOption("amount", 255);
            var repeat = this.getOption("repeat", false);
            var w = pixels.width;
            var h = pixels.height;
            var w2 = this.ruleImage.width;
            var h2 = this.ruleImage.height;
            var data = pixels.data;
            var data2 = this.ruleImage.data;
            if(w == w2 && h == h2) {
                for(var i = 0, length = data.length; i < length >> 2; i++) {
                    var index = i << 2;
                    data[index + 3] = Math.round(data[index + 3] / 255 * Math.max(0, data2[index] - amount));
                }
            } else if(repeat) {
                for(var x = 0; x < w; x++) {
                    for(var y = 0; y < h; y++) {
                        var x2 = x % w2;
                        var y2 = y % h2;
                        var index = (x + y * w) * 4;
                        var index2 = (x2 + y2 * w2) * 4;
                        data[index + 3] = Math.round(data[index + 3] / 255 * Math.max(0, data2[index2] - amount));
                    }
                }
            } else {
                var xPer = w2 / w;
                var yPer = h2 / h;
                for(var x = 0; x < w; x++) {
                    for(var y = 0; y < h; y++) {
                        var x2 = Math.round(xPer * x);
                        var y2 = Math.round(yPer * y);
                        var index = (x + y * w) * 4;
                        var index2 = (x2 + y2 * w2) * 4;
                        data[index + 3] = Math.round(data[index + 3] / 255 * Math.max(0, data2[index2] - amount));
                    }
                }
            }
        };
        return UniversalTransitionFilter;
    })(Filter);
    ImageFilter.UniversalTransitionFilter = UniversalTransitionFilter;    
    var GreyscaleFilter = (function (_super) {
        __extends(GreyscaleFilter, _super);
        function GreyscaleFilter(opacity) {
                _super.call(this);
            this.opt.opacity = opacity;
        }
        GreyscaleFilter.prototype.filter = function (pixels) {
            var opacity = this.getOption("opacity", 1);
            var data = pixels.data;
            for(var i = 0, length = data.length; i < length >> 2; i++) {
                var index = i << 2;
                var r = data[index], g = data[index + 1], b = data[index + 2];
                var val = r * 0.21 + g * 0.71 + b * 0.07;
                data[index] = this.findColorDifference(opacity, val, r);
                data[index + 1] = this.findColorDifference(opacity, val, g);
                data[index + 2] = this.findColorDifference(opacity, val, b);
            }
        };
        return GreyscaleFilter;
    })(Filter);
    ImageFilter.GreyscaleFilter = GreyscaleFilter;    
    var SepiaFilter = (function (_super) {
        __extends(SepiaFilter, _super);
        function SepiaFilter(opacity) {
                _super.call(this);
            this.opt.opacity = opacity;
        }
        SepiaFilter.prototype.filter = function (pixels) {
            var opacity = this.getOption("opacity", 1);
            var data = pixels.data;
            for(var i = 0, length = data.length; i < length >> 2; i++) {
                var index = i << 2;
                var r = data[index], g = data[index + 1], b = data[index + 2];
                data[index] = this.findColorDifference(opacity, r * 0.393 + g * 0.769 + b * 0.189, r);
                data[index + 1] = this.findColorDifference(opacity, r * 0.349 + g * 0.686 + b * 0.168, g);
                data[index + 2] = this.findColorDifference(opacity, r * 0.272 + g * 0.534 + b * 0.131, b);
            }
        };
        return SepiaFilter;
    })(Filter);
    ImageFilter.SepiaFilter = SepiaFilter;    
    var TintFilter = (function (_super) {
        __extends(TintFilter, _super);
        function TintFilter(color, opacity) {
                _super.call(this);
            this.opt.color = color;
            this.opt.opacity = opacity;
        }
        TintFilter.prototype.filter = function (pixels) {
            var opacity = this.getOption("opacity", 1);
            var color = this.getOption("color", "#f00");
            var data = pixels.data;
            var src = parseInt(this.createColor(color), 16);
            var r2 = (src & 16711680) >> 16, g2 = (src & 65280) >> 8, b2 = (src & 255);
            for(var i = 0, length = data.length; i < length >> 2; i++) {
                var index = i << 2;
                var r = data[index], g = data[index + 1], b = data[index + 2];
                data[index] = this.findColorDifference(opacity, r2, r);
                data[index + 1] = this.findColorDifference(opacity, g2, g);
                data[index + 2] = this.findColorDifference(opacity, b2, b);
            }
        };
        return TintFilter;
    })(Filter);
    ImageFilter.TintFilter = TintFilter;    
    var EdgesFilter = (function (_super) {
        __extends(EdgesFilter, _super);
        function EdgesFilter(amount) {
                _super.call(this);
            this.opt.amount = amount;
        }
        EdgesFilter.prototype.filter = function (pixels) {
            var matrix = [
                0, 
                1, 
                0, 
                1, 
                -4, 
                1, 
                0, 
                1, 
                0
            ];
            this.applyMatrix(pixels, matrix, this.getOption("amount", 1));
        };
        return EdgesFilter;
    })(Filter);
    ImageFilter.EdgesFilter = EdgesFilter;    
    var EmbossFilter = (function (_super) {
        __extends(EmbossFilter, _super);
        function EmbossFilter(amount) {
                _super.call(this);
            this.opt.amount = amount;
        }
        EmbossFilter.prototype.filter = function (pixels) {
            var matrix = [
                -2, 
                -1, 
                0, 
                -1, 
                1, 
                1, 
                0, 
                1, 
                2
            ];
            this.applyMatrix(pixels, matrix, this.getOption("amount", 0.5));
        };
        return EmbossFilter;
    })(Filter);
    ImageFilter.EmbossFilter = EmbossFilter;    
    var SharpenFilter = (function (_super) {
        __extends(SharpenFilter, _super);
        function SharpenFilter(amount) {
                _super.call(this);
            this.opt.amount = amount;
        }
        SharpenFilter.prototype.filter = function (pixels) {
            var matrix = [
                -1, 
                -1, 
                -1, 
                -1, 
                9, 
                -1, 
                -1, 
                -1, 
                -1
            ];
            this.applyMatrix(pixels, matrix, this.getOption("amount", 0.5));
        };
        return SharpenFilter;
    })(Filter);
    ImageFilter.SharpenFilter = SharpenFilter;    
    var MatrixFilter = (function (_super) {
        __extends(MatrixFilter, _super);
        function MatrixFilter(amount, matrix) {
                _super.call(this);
            this.opt.amount = amount;
            this.opt.matrix = matrix;
        }
        MatrixFilter.prototype.filter = function (pixels) {
            var matrix = this.getOption("matrix", [
                0.111, 
                0.111, 
                0.111, 
                0.111, 
                0.111, 
                0.111, 
                0.111, 
                0.111, 
                0.111
            ]);
            this.applyMatrix(pixels, matrix, this.getOption("amount", 0.5));
        };
        return MatrixFilter;
    })(Filter);
    ImageFilter.MatrixFilter = MatrixFilter;    
    var BlurFilter = (function (_super) {
        __extends(BlurFilter, _super);
        function BlurFilter(amount) {
                _super.call(this);
            this.opt.amount = amount;
        }
        BlurFilter.prototype.filter = function (pixels) {
            var width = pixels.width;
            var width4 = width << 2;
            var height = pixels.height;
            var amount = this.getOption("amount", 2);
            if(pixels) {
                var data = pixels.data;
                var q;
                if(amount < 0.0) {
                    amount = 0.0;
                }
                if(amount >= 2.5) {
                    q = 0.98711 * amount - 0.9633;
                } else if(amount >= 0.5) {
                    q = 3.97156 - 4.14554 * Math.sqrt(1.0 - 0.26891 * amount);
                } else {
                    q = 2 * amount * (3.97156 - 4.14554 * Math.sqrt(1.0 - 0.26891 * 0.5));
                }
                var qq = q * q;
                var qqq = qq * q;
                var b0 = 1.57825 + (2.44413 * q) + (1.4281 * qq) + (0.422205 * qqq);
                var b1 = ((2.44413 * q) + (2.85619 * qq) + (1.26661 * qqq)) / b0;
                var b2 = (-((1.4281 * qq) + (1.26661 * qqq))) / b0;
                var b3 = (0.422205 * qqq) / b0;
                var bigB = 1.0 - (b1 + b2 + b3);
                for(var c = 0; c < 3; c++) {
                    for(var y = 0; y < height; y++) {
                        var index = y * width4 + c;
                        var indexLast = y * width4 + ((width - 1) << 2) + c;
                        var pixel = data[index];
                        var ppixel = pixel;
                        var pppixel = ppixel;
                        var ppppixel = pppixel;
                        for(; index <= indexLast; index += 4) {
                            pixel = bigB * data[index] + b1 * ppixel + b2 * pppixel + b3 * ppppixel;
                            data[index] = pixel;
                            ppppixel = pppixel;
                            pppixel = ppixel;
                            ppixel = pixel;
                        }
                        index = y * width4 + ((width - 1) << 2) + c;
                        indexLast = y * width4 + c;
                        pixel = data[index];
                        ppixel = pixel;
                        pppixel = ppixel;
                        ppppixel = pppixel;
                        for(; index >= indexLast; index -= 4) {
                            pixel = bigB * data[index] + b1 * ppixel + b2 * pppixel + b3 * ppppixel;
                            data[index] = pixel;
                            ppppixel = pppixel;
                            pppixel = ppixel;
                            ppixel = pixel;
                        }
                    }
                }
                for(var c = 0; c < 3; c++) {
                    for(var x = 0; x < width; x++) {
                        var index = (x << 2) + c;
                        var indexLast = (height - 1) * width4 + (x << 2) + c;
                        var pixel = data[index];
                        var ppixel = pixel;
                        var pppixel = ppixel;
                        var ppppixel = pppixel;
                        for(; index <= indexLast; index += width4) {
                            pixel = bigB * data[index] + b1 * ppixel + b2 * pppixel + b3 * ppppixel;
                            data[index] = pixel;
                            ppppixel = pppixel;
                            pppixel = ppixel;
                            ppixel = pixel;
                        }
                        index = (height - 1) * width4 + (x << 2) + c;
                        indexLast = (x << 2) + c;
                        pixel = data[index];
                        ppixel = pixel;
                        pppixel = ppixel;
                        ppppixel = pppixel;
                        for(; index >= indexLast; index -= width4) {
                            pixel = bigB * data[index] + b1 * ppixel + b2 * pppixel + b3 * ppppixel;
                            data[index] = pixel;
                            ppppixel = pppixel;
                            pppixel = ppixel;
                            ppixel = pixel;
                        }
                    }
                }
            }
        };
        return BlurFilter;
    })(Filter);
    ImageFilter.BlurFilter = BlurFilter;    
    var MosaicFilter = (function (_super) {
        __extends(MosaicFilter, _super);
        function MosaicFilter(size, opacity) {
                _super.call(this);
            this.opt.size = size;
            this.opt.opacity = opacity;
        }
        MosaicFilter.prototype.filter = function (pixels) {
            var opacity = this.getOption("opacity", 1);
            var size = Math.round(this.getOption("size", 5));
            var width = pixels.width;
            for(var i = 0, data = pixels.data, length = data.length; i < length >> 2; i++) {
                var index = i << 2;
                var r = data[index], g = data[index + 1], b = data[index + 2];
                var pos = index >> 2;
                var stepY = Math.floor(pos / width);
                var stepY1 = stepY % size;
                var stepX = pos - (stepY * width);
                var stepX1 = stepX % size;
                if(stepY1) {
                    pos -= stepY1 * width;
                }
                if(stepX1) {
                    pos -= stepX1;
                }
                pos = pos << 2;
                data[index] = this.findColorDifference(opacity, data[pos], r);
                data[index + 1] = this.findColorDifference(opacity, data[pos + 1], g);
                data[index + 2] = this.findColorDifference(opacity, data[pos + 2], b);
            }
        };
        return MosaicFilter;
    })(Filter);
    ImageFilter.MosaicFilter = MosaicFilter;    
    (function (NoiseType) {
        NoiseType._map = [];
        NoiseType._map[0] = "Mono";
        NoiseType.Mono = 0;
        NoiseType._map[1] = "Color";
        NoiseType.Color = 1;
    })(ImageFilter.NoiseType || (ImageFilter.NoiseType = {}));
    var NoiseType = ImageFilter.NoiseType;
    var NoiseFilter = (function (_super) {
        __extends(NoiseFilter, _super);
        function NoiseFilter(amount, type) {
                _super.call(this);
            this.opt.amount = amount;
            this.opt.type = type;
        }
        NoiseFilter.prototype.filter = function (pixels) {
            var amount = this.getOption("amount", 30);
            var type = this.getOption("type", NoiseType.Mono);
            for(var i = 0, data = pixels.data, length = data.length; i < length >> 2; i++) {
                var index = i << 2;
                var r = data[index], g = data[index + 1], b = data[index + 2];
                if(type == NoiseType.Mono) {
                    var val = Math.floor((amount >> 1) - (Math.random() * amount));
                    data[index] = this.checkRGBBoundary(r + val);
                    data[index + 1] = this.checkRGBBoundary(g + val);
                    data[index + 2] = this.checkRGBBoundary(b + val);
                } else {
                    data[index] = this.checkRGBBoundary(r + Math.floor((amount >> 1) - (Math.random() * amount)));
                    data[index + 1] = this.checkRGBBoundary(g + Math.floor((amount >> 1) - (Math.random() * amount)));
                    data[index + 2] = this.checkRGBBoundary(b + Math.floor((amount >> 1) - (Math.random() * amount)));
                }
            }
        };
        return NoiseFilter;
    })(Filter);
    ImageFilter.NoiseFilter = NoiseFilter;    
    var PosterizeFilter = (function (_super) {
        __extends(PosterizeFilter, _super);
        function PosterizeFilter(amount, opacity) {
                _super.call(this);
            this.opt.opacity = opacity;
            this.opt.amount = amount;
        }
        PosterizeFilter.prototype.filter = function (pixels) {
            var opacity = this.getOption("opacity", 1);
            var amount = this.getOption("amount", 2);
            var areas = 256 / amount;
            var values = 255 / (amount - 1);
            for(var i = 0, data = pixels.data, length = data.length; i < length >> 2; i++) {
                var index = i << 2;
                var r = data[index], g = data[index + 1], b = data[index + 2];
                data[index] = this.findColorDifference(opacity, Math.round(values * Math.round(r / areas)), r);
                data[index + 1] = this.findColorDifference(opacity, Math.round(values * Math.round(g / areas)), g);
                data[index + 2] = this.findColorDifference(opacity, Math.round(values * Math.round(b / areas)), b);
            }
        };
        return PosterizeFilter;
    })(Filter);
    ImageFilter.PosterizeFilter = PosterizeFilter;    
})(ImageFilter || (ImageFilter = {}));
var Action = (function () {
    function Action(param) {
        this.added_to_timeline = new Trigger();
        this.removed_from_timeline = new Trigger();
        this.action_tick = new Trigger();
        this.time = null;
        this.frame = 0;
        if(param) {
            for(var key in param) {
                if(param.hasOwnProperty(key)) {
                    if(param[key] != null) {
                        this[key] = param[key];
                    }
                }
            }
        }
        var action = this;
        this.timeline = null;
        this.entity = null;
        this.removed_from_timeline.handle(this, this.removedFromTimeline);
        this.added_to_timeline.handle(this, this.addedToTimeline);
        this.action_tick.handle(this, this.actionTick);
    }
    Action.prototype.removedFromTimeline = function () {
        this.timeline = null;
        this.entity = null;
        this.frame = 0;
    };
    Action.prototype.addedToTimeline = function (p) {
        this.timeline = p.timeline;
        this.entity = p.timeline.entity;
        this.frame = 0;
    };
    Action.prototype.actionTick = function (p) {
        var remaining = this.time - (this.frame + p.elapsed);
        if(this.time != null && remaining <= 0) {
            this.frame = this.time;
            p.timeline.next(-remaining);
        } else {
            this.frame += p.elapsed;
        }
    };
    return Action;
})();
var ParallelAction = (function (_super) {
    __extends(ParallelAction, _super);
    function ParallelAction(param) {
        _super.call(this, param);
        this.actions = new Array();
        this.endedActions = new Array();
        this.action_start = new Trigger();
        this.action_start.handle(this, this.parallelActionStart);
    }
    ParallelAction.prototype.addedToTimeline = function (p) {
        _super.prototype.addedToTimeline.call(this, p);
        for(var i = 0, len = this.actions.length; i < len; i++) {
            this.actions[i].added_to_timeline.fire(p);
        }
    };
    ParallelAction.prototype.removedFromTimeline = function () {
        _super.prototype.removedFromTimeline.call(this);
        this.actions = this.endedActions;
        this.endedActions = [];
    };
    ParallelAction.prototype.actionTick = function (evt) {
        _super.prototype.actionTick.call(this, evt);
        var self = this;
        var i, len, timeline = {
            next: function (remaining) {
                var action = self.actions[i];
                self.actions.splice(i--, 1);
                len = self.actions.length;
                self.endedActions.push(action);
                if(action.action_end) {
                    action.action_end.fire({
                        timeline: this
                    });
                }
                action.removed_from_timeline.fire({
                    timeline: this
                });
            }
        };
        var e = {
            timeline: timeline,
            elapsed: evt.elapsed
        };
        for(i = 0 , len = this.actions.length; i < len; i++) {
            this.actions[i].action_tick.fire(e);
        }
        if(this.actions.length === 0) {
            evt.timeline.next(1);
        }
    };
    ParallelAction.prototype.parallelActionStart = function (e) {
        for(var i = 0, len = this.actions.length; i < len; i++) {
            if(this.actions[i].action_start) {
                this.actions[i].action_start.fire(e);
            }
        }
    };
    return ParallelAction;
})(Action);
var TWEEN_DRAW_OPTION_SETTERS = {
};
for(var p in ENTITY_OPTIONS_DEFAULT_VALUES) {
    if(typeof ENTITY_OPTIONS_DEFAULT_VALUES[p] == "object") {
        if(p == "translate") {
            TWEEN_DRAW_OPTION_SETTERS[p] = function (entity, name, old, target, origin, ratio) {
                var ret = {
                    x: old.x + (target.x - origin.x) * ratio,
                    y: old.y + (target.y - origin.y) * ratio
                };
                entity.setDrawOption(name, ret);
                return ret;
            };
        } else if(p == "transform") {
            TWEEN_DRAW_OPTION_SETTERS[p] = function (entity, name, old, target, origin, ratio) {
                throw "unsupported transform tween";
            };
        } else if(p == "scale") {
            TWEEN_DRAW_OPTION_SETTERS[p] = function (entity, name, old, target, origin, ratio) {
                var ret = {
                    x: old.x + (target.x - origin.x) * ratio,
                    y: old.y + (target.y - origin.y) * ratio
                };
                entity.setDrawOption(name, ret);
                return ret;
            };
        }
    } else {
        TWEEN_DRAW_OPTION_SETTERS[p] = function (entity, name, old, target, origin, ratio) {
            var ret = old + (target - origin) * ratio;
            if(Math.abs(ret) < 1e-7) {
                ret = 0;
            }
            entity.setDrawOption(name, ret);
            return ret;
        };
    }
}
var Tween = (function (_super) {
    __extends(Tween, _super);
    function Tween(params) {
        _super.call(this, params);
        this.origin = {
        };
        this.target = {
        };
        this.old = {
        };
        this.props = {
        };
        var excepted = [
            "frame", 
            "easing", 
            "time", 
            "callback", 
            "onactiontick", 
            "onactionstart", 
            "onactionend"
        ];
        for(var p in params) {
            if(excepted.indexOf(p) === -1) {
                this.props[p] = params[p];
            }
        }
        if(this.easing == null) {
            this.easing = function (t, b, c, d) {
                return c * t / d + b;
            };
        }
        this.action_start = new Trigger();
        this.action_start.handle(this, this.actionStart);
        this.action_tick.handleInsert(0, this, this.tweenActionTick);
    }
    Tween.prototype.actionStart = function (e) {
        for(var prop in this.props) {
            if(prop == "filter") {
                var filter = new this.props[prop].targetClass();
                if(!this.entity.filter) {
                    this.entity.filter = new ImageFilter.FilterChain();
                }
                this.entity.filter.add(filter);
                if(this.props[prop].autoDelete) {
                    this.removed_from_timeline.handleInsert(0, this, function () {
                        this.entity.filter.remove(filter);
                        if(this.entity.filter.length == 0) {
                            delete this.entity.filter;
                        }
                        this.entity.updated();
                    });
                }
                this.target[prop] = {
                };
                this.origin[prop] = {
                };
                this.old[prop] = {
                };
                for(var j in this.props[prop]) {
                    if(j == "targetClass" || j == "autoDelete") {
                        continue;
                    }
                    if(this.props[prop][j].start !== undefined && this.props[prop][j].start != E.prototype.start) {
                        var s = this.props[prop][j].start;
                        filter.opt[j] = s;
                        this.origin[prop][j] = s;
                        this.old[prop][j] = s;
                        this.target[prop][j] = this.props[prop][j].end;
                    } else {
                        filter.opt[j] = this.props[prop][j];
                    }
                }
                this.otherTarget = filter;
                continue;
            }
            if(!TWEEN_DRAW_OPTION_SETTERS[prop] && typeof this.props[prop] === "object") {
                this.target[prop] = {
                };
                this.origin[prop] = {
                };
                this.old[prop] = {
                };
                for(var j in this.props[prop]) {
                    if(typeof this.props[prop] === "function") {
                        this.target[prop][j] = this.props[prop][j].call(this.entity);
                    } else {
                        this.target[prop][j] = this.props[prop][j];
                    }
                    this.origin[prop][j] = this.entity[prop][j];
                    this.old[prop][j] = this.entity[prop][j];
                }
                this.otherTarget = this.entity[prop];
                continue;
            }
            if(typeof this.props[prop] === "function") {
                this.target[prop] = this.props[prop].call(this.entity);
            } else {
                this.target[prop] = this.props[prop];
            }
            if(TWEEN_DRAW_OPTION_SETTERS[prop]) {
                this.origin[prop] = this.entity.getDrawOption(prop);
            } else {
                this.origin[prop] = this.entity[prop];
            }
            this.old[prop] = this.origin[prop];
        }
    };
    Tween.prototype.tweenActionTick = function (e) {
        var ratio = this.time === 0 ? 1 : this.easing(Math.min(this.time, this.frame + e.elapsed), 0, 1, this.time) - this.easing(this.frame, 0, 1, this.time);
        for(var prop in this.target) {
            if(this[prop] === undefined) {
                continue;
            }
            if(TWEEN_DRAW_OPTION_SETTERS[prop]) {
                var f = TWEEN_DRAW_OPTION_SETTERS[prop];
                this.old[prop] = f(this.entity, prop, this.old[prop], this.target[prop], this.origin[prop], ratio);
            } else if(prop == "filter") {
                for(var j in this.target[prop]) {
                    this.otherTarget.opt[j] = this.old[prop][j] + (this.target[prop][j] - this.origin[prop][j]) * ratio;
                    if(Math.abs(this.otherTarget.opt[j]) < 1e-7) {
                        this.otherTarget.opt[j] = 0;
                    }
                    this.old[prop][j] = this.otherTarget.opt[j];
                }
            } else if(this.otherTarget) {
                for(var j in this.target[prop]) {
                    this.otherTarget[j] = this.old[prop][j] + (this.target[prop][j] - this.origin[prop][j]) * ratio;
                    if(Math.abs(this.otherTarget[j]) < 1e-7) {
                        this.otherTarget[j] = 0;
                    }
                    this.old[prop][j] = this.otherTarget[j];
                }
            } else {
                this.entity[prop] = this.old[prop] + (this.target[prop] - this.origin[prop]) * ratio;
                if(Math.abs(this.entity[prop]) < 1e-7) {
                    this.entity[prop] = 0;
                }
                this.old[prop] = this.entity[prop];
            }
        }
        this.entity.updated();
    };
    return Tween;
})(Action);
var Timeline = (function () {
    function Timeline(entity) {
        this.entity = entity;
        this.queue = new Array();
        this.paused = false;
        this.looped = false;
        this._parallel = null;
        this._activated = false;
    }
    Timeline.prototype._deactivateTimeline = function (force) {
        var _this = this;
        if(force || this._activated) {
            this._activated = false;
            if(this.entity.scene) {
                this.entity.scene.game.update.remove(this, this.tick);
            } else {
                this.entity.addActiveQueue(function () {
                    _this.entity.scene.game.update.remove(_this, _this.tick);
                });
            }
        }
    };
    Timeline.prototype._activateTimeline = function (force) {
        var _this = this;
        if(force || (!this._activated && !this.paused)) {
            if(this.entity.scene) {
                this.entity.scene.game.update.handle(this, this.tick);
            } else {
                this.entity.addActiveQueue(function () {
                    _this.entity.scene.game.update.handle(_this, _this.tick);
                });
            }
            this._activated = true;
        }
    };
    Timeline.prototype.setFrameBased = function () {
        this.isFrameBased = true;
    };
    Timeline.prototype.setTimeBased = function () {
        this.isFrameBased = false;
    };
    Timeline.prototype.next = function (remainingTime) {
        var action = this.queue.shift();
        if(!action) {
            return;
        }
        if(action.action_end) {
            action.action_end.fire({
                timeline: this
            });
        }
        if(this.queue.length === 0 && !this.looped) {
            action.removed_from_timeline.fire({
                timeline: this
            });
            this._deactivateTimeline(true);
            return;
        }
        if(this.looped) {
            action.removed_from_timeline.fire({
                timeline: this
            });
            action.frame = 0;
            this.add(action);
        } else {
            action.removed_from_timeline.fire({
                timeline: this
            });
        }
        if(remainingTime > 0 || (this.queue[0] && this.queue[0].time === 0)) {
            this.tick(remainingTime);
        }
    };
    Timeline.prototype.tick = function (t) {
        if(this.paused) {
            return;
        }
        if(this.queue.length > 0) {
            var action = this.queue[0];
            if(action.frame === 0) {
                if(action.action_start) {
                    action.action_start.fire({
                        timeline: this
                    });
                }
            }
            action.action_tick.fire({
                timeline: this,
                elapsed: (this.isFrameBased) ? 1 : t
            });
        }
    };
    Timeline.prototype.add = function (action) {
        if(!this._activated) {
            this._activateTimeline(true);
        }
        if(this._parallel) {
            this._parallel.actions.push(action);
            this._parallel = null;
        } else {
            this.queue.push(action);
        }
        action.frame = 0;
        action.added_to_timeline.fire({
            timeline: this
        });
        return this;
    };
    Timeline.prototype.action = function (params) {
        return this.add(new Action(params));
    };
    Timeline.prototype.tween = function (params) {
        return this.add(new Tween(params));
    };
    Timeline.prototype.clear = function () {
        for(var i = 0, len = this.queue.length; i < len; i++) {
            this.queue[i].removed_from_timeline.fire({
                timeline: this
            });
        }
        this.queue = [];
        this._deactivateTimeline();
        return this;
    };
    Timeline.prototype.skip = function (frames) {
        var e = {
        };
        if(this.isFrameBased) {
            e.elapsed = 1;
        } else {
            e.elapsed = frames;
            frames = 1;
        }
        while(frames--) {
            this.tick(e);
        }
        return this;
    };
    Timeline.prototype.pause = function () {
        if(!this.paused) {
            this.paused = true;
            this._deactivateTimeline();
        }
        return this;
    };
    Timeline.prototype.resume = function () {
        if(this.paused) {
            this.paused = false;
            this._activateTimeline();
        }
        return this;
    };
    Timeline.prototype.loop = function () {
        this.looped = true;
        return this;
    };
    Timeline.prototype.unloop = function () {
        this.looped = false;
        return this;
    };
    Timeline.prototype.delay = function (time) {
        this.add(new Action({
            time: time
        }));
        return this;
    };
    Timeline.prototype.then = function (func) {
        var _this = this;
        var action = new Action({
            time: 0
        });
        action.action_tick.handleInsert(0, action, function (e) {
            func.call(_this.entity, e);
        });
        this.add(action);
        return this;
    };
    Timeline.prototype.exec = function (func) {
        this.then(func);
    };
    Timeline.prototype.frame = function (wait, frame) {
        var s = this.entity;
        if(frame == undefined) {
            this.then(function () {
                s.frame = wait;
            });
        } else {
            this.delay(wait).then(function () {
                s.frame = frame;
            });
        }
        return this;
    };
    Timeline.prototype.fno = function (wait, fno) {
        var s = this.entity;
        if(fno == undefined) {
            this.then(function () {
                s.fno = wait;
            });
        } else {
            this.delay(wait).then(function () {
                s.fno = fno;
            });
        }
        return this;
    };
    Timeline.prototype.cue = function (cue) {
        var ptr = 0;
        for(var frame in cue) {
            var f = parseInt(frame);
            if(cue.hasOwnProperty(frame)) {
                this.delay(f - ptr);
                this.then(cue[frame]);
                ptr = f;
            }
        }
    };
    Timeline.prototype.repeat = function (func, time) {
        var action = new Action({
            time: time
        });
        action.action_tick.handle(action, function (e) {
            func.call(action, e);
        });
        return this;
    };
    Timeline.prototype.and = function () {
        var last = this.queue.pop();
        if(last instanceof ParallelAction) {
            this._parallel = last;
            this.queue.push(last);
        } else {
            var parallel = new ParallelAction();
            parallel.actions.push(last);
            this.queue.push(parallel);
            this._parallel = parallel;
        }
        return this;
    };
    Timeline.prototype.waitUntil = function (func) {
        var _this = this;
        var action = new Action();
        action.action_start = new Trigger();
        action.action_tick.handle(action, function (e) {
            if(func.call(action, e)) {
                _this.next(0);
            }
        });
        this.add(action);
        return this;
    };
    Timeline.prototype.moveTo = function (x, y, time, easing) {
        return this.tween({
            x: x,
            y: y,
            time: time,
            easing: easing
        });
    };
    Timeline.prototype.moveX = function (x, time, easing) {
        return this.tween({
            x: x,
            time: time,
            easing: easing
        });
    };
    Timeline.prototype.moveY = function (y, time, easing) {
        return this.tween({
            y: y,
            time: time,
            easing: easing
        });
    };
    Timeline.prototype.moveBy = function (x, y, time, easing) {
        return this.tween({
            x: function () {
                return this.x + x;
            },
            y: function () {
                return this.y + y;
            },
            time: time,
            easing: easing
        });
    };
    Timeline.prototype.scrollTo = function (x, y, time, easing) {
        if(!this.entity.scroll) {
            this.entity.scrollTo(0, 0);
        }
        return this.tween({
            scroll: {
                x: x,
                y: y
            },
            time: time,
            easing: easing
        });
    };
    Timeline.prototype.scrollX = function (x, time, easing) {
        if(!this.entity.scroll) {
            this.entity.scrollTo(0, 0);
        }
        return this.tween({
            scroll: {
                x: x
            },
            time: time,
            easing: easing
        });
    };
    Timeline.prototype.scrollY = function (y, time, easing) {
        if(!this.entity.scroll) {
            this.entity.scrollTo(0, 0);
        }
        return this.tween({
            scroll: {
                y: y
            },
            time: time,
            easing: easing
        });
    };
    Timeline.prototype.scrollBy = function (x, y, time, easing) {
        if(!this.entity.scroll) {
            this.entity.scrollTo(0, 0);
        }
        return this.tween({
            scroll: {
                x: function () {
                    return this.scroll ? this.scroll.x + x : x;
                },
                y: function () {
                    return this.scroll ? this.scroll.y + y : y;
                }
            },
            time: time,
            easing: easing
        });
    };
    Timeline.prototype.fadeTo = function (opacity, time, easing) {
        this.tween({
            globalAlpha: opacity,
            time: time,
            easing: easing
        });
        return this;
    };
    Timeline.prototype.fadeIn = function (time, easing) {
        return this.fadeTo(1, time, easing);
    };
    Timeline.prototype.fadeOut = function (time, easing) {
        return this.fadeTo(0, time, easing);
    };
    Timeline.prototype.hide = function () {
        return this.then(function () {
            this.setDrawOption("globalAlpha", 0);
        });
    };
    Timeline.prototype.show = function () {
        return this.then(function () {
            this.setDrawOption("globalAlpha", 1);
        });
    };
    Timeline.prototype.resizeTo = function (size, time, easing) {
        if(typeof easing === "number") {
            return this.tween({
                width: arguments[0],
                height: arguments[1],
                time: arguments[2],
                easing: arguments[3]
            });
        }
        return this.tween({
            width: size,
            height: size,
            time: time,
            easing: easing
        });
    };
    Timeline.prototype.resizeBy = function (size, time, easing) {
        if(typeof easing === "number") {
            return this.tween({
                width: function () {
                    return this.width + arguments[0];
                },
                height: function () {
                    return this.height + arguments[1];
                },
                time: arguments[2],
                easing: arguments[3]
            });
        }
        return this.tween({
            width: function () {
                return this.width + size;
            },
            height: function () {
                return this.height + size;
            },
            time: time,
            easing: easing
        });
    };
    Timeline.prototype.scaleTo = function (scale, time, easing) {
        if(typeof easing === "number") {
            return this.tween({
                scale: {
                    x: arguments[0],
                    y: arguments[1]
                },
                time: arguments[2],
                easing: arguments[3]
            });
        }
        return this.tween({
            scale: {
                x: scale,
                y: scale
            },
            time: time,
            easing: easing
        });
    };
    Timeline.prototype.scaleBy = function (scale, time, easing) {
        if(typeof easing === "number") {
            return this.tween({
                scale: function () {
                    var _scale = this.getDrawOption("scale");
                    return {
                        x: _scale.x * arguments[0],
                        y: _scale.y * arguments[1]
                    };
                },
                time: arguments[2],
                easing: arguments[3]
            });
        }
        return this.tween({
            scale: function () {
                var _scale = this.getDrawOption("scale");
                return {
                    x: _scale.x * scale,
                    y: _scale.y * scale
                };
            },
            time: time,
            easing: easing
        });
    };
    Timeline.prototype.rotateTo = function (deg, time, easing) {
        return this.tween({
            rotate: deg,
            time: time,
            easing: easing
        });
    };
    Timeline.prototype.rotateBy = function (deg, time, easing) {
        return this.tween({
            rotate: function () {
                return this.getDrawOption("rotate") + deg;
            },
            time: time,
            easing: easing
        });
    };
    Timeline.prototype.filter = function (targetClass, props, time, easing) {
        var filterVal = {
            targetClass: targetClass,
            autoDelete: true
        };
        for(var i in props) {
            filterVal[i] = props[i];
        }
        return this.tween({
            filter: filterVal,
            time: time,
            easing: easing
        });
    };
    Timeline.prototype.removeFromScene = function () {
        return this.then(function () {
            this.remove();
        });
    };
    return Timeline;
})();
Timeline.prototype.isFrameBased = false;
var JGUtil = (function () {
    function JGUtil() { }
    JGUtil.getCenterPoint = function getCenterPoint(p) {
        var a = p;
        if(a.width && a.height) {
            return {
                x: p.x + a.width / 2,
                y: p.y + a.height / 2
            };
        }
        return p;
    };
    JGUtil.getMargin = function getMargin(p) {
        var a = p;
        if(a.width && a.height) {
            return {
                x: a.width / 2,
                y: a.height / 2
            };
        }
        return {
            x: 0,
            y: 0
        };
    };
    JGUtil.intersect = function intersect(p1, p2) {
        var a1 = p1;
        var a2 = p2;
        if(a1.width && a1.height) {
            if(a2.width && a2.height) {
                return a1.x <= (a2.x + a2.width) && a2.x <= (a1.x + a1.width) && a1.y <= (a2.y + a2.height) && a2.y <= (a1.y + a1.height);
            } else {
                return a2.x >= a1.x && a2.x <= (a1.x + a1.width) && a2.y >= a1.y && a2.y <= (a1.y + a1.height);
            }
        } else if(a2.width && a2.height) {
            return a1.x >= a2.x && a1.x <= (a2.x + a2.width) && a1.y >= a2.y && a1.y <= (a2.y + a2.height);
        }
        return p1.x == p2.x && p1.y == p2.y;
    };
    JGUtil.getDistance = function getDistance(p1, p2) {
        var _p1 = JGUtil.getCenterPoint(p1);
        var _p2 = JGUtil.getCenterPoint(p2);
        return {
            x: Math.abs(_p1.x - _p2.x),
            y: Math.abs(_p1.y - _p2.y)
        };
    };
    JGUtil.getMovePoint = function getMovePoint(p1, p2, power, maxMove) {
        var _p1 = JGUtil.getCenterPoint(p1);
        var _p2 = JGUtil.getCenterPoint(p2);
        if(!power) {
            power = 1;
        }
        var ret = {
            x: (_p1.x - _p2.x) * power,
            y: (_p1.y - _p2.y) * power
        };
        var absx = Math.abs(ret.x);
        var absy = Math.abs(ret.y);
        var max = Math.max(absx, absy);
        var xper = absx / max;
        var yper = absy / max;
        if(maxMove) {
            if(absx > maxMove || absy > maxMove) {
                if(ret.x < 0) {
                    ret.x = -maxMove * xper;
                } else {
                    ret.x = maxMove * xper;
                }
                if(ret.y < 0) {
                    ret.y = -maxMove * yper;
                } else {
                    ret.y = maxMove * yper;
                }
            }
        }
        return ret;
    };
    JGUtil.getDirectionAngle = function getDirectionAngle(p1, p2, minDistance) {
        var _p1 = JGUtil.getCenterPoint(p1);
        var _p2 = JGUtil.getCenterPoint(p2);
        var xp = Math.abs(_p1.x - _p2.x);
        var yp = Math.abs(_p1.y - _p2.y);
        if(minDistance && Math.max(xp, yp) < minDistance) {
            return null;
        }
        if(xp > yp) {
            return (_p1.x > _p2.x) ? Angle.left : Angle.right;
        } else {
            return (_p1.y > _p2.y) ? Angle.up : Angle.down;
        }
    };
    JGUtil.getDirectionKeytype = function getDirectionKeytype(p1, p2, minDistance) {
        var _p1 = JGUtil.getCenterPoint(p1);
        var _p2 = JGUtil.getCenterPoint(p2);
        var xp = Math.abs(_p1.x - _p2.x);
        var yp = Math.abs(_p1.y - _p2.y);
        if(minDistance && Math.max(xp, yp) < minDistance) {
            return null;
        }
        if(xp > yp) {
            return (_p1.x > _p2.x) ? Keytype.left : Keytype.right;
        } else {
            return (_p1.y > _p2.y) ? Keytype.up : Keytype.down;
        }
    };
    JGUtil.homingX = function homingX(p1, p2, speed, t) {
        var m1 = JGUtil.getMargin(p1);
        var m2 = JGUtil.getMargin(p2);
        var x = p2.x + m2.x - m1.x;
        if(p1.x > x) {
            p1.x -= speed * t;
            if(p1.x < x) {
                p1.x = x;
                return true;
            }
            return false;
        } else if(p1.x < x) {
            p1.x += speed * t;
            if(p1.x > x) {
                p1.x = x;
                return true;
            }
            return false;
        }
        return true;
    };
    JGUtil.homingY = function homingY(p1, p2, speed, t) {
        var m1 = JGUtil.getMargin(p1);
        var m2 = JGUtil.getMargin(p2);
        var y = p2.y + m2.y - m1.y;
        if(p1.y > y) {
            p1.y -= speed * t;
            if(p1.y < y) {
                p1.y = y;
                return true;
            }
            return false;
        } else if(p1.y < y) {
            p1.y += speed * t;
            if(p1.y > y) {
                p1.y = y;
                return true;
            }
            return false;
        }
        return true;
    };
    JGUtil.homing = function homing(p1, p2, speed, t) {
        var m1 = JGUtil.getMargin(p1);
        var m2 = JGUtil.getMargin(p2);
        var p = {
            x: p2.x + m2.x - m1.x,
            y: p2.y + m2.y - m1.y
        };
        var xng, yng;
        if(p1.x > p.x) {
            p1.x -= speed * t;
            if(p1.x < p.x) {
                p1.x = p.x;
            } else {
                xng = true;
            }
        } else if(p1.x < p.x) {
            p1.x += speed * t;
            if(p1.x > p.x) {
                p1.x = p.x;
            } else {
                xng = true;
            }
        }
        if(p1.y > p.y) {
            p1.y -= speed * t;
            if(p1.y < p.y) {
                p1.y = p.y;
            } else {
                yng = true;
            }
        } else if(p1.y < p.y) {
            p1.y += speed * t;
            if(p1.y > p.y) {
                p1.y = p.y;
            } else {
                yng = true;
            }
        }
        return xng || yng ? false : true;
    };
    JGUtil.orderDrawY = function orderDrawY() {
        var e = this.entities, len = e.length;
        for(var i = 1; i < len; i++) {
            for(var j = i; j > 0; j--) {
                if(e[j].y >= e[j - 1].y) {
                    break;
                }
                var tmp = e[j];
                e[j] = e[j - 1];
                e[j - 1] = tmp;
            }
        }
    };
    JGUtil.createLinearGradient = function createLinearGradient(rect, colors, offsets) {
        var canvas = window.createCanvas(1, 1);
        var context = canvas.getContext("2d");
        if(typeof rect == "number") {
            rect = new Rectangle(arguments[0], arguments[1], arguments[2], arguments[3]);
            colors = arguments[4];
            offsets = arguments[5];
        }
        if(offsets == undefined) {
            offsets = [];
            var p = 1 / (colors.length - 1);
            for(var i = 0; i < colors.length; i++) {
                offsets.push(i * p);
            }
        }
        var gradient = context.createLinearGradient(rect.left, rect.top, rect.right, rect.bottom);
        for(var i = 0; i < colors.length; i++) {
            gradient.addColorStop(offsets[i], colors[i]);
        }
        return gradient;
    };
    JGUtil.createRadialGradient = function createRadialGradient(rect, radius1, radius2, colors, offsets) {
        var canvas = window.createCanvas(1, 1);
        var context = canvas.getContext("2d");
        if(typeof rect == "number") {
            rect = new Rectangle(arguments[0], arguments[1], arguments[2], arguments[3]);
            radius1 = arguments[4];
            radius2 = arguments[5];
            colors = arguments[6];
            offsets = arguments[7];
        }
        if(offsets == undefined) {
            offsets = [];
            var p = 1 / (colors.length - 1);
            for(var i = 0; i < colors.length; i++) {
                offsets.push(i * p);
            }
        }
        var gradient = context.createRadialGradient(rect.left, rect.top, radius1, rect.right, rect.bottom, radius2);
        for(var i = 0; i < colors.length; i++) {
            gradient.addColorStop(offsets[i], colors[i]);
        }
        return gradient;
    };
    JGUtil.createPattern = function createPattern(image, repeat) {
        var canvas = window.createCanvas(1, 1);
        var context = canvas.getContext("2d");
        return context.createPattern(image, repeat == undefined ? "repeat" : repeat);
    };
    JGUtil.getBrowser = function getBrowser() {
        if(JGUtil.browser) {
            return JGUtil.browser;
        }
        var ua = navigator.userAgent.toLowerCase();
        var match = /(chrome)[ \/]([\w.]+)/.exec(ua) || /(webkit)[ \/]([\w.]+)/.exec(ua) || /(opera)(?:.*version|)[ \/]([\w.]+)/.exec(ua) || /(msie) ([\w.]+)/.exec(ua) || ua.indexOf("compatible") < 0 && /(mozilla)(?:.*? rv:([\w.]+)|)/.exec(ua) || [];
        var ret = {
        };
        if(match[1]) {
            ret[match[1]] = true;
            ret["version"] = match[2];
        }
        if(ret.chrome) {
            ret.webkit = true;
        } else if(ret.webkit) {
            ret.safari = true;
        }
        JGUtil.browser = ret;
        return ret;
    };
    JGUtil.setCrispEdges = function setCrispEdges(game, crispEdges) {
        if(crispEdges) {
            window["imageSmoothingEnabled"] = crispEdges;
        } else {
            delete window["imageSmoothingEnabled"];
        }
        game.refresh();
    };
    return JGUtil;
})();
var Line = (function (_super) {
    __extends(Line, _super);
    function Line(pos, line, color, width) {
        _super.call(this);
        this.x = pos.x;
        this.y = pos.y;
        this.p = new Array();
        this.p.push({
            x: pos.x,
            y: pos.y
        });
        if(line) {
            this.p.push({
                x: line.x,
                y: line.y
            });
            this.updateSize();
        }
        if(color) {
            this.setColor(color);
        }
        if(width) {
            this.setLineWidth(width);
        }
    }
    Line.prototype.setClip = function (value) {
        this.clip = value;
        if(this.clip) {
            this.disableTransform = true;
        } else {
            delete this.disableTransform;
        }
    };
    Line.prototype.updateSize = function () {
        var min = {
            x: this.p[0].x,
            y: this.p[0].y
        };
        var max = {
            x: this.p[0].x,
            y: this.p[0].y
        };
        for(var i = 1; i < this.p.length; i++) {
            var x = this.p[0].x + this.p[i].x;
            var y = this.p[0].y + this.p[i].y;
            if(min.x > x) {
                min.x = x;
            } else if(max.x < x) {
                max.x = x;
            }
            if(min.y > y) {
                min.y = y;
            } else if(max.y < y) {
                max.y = y;
            }
        }
        this.width = max.x - min.x;
        this.height = max.y - min.y;
    };
    Line.prototype.setColor = function (color) {
        this.setDrawOption("strokeStyle", color);
        return this;
    };
    Line.prototype.getColor = function () {
        return this.getDrawOption("strokeStyle");
    };
    Line.prototype.setFillColor = function (color) {
        this.setDrawOption("fillStyle", color);
        return this;
    };
    Line.prototype.getFillColor = function () {
        return this.getDrawOption("fillStyle");
    };
    Line.prototype.setLineWidth = function (width) {
        this.setDrawOption("lineWidth", width);
        return this;
    };
    Line.prototype.getLineWidth = function () {
        return this.getDrawOption("lineWidth");
    };
    Line.prototype.setLineCap = function (lineCap) {
        this.setDrawOption("lineCap", lineCap);
        return this;
    };
    Line.prototype.getLineCap = function () {
        return this.getDrawOption("lineCap");
    };
    Line.prototype.setLineJoin = function (lineJoin) {
        this.setDrawOption("lineJoin", lineJoin);
        return this;
    };
    Line.prototype.getLineJoin = function () {
        return this.getDrawOption("lineJoin");
    };
    Line.prototype.setMiterLimit = function (miterLimit) {
        this.setDrawOption("miterLimit", miterLimit);
        return this;
    };
    Line.prototype.getMiterLimit = function () {
        return this.getDrawOption("miterLimit");
    };
    Line.prototype.setFill = function (fill, color, closePath, stroke) {
        this.fill = fill;
        this.setFillColor(color);
        if(closePath !== undefined) {
            this.closePath = closePath;
        }
        if(stroke !== undefined) {
            this.stroke = stroke;
        }
        return this;
    };
    Line.prototype.addLine = function (line, y) {
        if(arguments.length == 2) {
            line = {
                x: line,
                y: y
            };
        }
        this.p.push(line);
        this.updateSize();
        return this;
    };
    Line.prototype.addQuadraticLine = function (cp, p) {
        var qp;
        if(arguments.length == 4) {
            qp = {
                cp1x: arguments[0],
                cp1y: arguments[1],
                x: arguments[2],
                y: arguments[3]
            };
        } else if(arguments.length == 2) {
            qp = {
                cp1x: cp.x,
                cp1y: cp.y,
                x: p.x,
                y: p.y
            };
        } else {
            qp = cp;
        }
        this.p.push(qp);
        this.updateSize();
        return this;
    };
    Line.prototype.addBezierLine = function (cp1, cp2, p) {
        var bp;
        if(arguments.length == 6) {
            bp = {
                cp1x: arguments[0],
                cp1y: arguments[1],
                cp2x: arguments[2],
                cp2y: arguments[3],
                x: arguments[4],
                y: arguments[5]
            };
        } else if(arguments.length == 3) {
            bp = {
                cp1x: cp1.x,
                cp1y: cp1.y,
                cp2x: cp2.x,
                cp2y: cp2.y,
                x: p.x,
                y: p.y
            };
        } else {
            bp = cp1;
        }
        this.p.push(bp);
        this.updateSize();
        return this;
    };
    Line.prototype.addArc = function (p, p2, radius) {
        var ap;
        if(arguments.length == 5) {
            ap = {
                x: arguments[0],
                y: arguments[1],
                x2: arguments[2],
                y2: arguments[3],
                radius: arguments[4]
            };
        } else if(arguments.length == 3) {
            ap = {
                x: p.x,
                y: p.y,
                x2: p2.x,
                y2: p2.y,
                radius: radius
            };
        } else {
            ap = p;
        }
        this.p.push(ap);
        this.updateSize();
    };
    Line.prototype.add = function () {
        if(arguments.length == 1) {
            return this.addLine.apply(this, arguments);
        }
        if(arguments.length == 2) {
            return this.addQuadraticLine.apply(this, arguments);
        }
        if(arguments.length == 3) {
            return this.addBezierLine.apply(this, arguments);
        }
        throw "invalid arguments";
    };
    Line.prototype.draw = function (context) {
        context.beginPath();
        if(this.clip) {
            context.save();
            context.translate(this.x, this.y);
            if(this.options) {
                this.scene.game.renderer.useDrawOption(this, context);
            }
        }
        context.moveTo(0, 0);
        for(var i = 1; i < this.p.length; i++) {
            var p = this.p[i];
            if(p.cp2x !== undefined) {
                context.bezierCurveTo(p.cp1x, p.cp1y, p.cp2x, p.cp2y, p.x, p.y);
            } else if(p.cp1x !== undefined) {
                context.quadraticCurveTo(p.cp1x, p.cp1y, p.x, p.y);
            } else {
                if((this.p[i]).radius !== undefined) {
                    var ap = this.p[i];
                    context.arcTo(ap.x, ap.y, ap.x2, ap.y2, ap.radius);
                } else {
                    context.lineTo(p.x, p.y);
                }
            }
        }
        if(this.closePath) {
            context.closePath();
        }
        if(this.clip) {
            context.restore();
            context.clip();
        } else if(this.fill) {
            context.fill();
            if(this.stroke) {
                context.stroke();
            }
        } else {
            context.stroke();
        }
    };
    return Line;
})(E);
var EffectType;
(function (EffectType) {
    EffectType._map = [];
    EffectType._map[0] = "None";
    EffectType.None = 0;
    EffectType._map[1] = "Fade";
    EffectType.Fade = 1;
    EffectType._map[2] = "Mosaic";
    EffectType.Mosaic = 2;
    EffectType._map[3] = "Blur";
    EffectType.Blur = 3;
    EffectType._map[4] = "SlideUp";
    EffectType.SlideUp = 4;
    EffectType._map[5] = "SlideDown";
    EffectType.SlideDown = 5;
    EffectType._map[6] = "SlideLeft";
    EffectType.SlideLeft = 6;
    EffectType._map[7] = "SlideRight";
    EffectType.SlideRight = 7;
    EffectType._map[8] = "WipeUp";
    EffectType.WipeUp = 8;
    EffectType._map[9] = "WipeDown";
    EffectType.WipeDown = 9;
    EffectType._map[10] = "WipeLeft";
    EffectType.WipeLeft = 10;
    EffectType._map[11] = "WipeRight";
    EffectType.WipeRight = 11;
    EffectType._map[12] = "WipeFadeUp";
    EffectType.WipeFadeUp = 12;
    EffectType._map[13] = "WipeFadeDown";
    EffectType.WipeFadeDown = 13;
    EffectType._map[14] = "WipeFadeLeft";
    EffectType.WipeFadeLeft = 14;
    EffectType._map[15] = "WipeFadeRight";
    EffectType.WipeFadeRight = 15;
    EffectType._map[16] = "BoxOut";
    EffectType.BoxOut = 16;
    EffectType._map[17] = "BoxOut45";
    EffectType.BoxOut45 = 17;
    EffectType._map[18] = "BoxIn";
    EffectType.BoxIn = 18;
    EffectType._map[19] = "BoxIn45";
    EffectType.BoxIn45 = 19;
    EffectType._map[20] = "ArcOut";
    EffectType.ArcOut = 20;
    EffectType._map[21] = "ArcIn";
    EffectType.ArcIn = 21;
    EffectType._map[22] = "BoxOutBlack";
    EffectType.BoxOutBlack = 22;
    EffectType._map[23] = "BoxOut45Black";
    EffectType.BoxOut45Black = 23;
    EffectType._map[24] = "BoxInBlack";
    EffectType.BoxInBlack = 24;
    EffectType._map[25] = "BoxIn45Black";
    EffectType.BoxIn45Black = 25;
    EffectType._map[26] = "ArcOutBlack";
    EffectType.ArcOutBlack = 26;
    EffectType._map[27] = "ArcInBlack";
    EffectType.ArcInBlack = 27;
    EffectType._map[28] = "BoxOutWhite";
    EffectType.BoxOutWhite = 28;
    EffectType._map[29] = "BoxOut45White";
    EffectType.BoxOut45White = 29;
    EffectType._map[30] = "BoxInWhite";
    EffectType.BoxInWhite = 30;
    EffectType._map[31] = "BoxIn45White";
    EffectType.BoxIn45White = 31;
    EffectType._map[32] = "ArcOutWhite";
    EffectType.ArcOutWhite = 32;
    EffectType._map[33] = "ArcInWhite";
    EffectType.ArcInWhite = 33;
})(EffectType || (EffectType = {}));
var Effect = (function () {
    function Effect(method) {
        this.method = method;
        this.arguments = [];
        for(var i = 1; i < arguments.length; i++) {
            this.arguments.push(arguments[i]);
        }
    }
    Effect.time = 1000;
    Effect.sceneEffect = function sceneEffect(game, scene1, scene2, type, callback, endOldScene) {
        var effect = new EffectScene(game, scene1, scene2);
        if(endOldScene) {
            game.endScene();
            if(game._exit) {
                return;
            }
        }
        game.changeScene(effect);
        effect.effected.handle(game, callback);
        if(typeof type == "number") {
            switch(type) {
                case EffectType.Fade:
                    effect.fade(Effect.color);
                    break;
                case EffectType.Mosaic:
                    effect.mosaic();
                    break;
                case EffectType.Blur:
                    effect.blur();
                    break;
                case EffectType.SlideUp:
                    effect.slide(Angle.up);
                    break;
                case EffectType.SlideDown:
                    effect.slide(Angle.down);
                    break;
                case EffectType.SlideLeft:
                    effect.slide(Angle.left);
                    break;
                case EffectType.SlideRight:
                    effect.slide(Angle.right);
                    break;
                case EffectType.WipeUp:
                    effect.wipe(Angle.up);
                    break;
                case EffectType.WipeDown:
                    effect.wipe(Angle.down);
                    break;
                case EffectType.WipeLeft:
                    effect.wipe(Angle.left);
                    break;
                case EffectType.WipeRight:
                    effect.wipe(Angle.right);
                    break;
                case EffectType.WipeFadeUp:
                    effect.wipeFade(Angle.up);
                    break;
                case EffectType.WipeFadeDown:
                    effect.wipeFade(Angle.down);
                    break;
                case EffectType.WipeFadeLeft:
                    effect.wipeFade(Angle.left);
                    break;
                case EffectType.WipeFadeRight:
                    effect.wipeFade(Angle.right);
                    break;
                case EffectType.BoxOut:
                    effect.boxOut(0, Effect.color);
                    break;
                case EffectType.BoxOut45:
                    effect.boxOut(45, Effect.color);
                    break;
                case EffectType.BoxIn:
                    effect.boxIn(0, Effect.color);
                    break;
                case EffectType.BoxIn45:
                    effect.boxIn(45, Effect.color);
                    break;
                case EffectType.ArcIn:
                    effect.arcIn(Effect.color);
                    break;
                case EffectType.ArcOut:
                    effect.arcOut(Effect.color);
                    break;
            }
        } else {
            type.callEffect(effect);
        }
    };
    Effect.prototype.callEffect = function (scene) {
        scene[this.method].apply(scene, this.arguments);
    };
    return Effect;
})();
var EffectScene = (function (_super) {
    __extends(EffectScene, _super);
    function EffectScene(game, scene1, scene2) {
        _super.call(this, game);
        var sp1 = this.captureScene(scene1);
        var sp2 = this.captureScene(scene2);
        sp2.setDrawOption("globalAlpha", 0);
        sp1.x = sp1.y = sp2.x = sp2.y = 0;
        this.append(sp1);
        this.append(sp2);
        this.sp1 = sp1;
        this.sp2 = sp2;
        this.effected = new Trigger();
    }
    EffectScene.prototype.captureScene = function (scene) {
        var buffer = new BufferedRenderer(this.game);
        buffer.renderScene(scene);
        return buffer.createSprite();
    };
    EffectScene.prototype.fade = function (color) {
        var _this = this;
        if(color) {
            this._fadeColor(color);
            return;
        }
        this.sp1.tl().fadeOut(Effect.time).removeFromScene();
        this.sp2.tl().fadeIn(Effect.time).then(function () {
            _this.effected.fire();
        });
    };
    EffectScene.prototype._fadeColor = function (color) {
        var _this = this;
        var shape = new Shape(this.sp1.width, this.sp1.height, ShapeStyle.fill, color);
        shape.setDrawOption("globalAlpha", 0);
        this.root.append(shape);
        var t = Effect.time / 2;
        this.sp1.tl().fadeOut(t);
        shape.tl().fadeIn(t).fadeOut(t).removeFromScene();
        this.sp2.tl().delay(t).fadeIn(t).then(function () {
            _this.effected.fire();
        });
    };
    EffectScene.prototype.mosaic = function () {
        var _this = this;
        var t = Effect.time / 2;
        this.sp1.tl().filter(ImageFilter.MosaicFilter, {
            size: {
                start: 1,
                end: 64
            }
        }, t).removeFromScene();
        this.sp2.tl().delay(t).show().filter(ImageFilter.MosaicFilter, {
            size: {
                start: 64,
                end: 1
            }
        }, t).then(function () {
            _this.effected.fire();
        });
    };
    EffectScene.prototype.blur = function () {
        var _this = this;
        var t = Effect.time / 2;
        this.sp1.tl().filter(ImageFilter.BlurFilter, {
            amount: {
                start: 1,
                end: 20
            }
        }, t, Easing.CUBIC_EASEIN).removeFromScene();
        this.sp2.tl().delay(t).show().filter(ImageFilter.BlurFilter, {
            amount: {
                start: 20,
                end: 1
            }
        }, t, Easing.CUBIC_EASEOUT).then(function () {
            _this.effected.fire();
        });
    };
    EffectScene.prototype.slide = function (angle) {
        var _this = this;
        var t = Effect.time;
        switch(angle) {
            case Angle.up:
                this.sp1.tl().moveTo(0, -this.game.height, t).removeFromScene();
                this.sp2.moveTo(0, this.game.height);
                this.sp2.tl().show().moveTo(0, 0, t);
                break;
            case Angle.down:
                this.sp1.tl().moveTo(0, this.game.height, t).removeFromScene();
                this.sp2.moveTo(0, -this.game.height);
                this.sp2.tl().show().moveTo(0, 0, t);
                break;
            case Angle.left:
                this.sp1.tl().moveTo(-this.game.width, 0, t).removeFromScene();
                this.sp2.moveTo(this.game.width, 0);
                this.sp2.tl().show().moveTo(0, 0, t);
                break;
            case Angle.right:
                this.sp1.tl().moveTo(this.game.width, 0, t).removeFromScene();
                this.sp2.moveTo(-this.game.width, 0);
                this.sp2.tl().show().moveTo(0, 0, t);
                break;
        }
        this.sp2.tl().then(function () {
            _this.effected.fire();
        });
    };
    EffectScene.prototype.wipe = function (angle) {
        var _this = this;
        var t = Effect.time;
        this.sp2.tl().show();
        var sp = new Shape(this.game.width, 1, ShapeStyle.fill);
        sp.moveTo(0, 0);
        sp.setClip(true);
        this.root.insert(sp, 1);
        switch(angle) {
            case Angle.up:
                sp.width = this.game.width;
                sp.height = 1;
                sp.y = this.game.height;
                sp.tl().resizeTo(this.game.width, this.game.height, t).and().moveTo(0, 0, t);
                break;
            case Angle.down:
                sp.width = this.game.width;
                sp.height = 1;
                sp.tl().resizeTo(this.game.width, this.game.height, t);
                break;
            case Angle.left:
                sp.width = 1;
                sp.height = this.game.height;
                sp.x = this.game.width;
                sp.tl().resizeTo(this.game.width, this.game.height, t).and().moveTo(0, 0, t);
                break;
            case Angle.right:
                sp.width = 1;
                sp.height = this.game.height;
                sp.tl().resizeTo(this.game.width, this.game.height, t);
                break;
        }
        sp.tl().then(function () {
            _this.effected.fire();
        });
    };
    EffectScene.prototype.wipeFade = function (angle) {
        this.wipe(angle);
        this.sp1.tl().fadeOut(Effect.time);
    };
    EffectScene.prototype.boxOut = function (rotate, color) {
        var _this = this;
        var t = Effect.time;
        this.sp2.tl().fadeIn(t);
        var sp = new Shape(1, 1, ShapeStyle.fill);
        sp.moveTo(this.game.width / 2, this.game.height / 2);
        sp.setClip(true);
        if(rotate) {
            sp.setDrawOption("rotate", rotate);
        }
        this.root.insert(sp, 1);
        if(color) {
            var bg = new Shape(this.game.width, this.game.height, ShapeStyle.fill, color);
            this.root.insert(bg, 1);
            bg.setDrawOption("globalAlpha", 0);
            bg.tl().fadeIn(t * 0.6);
        }
        if(rotate) {
            sp.tl().resizeTo(this.game.width * 2, this.game.height * 2, t).and().moveTo(-this.game.width / 2, -this.game.height / 2, t);
        } else {
            sp.tl().resizeTo(this.game.width, this.game.height, t).and().moveTo(0, 0, t);
        }
        sp.tl().then(function () {
            _this.effected.fire();
        });
    };
    EffectScene.prototype.boxIn = function (rotate, color) {
        var _this = this;
        this.swapScene();
        var t = Effect.time;
        this.sp2.tl().fadeIn(t);
        var sp = new Shape(1, 1, ShapeStyle.fill);
        if(rotate) {
            sp.moveTo(-this.game.width / 2, -this.game.height / 2);
            sp.width = this.game.width * 2;
            sp.height = this.game.height * 2;
        } else {
            sp.moveTo(0, 0);
            sp.width = this.game.width;
            sp.height = this.game.height;
        }
        sp.setClip(true);
        if(rotate) {
            sp.setDrawOption("rotate", rotate);
        }
        this.root.insert(sp, 1);
        if(color) {
            var bg = new Shape(sp.width, sp.height, ShapeStyle.fill, color);
            bg.moveTo(sp.x, sp.y);
            this.root.append(bg);
            bg.setDrawOption("globalAlpha", 0);
            bg.tl().fadeIn(t * 0.8).and().resizeTo(1, 1, t).and().moveTo(this.game.width / 2, this.game.height / 2, t);
            if(rotate) {
                bg.setDrawOption("rotate", rotate);
            }
        } else {
            this.sp1.tl().fadeOut(t);
        }
        sp.tl().resizeTo(1, 1, t).and().moveTo(this.game.width / 2, this.game.height / 2, t);
        sp.tl().then(function () {
            _this.effected.fire();
        });
    };
    EffectScene.prototype.arcOut = function (color) {
        var _this = this;
        var t = Effect.time;
        this.sp2.tl().fadeIn(t);
        var sp = new Shape(1, 1, ShapeStyle.fill, "black", ShapeType.arc);
        sp.moveTo(this.game.width / 2, this.game.height / 2);
        sp.setClip(true);
        this.root.insert(sp, 1);
        if(color) {
            var bg = new Shape(this.game.width, this.game.height, ShapeStyle.fill, color);
            this.root.insert(bg, 1);
            bg.setDrawOption("globalAlpha", 0);
            bg.tl().fadeIn(t * 0.6);
        }
        sp.tl().resizeTo(this.game.width * 2, this.game.height * 2, t).and().moveTo(-this.game.width / 2, -this.game.height / 2, t);
        sp.tl().then(function () {
            _this.effected.fire();
        });
    };
    EffectScene.prototype.arcIn = function (color) {
        var _this = this;
        this.swapScene();
        var t = Effect.time;
        this.sp2.tl().fadeIn(t);
        var sp = new Shape(1, 1, ShapeStyle.fill, "black", ShapeType.arc);
        sp.moveTo(-this.game.width / 2, -this.game.height / 2);
        sp.width = this.game.width * 2;
        sp.height = this.game.height * 2;
        sp.setClip(true);
        this.root.insert(sp, 1);
        if(color) {
            var bg = new Shape(sp.width, sp.height, ShapeStyle.fill, color);
            bg.moveTo(sp.x, sp.y);
            this.root.append(bg);
            bg.setDrawOption("globalAlpha", 0);
            bg.tl().fadeIn(t * 0.9).and().resizeTo(1, 1, t).and().moveTo(this.game.width / 2, this.game.height / 2, t);
        } else {
            this.sp1.tl().fadeOut(t);
        }
        sp.tl().resizeTo(1, 1, t).and().moveTo(this.game.width / 2, this.game.height / 2, t);
        sp.tl().then(function () {
            _this.effected.fire();
        });
    };
    EffectScene.prototype.universal = function (image, repeat) {
        var _this = this;
        var t = Effect.time;
        this.swapScene();
        this.sp1.tl().filter(ImageFilter.UniversalTransitionFilter, {
            image: image,
            repeat: repeat,
            amount: {
                start: -255,
                end: 255
            }
        }, t).removeFromScene();
        this.sp2.tl().show().delay(t).then(function () {
            _this.effected.fire();
        });
    };
    EffectScene.prototype.universalTwin = function (image, repeat) {
        var _this = this;
        var t = Effect.time;
        this.sp1.tl().filter(ImageFilter.UniversalTransitionFilter, {
            image: image,
            repeat: repeat,
            amount: {
                start: -255,
                end: 255
            }
        }, t).removeFromScene();
        this.sp2.tl().show().filter(ImageFilter.UniversalTransitionFilter, {
            image: image,
            repeat: repeat,
            amount: {
                start: 255,
                end: -255
            }
        }, t).then(function () {
            _this.effected.fire();
        });
    };
    EffectScene.prototype.universalDelay = function (image, repeat, color) {
        var _this = this;
        var t = Effect.time / 2;
        var shape = new Shape(this.sp1.width, this.sp1.height, ShapeStyle.fill, color);
        shape.setDrawOption("globalAlpha", 0);
        this.root.insert(shape, 0);
        this.sp1.tl().filter(ImageFilter.UniversalTransitionFilter, {
            image: image,
            repeat: repeat,
            amount: {
                start: -255,
                end: 255
            }
        }, t).removeFromScene();
        shape.tl().fadeIn(t).delay(t).removeFromScene();
        this.sp2.tl().delay(t).show().filter(ImageFilter.UniversalTransitionFilter, {
            image: image,
            repeat: repeat,
            amount: {
                start: 255,
                end: -255
            }
        }, t).then(function () {
            _this.effected.fire();
        });
    };
    EffectScene.prototype.getFilter = function (target) {
        if(!target.filter) {
            target.filter = new ImageFilter.FilterChain();
        }
        return target.filter;
    };
    EffectScene.prototype.swapScene = function () {
        var tmp = this.root.entities[0];
        this.root.entities[0] = this.root.entities[1];
        this.root.entities[1] = tmp;
    };
    return EffectScene;
})(Scene);
var MessageWindow = (function (_super) {
    __extends(MessageWindow, _super);
    function MessageWindow(size, noDefault) {
        _super.call(this);
        this.width = size.width;
        this.height = size.height;
        this.textClip = new Shape(this.width, this.height);
        this.textClip.setClip(true);
        this.padding = new Rectangle(8, 8, 8, 8);
        this.entities = [
            null, 
            null, 
            this.textClip, 
            null
        ];
        if(!noDefault) {
            this.defaultSkin();
        }
        this.normalSpeed = 400;
        this.fastSpeed = 800;
        this.readed = new Trigger();
        this.isReaded = true;
        this.hasNextCursor = false;
    }
    MessageWindow.prototype._activate = function (e) {
        e.scene = this.scene;
        e.parent = this;
        e.activate();
    };
    MessageWindow.prototype.getBg = function () {
        return this.entities[0];
    };
    MessageWindow.prototype.setBg = function (bg) {
        if(this.entities[0]) {
            this.entities[0].destroy();
        }
        this.entities[0] = bg;
        this._activate(bg);
    };
    MessageWindow.prototype.getTextBg = function () {
        return this.entities[1];
    };
    MessageWindow.prototype.setTextBg = function (textWindow) {
        if(this.entities[1]) {
            this.entities[1].destroy();
        }
        this.entities[1] = textWindow;
        this._activate(textWindow);
    };
    MessageWindow.prototype.getTextArea = function () {
        return this.entities[3];
    };
    MessageWindow.prototype.setTextArea = function (textArea) {
        if(this.entities[3]) {
            this.entities[3].destroy();
        }
        this.entities[3] = textArea;
        this.textClip.moveTo(textArea.x, textArea.y);
        this.textClip.width = textArea.width;
        this.textClip.height = textArea.height;
        this._activate(textArea);
    };
    MessageWindow.prototype.getNextCursor = function () {
        return this.nextCursor;
    };
    MessageWindow.prototype.setNextCursor = function (cursor) {
        this.nextCursor = cursor;
    };
    MessageWindow.prototype.setText = function (text, offset) {
        var textArea = this.getTextArea();
        this.scriptOffset = textArea.setText(text, offset);
        this.script = textArea.script;
        textArea.hideAll();
        this.deleteNextCursor();
        this.isReaded = false;
        return this.scriptOffset;
    };
    MessageWindow.prototype.setScript = function (script, offset) {
        var textArea = this.getTextArea();
        this.script = script;
        this.scriptOffset = textArea.setScript(script, offset);
        textArea.hideAll();
        this.deleteNextCursor();
        this.isReaded = false;
        return this.scriptOffset;
    };
    MessageWindow.prototype.defaultSkin = function () {
        if(this.entities) {
            var childEntity;
            while(childEntity = this.entities.pop()) {
                childEntity.destroy();
            }
        }
        var bgColor = JGUtil.createLinearGradient(new Rectangle(0, 0, this.width, this.height), [
            "rgba(138,193,255,0.5)", 
            "rgba(222, 235, 250, 0.5)"
        ]);
        var bg = new Shape(this.width, this.height, ShapeStyle.fill, bgColor);
        this.setBg(bg);
        var textBg = new Shape(this.width - (this.padding.left + this.padding.right), this.height - (this.padding.top + this.padding.bottom), ShapeStyle.fill, "rgba(45,73,136,0.2)");
        textBg.moveTo(this.padding.left, this.padding.top);
        this.setTextBg(textBg);
        var textArea = new MultilineText({
            width: textBg.width - 8,
            height: textBg.height - 4
        }, {
            x: textBg.x + 4,
            y: textBg.y + 2
        });
        textArea.animated.handle(this, this.onAnimated);
        this.setTextArea(textArea);
        var cursor = new Line({
            x: 0,
            y: 0
        }, {
            x: 6,
            y: 8
        });
        cursor.addLine(12, 0);
        cursor.closePath = true;
        cursor.fill = true;
        cursor.setFillColor("rgba(255, 255, 255, 0.8)");
        cursor.width = 12;
        cursor.height = 8;
        this.nextCursor = cursor;
    };
    MessageWindow.prototype.showNextCursor = function () {
        if(this.hasNextCursor) {
            return;
        }
        var nextCursor = this.nextCursor.createSprite();
        var textArea = this.getTextArea();
        var lastLine = textArea.lines[textArea.lines.length - 1];
        nextCursor.moveTo(this.width / 2 - nextCursor.width / 2, this.height - nextCursor.height - this.padding.bottom - 4);
        nextCursor.tl().moveBy(0, 4, 500).moveBy(0, -4, 500).delay(500).loop();
        this.append(nextCursor);
        this.hasNextCursor = true;
    };
    MessageWindow.prototype.deleteNextCursor = function () {
        if(this.hasNextCursor) {
            this.entities[4].remove();
            this.hasNextCursor = false;
        }
    };
    MessageWindow.prototype.hide = function (fade) {
        if(fade) {
            this.tl().fadeOut(200);
        } else {
            this.setDrawOption("globalAlpha", 0);
        }
    };
    MessageWindow.prototype.show = function (fade) {
        if(fade) {
            this.tl().fadeIn(200);
        } else {
            this.removeDrawOption("globalAlpha");
        }
    };
    MessageWindow.prototype.showText = function () {
        var textArea = this.getTextArea();
        textArea.startAnimation();
    };
    MessageWindow.prototype.fastMode = function () {
        var textArea = this.getTextArea();
        textArea.animeSpeed = this.fastSpeed;
    };
    MessageWindow.prototype.normalMode = function () {
        var textArea = this.getTextArea();
        textArea.animeSpeed = this.normalSpeed;
    };
    MessageWindow.prototype.showAll = function () {
        var textArea = this.getTextArea();
        textArea.showAll();
    };
    MessageWindow.prototype.next = function () {
        if(this.scriptOffset < 0) {
            return false;
        }
    };
    MessageWindow.prototype.oldWipeOut = function (time) {
        if(time === undefined) {
            time = 800;
        }
        var textArea = this.getTextArea();
        var old = textArea.createSprite();
        old.moveTo(textArea.x, textArea.y);
        this.append(old);
        var lastLine = textArea.lines[textArea.lines.length - 1];
        var movePoint = lastLine.offsetY + lastLine.height;
        textArea.moveTo(textArea.x, textArea.y + movePoint);
        old.tl().moveBy(0, -textArea.height, time).removeFromScene();
        textArea.tl().moveBy(0, -movePoint, (movePoint / textArea.height) * time);
    };
    MessageWindow.prototype.oldFadeOut = function (time) {
        if(time === undefined) {
            time = 500;
        }
        var textArea = this.getTextArea();
        var old = textArea.createSprite();
        old.moveTo(textArea.x, textArea.y);
        this.append(old);
        old.tl().fadeOut(time).removeFromScene();
    };
    MessageWindow.prototype.onAnimated = function () {
        var hasNext = this.scriptOffset >= 0;
        if(hasNext) {
            this.showNextCursor();
        }
        this.isReaded = true;
        this.readed.fire(hasNext);
    };
    return MessageWindow;
})(E);
