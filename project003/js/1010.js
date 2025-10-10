
$(document).ready(function () {

    //landingVideo 설정
    setTimeout(() => {
                $('#loadingScreen').fadeOut(1000);
            }, 3000);


            let oscarClicks = 0;
            let landoClicks = 0;

            // 배경 파티클 생성
            function createBgParticles() {
                setInterval(() => {
                    const particle = $('<div class="bg-particle"></div>');
                    particle.css({
                        left: Math.random() * 100 + '%',
                        animationDuration: (Math.random() * 4 + 4) + 's',
                        animationDelay: Math.random() * 2 + 's'
                    });
                    $('#bgAnimation').append(particle);
                    
                    setTimeout(() => {
                        particle.remove();
                    }, 8000);
                }, 500);
            }

            // 클릭 파티클 효과
            function createClickParticles(x, y, isLando = false) {
                const colors = isLando ? ['#00D4AA', '#00FFB7', '#7FFFD4'] : ['#FF8000', '#FFB347', '#FFA500'];
                
                for (let i = 0; i < 12; i++) {
                    const particle = $('<div class="particle"></div>');
                    const angle = (i / 12) * 2 * Math.PI;
                    const distance = 100 + Math.random() * 50;
                    
                    particle.css({
                        left: x + 'px',
                        top: y + 'px',
                        background: colors[Math.floor(Math.random() * colors.length)],
                        '--dx': Math.cos(angle) * distance + 'px',
                        '--dy': Math.sin(angle) * distance + 'px'
                    });
                    
                    if (isLando) particle.addClass('lando-particle');
                    
                    $('#clickEffect').append(particle);
                    
                    setTimeout(() => {
                        particle.remove();
                    }, 1000);
                }
            }

            // 사운드 웨이브 효과
            function createSoundWave(element, isLando = false) {
                const wave = $('<div class="sound-wave"></div>');
                if (isLando) wave.addClass('lando-wave');
                
                const rect = element.getBoundingClientRect();
                wave.css({
                    left: (rect.left + rect.width / 2 - 25) + 'px',
                    top: (rect.top + rect.height / 2 - 25) + 'px'
                });
                
                $('body').append(wave);
                
                setTimeout(() => {
                    wave.remove();
                }, 1000);
            }

            // state 카운터 애니메이션
            function animateCounter(element) {
                const target = parseInt(element.data('count'));
                const duration = 2000;
                const increment = target / (duration / 16);
                let current = 0;
                
                element.addClass('counting');
                
                const timer = setInterval(() => {
                    current += increment;
                    if (current >= target) {
                        current = target;
                        clearInterval(timer);
                        element.removeClass('counting');
                    }
                    element.text(Math.floor(current));
                }, 16);
            }

            // 오스카 클릭 이벤트
            $('.driverIntro .oscarIntro .man').click(function (e) {
                oscarClicks++;
                
                // 효과들 추가
                createClickParticles(e.pageX, e.pageY, false);
                createSoundWave(this, false);
                
                if (oscarClicks % 2 !== 0) {
                    $('.driverIntro').addClass('oscar-active').removeClass('lando-active');
                    $('.driverIntro .oscarIntro').css('left', '50%');
                    $('.driverIntro .landoIntro').css('right', '-100%');
                    $('.driverTxt .oscarTxt').addClass('on');
                    $('.driverTxt .landoTxt').removeClass('on');
                    $('.header').addClass('on');
                    
                    // 스탯 카운터 애니메이션
                    setTimeout(() => {
                        $('.oscarTxt .stat-counter').each(function() {
                            animateCounter($(this));
                        });
                    }, 800);
                } else {
                    $('.driverIntro').removeClass('oscar-active');
                    $('.driverIntro .oscarIntro').css('left', '0');
                    $('.driverIntro .landoIntro').css('right', '0');
                    $('.driverTxt .oscarTxt').removeClass('on');
                    $('.header').removeClass('on');
                }
            });

            // 랜도 클릭 이벤트
            $('.driverIntro .landoIntro .man').click(function (e) {
                landoClicks++;
                
                // 효과들 추가
                createClickParticles(e.pageX, e.pageY, true);
                createSoundWave(this, true);
                
                if (landoClicks % 2 !== 0) {
                    $('.driverIntro').addClass('lando-active').removeClass('oscar-active');
                    $('.driverIntro .landoIntro').css('right', '50%');
                    $('.driverIntro .oscarIntro').css('left', '-100%');
                    $('.driverTxt .landoTxt').addClass('on');
                    $('.driverTxt .oscarTxt').removeClass('on');
                    $('.header').addClass('on');
                    
                    // 스탯 카운터 애니메이션
                    setTimeout(() => {
                        $('.landoTxt .stat-counter').each(function() {
                            animateCounter($(this));
                        });
                    }, 800);
                } else {
                    $('.driverIntro').removeClass('lando-active');
                    $('.driverIntro .landoIntro').css('right', '0');
                    $('.driverIntro .oscarIntro').css('left', '0');
                    $('.driverTxt .landoTxt').removeClass('on');
                    $('.header').removeClass('on');
                }
            });

            // 키보드 ESC로 닫기
            $(document).keydown(function(e) {
                if (e.which === 27) { // ESC 키
                    $('.close-btn').trigger('click');
                }
            });

            // 배경 파티클 시작
            createBgParticles();



//비디오 섹션 
  const $youtubeSlider = $('#youtubeSlider');
            const $upBtn = $('.upBtn');
            const $downBtn = $('.downBtn');
            const $indicators = $('#indicators');
            const $progress = $('#progress');
            const $currentSlide = $('#currentSlide');
            const $totalSlides = $('#totalSlides');
            
            const originalItems = $('.youtube > div').length;
            let currentIndex = 0;
            let totalItems = originalItems;
            let isAnimating = false;
            
            // 무한 슬라이더를 위해 아이템 복제
            function cloneItems() {
                const $items = $('.youtube > div');
                
                // 앞쪽에 마지막 아이템 복제
                $items.slice(-1).clone().prependTo($youtubeSlider);
                
                // 뒤쪽에 첫 번째 아이템 복제
                $items.slice(0, 1).clone().appendTo($youtubeSlider);
                
                // 현재 인덱스 조정
                currentIndex = 1;
                
                // 초기 위치 설정
                $youtubeSlider.addClass('no-transition');
                updateSliderPosition();
                setTimeout(() => {
                    $youtubeSlider.removeClass('no-transition');
                }, 50);
            }
            
            // 실제 인덱스 계산
            function getRealIndex() {
                if (currentIndex === 0) return originalItems - 1;
                if (currentIndex === totalItems + 1) return 0;
                return currentIndex - 1;
            }
            
            // 진행 바 업데이트
            function updateProgress() {
                const realIndex = getRealIndex();
                const progressWidth = ((realIndex + 1) / originalItems) * 100;
                $progress.css('width', progressWidth + '%');
            }
            
            // 슬라이드 카운터 업데이트
            function updateCounter() {
                const realIndex = getRealIndex();
                $currentSlide.text(realIndex + 1);
                $totalSlides.text(originalItems);
            }
            
            // 슬라이더 위치 업데이트
            function updateSliderPosition() {
                const translateY = -currentIndex * 100; // 100vh씩 이동
                $youtubeSlider.css('transform', `translateY(${translateY}vh)`);
            }
            
            // 모든 비디오 일시정지
            function pauseAllVideos() {
                $('.youtube video').each(function() {
                    this.pause();
                });
            }
            
            // 현재 비디오 재생
            function playCurrentVideo() {
                const realIndex = getRealIndex();
                const $currentVideo = $('.youtube div').eq(realIndex + 1).find('video'); // +1은 복제된 아이템 때문
                if ($currentVideo.length > 0) {
                    $currentVideo[0].play();
                }
            }
            
            // 슬라이더 업데이트
            function updateSlider() {
                updateSliderPosition();
                // updateIndicators();
                
                // 복제된 아이템에서는 카운터 업데이트를 하지 않음
                if (currentIndex !== 0 && currentIndex !== originalItems + 1) {
                    updateProgress();
                    updateCounter();
                }
                
                pauseAllVideos();
                setTimeout(playCurrentVideo, 600); // 애니메이션 완료 후 재생
            }
            
            // 무한 루프 처리
            function handleInfiniteLoop() {
                if (currentIndex === 0) {
                    // 복제된 마지막 아이템에 있을 때 -> 실제 마지막 아이템으로 이동
                    setTimeout(() => {
                        $youtubeSlider.addClass('no-transition');
                        currentIndex = originalItems;
                        updateSliderPosition();
                        setTimeout(() => {
                            $youtubeSlider.removeClass('no-transition');
                            updateProgress();
                            updateCounter();
                            isAnimating = false;
                        }, 50);
                    }, 600);
                } else if (currentIndex === originalItems + 1) {
                    // 복제된 첫 번째 아이템에 있을 때 -> 실제 첫 번째 아이템으로 이동
                    setTimeout(() => {
                        $youtubeSlider.addClass('no-transition');
                        currentIndex = 1;
                        updateSliderPosition();
                        setTimeout(() => {
                            $youtubeSlider.removeClass('no-transition');
                            updateProgress();
                            updateCounter();
                            isAnimating = false;
                        }, 50);
                    }, 600);
                } else {
                    // 일반적인 경우
                    setTimeout(() => {
                        isAnimating = false;
                    }, 600);
                }
            }
            
            // 위로 슬라이드
            function slideUp() {
                if (isAnimating) return;
                isAnimating = true;
                currentIndex--;
                updateSlider();
                handleInfiniteLoop();
            }
            
            // 아래로 슬라이드
            function slideDown() {
                if (isAnimating) return;
                isAnimating = true;
                currentIndex++;
                updateSlider();
                handleInfiniteLoop();
            }
            
            // 특정 슬라이드로 이동
            function goToSlide(index) {
                if (isAnimating) return;
                isAnimating = true;
                currentIndex = index + 1;
                updateSlider();
                setTimeout(() => {
                    isAnimating = false;
                }, 600);
            }
            
            // 이벤트 리스너
            $upBtn.click(slideUp);
            $downBtn.click(slideDown);
            
            // 키보드 컨트롤
            $(document).keydown(function(e) {
                switch(e.which) {
                    case 38: // 위 화살표
                        e.preventDefault();
                        slideUp();
                        break;
                    case 40: // 아래 화살표
                        e.preventDefault();
                        slideDown();
                        break;
                }
            });
            
            // 마우스 휠 이벤트 (비디오 박스 위에서만)
            $('.youtube video').on('wheel', function(e) {
                e.preventDefault();
                e.stopPropagation(); // 이벤트 버블링 방지
                if (e.originalEvent.deltaY > 0) {
                    slideDown();
                } else {
                    slideUp();
                }
            });
            
            // 터치 이벤트
            let startY = 0;
            let endY = 0;
            
            $('.video').on('touchstart', function(e) {
                startY = e.originalEvent.touches[0].clientY;
            });
            
            $('.video').on('touchend', function(e) {
                endY = e.originalEvent.changedTouches[0].clientY;
                const difference = startY - endY;
                
                if (Math.abs(difference) > 50) {
                    if (difference > 0) {
                        slideDown();
                    } else {
                        slideUp();
                    }
                }
            });
            
            // 초기화
            cloneItems();
            totalItems = $('.youtube > div').length;
            // createIndicators();
            updateSlider();
            
            // 첫 번째 비디오 자동 재생
            setTimeout(() => {
                playCurrentVideo();
            }, 100);


// 모든 gnb 리스트 항목에 대한 클릭 이벤트
$('.header .gnb li').click(function(e){
    e.preventDefault();
    
    // 현재 클릭된 요소의 인덱스 확인
    const clickedIndex = $(this).index();

    // 모든 컨텐츠 페이지 숨기기
    $('.wrap, .sub001, .sub002, .sub003').hide();
    
    // .sub002에 있는 자동차의 .on 클래스 제거
    $('.sub002 .car').removeClass('active');

    // 인덱스에 따라 해당하는 페이지를 보여주고 애니메이션 실행
    switch (clickedIndex) {
        case 0:
            // Home 클릭 시 .wrap 보여주기
            $('.wrap').fadeIn();
            break;
        case 1:
            // Driver 클릭 시 .sub001 보여주기
            $('.sub001').fadeIn();
            break;
        case 2:
            // Article 클릭 시 .sub002 보여주고 자동차 애니메이션 시작
            $('.sub002').fadeIn(function() {
                $('.sub002 .car').addClass('active');
            });
            break;
        case 3:
            // Video 클릭 시 .sub003 보여주기
            $('.sub003').fadeIn();
            break;
    }
});

// 자동차 이미지 자체에 대한 클릭 핸들러
$('.sub002 .car').click(function(e){
    e.preventDefault();
    $(this).addClass('on');
});

//.gnb li 클릭하면 바뀌는 배경값 설정
$('.gnb li').click(function(e) {
    // <a> 태그의 기본 동작(페이지 이동)을 막음
    e.preventDefault();

    // 모든 .gnb li에서 'on' 클래스를 제거
    $('.gnb li').removeClass('on');

    // 현재 클릭된 li에만 'on' 클래스를 추가
    $(this).addClass('on');
});

// .logoLeft와 .logoRight를 클릭했을 때
$('.topLogo .logoLeft, .topLogo .logoRight').click(function(e) {
    e.preventDefault();
    
    // 다른 모든 페이지를 숨김
    $('.sub001, .sub002, .sub003').fadeOut();
    
    // .wrap 요소를 나타나게
    $('.wrap').fadeIn();
});

});