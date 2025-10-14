$(function () {
    const $buttons = $(".buttons button");
    const $bar = $(".progress-bar");
    const $container001 = $(".ghost_container001");
    const $speech001 = $(".speech001");
    const $container002 = $(".ghost_container002");
    const $speech002 = $(".speech002");

    // 로딩바 애니메이션
    $bar.animate({ width: "100%" }, 2500, "linear", function () {
        setTimeout(() => $buttons.prop("disabled", false).addClass("blink"), 500);
        setTimeout(() => $buttons.removeClass("blink"), 2500);
    });

    // 유령001 이동
    function moveGhost001() {
        $container001.css({
            transition: "transform 3s linear",
            transform: "translateX(300px) scaleX(1)"
        });

        setTimeout(() => {
            $container001.css({
                transition: "transform 0.01s linear",
                transform: "translateX(300px) scaleX(-1)"
            });

            setTimeout(() => {
                $container001.css({
                    transition: "transform 3s linear",
                    transform: "translateX(0) scaleX(-1)"
                });
            }, 50);
        }, 3000);

        setTimeout(() => {
            $container001.css({
                transition: "transform 0.01s linear",
                transform: "translateX(0) scaleX(1)"
            });
        }, 6150);
    }

    // 유령001 말풍선
    function showSpeech001(text) {
        $speech001.stop(true, true).text(text).fadeIn(500).delay(2000).fadeOut(500);
    }

    // 유령002 이동
    function moveGhost002() {
        $container002.css({
            transition: "transform 3s linear",
            transform: "translateX(-300px) scaleX(1)"
        });

        setTimeout(() => {
            $container002.css({
                transition: "transform 0.01s linear",
                transform: "translateX(-300px) scaleX(-1)"
            });

            setTimeout(() => {
                $container002.css({
                    transition: "transform 3s linear",
                    transform: "translateX(0) scaleX(-1)"
                });
            }, 50);
        }, 4000);

        setTimeout(() => {
            $container002.css({
                transition: "transform 0.01s linear",
                transform: "translateX(0) scaleX(1)"
            });
        }, 6550);
    }

    // 유령002 말풍선
    function showSpeech002(text) {
        $speech002.stop(true, true).text(text).fadeIn(500).delay(2000).fadeOut(500);
    }

    // 초기 실행
    moveGhost001();
    showSpeech001("안녕하세요!");
    moveGhost002();
    showSpeech002("반갑습니다👋");

    // 반복
    setInterval(() => {
        moveGhost001();
        showSpeech001("대전 아쿠아리움으로 가자!🐟");
    }, 8000);

    setInterval(() => {
        moveGhost002();
        showSpeech002("🍔맛있는 wendy's에 어서오세요!");
    }, 8500);

    // Landing Page 버튼
    $buttons.eq(0).click(function () {
        $("#wrap").fadeOut(500, function () {
            $(this).css('display', 'none');
        });
        $(".header").addClass("show");
        setTimeout(() => {
            $(".introduce").css('display', 'block').hide().fadeIn(500);
            initializeSkillBars();
        }, 500);
    });

    $buttons.eq(1).click(function () {
        $("#wrap").fadeOut(500, function () {
            $(this).css('display', 'none');
        });
        $(".header").addClass("show");
        setTimeout(() => {
            $(".projectBox").css('display', 'block').hide().fadeIn(500);
        }, 500);
    });

    // Header Navigation
    $(".header .nav-btn.home").click(function () {
        $(".introduce, .projectBox").fadeOut(500, function () {
            $(this).css('display', 'none');
        });
        setTimeout(() => {
            $(".header").removeClass("show");
            $("#wrap").css('display', 'block').hide().fadeIn(500);
        }, 500);
    });

    $(".header .nav-btn.about").click(function () {
        $("#wrap, .projectBox").fadeOut(500, function () {
            $(this).css('display', 'none');
        });
        $(".header").addClass("show");
        setTimeout(() => {
            $(".introduce").css('display', 'block').hide().fadeIn(500);
            initializeSkillBars();
        }, 500);
    });

    $(".header .nav-btn.project").click(function () {
        $("#wrap, .introduce").fadeOut(500, function () {
            $(this).css('display', 'none');
        });
        $(".header").addClass("show");
        setTimeout(() => {
            $(".projectBox").css('display', 'block').hide().fadeIn(500);
        }, 500);
    });

    // %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
    // 🚨 로고(.logo) 클릭 이벤트 추가
    $(".header .logo").click(function () {
        // 1. 현재 보이는 섹션(.introduce, .projectBox)을 페이드 아웃하여 숨깁니다.
        $(".introduce, .projectBox").fadeOut(500, function () {
            $(this).css('display', 'none');
        });

        // 2. 0.5초(500ms) 후 (모든 것이 숨겨진 후) HOME 화면으로 전환합니다.
        setTimeout(() => {
            // 헤더의 'show' 클래스를 제거하여 헤더를 페이드 아웃/숨깁니다.
            $(".header").removeClass("show");

            // #wrap 섹션을 보이게 설정하고, 페이드 인 효과를 줍니다.
            $("#wrap").css('display', 'block').hide().fadeIn(500);
        }, 500);
    });

    // &&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&

    // Skill Bar 애니메이션
    function initializeSkillBars() {
        $(".skill-bar").each(function () {
            const percent = $(this).data("percent") || 0;
            $(this).css("width", "0%");
            setTimeout(() => $(this).css("width", percent + "%"), 300);
        });
    }

    // 프로젝트 데이터
    const projectData = {
        1: {
            title: "Daejeon Aquarium",
            headerTitle: "Daejeon Aquarium",
            subtitle: "웹사이트 디자인 리뉴얼",
            description: '아쿠아리움에서 <strong>사용자가 수중을 거니는 몰입감을</strong><br>느낄 수 있게 재설계했습니다. 직관적인 정보 구조를 통해 누구나 쉽고<br>즐겁게 사이트를 탐험할 수 있습니다.',
            keywords: ["🌊", "🐠", "💙"],
            colors: ["#092170", "#1C43BE", "#FFDA00"],
            colorCodes: ["#092170", "#1C43BE", "#FFDA00"],
            image: "img/project001_mockup.png",
            mainColor: "#87CEEB",
            conceptImage: "img/project1_preview.png",
            siteUrl: "https://jooyeonglim.github.io/portfolio2025/project001/"
        },
        2: {
            title: "Wendy's",
            headerTitle: "Wendy's",
            subtitle: "브랜드 웹사이트 리디자인",
            description: "웬디스의 신선함과 활기찬 브랜드 이미지를<br><strong>현대적이고 직관적인 웹 경험으로</strong> 재구성했습니다.<br>사용자 친화적인 인터페이스로 즐거운 주문 경험을 제공합니다.",
            keywords: ["🍔", "🍟", "🥤"],
            colors: ["#E2203D", "#F4B618", "#199FDA"],
            colorCodes: ["#E2203D", "#F4B618", "#199FDA"],
            image: "img/project002_mockup.png",
            mainColor: "#E2203D",
            conceptImage: "img/project2_preview.png",
            siteUrl: "https://jooyeonglim.github.io/portfolio2025/project002/"
        },
        3: {
            title: "McLaren",
            headerTitle: "McLaren",
            subtitle: "F1 드라이버 인물형 웹사이트",
            description: "맥라렌의 <strong>역동적인 퍼포먼스와 럭셔리함을</strong><br>웹에서 경험할 수 있도록 디자인했습니다.<br>혁신적인 기술과 우아한 디자인이 조화를 이룹니다.",
            keywords: ["🏎️", "⚡", "🏆"],
            colors: ["#FF8000", "#222", "#C1F406"],
            colorCodes: ["#FF8000", "#222", "#C1F406"],
            image: "img/project003_mockup.png",
            mainColor: "#FF8000",
            conceptImage: "img/project3_preview.png",
            siteUrl: "https://jooyeonglim.github.io/portfolio2025/project003/"
        }
    };

    // 프로젝트 카드 클릭
    $(".project-card").click(function () {
        const projectNum = $(this).data("project");
        const data = projectData[projectNum];

        if (!data) return;

        $(".project-card").removeClass("active");
        $(this).addClass("active");

        $(".project-header-title").text(data.headerTitle);
        $(".project-title").text(data.subtitle);
        $(".project-description").html(data.description);

        // 🔹 카드 헤더 색상 변경 (두 개 동시 적용)
        $(".project-detail-card .card-header, .keyword-card .card-header")
            .css("background-color", data.mainColor)
            .css("transition", "background-color 0.4s ease");

        // ✅ 이미지 교체 (fade 효과 포함)
        $(".project-image")
            .fadeOut(200, function () {
                $(this)
                    .css("background-image", `url(${data.image})`)
                    .fadeIn(300);
            });

        $(".keyword-box").each(function (index) {
            $(this).text(data.keywords[index] || "");
        });

        $(".color-box").each(function (index) {
            $(this).css("background-color", data.colors[index] || "");
            $(this).find(".color-code").text(data.colorCodes[index] || "");
        });
    });

    // // 팝업 열기/닫기 로직 추가
    // $(document).ready(function () {
    //     // 팝업 열기: 첫 번째 버튼(.project-btn:first-child) 클릭 시
    //     $(".project-buttons").on("click", ".project-btn:first-child", function () {
    //         // 현재 활성화된 프로젝트 카드에서 data-project 값을 가져옴
    //         const activeProjectNum = $(".project-card.active").data("project");
    //         const data = projectData[activeProjectNum];

    //         if (!data || !data.conceptImage) return; // 데이터 또는 이미지 경로가 없으면 중지

    //         // 팝업 이미지 설정 및 팝업 표시
    //         $("#modalImage").attr("src", data.conceptImage);
    //         $("#projectModal").fadeIn(300);

    //         // 스크롤 방지
    //         $("html").css("overflow", "hidden");
    //     });

    //     // 팝업 닫기: 닫기 버튼(.close-modal-btn) 클릭 시
    //     $(".close-modal-btn").click(function () {
    //         $("#projectModal").fadeOut(300);
    //         // 스크롤 허용
    //         $("html").css("overflow", "auto");
    //     });

    //     // 팝업 닫기: 배경(.modal-overlay) 클릭 시
    //     $("#projectModal").click(function (e) {
    //         // 모달 콘텐츠 영역이 아닌 배경을 클릭했을 때만 닫기
    //         if ($(e.target).is(".modal-overlay")) {
    //             $("#projectModal").fadeOut(300);
    //             // 스크롤 허용
    //             $("html").css("overflow", "auto");
    //         }
    //     });

    //     // 팝업 닫기: ESC 키 입력 시
    //     $(document).keydown(function (e) {
    //         if (e.key === "Escape" && $("#projectModal").is(":visible")) {
    //             $("#projectModal").fadeOut(300);
    //             $("html").css("overflow", "auto");
    //         }
    //     });
    // });
    // 팝업 열기/닫기 로직 추가
    $(document).ready(function () {
        // 팝업 열기: 첫 번째 버튼(.project-btn:first-child) 클릭 시
        $(".project-buttons").on("click", ".project-btn:first-child", function () {
            const activeProjectNum = $(".project-card.active").data("project");
            const data = projectData[activeProjectNum];

            if (!data || !data.conceptImage) return;

            // 팝업 이미지 설정
            $("#modalImage").attr("src", data.conceptImage);

            // 🚨 수정된 팝업 열기 로직
            $("#projectModal")
                .css("opacity", 0)           // 투명도를 0으로 설정 (시작 지점)
                .css("display", "flex")      // display: flex를 강제 적용하여 중앙 정렬 활성화
                .animate({ opacity: 1 }, 300); // opacity만 애니메이션하여 fade-in 효과 구현

            // 스크롤 방지
            $("html").css("overflow", "hidden");
        });

        // 팝업 닫기: 닫기 버튼(.close-modal-btn) 클릭 시
        $(".close-modal-btn").click(function () {
            // 🚨 수정된 팝업 닫기 로직
            $("#projectModal").animate({ opacity: 0 }, 300, function () {
                $(this).css("display", "none"); // 애니메이션 완료 후 display: none으로 완전히 숨김
            });

            // 스크롤 허용
            $("html").css("overflow", "auto");
        });

        // 팝업 닫기: 배경(.modal-overlay) 클릭 시
        $("#projectModal").click(function (e) {
            // 정확한 오버레이 배경 클릭 확인
            if ($(e.target).is("#projectModal.modal-overlay")) {
                // 🚨 수정된 팝업 닫기 로직
                $("#projectModal").animate({ opacity: 0 }, 300, function () {
                    $(this).css("display", "none");
                });
                // 스크롤 허용
                $("html").css("overflow", "auto");
            }
        });

        // 팝업 닫기: ESC 키 입력 시
        $(document).keydown(function (e) {
            if (e.key === "Escape" && $("#projectModal").css("display") === "flex") {
                // 🚨 수정된 팝업 닫기 로직
                $("#projectModal").animate({ opacity: 0 }, 300, function () {
                    $(this).css("display", "none");
                });
                $("html").css("overflow", "auto");
            }
        });
    });
    $(document).ready(function () {

        // ... (기존의 첫 번째 버튼 - 컨셉뷰 팝업 열기 로직) ...

        // 🚨 두 번째 버튼 클릭 이벤트: 지정된 웹사이트로 이동
        $(".project-buttons").on("click", ".project-btn:last-child", function () {
            // 현재 활성화된 프로젝트 카드에서 data-project 값을 가져옴
            const activeProjectNum = $(".project-card.active").data("project");
            const data = projectData[activeProjectNum];

            if (data && data.siteUrl) {
                // 새 창에서 웹사이트를 엽니다.
                window.open(data.siteUrl, '_blank');
            } else {
                console.warn("Project URL not found for project: " + activeProjectNum);
            }
        });
    });


});