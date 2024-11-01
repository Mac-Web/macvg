pc.extend(pc,function(){var t=function(t){this._app=t,this._tweens=[],this._add=[]};t.prototype={add:function(t){return this._add.push(t),t},update:function(t){for(var i=0,e=this._tweens.length;i<e;)this._tweens[i].update(t)?i++:(this._tweens.splice(i,1),e--);this._add.length&&(this._tweens=this._tweens.concat(this._add),this._add.length=0)}};var i=function(t,i,e){pc.events.attach(this),this.manager=i,e&&(this.entity=null),this.time=0,this.complete=!1,this.playing=!1,this.stopped=!0,this.pending=!1,this.target=t,this.duration=0,this._currentDelay=0,this.timeScale=1,this._reverse=!1,this._delay=0,this._yoyo=!1,this._count=0,this._numRepeats=0,this._repeatDelay=0,this._from=!1,this._slerp=!1,this._fromQuat=new pc.Quat,this._toQuat=new pc.Quat,this._quat=new pc.Quat,this.easing=pc.EASE_LINEAR,this._sv={},this._ev={}},e=function(t){var i;return t instanceof pc.Vec2?i={x:t.x,y:t.y}:t instanceof pc.Vec3?i={x:t.x,y:t.y,z:t.z}:t instanceof pc.Vec4?i={x:t.x,y:t.y,z:t.z,w:t.w}:t instanceof pc.Quat?i={x:t.x,y:t.y,z:t.z,w:t.w}:t instanceof pc.Color?(i={r:t.r,g:t.g,b:t.b},void 0!==t.a&&(i.a=t.a)):i=t,i};i.prototype={to:function(t,i,n,s,r,h){return this._properties=e(t),this.duration=i,n&&(this.easing=n),s&&this.delay(s),r&&this.repeat(r),h&&this.yoyo(h),this},from:function(t,i,n,s,r,h){return this._properties=e(t),this.duration=i,n&&(this.easing=n),s&&this.delay(s),r&&this.repeat(r),h&&this.yoyo(h),this._from=!0,this},rotate:function(t,i,n,s,r,h){return this._properties=e(t),this.duration=i,n&&(this.easing=n),s&&this.delay(s),r&&this.repeat(r),h&&this.yoyo(h),this._slerp=!0,this},start:function(){var t,i,e,n;if(this.playing=!0,this.complete=!1,this.stopped=!1,this._count=0,this.pending=this._delay>0,this._reverse&&!this.pending?this.time=this.duration:this.time=0,this._from){for(t in this._properties)this._properties.hasOwnProperty(t)&&(this._sv[t]=this._properties[t],this._ev[t]=this.target[t]);this._slerp&&(this._toQuat.setFromEulerAngles(this.target.x,this.target.y,this.target.z),i=void 0!==this._properties.x?this._properties.x:this.target.x,e=void 0!==this._properties.y?this._properties.y:this.target.y,n=void 0!==this._properties.z?this._properties.z:this.target.z,this._fromQuat.setFromEulerAngles(i,e,n))}else{for(t in this._properties)this._properties.hasOwnProperty(t)&&(this._sv[t]=this.target[t],this._ev[t]=this._properties[t]);this._slerp&&(this._fromQuat.setFromEulerAngles(this.target.x,this.target.y,this.target.z),i=void 0!==this._properties.x?this._properties.x:this.target.x,e=void 0!==this._properties.y?this._properties.y:this.target.y,n=void 0!==this._properties.z?this._properties.z:this.target.z,this._toQuat.setFromEulerAngles(i,e,n))}return this._currentDelay=this._delay,this.manager.add(this),this},pause:function(){this.playing=!1},resume:function(){this.playing=!0},stop:function(){this.playing=!1,this.stopped=!0},delay:function(t){return this._delay=t,this.pending=!0,this},repeat:function(t,i){return this._count=0,this._numRepeats=t,this._repeatDelay=i||0,this},loop:function(t){return t?(this._count=0,this._numRepeats=1/0):this._numRepeats=0,this},yoyo:function(t){return this._yoyo=t,this},reverse:function(){return this._reverse=!this._reverse,this},chain:function(){for(var t=arguments.length;t--;)t>0?arguments[t-1]._chained=arguments[t]:this._chained=arguments[t];return this},update:function(t){if(this.stopped)return!1;if(!this.playing)return!0;if(!this._reverse||this.pending?this.time+=t*this.timeScale:this.time-=t*this.timeScale,this.pending){if(!(this.time>this._currentDelay))return!0;this._reverse?this.time=this.duration-(this.time-this._currentDelay):this.time=this.time-this._currentDelay,this.pending=!1}var i=0;(!this._reverse&&this.time>this.duration||this._reverse&&this.time<0)&&(this._count++,this.complete=!0,this.playing=!1,this._reverse?(i=this.duration-this.time,this.time=0):(i=this.time-this.duration,this.time=this.duration));var e,n,s=this.time/this.duration,r=this.easing(s);for(var h in this._properties)this._properties.hasOwnProperty(h)&&(e=this._sv[h],n=this._ev[h],this.target[h]=e+(n-e)*r);if(this._slerp&&this._quat.slerp(this._fromQuat,this._toQuat,r),this.entity&&(this.entity._dirtifyLocal(),this.element&&this.entity.element&&(this.entity.element[this.element]=this.target),this._slerp&&this.entity.setLocalRotation(this._quat)),this.fire("update",t),this.complete){var a=this._repeat(i);return a?this.fire("loop"):(this.fire("complete",i),this.entity&&this.entity.off("destroy",this.stop,this),this._chained&&this._chained.start()),a}return!0},_repeat:function(t){if(this._count<this._numRepeats){if(this._reverse?this.time=this.duration-t:this.time=t,this.complete=!1,this.playing=!0,this._currentDelay=this._repeatDelay,this.pending=!0,this._yoyo){for(var i in this._properties)tmp=this._sv[i],this._sv[i]=this._ev[i],this._ev[i]=tmp;this._slerp&&(this._quat.copy(this._fromQuat),this._fromQuat.copy(this._toQuat),this._toQuat.copy(this._quat))}return!0}return!1}};var n=function(t){return 1-s(1-t)},s=function(t){return t<1/2.75?7.5625*t*t:t<2/2.75?7.5625*(t-=1.5/2.75)*t+.75:t<2.5/2.75?7.5625*(t-=2.25/2.75)*t+.9375:7.5625*(t-=2.625/2.75)*t+.984375};return{TweenManager:t,Tween:i,Linear:function(t){return t},QuadraticIn:function(t){return t*t},QuadraticOut:function(t){return t*(2-t)},QuadraticInOut:function(t){return(t*=2)<1?.5*t*t:-.5*(--t*(t-2)-1)},CubicIn:function(t){return t*t*t},CubicOut:function(t){return--t*t*t+1},CubicInOut:function(t){return(t*=2)<1?.5*t*t*t:.5*((t-=2)*t*t+2)},QuarticIn:function(t){return t*t*t*t},QuarticOut:function(t){return 1- --t*t*t*t},QuarticInOut:function(t){return(t*=2)<1?.5*t*t*t*t:-.5*((t-=2)*t*t*t-2)},QuinticIn:function(t){return t*t*t*t*t},QuinticOut:function(t){return--t*t*t*t*t+1},QuinticInOut:function(t){return(t*=2)<1?.5*t*t*t*t*t:.5*((t-=2)*t*t*t*t+2)},SineIn:function(t){return 0===t?0:1===t?1:1-Math.cos(t*Math.PI/2)},SineOut:function(t){return 0===t?0:1===t?1:Math.sin(t*Math.PI/2)},SineInOut:function(t){return 0===t?0:1===t?1:.5*(1-Math.cos(Math.PI*t))},ExponentialIn:function(t){return 0===t?0:Math.pow(1024,t-1)},ExponentialOut:function(t){return 1===t?1:1-Math.pow(2,-10*t)},ExponentialInOut:function(t){return 0===t?0:1===t?1:(t*=2)<1?.5*Math.pow(1024,t-1):.5*(2-Math.pow(2,-10*(t-1)))},CircularIn:function(t){return 1-Math.sqrt(1-t*t)},CircularOut:function(t){return Math.sqrt(1- --t*t)},CircularInOut:function(t){return(t*=2)<1?-.5*(Math.sqrt(1-t*t)-1):.5*(Math.sqrt(1-(t-=2)*t)+1)},BackIn:function(t){return t*t*(2.70158*t-1.70158)},BackOut:function(t){return--t*t*(2.70158*t+1.70158)+1},BackInOut:function(t){var i=2.5949095;return(t*=2)<1?t*t*((i+1)*t-i)*.5:.5*((t-=2)*t*((i+1)*t+i)+2)},BounceIn:n,BounceOut:s,BounceInOut:function(t){return t<.5?.5*n(2*t):.5*s(2*t-1)+.5},ElasticIn:function(t){var i,e=.1;return 0===t?0:1===t?1:(!e||e<1?(e=1,i=.1):i=.4*Math.asin(1/e)/(2*Math.PI),-e*Math.pow(2,10*(t-=1))*Math.sin((t-i)*(2*Math.PI)/.4))},ElasticOut:function(t){var i,e=.1;return 0===t?0:1===t?1:(!e||e<1?(e=1,i=.1):i=.4*Math.asin(1/e)/(2*Math.PI),e*Math.pow(2,-10*t)*Math.sin((t-i)*(2*Math.PI)/.4)+1)},ElasticInOut:function(t){var i,e=.1;return 0===t?0:1===t?1:(!e||e<1?(e=1,i=.1):i=.4*Math.asin(1/e)/(2*Math.PI),(t*=2)<1?e*Math.pow(2,10*(t-=1))*Math.sin((t-i)*(2*Math.PI)/.4)*-.5:e*Math.pow(2,-10*(t-=1))*Math.sin((t-i)*(2*Math.PI)/.4)*.5+1)}}}()),function(){pc.Application.prototype.addTweenManager=function(){this._tweenManager=new pc.TweenManager(this),this.on("update",function(t){this._tweenManager.update(t)})},pc.Application.prototype.tween=function(t){return new pc.Tween(t,this._tweenManager)},pc.Entity.prototype.tween=function(t,i){var e=this._app.tween(t);return e.entity=this,this.once("destroy",e.stop,e),i&&i.element&&(e.element=i.element),e};var t=pc.Application.getApplication();t&&t.addTweenManager()}();"undefined"!=typeof document&&(function(t,e){function s(t,e){for(var n in e)try{t.style[n]=e[n]}catch(t){}return t}function H(t){return null==t?String(t):"object"==typeof t||"function"==typeof t?Object.prototype.toString.call(t).match(/\s([a-z]+)/i)[1].toLowerCase()||"object":typeof t}function R(t,e){if("array"!==H(e))return-1;if(e.indexOf)return e.indexOf(t);for(var n=0,o=e.length;n<o;n++)if(e[n]===t)return n;return-1}function I(){var t,e=arguments;for(t in e[1])if(e[1].hasOwnProperty(t))switch(H(e[1][t])){case"object":e[0][t]=I({},e[0][t],e[1][t]);break;case"array":e[0][t]=e[1][t].slice(0);break;default:e[0][t]=e[1][t]}return 2<e.length?I.apply(null,[e[0]].concat(Array.prototype.slice.call(e,2))):e[0]}function N(t){return 1===(t=Math.round(255*t).toString(16)).length?"0"+t:t}function S(t,e,n,o){t.addEventListener?t[o?"removeEventListener":"addEventListener"](e,n,!1):t.attachEvent&&t[o?"detachEvent":"attachEvent"]("on"+e,n)}function D(t,o){function g(t,e,n,o){return l[0|t][Math.round(Math.min((e-n)/(o-n)*z,z))]}function r(){C.legend.fps!==L&&(C.legend.fps=L,C.legend[c]=L?"FPS":"ms"),w=L?O.fps:O.duration,C.count[c]=999<w?"999+":w.toFixed(99<w?0:F.decimals)}function m(){for(p=n(),T<p-F.threshold&&(O.fps-=O.fps/Math.max(1,60*F.smoothing/F.interval),O.duration=1e3/O.fps),y=F.history;y--;)j[y]=0===y?O.fps:j[y-1],q[y]=0===y?O.duration:q[y-1];if(r(),F.heat){if(E.length)for(y=E.length;y--;)E[y].el.style[h[E[y].name].heatOn]=L?g(h[E[y].name].heatmap,O.fps,0,F.maxFps):g(h[E[y].name].heatmap,O.duration,F.threshold,0);if(C.graph&&h.column.heatOn)for(y=M.length;y--;)M[y].style[h.column.heatOn]=L?g(h.column.heatmap,j[y],0,F.maxFps):g(h.column.heatmap,q[y],F.threshold,0)}if(C.graph)for(v=0;v<F.history;v++)M[v].style.height=(L?j[v]?Math.round(b/F.maxFps*Math.min(j[v],F.maxFps)):0:q[v]?Math.round(b/F.threshold*Math.min(q[v],F.threshold)):0)+"px"}function k(){20>F.interval?(f=i(k),m()):(f=setTimeout(k,F.interval),x=i(m))}function G(t){(t=t||window.event).preventDefault?(t.preventDefault(),t.stopPropagation()):(t.returnValue=!1,t.cancelBubble=!0),O.toggle()}function U(){F.toggleOn&&S(C.container,F.toggleOn,G,1),t.removeChild(C.container)}function V(){if(C.container&&U(),h=D.theme[F.theme],!(l=h.compiledHeatmaps||[]).length&&h.heatmaps.length){for(v=0;v<h.heatmaps.length;v++)for(l[v]=[],y=0;y<=z;y++){var e,n=l[v],o=y;e=.33/z*y;var a=h.heatmaps[v].saturation,i=h.heatmaps[v].lightness,p=void 0,c=void 0,u=void 0,d=u=void 0,g=p=c=void 0;g=void 0;0===(u=.5>=i?i*(1+a):i+a-i*a)?e="#000":(c=(u-(d=2*i-u))/u,g=(e*=6)-(p=Math.floor(e)),g*=u*c,0===p||6===p?(p=u,c=d+g,u=d):1===p?(p=u-g,c=u,u=d):2===p?(p=d,c=u,u=d+g):3===p?(p=d,c=u-g):4===p?(p=d+g,c=d):(p=u,c=d,u-=g),e="#"+N(p)+N(c)+N(u)),n[o]=e}h.compiledHeatmaps=l}for(var m in C.container=s(document.createElement("div"),h.container),C.count=C.container.appendChild(s(document.createElement("div"),h.count)),C.legend=C.container.appendChild(s(document.createElement("div"),h.legend)),C.graph=F.graph?C.container.appendChild(s(document.createElement("div"),h.graph)):0,E.length=0,C)C[m]&&h[m].heatOn&&E.push({name:m,el:C[m]});if(M.length=0,C.graph)for(C.graph.style.width=F.history*h.column.width+(F.history-1)*h.column.spacing+"px",y=0;y<F.history;y++)M[y]=C.graph.appendChild(s(document.createElement("div"),h.column)),M[y].style.position="absolute",M[y].style.bottom=0,M[y].style.right=y*h.column.width+y*h.column.spacing+"px",M[y].style.width=h.column.width+"px",M[y].style.height="0px";s(C.container,F),r(),t.appendChild(C.container),C.graph&&(b=C.graph.clientHeight),F.toggleOn&&("click"===F.toggleOn&&(C.container.style.cursor="pointer"),S(C.container,F.toggleOn,G))}"object"===H(t)&&t.nodeType===e&&(o=t,t=document.body),t||(t=document.body);var h,l,p,f,x,b,w,y,v,O=this,F=I({},D.defaults,o||{}),C={},M=[],z=100,E=[],A=F.threshold,P=0,T=n()-A,j=[],q=[],L="fps"===F.show;O.options=F,O.fps=0,O.duration=0,O.isPaused=0,O.tickStart=function(){P=n()},O.tick=function(){p=n(),A+=(p-T-A)/F.smoothing,O.fps=1e3/A,O.duration=P<T?A:p-P,T=p},O.pause=function(){return f&&(O.isPaused=1,clearTimeout(f),a(f),a(x),f=x=0),O},O.resume=function(){return f||(O.isPaused=0,k()),O},O.set=function(t,e){return F[t]=e,L="fps"===F.show,-1!==R(t,u)&&V(),-1!==R(t,d)&&s(C.container,F),O},O.showDuration=function(){return O.set("show","ms"),O},O.showFps=function(){return O.set("show","fps"),O},O.toggle=function(){return O.set("show",L?"ms":"fps"),O},O.hide=function(){return O.pause(),C.container.style.display="none",O},O.show=function(){return O.resume(),C.container.style.display="block",O},O.destroy=function(){O.pause(),U(),O.tick=O.tickStart=function(){}},V(),k()}var n,o=t.performance;n=o&&(o.now||o.webkitNow)?o[o.now?"now":"webkitNow"].bind(o):function(){return+new Date};for(var a=t.cancelAnimationFrame||t.cancelRequestAnimationFrame,i=t.requestAnimationFrame,h=0,l=0,p=(o=["moz","webkit","o"]).length;l<p&&!a;++l)i=(a=t[o[l]+"CancelAnimationFrame"]||t[o[l]+"CancelRequestAnimationFrame"])&&t[o[l]+"RequestAnimationFrame"];a||(i=function(e){var o=n(),a=Math.max(0,16-(o-h));return h=o+a,t.setTimeout(function(){e(o+a)},a)},a=function(t){clearTimeout(t)});var c="string"===H(document.createElement("div").textContent)?"textContent":"innerText";D.extend=I,window.FPSMeter=D,D.defaults={interval:100,smoothing:10,show:"fps",toggleOn:"click",decimals:1,maxFps:60,threshold:100,position:"absolute",zIndex:10,left:"5px",top:"5px",right:"auto",bottom:"auto",margin:"0 0 0 0",theme:"dark",heat:0,graph:0,history:20};var u=["toggleOn","theme","heat","graph","history"],d="position zIndex left top right bottom margin".split(" ")}(window),function(t,e){e.theme={};var n=e.theme.base={heatmaps:[],container:{heatOn:null,heatmap:null,padding:"5px",minWidth:"95px",height:"30px",lineHeight:"30px",textAlign:"right",textShadow:"none"},count:{heatOn:null,heatmap:null,position:"absolute",top:0,right:0,padding:"5px 10px",height:"30px",fontSize:"24px",fontFamily:"Consolas, Andale Mono, monospace",zIndex:2},legend:{heatOn:null,heatmap:null,position:"absolute",top:0,left:0,padding:"5px 10px",height:"30px",fontSize:"12px",lineHeight:"32px",fontFamily:"sans-serif",textAlign:"left",zIndex:2},graph:{heatOn:null,heatmap:null,position:"relative",boxSizing:"padding-box",MozBoxSizing:"padding-box",height:"100%",zIndex:1},column:{width:4,spacing:1,heatOn:null,heatmap:null}};e.theme.dark=e.extend({},n,{heatmaps:[{saturation:.8,lightness:.8}],container:{background:"#222",color:"#fff",border:"1px solid #1a1a1a",textShadow:"1px 1px 0 #222"},count:{heatOn:"color"},column:{background:"#3f3f3f"}}),e.theme.light=e.extend({},n,{heatmaps:[{saturation:.5,lightness:.5}],container:{color:"#666",background:"#fff",textShadow:"1px 1px 0 rgba(255,255,255,.5), -1px -1px 0 rgba(255,255,255,.5)",boxShadow:"0 0 0 1px rgba(0,0,0,.1)"},count:{heatOn:"color"},column:{background:"#eaeaea"}}),e.theme.colorful=e.extend({},n,{heatmaps:[{saturation:.5,lightness:.6}],container:{heatOn:"backgroundColor",background:"#888",color:"#fff",textShadow:"1px 1px 0 rgba(0,0,0,.2)",boxShadow:"0 0 0 1px rgba(0,0,0,.1)"},column:{background:"#777",backgroundColor:"rgba(0,0,0,.2)"}}),e.theme.transparent=e.extend({},n,{heatmaps:[{saturation:.8,lightness:.5}],container:{padding:0,color:"#fff",textShadow:"1px 1px 0 rgba(0,0,0,.5)"},count:{padding:"0 5px",height:"40px",lineHeight:"40px"},legend:{padding:"0 5px",height:"40px",lineHeight:"42px"},graph:{height:"40px"},column:{width:5,background:"#999",heatOn:"backgroundColor",opacity:.5}})}(window,FPSMeter));var Fps=pc.createScript("fps");Fps.prototype.initialize=function(){this.fps=new FPSMeter({heat:!0,graph:!0})},Fps.prototype.update=function(t){this.fps.tick()};// gameplayController.js
/* jshint esversion: 6 */
var GameplayController = pc.createScript('gameplayController');

GameplayController.attributes.add('comboFactor', {
    title: "combo factor",
    type: 'number',
    default: 1.02
});


GameplayController.prototype.initialize = function() {

    GameplayController.app = this.app;
    GameplayController.levelActive = false;
    
    this.app.fire('audio:disable');
    
    this.initVariables();
    this.injectMeshCollisionSystem();
    this.addListeners();
        
    this.prepareLevel();
};

GameplayController.prototype.injectMeshCollisionSystem = function() {    
    console.log("Injecting physics ....");

    this.app.systems.collision.implementations.mesh.createPhysicalShape = function(entity, data) {
            if (typeof Ammo !== 'undefined' && data.model) {
                var model = data.model;
                var shape = new Ammo.btConvexHullShape();

                var i, j;
                for (i = 0; i < model.meshInstances.length; i++) {
                    var meshInstance = model.meshInstances[i];
                    var mesh = meshInstance.mesh;
                    var ib = mesh.indexBuffer[pc.RENDERSTYLE_SOLID];
                    var vb = mesh.vertexBuffer;

                    var format = vb.getFormat();
                    var stride = format.size / 4;
                    var positions;
                    for (j = 0; j < format.elements.length; j++) {
                        var element = format.elements[j];
                        if (element.name === pc.SEMANTIC_POSITION) {
                            positions = new Float32Array(vb.lock(), element.offset);
                        }
                    }

                    var indices = new Uint16Array(ib.lock());
                    var numTriangles = mesh.primitive[0].count / 3;

                    var v1 = new Ammo.btVector3();
                    var v2 = new Ammo.btVector3();
                    var v3 = new Ammo.btVector3();
                    var i1, i2, i3;

                    var base = mesh.primitive[0].base;
                    for (j = 0; j < numTriangles; j++) {
                        i1 = indices[base + j * 3] * stride;
                        i2 = indices[base + j * 3 + 1] * stride;
                        i3 = indices[base + j * 3 + 2] * stride;
                        v1.setValue(positions[i1], positions[i1 + 1], positions[i1 + 2]);
                        v2.setValue(positions[i2], positions[i2 + 1], positions[i2 + 2]);
                        v3.setValue(positions[i3], positions[i3 + 1], positions[i3 + 2]);
                        shape.addPoint(v1, true);
                        shape.addPoint(v2, true);
                        shape.addPoint(v3, true);
                    }
                    
                    Ammo.destroy(v1);
                    Ammo.destroy(v2);
                    Ammo.destroy(v3);
                }

                var entityTransform = entity.getWorldTransform();
                var scale = entityTransform.getScale();
                var vec = new Ammo.btVector3();
                vec.setValue(scale.x * (entity.physicalScale || 1), scale.y * (entity.physicalScale || 1), scale.z * (entity.physicalScale || 1));
                shape.setLocalScaling(vec);
                Ammo.destroy(vec);
                

                return shape;
            }
            return undefined;
    };  
    
   
    this.app.systems.collision.implementations.mesh.remove = function(entity, data) {
         var app = this.system.app;
            if (entity.rigidbody && entity.rigidbody.body) {
                app.systems.rigidbody.removeBody(entity.rigidbody.body);
                entity.rigidbody.disableSimulation();
            }

            if (data.shape)
                Ammo.destroy(data.shape);

            if (entity.trigger) {
                entity.trigger.destroy();
                delete entity.trigger;
            }

            if (app.scene.containsModel(data.model)) {
                app.root.removeChild(data.model.graph);
                app.scene.removeModel(data.model);
            }
    };
    
};


GameplayController.prototype.addListeners = function() {
    this.app.on("touch:start", this.handleTouch, this);
    this.app.on("gameplay:start", this.startLevel, this);
    this.app.on("gameplay:exit", this.exitLevel, this);
    this.app.on("level:progress", this.updateLevelProgress, this);
    this.app.on("item:destroy", this.handleItemDestroyed, this);
    this.app.on("ball:launch", this.handleBallLaunched, this);
    this.app.on("colorball:launch", this.handleColorballLaunched, this);
    this.app.on("cannon:launch", this.handleCannonballLaunched, this);
    this.on("destroy", this.destroy, this);
};


GameplayController.prototype.update = function(dt) {
    if(!GameplayController.currentSession) {
        return;
    }
        
    GameplayController.currentSession.earthquakeTimer -= dt;
    GameplayController.currentSession.screenShakingTimer -= dt;
    
    const currentTimestamp = new Date().getTime();
    if(GameplayController.currentSession.comboCounter > 0 && currentTimestamp - GameplayController.currentSession.lastItemTimestamp > GameplayController.comboMaxCooldown) {  
        this.terminateCombo();
    }     
    
    if(GameplayController.currentSession.started && GameplayController.currentSession.resultsTimerActive && !WindowManager.hasOpenedWindows()) {
         GameplayController.currentSession.resultsTimer -= dt;
         if(GameplayController.currentSession.resultsTimer <= 0) { 
                GameplayController.currentSession.resultsTimer = 0;
                GameplayController.currentSession.resultsTimerActive = false;
                GameplayController.currentSession.gameplayActive = false;    
                GameplayController.currentLevel += 1;
                this.app.fire("app:save");
                WindowManager.showResults();
                Apicontroller.trackLevelEnd({
                    "success": true,
                    "score": GameplayController.currentSession.score,
                    "movesLeft": GameplayController.currentSession.ballsLeft,
                    "movesAvailable": GameplayController.currentSession.totalBalls,
                    "stars": GameplayController.lastLevelCoins,
                    "revives": (GameplayController.currentSession.reviveUsed ? 1 : 0),
                    "powerups": GameplayController.currentSession.usedPowerups
                });
         }     
    } 
    
    else if(GameplayController.currentSession.started && GameplayController.currentSession.ballsLeft === 0 && GameplayController.currentSession.defeatTimerActive && !this.app.root.findByName("ActiveBall").script.ballController.preparedBall && !WindowManager.hasOpenedWindows()) {
        GameplayController.currentSession.defeatTimer -= dt;
        if(GameplayController.currentSession.defeatTimer <= 0) {
            if(!GameplayController.currentSession.reviveAppeared && Apicontroller.hasRewardedVideo()) {
                GameplayController.currentSession.defeatTimer = 0.2;
                GameplayController.currentSession.reviveAppeared = true;
                WindowManager.showRevive();
            } else {
                GameplayController.currentSession.defeatTimer = 0;
                GameplayController.currentSession.defeatTimerActive = false;
                GameplayController.currentSession.gameplayActive = false;            
                WindowManager.showDefeat();
                Apicontroller.trackLevelEnd({
                    "success": false,
                    "score": GameplayController.currentSession.score,
                    "movesLeft": GameplayController.currentSession.ballsLeft,
                    "movesAvailable": GameplayController.currentSession.totalBalls,
                    "stars": GameplayController.lastLevelCoins,
                    "revives": (GameplayController.currentSession.reviveUsed ? 1 : 0),
                    "powerups": GameplayController.currentSession.usedPowerups
                });
            }
        }
    }
};

GameplayController.prototype.restartSession = function() {
    GameplayController.currentSession = {
        score: GameplayController.sessionScores,
        ballsLeft: 100,
        totalBalls: 100,
        resultsTimer: 0,
        resultsTimerActive: false,
        defeatTimer: 0,
        defeatTimerActive: false,
        reviveAppeared: false,
        reviveUsed: false,
        destroyedItems: 0,
        comboCounter: 0,
        currentBallHitTimestamp: 0,
        currentBallDestroydItems: 0,
        smileShown: false,
        comboBarVolume: 200,
        comboBarVolumeLevel: 0,
        lastItemTimestamp: 0,
        cannonBallProgress: 0,
        cannonBallAvailable: false,
        colorBallAvailable: false,
        earthquakeTimer: 0,
        screenShakingTimer: 0,
        gameplayActive: false,
        started: false,
        liftProgress: 0,
        progress: 0,
        finished: false,
        lastBallColor: -1,
        usedPowerups: []
    };
    
    GameplayController.lastLevelScores = 0;
    GameplayController.lastLevelCoins = 0;
};


GameplayController.prototype.initVariables = function() {
    
    //State variables
    GameplayController.currentLevel = 1;
    GameplayController.coins = 0;
    GameplayController.maxScores = 0;
    GameplayController.sessionScores = 0;
    GameplayController.lastLevelScores = 0;
    GameplayController.lastLevelCoins = 0;
        
    //Limited offer
    GameplayController.limitedOfferLastTimestamp = 0;
    GameplayController.limitedOfferCooldown = 0.5 * 3600; //seconds
    GameplayController.limitedOfferRewardAmount = 250;
    
    //Screen
    GameplayController.mobileLandscapeMode = false;
    GameplayController.screenRatioMin = 9 / 16;
    GameplayController.screenRatioMax = 16 / 16;
    
    GameplayController.waitBeforeDefeat = 5.0;
    
    //Effects
    GameplayController.screenShakeDurationAfterHit = 0.25;
    GameplayController.enableVibration = true;
    
    //Camera
    GameplayController.minCameraHeight = 13.25;
    GameplayController.minCameraHeightMobileLandscape = 10.5;
    GameplayController.cameraLiftSpeedY = 15;
    GameplayController.cameraLiftTweenDuration = 3.0;
    GameplayController.cameraDeltaY = 4.5;
    GameplayController.cameraDeltaYMobileLandscape = 7.5;
    
    //Gameplay camera
    GameplayController.cameraToTowerMinDistance = 35;
    GameplayController.cameraToTowerMaxDistance = 55;
    GameplayController.cameraToTowerMobileLandscapeDistance = 40;
    
    //combo
    GameplayController.comboFactor = this.comboFactor || 1.02;
    GameplayController.comboBarLevelMultiplier = 1.1;
    GameplayController.baseItemScore = 5;
    GameplayController.comboItemScoreStep = 1;
    GameplayController.comboMaxCooldown = 1600;
    GameplayController.lastDestroyedColor = 0;
    
    //Powerups
    GameplayController.powerupMultiballPrice = 25;
    GameplayController.powerupEarthquakePrice = 50;
    GameplayController.powerupMultiballPurchased = false;
    GameplayController.powerupEarthquakePurchased = false;
    GameplayController.numColorBalls = 12;
    
    //Tower
    GameplayController.towerStandElevation = 3;
    GameplayController.towerStandDiameter = 10;
    GameplayController.availableTowerHeight = 8;
    GameplayController.ballRadius = 0.66;
    GameplayController.itemLifeTime = 15; //seconds
    GameplayController.itemDrownTime = 10; //seconds
    GameplayController.itemFallingTime = 5;
    
    GameplayController.particleCacheSize = 200;
    GameplayController.particlesPerObject = 11;
    
    GameplayController.CCDMotionThreshold = 0.1;
    GameplayController.CCDSweptSphereRadius = 0.01;
    
    GameplayController.autoDestroyTarget = true;
    GameplayController.ballLifeTime = 3;
    GameplayController.ballAutoDestroyDistanceThreshold = 5;
    GameplayController.ballAutoDestroyDelay = 0.03; // value in seconds, for low-performance devices which have problems with collision detection
    
    GameplayController.chainExplosionDelay = 50;
    GameplayController.triggerLifeTime = 1.0; //seconds
    
    //cannon ball
    GameplayController.cannonBallAutoDestroyTime = 2; //seconds
    GameplayController.colorBallBreakingDistance = 0.2;
        
    LocalStorageController.loadData();
};

GameplayController.prototype.terminateCombo = function() {
    if((GameplayController.currentSession.comboCounter + 1) >= 10) {
        var numCoins = Math.floor((GameplayController.currentSession.comboCounter + 1) / 10);
        GameplayController.addCoins(numCoins);
        GameplayController.app.fire("coins:added", numCoins, this.app.root.findByName("EffectsContainer").findByName("ComboEffect").findByName("ComboEffect").element.anchor.clone());
    }
    GameplayController.currentSession.comboCounter = 0;
    GameplayController.currentSession.lastItemTimestamp = 0;    
    GameplayController.currentSession.smileShown = false;
    GameplayController.currentSession.currentBallDestroydItems = 0;
    GameplayController.currentSession.currentBallHitTimestamp = 0;
};

GameplayController.addCoins = function(value) {
    GameplayController.coins += value;
    GameplayController.lastLevelCoins += value;
    GameplayController.app.fire("coins:updated", GameplayController.coins);
    Apicontroller.trackLevelUpdate({
        "stars": GameplayController.lastLevelCoins
    });
};

GameplayController.setCoins = function(value) {
    GameplayController.coins = value;
    GameplayController.app.fire("coins:updated", GameplayController.coins);
};

GameplayController.prototype.handleItemDestroyed = function() {
     if(!GameplayController.levelActive || !GameplayController.currentSession || !GameplayController.currentSession.gameplayActive) {
        return;
    }
    
    GameplayController.currentSession.destroyedItems += 1;
    GameplayController.currentSession.currentBallDestroydItems += 1;
    GameplayController.currentSession.currentBallHitTimestamp = GameplayController.currentSession.currentBallHitTimestamp || new Date().getTime();
    
    const currentTimestamp = new Date().getTime();
    if(currentTimestamp - GameplayController.currentSession.lastItemTimestamp <= GameplayController.comboMaxCooldown) {        
        GameplayController.currentSession.comboCounter += 1;
                
        if(!GameplayController.currentSession.smileShown) {
            const averageDestroyingDelay = (currentTimestamp - GameplayController.currentSession.currentBallHitTimestamp) / GameplayController.currentSession.currentBallDestroydItems;
            if(GameplayController.currentSession.comboCounter >= 20) {
                if(Math.random() < 0.075 + 0.01 * (GameplayController.currentSession.comboCounter - 20)) {
                    GameplayController.currentSession.smileShown = true;
                    this.app.fire("smile:cool");
                }
            } else if(GameplayController.currentSession.currentBallDestroydItems >= 15 && averageDestroyingDelay < 75 && Math.random() < 0.1) {
                  GameplayController.currentSession.smileShown = true;
                  this.app.fire("smile:surprised");
            } else if(GameplayController.currentSession.currentBallDestroydItems >= 10 && averageDestroyingDelay < 20 && Math.random() < 0.33) {
                  GameplayController.currentSession.smileShown = true;
                  this.app.fire("smile:scared");
            } 
        }
        
        this.app.fire("combo:show", GameplayController.currentSession.comboCounter + 1);
     } else {
        this.terminateCombo();
    }
        
    GameplayController.currentSession.lastItemTimestamp = currentTimestamp;
    
    const scores = GameplayController.baseItemScore + (GameplayController.currentSession.comboCounter) * GameplayController.comboItemScoreStep;
    
    GameplayController.currentSession.score += scores;
    GameplayController.sessionScores = GameplayController.currentSession.score;
    GameplayController.lastLevelScores += scores;
    GameplayController.maxScores = Math.max(GameplayController.maxScores, GameplayController.currentSession.score);
    
    this.app.fire("ball:verifyColor");
    this.app.fire("score:updated", GameplayController.currentSession.score);    
    
    /* cannonball progress */
    if(GameplayController.currentSession.cannonBallProgress < 1 && GameplayController.currentSession.comboCounter > 0) {
         const flyingCannonBall = this.app.root.findByName("TrashContainer").findByName("CannonBall");
         if(!flyingCannonBall) {
             const currentComboReward = Math.pow(GameplayController.comboFactor, GameplayController.currentSession.comboCounter);
             GameplayController.currentSession.cannonBallProgress = pc.math.clamp(GameplayController.currentSession.cannonBallProgress + currentComboReward / (GameplayController.currentSession.comboBarVolume * Math.pow(GameplayController.comboBarLevelMultiplier, GameplayController.currentSession.comboBarVolumeLevel)), 0, 1);
             this.app.fire("cannon:progress", GameplayController.currentSession.cannonBallProgress);
             if(GameplayController.currentSession.cannonBallProgress === 1 && !GameplayController.currentSession.cannonBallAvailable) {
                 GameplayController.currentSession.cannonBallAvailable = true;
                 GameplayController.currentSession.comboBarVolumeLevel += 1;
                 this.app.fire("audio:play", "powerUpBarLoaded");
                 this.app.fire("cannon:create");
             }
         }
    }
};

GameplayController.prototype.updateLevelProgress = function(progress) {
    if(!GameplayController.levelActive || !GameplayController.currentSession || !GameplayController.currentSession.gameplayActive) {
        return;
    }
    
    GameplayController.currentSession.progress = progress;
    if(progress === 1) {
        GameplayController.currentSession.finished = true;
        GameplayController.currentSession.gameplayActive = false;
        GameplayController.currentSession.resultsTimerActive = true;
        GameplayController.currentSession.resultsTimer = 2;
        this.app.fire("tower:destroyed");
    }  
};

GameplayController.prototype.handleTouch = function(e) {       
    if(this.app.applicationPaused ||  WindowManager.hasOpenedWindows() || !GameplayController.levelActive || !GameplayController.currentSession || GameplayController.currentSession.finished || !GameplayController.currentSession.gameplayActive ||  !GameplayController.currentSession.started){
        return;
    }
    
    const triggerController = this.app.root.findByName("Triggers").script.triggersController;    
    const camera = this.app.root.findByName("Camera");
    var from = camera.camera.screenToWorld(e.x, e.y, camera.camera.nearClip);
    var to = camera.camera.screenToWorld(e.x, e.y, camera.camera.farClip);
    
    triggerController.disableTriggers();
    var result = this.app.systems.rigidbody.raycastFirst(from, to);
    triggerController.enableTriggers();
    
    
    if (result && result.entity && result.entity.parent && result.entity.parent.name === "Tower" && result.entity.active && TutorialScreen.shootingEnabled(result.entity)) {
        const ballController = this.app.root.findByName("ActiveBall").script.ballController;
        var targetPoint = result.point.clone().add(result.normal.scale(GameplayController.ballRadius * 0.95));
        ballController.shoot(result.entity, targetPoint); //result.point
    }
};

GameplayController.prototype.handleBallLaunched = function() {
    if(!GameplayController.levelActive || !GameplayController.currentSession){
        return;
    }
    
    GameplayController.currentSession.ballsLeft -= 1;
    if(GameplayController.currentSession.ballsLeft <= 0) {
        GameplayController.currentSession.ballsLeft = 0;
        GameplayController.currentSession.defeatTimerActive = true;
        GameplayController.currentSession.defeatTimer = GameplayController.waitBeforeDefeat;
    }

    Apicontroller.trackLevelUpdate({
        "movesLeft": GameplayController.currentSession.ballsLeft
    });
    
    this.terminateCombo();
    this.app.fire("cannon:progress", GameplayController.currentSession.cannonBallProgress);
};

GameplayController.prototype.handleColorballLaunched = function() {
    if(!GameplayController.levelActive || !GameplayController.currentSession) {
        return;
    }
    this.terminateCombo();
    GameplayController.currentSession.colorBallAvailable = false;
    GameplayController.currentSession.defeatTimer = GameplayController.waitBeforeDefeat;
};

GameplayController.prototype.handleCannonballLaunched = function() {
    if(!GameplayController.levelActive || !GameplayController.currentSession){
        return;
    }
    this.terminateCombo();
    GameplayController.currentSession.defeatTimer = GameplayController.waitBeforeDefeat;
    GameplayController.currentSession.cannonBallProgress = 0;
    GameplayController.currentSession.cannonBallAvailable = false;
    GameplayController.currentSession.usedPowerups.push('Cannonball');
    Apicontroller.trackLevelUpdate({
       "powerups": GameplayController.currentSession.usedPowerups
    });    
    this.app.fire("cannon:progress", GameplayController.currentSession.cannonBallProgress);
};

GameplayController.prototype.prepareLevel = function() {   
    console.log("Preparing level...");
    
    GameplayController.levelActive = true;
    
    this.restartSession();

    this.app.fire("level:clear");
    this.app.fire("level:buildTower");
    this.app.fire("score:updated", GameplayController.currentSession.score);
    this.app.fire("coins:updated", GameplayController.coins);
    
    this.app.fire("camera:reset");
};

GameplayController.prototype.startLevel = function(keepExistingTower) {   
    console.log("Starting level...");
    
    if(window.famobi_analytics) {        
        window.famobi_analytics.trackScreen(window.famobi_analytics.SCREEN_LEVEL);
    }
    
    Apicontroller.trackLevelStart({"level": GameplayController.currentLevel});
    
    GameplayController.levelActive = true;

    WindowManager.gameplayUI.hide(); 
    WindowManager.gameplayUI.show(); 
    
    if(!keepExistingTower) {
        this.restartSession();
        this.app.fire("level:clear");
        this.app.fire("level:buildTower");
        this.app.fire("score:updated", GameplayController.currentSession.score);
        this.app.fire("coins:updated", GameplayController.coins);
        console.log("Starting session...");
    } else {
        console.log("Keeping existing tower...");
    }
    
    //Camera movement params   
    this.app.fire("camera:reset");
    if(this.entity.liftTween && this.entity.liftTween.playing) {
        this.entity.liftTween.stop();
    }
    
    this.entity.liftTween = this.entity.tween(GameplayController.currentSession)
        .to({liftProgress: 1}, GameplayController.cameraLiftTweenDuration, pc.SineInOut)
        .on('complete', () => {
            this.app.fire("level:createBall");
            this.app.fire("powerup:enableButtons");
            GameplayController.currentSession.started = true;
            GameplayController.currentSession.gameplayActive = true;
        })
        .start(); 
    
};

GameplayController.prototype.exitLevel = function() {  
    GameplayController.levelActive = false;
    if(GameplayController.lastLevelScores > 0) {
        GameplayController.sessionScores = pc.math.clamp(GameplayController.sessionScores - GameplayController.lastLevelScores, 0, GameplayController.sessionScores); 
    }
    this.restartSession();
    this.app.fire("level:exit");
    this.app.fire("camera:exit");
    this.app.fire("level:buildTower");
};

GameplayController.prototype.restartLevel = function() {   
    console.log("Restarting current level...");
    var transitionScreen = this.app.root.findByName("TransitionScreen");
    transitionScreen.transitionTo(() => this.app.fire("level:restart"));
};

GameplayController.prototype.destroy = function() {    
    this.app.off("touch:start", this.handleTouch, this);
};


var OrbitCamera=pc.createScript("orbitCamera");OrbitCamera.attributes.add("distanceMax",{type:"number",default:0,title:"Distance Max",description:"Setting this at 0 will give an infinite distance limit"}),OrbitCamera.attributes.add("distanceMin",{type:"number",default:0,title:"Distance Min"}),OrbitCamera.attributes.add("pitchAngleMax",{type:"number",default:90,title:"Pitch Angle Max (degrees)"}),OrbitCamera.attributes.add("pitchAngleMin",{type:"number",default:-90,title:"Pitch Angle Min (degrees)"}),OrbitCamera.attributes.add("inertiaFactor",{type:"number",default:0,title:"Inertia Factor",description:"Higher value means that the camera will continue moving after the user has stopped dragging. 0 is fully responsive."}),OrbitCamera.attributes.add("focusEntity",{type:"entity",title:"Focus Entity",description:"Entity for the camera to focus on. If blank, then the camera will use the whole scene"}),OrbitCamera.attributes.add("frameOnStart",{type:"boolean",default:!0,title:"Frame on Start",description:'Frames the entity or scene at the start of the application."'}),OrbitCamera.attributes.add("flyAroundOnStart",{type:"boolean",default:!0}),Object.defineProperty(OrbitCamera.prototype,"distance",{get:function(){return this._targetDistance},set:function(t){this._targetDistance=this._clampDistance(t)}}),Object.defineProperty(OrbitCamera.prototype,"pitch",{get:function(){return this._targetPitch},set:function(t){this._targetPitch=this._clampPitchAngle(t)}}),Object.defineProperty(OrbitCamera.prototype,"yaw",{get:function(){return this._targetYaw},set:function(t){this._targetYaw=t;var e=(this._targetYaw-this._yaw)%360;this._targetYaw=e>180?this._yaw-(360-e):e<-180?this._yaw+(360+e):this._yaw+e}}),Object.defineProperty(OrbitCamera.prototype,"pivotPoint",{get:function(){return this._pivotPoint},set:function(t){this._pivotPoint.copy(t)}}),OrbitCamera.prototype.focus=function(t){this._buildAabb(t,0);var e=this._modelsAabb.halfExtents,i=Math.max(e.x,Math.max(e.y,e.z));i/=Math.tan(.5*this.entity.camera.fov*pc.math.DEG_TO_RAD),i*=2,this.distance=i,this._removeInertia(),this._pivotPoint.copy(this._modelsAabb.center)},OrbitCamera.distanceBetween=new pc.Vec3,OrbitCamera.prototype.resetAndLookAtPoint=function(t,e){this.pivotPoint.copy(e),this.entity.setPosition(t),this.entity.lookAt(e);var i=OrbitCamera.distanceBetween;i.sub2(e,t),this.distance=i.length(),this.pivotPoint.copy(e);var a=this.entity.getRotation();this.yaw=this._calcYaw(a),this.pitch=this._calcPitch(a,this.yaw),this._removeInertia(),this._updatePosition()},OrbitCamera.prototype.resetAndLookAtEntity=function(t,e){this._buildAabb(e,0),this.resetAndLookAtPoint(t,this._modelsAabb.center)},OrbitCamera.prototype.reset=function(t,e,i){this.pitch=e,this.yaw=t,this.distance=i,this._removeInertia()},OrbitCamera.prototype.initialize=function(){this.app.on("viewport:resize",this._checkAspectRatio,this),this._checkAspectRatio(),this._modelsAabb=new pc.BoundingBox,this._buildAabb(this.focusEntity||this.app.root,0),this.entity.lookAt(this._modelsAabb.center),this._pivotPoint=new pc.Vec3,this._pivotPoint.copy(this._modelsAabb.center);var t=this.entity.getRotation();if(this._yaw=this._calcYaw(t),this._pitch=this._clampPitchAngle(this._calcPitch(t,this._yaw)),this.entity.setLocalEulerAngles(this._pitch,this._yaw,0),this._distance=0,this._targetYaw=this._yaw,this._targetPitch=this._pitch,this.frameOnStart)this.focus(this.focusEntity||this.app.root);else{var e=new pc.Vec3;e.sub2(this.entity.getPosition(),this._pivotPoint),this._distance=this._clampDistance(e.length())}this._targetDistance=this._distance,this.on("attr:distanceMin",function(t,e){this._targetDistance=this._clampDistance(this._distance)}),this.on("attr:distanceMax",function(t,e){this._targetDistance=this._clampDistance(this._distance)}),this.on("attr:pitchAngleMin",function(t,e){this._targetPitch=this._clampPitchAngle(this._pitch)}),this.on("attr:pitchAngleMax",function(t,e){this._targetPitch=this._clampPitchAngle(this._pitch)}),this.on("attr:focusEntity",function(t,e){this.frameOnStart?this.focus(t||this.app.root):this.resetAndLookAtEntity(this.entity.getPosition(),t||this.app.root)}),this.on("attr:frameOnStart",function(t,e){t&&this.focus(this.focusEntity||this.app.root)}),this.on("destroy",function(){this.app.off("viewport:resize",this._checkAspectRatio,this)}),this.app.on("camera:reset",this.resetLevelCamera,this),this.app.on("camera:exit",this.startMenuCamera,this)},OrbitCamera.prototype.update=function(t){GameplayController.currentSession?(GameplayController.currentSession.started?(this._pitch=this._targetPitch=-4,this.regularUpdate(t),this._updateAltitude(),this._updateCameraScale(),this._updateCameraShaking()):(this._yaw=this._targetYaw=this.yaw=540*GameplayController.currentSession.liftProgress-360,this._pitch=this._targetPitch=-4,this._updateCameraScale(),this._distance=this._targetDistance=this.distance,this._updatePosition(),this._updateLiftAltitude()),this._checkAspectRatio()):console.log("Camera disabled: current session isn't started")},OrbitCamera.prototype.regularUpdate=function(t){var e=0===this.inertiaFactor?1:Math.min(t/this.inertiaFactor,1);this._distance=pc.math.lerp(this._distance,this._targetDistance,e),this._yaw=pc.math.lerp(this._yaw,this._targetYaw,e),this._pitch=pc.math.lerp(this._pitch,this._targetPitch,e),this._updatePosition()},OrbitCamera.prototype._updatePosition=function(){this.entity.setLocalPosition(0,0,0),this.entity.setLocalEulerAngles(this._pitch,this._yaw,0);var t=this.entity.getPosition();t.copy(this.entity.forward),t.scale(-this._distance),t.add(this.pivotPoint),this.entity.setPosition(t)},OrbitCamera.prototype._updateAltitude=function(){var t=this.app.root.findByName("Tower"),e=Math.ceil(t.currentHeight/t.itemHeight)*t.itemHeight,i=Math.max(e-this.getCameraDeltaY(),this.getMinCameraHeight()),a=this.entity.getPosition();a.y;this.lastY=this.lastY||i,i<this.lastY&&Math.abs(this.lastY-i)>.1&&(this.lastY=this.lastY+1*(i-this.lastY)/15),a.y=this.lastY,this.entity.setPosition(a)},OrbitCamera.prototype._updateLiftAltitude=function(){var t=this.entity.getPosition(),e=this.app.root.findByName("Tower"),i=Math.ceil(e.currentHeight/e.itemHeight)*e.itemHeight;Math.max(i-this.getCameraDeltaY(),this.getMinCameraHeight());t.y=this.getMinCameraHeight()+(i-this.getCameraDeltaY()-this.getMinCameraHeight())*GameplayController.currentSession.liftProgress,t.y=pc.math.clamp(t.y,this.getMinCameraHeight(),i-this.getCameraDeltaY()),this.entity.setPosition(t)},OrbitCamera.prototype._updateMenuAltitude=function(){var t=this.entity.getPosition(),e=this.app.root.findByName("Tower"),i=Math.ceil(e.currentHeight/e.itemHeight)*e.itemHeight;Math.max(i-this.getCameraDeltaY(),this.getMinCameraHeight());t.y=this.getMinCameraHeight()+0*(i-this.getCameraDeltaY()-this.getMinCameraHeight()),t.y=pc.math.clamp(t.y,this.getMinCameraHeight(),i-this.getCameraDeltaY()),this.entity.setPosition(t)},OrbitCamera.prototype.getCameraDeltaY=function(){return GameplayController.mobileLandscapeMode?GameplayController.cameraDeltaYMobileLandscape:GameplayController.cameraDeltaY},OrbitCamera.prototype.getMinCameraHeight=function(){return GameplayController.mobileLandscapeMode?GameplayController.minCameraHeightMobileLandscape:GameplayController.minCameraHeight},OrbitCamera.prototype._updateCameraScale=function(){var t=this.app.graphicsDevice.canvas.width/this.app.graphicsDevice.canvas.height;GameplayController.mobileLandscapeMode=!1,t<GameplayController.screenRatioMin?this.distance=GameplayController.cameraToTowerMinDistance:t>GameplayController.screenRatioMax?pc.platform.mobile?(GameplayController.mobileLandscapeMode=!0,this.distance=GameplayController.cameraToTowerMobileLandscapeDistance):this.distance=GameplayController.cameraToTowerMaxDistance:this.distance=GameplayController.cameraToTowerMinDistance+(t-GameplayController.screenRatioMin)/(GameplayController.screenRatioMax-GameplayController.screenRatioMin)*(GameplayController.cameraToTowerMaxDistance-GameplayController.cameraToTowerMinDistance)},OrbitCamera.prototype._updateCameraShaking=function(){if(GameplayController.currentSession)if(GameplayController.currentSession.earthquakeTimer>0){if(this.earthquakeTimer=(this.earthquakeTimer||1)+1,this.earthquakeTimer%2==0){var t=this.entity.getPosition();t.y+=pc.math.random(-.35,.35),t.x+=pc.math.random(-.35,.35),t.z+=pc.math.random(-.35,.35),this.entity.setPosition(t)}}else if(GameplayController.currentSession.screenShakingTimer>0){this.screenShakeTimer=(this.screenShakeTimer||1)+1;var e=this.entity.getPosition();e.y+=pc.math.random(-.12,.12),e.x+=pc.math.random(-.1,.1),e.z+=pc.math.random(-.1,.1),this.entity.setPosition(e)}},OrbitCamera.prototype.resetLevelCamera=function(){this._updateCameraScale(),this.entity.setPosition(0,this.getMinCameraHeight(),this.distance),this.lastY=0},OrbitCamera.prototype.startMenuCamera=function(){console.log("startMenuCameraMock")},OrbitCamera.prototype._removeInertia=function(){this._yaw=this._targetYaw,this._pitch=this._targetPitch,this._distance=this._targetDistance},OrbitCamera.prototype._checkAspectRatio=function(){var t=this.app.graphicsDevice.height>this.app.graphicsDevice.width;this.entity.camera.horizontalFov!=t&&(this.entity.camera.horizontalFov=t)},OrbitCamera.prototype._buildAabb=function(t,e){var i=0;if(t.model){var a=t.model.meshInstances;for(a||console.warn("No meshInstances found for entity '"+t.name+"'"),i=0;i<a.length;i++)0===e?this._modelsAabb.copy(a[i].aabb):this._modelsAabb.add(a[i].aabb),e+=1}for(i=0;i<t.children.length;++i)e+=this._buildAabb(t.children[i],e);return e},OrbitCamera.prototype._calcYaw=function(t){var e=new pc.Vec3;return t.transformVector(pc.Vec3.FORWARD,e),Math.atan2(-e.x,-e.z)*pc.math.RAD_TO_DEG},OrbitCamera.prototype._clampDistance=function(t){return this.distanceMax>0?pc.math.clamp(t,this.distanceMin,this.distanceMax):Math.max(t,this.distanceMin)},OrbitCamera.prototype._clampPitchAngle=function(t){return pc.math.clamp(t,-this.pitchAngleMax,-this.pitchAngleMin)},OrbitCamera.quatWithoutYaw=new pc.Quat,OrbitCamera.yawOffset=new pc.Quat,OrbitCamera.prototype._calcPitch=function(t,e){var i=OrbitCamera.quatWithoutYaw,a=OrbitCamera.yawOffset;a.setFromEulerAngles(0,-e,0),i.mul2(a,t);var r=new pc.Vec3;return i.transformVector(pc.Vec3.FORWARD,r),Math.atan2(r.y,-r.z)*pc.math.RAD_TO_DEG};var MouseCamera=pc.createScript("MouseCamera");MouseCamera.attributes.add("orbitSensitivity",{type:"number",default:.3,title:"Orbit Sensitivity",description:"How fast the camera moves around the orbit. Higher is faster"}),MouseCamera.attributes.add("distanceSensitivity",{type:"number",default:.15,title:"Distance Sensitivity",description:"How fast the camera moves in and out. Higher is faster"}),MouseCamera.prototype.initialize=function(){if(this.orbitCamera=this.entity.script.orbitCamera,this.orbitCamera){var t=this,o=function(o){t.onMouseOut(o)};this.app.mouse.on(pc.EVENT_MOUSEDOWN,this.onMouseDown,this),this.app.mouse.on(pc.EVENT_MOUSEUP,this.onMouseUp,this),this.app.mouse.on(pc.EVENT_MOUSEMOVE,this.onMouseMove,this),this.app.mouse.on(pc.EVENT_MOUSEWHEEL,this.onMouseWheel,this),window.addEventListener("mouseout",o,!1),this.on("destroy",function(){this.app.mouse.off(pc.EVENT_MOUSEDOWN,this.onMouseDown,this),this.app.mouse.off(pc.EVENT_MOUSEUP,this.onMouseUp,this),this.app.mouse.off(pc.EVENT_MOUSEMOVE,this.onMouseMove,this),this.app.mouse.off(pc.EVENT_MOUSEWHEEL,this.onMouseWheel,this),window.removeEventListener("mouseout",o,!1)})}this.app.mouse.disableContextMenu(),this.lookButtonDown=!1,this.panButtonDown=!1,this.lastPoint=new pc.Vec2},MouseCamera.fromWorldPoint=new pc.Vec3,MouseCamera.toWorldPoint=new pc.Vec3,MouseCamera.worldDiff=new pc.Vec3,MouseCamera.prototype.pan=function(t){var o=MouseCamera.fromWorldPoint,e=MouseCamera.toWorldPoint,i=MouseCamera.worldDiff,s=this.entity.camera,a=this.orbitCamera.distance;s.screenToWorld(t.x,t.y,a,o),s.screenToWorld(this.lastPoint.x,this.lastPoint.y,a,e),i.sub2(e,o),this.orbitCamera.pivotPoint.add(i)},MouseCamera.prototype.onMouseDown=function(t){if(GameplayController.currentSession&&GameplayController.currentSession.gameplayActive&&!WindowManager.hasOpenedWindows()&&TutorialScreen.cameraRotatingEnabled())switch(t.button){case pc.MOUSEBUTTON_LEFT:this.lookButtonDown=!0;break;case pc.MOUSEBUTTON_MIDDLE:case pc.MOUSEBUTTON_RIGHT:this.panButtonDown=!1}},MouseCamera.prototype.onMouseUp=function(t){switch(t.button){case pc.MOUSEBUTTON_LEFT:this.lookButtonDown=!1;break;case pc.MOUSEBUTTON_MIDDLE:case pc.MOUSEBUTTON_RIGHT:this.panButtonDown=!1}},MouseCamera.prototype.onMouseMove=function(t){if(GameplayController.currentSession&&GameplayController.currentSession.gameplayActive&&!WindowManager.hasOpenedWindows()&&TutorialScreen.cameraRotatingEnabled()){pc.app.mouse;this.lookButtonDown?(this.orbitCamera.pitch-=t.dy*this.orbitSensitivity,this.orbitCamera.yaw-=t.dx*this.orbitSensitivity,TutorialScreen.tutorialCompleted||this.app.fire("orbitCamera:rotate")):this.panButtonDown&&this.pan(t),this.lastPoint.set(t.x,t.y)}},MouseCamera.prototype.onMouseWheel=function(t){this.orbitCamera.distance-=t.wheel*this.distanceSensitivity*(.1*this.orbitCamera.distance)},MouseCamera.prototype.onMouseOut=function(t){this.lookButtonDown=!1,this.panButtonDown=!1};var TouchCamera=pc.createScript("TouchCamera");TouchCamera.attributes.add("orbitSensitivity",{type:"number",default:.4,title:"Orbit Sensitivity",description:"How fast the camera moves around the orbit. Higher is faster"}),TouchCamera.attributes.add("enablePanning",{type:"boolean",default:!1,description:"Enable two-fingers panning"}),TouchCamera.attributes.add("distanceSensitivity",{type:"number",default:.2,title:"Distance Sensitivity",description:"How fast the camera moves in and out. Higher is faster"}),TouchCamera.prototype.initialize=function(){this.orbitCamera=this.entity.script.orbitCamera,this.lastTouchPoint=new pc.Vec2,this.lastPinchMidPoint=new pc.Vec2,this.lastPinchDistance=0,this.orbitCamera&&this.app.touch&&(this.app.touch.on(pc.EVENT_TOUCHSTART,this.onTouchStartEndCancel,this),this.app.touch.on(pc.EVENT_TOUCHEND,this.onTouchStartEndCancel,this),this.app.touch.on(pc.EVENT_TOUCHCANCEL,this.onTouchStartEndCancel,this),this.app.touch.on(pc.EVENT_TOUCHMOVE,this.onTouchMove,this),this.on("destroy",function(){this.app.touch.off(pc.EVENT_TOUCHSTART,this.onTouchStartEndCancel,this),this.app.touch.off(pc.EVENT_TOUCHEND,this.onTouchStartEndCancel,this),this.app.touch.off(pc.EVENT_TOUCHCANCEL,this.onTouchStartEndCancel,this),this.app.touch.off(pc.EVENT_TOUCHMOVE,this.onTouchMove,this)}))},TouchCamera.prototype.getPinchDistance=function(t,i){var a=t.x-i.x,e=t.y-i.y;return Math.sqrt(a*a+e*e)},TouchCamera.prototype.calcMidPoint=function(t,i,a){a.set(i.x-t.x,i.y-t.y),a.scale(.5),a.x+=t.x,a.y+=t.y},TouchCamera.prototype.onTouchStartEndCancel=function(t){if(GameplayController.currentSession&&GameplayController.currentSession.gameplayActive&&!WindowManager.hasOpenedWindows()&&TutorialScreen.cameraRotatingEnabled()){var i=t.touches;1==i.length?this.lastTouchPoint.set(i[0].x,i[0].y):2==i.length&&(this.lastPinchDistance=this.getPinchDistance(i[0],i[1]),this.calcMidPoint(i[0],i[1],this.lastPinchMidPoint))}},TouchCamera.fromWorldPoint=new pc.Vec3,TouchCamera.toWorldPoint=new pc.Vec3,TouchCamera.worldDiff=new pc.Vec3,TouchCamera.prototype.pan=function(t){if(this.enablePanning){var i=TouchCamera.fromWorldPoint,a=TouchCamera.toWorldPoint,e=TouchCamera.worldDiff,o=this.entity.camera,n=this.orbitCamera.distance;o.screenToWorld(t.x,t.y,n,i),o.screenToWorld(this.lastPinchMidPoint.x,this.lastPinchMidPoint.y,n,a),e.sub2(a,i),this.orbitCamera.pivotPoint.add(e)}},TouchCamera.pinchMidPoint=new pc.Vec2,TouchCamera.prototype.onTouchMove=function(t){if(GameplayController.currentSession&&GameplayController.currentSession.gameplayActive&&!WindowManager.hasOpenedWindows()&&TutorialScreen.cameraRotatingEnabled()){TutorialScreen.tutorialCompleted||this.app.fire("orbitCamera:rotate");var i=TouchCamera.pinchMidPoint,a=t.touches;if(1==a.length){var e=a[0];this.orbitCamera.pitch-=(e.y-this.lastTouchPoint.y)*this.orbitSensitivity,this.orbitCamera.yaw-=(e.x-this.lastTouchPoint.x)*this.orbitSensitivity,this.lastTouchPoint.set(e.x,e.y)}else if(2==a.length){var o=this.getPinchDistance(a[0],a[1]),n=o-this.lastPinchDistance;this.lastPinchDistance=o,this.orbitCamera.distance-=n*this.distanceSensitivity*.1*(.1*this.orbitCamera.distance),this.calcMidPoint(a[0],a[1],i),this.pan(i),this.lastPinchMidPoint.copy(i)}}};var TouchControls=pc.createScript("touchControls");TouchControls.numTouches=0,TouchControls.clickDistanceTolerance=5,TouchControls.prototype.initialize=function(){this.app.touch?(this.app.touch.on(pc.EVENT_TOUCHSTART,this.onTouchStart,this),this.app.touch.on(pc.EVENT_TOUCHMOVE,this.onTouchMove,this),this.app.touch.on(pc.EVENT_TOUCHEND,this.onTouchEnd,this),this.app.touch.on(pc.EVENT_TOUCHCANCEL,this.onTouchCancel,this)):this.app.mouse&&(this.app.mouse.on(pc.EVENT_MOUSEDOWN,this.onMouseDown,this),this.app.mouse.on(pc.EVENT_MOUSEUP,this.onMouseUp,this)),this.app.keyboard&&this.app.keyboard.on(pc.EVENT_KEYDOWN,this.onKeyDown,this),this.on("destroy",this.destroy,this)},TouchControls.prototype.update=function(o){},TouchControls.prototype.onTouchStart=function(o){o.touches.length>=1&&(this.touchDownPosition={id:o.touches[0].id,x:o.touches[0].x,y:o.touches[0].y})},TouchControls.prototype.onTouchMove=function(o){},TouchControls.prototype.onTouchEnd=function(o){o.changedTouches.length>=1&&this.touchDownPosition&&Utils.distanceBetween(this.touchDownPosition.x,this.touchDownPosition.y,o.changedTouches[0].x,o.changedTouches[0].y)<TouchControls.clickDistanceTolerance&&this.touchDownPosition.id===o.changedTouches[0].id&&this.handleTouch(o.changedTouches[0].x,o.changedTouches[0].y),TouchControls.numTouches=o.touches.length},TouchControls.prototype.onTouchCancel=function(o){this.touchDownPosition=null,TouchControls.numTouches=o.touches.length},TouchControls.prototype.onKeyDown=function(o){},TouchControls.prototype.onMouseDown=function(o){this.mouseDownPosition={x:o.x,y:o.y}},TouchControls.prototype.onMouseUp=function(o){this.mouseDownPosition&&Utils.distanceBetween(this.mouseDownPosition.x,this.mouseDownPosition.y,o.x,o.y)<TouchControls.clickDistanceTolerance&&this.handleTouch(o.x,o.y)},TouchControls.prototype.handleTouch=function(o,t){this.app.fire("touch:start",{x:o,y:t})},TouchControls.prototype.destroy=function(){console.log("Destroying touchControls..."),this.app.touch.off(pc.EVENT_TOUCHSTART,this.onTouchStart,this),this.app.touch.off(pc.EVENT_TOUCHMOVE,this.onTouchMove,this),this.app.touch.off(pc.EVENT_TOUCHEND,this.onTouchEnd,this),this.app.touch.off(pc.EVENT_TOUCHCANCEL,this.onTouchCancel,this),this.app.mouse&&(this.app.mouse.off(pc.EVENT_MOUSEDOWN,this.onMouseDown,this),this.app.mouse.off(pc.EVENT_MOUSEUP,this.onMouseUp,this)),this.app.keyboard&&this.app.keyboard.off(pc.EVENT_KEYDOWN,this.onKeyDown,this)};// towerBuilder.js
/* jshint esversion: 6 */
var TowerBuilder = pc.createScript('towerBuilder');

TowerBuilder.attributes.add('testPrefab', {
    title: "Test prefab",
    type: 'entity'
});

TowerBuilder.attributes.add('numColors', {
    title: "Colors",
    type: 'number',
    default: 5
});

TowerBuilder.attributes.add('towerHeight', {
    title: "Tower Height",
    type: 'number',
    default: 12
});

TowerBuilder.prototype.initialize = function() { 
    this.startBuildingProcess();
    this.app.on("level:clear", this.clearLevel, this);
    this.app.on("level:exit", this.clearLevel, this);
    this.app.on("level:buildTower", this.startBuildingProcess, this);
};

TowerBuilder.prototype.clearLevel = function() { 
    this.removeExistingChildren();    
};


TowerBuilder.prototype.startBuildingProcess = function() { 
    this.clearLevel();    
    if(this.testPrefab) {
       this.buildTowerFromPrefab(this.testPrefab);
    } else {
        this.buildCurrentLevelTower();
    }
};


TowerBuilder.prototype.searchForPrefabs = function() {
     this.preparedPrefabs = Utils.shuffle(this.app.root.findByName("Prefabs").children.filter(prefab => !!prefab.script.towerConfig.readyToUse));
};

TowerBuilder.prototype.update = function(dt) {
    
};

TowerBuilder.prototype.removeExistingChildren = function() {
    for(let i = this.entity.children.length - 1; i > -1; i--) {
        this.entity.children[i].destroy();
    }
};

TowerBuilder.prototype.buildCurrentLevelTower = function() {
    this.buildTowerFromConfig(LevelManager.getLevelConfig(GameplayController.currentLevel));
};



TowerBuilder.prototype.buildTowerFromConfig = function(levelConfig) {
    this.entity.totalItems = 0;
    this.entity.requiredItems = 0;       
    
    const prefab = this.app.root.findByName("Prefabs").findByName(levelConfig.prefabName);
    const prefabConfig = prefab.script.towerConfig;
    const prefabPosition = prefab.getPosition();
    const layers = prefab.children;
    const numLayers = layers.length;
    
    TowerBuilder.setCurrentTowerHeight(levelConfig.towerHeight * numLayers);
    MaterialsStorage.prepareMaterialsSet(levelConfig.numColors);
    
    for(let i = 0; i < levelConfig.towerHeight; i++) {
        for (let k = 0; k < layers.length; k++) {
            const layerChildren = layers[k].children;
            for(let child of layerChildren) {
                const item = child.clone();
                item.physicalScale = prefabConfig.physicalScale;
                item.collisionScale = prefabConfig.collisionScale;
                const elevationLevel = (i * numLayers + k);
                const childPosition = child.getPosition();
                const x = childPosition.x - prefabPosition.x;
                const y = childPosition.y - prefabPosition.y + i * numLayers * prefabConfig.itemHeight + GameplayController.towerStandElevation;
                const z = childPosition.z - prefabPosition.z;
                this.addItem(item, x, y, z, elevationLevel, levelConfig.towerHeight * numLayers, prefabConfig);
                this.entity.totalItems += 1;
                if(elevationLevel >= prefabConfig.victoryLayersLimit) {
                    this.entity.requiredItems += 1;
                }
                this.entity.currentHeight = Math.max(this.entity.currentHeight, y);
            }
        }
    }
    console.log("Added " + this.entity.totalItems + ' bodies, ' + this.entity.requiredItems + ' required');
    
    if(GameplayController.currentSession) {
        GameplayController.currentSession.comboBarVolume = this.entity.requiredItems;
        GameplayController.currentSession.ballsLeft = levelConfig.numBalls;
        GameplayController.currentSession.totalBalls = levelConfig.numBalls;
    }
    
    this.entity.prefabName = levelConfig.prefabName;
    this.entity.victoryLayersLimit = prefabConfig.victoryLayersLimit;
    this.entity.numColors = levelConfig.numColors;
    this.entity.numBalls = levelConfig.numBalls;
    this.entity.towerDifficulty = levelConfig.difficulty;
    this.entity.towerHeight = levelConfig.towerHeight;
    this.entity.layersInPattern = layers;
    this.entity.physicalScale = prefabConfig.physicalScale;
    this.entity.itemHeight = prefabConfig.itemHeight;
    this.entity.layerHeight = prefabConfig.itemHeight;
    this.entity.totalObjects = this.app.root.findByName("Tower").children.length;
    this.entity.requiredAmountOfObjectsToCompleteLevel = Math.max(this.entity.totalObjects - 20, Math.floor(this.entity.totalObjects * 0.9));
    this.entity.victoryHeightLimit = this.entity.victoryLayersLimit * this.entity.layerHeight;
};

TowerBuilder.prototype.addItem = function(item, x, y, z, elevationLevel, maxElevation, prefabConfig) {
    item.activate = function() {
        if(!this.active && !prefabConfig.debugLock) {
            this.active = true;
            this.initialPosition = this.getPosition().clone();
            this.rigidbody.type = pc.BODYTYPE_DYNAMIC;           
            this.rigidbody.mass = TowerBuilder.calculateItemMass(this.elevationLevel);
            this.rigidbody.body.setSleepingThresholds(0.75, 0.75);
            this.model.meshInstances[0].material = MaterialsStorage.levelMaterials[this.materialIndex].resource;
        }
    }.bind(item);
    
     item.unlock = function() {
        if(this.rigidbody.type != pc.BODYTYPE_DYNAMIC) {
            // this.rigidbody.type = pc.BODYTYPE_DYNAMIC;           
            // this.rigidbody.mass = TowerBuilder.calculateItemMass(this.elevationLevel);
            // this.rigidbody.body.setSleepingThresholds(0.75, 0.75);
        }
    }.bind(item);
    
    item.enabled = true;
    item.active = false;
    item.maxElevation = maxElevation;
    item.originalHalfExtents = new pc.Vec3(item.collision.halfExtents.x, item.collision.halfExtents.y, item.collision.halfExtents.z);
    item.rigidbody.linearDamping = prefabConfig.linearDamping;
    item.rigidbody.angularDamping = prefabConfig.angularDamping;
    item.rigidbody.friction = prefabConfig.friction;
    item.rigidbody.restitution = prefabConfig.restitution;
    item.rigidbody.type = pc.BODYTYPE_STATIC;
    item.materialIndex = Math.floor(Math.random() * MaterialsStorage.levelMaterials.length);
    item.model.meshInstances[0].material = GameplayController.levelActive ? MaterialsStorage.disabledObjectMaterial.resource : MaterialsStorage.levelMaterials[item.materialIndex].resource;//;
    item.elevationLevel = elevationLevel;    
    item.setPosition(x, y, z);    
    this.app.root.findByName("Tower").addChild(item);    
};



TowerBuilder.prototype.buildTowerFromPrefab = function(prefab) {
    this.entity.totalItems = 0;
    this.entity.requiredItems = 0;
    const prefabConfig = prefab.script.towerConfig;
    const prefabPosition = prefab.getPosition();
    const layers = prefab.children;
    const numLayers = layers.length;
    
    TowerBuilder.setCurrentTowerHeight(this.towerHeight * numLayers);
    MaterialsStorage.prepareMaterialsSet(this.numColors);    
    
    for(let i = 0; i < this.towerHeight; i++) {
        for (let k = 0; k < layers.length; k++) {
            const layerChildren = layers[k].children;
            for(let child of layerChildren) {
                const item = child.clone();
                item.physicalScale = prefabConfig.physicalScale;
                item.collisionScale = prefabConfig.collisionScale;
                const elevationLevel = (i * numLayers + k);
                const childPosition = child.getPosition();
                const x = childPosition.x - prefabPosition.x;
                const y = childPosition.y - prefabPosition.y + i * numLayers * prefabConfig.itemHeight + GameplayController.towerStandElevation;
                const z = childPosition.z - prefabPosition.z;
                this.addItem(item, x, y, z, elevationLevel, this.towerHeight * numLayers, prefabConfig);
                this.entity.totalItems += 1;
                if(elevationLevel >= prefabConfig.victoryLayersLimit) {
                    this.entity.requiredItems += 1;
                }
                this.entity.currentHeight = Math.max(this.entity.currentHeight, y);
            }
        }
    }
    console.log("Added " + this.entity.totalItems + ' bodies, ' + this.entity.requiredItems + ' required, tower height ', this.towerHeight);
    
    if(GameplayController.currentSession) {
        GameplayController.currentSession.comboBarVolume = this.entity.requiredItems;
    }
    
    this.entity.victoryLayersLimit = prefabConfig.victoryLayersLimit;
    this.entity.numColors = this.numColors;
    this.entity.numBalls = prefabConfig.numBalls;
    this.entity.towerDifficulty = prefabConfig.difficulty;
    this.entity.towerHeight = this.towerHeight;
    this.entity.layersInPattern = layers;
    this.entity.physicalScale = prefabConfig.physicalScale;
    this.entity.itemHeight = prefabConfig.itemHeight;
    this.entity.layerHeight = prefabConfig.itemHeight;
    this.entity.totalObjects = this.app.root.findByName("Tower").children.length;
    this.entity.requiredAmountOfObjectsToCompleteLevel = Math.max(this.entity.totalObjects - 20, Math.floor(this.entity.totalObjects * 0.9));
    this.entity.victoryHeightLimit = this.entity.victoryLayersLimit * this.entity.layerHeight;

};

TowerBuilder.setCurrentTowerHeight = function(value) {
    TowerBuilder.towerMaxHeight = value;
    TowerBuilder.baseMass = Math.min(Number.MAX_SAFE_INTEGER, Math.pow(2, TowerBuilder.towerMaxHeight) * 1000);
};

TowerBuilder.calculateItemMass = function(elevationLevel) {
    return TowerBuilder.baseMass / Math.pow(2, elevationLevel);
};

var Utils=pc.createScript("utils");Utils.prototype.initialize=function(){Utils.app=this.app},Utils.prototype.update=function(t){},pc.Entity.prototype.delayedCall=function(t,i,e){for(var n=0;this["delayedExecuteTween"+n];)n++;var o="delayedExecuteTween"+n;return this[o]=this.tween(void 0).to(1,t/1e3,pc.Linear),this[o].start(),this[o].once("complete",function(){i.call(e),this[o]=null},this),this[o]},pc.Entity.prototype.childrenAlphaAppear=function(t,i,e,n){for(var o=this.children.length-1;o>-1;o--){var l=this.children[o];if(l instanceof pc.Entity&&l.childrenAlphaAppear(t,i,e,n),l.element){var a=l.element.opacity;l.element.opacity=t,l.tween(l.element).to({opacity:a},i,e).delay(n).start()}}},pc.GraphicsDevice.prototype.updateClientRect=function(){window.visualViewport?(this.clientRect=this.canvas.getBoundingClientRect(),this.clientRect.x=window.visualViewport.offsetLeft,this.clientRect.y=window.visualViewport.offsetTop,this.clientRect.width=window.visualViewport.width,this.clientRect.height=window.visualViewport.height):this.clientRect=this.canvas.getBoundingClientRect()},Utils.lerpColor=function(t,i,e,n){return n.set(t.r+(i.r-t.r)*e,t.g+(i.g-t.g)*e,t.b+(i.b-t.b)*e,1)},Utils.distanceBetween=function(t,i,e,n){return Math.sqrt((e-t)*(e-t)+(n-i)*(n-i))},Utils.checkContact=function(t,i){var e=t.getPosition(),n=i.getPosition();return Math.sqrt((e.x-n.x)*(e.x-n.x)+(e.z-n.z)*(e.z-n.z))<=t.script.item.collisionDiameter*t.collisionScale/2+i.script.item.collisionDiameter*i.collisionScale/2&&Math.abs(e.y-n.y)<=t.script.item.collisionHeight*t.collisionScale/2+i.script.item.collisionHeight*i.collisionScale/2},Utils.checkContactRough=function(t,i){var e=1.1,n=t.getPosition(),o=i.getPosition();return Math.sqrt((n.x-o.x)*(n.x-o.x)+(n.z-o.z)*(n.z-o.z))<=t.script.item.collisionDiameter*t.collisionScale*e/2+i.script.item.collisionDiameter*i.collisionScale*e/2&&Math.abs(n.y-o.y)<=t.script.item.collisionHeight*t.collisionScale*e/2+i.script.item.collisionHeight*i.collisionScale*e/2},Utils.contactTestInternal=function(t,i,e){var n=new Ammo.ConcreteContactResultCallback;n.addSingleResult=function(n,o,l,a,r,c,s){e&&e(t,i)},Utils.app.systems.rigidbody.dynamicsWorld.contactPairTest(t.rigidbody.body,i.rigidbody.body,n)},Utils.distanceXZ=function(t,i){return Math.sqrt((t.x-i.x)*(t.x-i.x)+(t.z-i.z)*(t.z-i.z))},Utils.distanceBetweenEntities=function(t,i){return Math.sqrt((t.x-i.x)*(t.x-i.x)+(t.y-i.y)*(t.y-i.y)+(t.z-i.z)*(t.z-i.z))},Utils.tweenText=function(t,i,e,n,o,l,a){t.element.textValue=i,t.element.text=""+Math.round(i),t.tween(t.element).to({textValue:e},n,l).delay(o).on("update",function(){t.element.text=""+Math.round(t.element.textValue)}).start()},Utils.getRandomItem=function(t,i,e){if(null===t)return null;void 0===i&&(i=0),void 0===e&&(e=t.length);var n=i+Math.floor(Math.random()*e);return void 0===t[n]?null:t[n]},Utils.removeRandomItem=function(t,i,e){if(null===t)return null;void 0===i&&(i=0),void 0===e&&(e=t.length);var n=i+Math.floor(Math.random()*e);if(n<t.length){var o=t.splice(n,1);return void 0===o[0]?null:o[0]}return null},Utils.shuffle=function(t){for(var i=t.length-1;i>0;i--){var e=Math.floor(Math.random()*(i+1)),n=t[i];t[i]=t[e],t[e]=n}return t},Utils.humanizeTime=function(t){var i=t,e=Math.floor(i/3600);i%=3600;var n=Math.floor(i/60);return(e<10?"0":"")+e+":"+(n<10?"0":"")+n+":"+((i%=60)<10?"0":"")+Math.floor(i)},Utils.randomInRangeSigned=function(t,i){return Math.random()<=.5?pc.math.random(Math.min(-t,-i),Math.max(-t,-i)):pc.math.random(Math.min(t,i),Math.max(t,i))},Utils.vibrate=function(t){GameplayController.enableVibration&&window.navigator&&window.navigator.vibrate&&window.navigator.vibrate(t)};// ballController.js
/* jshint esversion: 6 */
var BallController = pc.createScript('ballController');

BallController.BODYGROUP_BALL = pc.BODYGROUP_USER_5;

BallController.prototype.initialize = function() {
    this.app.on("level:clear", this.clear, this);
    this.app.on("level:createBall", this.createBall, this);
    this.app.on("cannon:create", this.createCannonBall, this);
    this.app.on("powerup:activate", this.powerupActivated, this);
    this.app.on("colorball:break", this.dispatchColorBallBreak, this);
    this.app.on("ball:verifyColor", this.verifyBallColor, this);
    this.app.on("level:exit", this.exitLevel, this);
    this.clear();
};

BallController.prototype.clear = function() {
    for(let i = this.entity.children.length - 1; i > -1; i--) {
        this.entity.children[i].destroy();
    }
    const trashContainer = this.app.root.findByName("TrashContainer");
    for(let i = trashContainer.children.length - 1; i > -1; i--) {
        trashContainer.children[i].destroy();
    }
    this.preparedBall = null;
};


BallController.prototype.createBall = function() {
    this.prepareNextBall();  
};

BallController.prototype.createCannonBall = function() {
    if(!GameplayController.levelActive || !GameplayController.currentSession) {
        return;
    }
    
    if(this.preparedBall) {
        this.preparedBall.destroy();
    }  
     for(let i = this.entity.children.length - 1; i > -1; i--) {
        this.entity.children[i].destroy();
    }

    const ball = BallController.ball = this.app.root.findByName("CannonBall").clone();
    ball.enabled = true;
    this.app.root.findByName("ActiveBall").addChild(ball);
    this.preparedBall = ball;
};


BallController.prototype.createColorBall = function() {
    if(!GameplayController.levelActive || !GameplayController.currentSession) {
        return;
    }
  
    if(this.preparedBall) {
        this.preparedBall.destroy();
    }  
     for(let i = this.entity.children.length - 1; i > -1; i--) {
        this.entity.children[i].destroy();
    }

    GameplayController.currentSession.colorBallAvailable = true;
    
    const ball = BallController.ball = this.app.root.findByName("ColorBall").clone();
    ball.enabled = true;
    this.app.root.findByName("ActiveBall").addChild(ball);
    this.preparedBall = ball;
};


BallController.prototype.powerupActivated = function(dataKey) {
    if(!GameplayController.levelActive || !GameplayController.currentSession) {
        return;
    }
    
    if(dataKey != "Multiball") {
        return;
    }
    
    this.createColorBall();
};


BallController.prototype.exitLevel = function() {
    this.clear();  
};

BallController.prototype.dispatchColorBallBreak = function(worldPosition, targetItem, initialVelocity) {
   if(!GameplayController.levelActive || !GameplayController.currentSession) {
       return;
   }
    
    for(let i = 0; i < GameplayController.numColorBalls; i++) {
        const ball = this.app.root.findByName("MiniColorBall").clone();
        ball.enabled = true;
        ball.launched = true;
        ball.launchVelocity = initialVelocity;
        ball.launchPosition = worldPosition.clone();
        ball.launchTarget = targetItem;
        this.app.root.findByName("TrashContainer").addChild(ball);  
    }
};

BallController.prototype.update = function(dt) {

};

BallController.prototype.verifyBallColor = function() {
   if(!GameplayController.levelActive || !GameplayController.currentSession ||  GameplayController.currentSession.finished || !this.preparedBall) {
       return;
   }
   if(this.preparedBall.script.ball.isCannonBall || this.preparedBall.script.ball.isColorBall) {
       return;
   } 
   const availableColors = this.app.root.findByName("Tower").script.towerController.getAvailableColors();
   if(availableColors.indexOf(this.preparedBall.materialIndex) === -1) {
       console.log("ball color replaced");
       this.preparedBall.setColor(Utils.getRandomItem(availableColors));
   } 
};

BallController.prototype.prepareNextBall = function() {
    if(!GameplayController.levelActive || !GameplayController.currentSession) {
        return;
    }
    
    if(GameplayController.currentSession.ballsLeft <= 0) {
        return;
    }
    
    if(GameplayController.currentSession.cannonBallAvailable) {
        this.createCannonBall();
        return;
    } else if(GameplayController.currentSession.colorBallAvailable) {
        this.createColorBall();
        return;
    }
    
    const ball = BallController.ball = this.app.root.findByName("Ball").clone();
    ball.enabled = true;
    this.app.root.findByName("ActiveBall").addChild(ball);
    this.preparedBall = ball;
};

BallController.prototype.shoot = function(targetEntity, targetPosition) {
    if(this.preparedBall) {  
        const autoDestroyTarget = GameplayController.autoDestroyTarget && this.preparedBall.materialIndex === targetEntity.materialIndex;
        if(this.preparedBall.script.ball.shoot(targetEntity, targetPosition, autoDestroyTarget)) {
            this.preparedBall = null;
            this.prepareNextBall();
        }
    }
};


var MaterialsStorage=pc.createScript("materialsStorage");MaterialsStorage.attributes.add("disabledObjectMaterial",{title:"Disabled materials",type:"asset",assetType:"material"}),MaterialsStorage.attributes.add("objectMaterials",{title:"Object materials",type:"asset",assetType:"material",array:!0}),MaterialsStorage.prototype.initialize=function(){MaterialsStorage.objectMaterials=this.objectMaterials,MaterialsStorage.disabledObjectMaterial=this.disabledObjectMaterial},MaterialsStorage.prototype.update=function(a){},MaterialsStorage.prepareMaterialsSet=function(a){for(var t=Utils.shuffle(MaterialsStorage.objectMaterials.slice()),e=[],r=0;r<a;r++)e.push(t[r%t.length]);MaterialsStorage.levelMaterials=e};// TowerController.js
/* jshint esversion: 6 */
var TowerController = pc.createScript('towerController');


TowerController.prototype.initialize = function() {
    this.entity.levelProgress = 0;
    this.entity.minUnlockedElevationLevel = Number.MAX_VALUE;
    this.timeouts = [];
    this.app.on("tower:hit", this.handleTowerHit, this);    
    this.app.on("level:restart", this.restart, this);
    this.app.on("powerup:activate", this.beginEarthquake, this);
    this.app.on("tower:destroyed", this.explodeRestOfItems, this);
    
    this.app.root.findByName("TowerStand").collision.on('collisionstart', (contact) => { 
        if(contact.other && contact.other.rigidbody && contact.other.parent && contact.other.parent.name === "Tower" && contact.other.initialPosition) {
            const position = contact.other.getPosition();
            const yDistance = Math.abs(position.y - contact.other.initialPosition.y);
            const xzDistance = Utils.distanceXZ(position, contact.other.initialPosition);
            if(yDistance >= this.entity.itemHeight * this.entity.victoryLayersLimit * 1.666 && xzDistance <= GameplayController.towerStandDiameter / 2 * 0.8) {
                 contact.other.script.item.killItem(0);
            } 
        }
    });
};

TowerController.prototype.restart = function() {
    this.entity.levelProgress = 0;
    this.entity.currentHeight = 0;
    this.entity.minUnlockedElevationLevel = Number.MAX_VALUE;
    for(let i = this.timeouts.length - 1; i > -1; i--) {
       clearTimeout(this.timeouts[i]);
    }
    this.timeouts = [];
};

TowerController.prototype.update = function(dt) {
    if(!GameplayController.levelActive || !GameplayController.currentSession) {
        return;
    }
    this.updateChildren();
        
    if(GameplayController.currentSession && GameplayController.currentSession.earthquakeTimer > 0) {
        this.entity.children.forEach(child => child.active && child.rigidbody.applyImpulse(new pc.Vec3(pc.math.random(-2, 2) * child.rigidbody.mass, 0, pc.math.random(-2, 2) * child.rigidbody.mass), new pc.Vec3(0, 0, 0)));  
    }
};

TowerController.prototype.getAvailableColors = function() {
    const allColors = [];
    const allColorsButLastUsed = [];
    const colorsAboveFinishLine = [];
    this.entity.children.forEach(child => {
        if(child.active) {
            if(allColors.indexOf(child.materialIndex) === -1 ) {
                allColors.push(child.materialIndex);
            }
            if(allColorsButLastUsed.indexOf(child.materialIndex) === -1 && child.materialIndex != GameplayController.currentSession.lastBallColor) {
                allColorsButLastUsed.push(child.materialIndex);
            }
            if( colorsAboveFinishLine.indexOf(child.materialIndex) === -1 && child.materialIndex != GameplayController.currentSession.lastBallColor && child.getPosition().y >= GameplayController.towerStandElevation + this.entity.victoryHeightLimit) {
                colorsAboveFinishLine.push(child.materialIndex);
            }
        }
    });
    return colorsAboveFinishLine.length > 0 ? colorsAboveFinishLine :  allColorsButLastUsed.length > 0 ? allColorsButLastUsed : allColors.length > 0 ? allColors : [Utils.getRandomItem(MaterialsStorage.levelMaterials)];
};

TowerController.prototype.updateChildren = function() {
    
    this.calculateCurrentHeight();
    
    const towerStand =  this.app.root.findByName("TowerStand");
    const towerStandPosition = towerStand.getPosition();
    const towerStandRadius = towerStand.collision.radius;
    
    for(let i = this.entity.children.length - 1; i > -1; i--) {
        const child = this.entity.children[i];
        const childPosition = child.getPosition();
        
        /* restrict tower height */
        if(!child.active &&  this.entity.currentHeight - childPosition.y <= (GameplayController.availableTowerHeight - 1) * 1.01 * this.entity.itemHeight) {
            child.activate();
        }
        
        /* check if item is inside of the tower */
        if(Utils.distanceBetween(childPosition.x, childPosition.z, towerStandPosition.x, towerStandPosition.z) > towerStandRadius) {
            child.script.item.removeFromTower();
        }
    }
    
    const destroyedChildrenOutOfRequired = this.entity.totalObjects - this.entity.children.length;
    const childrenLeft = this.entity.children.reduce((sum, child) => (child.elevationLevel >= this.entity.victoryLayersLimit && child.getPosition().y > GameplayController.towerStandElevation + this.entity.victoryHeightLimit) ? sum + 1 : sum, 0);
    const currentProgress = pc.math.clamp(1 - childrenLeft / this.entity.requiredItems, 0, 1);
    if(this.entity.levelProgress != currentProgress) {
        this.entity.levelProgress = currentProgress;    
        this.app.fire("level:progress", this.entity.levelProgress);
    }
};

TowerController.prototype.calculateCurrentHeight = function() {
    this.entity.currentHeight = this.entity.children.reduce((prev, current) => Math.max(prev, current.getPosition().y), 0);
    return this.entity.currentHeight;
};

TowerController.prototype.explodeRestOfItems = function() {
    this.entity.children.forEach((child, index) => child.script.item.explode(500 + index * 35, true));
};


TowerController.prototype.beginEarthquake = function(dataKey) {
   if(dataKey === "Earthquake" && GameplayController.currentSession) {
       GameplayController.currentSession.comboCounter = 0;
       GameplayController.currentSession.lastItemTimestamp = 0;
       
       GameplayController.currentSession.earthquakeTimer = 1;
       Utils.vibrate([30, 20, 30, 20, 30, 20, 30, 20, 30, 20, 30, 20, 30, 20, 30, 20, 30, 20, 30, 20, 30, 20, 30, 20, 30, 20, 30, 20, 30, 20, 30, 20, 30, 20, 30, 20]); 
       this.app.fire("audio:play", "earthQuake");
       this.entity.children.forEach(child => child.active && child.rigidbody.applyImpulse(new pc.Vec3(pc.math.random(-10, 10) * child.rigidbody.mass, pc.math.random(-10, 10) * child.rigidbody.mass, pc.math.random(-10, 10) * child.rigidbody.mass), new pc.Vec3(0, 0, 0)));  
   
       Apicontroller.trackStatsChange("powerup_earthquake_used", 1);
   }
};

TowerController.prototype.handleTowerHit = function(targetObject) {
    GameplayController.lastDestroyedColor = targetObject.materialIndex;
    
    /* activte all sleeping bodies */
    this.entity.children.forEach(child => child && child.active && child.rigidbody && child.rigidbody.activate());
    
    if(targetObject && targetObject.script && targetObject.script.item) {
        targetObject.script.item.chainedExplode(0);
    }
};

// explosionManager.js
/* jshint esversion: 6 */
var ExplosionManager = pc.createScript('explosionManager');


ExplosionManager.prototype.initialize = function() {
    this.particleCache = [];
    this.activeParticles = [];
    this.prepareCache();
    this.app.on("explosion", this.createExplosion, this);
    this.app.on("level:restart", this.reset, this);
    this.on("destroy", this.destroy, this);
};

ExplosionManager.prototype.reset = function() {
    for(let i = this.activeParticles.length - 1; i > -1; i--) {
        this.resetPaticle(this.activeParticles[i]);
    }
};

ExplosionManager.prototype.destroy = function() {
    this.app.off("explosion", this.createExplosion, this);
};

ExplosionManager.prototype.update = function(dt) {
    this.activeParticles.forEach(child => this.updateChild(child, dt));
};

ExplosionManager.prototype.createExplosion = function(x, y, z, materialIndex, numParticles) {
    numParticles = numParticles || GameplayController.particlesPerObject;
    if(this.particleCache && this.particleCache.length < GameplayController.particleCacheSize * 0.7) {
        numParticles = Math.max(2, Math.floor(numParticles / 2));
    }
    for(let i = 0; i < numParticles; i++) {
        this.addParticle(x, y, z, materialIndex);
    }
    this.app.fire("audio:play", "pop0" + Math.floor(Math.random() * 4 + 1));
};

ExplosionManager.prototype.updateChild = function(child, dt) {
   //position
   const pos = child.getPosition();
   pos.x += child.speedX * dt;
   pos.y += child.speedY * dt;
   pos.z += child.speedZ * dt;
   child.setPosition(pos);
   child.speedY += child.gravity * dt;

   //scale
   child.currentScale += child.scaleSpeed * dt;
   child.scaleSpeed += child.scaleAcceleration * dt;
   if(child.currentScale <= 0) {
       child.currentScale = 0;
       child.completed = true;
   }
   child.setLocalScale(child.currentScale, child.currentScale, child.currentScale);

    if(child.completed) {
       this.resetPaticle(child);
   }
};


ExplosionManager.prototype.addParticle = function(x, y, z, materialIndex) {
    let particle;

    if(this.particleCache.length > 0) {
        particle = this.particleCache.splice(this.particleCache.length - 1, 1)[0];
    } else {
        particle = this.app.root.findByName("Particle").clone();
        this.entity.addChild(particle);
    }

    particle.enabled = true;
    particle.model.meshInstances[0].material = MaterialsStorage.levelMaterials[materialIndex].resource;
    particle.setPosition(x, y, z);
    particle.speedX = pc.math.random(-6, 6);
    particle.speedY = pc.math.random(-2, 10);
    particle.speedZ = pc.math.random(-6, 6);
    particle.gravity = pc.math.random(-30, -15);        
    particle.currentScale = pc.math.random(0.1, 0.4);
    particle.setLocalScale(particle.currentScale, particle.currentScale, particle.currentScale);
    particle.scaleSpeed = pc.math.random(1.25, 2.5);
    particle.scaleAcceleration = pc.math.random(-12, -5);
    particle.completed = false;

    this.activeParticles.push(particle);
};


ExplosionManager.prototype.resetPaticle = function(particle) {
    const index = this.activeParticles.indexOf(particle);
    if(index != -1) {
        this.activeParticles.splice(index, 1);
    }
    particle.enabled = false;
    particle.setPosition(0, -50, 0);
    this.particleCache.push(particle);
};


ExplosionManager.prototype.prepareCache = function() {
    this.particleCache = [];
    const basicParticle = this.app.root.findByName("Particle");
    for(let i = 0; i < GameplayController.particleCacheSize; i++) {
        const particle = basicParticle.clone();
        particle.enabled = false;
        particle.setPosition(0, -50, 0);
        particle.completed = true;
        this.entity.addChild(particle);
        this.particleCache.push(particle);
    }
    
    console.log("Prepared ", this.particleCache.length, " particles");
};

var ScrollingTexture=pc.createScript("scrollingTexture");ScrollingTexture.attributes.add("speed",{type:"vec2"}),ScrollingTexture.tmp=new pc.Vec2,ScrollingTexture.prototype.initialize=function(){},ScrollingTexture.prototype.update=function(e){var t=ScrollingTexture.tmp;t.set(this.speed.x,this.speed.y),t.scale(e),this.entity.model.meshInstances[0].material.diffuseMapOffset.add(t),this.entity.model.meshInstances[0].material.normalMapOffset.add(t),this.entity.model.meshInstances[0].material.update()};// sandbox.js
/* jshint esversion: 6 */
var Sandbox = pc.createScript('sandbox');

// initialize code called once per entity
Sandbox.prototype.initialize = function() {
    
     this.app.systems.collision.implementations.mesh.createPhysicalShape = function(entity, data) {
            if (typeof Ammo !== 'undefined' && data.model) {
                var model = data.model;
                var shape = new Ammo.btConvexHullShape();

                var i, j;
                for (i = 0; i < model.meshInstances.length; i++) {
                    var meshInstance = model.meshInstances[i];
                    var mesh = meshInstance.mesh;
                    var ib = mesh.indexBuffer[pc.RENDERSTYLE_SOLID];
                    var vb = mesh.vertexBuffer;

                    var format = vb.getFormat();
                    var stride = format.size / 4;
                    var positions;
                    for (j = 0; j < format.elements.length; j++) {
                        var element = format.elements[j];
                        if (element.name === pc.SEMANTIC_POSITION) {
                            positions = new Float32Array(vb.lock(), element.offset);
                        }
                    }

                    var indices = new Uint16Array(ib.lock());
                    var numTriangles = mesh.primitive[0].count / 3;

                    var v1 = new Ammo.btVector3();
                    var v2 = new Ammo.btVector3();
                    var v3 = new Ammo.btVector3();
                    var i1, i2, i3;

                    var base = mesh.primitive[0].base;
                    for (j = 0; j < numTriangles; j++) {
                        i1 = indices[base + j * 3] * stride;
                        i2 = indices[base + j * 3 + 1] * stride;
                        i3 = indices[base + j * 3 + 2] * stride;
                        v1.setValue(positions[i1], positions[i1 + 1], positions[i1 + 2]);
                        v2.setValue(positions[i2], positions[i2 + 1], positions[i2 + 2]);
                        v3.setValue(positions[i3], positions[i3 + 1], positions[i3 + 2]);
                        shape.addPoint(v1, true);
                        shape.addPoint(v2, true);
                        shape.addPoint(v3, true);
                    }
                }

                var entityTransform = entity.getWorldTransform();
                var scale = entityTransform.getScale();
                var vec = new Ammo.btVector3();
                vec.setValue(scale.x, scale.y, scale.z);
                shape.setLocalScaling(vec);

                return shape;
            }
            return undefined;
    };  

    
//     this.app.systems.rigidbody.on('contact', (result) => {
//         console.log(result); 
//     });
    
     var box3 = this.app.root.findByName("Box3");
    
       box3.removeComponent('rigidbody');
       box3.removeComponent('collision');
    
       box3.addComponent("collision", {
            type: 'box',
            halfExtents: new pc.Vec3(3, 0.51, 0.51)
            // type: "mesh",
            // asset: 23506291
        });
    
      box3.collision.on('triggerenter', (entity) => {
            console.log('Triggered entity', entity.name);
        }, this);
    
    document.addEventListener('keypress', () => {
        
        this.app.root.findByName("Box1").rigidbody.activate();
        this.app.root.findByName("Box2").rigidbody.activate();
        this.app.root.findByName("Box0").rigidbody.activate();
        
        console.log("Keypress");

        // box3.removeComponent('rigidbody');
        // box3.removeComponent('collision');
        
        // box3.addComponent("collision", {
        //     type: 'box',
        //     halfExtents: new pc.Vec3(0.51, 0.51, 0.51)
        //     // type: "mesh",
        //     // asset: 23506291
        // });
        
      

      
    
        

    });
    
};

// update code called every frame
Sandbox.prototype.update = function(dt) {
    
    // var resultCallback = new Ammo.ConcreteContactResultCallback();
    //     resultCallback.addSingleResult = function(
    //         manifoldPoint,
    //         collisionObjectA,
    //         id0,
    //         index0,
    //         collisionObjectB,
    //         id1,
    //         index1
    //     ) {
    //         var objA = Ammo.wrapPointer(collisionObjectA, Ammo.btRigidBody);
    //         console.log(collisionObjectA, objA);
    //         var manifold = Ammo.wrapPointer(manifoldPoint.ptr,Ammo.btManifoldPoint);
    //         var localPointA = manifold.get_m_localPointA();
    //         var localPointB = manifold.get_m_localPointB();    
    //         //console.log("Manifold ", manifold);
    //     };
    // this.app.systems.rigidbody.dynamicsWorld.contactTest(this.app.root.findByName("Box1").rigidbody.body, resultCallback);
    
    
    
    
//     var resultCallback = new Ammo.ConcreteContactResultCallback();
//         resultCallback.addSingleResult = function(
//             manifoldPoint,
//             collisionObjectA,
//             id0,
//             index0,
//             collisionObjectB,
//             id1,
//             index1
//         ) {
//             var objA = Ammo.wrapPointer(collisionObjectA, Ammo.btRigidBody);
//             console.log(collisionObjectA, objA);
//             var manifold = Ammo.wrapPointer(manifoldPoint.ptr,Ammo.btManifoldPoint);
//             var localPointA = manifold.get_m_localPointA();
//             var localPointB = manifold.get_m_localPointB();    
//             console.log("Manifold ", manifold);
//         };
//     this.app.systems.rigidbody.dynamicsWorld.contactPairTest(this.app.root.findByName("Box1").rigidbody.body, this.app.root.findByName("Box2").rigidbody.body, resultCallback);


};



var Compound=pc.createScript("compound");Compound.prototype.initialize=function(){var t=new Ammo.btCompoundShape;this.entity.findByTag("compound-shape").forEach(function(i){var o=i.getLocalPosition(),n=i.getLocalRotation(),e=i.collision.data.halfExtents,r=new Ammo.btBoxShape(new Ammo.btVector3(e.x,e.y,e.z)),d=new Ammo.btQuaternion(n.x,n.y,n.z,1),a=new Ammo.btVector3(o.x,o.y,o.z);t.addChildShape(new Ammo.btTransform(d,a),r),i.destroy()});var i=this.entity.getPosition(),o=new Ammo.btVector3(i.x,i.y,i.z),n=new Ammo.btDefaultMotionState(new Ammo.btTransform(new Ammo.btQuaternion(0,0,0,1),o)),e=new Ammo.btVector3(0,0,0);t.calculateLocalInertia(this.entity.rigidbody.mass,e);var r=new Ammo.btRigidBodyConstructionInfo(this.entity.rigidbody.mass,n,t,e);this.rigidbody=new Ammo.btRigidBody(r),this.rigidbody.setRestitution(this.entity.rigidbody.restitution),this.rigidbody.setFriction(this.entity.rigidbody.friction),this.rigidbody.setDamping(this.entity.rigidbody.linearDamping,this.entity.rigidbody.angularDamping);var d=this.entity.rigidbody.linearFactor,a=this.entity.rigidbody.angularFactor;this.rigidbody.setLinearFactor(new Ammo.btVector3(d.x,d.y,d.z)),this.rigidbody.setAngularFactor(new Ammo.btVector3(a.x,a.y,a.z)),this.rigidbody.entity=this.entity,this.app.systems.rigidbody.dynamicsWorld.addRigidBody(this.rigidbody),this.entity.rigidbody.body=this.rigidbody},Compound.prototype.update=function(t){var i=new Ammo.btTransform;this.rigidbody.getMotionState().getWorldTransform(i);var o=i.getOrigin(),n=i.getRotation();this.entity.setRotation(new pc.Quat(n.x(),n.y(),n.z(),n.w())),this.entity.setPosition(o.x(),o.y(),o.z())};var ConvexHull=pc.createScript("convexHull");ConvexHull.prototype.initialize=function(){var t,e=new Ammo.btConvexHullShape,o=this.prepareTriangles(),n=new Ammo.btVector3(0,0,0),r=new Ammo.btVector3(0,0,0),s=new Ammo.btVector3(0,0,0);for(i=0;i<o.length;i++)t=o[i],n.setX(t[0].x),n.setY(t[0].y),n.setZ(t[0].z),e.addPoint(n,!0),r.setX(t[1].x),r.setY(t[1].y),r.setZ(t[1].z),e.addPoint(r,!0),s.setX(t[2].x),s.setY(t[2].y),s.setZ(t[2].z),e.addPoint(s,!0);var a=this.entity.getWorldTransform().getScale();e.setLocalScaling(new Ammo.btVector3(.96*a.x,.96*a.y,.96*a.z));var d=this.entity.getPosition(),y=new Ammo.btVector3(d.x,d.y,d.z),m=this.entity.getRotation(),l=new Ammo.btQuaternion(m.x,m.y,m.z,m.w),c=new Ammo.btDefaultMotionState(new Ammo.btTransform(l,y)),g=new Ammo.btVector3(0,0,0);e.calculateLocalInertia(this.entity.rigidbody.mass,g);var b=new Ammo.btRigidBodyConstructionInfo(this.entity.rigidbody.mass,c,e,g);this.rigidbody=new Ammo.btRigidBody(b),this.rigidbody.setRestitution(this.entity.rigidbody.restitution),this.rigidbody.setFriction(this.entity.rigidbody.friction),this.rigidbody.setDamping(this.entity.rigidbody.linearDamping,this.entity.rigidbody.angularDamping);var h=this.entity.rigidbody.linearFactor,u=this.entity.rigidbody.angularFactor;this.rigidbody.setLinearFactor(new Ammo.btVector3(h.x,h.y,h.z)),this.rigidbody.setAngularFactor(new Ammo.btVector3(u.x,u.y,u.z)),this.rigidbody.entity=this.entity,this.app.systems.rigidbody.dynamicsWorld.addRigidBody(this.rigidbody),this.entity.rigidbody.body=this.rigidbody},ConvexHull.prototype.prepareTriangles=function(){var t,i,e=this.entity.model,o=[];for(t=0;t<e.meshInstances.length;t++){var n,r=e.meshInstances[t].mesh,s=r.indexBuffer[pc.RENDERSTYLE_SOLID],a=r.vertexBuffer,d=a.getFormat(),y=d.size/4;for(i=0;i<d.elements.length;i++){var m=d.elements[i];m.name===pc.SEMANTIC_POSITION&&(n=new Float32Array(a.lock(),m.offset))}var l,c,g,b=new Uint16Array(s.lock()),h=r.primitive[0].count/3,u=new Ammo.btVector3,p=new Ammo.btVector3,A=new Ammo.btVector3,v=r.primitive[0].base;for(i=0;i<h;i++){l=b[v+3*i]*y,c=b[v+3*i+1]*y,g=b[v+3*i+2]*y,u.setValue(n[l],n[l+1],n[l+2]),p.setValue(n[c],n[c+1],n[c+2]),A.setValue(n[g],n[g+1],n[g+2]);var w=[{x:n[l],y:n[l+1],z:n[l+2]},{x:n[c],y:n[c+1],z:n[c+2]},{x:n[g],y:n[g+1],z:n[g+2]}];o.push(w)}return o}},ConvexHull.prototype.update=function(t){};var PanoramicCamera=pc.createScript("panoramicCamera");PanoramicCamera.attributes.add("distanceMax",{type:"number",default:0,title:"Distance Max",description:"Setting this at 0 will give an infinite distance limit"}),PanoramicCamera.attributes.add("distanceMin",{type:"number",default:0,title:"Distance Min"}),PanoramicCamera.attributes.add("pitchAngleMax",{type:"number",default:90,title:"Pitch Angle Max (degrees)"}),PanoramicCamera.attributes.add("pitchAngleMin",{type:"number",default:-90,title:"Pitch Angle Min (degrees)"}),PanoramicCamera.attributes.add("inertiaFactor",{type:"number",default:0,title:"Inertia Factor",description:"Higher value means that the camera will continue moving after the user has stopped dragging. 0 is fully responsive."}),PanoramicCamera.attributes.add("focusEntity",{type:"entity",title:"Focus Entity",description:"Entity for the camera to focus on. If blank, then the camera will use the whole scene"}),PanoramicCamera.attributes.add("frameOnStart",{type:"boolean",default:!0,title:"Frame on Start",description:'Frames the entity or scene at the start of the application."'}),Object.defineProperty(PanoramicCamera.prototype,"distance",{get:function(){return this._targetDistance},set:function(t){this._targetDistance=this._clampDistance(t)}}),Object.defineProperty(PanoramicCamera.prototype,"pitch",{get:function(){return this._targetPitch},set:function(t){this._targetPitch=this._clampPitchAngle(t)}}),Object.defineProperty(PanoramicCamera.prototype,"yaw",{get:function(){return this._targetYaw},set:function(t){this._targetYaw=t;var i=(this._targetYaw-this._yaw)%360;this._targetYaw=i>180?this._yaw-(360-i):i<-180?this._yaw+(360+i):this._yaw+i}}),Object.defineProperty(PanoramicCamera.prototype,"pivotPoint",{get:function(){return this._pivotPoint},set:function(t){this._pivotPoint.copy(t)}}),PanoramicCamera.prototype.focus=function(t){this._buildAabb(t,0);var i=this._modelsAabb.halfExtents,a=Math.max(i.x,Math.max(i.y,i.z));a/=Math.tan(.5*this.entity.camera.fov*pc.math.DEG_TO_RAD),a*=2,this.distance=a,this._removeInertia(),this._pivotPoint.copy(this._modelsAabb.center)},PanoramicCamera.distanceBetween=new pc.Vec3,PanoramicCamera.prototype.resetAndLookAtPoint=function(t,i){this.pivotPoint.copy(i),this.entity.setPosition(t),this.entity.lookAt(i);var a=PanoramicCamera.distanceBetween;a.sub2(i,t),this.distance=a.length(),this.pivotPoint.copy(i);var e=this.entity.getRotation();this.yaw=this._calcYaw(e),this.pitch=this._calcPitch(e,this.yaw),this._removeInertia(),this._updatePosition()},PanoramicCamera.prototype.resetAndLookAtEntity=function(t,i){this._buildAabb(i,0),this.resetAndLookAtPoint(t,this._modelsAabb.center)},PanoramicCamera.prototype.reset=function(t,i,a){this.pitch=i,this.yaw=t,this.distance=a,this._removeInertia()},PanoramicCamera.prototype.initialize=function(){var t=this,i=function(){t._checkAspectRatio()};window.addEventListener("resize",i,!1),this._checkAspectRatio(),this._modelsAabb=new pc.BoundingBox,this._buildAabb(this.focusEntity||this.app.root,0),this.entity.lookAt(this._modelsAabb.center),this._pivotPoint=new pc.Vec3,this._pivotPoint.copy(this._modelsAabb.center);var a=this.entity.getRotation();if(this._yaw=this._calcYaw(a),this._pitch=this._clampPitchAngle(this._calcPitch(a,this._yaw)),this.entity.setLocalEulerAngles(this._pitch,this._yaw,0),this._distance=0,this._targetYaw=this._yaw,this._targetPitch=this._pitch,this.frameOnStart)this.focus(this.focusEntity||this.app.root);else{var e=new pc.Vec3;e.sub2(this.entity.getPosition(),this._pivotPoint),this._distance=this._clampDistance(e.length())}this._targetDistance=this._distance,this.on("attr:distanceMin",function(t,i){this._targetDistance=this._clampDistance(this._distance)}),this.on("attr:distanceMax",function(t,i){this._targetDistance=this._clampDistance(this._distance)}),this.on("attr:pitchAngleMin",function(t,i){this._targetPitch=this._clampPitchAngle(this._pitch)}),this.on("attr:pitchAngleMax",function(t,i){this._targetPitch=this._clampPitchAngle(this._pitch)}),this.on("attr:focusEntity",function(t,i){this.frameOnStart?this.focus(t||this.app.root):this.resetAndLookAtEntity(this.entity.getPosition(),t||this.app.root)}),this.on("attr:frameOnStart",function(t,i){t&&this.focus(this.focusEntity||this.app.root)}),this.on("destroy",function(){window.removeEventListener("resize",i,!1)})},PanoramicCamera.prototype.update=function(t){var i=0===this.inertiaFactor?1:Math.min(t/this.inertiaFactor,1);this._distance=pc.math.lerp(this._distance,this._targetDistance,i),this._yaw=pc.math.lerp(this._yaw,this._targetYaw,i),this._pitch=pc.math.lerp(this._pitch,this._targetPitch,i),this._updatePosition()},PanoramicCamera.prototype._updatePosition=function(){this.entity.setLocalPosition(0,0,0),this.entity.setLocalEulerAngles(this._pitch,this._yaw,0);var t=this.entity.getPosition();t.copy(this.entity.forward),t.scale(-this._distance),t.add(this.pivotPoint),this.entity.setPosition(t)},PanoramicCamera.prototype._removeInertia=function(){this._yaw=this._targetYaw,this._pitch=this._targetPitch,this._distance=this._targetDistance},PanoramicCamera.prototype._checkAspectRatio=function(){var t=this.app.graphicsDevice.height,i=this.app.graphicsDevice.width;this.entity.camera.horizontalFov=t>i},PanoramicCamera.prototype._buildAabb=function(t,i){var a=0;if(t.model){var e=t.model.meshInstances;for(a=0;a<e.length;a++)0===i?this._modelsAabb.copy(e[a].aabb):this._modelsAabb.add(e[a].aabb),i+=1}for(a=0;a<t.children.length;++a)i+=this._buildAabb(t.children[a],i);return i},PanoramicCamera.prototype._calcYaw=function(t){var i=new pc.Vec3;return t.transformVector(pc.Vec3.FORWARD,i),Math.atan2(-i.x,-i.z)*pc.math.RAD_TO_DEG},PanoramicCamera.prototype._clampDistance=function(t){return this.distanceMax>0?pc.math.clamp(t,this.distanceMin,this.distanceMax):Math.max(t,this.distanceMin)},PanoramicCamera.prototype._clampPitchAngle=function(t){return pc.math.clamp(t,-this.pitchAngleMax,-this.pitchAngleMin)},PanoramicCamera.quatWithoutYaw=new pc.Quat,PanoramicCamera.yawOffset=new pc.Quat,PanoramicCamera.prototype._calcPitch=function(t,i){var a=PanoramicCamera.quatWithoutYaw,e=PanoramicCamera.yawOffset;e.setFromEulerAngles(0,-i,0),a.mul2(e,t);var n=new pc.Vec3;return a.transformVector(pc.Vec3.FORWARD,n),Math.atan2(n.y,-n.z)*pc.math.RAD_TO_DEG};var MousePanoramicInput=pc.createScript("mousePanoramicInput");MousePanoramicInput.attributes.add("orbitSensitivity",{type:"number",default:.3,title:"Orbit Sensitivity",description:"How fast the camera moves around the orbit. Higher is faster"}),MousePanoramicInput.attributes.add("distanceSensitivity",{type:"number",default:.15,title:"Distance Sensitivity",description:"How fast the camera moves in and out. Higher is faster"}),MousePanoramicInput.prototype.initialize=function(){if(this.panoramicCamera=this.entity.script.panoramicCamera,this.panoramicCamera){var t=this,o=function(o){t.onMouseOut(o)};this.app.mouse.on(pc.EVENT_MOUSEDOWN,this.onMouseDown,this),this.app.mouse.on(pc.EVENT_MOUSEUP,this.onMouseUp,this),this.app.mouse.on(pc.EVENT_MOUSEMOVE,this.onMouseMove,this),this.app.mouse.on(pc.EVENT_MOUSEWHEEL,this.onMouseWheel,this),window.addEventListener("mouseout",o,!1),this.on("destroy",function(){this.app.mouse.off(pc.EVENT_MOUSEDOWN,this.onMouseDown,this),this.app.mouse.off(pc.EVENT_MOUSEUP,this.onMouseUp,this),this.app.mouse.off(pc.EVENT_MOUSEMOVE,this.onMouseMove,this),this.app.mouse.off(pc.EVENT_MOUSEWHEEL,this.onMouseWheel,this),window.removeEventListener("mouseout",o,!1)})}this.app.mouse.disableContextMenu(),this.lookButtonDown=!1,this.panButtonDown=!1,this.lastPoint=new pc.Vec2},MousePanoramicInput.fromWorldPoint=new pc.Vec3,MousePanoramicInput.toWorldPoint=new pc.Vec3,MousePanoramicInput.worldDiff=new pc.Vec3,MousePanoramicInput.prototype.pan=function(t){var o=MousePanoramicInput.fromWorldPoint,i=MousePanoramicInput.toWorldPoint,n=MousePanoramicInput.worldDiff,e=this.entity.camera,s=this.panoramicCamera.distance;e.screenToWorld(t.x,t.y,s,o),e.screenToWorld(this.lastPoint.x,this.lastPoint.y,s,i),n.sub2(i,o),this.panoramicCamera.pivotPoint.add(n)},MousePanoramicInput.prototype.onMouseDown=function(t){switch(t.button){case pc.MOUSEBUTTON_LEFT:this.lookButtonDown=!0;break;case pc.MOUSEBUTTON_MIDDLE:case pc.MOUSEBUTTON_RIGHT:this.panButtonDown=!0}},MousePanoramicInput.prototype.onMouseUp=function(t){switch(t.button){case pc.MOUSEBUTTON_LEFT:this.lookButtonDown=!1;break;case pc.MOUSEBUTTON_MIDDLE:case pc.MOUSEBUTTON_RIGHT:this.panButtonDown=!1}},MousePanoramicInput.prototype.onMouseMove=function(t){pc.app.mouse;this.lookButtonDown?(this.panoramicCamera.pitch-=t.dy*this.orbitSensitivity,this.panoramicCamera.yaw-=t.dx*this.orbitSensitivity):this.panButtonDown&&this.pan(t),this.lastPoint.set(t.x,t.y)},MousePanoramicInput.prototype.onMouseWheel=function(t){this.panoramicCamera.distance-=t.wheel*this.distanceSensitivity*(.1*this.panoramicCamera.distance),t.event.preventDefault()},MousePanoramicInput.prototype.onMouseOut=function(t){this.lookButtonDown=!1,this.panButtonDown=!1};// ball.js
/* jshint esversion: 6 */
var Ball = pc.createScript('ball');

Ball.attributes.add('isCannonBall', {
    type: 'boolean',
    default: false,
});

Ball.attributes.add('isColorBall', {
    type: 'boolean',
    default: false,
});


Ball.prototype.initialize = function() {

    this.entity.lifeTimer = GameplayController.ballLifeTime;
    this.entity.ready = true;
    this.entity.started = false;
    this.entity.enabled = true;

    this.entity.setColor = function(color) {
        this.materialIndex = color;
        this.model.meshInstances[0].material = MaterialsStorage.levelMaterials[this.materialIndex].resource;
    }.bind(this.entity);
    
    this.entity.setPosition(0, -3, 0);
    this.entity.setLocalEulerAngles(0, 0, 0);
    this.entity.rigidbody.type = pc.BODYTYPE_STATIC; 
    if(!this.isCannonBall && !this.isColorBall && !this.launched) {
        this.entity.setColor(Utils.getRandomItem(this.app.root.findByName("Tower").script.towerController.getAvailableColors()));
    } 
    this.entity.collision.on('collisionstart', this.onCollisionStart, this);
    this.entity.rigidbody.group = BallController.BODYGROUP_BALL;
    this.entity.rigidbody.mask = pc.BODYMASK_ALL ^ BallController.BODYGROUP_BALL;       
    
    this.entity.on("destroy", this.destroy, this);    
        
    if(this.entity.launched && this.entity.launchPosition) {

        this.entity.setPosition(this.entity.launchPosition);
        this.entity.started = true;
        
        this.entity.materialIndex = -1;
        this.entity.model.meshInstances[0].material = this.app.assets.find("Color Ball Material").resource;
        
        this.entity.setLocalScale(0.8, 0.8, 0.8);
        this.entity.collision.radius = 0.8 / 2;
        
        this.shoot(this.entity.launchTarget, this.entity.launchTarget.getPosition(), false);
        
        const currentVelocity = this.entity.rigidbody.linearVelocity;
        this.entity.rigidbody.linearVelocity = new pc.Vec3(currentVelocity.x, this.entity.launchVelocity.y + pc.math.random(-7, 7), currentVelocity.z);

    } else {
        const targetScale = (this.isCannonBall || this.isColorBall) ? this.entity.getLocalScale().clone() : new pc.Vec3(1.3, 1.3, 1.3);
        const startScale = (this.isCannonBall || this.isColorBall) ? new pc.Vec3(targetScale.x / 4, targetScale.y / 4, targetScale.z / 4) : new pc.Vec3(0.25, 0.25, 0.25);
        this.entity.setLocalScale(startScale);
        this.entity.tween(this.entity.getLocalScale())
           .to(targetScale, 0.35, pc.BackOut)
           .on('complete', () => {

            })
           .start();
    }  
};

Ball.prototype.update = function(dt) {
    if(!this.entity.started) {
        const cameraToTowerCenterDistance = this.app.root.findByName("Camera").script.orbitCamera.distance;
        const ballPosition = this.entity.getLocalPosition();
        if(GameplayController.mobileLandscapeMode) {
            
            if(this.isCannonBall) {
                ballPosition.z = -0.4 * cameraToTowerCenterDistance;
                ballPosition.y = -4.9 - Math.sin(5 * pc.math.DEG_TO_RAD) * ballPosition.z;
            } else if(this.isColorBall) {
                ballPosition.z = -0.19 * cameraToTowerCenterDistance;
                ballPosition.y = -2.475 - Math.sin(7 * pc.math.DEG_TO_RAD) * ballPosition.z;
            } else {
                ballPosition.z = -0.28 * cameraToTowerCenterDistance;
                ballPosition.y = -3.55 - Math.sin(6 * pc.math.DEG_TO_RAD) * ballPosition.z;
            }    
            
        } else {
            
             if(this.isCannonBall) {
                ballPosition.z = -0.385 * cameraToTowerCenterDistance;
                ballPosition.y = -6.0 - Math.sin(5 * pc.math.DEG_TO_RAD) * ballPosition.z;
            } else if(this.isColorBall) {
                ballPosition.z = -0.18 * cameraToTowerCenterDistance;
                ballPosition.y = -3.1 - Math.sin(7 * pc.math.DEG_TO_RAD) * ballPosition.z;
            } else {
                ballPosition.z = -0.28 * cameraToTowerCenterDistance;
                ballPosition.y = -4.5 - Math.sin(6 * pc.math.DEG_TO_RAD) * ballPosition.z;
            }    
        }
       
                
        this.entity.setLocalPosition(ballPosition);
    } else {
        if(this.entity.autoDestroy) {
            this.entity.autoDestroyTimer -= dt;
            this.entity.flightTimer += dt;
            if(this.entity.targetObject) {
                const ballToTargetDistance = Utils.distanceBetweenEntities(this.entity.targetObject.getPosition(), this.entity.getPosition());
                if(ballToTargetDistance <= this.entity.autoDestroyMinDistanceToTarget) {
                    this.entity.autoDestroyMinDistanceToTarget = ballToTargetDistance;
                    this.entity.autoDestroyMinDistanceTimestamp = this.entity.flightTimer;
                }
            }
            if(this.entity.autoDestroyTimer <= 0) {  
                if(this.isCannonBall) {
                    this.entity.destroy();
                    return;
                } else if(this.isColorBall) {
                    this.app.fire("colorball:break", this.entity.getPosition().clone(), this.entity.targetObject, this.entity.rigidbody.linearVelocity.clone());
                    this.entity.destroy();
                    return;
                } else if(this.entity.targetObject && Math.abs(this.entity.flightTimer - this.entity.calculatedFlightTime) < (this.entity.autoDestroyMinDistanceToTarget / this.entity.initialSpeed) * 3) {
                    console.log("Auto destroy ");
                    this.app.fire("tower:hit", this.entity.targetObject);
                    this.entity.destroy();
                    return;
                }
            }
        }
        
        this.entity.lifeTimer -= dt;
        if(this.entity.lifeTimer <= 0) {
            this.entity.destroy();
        }
    }
};

Ball.prototype.shoot = function(targetEntity, targetPosition, autoDestroyTarget) {
    if(this.entity.ready) {
        
        Apicontroller.trackStatsChange('total_balls_shot', 1);        

        this.entity.autoDestroy = autoDestroyTarget;
        this.entity.targetObject = (this.entity.autoDestroy || this.isColorBall) ? targetEntity : null;
         
        const ballPosition = this.entity.getPosition();
        this.entity.rigidbody.type = pc.BODYTYPE_DYNAMIC;
        this.entity.rigidbody.mass = this.isCannonBall ? (targetEntity.rigidbody.mass * 100) : TowerBuilder.calculateItemMass(TowerBuilder.towerMaxHeight + 20);//0.0000001;
        this.entity.rigidbody.group = BallController.BODYGROUP_BALL;
        this.entity.rigidbody.mask = pc.BODYMASK_ALL ^ BallController.BODYGROUP_BALL;     
        this.entity.rigidbody.applyImpulse(this.getRequiredImpulse(ballPosition, targetPosition, autoDestroyTarget), new pc.Vec3(0, 0, 0));   
        this.entity.rigidbody.body.setCcdMotionThreshold(GameplayController.CCDMotionThreshold);
        this.entity.rigidbody.body.setCcdSweptSphereRadius(GameplayController.CCDSweptSphereRadius);
        
        if(this.entity.parent) {
            this.entity.parent.removeChild(this.entity);
        }        
        
        if(this.isCannonBall) {
            this.app.fire("cannon:launch");
            this.app.fire("audio:play", "cannonBall");
            Utils.vibrate(100);
            Apicontroller.trackStatsChange(`cannonballs_shot`, 1);
        } else if(this.isColorBall) {
            this.app.fire("audio:play", Math.random() < 0.5 ? "throw01" : "throw02");
            this.app.fire("colorball:launch");
            Apicontroller.trackStatsChange(`powerup_colorball_used`, 1);
        } else if(this.entity.launched) {
            //do nothing
        } else {
            this.app.fire("ball:launch");
            this.app.fire("audio:play", Math.random() < 0.5 ? "throw01" : "throw02");
            if(this.entity.model && this.entity.model.meshInstances && this.entity.model.meshInstances[0] && this.entity.model.meshInstances[0].material && this.entity.model.meshInstances[0].material.name) {
                Apicontroller.trackStatsChange(`${this.entity.model.meshInstances[0].material.name.toLowerCase()}_balls_shot`, 1);
            }
        }
        
        if(!this.isCannonBall && !this.isColorBall && !this.entity.launched) {
            GameplayController.currentSession.lastBallColor = this.entity.materialIndex;
        }
       
        this.app.root.findByName("TrashContainer").addChild(this.entity);
        this.entity.started = true;
        return true;
    } else {
        console.log("Ball is not ready yet!");
        return false;
    }
};

Ball.prototype.onCollisionStart = function(result) {
    /* hit the ground */
    if(result.other.name.indexOf("Ground") != -1) {
        this.entity.destroy();
    }
    
    /* hit the tower */
    if (result.other.parent && result.other.parent.name === "Tower" && result.other.active && result.other.rigidbody) {
        if(result.other.materialIndex === this.entity.materialIndex || this.entity.launched) {
            this.app.fire("tower:hit", result.other);
            this.entity.destroy();
        } else {
            // console.log('Miss');
            this.app.fire("audio:play", Math.random() < 0.5 ? "bounce01" : "bounce02");
        }
    }
};


Ball.prototype.getRequiredImpulse = function(ballPosition, targetPosition) {

        const gravity = -this.app.systems.rigidbody.gravity.y;
    
        const direction = new pc.Vec3(targetPosition.x - ballPosition.x, targetPosition.y - ballPosition.y, targetPosition.z - ballPosition.z);
        const angleXZ = Math.atan2(direction.x, direction.z);
        const displacementY = targetPosition.y - ballPosition.y;
        const displacementXZ = Math.sqrt((targetPosition.x - ballPosition.x) * (targetPosition.x - ballPosition.x) + (targetPosition.z - ballPosition.z) * (targetPosition.z - ballPosition.z));
        const cameraToTowerCenterDistance = this.app.root.findByName("Camera").script.orbitCamera.distance;
    
        const x = Math.sqrt(direction.x * direction.x + direction.z * direction.z);
        const y = direction.y;
    
        var speed = Math.min(70, 1.85 * cameraToTowerCenterDistance); 
    
        if(this.isCannonBall) {
           speed *=  1.5 * (1 + 0.25 * (cameraToTowerCenterDistance - GameplayController.cameraToTowerMinDistance) / (GameplayController.cameraToTowerMaxDistance - GameplayController.cameraToTowerMinDistance));
        } else if(this.isColorBall) {
            speed *= 1.0;
        } else if(this.entity.launched) {
            speed *= pc.math.random(1.2, 1.7);
            this.entity.rigidbody.angularVelocity = new pc.Vec3(pc.math.random(-20, 20), 0, 0);
        }
    
        var deltaAngleY = this.entity.launched ? pc.math.random(-Math.PI / 90, Math.PI / 40) : 0;
        var deltaAngleXZ = this.entity.launched ? pc.math.random(-Math.PI / 50, Math.PI / 50) : 0;
    
        const angle1 = Math.atan((speed * speed  + Math.sqrt( Math.pow(speed, 4) - gravity * (gravity * x * x + 2 * speed * speed * y) )) / (gravity * x)) + deltaAngleY;
        const angle2 = Math.atan((speed * speed  - Math.sqrt( Math.pow(speed, 4) - gravity * (gravity * x * x + 2 * speed * speed * y) )) / (gravity * x)) + deltaAngleY;
    
        const vy = speed * Math.sin(angle2);
        const vx = (this.entity.launched ? Math.min(speed, 75) : speed) * Math.cos(angle2) * Math.sin(angleXZ + deltaAngleXZ); 
        const vz =  (this.entity.launched ? Math.min(speed, 75) : speed) * Math.cos(angle2) * Math.cos(angleXZ + deltaAngleXZ); 
    
        const time = displacementXZ / Math.sqrt(vx * vx + vz * vz);

        if(this.entity.autoDestroy) {
            this.entity.calculatedFlightTime = displacementXZ / Math.sqrt(vx * vx + vz * vz);
            this.entity.targetReachingTimestamp = new Date().getTime() + this.entity.calculatedFlightTime * 1000;
            this.entity.autoDestroyTimer = this.entity.calculatedFlightTime + GameplayController.ballAutoDestroyDelay;
            this.entity.flightTimer = 0;
            this.entity.autoDestroyMinDistanceToTarget = Number.MAX_VALUE;
            this.entity.autoDestroyMinDistanceTimestamp = 0;
        } else if(this.isCannonBall) {
            this.entity.autoDestroy = true;
            this.entity.autoDestroyTimer = GameplayController.cannonBallAutoDestroyTime;
        } else if(this.isColorBall) {
              this.entity.autoDestroy = true;
              this.entity.autoDestroyTimer = time * GameplayController.colorBallBreakingDistance;
        }
        
        this.entity.initialSpeed = Math.sqrt(vx*vx, vy*vy, vz*vz);

        // console.log("Angles are ", ~~(angle1 * 180 / Math.PI), ~~(angle2  * 180 / Math.PI), "speed ",  this.entity.initialSpeed);
    
        return new pc.Vec3(vx, vy, vz).scale(this.entity.rigidbody.mass);  
};

Ball.prototype.destroy = function() {
    if(this.entity) {
        this.entity.targetObject = null;
    }
};

// item.js
/* jshint esversion: 6 */
var Item = pc.createScript('item');

Item.attributes.add('collisionDiameter', {
    type: 'number',
    default: 1.6,
    min: 0.1,
    max: 10,
});

Item.attributes.add('collisionHeight', {
    type: 'number',
    default: 1.8,
    min: 0.1,
    max: 10,
});


Item.prototype.initialize = function() {
    this.entity.isTowerChild = true;
    this.app.on("tower:victory", this.explodeRandomly, this);
    this.entity.on('destroy', this.handleDestroy, this);
};

Item.prototype.handleDestroy = function() {
    this.app.off("tower:victory", this.explodeRandomly, this);
};

Item.prototype.chainedExplode = function(delay) {
    if(!this.entity.waitingTriggeredDestroy) {
        this.entity.waitingTriggeredDestroy = true;
        const possibleNeightbors = this.app.root.findByName("Tower").children.filter(child => child.active && child.materialIndex === this.entity.materialIndex && child != this.entity && Utils.checkContactRough(this.entity, child));
        const triggerController = this.app.root.findByName("Triggers").script.triggersController;
        if(delay > 0) {
            this.entity.delayedCall(delay, () => triggerController.createTriggerInsteadOfBody(this.entity, possibleNeightbors));
        } else {
            triggerController.createTriggerInsteadOfBody(this.entity, possibleNeightbors);
        }
    }
};

Item.prototype.explode = function(delay, levelCompleted) {
    this.killItem(delay, levelCompleted);
};

Item.prototype.killItem = function(delay, levelCompleted) {
   Apicontroller.trackStatsChange('total_objects_destroyed', 1);    
   if(this.entity.model && this.entity.model.meshInstances && this.entity.model.meshInstances[0] && this.entity.model.meshInstances[0].material && this.entity.model.meshInstances[0].material.name) {
        Apicontroller.trackStatsChange(`${this.entity.model.meshInstances[0].material.name.toLowerCase()}_objects_destroyed`, 1);
   }
  
     
   return this.entity.delayedCall(delay, () => {
       if(!this.entity.killed) {
            this.entity.killed = true;
                       
            var position = this.entity.getPosition();
            this.app.fire("explosion", position.x, position.y, position.z, this.entity.materialIndex, (levelCompleted ? 5 : Math.ceil((ScaleManager.qualityIndex + 1) / 3 * GameplayController.particlesPerObject)));
            if(this.entity.rigidbody) {
                // this.entity.rigidbody.teleport(position.x + pc.math.random(-100, 100), position.y - 1000, position.z + pc.math.random(-100, 100));
                // this.entity.killTime = new Date().getTime() + 100;
                this.removeFromTower();
                this.entity.destroy();
            } else {
                 this.removeFromTower();
                 this.entity.destroy();
            }
       }  
   });
};


Item.prototype.update = function(dt) {
    var pos; 
    if(this.entity.drowning) {
        
        var vel =  this.entity.rigidbody.linearVelocity;
        vel.y += this.app.systems.rigidbody.gravity.y * 0.02 * dt;
        this.entity.rigidbody.linearVelocity.set(vel.x * 0.99, vel.y, vel.z * 0.99);
      
        this.entity.drownTimer -= dt;
        if(this.entity.drownTimer <= 0) {
            this.entity.destroy();            
        }
        
    } else if(this.entity.floating) {
        
        this.entity.rigidbody.linearVelocity.set(this.entity.floatingVelocity.x * dt, Math.sin(this.entity.phasis) * this.entity.yMultiplier, this.entity.floatingVelocity.z * dt);
        this.entity.phasis += dt * this.entity.phasisSpeed;
        
        this.entity.floatTimer -= dt;
        if(this.entity.floatTimer <= 0) {
            this.entity.drowning = true;           
        }
    } else if(this.entity.falling) {
        
        pos = this.entity.getPosition();
        this.entity.rigidbody.applyForce(new pc.Vec3(0, (-pos.y * 5) * this.entity.rigidbody.mass - this.app.systems.rigidbody.gravity.y * this.entity.rigidbody.mass , 0));
        
        this.entity.fallTimer -= dt;
        if(this.entity.fallTimer <= 0) {            
            this.entity.floating = true;
            this.entity.rigidbody.type = pc.BODYTYPE_KINEMATIC; 
            this.entity.phasis = 0;
            this.entity.rigidbody.linearVelocity.set(0, 0, 0);
        }
    } else {
        if(this.entity.removedFromTower && !this.entity.killed) {
            pos = this.entity.getPosition();
            if(pos.y < 0 && !this.entity.isWaterHit) {
                this.hitWater();
            }
        }      
    }
};

Item.prototype.removeFromTower = function() {
    this.entity.removedFromTower = true;
    if(this.entity.rigidbody) {
        this.entity.rigidbody.linearDamping = 0.15;
        this.entity.rigidbody.angularDamping = 0.1;
    }
    if(this.entity) {
        if(this.entity.parent) {
            this.entity.parent.removeChild(this.entity);
        }
        this.app.root.findByName("TrashContainer").addChild(this.entity);  
    }
    this.app.fire("item:destroy");
};

Item.prototype.hitWater = function() {
    this.entity.isWaterHit = true;

    var tower = this.app.root.findByName("Tower");
    var towerHeight = tower.currentHeight || 1;
    if(Math.random() < Math.min(0.3 + towerHeight * 0.014, 0.9)) {
        var velocity =  this.entity.rigidbody.linearVelocity;
        velocity.y *= pc.math.random(0.1, 0.25);
        this.entity.rigidbody.linearVelocity = new pc.Vec3(velocity.x, velocity.y, velocity.z);
        this.entity.collision.on('collisionstart', this.onCollisionStart, this);
        return;
    }
    
    this.entity.rigidbody.mass = 1;
    this.entity.rigidbody.linearVelocity = new pc.Vec3(0, this.entity.rigidbody.linearVelocity.y * 0.2, 0);
    this.entity.falling = true;
    this.entity.floating = false;
    this.entity.drowning = false;
    this.entity.floatingVelocity = new pc.Vec3(pc.math.random(20, 50) * Math.cos(Math.atan2(this.entity.getPosition().z, this.entity.getPosition().x)), 0, pc.math.random(20, 50) * Math.sin(Math.atan2(this.entity.getPosition().z, this.entity.getPosition().x)));
    this.entity.fallTimer = GameplayController.itemFallingTime * pc.math.random(0.8, 1.6);
    this.entity.floatTimer = GameplayController.itemLifeTime * pc.math.random(0.75, 1.25);
    this.entity.drownTimer = GameplayController.itemDrownTime * pc.math.random(0.75, 1.25);
    this.entity.rigidbody.linearDamping = 0.7;
    this.entity.rigidbody.angularDamping = 0.65;
    
    this.entity.phasis = 0;
    this.entity.phasisSpeed = pc.math.random(Math.PI * 0.4, Math.PI * 0.8);
    this.entity.yMultiplier = pc.math.random(0.3, 0.6);
    
    Apicontroller.trackStatsChange('total_objects_drowned_out', 1);
    if(this.entity.model && this.entity.model.meshInstances && this.entity.model.meshInstances[0] && this.entity.model.meshInstances[0].material && this.entity.model.meshInstances[0].material.name) {
        Apicontroller.trackStatsChange(`${this.entity.model.meshInstances[0].material.name.toLowerCase()}_objects_destroyed`, 1);
    }
};

Item.prototype.onCollisionStart = function(result) {
    /* hit the ground */
    if(result.other.name.indexOf("Ground") != -1) {
        this.entity.collision.off('collisionstart', this.onCollisionStart, this);
        this.entity.destroy();
    }
};




var ProgressBar=pc.createScript("progressBar");ProgressBar.attributes.add("progressImage",{type:"entity"}),ProgressBar.attributes.add("progressImageMaxWidth",{type:"number"}),ProgressBar.attributes.add("cannonProgressImage",{type:"entity"}),ProgressBar.attributes.add("cannonProgressImageMaxWidth",{type:"number"}),ProgressBar.attributes.add("progressImageVertical",{type:"entity"}),ProgressBar.attributes.add("progressImageVerticalMaxHeight",{type:"number"}),ProgressBar.attributes.add("cannonProgressImageVertical",{type:"entity"}),ProgressBar.attributes.add("cannonProgressImageVerticalMaxHeight",{type:"number"}),ProgressBar.prototype.initialize=function(){this.entity.currentScoresText=this.entity.findByName("CurrentScoresText"),this.entity.currentScoresTextLandscape=this.entity.findByName("CurrentScoresTextLandscape"),this.entity.horizontalBar=this.entity.findByName("LevelProgressBar"),this.entity.verticalBar=this.entity.findByName("LevelProgressBarVertical"),this.entity.progressLineContainer=this.entity.verticalBar.findByName("ProgressLineContainer"),this.entity.powerupIconActiveHorizontal=this.entity.horizontalBar.findByName("PowerUpBar_IconActive"),this.entity.powerupIconActiveVertical=this.entity.verticalBar.findByName("PowerUpBar_IconActive"),this.reset(),this.app.on("level:progress",this.setProgress,this),this.app.on("cannon:progress",this.setCannonProgress,this),this.app.on("level:clear",this.reset,this)},ProgressBar.prototype.reset=function(){this.entity.currentValue=0,this.entity.cannonValue=this.entity.cannonValue||0,this.setProgress(0),this.setCannonProgress(0)},ProgressBar.prototype.setProgress=function(e){this.entity.tween(this.entity).to({currentValue:pc.math.clamp(e,0,1)},.25,pc.SineOut).start()},ProgressBar.prototype.setCannonProgress=function(e){this.entity.tween(this.entity).to({cannonValue:pc.math.clamp(e,0,1)},.25,pc.SineOut).start()},ProgressBar.prototype.update=function(e){this.entity.verticalBar.findByName("CurrentLevelText").element.text=""+GameplayController.currentLevel,this.entity.verticalBar.findByName("NextLevelText").element.text=""+(GameplayController.currentLevel+1),this.entity.verticalBar.findByName("ProgressText").element.text=Math.floor(100*this.entity.currentValue)+"%";var t=pc.math.lerp(0,this.progressImageVerticalMaxHeight,this.entity.currentValue);this.progressImageVertical.element.height=t,this.progressImageVertical.element.rect.w=this.entity.currentValue;var r=pc.math.lerp(0,this.cannonProgressImageVerticalMaxHeight,this.entity.cannonValue);this.cannonProgressImageVertical.element.height=r,this.cannonProgressImageVertical.element.rect.w=this.entity.cannonValue,this.entity.powerupIconActiveVertical.enabled=this.entity.cannonValue>=1;var n=this.entity.progressLineContainer.getLocalPosition();n.y=pc.math.clamp(-this.progressImageVerticalMaxHeight/2+t,-this.progressImageVerticalMaxHeight/2,this.progressImageVerticalMaxHeight/2-6),this.entity.progressLineContainer.setLocalPosition(n),this.entity.horizontalBar.findByName("CurrentLevelText").element.text=""+GameplayController.currentLevel,this.entity.horizontalBar.findByName("NextLevelText").element.text=""+(GameplayController.currentLevel+1),this.entity.horizontalBar.findByName("ProgressText").element.text=Math.floor(100*this.entity.currentValue)+"%";var a=pc.math.lerp(0,this.progressImageMaxWidth,this.entity.currentValue);this.progressImage.element.width=a,this.progressImage.element.rect.z=this.entity.currentValue;var i=pc.math.lerp(0,this.cannonProgressImageMaxWidth,this.entity.cannonValue);this.cannonProgressImage.element.width=i,this.cannonProgressImage.element.rect.z=this.entity.cannonValue,this.entity.powerupIconActiveHorizontal.enabled=this.entity.cannonValue>=1,GameplayController.mobileLandscapeMode?(this.entity.horizontalBar.enabled=!1,this.entity.verticalBar.enabled=!0,this.entity.currentScoresText.enabled=!1,this.entity.currentScoresTextLandscape.enabled=!0):(this.entity.horizontalBar.enabled=!0,this.entity.verticalBar.enabled=!1,this.entity.currentScoresText.enabled=!0,this.entity.currentScoresTextLandscape.enabled=!1)};var TowerConfig=pc.createScript("towerConfig");TowerConfig.attributes.add("towerHeight",{title:"Tower height",type:"number",default:8,min:1,max:300,step:1}),TowerConfig.attributes.add("itemHeight",{title:"Single item height",type:"number",default:1.8,min:.1,max:5}),TowerConfig.attributes.add("numBalls",{title:"Num balls",type:"number",default:25,min:10,max:150}),TowerConfig.attributes.add("numColors",{title:"Colors",type:"number",default:5,min:2,max:15}),TowerConfig.attributes.add("difficulty",{title:"Difficulty",type:"number",default:1,enum:[{easy:1},{medium:2},{hard:3}]}),TowerConfig.attributes.add("victoryLayersLimit",{title:"Max layers limit to win",type:"number",default:2,min:1,max:5,step:1}),TowerConfig.attributes.add("physicalScale",{type:"number",default:.965,min:.01,max:2}),TowerConfig.attributes.add("friction",{type:"number",default:.98,min:0,max:1}),TowerConfig.attributes.add("restitution",{type:"number",default:.005,min:0,max:1}),TowerConfig.attributes.add("linearDamping",{type:"number",default:.45,min:0,max:1}),TowerConfig.attributes.add("angularDamping",{type:"number",default:.35,min:0,max:1}),TowerConfig.attributes.add("collisionScale",{type:"number",default:1.05,min:1,max:2}),TowerConfig.attributes.add("readyToUse",{type:"boolean",default:!1}),TowerConfig.attributes.add("debugLock",{title:"Debug lock",type:"boolean",default:!1}),TowerConfig.prototype.initialize=function(){},TowerConfig.prototype.update=function(t){};// resultsWindow.js
/* jshint esversion: 6 */
var ResultsWindow = pc.createScript('resultsWindow');

ResultsWindow.prototype.initialize = function() {
    
    this.entity.headingIcon = this.entity.findByName("HeadingIcon");
    this.entity.buttonRestart = this.entity.findByName("ButtonRestart");
    this.entity.background = this.entity.findByName("Background");
    this.entity.scoreGroup = this.entity.findByName("ScoreGroup");
    this.entity.maxScoreGroup = this.entity.findByName("MaxScoreGroup");
    this.entity.coinsGroup = this.entity.findByName("CoinsGroup");
    this.entity.scoreText = this.entity.scoreGroup.findByName("Text");
    this.entity.maxScoreText = this.entity.maxScoreGroup.findByName("Text");
    this.entity.coinsText = this.entity.coinsGroup.findByName("Text");
    this.entity.newBestScoreIcon = this.entity.maxScoreGroup.findByName("NewBestScoreIcon");
    this.entity.buttonMoreCoins = this.entity.coinsGroup.findByName("GetCoinsButton");
    this.entity.buttonMoreCoinsText = this.entity.buttonMoreCoins.findByName("Text");
    
    this.assignAction(this.entity.buttonRestart, this.restartPressed, this);
    this.assignAction(this.entity.buttonMoreCoins, this.acquireMoreCoinsPressed, this);
    
    const scriptContext = this;
    
    /* show method */
    this.entity.show = function() {
        this.enabled = true;
        
        scriptContext.app.fire("app:save");
        scriptContext.app.fire("audio:play", "victory");
        
        if(scriptContext.buttonRestartTween && scriptContext.buttonRestartTween.playing) {
            scriptContext.buttonRestartTween.stop();
        }
        
        this.buttonRestart.setLocalScale(0, 0, 0);

        
        var showButtons = (delay) => {
            /* tween buttons */        
            scriptContext.buttonRestartTween = this.buttonRestart
                .tween(this.buttonRestart.getLocalScale())
                .to(new pc.Vec3(1, 1, 1), 0.5, pc.BackOut)
                .delay(delay)
                .start();
        };
        
        if(window.famobi_analytics) {        
            window.famobi_analytics.trackScreen(window.famobi_analytics.SCREEN_LEVELRESULT);
            
            setTimeout(() => {
                    Promise.all([
                        window.famobi_analytics.trackEvent(
                            "EVENT_LEVELSUCCESS",
                            {
                                levelName: '' + GameplayController.currentLevel
                            }
                        ),
                        window.famobi_analytics.trackEvent(
                            "EVENT_TOTALSCORE",
                            {
                                totalScore: GameplayController.sessionScores
                            }
                        )
                    ]).then(() => showButtons(1.4), () => showButtons(1.4));
                }, 500);
        } else {
            showButtons(1.85);
        }
        
        /* tween background */
        this.background.element.opacity = 0.0;
        this.background.tween(this.background.element)
            .to({opacity: 0.94}, 0.25, pc.Linear)
            .start();
         
        /* tween heading icon */
        this.headingIcon.element.opacity = 0.0;
        var headingAppearingTween = 
        this.headingIcon.tween(this.headingIcon.element)
            .to({opacity: 0.9}, 0.5, pc.Linear)
            .delay(0.25);

        this.headingIcon.setLocalPosition(0, -360, 0);
        var headingMovingTween = 
        this.headingIcon.tween(this.headingIcon.getLocalPosition())
            .to(new pc.Vec3(0, 0, 0), 0.9, pc.SineOut)
            .delay(0.2);
        
        headingAppearingTween.chain(headingMovingTween).start();
        
        this.headingIcon.setLocalScale(0.5, 0.5, 0.5);
        var headingAppearingScaleTween = 
        this.headingIcon.tween(this.headingIcon.getLocalScale())
            .to(new pc.Vec3(1.5, 1.5, 1.5), 0.55, pc.BackOut)
            .delay(0.25);
        
        var headingMovingScaleTween = 
        this.headingIcon.tween(this.headingIcon.getLocalScale())
            .to(new pc.Vec3(1.0, 1.0, 1.0), 0.9, pc.SineOut)
            .delay(0.1);
        
         headingAppearingScaleTween.chain(headingMovingScaleTween).start();

        /* tween text groups */
        this.scoreGroup.setLocalScale(0, 0, 0);
        this.scoreGroup.tween(this.scoreGroup.getLocalScale())
            .to(new pc.Vec3(1, 1, 1), 0.45, pc.BackOut)
            .delay(1.35)
            .start();
                
        this.maxScoreGroup.setLocalScale(0, 0, 0);
        this.maxScoreGroup.tween(this.maxScoreGroup.getLocalScale())
            .to(new pc.Vec3(1, 1, 1), 0.45, pc.BackOut)
            .delay(1.5)
            .start();
        
        this.coinsGroup.setLocalScale(0, 0, 0);
        this.coinsGroup.tween(this.coinsGroup.getLocalScale())
            .to(new pc.Vec3(1, 1, 1), 0.45, pc.BackOut)
            .delay(1.65)
            .start();
        
        if(Apicontroller.hasRewardedVideo()) {
            this.buttonMoreCoins.coinsValue = pc.math.clamp(GameplayController.lastLevelCoins || 10, 10, 99);
            this.buttonMoreCoins.enabled = true;
            this.buttonMoreCoinsText.element.text = '+' + this.buttonMoreCoins.coinsValue;
            this.buttonMoreCoins.setLocalScale(0, 0, 0);
            this.buttonMoreCoins.tween(this.buttonMoreCoins.getLocalScale())
                .to(new pc.Vec3(1, 1, 1), 0.4, pc.BackOut)
                .delay(2.5)
                .start();
        } else {
            this.buttonMoreCoins.enabled = false;
        }
        
        /* tween texts */
        const textTweenDelay = 1.75;
        if(GameplayController.sessionScores > 0) {          
             this.delayedCall(textTweenDelay * 1000, () => scriptContext.app.fire("audio:unmute", "counting", 0.9));
             this.delayedCall((textTweenDelay + 1.0) * 1000, () => scriptContext.app.fire("audio:mute", "counting"));           
        }
        
        Utils.tweenText(this.scoreText, 0, GameplayController.sessionScores, 0.75, textTweenDelay, pc.SineOut, true);
        Utils.tweenText(this.maxScoreText, 0, GameplayController.maxScores, 0.75, textTweenDelay + 0.25, pc.SineOut, true);
        Utils.tweenText(this.coinsText, 0, GameplayController.coins, 0.5, textTweenDelay + 0.5, pc.SineOut, true);

        this.newBestScoreIcon.element.opacity = 0;
        this.newBestScoreIcon.setLocalScale(2, 2, 2);
        if(GameplayController.maxScores === GameplayController.sessionScores) {

              this.newBestScoreIcon.tween(this.newBestScoreIcon.element)
                    .to({opacity: 1}, 0.3, pc.Linear)
                    .delay(textTweenDelay + 1)
                    .on('complete', () => {
                        scriptContext.app.fire('audio:play', 'newBest');
                    })
                    .on('update', () => {
                        this.newBestScoreIcon.setLocalPosition(this.maxScoreText.element.width + 60, 0, 0);
                    })
                    .start();

             this.newBestScoreIcon.tween(this.newBestScoreIcon.getLocalScale())
                    .to(new pc.Vec3(1, 1, 1), 0.42, pc.BackOut)
                    .delay(textTweenDelay + 1)
                    .start();
        }        
        
    }.bind(this.entity);
    
    
    /* hide method */
    this.entity.hide = function() {
        this.enabled = false;
    }.bind(this.entity);
    
    this.entity.hide();
};

ResultsWindow.prototype.assignAction = function(button, handler, handlerContext) {
     if(this.app.touch) {
         button.element.on('touchstart', handler, handlerContext);
     } else if(this.app.mouse) {
          button.element.on('mousedown', handler, handlerContext);
     } else {
         console.warn("ResultsWindow.assignAction - either touch or mouse are not detected");
     }
};

ResultsWindow.prototype.update = function(dt) {
    
};

ResultsWindow.prototype.restartPressed = function() {    
    TransitionScreen.instance.transitionTo(() => {
        this.app.fire("tower:next");
        this.app.fire("gameplay:start");
    });
};

ResultsWindow.prototype.homePressed = function() {
    // TransitionScreen.instance.transitionTo(() => {
    //      WindowManager.exitGameplay();
    // });
};

ResultsWindow.prototype.acquireMoreCoinsPressed = function() {
     var previousCoinsValue = GameplayController.coins;
     var rewardAmount = this.entity.buttonMoreCoins.coinsValue || 10;
     Apicontroller.showRewardedVideo((result) => {
         if(result && result.rewardGranted) {
             GameplayController.addCoins(rewardAmount);
             Utils.tweenText(this.entity.coinsText, previousCoinsValue, GameplayController.coins, 0.5, 0.1, pc.SineOut, true);
             this.app.fire("app:save");
             this.app.fire("audio:play", "purchaseDone");
             this.entity.delayedCall(0, () => this.app.fire("audio:unmute", "counting", 0.9));
             this.entity.delayedCall(0.5 * 1000, () => this.app.fire("audio:mute", "counting"));           
             console.log(rewardAmount + ' coins added');
         }
     });
     this.entity.buttonMoreCoins.enabled = false;
};


// transitionScreen.js
/* jshint esversion: 6 */
var TransitionScreen = pc.createScript('transitionScreen');

TransitionScreen.prototype.initialize = function() {
    const scriptingContext = this;

    TransitionScreen.app = this.app;
    TransitionScreen.instance = this.entity;
    
    this.entity.transitionTo = function(callback, callbackContext, completeCallback, completeCallbackContext) {

        this.element.opacity = 0;
        this.tween(this.element)
            .to({opacity: 1.0}, 0.25, pc.SineOut)
             .on('complete', () => {

                    if(callback) {
                        if(callbackContext) {
                            callback.apply(callbackContext);
                        } else {
                            callback();
                        }
                    }

                    scriptingContext.hidePopups();

                    this.tween(this.element)
                    .to({opacity: 0.0}, 0.4, pc.Linear)
                    .on('complete', () => {
                        if(completeCallback) {
                             if(completeCallbackContext) {
                                completeCallback.apply(completeCallbackContext);
                            } else {
                                completeCallback();
                            }
                        }
                    })
                    .start();

            })
            .start();
        
        
    }.bind(this.entity);
    
    
     this.entity.hidePreloader = function(callback, callbackContext) {
        this.element.opacity = 1;
        this.tween(this.element)
            .to({opacity: 0}, 0.25, pc.Linear)
             .on('complete', () => {
                    if(callback) {
                        if(callbackContext) {
                            callback.apply(callbackContext);
                        } else {
                            callback();
                        }
                    }
            })
            .start();
    }.bind(this.entity);
    
    /* Initial opacity, while preloader is visible */
    this.entity.element.opacity = 0;
};

TransitionScreen.prototype.update = function(dt) {
    
};

TransitionScreen.prototype.hidePopups = function() {
    const resultsWindow = this.app.root.findByName("ResultsWindow");
    if(resultsWindow) {
        resultsWindow.hide();
    }
};

// scaleManager.js
/* jshint esversion: 6 */
var ScaleManager = pc.createScript('scaleManager');

ScaleManager.QUALITY_LOW = 0;
ScaleManager.QUALITY_MEDIUM = 1;
ScaleManager.QUALITY_HIGH = 2;

ScaleManager.qualityIndex = ScaleManager.QUALITY_HIGH;
ScaleManager.qualityFactor = 1;

ScaleManager.attributes.add('hiqhQualityFPSThreshold', {
    type: 'number',
    default: 30
});

ScaleManager.attributes.add('mediumQualityFPSThreshold', {
    type: 'number',
    default: 24
});

ScaleManager.attributes.add('numIterations', {
    type: 'number',
    default: 3
});

ScaleManager.attributes.add('framesPerIteration', {
    type: 'number',
    default: 15
});

ScaleManager.attributes.add('desktopQuality', {
    title: "Desktop quality",
    type: 'number',
    array: true,
    default: [0.5, 0.75, 1]
});

ScaleManager.attributes.add('mobileQuality', {
    title: "Mobile quality",
    type: 'number',
    array: true,
    default: [0.75, 1, 2]
});


ScaleManager.attributes.add('forceHightQualityOnDesktop', {
    type: 'boolean',
    default: true
});

ScaleManager.prototype.initialize = function() {
    if(window.forceHightQualityOnDesktop !== undefined) {
        this.forceHightQualityOnDesktop = window.forceHightQualityOnDesktop;
    }
    
    if(pc.platform.mobile) {
        this.mobileQuality[2] = window.devicePixelRatio || 1;
        this.qualityPresets = this.mobileQuality;        
        ScaleManager.qualityIndex = ScaleManager.QUALITY_HIGH;
    } else {
        this.qualityPresets = this.desktopQuality;
        ScaleManager.qualityIndex = ScaleManager.QUALITY_HIGH;
    }
    
    this.app.on("quality:next", this.setNextQuality, this);
    this.app.on("quality:update", this.resetQualitySettings, this);
    
    console.log("Adding resize handler...");
    if(window.visualViewport) {
        this.useVisualViewport = true;
        window.visualViewport.addEventListener('resize', this.resize.bind(this));
    } else {
        this.useVisualViewport = false;
        window.addEventListener('resize', this.resize.bind(this), true);
    }
    
    this.resize();
};

ScaleManager.prototype.measurePerformance = function() {
    if(!pc.platform.mobile && this.forceHightQualityOnDesktop) {
        console.warn('Picture quality is set to "always-high" on desktop');
        return;
    }
    if(ScaleManager.savedQuality === undefined) {
       this.customMeasurementStarted = true;
       this.customMeasurementIteration = 0;
       this.currentMeasurementSession = {frames: 0, time: 0};
       this.customMeasurementResults = [[], [], []];
       this.customMeasurementLastTimestamp = performance.now();
    }
};

ScaleManager.prototype.update = function(dt) {
    if(this.customMeasurementStarted) {
        const now = performance.now();
        const msSinceLastFrame = now - this.customMeasurementLastTimestamp;
        this.customMeasurementLastTimestamp = now;
        
        this.currentMeasurementSession.frames += 1;
        this.currentMeasurementSession.time += msSinceLastFrame;
        
        if(this.currentMeasurementSession.frames >= this.framesPerIteration) {
            this.customMeasurementResults[ScaleManager.qualityIndex].push(this.currentMeasurementSession);
            this.currentMeasurementSession = {frames: 0, time: 0};
            this.customMeasurementIteration += 1;
            ScaleManager.qualityIndex = ScaleManager.qualityIndex > 0 ? (ScaleManager.qualityIndex - 1) : (this.qualityPresets.length - 1);
            this.updateScreenSize();
            
            if(this.customMeasurementIteration >= this.qualityPresets.length * this.numIterations) {
                this.customMeasurementStarted = false;
                console.log(this.customMeasurementResults);
                
                 const averageFPS = [0, 0, 0];
                
                 for(let i = 0; i < 3; i++) {
                     let frames = 0;
                     let times = 0;
                     var rec = this.customMeasurementResults[i];
                     for(let q = 0; q < this.numIterations; q++) {
                         times += rec[q].time;
                         frames += rec[q].frames;
                     }
                     averageFPS[i] = (1000 / times * frames);
                 }
                
                if(averageFPS[ScaleManager.QUALITY_HIGH] >= this.hiqhQualityFPSThreshold) {
                     ScaleManager.qualityIndex = ScaleManager.QUALITY_HIGH;
                     this.resetQualitySettings();
                } else if(averageFPS[ScaleManager.QUALITY_MEDIUM] >= this.mediumQualityFPSThreshold) {
                     ScaleManager.qualityIndex = ScaleManager.QUALITY_MEDIUM;
                     this.resetQualitySettings();
                } else {
                    ScaleManager.qualityIndex = ScaleManager.QUALITY_LOW;
                    this.resetQualitySettings();
                }
                // this.app.root.findByName("DebugText").enabled = true;
                // this.app.root.findByName("DebugText").element.text = ['L', 'M', 'H'][ScaleManager.qualityIndex] +  ':  ' + text;
            }
        }
    }
};

ScaleManager.prototype.setNextQuality = function() {
    ScaleManager.qualityIndex = ((ScaleManager.qualityIndex || 0) + 1) % this.qualityPresets.length;
    ScaleManager.qualityFactor = this.qualityPresets[ScaleManager.qualityIndex];
    this.resize();
    this.app.fire("app:save");
};

ScaleManager.prototype.resetQualitySettings = function() {
    ScaleManager.qualityFactor = this.qualityPresets[ScaleManager.qualityIndex];
    this.resize();
};


ScaleManager.prototype.resize = function() {   
    this.updateScreenSize();
    
    if(pc.platform.ios || pc.platform.mobile) {
        setTimeout(() => this.updateScreenSize(), 500);    
    }
};

ScaleManager.prototype.updateScreenSize = function() {
    const width = this.useVisualViewport ? window.visualViewport.width : window.innerWidth;
    const height = this.useVisualViewport ? window.visualViewport.height : window.innerHeight;
    ScaleManager.qualityFactor = this.qualityPresets[ScaleManager.qualityIndex];
    this.app.graphicsDevice.resizeCanvas(Math.floor(width * ScaleManager.qualityFactor), Math.floor(height * ScaleManager.qualityFactor));
    this.app.fire("quality:changed", ScaleManager.qualityIndex);
    this.app.fire("viewport:resize");
};



var SoundController=pc.createScript("soundController");SoundController.soundStateLoaded=!1,SoundController.audioEnabled=!0,SoundController.prototype.initialize=function(){this.app.on("audio:play",this.playSound,this),this.app.on("audio:stop",this.stopSound,this),this.app.on("audio:mute",this.muteSound,this),this.app.on("audio:unmute",this.unmuteSound,this),this.app.on("audio:enable",this.enableAudio,this),this.app.on("audio:disable",this.disableAudio,this),this.app.fire("audio:stateChanged",SoundController.audioEnabled),this.app.root.findByName("SoundStorage").sound.slot("melody").play()},SoundController.prototype.update=function(o){},SoundController.prototype.playSound=function(o,t){if(t){var n=(new Date).getTime(),e=this.app.root.findByName("SoundStorage").sound.slot(o).lastTimeStamp;if(e&&n-e<t)return;this.app.root.findByName("SoundStorage").sound.slot(o).lastTimeStamp=n}this.app.root.findByName("SoundStorage").sound.play(o)},SoundController.prototype.stopSound=function(o){this.app.root.findByName("SoundStorage").sound.stop(o)},SoundController.prototype.muteSound=function(o){this.app.root.findByName("SoundStorage").sound.slot(o).volume=0},SoundController.prototype.unmuteSound=function(o,t){this.app.root.findByName("SoundStorage").sound.slot(o).volume=t},SoundController.prototype.enableAudio=function(){SoundController.audioEnabled=!0,this.app.systems.sound.volume=1,this.app.fire("audio:stateChanged",SoundController.audioEnabled)},SoundController.prototype.disableAudio=function(){SoundController.audioEnabled=!1,this.app.systems.sound.volume=0,this.app.fire("audio:stateChanged",SoundController.audioEnabled)};var BasicButton=pc.createScript("basicButton");BasicButton.attributes.add("defaultScale",{title:"Default scale",type:"number",default:1,min:.5,max:1.5}),BasicButton.attributes.add("hoverScale",{title:"Hover scale",type:"number",default:1.03,min:.5,max:1.5}),BasicButton.attributes.add("pressedScale",{title:"Pressed scale",type:"number",default:.97,min:.5,max:1.5}),BasicButton.attributes.add("upScaleDuration",{title:"Tween duration",type:"number",default:.085,min:.005,max:1}),BasicButton.attributes.add("clickSound",{title:"Play sound",type:"boolean",default:!0}),BasicButton.prototype.initialize=function(){this.hovered=!1,pc.platform.mobile&&this.app.touch?(this.entity.element.on("touchstart",this.onPress,this),this.entity.element.on("touchend",this.onRelease,this)):(this.entity.element.on("mouseenter",this.onEnter,this),this.entity.element.on("mousedown",this.onPress,this),this.entity.element.on("mouseup",this.onRelease,this),this.entity.element.on("mouseleave",this.onLeave,this))},BasicButton.prototype.onEnter=function(e){this.hovered=!0,e.element.entity.tween(e.element.entity.getLocalScale()).to(new pc.Vec3(this.defaultScale*this.hoverScale,this.defaultScale*this.hoverScale,this.defaultScale*this.hoverScale),this.upScaleDuration,pc.Linear).start(),document.body.style.cursor="pointer"},BasicButton.prototype.onLeave=function(e){this.hovered=!1,e.element.entity.tween(e.element.entity.getLocalScale()).to(new pc.Vec3(this.defaultScale,this.defaultScale,this.defaultScale),this.upScaleDuration,pc.Linear).start(),document.body.style.cursor="default"},BasicButton.prototype.onPress=function(e){this.clickSound&&this.app.fire("audio:play","click"),e.element.entity.tween(e.element.entity.getLocalScale()).to(new pc.Vec3(this.defaultScale*this.pressedScale,this.defaultScale*this.pressedScale,this.defaultScale*this.pressedScale),.5*this.upScaleDuration,pc.SineOut).start()},BasicButton.prototype.onRelease=function(e){this.hovered?e.element.entity.tween(e.element.entity.getLocalScale()).to(new pc.Vec3(this.defaultScale*this.hoverScale,this.defaultScale*this.hoverScale,this.defaultScale*this.hoverScale),.5*this.upScaleDuration,pc.Linear).start():e.element.entity.tween(e.element.entity.getLocalScale()).to(new pc.Vec3(this.defaultScale,this.defaultScale,this.defaultScale),.5*this.upScaleDuration,pc.Linear).start()};// mainMenuController.js
/* jshint esversion: 6 */
var MainMenuController = pc.createScript('mainMenuController');

MainMenuController.prototype.initialize = function() {
    this.entity.headingContainer = this.entity.findByName("HeadingContainer");
    this.entity.headingIcon = this.entity.findByName("HeadingIcon");
    this.entity.handContainer = this.entity.findByName("HandContainer");
    this.entity.tutorialHand = this.entity.handContainer.findByName('TutorialHand');
    this.entity.clickZone = this.entity.handContainer.findByName('ClickZone');
    
    this.entity.clickZone.enabled = !skipTitleScreen();
    this.entity.handContainer.enabled = !skipTitleScreen();
    this.entity.headingIcon.enabled = !skipTitleScreen();
    
    this.assignAction(this.entity.clickZone, this.playPressed, this);
    
    /* show method */
    this.entity.show = function() {
        this.enabled = true;
        
        if(window.famobi_analytics) {        
            window.famobi_analytics.trackScreen(window.famobi_analytics.SCREEN_HOME);
        }
        
        if(skipTitleScreen()) {
              this.clickZone.enabled = this.handContainer.enabled = this.headingIcon.enabled = false;
        }

        /* tween heading icon */
        this.headingIcon.element.opacity = 0.0;
        var headingAppearingTween = 
        this.headingIcon.tween(this.headingIcon.element)
            .to({opacity: 1.0}, 0.6, pc.Linear)
            .delay(0.25).start();

        this.headingContainer.setLocalScale(0.0, 0.0, 0.0);
        var headingAppearingScaleTween = 
        this.headingContainer.tween(this.headingContainer.getLocalScale())
            .to(new pc.Vec3(1.2, 1.2, 1.2), 0.6, pc.BackOut)
            .delay(0.35).start();

        this.tutorialHand.tween(this.tutorialHand.getLocalScale())
            .to(new pc.Vec3(1.25, 1.25, 1.25), 0.55, pc.SineInOut)
            .yoyo(true)
            .repeat(100000)
            .start();

    }.bind(this.entity);
    
    
    /* hide method */
    this.entity.hide = function() {
        
          /* tween heading icon */
        this.headingIcon.element.opacity = 1.0;
        var headingAppearingTween = 
        this.headingIcon.tween(this.headingIcon.element)
            .to({opacity: 0.0}, 0.35, pc.SineOut)
            .start();
        
        var position = this.headingIcon.getLocalPosition();
        this.headingIcon.tween(this.headingIcon.getLocalPosition())
            .to(new pc.Vec3(position.x, position.y + 50, position.z), 0.35, pc.SineIn)
            .start();
        
        this.tutorialHand.tween(this.tutorialHand.element)
            .to({opacity: 0.0}, 0.25, pc.Linear)
            .on('complete', () => {
                this.enabled = false;
            })
            .start();
        
    }.bind(this.entity);
    
    
    this.entity.show();
};

MainMenuController.prototype.update = function(dt) {
    if(skipTitleScreen()) {
        this.entity.clickZone.enabled = this.entity.handContainer.enabled = this.entity.headingIcon.enabled = false;
    }
};

MainMenuController.prototype.assignAction = function(button, handler, handlerContext) {
     if(this.app.touch) {
         button.element.on('touchstart', handler, handlerContext);
     } else if(this.app.mouse) {
          button.element.on('mousedown', handler, handlerContext);
     } else {
         console.warn("MainMenu.assignAction - either touch or mouse are not detected");
     }
};

MainMenuController.prototype.playPressed = function() {
    this.entity.clickZone.enabled = false;
    WindowManager.startGameplay();
 
    if(!useAutoQuality()) {
         this.entity.delayedCall(100, () => this.app.root.findByName("Root").script.scaleManager.measurePerformance());
    }
   
};


// reviveWindow.js
/* jshint esversion: 6 */
var ReviveWindow = pc.createScript('reviveWindow');

// initialize code called once per entity
ReviveWindow.prototype.initialize = function() {
        
    this.entity.headingIcon = this.entity.findByName("HeadingIcon");
    this.entity.buttonRevive = this.entity.findByName("ButtonRevive");
    this.entity.buttonSkip = this.entity.findByName("ButtonSkip");
    this.entity.background = this.entity.findByName("Background");
    
    this.assignAction(this.entity.buttonRevive, this.revivePressed, this);
    this.assignAction(this.entity.buttonSkip, this.skipPressed, this);
    
    /* show method */
    this.entity.show = function() {
        this.enabled = true;
        
        if(window.famobi_analytics) {        
            window.famobi_analytics.trackScreen(window.famobi_analytics.SCREEN_BONUS);
        }
        
        /* tween background */
        this.background.element.opacity = 0.0;
        this.background.tween(this.background.element)
            .to({opacity: 0.94}, 0.25, pc.Linear)
            .start();
         
        /* tween heading icon */
        this.headingIcon.element.opacity = 0.0;
        var headingAppearingTween = 
        this.headingIcon.tween(this.headingIcon.element)
            .to({opacity: 0.9}, 0.3, pc.Linear)
            .delay(0.15);

        this.headingIcon.setLocalPosition(0, -360, 0);
        var headingMovingTween = 
        this.headingIcon.tween(this.headingIcon.getLocalPosition())
            .to(new pc.Vec3(0, 0, 0), 0.5, pc.SineOut)
            .delay(0.12);
        
        headingAppearingTween.chain(headingMovingTween).start();
        
        this.headingIcon.setLocalScale(0.5, 0.5, 0.5);
        var headingAppearingScaleTween = 
        this.headingIcon.tween(this.headingIcon.getLocalScale())
            .to(new pc.Vec3(1.35, 1.35, 1.35), 0.35, pc.BackOut)
            .delay(0.2);
        
        var headingMovingScaleTween = 
        this.headingIcon.tween(this.headingIcon.getLocalScale())
            .to(new pc.Vec3(1.0, 1.0, 1.0), 0.5, pc.SineOut)
            .delay(0.1);
        
         headingAppearingScaleTween.chain(headingMovingScaleTween).start();
        
     
        /* tween buttons */
        this.buttonRevive.setLocalScale(0, 0, 0);
        this.buttonRevive
            .tween(this.buttonRevive.getLocalScale())
            .to(new pc.Vec3(1, 1, 1), 0.5, pc.BackOut)
            .delay(0.9)
            .start();
                
        this.buttonSkip.setLocalScale(0, 0, 0);
        this.buttonSkip
            .tween(this.buttonSkip.getLocalScale())
            .to(new pc.Vec3(1, 1, 1), 0.5, pc.BackOut)
            .delay(1.3)
            .start();
        
    }.bind(this.entity);
    
    
    /* hide method */
    this.entity.hide = function() {
        this.enabled = false;
    }.bind(this.entity);
    
    
    this.entity.hide();
};

// update code called every frame
ReviveWindow.prototype.update = function(dt) {
    
};


ReviveWindow.prototype.assignAction = function(button, handler, handlerContext) {
     if(this.app.touch) {
         button.element.on('touchstart', handler, handlerContext);
     } else if(this.app.mouse) {
          button.element.on('mousedown', handler, handlerContext);
     } else {
         console.warn("ReviveWindow.assignAction - either touch or mouse are not detected");
     }
};

ReviveWindow.prototype.revivePressed = function() {    
    Apicontroller.showRewardedVideo((result) => {
        if(result && result.rewardGranted) {
                if(window.famobi_analytics) {        
                    window.famobi_analytics.trackScreen(window.famobi_analytics.SCREEN_LEVEL);
                }
                GameplayController.currentSession.ballsLeft += 5;
                GameplayController.currentSession.reviveUsed = true;
                Apicontroller.trackLevelUpdate({
                    "revives": (GameplayController.currentSession.reviveUsed ? 1 : 0),
                });
                this.entity.hide();
                this.entity.delayedCall(150, () => this.app.fire("level:createBall"));
        }
    });
};

ReviveWindow.prototype.skipPressed = function() {
    this.entity.hide();
    if(window.famobi_analytics) {        
        window.famobi_analytics.trackScreen(window.famobi_analytics.SCREEN_LEVEL);
    }
};



var WindowManager=pc.createScript("windowManager");WindowManager.prototype.initialize=function(){WindowManager.app=this.app,WindowManager.defeatWindow=this.app.root.findByName("UI Container").findByName("DefeatWindow"),WindowManager.resultsWindow=this.app.root.findByName("UI Container").findByName("ResultsWindow"),WindowManager.reviveWindow=this.app.root.findByName("UI Container").findByName("ReviveWindow"),WindowManager.mainMenu=this.app.root.findByName("UI Container").findByName("MainMenu"),WindowManager.settingsPanel=this.app.root.findByName("UI Container").findByName("SettingsPanel"),WindowManager.gameplayUI=this.app.root.findByName("UI Container").findByName("GamePlayUI")},WindowManager.prototype.update=function(n){},WindowManager.hideAll=function(){WindowManager.defeatWindow.hide(),WindowManager.resultsWindow.hide(),WindowManager.reviveWindow.hide(),WindowManager.mainMenu.hide(),WindowManager.gameplayUI.hide(),WindowManager.settingsPanel.hide()},WindowManager.showResults=function(){WindowManager.resultsWindow.show()},WindowManager.showDefeat=function(){WindowManager.defeatWindow.show()},WindowManager.showRevive=function(){WindowManager.reviveWindow.show()},WindowManager.startGameplay=function(){WindowManager.hideAll(),WindowManager.settingsPanel.show(),WindowManager.app.fire("gameplay:start",!0)},WindowManager.exitGameplay=function(){WindowManager.hideAll(),WindowManager.mainMenu.show(),WindowManager.settingsPanel.show(),WindowManager.app.fire("gameplay:exit")},WindowManager.hasOpenedWindows=function(){return WindowManager.resultsWindow.enabled||WindowManager.defeatWindow.enabled||WindowManager.reviveWindow.enabled};// settingsPanel.js
/* jshint esversion: 6 */
var SettingsPanel = pc.createScript('settingsPanel');

SettingsPanel.panelClosedY = 280;

SettingsPanel.prototype.initialize = function() {
    
    this.entity.settingsPanelContainer = this.entity.findByName("SettingsPanelContainer");
    this.entity.buttonSettings = this.entity.findByName("ButtonSettings");
    this.entity.panel = this.entity.settingsPanelContainer.findByName("PanelImage");
    this.entity.buttonSoundOn = this.entity.settingsPanelContainer.findByName("ButtonSoundOn");
    this.entity.buttonSoundOff = this.entity.settingsPanelContainer.findByName("ButtonSoundOff");
    this.entity.buttonQualityLow = this.entity.settingsPanelContainer.findByName("ButtonQualityLow");
    this.entity.buttonQualityMedium = this.entity.settingsPanelContainer.findByName("ButtonQualityMedium");
    this.entity.buttonQualityHigh = this.entity.settingsPanelContainer.findByName("ButtonQualityHigh");
    this.entity.buttonMenu = this.entity.findByName("ButtonMenu");
    
    this.entity.settingsPanelOpened = false;
    
    this.app.on("quality:changed", this.updateQualityButtons, this);
    this.app.on("audio:stateChanged", this.updateAudioButtons, this);
        
    this.assignAction(this.entity.buttonQualityLow, this.rescalePressed, this);
    this.assignAction(this.entity.buttonQualityMedium, this.rescalePressed, this);
    this.assignAction(this.entity.buttonQualityHigh, this.rescalePressed, this);
    this.updateQualityButtons();
    
    this.assignAction(this.entity.buttonSoundOn, this.disableAudio, this);
    this.assignAction(this.entity.buttonSoundOff, this.enableAudio, this);
    this.updateAudioButtons(true);
    
    this.assignAction(this.entity.buttonMenu, this.openMainMenu, this);
    this.assignAction(this.entity.buttonSettings, this.toggleSettings, this);
    
        
      /* show method */
    this.entity.show = function() {
        this.enabled = true;
    }.bind(this.entity);
    
    
    /* hide method */
    this.entity.hide = function() {
        
        this.settingsPanelOpened = false;
        const pos = this.settingsPanelContainer.getLocalPosition();
        pos.y = SettingsPanel.panelClosedY;
        this.settingsPanelContainer.setLocalPosition(pos);
        
        this.enabled = false;
    }.bind(this.entity);
    
    
    this.entity.show();
};

SettingsPanel.prototype.assignAction = function(button, handler, handlerContext) {
     if(this.app.touch) {
         button.element.on('touchstart', handler, handlerContext);
     } else if(this.app.mouse) {
          button.element.on('mousedown', handler, handlerContext);
     } else {
         console.warn("SettingsPanel.assignAction - either touch or mouse are not detected");
     }
};


SettingsPanel.prototype.update = function(dt) {
    const autoQuality = useAutoQuality();
    if(autoQuality) {
        this.entity.buttonQualityLow.enabled = this.entity.buttonQualityMedium.enabled = this.entity.buttonQualityHigh.enabled = false;
        const settingsPanelPosition = this.entity.settingsPanelContainer.getLocalPosition();
        settingsPanelPosition.y = 165;
        this.entity.settingsPanelContainer.setLocalPosition(settingsPanelPosition);
    }
    
    this.entity.panel.enabled = !autoQuality;
    this.entity.buttonSettings.enabled = !autoQuality;
    this.entity.buttonSettings.enabled = !autoQuality;
};

SettingsPanel.prototype.rescalePressed = function() {    
    this.app.fire("quality:next");    
};

SettingsPanel.prototype.enableAudio = function() {    
    this.app.fire("audio:enable");
    if(window.famobi_analytics) {
          famobi_analytics.trackEvent(window.famobi_analytics.EVENT_VOLUMECHANGE, {
                bgmVolume: 1,
                sfxVolume: 1
            });
    }
    this.app.fire('app:save');
};

SettingsPanel.prototype.disableAudio = function() {    
    this.app.fire("audio:disable");
    if(window.famobi_analytics) {
          famobi_analytics.trackEvent(window.famobi_analytics.EVENT_VOLUMECHANGE, {
                bgmVolume: 0,
                sfxVolume: 0
            });
    }
    this.app.fire('app:save');
};

SettingsPanel.prototype.openMainMenu = function() {
    //TransitionScreen.instance.transitionTo(() => WindowManager.exitGameplay());
};

SettingsPanel.prototype.updateQualityButtons = function() {    
    this.entity.buttonQualityLow.enabled = window.forceHightQualityOnDesktop ? false : ScaleManager.qualityIndex === ScaleManager.QUALITY_LOW;
    this.entity.buttonQualityMedium.enabled =  window.forceHightQualityOnDesktop ? false : ScaleManager.qualityIndex === ScaleManager.QUALITY_MEDIUM;
    this.entity.buttonQualityHigh.enabled =  window.forceHightQualityOnDesktop ? false : ScaleManager.qualityIndex === ScaleManager.QUALITY_HIGH;
};

SettingsPanel.prototype.updateAudioButtons = function(dontSaveState) {    
    this.entity.buttonSoundOn.enabled = SoundController.audioEnabled;
    this.entity.buttonSoundOff.enabled = !SoundController.audioEnabled;
};

SettingsPanel.prototype.toggleSettings = function() {  
    this.entity.settingsPanelOpened = !this.entity.settingsPanelOpened;
    
    const settingsPanelPosition = this.entity.settingsPanelContainer.getLocalPosition();
    
    this.entity.settingsPanelContainer.tween(this.entity.settingsPanelContainer.getLocalPosition())
        .to(new pc.Vec3(settingsPanelPosition.x, this.entity.settingsPanelOpened ? (useAutoQuality() ? 180 : 90) : SettingsPanel.panelClosedY , settingsPanelPosition.z), 0.3, pc.QuarticOut)
        .start();
};


// gameplayUI.js
/* jshint esversion: 6 */
var GameplayUi = pc.createScript('gameplayUi');

GameplayUi.prototype.initialize = function() {
    this.entity.currentScoreText = this.entity.findByName("CurrentScoresText"); 
    this.entity.currentScoreTextLandscape = this.entity.findByName("CurrentScoresTextLandscape");  
    this.entity.coinsContainer = this.entity.findByName("CoinsContainer");
    this.entity.coinsCounterIcon = this.entity.findByName("CoinsCounterIcon");
    this.entity.coinsCounterText = this.entity.findByName("CoinsCounterText");
    this.entity.centerContainer =  this.entity.findByName("CenterContainer");
    this.entity.progressBarHorizontal = this.entity.centerContainer.findByName('LevelProgressBar');
    this.entity.progressBarVertical = this.entity.centerContainer.findByName('LevelProgressBarVertical');
    
    this.entity.coinsContainerInitialPosition = this.entity.coinsContainer.getLocalPosition().clone();
    this.entity.progressBarHorizontalInitialPosition = this.entity.progressBarHorizontal.getLocalPosition().clone();
    this.entity.progressBarVerticalInitialPosition = this.entity.progressBarVertical.getLocalPosition().clone();
    
    this.entity.bestScoreText = this.entity.findByName("BestScoresText"); 
    this.entity.bestScoreIcon = this.entity.findByName("BestScoresIcon"); 
    this.entity.bestScoreTextLandscape = this.entity.findByName("BestScoresTextLandscape"); 
    this.entity.bestScoreIconLandscape = this.entity.findByName("BestScoresIconLandscape"); 
    
    this.entity.buttonMultiball = this.entity.findByName("PowerupMultiball");
    this.entity.buttonEarthquake = this.entity.findByName("PowerupEarthquake");
    
    this.app.on("score:updated", this.updateScoresText, this);
    this.app.on("coins:updated", this.updateCoinsText, this);
    this.app.on("level:buildTower", this.hidePowerups, this);
    this.app.on("powerup:enableButtons", this.showPowerups, this);
    
    this.app.on("viewport:resize", this.resetPositions, this);
    
    const scriptContext = this;
    
    /* show method */
    this.entity.show = function() {
        scriptContext.hidePowerups();
        this.delayedCall(GameplayController.cameraLiftTweenDuration * 1000, () => scriptContext.animateAppearing.apply(scriptContext));        
    }.bind(this.entity);
    
    
    /* hide method */
    this.entity.hide = function() {
        this.enabled = false;
    }.bind(this.entity);
    
    
    this.entity.hide();
};

GameplayUi.prototype.animateAppearing = function() {
    this.entity.enabled = true;
    
    this.entity.progressBarHorizontal.setLocalPosition(this.entity.progressBarHorizontalInitialPosition.x, this.entity.progressBarHorizontalInitialPosition.y + 150, this.entity.progressBarHorizontalInitialPosition.z);
    this.entity.progressBarHorizontalTween = this.entity.progressBarHorizontal.tween(this.entity.progressBarHorizontal.getLocalPosition())
        .to(new pc.Vec3(this.entity.progressBarHorizontalInitialPosition.x, this.entity.progressBarHorizontalInitialPosition.y, this.entity.progressBarHorizontalInitialPosition.z), 0.5, pc.BackOut)
        .start();
    
    this.entity.progressBarVertical.setLocalPosition(this.entity.progressBarVerticalInitialPosition.x - 130, this.entity.progressBarVerticalInitialPosition.y, this.entity.progressBarVerticalInitialPosition.z);
    this.entity.progressBarVerticalTween = this.entity.progressBarVertical.tween(this.entity.progressBarVertical.getLocalPosition())
        .to(new pc.Vec3(this.entity.progressBarVerticalInitialPosition.x, this.entity.progressBarVerticalInitialPosition.y, this.entity.progressBarVerticalInitialPosition.z), 0.5, pc.BackOut)
        .start();
    
    this.entity.coinsContainer.setLocalPosition(this.entity.coinsContainerInitialPosition.x, this.entity.coinsContainerInitialPosition.y + 120, this.entity.coinsContainerInitialPosition.z);
    this.entity.coinsContainerTween = this.entity.coinsContainer.tween(this.entity.coinsContainer.getLocalPosition())
        .to(new pc.Vec3(this.entity.coinsContainerInitialPosition.x, this.entity.coinsContainerInitialPosition.y, this.entity.coinsContainerInitialPosition.z), 0.5, pc.BackOut)
        .delay(0.15)
        .start();
    
    this.entity.centerContainer.childrenAlphaAppear(0, 0.4, pc.Linear, 0.0);
    this.entity.coinsContainer.childrenAlphaAppear(0, 0.4, pc.Linear, 0.15);
};


GameplayUi.prototype.hidePowerups = function() {
    this.entity.buttonMultiball.enabled = false;
    this.entity.buttonEarthquake.enabled = false;
};

GameplayUi.prototype.resetPositions = function() {
    if(this.entity.progressBarHorizontalTween && this.entity.progressBarHorizontalTween.playing) {
        this.entity.progressBarHorizontalTween.stop();
    }
    this.entity.progressBarHorizontal.setLocalPosition(this.entity.progressBarHorizontalInitialPosition.x, this.entity.progressBarHorizontalInitialPosition.y, this.entity.progressBarHorizontalInitialPosition.z);
    
    if(this.entity.progressBarVerticalTween && this.entity.progressBarVerticalTween.playing) {
        this.entity.progressBarVerticalTween.stop();
    }
    this.entity.progressBarVertical.setLocalPosition(this.entity.progressBarVerticalInitialPosition.x, this.entity.progressBarVerticalInitialPosition.y, this.entity.progressBarVerticalInitialPosition.z);
    
    if(this.entity.coinsContainerTween && this.entity.coinsContainerTween.playing) {
        this.entity.coinsContainerTween.stop();
    }
    this.entity.coinsContainer.setLocalPosition(this.entity.coinsContainerInitialPosition.x, this.entity.coinsContainerInitialPosition.y, this.entity.coinsContainerInitialPosition.z);

};

GameplayUi.prototype.showPowerups = function() {
        this.entity.buttonMultiball.enabled = true;
        this.entity.buttonMultiball.setLocalScale(0, 0, 0);
        this.entity.buttonMultiball
            .tween(this.entity.buttonMultiball.getLocalScale())
            .to(new pc.Vec3(1, 1, 1), 0.4, pc.BackOut)
            .delay(0.275)
            .start();
    
    
        this.entity.buttonEarthquake.enabled = true;
        this.entity.buttonEarthquake.setLocalScale(0, 0, 0);
        this.entity.buttonEarthquake
            .tween(this.entity.buttonEarthquake.getLocalScale())
            .to(new pc.Vec3(1, 1, 1), 0.4, pc.BackOut)
            .delay(0.2)
            .start();
};

GameplayUi.prototype.update = function(dt) {
    var pos =  this.entity.bestScoreIcon.getLocalPosition();
    pos.x = this.entity.bestScoreText.getLocalPosition().x - this.entity.bestScoreText.element.width / 2 + 6;
    this.entity.bestScoreIcon.setLocalPosition(pos);
    
    var posLandscape =  this.entity.bestScoreIconLandscape.getLocalPosition();
    posLandscape.x = this.entity.bestScoreTextLandscape.getLocalPosition().x - this.entity.bestScoreTextLandscape.element.width / 2 + 7;
    this.entity.bestScoreIconLandscape.setLocalPosition(posLandscape);
    
    this.entity.bestScoreText.element.text = '' + GameplayController.maxScores;
    this.entity.bestScoreTextLandscape.element.text = '' + GameplayController.maxScores;
};

GameplayUi.prototype.updateScoresText = function(scores) {
     this.entity.currentScoreText.element.text = '' + scores; 
     this.entity.currentScoreTextLandscape.element.text = '' + scores; 
};

GameplayUi.prototype.updateCoinsText = function(coins) {
     this.entity.coinsCounterText.element.text = '' + coins; 
};


GameplayUi.prototype.assignAction = function(button, handler, handlerContext) {
     if(this.app.touch) {
         button.element.on('touchstart', handler, handlerContext);
     } else if(this.app.mouse) {
          button.element.on('mousedown', handler, handlerContext);
     } else {
         console.warn("UIController.assignAction - either touch or mouse are not detected");
     }
};


// towerStorage.js
/* jshint esversion: 6 */
var TowerStorage = pc.createScript('towerStorage');

// initialize code called once per entity
TowerStorage.prototype.initialize = function() {
   this.loadNextPrefab();
    
    this.app.on("tower:next", this.loadNextPrefab, this);
};

TowerStorage.prototype.searchForPrefabs = function() {
     this.preparedPrefabs = Utils.shuffle(this.app.root.findByName("Prefabs").children.filter(prefab => !!prefab.script.towerConfig.readyToUse));
};

TowerStorage.prototype.getCurrentPrefab = function() {
    return this.currentPrefab;
};

TowerStorage.prototype.loadNextPrefab = function() {
    if(!this.preparedPrefabs || this.preparedPrefabs.length === 0) {
        this.searchForPrefabs();   
    }
    
    if(this.preparedPrefabs.length > 0) {
        this.currentPrefab = Utils.removeRandomItem(this.preparedPrefabs);
    } else {
        this.currentPrefab = null;
        console.error("No tower prefabs found");
    }
};


// update code called every frame
TowerStorage.prototype.update = function(dt) {
    
};


// comboEffect.js
var ComboEffect = pc.createScript('comboEffect');

ComboEffect.prototype.initialize = function() {
    this.comboEffect = this.entity.findByName("ComboEffect");
    
    this.comboEffect.enabled = false;
    
    this.app.on("combo:show", this.showComboEffect, this);
};

ComboEffect.prototype.showComboEffect = function(multiplier) {
    if(this.comboMovingTween && this.comboMovingTween.playing) {
        this.comboMovingTween.stop();
    }
    
    if(this.comboScaleTween && this.comboScaleTween.playing) {
        this.comboScaleTween.stop();
    }
    
     if(this.comboScaleTween2 && this.comboScaleTween2.playing) {
        this.comboScaleTween2.stop();
    }

     if(this.comboShakingTween && this.comboShakingTween.playing) {
        this.comboShakingTween.stop();
    }
    
    
    if(!this.comboEffect.enabled) {
        var anchorX, anchorY; 
        if(window.innerWidth > window.innerHeight) {
            anchorX = Math.random() < 0.5 ?  pc.math.random(0.3, 0.4) : pc.math.random(0.6, 0.7); 
            anchorY = pc.math.random(0.4, 0.6);
        } else {
            anchorX = Math.random() < 0.5 ?  pc.math.random(0.15, 0.22) : pc.math.random(0.78, 0.85);
            anchorY = pc.math.random(0.35, 0.65);
        }
       
        var anchor = this.comboEffect.element.anchor;
        anchor.set(anchorX, anchorY, anchorX, anchorY);
        this.comboEffect.element.anchor = anchor;
    }
  
    this.comboEffect.enabled = true;
    
    var stringText = ('x' + multiplier).toString();
    var currentColor = pc.math.clamp(Math.floor(multiplier / 10), 0, 4); 
    
    for(var q = 0; q < 4; q++) {
        this.entity.findByName("Digit" + q).element.opacity = 0;
    }
    for(var i = 0; i < Math.min(stringText.length, 4); i++) {
        var digitCode = +stringText.charAt(i);
        digitCode = ((digitCode >= 0 && digitCode <= 9) ? digitCode : 10) * 5 + currentColor;
        this.entity.findByName("Digit" + i).element.spriteFrame = digitCode;
        this.entity.findByName("Digit" + i).element.opacity = 1;
    }
    
    var soundIndex = pc.math.clamp(Math.floor(multiplier / 5) + 1, 1, 5);
    this.app.fire("audio:play", "combo0" + soundIndex, 100); /* (currentColor + 1)*/
    
    //tween appearing 
    this.comboEffect.setLocalPosition(0, 0, 0);
    this.comboMovingTween = this.comboEffect.tween(this.comboEffect.getLocalPosition())
        .to(new pc.Vec3(0, 1, 0), 1.5, pc.SineInOut)
        .on('complete', () => {
            this.comboEffect.enabled = false;
        })
        .start();
    
    this.comboEffect.setLocalScale(0.5, 0.5, 0.5);
    this.comboScaleTween = this.comboEffect.tween(this.comboEffect.getLocalScale())
        .to(new pc.Vec3(0.75, 0.75, 0.75), 0.3, pc.BackOut);

    this.comboScaleTween2 = this.comboEffect.tween(this.comboEffect.getLocalScale())
        .to(new pc.Vec3(0, 0, 0), 0.25, pc.BackIn)
         .delay(0.9);
    
    this.comboScaleTween.chain(this.comboScaleTween2).start();
    
    
    this.comboEffect.setLocalEulerAngles(0, 0, 3);
    this.comboShakingTween = this.comboEffect.tween(this.comboEffect.getLocalRotation())
        .to(new pc.Vec4(0, 0, -0.03, 1), 0.2, pc.Linear)
        .repeat(6)
        .yoyo(true)
        .start();
};


ComboEffect.prototype.update = function(dt) {
    
};


// shopItem.js
var ShopItem = pc.createScript('shopItem');

ShopItem.attributes.add('dataKey', {
    type: 'string',
    default: '',
});

ShopItem.prototype.initialize = function() {
    this.entity.buttonBuy = this.entity.findByName("ButtonBuy");
    this.entity.buttonWatchVideo = this.entity.findByName("ButtonWatchVideo");
    this.entity.priceGroup = this.entity.findByName("PriceGroup");
    this.entity.priceText = this.entity.priceGroup.findByName("PriceText");
    this.entity.boughtIcon = this.entity.findByName("ItemBoughtIcon");
    
    this.initialTextColor = this.entity.priceText.element.color.clone();

    
    this.assignAction(this.entity.buttonBuy, this.buyPressed, this);
    this.assignAction(this.entity.buttonWatchVideo, this.watchVideoPressed, this);

    var scriptingContext = this;
    
     /* show method */
    this.entity.show = function(startX, endX, delay, rewardedVideoAvailable) {
        this.enabled = true;
        
        this.setLocalPosition(startX, 0, 0);
        this.tween(this.getLocalPosition())
            .to(new pc.Vec3(endX, 0, 0), 0.25, pc.QuinticOut)
            .delay(delay)
            .start();        
        
        this.setLocalScale(0, 0, 0);
        this.tween(this.getLocalScale())
            .to(new pc.Vec3(1, 1, 1), 0.35, pc.BackOut)
            .delay(delay)
            .start();

        this.buttonBuy.setLocalScale(0, 0, 0);
        this.buttonBuy.tween(this.buttonBuy.getLocalScale())
            .to(new pc.Vec3(1, 1, 1), 0.3, pc.BackOut)
            .delay(delay + 0.25)
            .start();
        
        this.buttonWatchVideo.setLocalScale(0, 0, 0);
        this.buttonWatchVideo.tween(this.buttonWatchVideo.getLocalScale())
            .to(new pc.Vec3(1, 1, 1), 0.3, pc.BackOut)
            .delay(delay + 0.25)
            .start();
        
        this.boughtIcon.setLocalScale(0, 0, 0);
        this.boughtIcon.tween(this.boughtIcon.getLocalScale())
            .to(new pc.Vec3(1, 1, 1), 0.25, pc.BackOut)
            .delay(delay + 0.15)
            .start();
        
        /* tween text groups */
        this.priceGroup.setLocalPosition(0, 70, 0);
        this.priceGroup.tween(this.priceGroup.getLocalPosition())
            .to(new pc.Vec3(0, 144, 0), 0.3, pc.BackOut)
            .delay(delay + 0.1)
            .start();
        
        if(scriptingContext.isBought()) {
            this.priceGroup.enabled = false;
            this.buttonWatchVideo.enabled = false;
            this.buttonBuy.enabled = false;
            this.boughtIcon.enabled = true;
            
        } else {
            this.buttonWatchVideo.enabled = rewardedVideoAvailable;
            this.buttonBuy.enabled = this.priceGroup.enabled = !this.buttonWatchVideo.enabled;
            this.priceText.element.text = '' + scriptingContext.getPrice();
            this.boughtIcon.enabled =false;
        }
        
    }.bind(this.entity);
    
    
    /* hide method */
    this.entity.hide = function() {
        this.enabled = false;
    }.bind(this.entity);
    
};

ShopItem.prototype.assignAction = function(button, handler, handlerContext) {
     if(this.app.touch) {
         button.element.on('touchstart', handler, handlerContext);
     } else if(this.app.mouse) {
          button.element.on('mousedown', handler, handlerContext);
     } else {
         console.warn("ShopItem.assignAction - either touch or mouse are not detected");        
     }
};

ShopItem.prototype.update = function(dt) {
    
};

ShopItem.prototype.getPrice = function() {
    return +GameplayController["powerup" + this.dataKey + "Price"];
};

ShopItem.prototype.buyPressed = function() {
    if(GameplayController.coins >= this.getPrice()) {        
        GameplayController.setCoins(GameplayController.coins - this.getPrice());
        this.acquireItem();
    } else {
        this.app.fire("audio:play", "purchaseFailed");
        this.app.fire('shop:notEnoughCoins');
        var color = new pc.Color(1, 0, 0);
        this.app.tween(color)
           .to(this.initialTextColor, 0.3, pc.SineInOut)
           .on('update', () => {this.entity.priceText.element.color = color;})
           .start();
    }
};

ShopItem.prototype.watchVideoPressed = function() {
    this.acquireItem();
};

ShopItem.prototype.isBought = function() {
    return GameplayController["powerup" + this.dataKey + "Purchased"];
};

ShopItem.prototype.acquireItem = function() {
    if(!this.isBought()) {
        this.app.fire("audio:play", "purchaseDone");
        GameplayController["powerup" + this.dataKey + "Purchased"] = true;
        this.app.fire("powerup:stateChanged", this.dataKey);
        this.app.fire("app:save");
        this.updateAvailability();
        
        this.entity.boughtIcon.setLocalScale(0, 0, 0);
        this.entity.boughtIcon.tween(this.entity.boughtIcon.getLocalScale())
            .to(new pc.Vec3(1, 1, 1), 0.3, pc.BackOut)
            .start();
    }
};


ShopItem.prototype.updateAvailability = function() {
  if(this.isBought()) {
        this.entity.priceGroup.enabled = false;
        this.entity.buttonWatchVideo.enabled = false;
        this.entity.buttonBuy.enabled = false;
        this.entity.boughtIcon.enabled = true;      
    } else {
        this.entity.buttonWatchVideo.enabled = scriptingContext.isVideoAvailable();
        this.entity.buttonBuy.enabled = this.priceGroup.enabled = !this.buttonWatchVideo.enabled;
        this.entity.priceText.element.text = '' + scriptingContext.getPrice();
        this.entity.boughtIcon.enabled = false;
    }
};

// powerupButton.js
/* jshint esversion: 6 */
var PowerupButton = pc.createScript('powerupButton');


PowerupButton.attributes.add('dataKey', {
    type: 'string',
    default: '',
});

PowerupButton.prototype.initialize = function() {
    
    this.entity.icon = this.entity.findByName("Icon");
    this.entity.checkIcon = this.entity.findByName("CheckMark");
    this.entity.buttonWatchVideo = this.entity.findByName("ButtonWatchVideo");
    this.entity.buttonBuy = this.entity.findByName("ButtonBuy");
    this.entity.buttonBuyText = this.entity.buttonBuy.findByName("PriceText");
    this.entity.buttonBuyDisabled = this.entity.findByName("ButtonBuyDisabled");
    this.entity.buttonBuyDisabledText = this.entity.buttonBuyDisabled.findByName("PriceText");
    this.entity.notEnoughCoins = this.entity.findByName('NotEnoughCoins');
    
    this.initialTextColor = this.entity.buttonBuyDisabledText.element.color.clone();
    
    this.entity.notEnoughCoins.enabled = false;
    
    this.app.on("powerup:stateChanged", this.updateState, this);
    this.app.on('coins:updated', (numCoins) => this.updateState(), this);
    
    this.assignAction(this.entity.icon, this.iconPressed, this);
    this.assignAction(this.entity.buttonWatchVideo, this.iconPressed, this);
    this.assignAction(this.entity.buttonBuy, this.iconPressed, this);
    this.assignAction(this.entity.buttonBuyDisabled, this.iconPressed, this);
    
    this.updateState();    
};

PowerupButton.prototype.assignAction = function(button, handler, handlerContext) {
     if(this.app.touch) {
         button.element.on('touchstart', (e) => {
             this.touchPosition = {x: e.touches[0].clientX, y: e.touches[0].clientY};  
         });
         button.element.on('touchend', (e) => {
             if(!this.touchPosition || (e.changedTouches && e.changedTouches[0] && Utils.distanceBetween(e.changedTouches[0].clientX, e.changedTouches[0].clientY, this.touchPosition.x, this.touchPosition.y) < 10)) {
                 handler.apply(handlerContext);
             }
         });
     } else if(this.app.mouse) {
          button.element.on('mousedown', handler, handlerContext);
     } else {
         console.warn("PowerupButton.assignAction - either touch or mouse are not detected");        
     }
};

PowerupButton.prototype.update = function(dt) {
    this.updateState();
};

PowerupButton.prototype.iconPressed = function() {
    if(GameplayController["powerup" + this.dataKey + "Purchased"]) {
        GameplayController["powerup" + this.dataKey + "Purchased"] = false;
        this.app.fire("audio:play", "click");   
        this.app.fire("powerup:activate", this.dataKey);
        this.app.fire("powerup:stateChanged", this.dataKey);
        if(GameplayController.currentSession) {
            GameplayController.currentSession.usedPowerups.push(this.dataKey);
            Apicontroller.trackLevelUpdate({
                    "powerups": GameplayController.currentSession.usedPowerups
                });
        }
    } else {
        if(this.entity.buttonWatchVideo.enabled) {
            var hasRewardedVideos = Apicontroller.hasRewardedVideo();
            if(hasRewardedVideos) {
                Apicontroller.showRewardedVideo((result) => result && result.rewardGranted && this.acquireItem());
            } else {
                this.acquireItem();
            }   
        } else {            
            if(GameplayController.coins >= this.getPrice()) {        
                GameplayController.setCoins(GameplayController.coins - this.getPrice());
                this.acquireItem();
            } else {
                this.app.fire("audio:play", "purchaseFailed");   
                this.displayNotEnoughCoins();
                
                var color = new pc.Color(0.7, 0, 0);
                this.app.tween(color)
                   .to(this.initialTextColor, 0.5, pc.BounceOut)
                   .on('update', () => {this.entity.buttonBuyDisabledText.element.color = color;})
                   .start();
                
                this.entity.buttonBuyDisabledText.setLocalScale(0.75, 0.75, 0.75);
                this.entity.buttonBuyDisabledText.tween(this.entity.buttonBuyDisabledText.getLocalScale())
                    .to(new pc.Vec3(1, 1, 1), 0.65, pc.ElasticOut)
                    .start();
            }            
        }       
    }
};

PowerupButton.prototype.isBought = function() {
    return GameplayController["powerup" + this.dataKey + "Purchased"];
};

PowerupButton.prototype.getPrice = function() {
    return +GameplayController["powerup" + this.dataKey + "Price"];
};

PowerupButton.prototype.acquireItem = function() {
    if(!this.isBought()) {
        this.app.fire("audio:play", "purchaseDone");
        GameplayController["powerup" + this.dataKey + "Purchased"] = true;
        this.app.fire("powerup:stateChanged", this.dataKey);
        this.app.fire("app:save");
        this.updateState();
        
        this.entity.checkIcon.setLocalScale(0, 0, 0);
        this.entity.checkIcon.tween(this.entity.checkIcon.getLocalScale())
            .to(new pc.Vec3(1, 1, 1), 0.22, pc.BackOut)
            .start();
    }
};

PowerupButton.prototype.updateState = function(dataKey) {
    if(dataKey && dataKey != this.dataKey) {
        return;   
    }
    
     if(GameplayController["powerup" + this.dataKey + "Purchased"]) {
        this.entity.checkIcon.enabled = true;
        this.entity.buttonWatchVideo.enabled = false;
        this.entity.buttonBuy.enabled = false;
        this.entity.buttonBuyDisabled.enabled = false;
    } else {
        this.entity.checkIcon.enabled = false;
        this.entity.buttonWatchVideo.enabled = false;
        this.entity.buttonBuy.enabled = GameplayController.coins >= this.getPrice();
        this.entity.buttonBuyDisabled.enabled = !this.entity.buttonBuy.enabled;
        
        this.entity.buttonBuyText.element.text = '' + this.getPrice();
        this.entity.buttonBuyDisabledText.element.text = '' + this.getPrice();
    }
};

PowerupButton.prototype.displayNotEnoughCoins = function() {
    this.entity.notEnoughCoins.enabled = true;
    
    if(this.alphaAppearingTween && this.alphaAppearingTween.playing) {
        this.alphaAppearingTween.stop();
    }
        
    if(this.alphaDisappearingTween && this.alphaDisappearingTween.playing) {
        this.alphaDisappearingTween.stop();
    }
    
    if(this.positionAppearingTween && this.positionAppearingTween.playing) {
        this.positionAppearingTween.stop();
    }
    
    if(this.positionDisappearingTween && this.positionDisappearingTween.playing) {
        this.positionDisappearingTween.stop();
    }
    
    this.entity.notEnoughCoins.element.opacity = 0.3;
    this.alphaAppearingTween = this.entity.notEnoughCoins.tween(this.entity.notEnoughCoins.element)
        .to({opacity: 1}, 0.13, pc.SineIn);


    this.alphaDisappearingTween = this.entity.notEnoughCoins.tween(this.entity.notEnoughCoins.element)
        .to({opacity: 0}, 0.7, pc.Linear)
        .on('complete', () => {
            this.entity.notEnoughCoins.enabled = false;
        });

    this.alphaAppearingTween.chain(this.alphaDisappearingTween).start();

    
     this.entity.notEnoughCoins.setLocalPosition(-95, -55, 0);
     this.positionAppearingTween = this.entity.notEnoughCoins.tween(this.entity.notEnoughCoins.getLocalPosition())
        .to(new pc.Vec3(-95, -43, 0), 0.18, pc.SineIn);
    
      this.positionDisappearingTween = this.entity.notEnoughCoins.tween(this.entity.notEnoughCoins.getLocalPosition())
        .to(new pc.Vec3(-95, -5, 0), 0.65, pc.Linear);

     this.positionAppearingTween.chain(this.positionDisappearingTween).start();
    
    
};

// smileScared.js
var SmileScared = pc.createScript('smileScared');

// initialize code called once per entity
SmileScared.prototype.initialize = function() {
    this.entity.enabled = false;
    this.entity.element.opacity = 0;    
    
    this.app.on('smile:scared', this.show, this);
};

// update code called every frame
SmileScared.prototype.update = function(dt) {
    
};

SmileScared.prototype.show = function () {
    
     this.app.fire("audio:play", "emojiScared");
        
    if(this.positionTween && this.positionTween.playing) {
        this.positionTween.stop();
    }
    
    if(this.scaleTween && this.scaleTween.playing) {
        this.scaleTween.stop();
    }
    
    if(this.shakingTween && this.shakingTween.playing) {
        this.shakingTween.stop();
    }

    if(this.shakingEndTween && this.shakingEndTween.playing) {
        this.shakingEndTween.stop();
    }
    
    if(this.alphaAppearingTween && this.alphaAppearingTween.playing) {
        this.alphaAppearingTween.stop();
    }
    
      if(this.alphaDsiappearingTween && this.alphaDisappearingTween.playing) {
        this.alphaDisappearingTween.stop();
    }
    
    this.entity.enabled = true;
  
    
    var screenSide = (this.app.root.findByName("ComboEffect").element.anchor.x > 0.5) ? 1 : -1;
    var yAnchor = pc.math.random(0.4, 0.6);
    if(screenSide > 0) {
        this.entity.element.anchor = new pc.Vec4(0.35, yAnchor, 0.35, yAnchor);
        this.initialX = -100;
    } else {
        this.entity.element.anchor = new pc.Vec4(0.65, yAnchor, 0.65, yAnchor);
          this.initialX = 100;
    }
    
    //tween appearing 
    this.entity.setLocalPosition(this.initialX, 0, 0);
    this.positionTween = this.entity.tween(this.entity.getLocalPosition())
        .to(new pc.Vec3(this.initialX, 120, 0), 2.2, pc.SineInOut)
        .on('complete', () => {
            this.entity.enabled = false;
        })
        .start();


    this.entity.setLocalEulerAngles(0, 0, 4);
    this.shakingTween = this.entity.tween(this.entity.getLocalRotation())
        .to(new pc.Vec4(0, 0, -0.04, 1), 0.25, pc.Linear)
        .delay(0.1)
        .repeat(5)
        .yoyo(true);
    
    this.shakingEndTween = this.entity.tween(this.entity.getLocalRotation())
        .to(new pc.Vec4(0, 0, 0, 1), 0.125, pc.Linear);
   
    this.shakingTween.chain(this.shakingEndTween).start();

    this.entity.element.opacity = 0;
    this.alphaAppearingTween = this.entity.tween(this.entity.element)
        .to({opacity: 1}, 0.3, pc.Linear);
    
    this.alphaDisappearingTween = this.entity.tween(this.entity.element)
        .to({opacity: 0}, 0.3, pc.Linear)
        .delay(1.6);
    
    this.alphaAppearingTween.chain(this.alphaDisappearingTween).start();
};

// smileSurprised.js
var SmileSurprised = pc.createScript('smileSurprised');


SmileSurprised.prototype.initialize = function() {
    this.entity.enabled = false;
    this.entity.element.opacity = 0;    
    
    this.app.on('smile:surprised', this.show, this);
};

// update code called every frame
SmileSurprised.prototype.update = function(dt) {
    
};


SmileSurprised.prototype.show = function() {
    
     this.app.fire("audio:play", "emojiSurprised");
    
    if(this.positionTween && this.positionTween.playing) {
        this.positionTween.stop();
    }
    
    if(this.scaleTween && this.scaleTween.playing) {
        this.scaleTween.stop();
    }
          
    if(this.scaleTween2 && this.scaleTween2.playing) {
        this.scaleTween2.stop();
    }

    if(this.alphaAppearingTween && this.alphaAppearingTween.playing) {
        this.alphaAppearingTween.stop();
    }
    
      if(this.alphaDsiappearingTween && this.alphaDisappearingTween.playing) {
        this.alphaDisappearingTween.stop();
    }
    
    this.entity.enabled = true;
  
    
    var screenSide = (this.app.root.findByName("ComboEffect").element.anchor.x > 0.5) ? 1 : -1;
    var yAnchor = pc.math.random(0.4, 0.6);
    if(screenSide > 0) {
        this.entity.element.anchor = new pc.Vec4(0.35, yAnchor, 0.35, yAnchor);
        this.initialX = -100;
    } else {
        this.entity.element.anchor = new pc.Vec4(0.65, yAnchor, 0.65, yAnchor);
          this.initialX = 100;
    }
    
    //tween appearing 
    this.entity.setLocalPosition(this.initialX, 0, 0);
    this.positionTween = this.entity.tween(this.entity.getLocalPosition())
        .to(new pc.Vec3(this.initialX, 60, 0), 2.0, pc.CubicOut)
        .on('complete', () => {
            this.entity.enabled = false;
        })
        .start();
    
    
    this.entity.setLocalScale(0, 0, 0);
    this.scaleTween = this.entity.tween(this.entity.getLocalScale())
        .to(new pc.Vec3(1.5, 1.5, 1.5), 0.9, pc.ElasticOut);

    this.scaleTween2 = this.entity.tween(this.entity.getLocalScale())
        .to(new pc.Vec3(0, 0, 0), 0.25, pc.SineIn)
         .delay(1.15);
    
    this.scaleTween.chain(this.scaleTween2).start();


    this.entity.element.opacity = 0;
    this.alphaAppearingTween = this.entity.tween(this.entity.element)
        .to({opacity: 1}, 0.15, pc.Linear);
    
    this.alphaDisappearingTween = this.entity.tween(this.entity.element)
        .to({opacity: 0}, 0.25, pc.Linear)
        .delay(2);
    
    this.alphaAppearingTween.chain(this.alphaDisappearingTween).start();
};


// smileCool.js
var SmileCool = pc.createScript('smileCool');


SmileCool.prototype.initialize = function() {
    this.entity.enabled = false;
    this.entity.element.opacity = 0;
    
    this.app.on('smile:cool', this.show, this);
};

// update code called every frame
SmileCool.prototype.update = function(dt) {
    
};


SmileCool.prototype.show = function() {
    
    this.app.fire("audio:play", "emojiCool");
    
    if(this.positionTween && this.positionTween.playing) {
        this.positionTween.stop();
    }
    
    if(this.scaleTween && this.scaleTween.playing) {
        this.scaleTween.stop();
    }
    
    if(this.rotatingTween && this.rotatingTween.playing) {
        this.rotatingTween.stop();
    }
    
    if(this.rotatingTween2 && this.rotatingTween2.playing) {
        this.rotatingTween2.stop();
    }

    if(this.alphaAppearingTween && this.alphaAppearingTween.playing) {
        this.alphaAppearingTween.stop();
    }
    
    if(this.alphaDisappearingTween && this.alphaDisappearingTween.playing) {
        this.alphaDisappearingTween.stop();
    }
    
    this.entity.enabled = true;
  
    //tween appearing 
    
    
    var screenSide = (this.app.root.findByName("ComboEffect").element.anchor.x > 0.5) ? 1 : -1;
    var yAnchor = pc.math.random(0.4, 0.6);
    if(screenSide > 0) {
        this.entity.element.anchor = new pc.Vec4(0.35, yAnchor, 0.35, yAnchor);
        this.initialX = -100;
    } else {
        this.entity.element.anchor = new pc.Vec4(0.65, yAnchor, 0.65, yAnchor);
          this.initialX = 100;
    }
    
    //tween appearing 
    this.entity.setLocalPosition(this.initialX, 0, 0);
    this.positionTween = this.entity.tween(this.entity.getLocalPosition())
        .to(new pc.Vec3(this.initialX, 30, 0), 2.0, pc.SineInOut)
        .on('complete', () => {
            this.entity.enabled = false;
        })
        .start();

    this.entity.setLocalEulerAngles(0, 0, 180);
    this.rotatingTween = this.entity.tween(this.entity.getLocalRotation())
        .to(new pc.Vec4(0, 0, 0, 1), 0.45, pc.BackOut);

    this.rotatingTween2 = this.entity.tween(this.entity.getLocalRotation())
        .to(new pc.Vec4(0, 0, 1, 0), 0.35, pc.SineOut)
        .delay(1.35);
    
    this.rotatingTween.chain(this.rotatingTween2).start();
    
    this.entity.element.opacity = 0;
    this.alphaAppearingTween = this.entity.tween(this.entity.element)
        .to({opacity: 1}, 0.3, pc.Linear);
    
    this.alphaDisappearingTween = this.entity.tween(this.entity.element)
        .to({opacity: 0}, 0.25, pc.Linear)
        .delay(1.5)
        .on('complete', () => {
            this.entity.enabled = false;
        });
    
    this.alphaAppearingTween.chain(this.alphaDisappearingTween).start();
};


var AnimateSprite=pc.createScript("animateSprite");AnimateSprite.attributes.add("startFrame",{type:"number",default:0,description:"Frame to start animation from"}),AnimateSprite.attributes.add("numFrames",{type:"number",default:1,description:"Number of frames to play before looping"}),AnimateSprite.attributes.add("frameRate",{type:"number",default:1,description:"Playback frames per second"}),AnimateSprite.prototype.initialize=function(){this.timer=1/this.frameRate,this.frame=this.startFrame},AnimateSprite.prototype.update=function(t){this.timer-=t,this.timer<0&&(this.frame++,this.frame>=this.numFrames+this.startFrame&&(this.frame=this.startFrame),this.entity.element.spriteFrame=this.frame,this.timer=1/this.frameRate)};var BallsCounter=pc.createScript("ballsCounter");BallsCounter.attributes.add("activeBall",{type:"entity"}),BallsCounter.attributes.add("camera",{type:"entity"}),BallsCounter.attributes.add("screen",{type:"entity"}),BallsCounter.prototype.initialize=function(){this.ballsCounterText=this.entity.findByName("BallsCounterText"),this.defeatCountdownText=this.entity.findByName("DefeatCountdownText"),this.lastBallsAmount=0},BallsCounter.prototype.update=function(t){if(!GameplayController.currentSession)return this.ballsCounterText.enabled=!1,void(this.defeatCountdownText.enabled=!1);var e=this.activeBall.script.ballController.preparedBall,a=GameplayController.currentSession.ballsLeft;if(a!=this.lastBallsAmount&&(this.lastBallsAmount=a,this.ballsCounterText.element.text=""+this.lastBallsAmount),GameplayController.currentSession.defeatTimerActive?(this.defeatCountdownText.enabled=!0,this.lastDefeatTimer!=Math.ceil(GameplayController.currentSession.defeatTimer)&&(this.lastDefeatTimer=Math.ceil(GameplayController.currentSession.defeatTimer),this.defeatCountdownText.element.text=""+this.lastDefeatTimer,this.app.fire("audio:play",this.lastDefeatTimer%2==0?"tic":"tac"),this.defeatCountdownText.element.opacity=1,this.defeatCountdownText.tween(this.defeatCountdownText.element).to({opacity:0},.95,pc.SineIn).start(),this.defeatCountdownText.setLocalScale(1,1,1),this.defeatCountdownText.tween(this.defeatCountdownText.getLocalScale()).to(new pc.Vec3(2.2,2.2,2.2),.95,pc.SineOut).start())):this.defeatCountdownText.enabled=!1,e&&!e.script.ball.isColorBall&&!e.script.ball.isCannonBall&&this.lastBallsAmount>0){this.ballsCounterText.enabled=!0;var l=new pc.Vec3,n=e.getPosition();this.camera.camera.worldToScreen(n,l);var i=this.screen.screen.scale,s=this.app.graphicsDevice;this.entity.setLocalPosition(l.x*ScaleManager.qualityFactor/i,(s.height-l.y*ScaleManager.qualityFactor)/i,0)}else this.ballsCounterText.enabled=!1};// defeatWindow.js
/* jshint esversion: 6 */
var DefeatWindow = pc.createScript('defeatWindow');

DefeatWindow.prototype.initialize = function() {
    
    this.entity.headingIcon = this.entity.findByName("HeadingIcon");
    this.entity.buttonRestart = this.entity.findByName("ButtonRestart");
    this.entity.background = this.entity.findByName("Background");
    this.entity.scoreGroup = this.entity.findByName("ScoreGroup");
    this.entity.maxScoreGroup = this.entity.findByName("MaxScoreGroup");
    this.entity.coinsGroup = this.entity.findByName("CoinsGroup");
    this.entity.scoreText = this.entity.scoreGroup.findByName("Text");
    this.entity.maxScoreText = this.entity.maxScoreGroup.findByName("Text");
    this.entity.coinsText = this.entity.coinsGroup.findByName("Text");
    this.entity.newBestScoreIcon = this.entity.maxScoreGroup.findByName("NewBestScoreIcon");
    this.entity.buttonMoreCoins = this.entity.coinsGroup.findByName("GetCoinsButton");
    this.entity.buttonMoreCoinsText = this.entity.buttonMoreCoins.findByName("Text");
    
    this.assignAction(this.entity.buttonRestart, this.restartPressed, this);
    this.assignAction(this.entity.buttonMoreCoins, this.acquireMoreCoinsPressed, this);
    
    const scriptContext = this;
    
    /* show method */
    this.entity.show = function() {
        this.enabled = true;
        
        scriptContext.app.fire("app:save");
        scriptContext.app.fire("audio:play", "lose");
        
        if(scriptContext.buttonRestartTween && scriptContext.buttonRestartTween.playing) {
            scriptContext.buttonRestartTween.stop();
        }
       
        
         this.buttonRestart.setLocalScale(0, 0, 0); 
        
         var showButtons = (delay) => {
            /* tween buttons */
             scriptContext.buttonRestartTween = this.buttonRestart
                .tween(this.buttonRestart.getLocalScale())
                .to(new pc.Vec3(1, 1, 1), 0.5, pc.BackOut)
                .delay(delay)
                .start();
        };
        
        if(window.famobi_analytics) {        
            window.famobi_analytics.trackScreen(window.famobi_analytics.SCREEN_GAMERESULT);
            
             setTimeout(() => {
                    Promise.all([
                        window.famobi_analytics.trackEvent(
                            "EVENT_LEVELFAIL",
                            {
                                levelName: '' + GameplayController.currentLevel,
                                reason: 'dead'
                            }
                        ),
                        window.famobi_analytics.trackEvent(
                            "EVENT_TOTALSCORE",
                            {
                                totalScore: GameplayController.sessionScores
                            }
                        )
                    ]).then(() => showButtons(1.4), () => showButtons(1.4));
                }, 500);
        } else {
            showButtons(1.85);
        }
        
        /* tween background */
        this.background.element.opacity = 0.0;
        this.background.tween(this.background.element)
            .to({opacity: 0.94}, 0.25, pc.Linear)
            .start();
         
        /* tween heading icon */
        this.headingIcon.element.opacity = 0.0;
        var headingAppearingTween = 
        this.headingIcon.tween(this.headingIcon.element)
            .to({opacity: 0.9}, 0.5, pc.Linear)
            .delay(0.25);

        this.headingIcon.setLocalPosition(0, -360, 0);
        var headingMovingTween = 
        this.headingIcon.tween(this.headingIcon.getLocalPosition())
            .to(new pc.Vec3(0, 0, 0), 0.9, pc.SineOut)
            .delay(0.2);
        
        headingAppearingTween.chain(headingMovingTween).start();
        
        this.headingIcon.setLocalScale(0.5, 0.5, 0.5);
        var headingAppearingScaleTween = 
        this.headingIcon.tween(this.headingIcon.getLocalScale())
            .to(new pc.Vec3(1.5, 1.5, 1.5), 0.55, pc.BackOut)
            .delay(0.25);
        
        var headingMovingScaleTween = 
        this.headingIcon.tween(this.headingIcon.getLocalScale())
            .to(new pc.Vec3(1.0, 1.0, 1.0), 0.9, pc.SineOut)
            .delay(0.1);
        
         headingAppearingScaleTween.chain(headingMovingScaleTween).start();
        

        /* tween text groups */
        this.scoreGroup.setLocalScale(0, 0, 0);
        this.scoreGroup.tween(this.scoreGroup.getLocalScale())
            .to(new pc.Vec3(1, 1, 1), 0.45, pc.BackOut)
            .delay(1.35)
            .start();
                
        this.maxScoreGroup.setLocalScale(0, 0, 0);
        this.maxScoreGroup.tween(this.maxScoreGroup.getLocalScale())
            .to(new pc.Vec3(1, 1, 1), 0.45, pc.BackOut)
            .delay(1.5)
            .start();
        
        this.coinsGroup.setLocalScale(0, 0, 0);
        this.coinsGroup.tween(this.coinsGroup.getLocalScale())
            .to(new pc.Vec3(1, 1, 1), 0.45, pc.BackOut)
            .delay(1.65)
            .start();
        
        
         if(Apicontroller.hasRewardedVideo()) {
            this.buttonMoreCoins.coinsValue = pc.math.clamp(GameplayController.lastLevelCoins || 10, 10, 99);
            this.buttonMoreCoins.enabled = true;
            this.buttonMoreCoinsText.element.text = '+' + this.buttonMoreCoins.coinsValue;
            this.buttonMoreCoins.setLocalScale(0, 0, 0);
            this.buttonMoreCoins.tween(this.buttonMoreCoins.getLocalScale())
                .to(new pc.Vec3(1, 1, 1), 0.4, pc.BackOut)
                .delay(2.5)
                .start();
        } else {
            this.buttonMoreCoins.enabled = false;
        }
        
        /* tween texts */
        
        const textTweenDelay = 1.75;
        if( GameplayController.sessionScores > 0) {
            this.delayedCall( textTweenDelay * 1000, () => scriptContext.app.fire("audio:unmute", "counting", 0.9));
            this.delayedCall((textTweenDelay + 1.0) * 1000, () => scriptContext.app.fire("audio:mute", "counting"));        
        }

        Utils.tweenText(this.scoreText, 0, GameplayController.sessionScores, 0.75, textTweenDelay, pc.SineOut, true);
        Utils.tweenText(this.maxScoreText, 0, GameplayController.maxScores, 0.75, textTweenDelay + 0.25, pc.SineOut, true);
        Utils.tweenText(this.coinsText, 0, GameplayController.coins, 0.5, textTweenDelay + 0.5, pc.SineOut, true);     
        
        
        this.newBestScoreIcon.element.opacity = 0;
        this.newBestScoreIcon.setLocalScale(2, 2, 2);
        if(GameplayController.maxScores === GameplayController.sessionScores) {

              this.newBestScoreIcon.tween(this.newBestScoreIcon.element)
                    .to({opacity: 1}, 0.3, pc.Linear)
                    .delay(textTweenDelay + 1)
                    .on('complete', () => {
                        scriptContext.app.fire('audio:play', 'newBest');
                    })
                    .on('update', () => {
                        this.newBestScoreIcon.setLocalPosition(this.maxScoreText.element.width + 60, 0, 0);
                    })
                    .start();

             this.newBestScoreIcon.tween(this.newBestScoreIcon.getLocalScale())
                    .to(new pc.Vec3(1, 1, 1), 0.42, pc.BackOut)
                    .delay(textTweenDelay + 1)
                    .start();
        }
        

        
    }.bind(this.entity);
    
    
    /* hide method */
    this.entity.hide = function() {
        this.enabled = false;
    }.bind(this.entity);
    
    this.entity.hide();
};

DefeatWindow.prototype.assignAction = function(button, handler, handlerContext) {
     if(this.app.touch) {
         button.element.on('touchstart', handler, handlerContext);
     } else if(this.app.mouse) {
          button.element.on('mousedown', handler, handlerContext);
     } else {
         console.warn("DefeatWindow.assignAction - either touch or mouse are not detected");
     }
};

DefeatWindow.prototype.update = function(dt) {
    
};

DefeatWindow.prototype.restartPressed = function() {
    if(window.famobi_analytics) {
            window.famobi_analytics.trackEvent("EVENT_LEVELRESTART", {
                    levelName: '' + GameplayController.currentLevel
                });
    }
    
    TransitionScreen.instance.transitionTo(() => {
        GameplayController.sessionScores = 0;
        this.app.fire("app:save");
        this.entity.hide();
        this.app.fire("gameplay:start");
    });
};

DefeatWindow.prototype.homePressed = function() {
    // TransitionScreen.instance.transitionTo(() => {
    //      WindowManager.exitGameplay();
    // });
};

DefeatWindow.prototype.acquireMoreCoinsPressed = function() {
     var previousCoinsValue = GameplayController.coins;
     var rewardAmount = this.entity.buttonMoreCoins.coinsValue || 10;
     Apicontroller.showRewardedVideo((result) => {
         if(result && result.rewardGranted) {
             GameplayController.addCoins(rewardAmount);
             Utils.tweenText(this.entity.coinsText, previousCoinsValue, GameplayController.coins, 0.5, 0.1, pc.SineOut, true);
             this.app.fire("app:save");
             this.app.fire("audio:play", "purchaseDone");
             this.entity.delayedCall(0, () => this.app.fire("audio:unmute", "counting", 0.9));
             this.entity.delayedCall(0.5 * 1000, () => this.app.fire("audio:mute", "counting"));           
             console.log(rewardAmount + ' coins added');
         }

     });
     this.entity.buttonMoreCoins.enabled = false;
};



// specialOffer.js
/* jshint esversion: 6 */
var SpecialOffer = pc.createScript('specialOffer');

SpecialOffer.prototype.initialize = function() {    
    this.entity.buttonGather = this.entity.findByName("ButtonCoinsBox");
    this.entity.timeCounterPad = this.entity.findByName("TimeCounterPad");
    this.entity.timeLeftText = this.entity.findByName("TimeCounterText");
    this.entity.rewardPad = this.entity.findByName("RewardPad");
    this.entity.rewardText = this.entity.findByName("RewardText");
    this.entity.rewardEffect = this.entity.findByName("RewardEffect");
    this.entity.rewardEffectIcon = this.entity.findByName("RewardEffectIcon");
    this.entity.rewardEffectText = this.entity.findByName("RewardEffectText");
    this.entity.moreTimeNeeded = this.entity.findByName("MoreTimeNeeded");
    this.entity.moreTimeNeededText = this.entity.moreTimeNeeded.findByName("Text");
    
    this.assignAction(this.entity.buttonGather, this.specialOfferPressed, this);

    this.entity.rewardEffect.enabled = false;
    this.entity.moreTimeNeeded.enabled = false;
};

SpecialOffer.prototype.update = function(dt) {
    var currentTimestamp = new Date().getTime();
    
    if(currentTimestamp - GameplayController.limitedOfferLastTimestamp > GameplayController.limitedOfferCooldown * 1000) {
        this.limitedOfferAvailable = true;
        this.entity.timeCounterPad.enabled = false;
        this.entity.rewardPad.enabled = true;
        this.entity.rewardText.element.text = '+' + GameplayController.limitedOfferRewardAmount;  
    } else {
        this.limitedOfferAvailable = false;
        this.entity.timeCounterPad.enabled = true;
        this.entity.rewardPad.enabled = false;
        this.entity.timeLeftText.element.text = Utils.humanizeTime(  (GameplayController.limitedOfferLastTimestamp / 1000 + GameplayController.limitedOfferCooldown) - currentTimestamp  / 1000);   
    }
};

SpecialOffer.prototype.assignAction = function(button, handler, handlerContext) {
     if(this.app.touch) {
         button.element.on('touchstart', handler, handlerContext);
     } else if(this.app.mouse) {
          button.element.on('mousedown', handler, handlerContext);
     } else {
         console.warn("SpecialOffer.assignAction - either touch or mouse are not detected");
     }
};

SpecialOffer.prototype.specialOfferPressed = function() {
    if(this.limitedOfferAvailable) {
        if(Apicontroller.hasRewardedVideo()) {
            Apicontroller.showRewardedVideo((result) => result && result.rewardGranted && this.activateSpecialOffer());
        } else {
            this.activateSpecialOffer();
        }
    } else {
        this.app.fire("audio:play", "purchaseFailed");
        
        if(this.moreTimeNeededTween && this.moreTimeNeededTween.playing) {
            this.moreTimeNeededTween.stop();
        }
        
        if(this.moreTimeNeededAlphaTween && this.moreTimeNeededAlphaTween.playing) {
            this.moreTimeNeededAlphaTween.stop();
        }
        
        this.entity.moreTimeNeededText.element.text = '' +  this.entity.timeLeftText.element.text;
        this.entity.moreTimeNeeded.enabled = true;
        this.entity.moreTimeNeeded.setLocalPosition(0, 100, 0);
        this.moreTimeNeededTween = this.entity.moreTimeNeeded.tween(this.entity.moreTimeNeeded.getLocalPosition())
            .to(new pc.Vec3(0, 170, 0), 0.75, pc.QuadraticOut)
            .on('complete', () => {
                this.entity.moreTimeNeeded.enabled = false;
            })
            .start();       
        
        this.entity.moreTimeNeededText.element.opacity = 1;
        this.moreTimeNeededAlphaTween = this.entity.moreTimeNeededText.tween(this.entity.moreTimeNeededText.element)
            .to({opacity: 0}, 0.25, pc.SineOut)
            .delay(0.5)
            .start();        
        
    }
};

SpecialOffer.prototype.activateSpecialOffer = function() {
        this.limitedOfferAvailable = false;
        GameplayController.limitedOfferLastTimestamp = new Date().getTime();
        GameplayController.setCoins(GameplayController.coins + GameplayController.limitedOfferRewardAmount);
        
        this.app.fire("audio:play", "limitedOfferReward");
        this.app.fire("app:save");
        
        this.entity.rewardEffectText.element.text = '+' + GameplayController.limitedOfferRewardAmount;
        this.entity.rewardEffect.enabled = true;
        this.entity.rewardEffect.setLocalPosition(0, 100, 0);
        this.entity.rewardEffect.tween(this.entity.rewardEffect.getLocalPosition())
            .to(new pc.Vec3(0, 210, 0), 1.2, pc.QuadraticOut)
            .on('complete', () => {
                this.entity.rewardEffect.enabled = false;
            })
            .start();
        
        this.entity.rewardEffectIcon.element.opacity = 1;
        this.entity.rewardEffectIcon.tween(this.entity.rewardEffectIcon.element)
            .to({opacity: 0}, 0.25, pc.SineOut)
            .delay(0.9)
            .start();
        
        this.entity.rewardEffectText.element.opacity = 1;
        this.entity.rewardEffectText.tween(this.entity.rewardEffectText.element)
            .to({opacity: 0}, 0.25, pc.SineOut)
            .delay(0.9)
            .start();        
        
};

// localStorageController.js
/* jshint esversion: 6 */
var LocalStorageController = pc.createScript('localStorageController');

LocalStorageController.slotKey = "TowerCrash3D_v1.1.0";

LocalStorageController.prototype.initialize = function() {
    LocalStorageController.app = this.app;
    LocalStorageController.currentLocalStorage = (window.famobi && window.famobi.localStorage) ? window.famobi.localStorage : window.localStorage;
    
    this.app.on("app:save", () => LocalStorageController.saveData(), this);
};

LocalStorageController.prototype.update = function(dt) {
    
};

LocalStorageController.getSaveData = function() {    
    const saveData = {
        currentLevel: GameplayController.currentLevel,
        coins: GameplayController.coins,
        sessionScores: GameplayController.sessionScores,
        maxScores: GameplayController.maxScores,
        limitedOfferLastTimestamp: GameplayController.limitedOfferLastTimestamp, 
        powerupMultiballPurchased: GameplayController.powerupMultiballPurchased,
        powerupEarthquakePurchased: GameplayController.powerupEarthquakePurchased,
        qualityIndex: ScaleManager.qualityIndex,
        audioEnabled: SoundController.soundStateLoaded ? SoundController.audioEnabled : true, 
        tutorialCompleted: TutorialScreen.tutorialCompleted,
        levels: LevelManager.getLevels(),
    };     
    return saveData;
};

LocalStorageController.saveData = function(immediately) {
    if(immediately) {
        var data = LocalStorageController.getSaveData();
        LocalStorageController.currentLocalStorage.setItem(LocalStorageController.slotKey, JSON.stringify(data));    
    } else {
        setTimeout(() => {
            var data = LocalStorageController.getSaveData();
            LocalStorageController.currentLocalStorage.setItem(LocalStorageController.slotKey, JSON.stringify(data));
        }, 50);
    }
};

LocalStorageController.loadData = function() {
    var data = LocalStorageController.currentLocalStorage.getItem(LocalStorageController.slotKey);
    var dataLoaded = false;
       
    if(data) {
        try {
            data = JSON.parse(data);
            dataLoaded = true;
        } catch (e) {
            data = LocalStorageController.getSaveData();
            LocalStorageController.saveData(true);
        }
    } else {
        data = LocalStorageController.getSaveData();
        LocalStorageController.saveData(true);
    }
    
    GameplayController.currentLevel = data.currentLevel;
    GameplayController.coins = data.coins;
    GameplayController.sessionScores = data.sessionScores || 0;
    GameplayController.maxScores = data.maxScores;
    GameplayController.limitedOfferLastTimestamp = data.limitedOfferLastTimestamp;
    GameplayController.powerupMultiballPurchased = data.powerupMultiballPurchased;
    GameplayController.powerupEarthquakePurchased = data.powerupEarthquakePurchased;
    if(data.qualityIndex !== undefined) {
        if(dataLoaded) {
            ScaleManager.savedQuality = data.qualityIndex;
        }
        ScaleManager.qualityIndex = data.qualityIndex;
        LocalStorageController.app.fire("quality:update");
    }
    SoundController.soundStateLoaded = true;
    LocalStorageController.app.fire(((data.audioEnabled === undefined) ? true : data.audioEnabled) ? 'audio:enable' : 'audio:disable');
    TutorialScreen.tutorialCompleted = data.tutorialCompleted;
    LevelManager.loadLevelsFromStorage(data.levels);
};


var FinishSurface=pc.createScript("finishSurface");FinishSurface.prototype.initialize=function(){this.app.on("level:createBall",this.updatePosition,this),this.finishSurface=this.entity.findByName("FinishSurfaceSprite"),this.finishSurface.sprite.opacity=0,this.finishSurface.tween(this.finishSurface.sprite).to({opacity:.9},.85,pc.SineIn).yoyo(!0).repeat(1e7).start()},FinishSurface.prototype.update=function(i){this.finishSurface.enabled=GameplayController.levelActive&&GameplayController.currentSession&&GameplayController.currentSession.gameplayActive},FinishSurface.prototype.updateposition=function(){var i=this.app.root.findByName("Tower");this.finishSurface.setLocalPosition(0,i.victoryHeightLimit,0)};var ExclamationMark=pc.createScript("exclamationMark");ExclamationMark.prototype.initialize=function(){this.exclamationMark=this.entity.findByName("ExclamationMark"),this.exclamationMark.tween(this.exclamationMark.getLocalScale()).to(new pc.Vec3(.9,.9,.9),.25,pc.SineInOut).yoyo(!0).repeat(1e5).start()},ExclamationMark.prototype.update=function(a){this.exclamationMark.enabled=this.entity.findByName("CheckMark")&&this.entity.findByName("CheckMark").enabled};// earnedCoinEffect.js
var EarnedCoinEffect = pc.createScript('earnedCoinEffect');

EarnedCoinEffect.prototype.initialize = function() {
    this.coinEffect = this.entity.findByName('EarnedCoinEffect');
    this.icon = this.coinEffect.findByName('EffectIcon');
    this.textValue = this.coinEffect.findByName('EffectText');
    
    this.app.on('coins:added', this.show, this);
    
    this.coinEffect.enabled = false;
};


EarnedCoinEffect.prototype.show = function(amount, anchor) {
    if(this.coinEffectTween && this.coinEffectTween.playing){
        this.coinEffectTween.stop();
    }
     
    if(this.iconAlphaTween && this.iconAlphaTween.playing){
        this.iconAlphaTween.stop();
    }
    
    if(this.textAlphaTween && this.textAlphaTween.playing){
        this.textAlphaTween.stop();
    }

    this.coinEffect.element.anchor = anchor;
    
    this.app.fire('audio:play', 'coin');
    
    this.textValue.element.text = '+' + amount;
    this.coinEffect.enabled = true;
    this.coinEffect.setLocalPosition(0, 40, 0);
    this.coinEffectTween = this.coinEffect.tween(this.coinEffect.getLocalPosition())
           .to(new pc.Vec3(0, 120, 0), 1.1, pc.QuadraticOut)
            .on('complete', () => {
                this.coinEffect.enabled = false;
            })
            .start();
        
    this.icon.element.opacity = 1;
    this.iconAlphaTween =  this.icon.tween(this.icon.element)
        .to({opacity: 0}, 0.25, pc.SineOut)
        .delay(0.8)
        .start();

    this.textValue.element.opacity = 1;
    this.textAlphaTween = this.textValue.tween(this.textValue.element)
        .to({opacity: 0}, 0.25, pc.SineOut)
        .delay(0.8)
        .start();        
};

EarnedCoinEffect.prototype.update = function(dt) {
    
};



// levelManager.js
/* jshint esversion: 6 */
var LevelManager = pc.createScript('levelManager');

LevelManager.sortedPrefabs = [];
LevelManager.levels = [];

LevelManager.attributes.add('towersList', {
    title: "Towers",
    type: 'entity',
    array: true
});

LevelManager.prototype.initialize = function() {
    LevelManager.app = this.app;
    LevelManager.instance = this;
};

LevelManager.prototype.update = function(dt) {
    
};

LevelManager.prepareLevels = function() {
    console.log("Preparing levels...");
    LevelManager.levels = [];
    
    for(let i = 0; i < LevelManager.instance.towersList.length; i++) {
        const prefab = LevelManager.instance.towersList[i];
        if(prefab) {
            const prefabConfig = prefab.script.towerConfig;
            LevelManager.sortedPrefabs.push(prefab);
            LevelManager.levels.push({
                prefabName: prefab.name,                
                numColors: prefabConfig.numColors,
                difficulty: prefabConfig.difficulty,
                towerHeight: prefabConfig.towerHeight,
                numBalls: prefabConfig.numBalls, 
            });
        }
    }
    
    for(let i = 0; i < 3; i++) {
        const shuffledPrefabs = Utils.shuffle(LevelManager.sortedPrefabs.slice());
        for(let t = 0; t < shuffledPrefabs.length; t++) {
            const prefab = shuffledPrefabs[t];
            const prefabConfig = prefab.script.towerConfig;       
            const numColors = pc.math.clamp(prefabConfig.numColors + Math.floor(pc.math.random(i, i + 2)), 5, MaterialsStorage.objectMaterials.length || 8);
            const numLayers = prefabConfig.towerHeight + Math.floor(pc.math.random(2, 6)) * (i + 1);
            const ballsDifficultyMultiplier = 1 + (numColors - 5) * 0.16; // * (0.17 - (numColors - 5) * 0.01);
            const heightDifficultyMultiplier = numLayers / prefabConfig.towerHeight;
            const numBalls = Math.round(prefabConfig.numBalls * ballsDifficultyMultiplier * heightDifficultyMultiplier);
            LevelManager.levels.push({
                prefabName: prefab.name,                
                numColors: numColors,
                difficulty: prefabConfig.difficulty,
                towerHeight: numLayers,
                numBalls: numBalls 
            });
        }
    }    
};

LevelManager.getLevels = function() {
   return LevelManager.levels;  
};

LevelManager.getLevelConfig = function(levelNumber) {
    console.log("Loading level #" + levelNumber);
    var normalizedLevelNumber = levelNumber - 1;
    if(normalizedLevelNumber >= LevelManager.levels.length) {
        console.warn("Level #" + levelNumber + " is not available");
        return LevelManager.levels[normalizedLevelNumber % LevelManager.levels.length];
    } else {
        var level = LevelManager.levels[normalizedLevelNumber];
        return level;
    }
};

LevelManager.loadLevelsFromStorage = function(levels) {
    if(levels && levels.length > 0) {
        LevelManager.levels = levels.slice();
        console.log(LevelManager.levels.length + " levels loaded");
    } else {
        console.log("Levels could not be loaded, creating new ones...");
        LevelManager.prepareLevels();
    }
};

// triggersController.js
/* jshint esversion: 6 */
var TriggersController = pc.createScript('triggersController');

TriggersController.prototype.initialize = function() {
    this.app.on("level:restart", this.restart, this);
};

TriggersController.prototype.restart = function() {
    for(let i = this.entity.children.length - 1; i > -1; i--) {
        this.entity.children[i].destroy();
    }
};

TriggersController.prototype.update = function(dt) {
    
};

TriggersController.prototype.enableTriggers = function() {
    this.entity.children.forEach(child => child.enabled = true);
};

TriggersController.prototype.disableTriggers = function() {
    this.entity.children.forEach(child => child.enabled = false);
};

TriggersController.prototype.createTriggerInsteadOfBody = function(entity, possibleNeightbors) {
   
     if(entity.rigidbody && entity.collision && !entity.removedFromTower) {

        var collisionData = entity.collision.data;                               
        const triggerEntity = entity.clone();     
         
        triggerEntity.materialIndex = entity.materialIndex;
        triggerEntity.name = "trigger entity";
        triggerEntity.collisionScale = entity.collisionScale; 
        triggerEntity.possibleNeightbors = possibleNeightbors;
                 
        triggerEntity.removeComponent('rigidbody');
        triggerEntity.removeComponent('collision');
        triggerEntity.removeComponent('model');
         
        const scale = entity.getLocalScale();
        const scaleFactor = triggerEntity.collisionScale;
        triggerEntity.setLocalScale(scale.x * scaleFactor, scale.y * scaleFactor, scale.z * scaleFactor);
                  
        if(collisionData.type === 'mesh') {
            triggerEntity.physicalScale = scaleFactor;
            collisionData = {type: collisionData.type, asset: collisionData.asset};
        } else if (collisionData.type === 'box') {
            collisionData = {type:  collisionData.type, halfExtents: new pc.Vec3(collisionData.halfExtents.x * scaleFactor, collisionData.halfExtents.y * scaleFactor, collisionData.halfExtents.z * scaleFactor)};
        } else if (collisionData.type === 'cylinder') {
            collisionData = {type: collisionData.type, axis: collisionData.axis, radius:  collisionData.radius * scaleFactor, height: collisionData.height * scaleFactor};
        }
        
        triggerEntity.addComponent("collision", collisionData);
         
        if(!triggerEntity.script) {
            triggerEntity.addComponent('script');
        }
        triggerEntity.script.create('triggerItem');
         
        this.entity.addChild(triggerEntity);
        
        entity.script.item.killItem(0);
         
         
        GameplayController.currentSession.screenShakingTimer = 0.15;
         
        Utils.vibrate(25);
    }
};

// triggerItem.js
/* jshint esversion: 6 */
var TriggerItem = pc.createScript('triggerItem');


TriggerItem.prototype.initialize = function() {
    this.entity.triggerStartTimestamp = new Date().getTime();
    this.entity.collision.on('triggerenter', this.onTriggerEnter, this);
    this.entity.on('destroy', this.destroy, this);
    this.lifeTime = GameplayController.triggerLifeTime;
};


TriggerItem.prototype.update = function(dt) {
    this.lifeTime -= dt;
    if(this.lifeTime <= 0) {
        this.entity.destroy();
    }
};


TriggerItem.prototype.destroy = function() {
    this.entity.possibleNeightbors = null;
};

TriggerItem.prototype.onTriggerEnter = function(entity) {
   if(entity.rigidbody && entity.collision && entity.isTowerChild && !entity.removedFromTower && !entity.waitingTriggeredDestroy && this.entity.possibleNeightbors.indexOf(entity) != -1) {
        if(entity.materialIndex === this.entity.materialIndex) {
            const timestamp = new Date().getTime();
            const elapsedTime = (timestamp - this.entity.triggerStartTimestamp);
            const delay =  (elapsedTime < GameplayController.chainExplosionDelay) ? GameplayController.chainExplosionDelay - elapsedTime : 0;
            entity.script.item.chainedExplode(delay);
        }
    }
};


// tutorialScreen.js
/* jshint esversion: 6 */
var TutorialScreen = pc.createScript('tutorialScreen');

TutorialScreen.tutorialCompleted = false;
TutorialScreen.currentStage = 0;
TutorialScreen.firstBallLaunched = false;
TutorialScreen.targetEntity = null;

TutorialScreen.prototype.initialize = function() {
    this.stepOneHand = this.entity.findByName('TapTutorial').findByName('TutorialHand');
    this.tutorialStepTwoContainer = this.app.root.findByName('TutorialStepTwo');
    this.stepTwoHand = this.app.root.findByName('TutorialStepTwo').findByName("TutorialHand");
    
     this.stepOneHand.tween(this.stepOneHand.getLocalScale())
        .to(new pc.Vec3(0.9, 0.9, 0.9), 0.25, pc.SineInOut)
        .yoyo(true)
        .repeat(100000)
        .start();
    
    // this.app.on("tutorial:show", this.showTutorial, this);
    this.app.on('level:createBall', this.dispatchBallCreated, this);
    this.app.on("ball:launch", this.dispatchBallLaunch, this);
    this.app.on("orbitCamera:rotate", this.dispatchCameraRotate, this);
    
    this.stepOneHand.enabled = false;
    this.stepTwoHand.enabled = false;
};

TutorialScreen.prototype.update = function(dt) {
    if(this.stepOneHand && this.stepOneHand.enabled) {
        if(TutorialScreen.targetEntity) {
            this.setScreenPosition(this.stepOneHand, TutorialScreen.targetEntity.getPosition());
        }
    }
};

TutorialScreen.prototype.showFirstStageTutorial = function() {
    this.stepOneHand.enabled = true;
    
    this.stepOneHand.element.opacity = 0;
    this.stepOneHand.tween(this.stepOneHand.element)
        .to({opacity: 1}, 0.25, pc.Linear)
        .delay(0.1)
        .start();
    
    const tower = this.app.root.findByName('Tower');
    const camera = this.app.root.findByName("Camera");
    const cameraPosition = camera.getPosition().clone();
    cameraPosition.set(cameraPosition.x, cameraPosition.y - Math.random(0, 6), cameraPosition.z);
    
    var minCameraDistance = Number.MAX_VALUE;
    var closestChild = null;
        
    for (let i = tower.children.length - 1; i > -1; i--) {
        const child = tower.children[i];
        const cameraDistance = Utils.distanceBetweenEntities(child.getPosition(), cameraPosition);
        if(cameraDistance < minCameraDistance) {
            minCameraDistance = cameraDistance;
            closestChild = child;
        }
    }
    
    if(closestChild) {
        TutorialScreen.targetEntity = closestChild;
        this.setScreenPosition(this.stepOneHand, closestChild.getPosition());
        if(BallController.ball && BallController.ball.name === "Ball") {
            BallController.ball.setColor(closestChild.materialIndex);
        }
    }
};

TutorialScreen.prototype.dispatchBallCreated = function() {
    if(!TutorialScreen.tutorialCompleted && TutorialScreen.currentStage === 0) {
         setTimeout(() => {
             this.showFirstStageTutorial();
         }, 20);
    }
};

TutorialScreen.prototype.dispatchBallLaunch = function() {
    if(!TutorialScreen.tutorialCompleted &&  TutorialScreen.currentStage === 0) {
            this.stepOneHand.tween(this.stepOneHand.element)
                .to({opacity: 0}, 0.25, pc.Linear)
                .on('complete', () => {
                    this.stepOneHand.enabled = false; 
                    TutorialScreen.targetEntity = null;
                    this.startSecondStage();
                })
                .start();
        }
};


TutorialScreen.prototype.dispatchCameraRotate = function() {
    if(!TutorialScreen.tutorialCompleted &&  TutorialScreen.currentStage === 1) {
        TutorialScreen.tutorialCompleted = true;
            if(window.famobi_analytics) {
                window.famobi_analytics.trackEvent("EVENT_TUTORIALCOMPLETED");
            }
            this.stepTwoHand.tween(this.stepTwoHand.element)
                .to({opacity: 0}, 0.25, pc.Linear)
                .on('complete', () => {
                    this.stepOneHand.enabld = false;
                    this.stepTwoHand.enabled = false; 
                    this.app.fire("app:save");
                })
                .start();
        }
};


TutorialScreen.prototype.startSecondStage = function() {
    TutorialScreen.currentStage = 1;
    this.stepTwoHand.enabled = true;

    this.stepTwoHand.element.opacity = 0;
    this.stepTwoHand.tween(this.stepTwoHand.element)
        .to({opacity: 1}, 0.25, pc.Linear)
        .delay(0.25)
        .start();

    this.stepTwoHand.tween(this.stepTwoHand.getLocalPosition())
        .to(new pc.Vec3(130, 0, 0), 0.95, pc.QuadraticInOut)
        .delay(0.2)
        .yoyo(true)
        .repeat(100000)
        .start();
};


TutorialScreen.prototype.setScreenPosition = function(entity, targetPosition) {
       var screenPos = new pc.Vec3();
       this.app.root.findByName("Camera").camera.worldToScreen(targetPosition, screenPos);
       var scale = this.app.root.findByName('UI Container').screen.scale;
       var device = this.app.graphicsDevice;
       entity.setLocalPosition((screenPos.x * ScaleManager.qualityFactor) / scale, (device.height - (screenPos.y * ScaleManager.qualityFactor)) / scale, 0);   
};


/* STATIC */
TutorialScreen.cameraRotatingEnabled = function() {
    return TutorialScreen.tutorialCompleted || TutorialScreen.currentStage >= 1; 
};

TutorialScreen.shootingEnabled = function(entity) {
    return TutorialScreen.tutorialCompleted || (TutorialScreen.currentStage === 0 && TutorialScreen.targetEntity === entity); 
};

// APIController.js
/* jshint esversion : 6 */
var Apicontroller = pc.createScript('apicontroller');

Apicontroller.prototype.initialize = function() {
    console.log('API controller initialized');
    game = this.app;
    
    Apicontroller.initTracking();
};

Apicontroller.prototype.update = function(dt) {
    
};

Apicontroller.isRewardedVideoFeatureEnabled = function() {
    return true;
};

Apicontroller.hasRewardedVideo = function() {
    if (Apicontroller.isRewardedVideoFeatureEnabled() && window.famobi && window.famobi.hasRewardedAd)
        return window.famobi.hasRewardedAd();
    else
        return false;
};

Apicontroller.showRewardedVideo = function(callback) {
    if (window.famobi && Apicontroller.hasRewardedVideo()) {
        window.famobi.rewardedAd(callback);
    } else {
        callback({rewardGranted: true});
    }
};

Apicontroller.initTracking = function() {
    if(!window.famobi_tracking) {
        console.warn("Tracking API is not defined");
        return;
    }
    window.famobi_tracking.init('tower-crash', null, 100, true, true);
    console.log('Tracking API initialized');
};

Apicontroller.trackLevelStart = function(eventParams) {
     if(!window.famobi_tracking) {
        console.warn("TrackLevelStart: Tracking API is not defined");
        return;
    }
    window.famobi_tracking.trackEvent(window.famobi_tracking.EVENTS.LEVEL_START, eventParams);
};

Apicontroller.trackLevelUpdate = function(eventParams) {
    // if(!window.famobi_tracking) {
    //     console.warn("TrackLevelUpdate: Tracking API is not defined");
    //     return;
    // }
    // window.famobi_tracking.trackEvent(window.famobi_tracking.EVENTS.LEVEL_UPDATE, eventParams);
};

Apicontroller.trackLevelEnd = function(eventParams) {
     if(!window.famobi_tracking) {
        console.warn("TrackLevelEnd: Tracking API is not defined");
        return;
    }
     window.famobi_tracking.trackEvent(window.famobi_tracking.EVENTS.LEVEL_END, eventParams);
};

/* Tracking stats */

Apicontroller.trackStats = function(key, value) {
    const currentLocalStorage = (window.famobi && window.famobi.localStorage) ? window.famobi.localStorage : window.localStorage;
    const trackableStats = JSON.parse(currentLocalStorage.getItem("towerCrashTrackableStats") || "{}");
    trackableStats[key] = value;
    currentLocalStorage.setItem("towerCrashTrackableStats", JSON.stringify(trackableStats));
    // console.log(`track stats [${key}] = ${trackableStats[key]}`);
    
    if(window.famobi_analytics && window.famobi_analytics.trackStats) {
        window.famobi_analytics.trackStats(key, value);
    }
};


Apicontroller.trackStatsChange = function(key, delta) {
    const currentLocalStorage = (window.famobi && window.famobi.localStorage) ? window.famobi.localStorage : window.localStorage;
    const trackableStats = JSON.parse(currentLocalStorage.getItem("towerCrashTrackableStats") || "{}");
    trackableStats[key] = (trackableStats[key] || 0) + delta;
    currentLocalStorage.setItem("towerCrashTrackableStats", JSON.stringify(trackableStats));
    // console.log(`track stats increment ${delta} [${key}] = ${trackableStats[key]}`);
    
    if(window.famobi_analytics && window.famobi_analytics.trackStats) {        
        window.famobi_analytics.trackStats(key, trackableStats[key]);
    }
};


/* Pause/resume handling */

pc.Application.prototype.pauseGame = function() {
    this.applicationPaused = true;
    this.soundVolumeBeforePaused = this.systems.sound.volume;
    this.systems.sound.volume = 0;
    this.timeScale = 0;
    var inputBlocker = this.root.findByName("InputBlocker");
    if(inputBlocker) {
        inputBlocker.element.useInput = true;
    }
    console.log("Application:paused");
};

pc.Application.prototype.unpauseGame = function(forced) {    
    if (isPageVisible && (!adIsShowing || force)) {
        this.applicationPaused = false;
        this.systems.sound.volume = this.soundVolumeBeforePaused;
        this.timeScale = 1;        
        var inputBlocker = this.root.findByName("InputBlocker");
        if(inputBlocker) {
            inputBlocker.element.useInput = false;
        }
        console.log("Application:resumed");
    } else {
        console.log('resuming game is not allowed now because ads are displaying or page isn\'t visible...');
    }
};


/* Global scope variables */

var game;
var isPageVisible = true;
var adIsShowing = false;
var skipTitleScreen = function() {
    return typeof famobi !== "undefined" && famobi.hasFeature("skip_title");
};

var useAutoQuality = function() {
    return typeof famobi !== "undefined" && famobi.hasFeature("auto_quality");
};

console.log('Global variables initialized');

//famobi pause/resume requests
window.famobi_onPauseRequested = function () {
    console.warn('famobi_onPauseRequested');
    adIsShowing = true;
    if (game) {
        game.pauseGame();
    }
};

window.famobi_onResumeRequested = function () {
    console.warn('famobi_onResumeRequested');
    adIsShowing = false;
    if (game) {
        game.unpauseGame();
    }
};

//Monkey App handlers
if(window.famobi) {
    window.famobi.onRequest("pauseGameplay", function() {
        if (game) {
            game.pauseGame();
        }
    });
    window.famobi.onRequest("resumeGameplay", function() {
        if (game) {
            game.unpauseGame();
        }
    });
    
    window.famobi.onRequest("enableAudio", function() {
        if(game) {
            game.fire("audio:enable");
        }
    });
    
    window.famobi.onRequest("disableAudio", function() {
        if(game) {
            game.fire("audio:disable");
        }
    });
}



//visiblity
var hidden, visibilityChange;
if (typeof document.hidden !== "undefined") { // Opera 12.10 and Firefox 18 and later support
    hidden = "hidden";
    visibilityChange = "visibilitychange";
} else if (typeof document["msHidden"] !== "undefined") {
    hidden = "msHidden";
    visibilityChange = "msvisibilitychange";
} else if (typeof document["webkitHidden"] !== "undefined") {
    hidden = "webkitHidden";
    visibilityChange = "webkitvisibilitychange";
}

function handleVisibilityChange() {
    if (document[hidden]) {
        isPageVisible = false;
        // if (game && !adIsShowing) game.pauseGame();
    } else {
        isPageVisible = true;
        if (game && !adIsShowing && game.applicationPaused) game.unpauseGame();
    }
}

// Warn if the browser doesn't support addEventListener or the Page Visibility API
if (typeof document.addEventListener === "undefined" || typeof document[hidden] === "undefined") {
    console.log("Browser doesn't support the Page Visibility API.");
} else {
    // Handle page visibility change
    document.addEventListener(visibilityChange, handleVisibilityChange, false);
}

console.log("Window VisibilityAPI connected");

var BrandingImage=pc.createScript("brandingImage");BrandingImage.prototype.initialize=function(){if(this.entity.element.opacity=0,window.famobi){var e=this;this.app.loader.getHandler("texture").crossOrigin="anonymous";var n=new pc.Asset("brandingImage","texture",{url:window.famobi.getMoreGamesButtonImage()});this.app.assets.add(n),n.on("error",function(e){console.log("Branding image loading failed: ",e)}),n.on("load",function(n){e.entity.element.texture=n.resource;e.entity.element.opacity=1,e.assignAction(e.entity,e.brandingPressed,e)}),this.app.assets.load(n)}},BrandingImage.prototype.assignAction=function(e,n,t){this.app.touch?e.element.on("touchstart",n,t):this.app.mouse?e.element.on("mousedown",n,t):console.warn("BrandingImage.assignAction - either touch or mouse are not detected")},BrandingImage.prototype.update=function(e){},BrandingImage.prototype.brandingPressed=function(){window.famobi&&window.famobi.moreGamesLink()};