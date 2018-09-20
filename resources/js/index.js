// 페이지가 로딩 되었을 때 실행할 기능
$(document).ready(function () {
  setSlidingLink();
  setNaniLinkAnimation();
  //parallax
  var controller = new ScrollMagic.Controller();
  //build scene
  var scene = new ScrollMagic.Scene({
      triggerElement: "#trigger2",
      duration: 400
    })
    // animate color and top border in relation to scroll position
    .setTween("#animate2", {
      backgroundColor: "blue",
      scale: 0.7
    }) // the tween durtion can be omitted and defaults to 1
    .addTo(controller);

  //build parallax
  var parallaxTl = new TimelineMax();
  parallaxTl
    .from('.content-parall', 1, {
      y: '300%',
      ease: Power0.easeNone
    }, 0.3)
    .from('.bcg', 1, {
      scale: '2',
      ease: Power0.easeNone
    }, 0);

  var slideParallaxScene = new ScrollMagic.Scene({
      triggerElement: '.bcg-parallax',
      triggerHook: 1,
      duration: '100%'
    })
    .setTween(parallaxTl)
    .addTo(controller);

  //메인이미지 패럴렉스
  var mainParallaxScene = new ScrollMagic.Scene({
      triggerElement: '.introBox',
      triggerHook: 1,
      duration: '200%'
    })
    .setTween(TweenMax.from('.introParallax', 1, {
      y: '-30%',
      ease: Power0.easeNone
    }))
    .addTo(controller);

  //타이머
  var timer;

  var compareDate = new Date("2018-09-19");
  compareDate.setDate(compareDate.getDate() + 2); //just for this demo today + 7 days

  timer = setInterval(function () {
    timeBetweenDates(compareDate);
  }, 1000);

  function timeBetweenDates(toDate) {
    var dateEntered = toDate;
    var now = new Date();
    var difference = dateEntered.getTime() - now.getTime();

    if (difference <= 0) {

      // Timer done
      clearInterval(timer);

    } else {

      var seconds = Math.floor(difference / 1000);
      var minutes = Math.floor(seconds / 60);
      var hours = Math.floor(minutes / 60);
      var days = Math.floor(hours / 24);

      hours %= 24;
      minutes %= 60;
      seconds %= 60;

      $("#days").text(days);
      $("#hours").text(hours);
      $("#minutes").text(minutes);
      $("#seconds").text(seconds);
    }
  }



});









/* -------------------------------------------------------------------------------- */
/* 내비바가 일정 스크롤 내려왔을때 흐림배경 추가 */
var last_top = 0;
var scrollBalance = 100;

$(window).scroll(function () {
  var this_top = $(this).scrollTop();
  if (this_top > scrollBalance) {
    $(".naviBar").addClass("blur");
  } else {
    $(".naviBar").removeClass("blur");
  }
  last_top = this_top
});
/* -------------------------------------------------------------------------------- */





/* -------------------------------------------------------------------------------- */
// 스크롤 관련
// a 태그에 클래스 sliding-link 가 트리거
function setSlidingLink() {
  $(".sliding-link").click(function (e) {
    e.preventDefault();
    var aid = $(this).attr("href");
    $('html,body').animate({
      scrollTop: $(aid).offset().top
    }, "slow");
  });
}
/* -------------------------------------------------------------------------------- */





/* -------------------------------------------------------------------------------- */
// 모바일 버전 hover
//$(document).ready(function() {
//	$("a").on("click touchend", function(e) {
//		var el = $(this);
//		var link = el.attr("href");
//		window.location = link;
//	});
//});





/* -------------------------------------------------------------------------------- */
// scrollMagic naviBtn animation 관련
// 첫문자 대문자로 바꿔주는 메소드 

String.prototype.capitalizeFirstLetter = function () {
  return this.charAt(0).toUpperCase() + this.slice(1);
};

function setNaniLinkAnimation() {
  var naviBtnEffect = "turnRed";
  var naviBtnClassName = "naviBtn";

  // init controller
  var controller = new ScrollMagic.Controller();

  // 해당 클래스를 가진 모든 객체에 데이터 입력 
  var naviBtnDoms = document.getElementsByClassName(naviBtnClassName);
  for (var i = 0; i < naviBtnDoms.length; i++) {
    var triggerElementId = "#section" + naviBtnDoms[i].id.capitalizeFirstLetter();
    var naviBtnId = "#" + naviBtnDoms[i].id;

    new ScrollMagic.Scene({
        triggerElement: triggerElementId,
        triggerHook: 0.2,
        duration: 500
      })
      .setClassToggle(naviBtnId, naviBtnEffect) // add class toggle
      .addTo(controller);
  }
}
/* -------------------------------------------------------------------------------- */



/* Article ScrollMagic animation */
function setScrollMagicToClass(className, preEffect, effect) {
  var doms = document.getElementsByClassName(className);

  var ctrl = new ScrollMagic.Controller({
    globalSceneOptions: {
      triggerHook: 0.5
    }
  });

  for (var i = 0; i < doms.length; i++) {
    var target = doms[i];

    target.classList.add(preEffect); // 애니메이션 전 css 클래스 적용

    new ScrollMagic.Scene({
        triggerElement: target
      })
      .setClassToggle(target, effect)
      .addTo(ctrl);
  }

}



//한 섹션씩 이동하는 스크립트 --> 
/*
var sectionClassName = ".box";	// 섹션 트리거 클래스 이름

window.onload = function () {
	$(sectionClassName).each(function () {
		// 개별적으로 Wheel 이벤트 적용
		$(this).on("mousewheel DOMMouseScroll", function (e) {
			e.preventDefault();
			var delta = 0;
			if (!event) event = window.event;
			if (event.wheelDelta) {
				delta = event.wheelDelta / 120;
				if (window.opera) delta = -delta;
			} else if (event.detail) delta = -event.detail / 3;
			var moveTop = null;
			// 마우스휠을 위에서 아래로
			if (delta < 0) {
				if ($(this).next() != undefined) {
					moveTop = $(this).next().offset().top;
				}
			// 마우스휠을 아래에서 위로
			} else {
				if ($(this).prev() != undefined) {
					moveTop = $(this).prev().offset().top;
				}
			}
			// 화면 이동 0.8초(800)
			$("html,body").stop().animate({
				scrollTop: moveTop + 'px'
			}, {
				duration: 800, complete: function () {
				}
			});
		});
	});
}
*/



/*function doDisplay() {
  var con = document.getElementById("plusDiv");
  if (con.style.display == 'none') {
    con.style.display = 'block';
  } else {
    con.style.display = 'none';
  }
}*/

/*function plusInfo() {
  $('#plusDiv').toggleClass("hide");
  if ($('#plusButton').text() == "+") {
    $('#plusButton').text("-");
  } else {
    $('#plusButton').text("+");
  }
}
*/

function multipleToggle() {
  // eigenschappen
  this.oud = ""; // initiele waarde

  //methodes
  this.show = function (nieuw) {
    // eerst "oud" verwijderen, dan "nieuw" tonen
    if (this.oud != "") {
      // enkel oud "verwijderen" als er iets te verwijderen valt
      document.getElementById(this.oud).style.display = "none";
    }
    // toon nieuw
    document.getElementById(nieuw).style.display = "block";

    this.oud = nieuw; // nieuw wordt oud
  }
}

var plusEx = new multipleToggle();


/*아코디언*/
$(document).ready(function () {
  $(".set > a").on("click", function () {
    if ($(this).hasClass("active")) {
      $(this).removeClass("active");
      $(this)
        .siblings(".content")
        .slideUp(200);
      $(".set > a i")
        .removeClass("fa-minus")
        .addClass("fa-plus");
    } else {
      $(".set > a i")
        .removeClass("fa-minus")
        .addClass("fa-plus");
      $(this)
        .find("i")
        .removeClass("fa-plus")
        .addClass("fa-minus");
      $(".set > a").removeClass("active");
      $(this).addClass("active");
      $(".content").slideUp(200);
      $(this)
        .siblings(".content")
        .slideDown(200);
    }
  });
});

/*contact*/
$(document).ready(function () {
  // Test for placeholder support
  $.support.placeholder = (function () {
    var i = document.createElement('input');
    return 'placeholder' in i;
  })();

  // Hide labels by default if placeholders are supported
  if ($.support.placeholder) {
    $('.form-label').each(function () {
      $(this).addClass('js-hide-label');
    });

    // Code for adding/removing classes here
    $('.form-group').find('input, textarea').on('keyup blur focus', function (e) {

      // Cache our selectors
      var $this = $(this),
        $parent = $this.parent().find("label");

      switch (e.type) {
        case 'keyup':
          {
            $parent.toggleClass('js-hide-label', $this.val() == '');
          }
          break;
        case 'blur':
          {
            if ($this.val() == '') {
              $parent.addClass('js-hide-label');
            } else {
              $parent.removeClass('js-hide-label').addClass('js-unhighlight-label');
            }
          }
          break;
        case 'focus':
          {
            if ($this.val() !== '') {
              $parent.removeClass('js-unhighlight-label');
            }
          }
          break;
        default:
          break;
      }
      // previous implementation with ifs
      /*if (e.type == 'keyup') {
          if( $this.val() == '' ) {
              $parent.addClass('js-hide-label'); 
          } else {
              $parent.removeClass('js-hide-label');   
          }                     
      } 
      else if (e.type == 'blur') {
          if( $this.val() == '' ) {
              $parent.addClass('js-hide-label');
          } 
          else {
              $parent.removeClass('js-hide-label').addClass('js-unhighlight-label');
          }
      } 
      else if (e.type == 'focus') {
          if( $this.val() !== '' ) {
              $parent.removeClass('js-unhighlight-label');
          }
      }*/
    });
  }
});




//프로그래스 바

'use strict';

let advanceProgress = (amount) => {
  amount = amount || 0;
  document.getElementById('progressCount').innerHTML = amount;
  document.getElementById('progressBar').style.backgroundImage = 'linear-gradient(110deg, #1E2C5D ' + amount + '%, rgba( 255, 255, 255, 0.9 ) ' + amount + '%)';
  document.getElementById('progressText').style.backgroundImage = 'linear-gradient(110deg, #FFFFFF ' + amount + '%, rgba( 0, 0, 0, 0.7 ) ' + amount + '%)';
}

let percentage = 0;
let percentageInterval = setInterval(() => {
  percentage++;
  if (percentage <= 80) {
    advanceProgress(percentage);
  } else {
    clearInterval(percentageInterval);
  }
}, 50);
