$(document).ready(function () {
  var $buttons = $(".buttons button");
  var $bar = $(".progress-bar");
  const $container001 = $(".ghost_container001");
  const $speech001 = $(".speech001");
  const $container002 = $(".ghost_container002");
  const $speech002 = $(".speech002");

  // 로딩바 애니메이션 완료
  $bar.animate({ width: "100%" }, 2500, "linear", function () {
    setTimeout(function () {
      $buttons.prop("disabled", false).addClass("blink");
    }, 500);

    setTimeout(function () {
      $buttons.removeClass("blink");
    }, 2500);
  });
  
  // 유령001 이동
  function moveGhost001() {
    $container001.css({ transition: "transform 3s linear", transform: "translateX(300px) scaleX(1)" });

    setTimeout(() => {
      $container001.css({ transition: "transform 0.01s linear", transform: "translateX(300px) scaleX(-1)" });

      setTimeout(() => {
        $container001.css({ transition: "transform 3s linear", transform: "translateX(0) scaleX(-1)" });
      }, 50);
    }, 3000);

    setTimeout(() => {
      $container001.css({ transition: "transform 0.01s linear", transform: "translateX(0) scaleX(1)" });
    }, 6150);
  }

  // 유령001 말풍선
  function showSpeech001(text) {
    $speech001.text(text).fadeIn(500).delay(2000).fadeOut(500);
  }

  // 유령002 이동
  function moveGhost002() {
    $container002.css({ transition: "transform 3s linear", transform: "translateX(-300px) scaleX(1)" });

    setTimeout(() => {
      $container002.css({ transition: "transform 0.01s linear", transform: "translateX(-300px) scaleX(-1)" });

      setTimeout(() => {
        $container002.css({ transition: "transform 3s linear", transform: "translateX(0) scaleX(-1)" });
      }, 50);
    }, 4000);

    setTimeout(() => {
      $container002.css({ transition: "transform 0.01s linear", transform: "translateX(0) scaleX(1)" });
    }, 6550);
  }

  // 유령002 말풍선
  function showSpeech002(text) {
    $speech002.text(text).fadeIn(500).delay(2000).fadeOut(500);
  }

  // 사이트 들어오자마자 바로 실행
  moveGhost001();
  showSpeech001("안녕하세요!");
  moveGhost002();
  showSpeech002("반갑습니다👋");

  // 반복
  setInterval(() => { moveGhost001(); showSpeech001("대전 아쿠아리움으로 가자!🐟"); }, 7000);
  setInterval(() => { moveGhost002(); showSpeech002("🍔맛있는 wendy's에 어서오세요!"); }, 7000);

//두번째 서브페이지 연결하기
$('.hero .head ul li').eq(1).click(function(e){
  e.preventDefault();
  $('#wrap').fadeOut();
$('.indexBox').fadeIn();

})


});
