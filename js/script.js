$(document).ready(function() {

// a[herf="#"] 상단 이동 동작 막기 
$(document).on('click', 'a[href="#"]', function(e) {
    e.preventDefault();
});

// navBtn
navBtn();
function navBtn() {
    var productsBtn = $('li.nav-products');
    var productsBtnMenu = $('ul.products');
    
    productsBtn.on('mouseenter', function() {
        productsBtnMenu.stop(true).slideToggle();
        $(this).toggleClass('on');
    }).on('mouseleave', function() {
        productsBtnMenu.stop(true).slideToggle();
        $(this).removeClass('on');
    });
}
    
// mianBtn
mainBtn();
function mainBtn() {
    var mainBtn = $('article.main-btn');
    var mainShop = $('article.main-btn div.shop');
    var mainShopLine = $('article.main-btn span.shop-line');
    
    mainBtn.on('mouseenter', function() {
        mainShop.stop(true).animate({'margin-left': '30', 'transition': 'all 0.5s', 'color': '#F2001E'});
        mainShopLine.stop(true).animate({'margin-left': '30', 'transition': 'all 0.5s', 'border-color': '#F2001E'});
    }).on('mouseleave', function() {
        mainShop.stop(true).animate({'margin-left': '0', 'transition': 'all 0.5s', 'color': '#fff'});
        mainShopLine.stop(true).animate({'margin-left': '0', 'transition': 'all 0.5s', 'border-color': '#fff'});
    });
}

// mainIndicator
mainImageSlide(1, 5000, 'play');   
function mainImageSlide(first, speed, status) {
    var numSlide = $('#main section').length;
    var slideNow = 0;
    var slideNext = 0;
    var slidePrev = 0;
    var onPlaying = 0;
    var timerId = '';
    var timerSpeed = speed;
    var timerStatus = status;
    
    showSlide(first);
    if (timerStatus == 'play') {
        $('p.control a.play i').attr({'class': 'fa fa-pause'});
    } else {
        $('ul.indicator p.control a.play i').attr({'class': 'fa fa-play'});
    }

    $('ul.indicator li a').on('click', function() {
        var index = $('ul.indicator li').index($(this).parent());
        showSlide(index + 1);
    });
    $('p.control a.play').on('click', function() {
        if (timerStatus == 'play') {
            clearTimeout(timerId);
            timerStatus = 'stop';
            $(this).find('i').attr({'class': 'fa fa-play'});
        } else {
            timerStatus = 'play';
            timerId = setTimeout(function() {showSlide(slideNext);}, timerSpeed);
            $(this).find('i').attr({'class': 'fa fa-pause'});
        }
    });
                             
    function showSlide(n) {
        if (slideNow == n || onPlaying == 1) return false;/*지금페이지에 있는 indicator을 눌렀을때 깜박인다면 / 지금 이게 맞다면 하지마 / if 한줄이면 이렇게 써도됨*/
        clearTimeout(timerId);
        onPlaying = 1;
        $('#main section:eq(' + (slideNow - 1) + ')').stop().animate({'opacity': 0}, 500, function() {
            $(this).css({'display': 'none'});
            onPlaying = 0;
        });
        $('#main section:eq(' + (n - 1) + ')').css({'display': 'block', 'opacity': 0}).stop().animate({'opacity': 1});
        $('ul.indicator li').removeClass('on');
        $('ul.indicator li:eq(' + (n - 1) + ')').addClass('on');
        slideNow = n;
        slideNext = ((n + 1) > numSlide) ?  1 : (n + 1);
        slidePrev = ((n - 1) < 1) ? numSlide : (n - 1);
        if (timerStatus == 'play') {
            timerId = setTimeout/*Timeout: 한번만해라 / 이미지 따닥하는 형상이 없이*/
            (function() {showSlide(slideNext);}, timerSpeed);
        }
    }

}
    
// fixHeader
fixHeader();
function fixHeader() {
    var win = $('window');
    var header = $('header');
    var clone = $header.contents().clone();
    var cloneHtml = $('<div id="header-clone"></div>');
    var wrapHeight = $header.offset().top + $header.outerHeight();
    var scrollTop = $win.scrollTop();
    var section = $('section');
    
    header.each(function() {
        win.on('scroll', function() {
        cloneHTML.append($clone);    
        });
    })
    
}

    
    
    $win.on('scroll', function() {
        var scrollTop = $win.scrollTop();
        var section = $('section');
        var scroll = Math.floor(scrollTop);
        var offset = Math.floor(headerOffsetTop);
        
        $section.find('.scrollTop span').text(scroll);
        $section.find('.offset span').text(offset);
    });
    $cloneHtml.append($clone);
    $cloneHtml.appendTo('body');
    $win.on('scroll', $.throttle(1000/10, function() {
        if($win.scrollTop() > wrapHeight){
            $cloneHtml.addClass('on');
        } else {
            $cloneHtml.removeClass('on');
        }
    }));
    $win.trigger('scroll');    
    });
});
