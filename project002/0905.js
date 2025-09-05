$(document).ready(function () {

    //menu슬라이더 이동설정
    let num = 0;
    $('.menu .right .m_btn ul li').eq(0).click(function(){
        if(num>0) num--;
        $('.menu .right .m_train ul').stop().animate({'left':`${-205*num}px`},1000 ,'easeInOutBack')
    })

    $('.menu .right .m_btn ul li').eq(1).click(function(){
        if(num<6) num++;
        $('.menu .right .m_train ul').stop().animate({'left':`${-205*num}px`},1000 ,'easeInOutBack')
    })

    // menu 백그라운드 펼쳐짐 효과 설정
    $(window).scroll(function () {
    let sc = $(this).scrollTop();
    let winH = $(window).height();
    let menuTop = $('.menu').offset().top;

    if (sc + winH > menuTop + 100) { 
        // 메뉴 섹션이 보이기 시작하면 실행
    $('.menu .menu_bg').addClass('on');
    } else {
        $('.menu .menu_bg').removeClass('on');
    }
});

    //menu 큰 햄버거 img 효과 설정(스크롤)
    $(window).scroll(function () {
    let sc = $(this).scrollTop();
    let winH = $(window).height();
    let imgTop = $('.menu').offset().top;

    if (sc + winH > imgTop + 100) {
    $('.menu .left .m_select img').addClass('on');
    } else {
    $('.menu .left .m_select img').removeClass('on'); 
    }
});

    //evntBox 글자 효과 설정(스크롤)
$(window).scroll(function(){
  let sc = $(window).scrollTop(); 
  
  $('.eventBox .line p').css('transform', `translateX(${-sc * 0.2}px)`);
  $('.eventBox .line2 p').css('transform', `translateX(${sc * 0.2}px)`);
});


    // reviewBox 리뷰 사진 움직이는 슬라이드 만들기
    let i = 0;
    setInterval(function () {
        i++;
        if (i == 6) i = 0;
        $('.reviewBox .pic li').eq(i - 1).css({ 'right': 0 }).stop().animate({ 'right': '100%' })
        $('.reviewBox .pic li').eq(i).css({ 'right': '-100%' }).stop().animate({ 'right': '0' })

        $('.reviewBox .slide li').removeClass('on');
        $(this).addClass('on')
    }, 3000);

    //3초에 한번씩 btn의 li를 자동으로 클릭해라
    let a = 0;
    setInterval(function () {
        a++;
        if (a == 6) a = 0;
        $('.reviewBox .slide li').eq(a).trigger('click')
    }, 2000)

    $(document).ready(function () {

    });
    
    // timeBox 패럴렉스 스크롤링 효과
    $(window).scroll(function () {
        let sc = $(this).scrollTop();
        let winH = $(window).height();
        let p_top = $('.valueBox .valueImg .line').offset().top - 200;

        
        if (sc < p_top) {
            $('.timeBox .lineBox ul li .conBox').removeClass('on');
            return; 
        }

        // 트리거 이후 스크롤 진행값
        let progress = sc - (p_top - 200);

        // 각 아이템에 순서대로 on 클래스 붙이기
        $('.timeBox .lineBox ul li').each(function () {
            let itemTop = $(this).offset().top;
            if (sc + winH * 0.7 >= itemTop) { 
                $(this).find('.conBox').addClass('on');
            } else {
                $(this).find('.conBox').removeClass('on');
            }
        });
    });

    
    //장바구니설정1##########################################################
    let click = 0;
    //장바구니 나왔다 들어가기
    $('.shopping .icon').click(function () {
        click++;
        if (click == 2) click = 0;
        console.log(click)

        if (click == 1) {
            $(this).parent('.shopping').addClass('on')
        }
        else {
            $(this).parent('.shopping').removeClass('on')
        }
    });

    //장바구니의 숫자올리기
    let cartNum = 0;
    $('.menu .cartIcon').click(function (e) {
        e.preventDefault()
        cartNum++;
        $('.icon span').text(cartNum)
    });

    // 첫번째 서브페이지 연결하기
    $('.hero .head .gnb li').eq(0).click(function(e){
        e.preventDefault();
        $('#wrap').fadeOut()
        $('#sub01').fadeIn()
    })

    // logo를 클릭했을때 메인페이지 나타나기
    $('.hero .head .top .logo').click(function(e){
    e.preventDefault();
    $('#sub01').fadeOut()
    $('#wrap').fadeIn()
})

    // 로그인을 클릭했을때 로그인창 나타나기
    $('.hero .head .top .util li').eq(1).click(function(e){
    e.preventDefault();
    $('#wrap').fadeOut()
    $('.loginBox').fadeIn()

    })

    // 로고 클릭했을때 메인페이지 나타나기
    $('.hero .head .top .logo').click(function(e){
    e.preventDefault();
    $('.loginBox').fadeOut()
    $('#wrap').fadeIn()

    })
    


})
