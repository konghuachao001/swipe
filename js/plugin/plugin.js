// 取浏览器的 CSS 前缀
var prefix = function() {
    var styles = window.getComputedStyle(document.documentElement, '');
    var core = (
        Array.prototype.slice
            .call(styles)
            .join('')
            .match(/-(moz|webkit|ms)-/) || (styles.OLink === '' && ['', 'o'])
    )[1];
    return '-' + core + '-';
}();
//获取transform的值
function getTranformVal(dom){
    var _prefix = prefix.split('-')[1];
    _prefix = _prefix.slice(0,1).toUpperCase() + _prefix.slice(1);
    return parseInt(dom.style[_prefix + 'Transform'].replace(/[^0-9\-,]/g,''))
}
//设置transform的值
function setSigleTransformVal(dom,num,flag){
    var _prefix = prefix.split('-')[1];
    _prefix = _prefix.slice(0,1).toUpperCase() + _prefix.slice(1);
    if(parseInt(flag) === 0){
        dom.style[_prefix + 'Transform'] = 'translateX(' + num + 'px)';
    }else if(parseInt(flag) === 1){
        dom.style[_prefix + 'Transform'] = 'translateY(' + num + 'px)';
    }
}
//设置transform的值
function setDoubleTransformVal(dom,num1,num2){
    var _prefix = prefix.split('-')[1];
    _prefix = _prefix.slice(0,1).toUpperCase() + _prefix.slice(1);
    dom.style[_prefix + 'Transform'] = 'translate(' + num1 + 'px,' + num2 +'px)';
}

/*
 * 设置当前照片对应的flag
 * swiper---当前的实例对象
 * index---当前轮播图中所展示照片的li元素index值
 */
function setSmallCurIndex(swiper,index){
    // swiper.smallCurIndex当前图片对应的标识，所处的index；
    var _len = swiper.ulSmall.children.length;//标识的个数
    var _len2 = swiper.ul.children.length;//标识的个数
    if(index == 0){
        swiper.smallCurIndex = _len - 1;
    }else if(index == _len2 - 1){
        swiper.smallCurIndex = 0
    }else{
        swiper.smallCurIndex = --index;
    }
    //setSigleTransformVal(document.querySelector(swiper.obj.smallDom).children[1],-swiper.smallCurIndex*swiper.wrap.wrapHeight/_len,1);
    document.querySelector(swiper.obj.smallDom).children[1].style.top =  swiper.smallCurIndex*swiper.wrap.wrapHeight/_len + 'px';
}

//dom操作
function doDom(swiper){
    var _len = swiper.ulSmall.children.length;//标识的个数
    if(swiper.smallCurIndex == swiper.ulSmall.children.length) swiper.smallCurIndex = 0
    if(swiper.curIndex == swiper.ul.children.length) swiper.curIndex = 1
    //setSigleTransformVal(document.querySelector(swiper.obj.smallDom).children[1],-swiper.smallCurIndex*(swiper.wrap.wrapHeight/_len),1);
    //document.querySelector(swiper.obj.smallDom).children[1].style.top = (swiper.smallCurIndex*50) + 'px';
    swiper.ul.style.transform = swiper.moveDirection + '(' + -swiper.wrap[swiper.offsetVal]*swiper.curIndex + 'px' + ')';
    setSigleTransformVal(swiper.ul,-swiper.wrap[swiper.offsetVal]*swiper.curIndex,0);
}

//dom操作
function doDom1(swiper){
    var _len = swiper.ulSmall.children.length;//标识的个数
    //setSigleTransformVal(document.querySelector(swiper.obj.smallDom).children[1],swiper.smallCurIndex*(swiper.wrap.wrapHeight/_len),1);
    document.querySelector(swiper.obj.smallDom).children[1].style.transform = 'translateX(' + swiper.smallCurIndex*(swiper.wrap.wrapHeight/_len) + 'px' + ')';
    // document.querySelector(swiper.obj.smallDom).children[1].style.top = (swiper.smallCurIndex*50) + 'px';

    for(var i=0;i<swiper.ul.children.length;i++){
        if(i != swiper.curIndex){
            swiper.ul.children[i].style.opacity = 0;
        }else{
            swiper.ul.children[i].style.opacity = 1;
        }
    }
}

Swiper1.prototype = {
    //自动播放
    autoPlay: function(){
        var _this = this;
        this.autoPlayTimer = setInterval(function(){
            _this.next();
        },_this.obj.delay)
    },
    //上一步
    prev: function(){
        if(this.moveTimer) clearInterval(this.moveTimer)
        var _this = this;
        var _len = this.ul.children.length;
        var newVal;
        var _speed = this.wrap[_this.offsetVal]/this.obj.moveTime*100;
        this.moveTimer = setInterval(function(){
            //判断当前元素curIndex为0，则curIndex置为len-2
            // if(_this.ul.style[_this.moveDirection] == '0px'){
            if(getTranformVal(_this.ul) == '0'){
                newVal = -(_len-2)*_this.wrap[_this.offsetVal];
                _this.curIndex = _len-2;
                // _this.ul.style[_this.moveDirection] = newVal + "px";
                setSigleTransformVal(_this.ul,newVal,newVal,_this.moveDirection)
            }
            //newVal = parseInt(_this.ul.style[_this.moveDirection].replace('px','')) + _speed;
            newVal = getTranformVal(_this.ul) + _speed;
            if(newVal>=-(_this.curIndex - 1)*_this.wrap[_this.offsetVal]){
                newVal = -(_this.curIndex - 1)*_this.wrap[_this.offsetVal];
                _this.curIndex--;
                setSmallCurIndex(_this,_this.curIndex);
                clearInterval(_this.moveTimer);
            }
            //_this.ul.style[_this.moveDirection] = newVal + 'px';
            setSigleTransformVal(_this.ul,newVal,_this.moveDirection)
        },20)
    },
    //下一步
    next: function(){
        if(this.moveTimer) clearInterval(this.moveTimer)
        var _this = this;
        var _len = this.ul.children.length;
        var newVal;
        var _speed = this.wrap[_this.offsetVal]/this.obj.moveTime*100;
        this.moveTimer = setInterval(function(){
            //判断当前元素curIndex为len-1，则curIndex置为1
            //if(_this.ul.style[_this.moveDirection] == -(_len-1)*_this.wrap[_this.offsetVal]+ 'px'){
            if(getTranformVal(_this.ul) == -(_len-1)*_this.wrap[_this.offsetVal]){
                newVal = -_this.wrap[_this.offsetVal];
                _this.curIndex = 1;
               // _this.ul.style[_this.moveDirection] = newVal + "px";
                setSigleTransformVal(_this.ul,newVal,_this.moveDirection)
            }
            // newVal = _this.ul.style[_this.moveDirection].replace('px','')-_speed;
            newVal = getTranformVal(_this.ul) - _speed;
            if(newVal<=-(_this.curIndex + 1)*_this.wrap[_this.offsetVal]){
                newVal = -(_this.curIndex + 1)*_this.wrap[_this.offsetVal];
                _this.curIndex++;
                setSmallCurIndex(_this,_this.curIndex);
                clearInterval(_this.moveTimer);
            }
            // _this.ul.style[_this.moveDirection] = newVal + 'px';
            setSigleTransformVal(_this.ul,newVal,_this.moveDirection)
        },20)
    },
    //创建dom结构
    createUlList: function(){
        var _this = this;
        //获取轮播图容器的宽高
        var wrap = document.querySelector(_this.obj.dom);
        // document.querySelector(_this.obj.dom).style.position = 'relative';
        this.wrap = {
            wrapWidth: wrap.offsetWidth,
            wrapHeight: wrap.offsetHeight
        };
        //创建li，img元素
        var ul = document.createElement('ul');
        var ulSmall = document.createElement('ul');
        var li = document.createElement('li');
        var liSmall = document.createElement('li');
        var img = document.createElement('img');
        li.style.fontSize = 0;
        li.style.float = 'left';

        li.appendChild(img);

        liSmall.style.width = document.querySelector(this.obj.smallDom).offsetWidth + 'px';
        //轮播大图
        var _dataLen = _this.obj.dataSrc.length;
        // liSmall.style.height = '50px';
        liSmall.style.height = this.wrap.wrapHeight/_dataLen + 'px';
        for(var i=0;i<_dataLen;i++){
            if(_this.obj.dataSrc[i]){
                var _cloneNode = li.cloneNode(true);
                _cloneNode.children[0].src = _this.obj.dataSrc[i];
                ul.appendChild(_cloneNode)

                var _cloneNodeSmall = liSmall.cloneNode(true);
                _cloneNodeSmall.style.background = 'url("' + _this.obj.dataSrc[i] + '")' + ' center center';
                _cloneNodeSmall.style.backgroundSize = 'cover';
                _cloneNodeSmall.setAttribute("data-index",i)
                ulSmall.appendChild(_cloneNodeSmall);
            }
        }
        ul.appendChild(ul.children[0].cloneNode(true));
        ul.insertBefore(ul.children[ul.children.length - 2].cloneNode(true),ul.children[0]);
        return {ul: ul,ulSmall: ulSmall}
    },
    //初始化dom样式
    initUlListStyle: function(){
        var _liLen = this.ul.children.length;
        // this.ul.style.position = 'absolute';
        this.ul.className = 'clear';
        if(this.obj.moveType === '0'){
            this.ul.style.width = this.wrap.wrapWidth*_liLen + 'px';
            this.ul.style.height = this.wrap.wrapHeight + 'px';
            // this.ul.style.left = -(this.wrap.wrapWidth) + 'px';
            setSigleTransformVal(this.ul,-this.wrap.wrapWidth,this.moveDirection)
        }else{
            this.ul.style.height = this.wrap.wrapHeight*_liLen + 'px';
            this.ul.style.width = this.wrap.wrapWidth + 'px';
            // this.ul.style.top = -this.wrap.wrapHeight + 'px';
            setSigleTransformVal(this.ul,-this.wrap.wrapHeight,this.moveDirection)
        }
    },
    //插入dom
    dom: function(){
        //初始化样式
        this.initUlListStyle();
        //插入大图
        document.querySelector(this.obj.dom).appendChild(this.ul);
        //插入小图
        document.querySelector(this.obj.smallDom).appendChild(this.ulSmall);
        //插入当前照片的识别的标识
        this.initImgFlag();
    },
    //初始化图片标识列表
    initImgFlag: function(){
        var _len = this.ulSmall.children.length;//标识的个数
        var div = document.createElement('div');
        div.style.background = 'url("'+ this.obj.dataSrcTitle +'")' + '0 0 no-repeat';
        div.style.backgroundSize = '100% 100%';
        document.querySelector(this.obj.smallDom).style.position = 'relative';
        div.style.position = 'absolute';
        div.style.width = document.querySelector(this.obj.smallDom).offsetWidth  + 6 + 'px';
        div.style.height = this.wrap.wrapHeight/_len + 'px';
        // div.style.height = '50px';
        //此处为适应当前轮播图
        div.style.left = '-6px';
        div.style.top = '0';
        //setDoubleTransformVal(div,-6,-this.wrap.wrapHeight);
        //div.style[prefix + 'transform'] = 'translate(' + div.style.height + 'px,'+'-6px)';
        document.querySelector(this.obj.smallDom).appendChild(div);
    },
    //事件监听
    addListenDom: function(){
        var _this = this;
        document.querySelector(this.obj.smallDom).addEventListener('click',function(e){
            var el = e.target;
            if (el.tagName.toLowerCase() != 'li') return
            //清除定时器
            if(_this.autoPlayTimer) clearInterval(_this.autoPlayTimer)
            if(_this.moveTimer) clearInterval(_this.moveTimer)
            //获取当前子元素的下标
            _this.smallCurIndex = parseInt(e.target.getAttribute('data-index'));
            _this.curIndex = _this.smallCurIndex + 1;

            doDom(_this)

        },false)
        document.querySelector(this.obj.smallDom).addEventListener('mouseenter',function(e){
            //清除定时器
            if(_this.autoPlayTimer) clearInterval(_this.autoPlayTimer)
            if(_this.moveTimer) clearInterval(_this.moveTimer)
            _this.curIndex++;
            _this.smallCurIndex++;
            doDom(_this);
        },false)
        document.querySelector(this.obj.smallDom).addEventListener('mouseleave',function(e){
            if(_this .obj.autoPlay) _this.autoPlay()
        },false)

    }
};
function Swiper1(obj){
    this .obj = obj;
    this.autoPlayTimer = null; //自动播放定时器
    this.moveTimer = null;  //图片动画的定时器
    this.curIndex = 1;  // 当前轮播图展示的图片处在ul的index
    this.smallCurIndex = 0; // 图片标识所处ul的index
    this.moveDirection = this.obj.moveType;
    this.offsetVal = this.obj.moveType === '0' ? 'wrapWidth' : 'wrapHeight'; //图片要更改的属性
    var ulObj = this.createUlList();    //创建dom结构
    this.ul = ulObj.ul; //轮播图ul
    this.ulSmall = ulObj.ulSmall;   //图片标识列表
    this.dom();    //插入dom
    this.addListenDom(); //事件监听
    if(this.obj.autoPlay){ //是否自动播放
        this.autoPlay()
    }
}
Swiper1.prototype.constructor = Swiper;

Swiper2.prototype = {
    //创建dom结构
    createUlList: function(){
        var _this = this;
        //获取轮播图容器的宽高
        var wrap = document.querySelector(_this.obj.dom);
        this.wrap = {
            wrapWidth: wrap.offsetWidth,
            wrapHeight: wrap.offsetHeight
        };
        //创建li，img元素
        var ul = document.createElement('ul');
        var ulSmall = document.createElement('ul');
        var li = document.createElement('li');
        var liSmall = document.createElement('li');
        var img = document.createElement('img');
        li.style.fontSize = 0;
        ul.style.position = 'relative';
        li.style.position = 'absolute';
        li.style.left = '0px';
        li.style.top = '0px';

        li.appendChild(img);

        liSmall.style.width = document.querySelector(this.obj.smallDom).offsetWidth + 'px';
        //轮播大图
        var _dataLen = _this.obj.dataSrc.length;
        // liSmall.style.height = '50px';
        liSmall.style.height = this.wrap.wrapHeight/_dataLen + 'px';
        for(var i=0;i<_dataLen;i++){
            if(_this.obj.dataSrc[i]){
                var _cloneNode = li.cloneNode(true);
                _cloneNode.children[0].src = _this.obj.dataSrc[i];
                ul.appendChild(_cloneNode)

                var _cloneNodeSmall = liSmall.cloneNode(true);
                _cloneNodeSmall.style.background = 'url("' + _this.obj.dataSrc[i] + '")' + ' center center';
                _cloneNodeSmall.style.backgroundSize = 'cover';
                _cloneNodeSmall.setAttribute("data-index",i)
                ulSmall.appendChild(_cloneNodeSmall);
            }
        }
        return {ul: ul,ulSmall: ulSmall}
    },
    //初始化dom样式
    initUlListStyle: function(){
        this.ul.children[0].style.zIndex = 3;
        for(var i=0;i<this.ul.children.length;i++){
            this.ul.children[i].style.zIndex = this.ul.children.length - i;
            if(i !=0 ){
                this.ul.children[i].style.opacity = 0;
            }
        }
    },
    //插入dom
    dom: function(){
        //初始化样式
        this.initUlListStyle();
        //插入大图
        document.querySelector(this.obj.dom).appendChild(this.ul);
        //插入小图
        document.querySelector(this.obj.smallDom).appendChild(this.ulSmall);
        //插入当前照片的识别的标识
        this.initImgFlag();
    },
    //初始化图片标识列表
    initImgFlag: function(){
        var _len = this.ulSmall.children.length;//标识的个数
        var div = document.createElement('div');
        div.style.background = 'url("'+ this.obj.dataSrcTitle +'")' + '0 0 no-repeat';
        div.style.backgroundSize = '100% 100%';
        document.querySelector(this.obj.smallDom).style.position = 'relative';
        div.style.position = 'absolute';
        div.style.width = document.querySelector(this.obj.smallDom).offsetWidth  + 6 + 'px';
        div.style.height = this.wrap.wrapHeight/_len + 'px';
        // div.style.height = '50px';
        //此处为适应当前轮播图
        div.style.left = '-6px';
        div.style.top = '0';
        div.style.zIndex = _len + 1;
        document.querySelector(this.obj.smallDom).appendChild(div);
    },
    //下一步
    next: function(){
        if(this.moveTimer) clearInterval(this.moveTimer)
        var _this = this;
        var _len = this.ul.children.length;
        var _speed = 1/this.obj.moveTime*10;
        var newVal = 0;
        this.moveTimer = setInterval(function(){
            if(newVal < 1){
                newVal = newVal + _speed;
            }
            if(newVal >= 1){
                clearInterval(_this.moveTimer);
                newVal = 1;
            }

            var nextIndex = _this.curIndex == _len -1 ? 0 : _this.curIndex + 1
            _this.ul.children[_this.curIndex].style.opacity = 1 - newVal;
            _this.ul.children[nextIndex].style.opacity = newVal;

            if(newVal == 1) {
                newVal = 0;
                _this.curIndex = _this.curIndex == _len-1 ? 0 : ++_this.curIndex
                //document.querySelector(_this.obj.smallDom).children[1].style.top = (_this.curIndex*50) + 'px';
                document.querySelector(_this.obj.smallDom).children[1].style.top = (_this.curIndex*_this.wrap.wrapHeight/_len) + 'px';
            }
            _this.smallCurIndex = _this.curIndex
        },10)
    },
    //自动播放
    autoPlay: function(){
        var _this = this;
        this.autoPlayTimer = setInterval(function(){
            _this.next();
        },this.obj.delay)

    },
    //事件监听
    addListenDom: function(){
        var _this = this;
        document.querySelector(this.obj.smallDom).addEventListener('click',function(e){
            var el = e.target;
            if (el.tagName.toLowerCase() != 'li') return
            //清除定时器
            if(_this.autoPlayTimer) clearInterval(_this.autoPlayTimer)
            if(_this.moveTimer) clearInterval(_this.moveTimer)
            //获取当前子元素的下标
            _this.smallCurIndex = parseInt(e.target.getAttribute('data-index'));
            _this.curIndex = _this.smallCurIndex;

            doDom1(_this)

        },false)
        document.querySelector(this.obj.smallDom).addEventListener('mouseenter',function(e){
            //清除定时器
            if(_this.autoPlayTimer) clearInterval(_this.autoPlayTimer)
            if(_this.moveTimer) clearInterval(_this.moveTimer)
            _this.curIndex = _this.curIndex == _this.ul.children.length-1 ? 0 : _this.curIndex+1;
            _this.smallCurIndex = _this.curIndex;
            doDom1(_this);
        },false)
        document.querySelector(this.obj.smallDom).addEventListener('mouseleave',function(e){
            if(_this .obj.autoPlay) _this.autoPlay()
        },false)

    }
};
function Swiper2(obj){
    this .obj = obj;
    this.autoPlayTimer = null;//自动播放定时器
    this.moveTimer = null;//图片动画的定时器
    this.curIndex = 0;// 当前轮播图展示的图片处在ul的index
    this.smallCurIndex = 0;// 图片标识所处ul的index
    var ulObj = this.createUlList();//创建dom结构
    this.ul = ulObj.ul;//轮播图ul
    this.ulSmall = ulObj.ulSmall;//图片标识列表
    this.dom();//插入dom
    this.addListenDom(); //事件监听
    if(this.obj.autoPlay){ //是否自动播放
        this.autoPlay(this.obj.delay)
    }
}
Swiper2.prototype.constructor = Swiper1;

function Swiper(obj){
    if(obj.animationType){
        return new Swiper1(obj)
    }else{
        return new Swiper2(obj)
    }
}