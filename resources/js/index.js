// 페이지가 로딩 되었을 때 실행할 기능
$(document).ready(function () {
  setSlidingLink();
  setNaniLinkAnimation();
  multipleToggle();
  langSelect();
  progressBarSe();
  downloadSelect();
  closeAllSelect(elmnt);

});

/*
$(function () {
  // Add smooth scrolling to all links
  $("a").on('click', function (event) {

    // Make sure this.hash has a value before overriding default behavior
    if (this.hash !== "") {
      // Prevent default anchor click behavior
      event.preventDefault();

      // Store hash
      var hash = this.hash;

      // Using jQuery's animate() method to add smooth page scroll
      // The optional number (800) specifies the number of milliseconds it takes to scroll to the specified area
      $('html, body').animate({
        scrollTop: $(hash).offset().top
      }, 800, function () {

        // Add hash (#) to URL when done scrolling (default click behavior)
        window.location.hash = hash;
      });
    } // End if
  });

});
*/


$(function () {

  //타이머
  var timer;

  var compareDate = new Date("2018-10-19");
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






$(function () {
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


  //아이폰목업 패럴렉스
  var scene = new ScrollMagic.Scene({
      triggerElement: "#mockupTrigger",
      duration: 400
    })
    // animate color and top border in relation to scroll position
    .setTween("#mockupEffect1", {
      y: -30,
      scale: 1.1
    }) // the tween durtion can be omitted and defaults to 1
    .addTo(controller);


  // 중간 버튼 패럴랙스

  var scene = new ScrollMagic.Scene({
      triggerElement: ".whitePaperButtonBox",
      duration: 400
    })
    // animate color and top border in relation to scroll position
    .setTween(".someButton", {
      y: -20,
      scale: 1.1
    }) // the tween durtion can be omitted and defaults to 1
    .addTo(controller);
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


//팀맴버 상세설명
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


//중단 날짜 카운터

$(function () {
  var getEndDate = new Date('10/22/2018 09:00 AM');

  var getSeconds = 1000;
  var getMinutes = getSeconds * 60;
  var getHours = getMinutes * 60;
  var getDays = getHours * 24;

  var getTimer = document.getElementById('timer2')
  var message = 'Time is out';
  var timer;

  function timerCountdown() {
    var getNowDate = new Date();
    var getSeparate = getEndDate - getNowDate;

    if (getSeparate < 0) {
      clearInterval(timer);
      getTimer.innerHTML = '<li><span>' + message + '</span></li>'
      return false;
    }

    var seconds = Math.floor((getSeparate % getMinutes) / getSeconds);
    var minutes = Math.floor((getSeparate % getHours) / getMinutes);
    var hours = Math.floor((getSeparate % getDays) / getHours);
    var days = Math.floor(getSeparate / getDays);

    getTimer.innerHTML = '<li><span>' + days + '</span>Days</li><li class="dot">:</li>';
    getTimer.innerHTML += '<li><span>' + hours + '</span>Hours</li><li class="dot">:</li>';
    getTimer.innerHTML += '<li><span>' + minutes + '</span>Minutes</li><li class="dot">:</li>';
    getTimer.innerHTML += '<li><span>' + seconds + '</span>Seconds</li>';
  }

  time = setInterval(timerCountdown, 1000);
});

/* -------------------------------------------------------------------------------- */
//프로그래스 바

'use strict';

let advanceProgress = (amount) => {
  amount = amount || 0;
  document.getElementById('progressCount').innerHTML = amount;
  document.getElementById('progressBar').style.backgroundImage = 'linear-gradient(110deg, #ffffff ' + amount + '%, rgba( 255, 255, 255, 0.2 ) ' + amount + '%)';
  document.getElementById('progressText').style.backgroundImage = 'linear-gradient(110deg, rgba( 0, 0, 0, 0.2 ) ' + amount + '%, rgba( 0, 0, 0, 0 ) ' + amount + '%)';
}

let percentage = 0;
let percentageInterval = setInterval(() => {
  percentage++;
  if (percentage <= 70) {
    advanceProgress(percentage);
  } else {
    clearInterval(percentageInterval);
  }
}, 50);




/* -------------------------------------------------------------------------------- */


/* -------------------------------------------------------------------------------- */
//프로그래스 바
function progressBarSe() {
  'use strict';

  let advanceProgress = (amount) => {
    amount = amount || 0;
    document.getElementById('progressCountSe').innerHTML = amount;
    document.getElementById('progressBarSe').style.backgroundImage = 'linear-gradient(110deg, #ffffff ' + amount + '%, rgba( 255, 255, 255, 0.2 ) ' + amount + '%)';
    document.getElementById('progressTextSe').style.backgroundImage = 'linear-gradient(110deg, rgba( 0, 0, 0, 0.2 ) ' + amount + '%, rgba( 0, 0, 0, 0 ) ' + amount + '%)';
  }

  let percentage = 0;
  let percentageInterval = setInterval(() => {
    percentage++;
    if (percentage <= 70) {
      advanceProgress(percentage);
    } else {
      clearInterval(percentageInterval);
    }
  }, 50);

}


/* -------------------------------------------------------------------------------- */


/* -------------------------------------------------------------------------------- */
function langSelect() {
  //언어 변환기
  document.getElementById("langSelect").onchange = function () {
    if (this.selectedIndex !== 0) {
      window.location.href = this.value;
    }
  };

}

/* -------------------------------------------------------------------------------- */






/* -------------------------------------------------------------------------------- */



//화이트페이퍼 다운로드 셀렉터

function downloadSelect() {
  var x, i, j, selElmnt, a, b, c;
  /*look for any elements with the class "custom-select":*/
  x = document.getElementsByClassName("custom-select");
  for (i = 0; i < x.length; i++) {
    selElmnt = x[i].getElementsByTagName("select")[0];
    /*for each element, create a new DIV that will act as the selected item:*/
    a = document.createElement("DIV");
    a.setAttribute("class", "select-selected");
    a.innerHTML = selElmnt.options[selElmnt.selectedIndex].innerHTML;
    x[i].appendChild(a);
    /*for each element, create a new DIV that will contain the option list:*/
    b = document.createElement("DIV");
    b.setAttribute("class", "select-items select-hide");
    for (j = 0; j < selElmnt.length; j++) {
      /*for each option in the original select element,
      create a new DIV that will act as an option item:*/
      c = document.createElement("DIV");
      c.innerHTML = selElmnt.options[j].innerHTML;
      c.addEventListener("click", function (e) {
        /*when an item is clicked, update the original select box,
        and the selected item:*/
        var y, i, k, s, h;
        s = this.parentNode.parentNode.getElementsByTagName("select")[0];
        h = this.parentNode.previousSibling;
        for (i = 0; i < s.length; i++) {
          if (s.options[i].innerHTML == this.innerHTML) {
            s.selectedIndex = i;
            h.innerHTML = this.innerHTML;
            y = this.parentNode.getElementsByClassName("same-as-selected");
            for (k = 0; k < y.length; k++) {
              y[k].removeAttribute("class");
            }
            this.setAttribute("class", "same-as-selected");
            break;
          }
        }
        h.click();
      });
      b.appendChild(c);
    }
    x[i].appendChild(b);
    a.addEventListener("click", function (e) {
      /*when the select box is clicked, close any other select boxes,
      and open/close the current select box:*/
      e.stopPropagation();
      closeAllSelect(this);
      this.nextSibling.classList.toggle("select-hide");
      this.classList.toggle("select-arrow-active");
    });
  }
}

function closeAllSelect(elmnt) {
  /*a function that will close all select boxes in the document,
  except the current select box:*/
  var x, y, i, arrNo = [];
  x = document.getElementsByClassName("select-items");
  y = document.getElementsByClassName("select-selected");
  for (i = 0; i < y.length; i++) {
    if (elmnt == y[i]) {
      arrNo.push(i)
    } else {
      y[i].classList.remove("select-arrow-active");
    }
  }
  for (i = 0; i < x.length; i++) {
    if (arrNo.indexOf(i)) {
      x[i].classList.add("select-hide");
    }
  }
}
/*if the user clicks anywhere outside the select box,
then close all select boxes:*/
document.addEventListener("click", closeAllSelect);







/* -------------------------------------------------------------------------------- */
