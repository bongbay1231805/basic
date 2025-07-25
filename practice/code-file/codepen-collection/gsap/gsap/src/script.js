/*
 * 타이핑 효과
 * 출처 : https://westzero.tistory.com/112
 */
String.prototype.toKorChars = function() { 
  var cCho = [ 'ㄱ', 'ㄲ', 'ㄴ', 'ㄷ', 'ㄸ', 'ㄹ', 'ㅁ', 'ㅂ', 'ㅃ', 'ㅅ', 'ㅆ', 'ㅇ', 'ㅈ', 'ㅉ', 'ㅊ', 'ㅋ', 'ㅌ', 'ㅍ', 'ㅎ' ], 
      cJung = [ 'ㅏ', 'ㅐ', 'ㅑ', 'ㅒ', 'ㅓ', 'ㅔ', 'ㅕ', 'ㅖ', 'ㅗ', 'ㅘ', 'ㅙ', 'ㅚ', 'ㅛ', 'ㅜ', 'ㅝ', 'ㅞ', 'ㅟ', 'ㅠ', 'ㅡ', 'ㅢ', 'ㅣ' ], 
      cJong = [ '', 'ㄱ', 'ㄲ', 'ㄳ', 'ㄴ', 'ㄵ', 'ㄶ', 'ㄷ', 'ㄹ', 'ㄺ', 'ㄻ', 'ㄼ', 'ㄽ', 'ㄾ', 'ㄿ', 'ㅀ', 'ㅁ', 'ㅂ', 'ㅄ', 'ㅅ', 'ㅆ', 'ㅇ', 'ㅈ', 'ㅊ', 'ㅋ', 'ㅌ', 'ㅍ', 'ㅎ' ], cho, jung, jong; 
  var str = this, 
      cnt = str.length, 
      chars = [], 
      cCode; 
  for (var i = 0; i < cnt; i++) { 
    cCode = str.charCodeAt(i);
    // 한글이 아닌 경우 
    if (cCode == 32) { 
      chars.push(" ");
      continue;
    }
    if (cCode < 0xAC00 || cCode > 0xD7A3) { 
      chars.push(str.charAt(i)); continue; 
    } 
    cCode = str.charCodeAt(i) - 0xAC00; 
    // 종성 
    jong = cCode % 28; 
    // 중성 
    jung = ((cCode - jong) / 28 ) % 21 
    // 초성 
    cho = (((cCode - jong) / 28 ) - jung ) / 21 

    // 테스트라는 문장이 있으면 ㅌ테ㅅ스ㅌ트 형식으로 저장되도록함 (타이핑을 위해서)
    chars.push(cCho[cho]);
    chars.push(String.fromCharCode( 44032 + (cho * 588) + (jung  * 28)));
    if (cJong[jong] !== '') { 
      chars.push(String.fromCharCode( 44032 + (cho * 588) + (jung  * 28) + jong ));
    }
  } 
  return chars; 
}

// 타이핑할 문장
var result  = "동해물과 백두산이 마르고 닳도록 하느님이 보우하사 우리나라 만세";
var typeing1=[];
result = result.split(''); // 한글자씩자름

//각글자 초성,중성,종성으로 나눔
for(var i =0; i<result.length; i++) {
  typeing1[i]=result[i].toKorChars();
}

//출력할 엘리먼트요소 가져옴 
var resultDiv = document.querySelector("#text");

var text = "",
    i=0,
    j=0, 
    imax = typeing1.length,
    isPause = false,
    timer;

function startTimer() {
  isPause = false;
  timer = setInterval(function() {
    var i = 0;
    typi();
  }, 100)
}

function stopTimer() {
  clearInterval(timer);
  isPause = true;
}

function resetTimer() {
  clearInterval(timer);
  isPause = true;
  resultDiv.innerHTML = '';
}


function typi() {
  if(i<=imax-1) {
    //각 글자가 초성 중성 종성 순서대로 추가되도록 
    var jmax = typeing1[i].length;
    resultDiv.innerHTML = text + typeing1[i][j];
    j++;
    if(j==jmax){
      text+=  typeing1[i][j-1];//초성중성종성 순서대로 출력된 글자는 저장 ( 다음 글자와 이어붙이기 위해서 )
      i++;
      j=0;
    }
  } else {
    stopTimer();
  }
}

gsap.registerPlugin(ScrollTrigger);

gsap.to('#text', {
  duration: 3,
  scrollTrigger: {
    markers: true,
    trigger: "#text",
    toggleActions: "restart none reverse none",
    start: 'top 80%',
    end: '+100px 10%',
    onEnter: function() { startTimer() },
    onLeaveBack: function() { resetTimer() },
  },
});