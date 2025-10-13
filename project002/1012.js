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

    
    //장바구니 설정 ##########################################################
    let click = 0;
    let cart = []; // 장바구니 배열

    // 메뉴 데이터 (제품명, 가격, 이미지)
    const menuData = {
        '베이컨버거': { price: 8900, img: 'img/menu/menu_mini001.png' },
        '주니어 베이컨버거': { price: 6500, img: 'img/menu/menu_mini002.png' },
        '트리플 데이브 버거': { price: 12900, img: 'img/menu/menu_mini003.png' },
        '주니어 치즈버거': { price: 5900, img: 'img/menu/menu_mini004.png' },
        '스파이시 치킨버거': { price: 7900, img: 'img/menu/menu_mini005.png' },
        '소시지& 치즈머핀': { price: 4900, img: 'img/menu/menu_mini006.png' },
        '데이브 버거': { price: 9900, img: 'img/menu/menu_main001.png' }
    };

    //장바구니 나왔다 들어가기
    $('.shopping .icon').click(function () {
        click++;
        if (click == 2) click = 0;

        if (click == 1) {
            $(this).parent('.shopping').addClass('on')
        }
        else {
            $(this).parent('.shopping').removeClass('on')
        }
    });

    // 장바구니에 상품 추가
    $('.menu .cartIcon').click(function (e) {
        e.preventDefault();
        
        // 클릭한 아이콘의 상품명 찾기
        let productName = $(this).siblings('p').text();
        
        // 메뉴 데이터에서 해당 상품 정보 가져오기
        if (menuData[productName]) {
            addToCart(productName, menuData[productName].price, menuData[productName].img);
        }
    });

    // 장바구니에 아이템 추가 함수
    function addToCart(name, price, img) {
        // 이미 장바구니에 있는 상품인지 확인
        let existingItem = cart.find(item => item.name === name);
        
        if (existingItem) {
            // 이미 있으면 수량만 증가
            existingItem.quantity++;
        } else {
            // 없으면 새로 추가
            cart.push({
                name: name,
                price: price,
                img: img,
                quantity: 1
            });
        }
        
        updateCartDisplay();
    }

    // 장바구니 화면 업데이트
    function updateCartDisplay() {
        let cartItemsHtml = '';
        let totalPrice = 0;
        let deliveryFee = 0;
        
        if (cart.length === 0) {
            // 장바구니가 비어있을 때
            cartItemsHtml = `
                <div class="empty_cart">
                    <i class="fa-solid fa-basket-shopping"></i>
                    <p>장바구니가 비어있습니다</p>
                    <small>상품을 담아보세요!</small>
                </div>
            `;
        } else {
            // 장바구니에 상품이 있을 때
            cart.forEach((item, index) => {
                let itemTotal = item.price * item.quantity;
                totalPrice += itemTotal;
                
                cartItemsHtml += `
                    <div class="cart_item" data-index="${index}">
                        <div class="product_info">
                            <img src="${item.img}" alt="${item.name}">
                            <span class="product_name">${item.name}</span>
                        </div>
                        <span class="option">기본</span>
                        <span class="price">${item.price.toLocaleString()}원</span>
                        <div class="quantity">
                            <button class="qty_minus">-</button>
                            <span>${item.quantity}</span>
                            <button class="qty_plus">+</button>
                        </div>
                        <button class="remove_item">×</button>
                    </div>
                `;
            });
            
            // 배송비 계산 (3만원 이상 무료)
            deliveryFee = totalPrice >= 30000 ? 0 : 3000;
        }
        
        // HTML 업데이트
        $('#cart-items').html(cartItemsHtml);
        $('#cart-count').text(cart.length);
        $('#product-total').text(totalPrice.toLocaleString());
        $('#delivery-fee').text(deliveryFee.toLocaleString());
        $('#order-total').text((totalPrice + deliveryFee).toLocaleString());
        
        // 수량 조절 버튼 이벤트
        $('.qty_plus').click(function() {
            let index = $(this).closest('.cart_item').data('index');
            cart[index].quantity++;
            updateCartDisplay();
        });
        
        $('.qty_minus').click(function() {
            let index = $(this).closest('.cart_item').data('index');
            if (cart[index].quantity > 1) {
                cart[index].quantity--;
                updateCartDisplay();
            }
        });
        
        // 삭제 버튼 이벤트
        $('.remove_item').click(function() {
            let index = $(this).closest('.cart_item').data('index');
            cart.splice(index, 1);
            updateCartDisplay();
        });
    }

    // 주문하기 버튼
    $('.order_btn').click(function() {
        if (cart.length === 0) {
            alert('장바구니에 상품을 담아주세요!');
            return;
        }
        // 장바구니 닫기
        $('.shopping').removeClass('on');
        click = 0;
        // 로그인 페이지로 이동
        $('#wrap').fadeOut();
        $('.loginBox').fadeIn();
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

    // 랜딩 슬라이드 기능
    let slideIndex = 0;
    
    // 슬라이드 데이터
    const slides = [
        {
            bgImg: 'img/landing/landing_bg_big.jpg',
            centerImg: 'img/landing/landing_combo.png',
            title: "Wendy's App 출시!",
            subtitle: '새로운 시즌!',
            desc: '인기 메뉴를 할인된 가격에 구매 하고 무료로 받을 수 있는 다양한 방법을 제공합니다.',
            number: '01'
        },
        {
            bgImg: 'img/landing/landing002_bg_big.jpg',
            centerImg: 'img/landing/landing002_combo.png',
            title: '신선한 재료로 만든<br>프리미엄 버거!',
            subtitle: '최고의 맛!',
            desc: '냉동되지 않은 신선한 소고기와 엄선된 재료로 만든 웬디스만의 특별한 버거를 경험하세요.',
            number: '02'
        },
        {
            bgImg: 'img/landing/landing003_bg_big.jpg',
            centerImg: 'img/landing/landing003_combo.png',
            title: '다양한 메뉴와<br>특별한 콤보!',
            subtitle: '스페셜 오퍼!',
            desc: '버거, 샐러드, 사이드 메뉴까지! 웬디스에서 당신만의 완벽한 조합을 찾아보세요.',
            number: '03'
        }
    ];

    // 슬라이드 변경 함수
    function changeSlide(direction) {
        // 방향에 따라 인덱스 변경
        if (direction === 'next') {
            slideIndex++;
            if (slideIndex >= slides.length) slideIndex = 0;
        } else {
            slideIndex--;
            if (slideIndex < 0) slideIndex = slides.length - 1;
        }

        // 현재 슬라이드 데이터
        const currentSlide = slides[slideIndex];
        const $bigImg = $('.landing .bigImg');

        // 다음 이미지 미리 로드
        const img = new Image();
        img.src = currentSlide.bgImg;
        
        // 이미지 로드 완료 후 fadeOut/In
        img.onload = function() {
            $bigImg.stop().fadeOut(100, function() {
                $(this).css('background-image', `url(${currentSlide.bgImg})`);
                $(this).fadeIn(100);
            });
        };
        
        // 혹시 이미지 로드 실패해도 진행
        img.onerror = function() {
            $bigImg.stop().fadeOut(100, function() {
                $(this).css('background-image', `url(${currentSlide.bgImg})`);
                $(this).fadeIn(100);
            });
        };

        // 텍스트 내용 - 아래로 내려가는 효과
        $('.landing .txtInner').stop().animate({
            bottom: '-100%',
            opacity: 0
        }, 600, function() {
            // 텍스트 내용 변경
            $('.landing .txtInner p:first-child').text(currentSlide.subtitle);
            $('.landing .txtInner h2').html(currentSlide.title);
            $('.landing .txtInner p:nth-child(3)').text(currentSlide.desc);
            
            // 위치 초기화 (위에서)
            $(this).css('bottom', '100%');
            // 다시 제자리로
            $(this).animate({
                bottom: '0',
                opacity: 1
            }, 600);
        });

        // 중앙 이미지 - 페이드 효과
        $('.landing .center_b').fadeOut(400, function() {
            $('.landing .center_b img').attr('src', currentSlide.centerImg);
            $(this).fadeIn(400);
        });

        // 번호 변경
        $('.landing .landing_num p').fadeOut(300, function() {
            $(this).text(currentSlide.number).fadeIn(300);
        });
    }

    // 버튼 클릭 이벤트
    $('.nextBtn').click(function(e) {
        e.preventDefault();
        changeSlide('next');
    });

    $('.prevBtn').click(function(e) {
        e.preventDefault();
        changeSlide('prev');
    });

    // 자동 슬라이드
    // setInterval(function() {
    //     changeSlide('next');
    // }, 3000);
});