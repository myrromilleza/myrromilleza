!function(t,i){"object"==typeof exports&&"undefined"!=typeof module?module.exports=i():"function"==typeof define&&define.amd?define([],i):t.MomentumSlider=i()}(this,function(){"use strict";function t(t){this.o=s({},this.defaults,t),this.initHtml(),this.initValues(),this.initEvents(),this.updateClassnames()}window.addEventListener("touchmove",function(){}),t.prototype={defaults:{el:".ms-container",cssClass:"",vertical:!1,multiplier:1,bounceCoefficient:.3,bounceMax:100,loop:0,interactive:!0,reverse:!1,currentIndex:0},initHtml:function(){if(this.msContainer=c.str(this.o.el)?document.querySelector(this.o.el):this.o.el,this.o.range){for(var t='<div class="ms-container '+this.o.cssClass+'"><ul class="ms-track">',i=this.o.range[0];i<=this.o.range[1];i++)t+=c.fnc(this.o.rangeContent)?o(this.o.rangeContent(i)):o(i);t+="</ul></div>";var e=document.createElement("div");e.innerHTML=t,this.msContainer.appendChild(e.firstChild),this.msContainer=this.msContainer.lastChild}if(this.msContainer.classList.add("ms-container--"+(this.o.vertical?"vertical":"horizontal")),this.o.reverse&&this.msContainer.classList.add("ms-container--reverse"),this.msTrack=this.msContainer.children[0],this.msSlides=this.msTrack.children,this.step=this.o.vertical?this.msSlides[0].scrollHeight:this.msSlides[0].scrollWidth,this.sliderLength=this.msSlides.length,this.o.loop){var s,n,r;for(r=document.createDocumentFragment(),s=this.o.loop,n=this.sliderLength-s;s--;)r.appendChild(this.msSlides[n++].cloneNode(!0));for(this.msTrack.insertBefore(r,this.msTrack.firstChild),r=document.createDocumentFragment(),n=s=this.o.loop;s--;)r.appendChild(this.msSlides[n++].cloneNode(!0));this.msTrack.appendChild(r),this.sliderLength+=2*this.o.loop}this.sliderWidth=this.sliderLength*this.step},initValues:function(){this.boundMin=this.o.reverse?0:-this.step*(this.sliderLength-1),this.boundMax=this.o.reverse?this.step*(this.sliderLength-1):0,this.targetPosition=this.targetPosition||0,this.ticking=!1,this.enabled=!0,this.pointerActive=!1,this.pointerMoved=!1,this.trackingPoints=[],this.msTrack.style[this.o.vertical?"height":"width"]=this.sliderWidth+"px",this.currentIndex=(this.currentIndex||this.o.currentIndex)+this.o.loop,this.updateSlider(void 0,!0),this.renderTarget();for(var t=this.sliderLength;t--;)this.setStyle(t,this.currentIndex==t?0:-1)},initEvents:function(){this.o.interactive&&(this.msContainer.addEventListener("touchstart",this.onDown.bind(this)),this.msContainer.addEventListener("mousedown",this.onDown.bind(this)),document.addEventListener("touchmove",this.onMove.bind(this),!!n()&&{passive:!1}),document.addEventListener("touchend",this.onUp.bind(this)),document.addEventListener("touchcancel",this.stopTracking.bind(this)),document.addEventListener("mousemove",this.onMove.bind(this),!!n()&&{passive:!1}),document.addEventListener("mouseup",this.onUp.bind(this)),this.o.prevEl&&(this.prevEl=c.str(this.o.prevEl)?document.querySelector(this.o.prevEl):this.o.prevEl,this.prevEl.addEventListener("click",this.prev.bind(this))),this.o.nextEl&&(this.nextEl=c.str(this.o.nextEl)?document.querySelector(this.o.nextEl):this.o.nextEl,this.nextEl.addEventListener("click",this.next.bind(this)))),window.addEventListener("resize",this.onResize.bind(this))},prev:function(){this.enabled&&this.updateSlider(Math.round(this.targetPosition/this.step)*this.step+(this.o.reverse?-this.step:this.step))},next:function(){this.enabled&&this.updateSlider(Math.round(this.targetPosition/this.step)*this.step+(this.o.reverse?this.step:-this.step))},select:function(t){this.enabled&&this.updateSlider((t+this.o.loop)*(this.o.reverse?this.step:-this.step))},setStyleToNode:function(t,i,e,s){if(i){var n="";for(var r in i)"."==r[0]?this.setStyleToNode(t.querySelector(r),i[r],e,s):"transform"==r?i[r].forEach(function(t){for(var i in t)n+=i+"("+h(t[i],e,s),"rotate"==i?n+="deg":"translateX"!=i&&"translateY"!=i&&"translateZ"!=i||(n+="px"),n+=") "}):n=h(i[r],e,s),t.style[r]=n}},setStyle:function(t,i,e){this.setStyleToNode(this.msSlides[t],this.o.style,i,e),c.fnc(this.o.customStyles)&&this.o.customStyles(t,i,e)},renderTarget:function(){if(this.o.sync)for(var t,i=this.o.sync.length;i--;)(t=this.o.sync[i]).targetPosition=(t.o.reverse?-1:1)*this.targetPosition/this.sliderWidth*t.sliderWidth,t.renderTarget();var e=this.o.loop*this.step,s=this.sliderWidth-2*e;if(this.o.loop)if(-this.targetPosition<e)for(;-this.targetPosition<e;)this.targetPosition-=s;else if(-this.targetPosition>=e+s)for(;-this.targetPosition>=e+s;)this.targetPosition+=s;var n=(this.o.reverse?1:-1)*this.targetPosition/this.step;this.onChangeCurrentIndex(Math.round(n));var r=Math.floor(n),o=Math.ceil(n),h=n-r,a=n-o;c.und(this.lowerIndex)||this.lowerIndex==r||this.lowerIndex==o||this.setStyle(this.lowerIndex,1,!0),c.und(this.higherIndex)||this.higherIndex==r||this.higherIndex==o||this.setStyle(this.higherIndex,-1),0<=r&&r<this.sliderLength&&(this.setStyle(r,h,!0),this.lowerIndex=r),0<=o&&o<this.sliderLength&&(this.setStyle(o,a),this.higherIndex=o);var d="translate"+(this.o.vertical?"Y":"X")+"("+this.targetPosition+"px)";this.msTrack.style[l]=d},onDown:function(t){if(this.enabled&&!this.pointerActive){var i=r(t);this.pointerActive=!0,this.pointerId=i.id,this.pointerLastX=this.pointerCurrentX=i.x,this.pointerLastY=this.pointerCurrentY=i.y,this.trackingPoints=[],this.addTrackingPoint(this.pointerLastX,this.pointerLastY),this.animateInstance&&this.animateInstance.stop()}},onMove:function(t){if(this.enabled&&this.pointerActive){var i=r(t);if(i.id===this.pointerId){this.pointerCurrentX=i.x,this.pointerCurrentY=i.y;var e=this.pointerMoved;if(!this.pointerMoved){var s=Math.abs(Math.abs(this.pointerCurrentX)-Math.abs(this.pointerLastX))<Math.abs(Math.abs(this.pointerCurrentY)-Math.abs(this.pointerLastY));(this.o.vertical&&s||!this.o.vertical&&!s)&&(e=!0)}e?(t.preventDefault(),this.pointerMoved=!0,this.addTrackingPoint(this.pointerLastX,this.pointerLastY),this.requestTick()):this.stopTracking(-1)}}},onUp:function(t){if(this.enabled&&this.pointerActive&&r(t).id===this.pointerId){var i=t.target;if(this.msTrack.contains(i))for(;!i.matches(".ms-slide, .ms-track");)i=i.parentNode;var e=Array.prototype.indexOf.call(this.msSlides,i);this.pointerMoved||-1!==e&&(this.currentIndex=e,this.updateSlider()),this.stopTracking(e)}},onResize:function(){},stopTracking:function(t){this.pointerActive=!1,(this.pointerMoved||-1===t)&&(this.pointerMoved=!1,this.addTrackingPoint(this.pointerLastX,this.pointerLastY),this.startDecelAnim())},addTrackingPoint:function(t,i){for(var e=Date.now();0<this.trackingPoints.length&&!(e-this.trackingPoints[0].time<=100);)this.trackingPoints.shift();this.trackingPoints.push({x:t,y:i,time:e})},updateAndRender:function(){var t,i=this.o.vertical?this.pointerCurrentY-this.pointerLastY:this.pointerCurrentX-this.pointerLastX;if(this.targetPosition+=i*this.o.multiplier,this.o.bounceCoefficient){var e=this.checkBounds();0!==e&&(this.targetPosition-=i*(t=e,5e-6*Math.pow(t,2)+1e-4*t+.55)*this.o.multiplier)}else this.checkBounds(!0);this.renderTarget(),this.pointerLastX=this.pointerCurrentX,this.pointerLastY=this.pointerCurrentY,this.ticking=!1},requestTick:function(){this.ticking||requestAnimationFrame(this.updateAndRender.bind(this)),this.ticking=!0},checkBounds:function(t){var i=0;return void 0!==this.boundMin&&this.targetPosition<this.boundMin?i=this.boundMin-this.targetPosition:void 0!==this.boundMax&&this.targetPosition>this.boundMax&&(i=this.boundMax-this.targetPosition),t&&0!==i&&(this.targetPosition=0<i?this.boundMin:this.boundMax),i},startDecelAnim:function(){var t=this.trackingPoints[0],i=this.trackingPoints[this.trackingPoints.length-1],e=this.o.vertical?i.y-t.y:i.x-t.x,s=(i.time-t.time)/15/this.o.multiplier;this.decVel=e/s||0;var n=this.targetPosition+12*this.decVel,r=n%this.step;n-=r,Math.abs(r)>this.step/2&&(n+=(0<r?1:-1)*this.step),this.updateSlider(n)},fixCurrentIndex:function(){this.o.loop&&(this.currentIndex<this.o.loop?this.currentIndex=this.sliderLength-this.o.loop+(this.currentIndex-this.o.loop):this.currentIndex>this.sliderLength-this.o.loop-1&&(this.currentIndex=this.currentIndex+2*this.o.loop-this.sliderLength))},updateSlider:function(t,i){c.und(t)?t=(this.o.reverse?1:-1)*this.currentIndex*this.step:this.currentIndex=(this.o.reverse?1:-1)*t/this.step,this.fixCurrentIndex(),t!==this.targetPosition&&(this.updateClassnames(),this.animateTarget(t,i))},updateClassnames:function(){this.prevEl&&(0===this.currentIndex?this.prevEl.classList.add("ms-first"):this.prevEl.classList.remove("ms-first")),this.nextEl&&(this.currentIndex===this.sliderLength-1?this.nextEl.classList.add("ms-last"):this.nextEl.classList.remove("ms-last"))},animateTarget:function(t,i,s){this.animateInstance&&this.animateInstance.stop();var n=this,r=this.targetPosition,o=t;this.animateInstance=function(e,s,n){{if(s){var r=performance.now(),o=null,h=!1,a=function(t){var i=(t-r)/s;i<0&&(i=0),1<i&&(i=1),c.fnc(n)&&(i=n(i)),e(i),1===i||h||(o=requestAnimationFrame(a))};return o=requestAnimationFrame(a),new function(){this.stop=function(){o&&cancelAnimationFrame(o),h=!0}}}e(1)}}(function(t){n.targetPosition=r<o?r+(o-r)*t:r-(r-o)*t;var i=n.o.reverse?0:-(n.sliderLength-1)*n.step,e=n.o.reverse?(n.sliderLength-1)*n.step:0;!s&&!n.o.loop&&n.o.bounceCoefficient&&(n.targetPosition>e&&n.targetPosition>e+Math.min((o-e)*n.o.bounceCoefficient,n.o.bounceMax)||n.targetPosition<i&&n.targetPosition<i-Math.min(-(o-i)*n.o.bounceCoefficient,n.o.bounceMax))?(n.animateInstance.stop(),n.animateTarget(n.targetPosition<i?i:e,!1,!0),n.currentIndex=n.targetPosition<i?0:n.sliderLength-1):n.renderTarget()},i?0:500,function(t){return t*(2-t)})},onChangeCurrentIndex:function(t){var i=this.o.loop?t-this.o.loop:t;i=i===this.sliderLength-2*this.o.loop?0:i,c.fnc(this.o.change)&&i!==this.lastCurrentIndex&&(this.o.change(i,this.lastCurrentIndex),this.lastCurrentIndex=i)},getCurrentIndex:function(){return this.o.loop?this.currentIndex-this.o.loop:this.currentIndex},enable:function(){this.enabled=!0},disable:function(){this.enabled=!1}};var c={arr:function(t){return Array.isArray(t)},str:function(t){return"string"==typeof t},und:function(t){return void 0===t},fnc:function(t){return"function"==typeof t}};var i="transform",l=function(t,i){if(i in t.style)return getComputedStyle(t).getPropertyValue(i.replace(/([a-z])([A-Z])/g,"$1-$2").toLowerCase())||"0"}(document.body,i)?i:"-webkit-"+i;function o(t){return'<li class="ms-slide">'+t+"</li>"}function e(t,i){for(var e in i)t[e]=c.arr(i[e])?i[e].slice(0):i[e];return t}function s(t){t||(t={});for(var i=1;i<arguments.length;i++)e(t,arguments[i]);return t}function n(){var t=!1;try{var i=Object.defineProperty({},"passive",{get:function(){t=!0}});window.addEventListener("test",null,i)}catch(t){}return n=function(){return t},t}function r(t){if("touchmove"===t.type||"touchstart"===t.type||"touchend"===t.type){var i=t.targetTouches[0]||t.changedTouches[0];return{x:i.clientX,y:i.clientY,id:i.identifier}}return{x:t.clientX,y:t.clientY,id:null}}function h(t,i,e){var s=t[0],n=t[1],r=t[2]||s,o=e?n-s:n-r;return e?n-o*i:n+o*i}return s(t,{extend:s,transformProperty:l,getCurrentValue:h})});
(function() {

    var slidersContainer = document.querySelector('.sliders-container');

    // Initializing the numbers slider
    var msNumbers = new MomentumSlider({
        el: slidersContainer,
        cssClass: 'ms--numbers',
        range: [1, 5],
        rangeContent: function (i) {
            return '0' + i;
        },
        style: {
            transform: [{scale: [0.4, 1]}],
            opacity: [0, 1]
        },
        interactive: false
    });

    // Initializing the titles slider
    var titles = [
        'PLP Website',
        'Real Estate System',
        'Aim Lab Clone',
        'Barangay System',
        'RHS Website'
    ];
    var msTitles = new MomentumSlider({
        el: slidersContainer,
        cssClass: 'ms--titles',
        range: [0, 4],
        rangeContent: function (i) {
            return '<h3>'+ titles[i] +'</h3>';
        },
        vertical: true,
        reverse: true,
        style: {
            opacity: [0, 1]
        },
        interactive: false
    });

    // Initializing the links slider
    var msLinks = new MomentumSlider({
        el: slidersContainer,
        cssClass: 'ms--links',
        range: [0, 4],
        rangeContent: function (i) {
            const links = [
                'https://drive.google.com/drive/folders/1NejxwX2inPZyabsca00fOc9lqhVaQryN?usp=sharing', 
                'https://drive.google.com/drive/folders/1b_o5eOTwRUsIPd3GzYuIkfzv5JOGQLQs?usp=sharing',
                'https://www.facebook.com/stories/1196197031156140/?source=profile_highlight',
                'https://drive.google.com/drive/folders/1vhqySt1W0Hgyn29NOhsz8zm1-ziwxH2f?usp=sharing',
                'https://drive.google.com/drive/folders/1BIFGjc7FOFkNlUNOP51jS5rOWn7ogDHy?usp=sharing'
            ];
            return `<a href="${links[i]}" class="ms-slide__link" target="_blank">View Project</a>`;
        },
        vertical: true,
        interactive: false
    });

    // Get pagination items
    var pagination = document.querySelector('.pagination');
    var paginationItems = [].slice.call(pagination.children);

    // Initializing the images slider
    var msImages = new MomentumSlider({
        // Element to append the slider
        el: slidersContainer,
        // CSS class to reference the slider
        cssClass: 'ms--images',
        // Generate the 4 slides required
        range: [0, 4],
        rangeContent: function () {
            return '<div class="ms-slide__image-container"><div class="ms-slide__image"></div></div>';
        },
        // Syncronize the other sliders
        sync: [msNumbers, msTitles, msLinks],
        // Styles to interpolate as we move the slider
        style: {
            '.ms-slide__image': {
                transform: [{scale: [1.5, 1]}]
            }
        },
        // Update pagination if slider change
        change: function(newIndex, oldIndex) {
            if (typeof oldIndex !== 'undefined') {
                paginationItems[oldIndex].classList.remove('pagination__item--active');
            }
            paginationItems[newIndex].classList.add('pagination__item--active');
        }
    });

    // Select corresponding slider item when a pagination button is clicked
    pagination.addEventListener('click', function(e) {
        if (e.target.matches('.pagination__button')) {
            var index = paginationItems.indexOf(e.target.parentNode);
            msImages.select(index);
        }
    });

})();
