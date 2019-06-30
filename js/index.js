
/*{
 dom: String//轮播图容器,
 smallDom: String  照片Flag容器，
 moveType : String 0--左右移动。1--上下移动,
 autoPlay: Boolean true自动播放,false 自动播放关闭
 delay: Number 图片切换的时间间隔
 moveTime：Number 图片的动画时间
 animationType：String 1左右转换，0淡隐淡出
 dataSrcTitle：String 图片标志border
 dataSrc:Array 照片数据源
 }*/
var swiper = new Swiper({
    dom:'.swiper-content',
    smallDom:'.swiper-slide',
    moveType: '0',
    autoPlay: true,
    delay: 3000,
    moveTime:2000,
    animationType: '1',
    dataSrcTitle: './img/border.png',
    dataSrc: ['./img/2.jpg','./img/3.jpg','./img/4.jpg']
});
//左右滑动
var swiper1 = new Swiper({
    dom:'.swiper-content1',
    smallDom:'.swiper-slide1',
    moveType: '0',
    autoPlay: true,
    delay: 3000,
    moveTime:2000,
    animationType: 0,
    dataSrcTitle: './img/border.png',
    dataSrc: ['./img/2.jpg','./img/3.jpg','./img/4.jpg']
});
//上下滑动
var swiper2 = new Swiper({
    dom:'.swiper-content2',
    smallDom:'.swiper-slide2',
    moveType: '1',
    autoPlay: true,
    delay: 3000,
    moveTime:2000,
    animationType: 1,
    dataSrcTitle: './img/border.png',
    dataSrc: ['./img/2.jpg','./img/3.jpg','./img/4.jpg']
});
//淡隐淡出
var swiper3 = new Swiper({
    dom:'.swiper-content3',
    smallDom:'.swiper-slide3',
    moveType: '0',
    autoPlay: true,
    delay: 3000,
    moveTime:2000,
    animationType:0,
    dataSrcTitle: './img/border.png',
    dataSrc: ['./img/2.jpg','./img/3.jpg','./img/4.jpg']
});

//四张图片--自动播放关闭
var swiper4 = new Swiper({
    dom:'.swiper-content4',
    smallDom:'.swiper-slide4',
    moveType: '0',
    autoPlay: false,
    delay: 3000,
    moveTime:2000,
    animationType: 1,
    dataSrcTitle: './img/border.png',
    dataSrc: ['./img/2.jpg','./img/3.jpg','./img/4.jpg','./img/3.jpg']
});

//四张图片--自动播放关闭
var swiper5 = new Swiper({
    dom:'.swiper-content5',
    smallDom:'.swiper-slide5',
    moveType: '0',
    autoPlay: true,
    delay: 3000,
    moveTime:2000,
    animationType: 1,
    dataSrcTitle: './img/border.png',
    dataSrc: ['./img/2.jpg','./img/3.jpg','./img/4.jpg','./img/3.jpg']
});
