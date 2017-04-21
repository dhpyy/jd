/**
 * Created by yangyang on 2017/4/21.
 */
$(document).ready(function () {
    $('.slider .circles').on('mouseenter', 'li', function () {
        $(this).addClass('current').siblings().removeClass('current')
        $('.pic li').eq($(this).index()).show().siblings().hide()
    })


    $('.sidebar li').each(function(i, e) {              /*css: 设置css精灵背景位置*/
        var num = i*55
        $(e).css('background-position', '0 -' + num + 'px')
    })

    $(window).scroll(function() {                   /*注册监听器*/
        var top = $(document).scrollTop()            /*html: 页面向上滚动的高度*/
        if(top >= $('.cont').offset().top - 200) {   /*判断是否显示侧边栏*/
            $('.sidebar').fadeIn()
            if(top >= $('.l6').offset().top - 200) {       /*先判断内容区域距离页面上方的最大距离，满足则跳出循环不再继续检测*/
                $('.sidebar li').eq(5).addClass('current').siblings().removeClass('current')/*css: 选中的导航条对象添加类样式，没选中的去除类样式*/
            } else if(top >= $('.l5').offset().top - 200) {
                $('.sidebar li').eq(4).addClass('current').siblings().removeClass('current')
            } else if(top >= $('.l4').offset().top - 200) {
                $('.sidebar li').eq(3).addClass('current').siblings().removeClass('current')
            } else if(top >= $('.l3').offset().top - 200) {
                $('.sidebar li').eq(2).addClass('current').siblings().removeClass('current')
            } else if(top >= $('.l2').offset().top - 200) {
                $('.sidebar li').eq(1).addClass('current').siblings().removeClass('current')
            } else if(top >= $('.l1').offset().top - 200) {
                $('.sidebar li').eq(0).addClass('current').siblings().removeClass('current')
            }
        } else {
            $('.sidebar').fadeOut()
        }
    })

    $('.sidebar').on('click', 'li', function() {           /*注册监听器*/
        $('html, body').animate({
            'scrollTop': $('.cont .wrapper').eq($(this).index()).offset().top - 200 /*css: 修改html元素的scrollTop属性*/
        })
    })

    $(".back").click(function () {
        $("html,body").animate({"scrollTop":0},300);
    });
})

