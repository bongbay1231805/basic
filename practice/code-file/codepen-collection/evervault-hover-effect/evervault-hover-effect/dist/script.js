const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

const randomChar = () => chars[Math.floor(Math.random() * (chars.length - 1))],//무작위로 하나를 선택하는 방법
     randomString = length => Array.from(Array(length)).map(randomChar).join("");

console.log(randomString(1500))
const card = document.querySelector(".card"),
      letters = card.querySelector(".card-letters");


 letters.style.setProperty("--x", `10px`);
  letters.style.setProperty("--y", `10px`);
letters.innerText = randomString(1500); 

const handleOnMove = e => {
  const rect = card.getBoundingClientRect(),
        x = e.clientX - rect.left,
        y = e.clientY - rect.top;

  letters.style.setProperty("--x", `${x}px`);
  letters.style.setProperty("--y", `${y}px`);

  letters.innerText = randomString(1500);    
}



card.onmousemove = e => handleOnMove(e);

//card.ontouchmove = e => handleOnMove(e.touches[0]);


// Array(length)
// JavaScript에서 길이가 length인 새로운 배열을 생성하는 내장 함수입니다



//Array.from()은 JavaScript에서 배열 혹은 유사 배열 객체를 배열로 변환하는 메서드입니다. 이 메서드는 배열 형태의 객체나 이터러블 객체를 받아서 새로운 배열을 생성합니다.일반적으로 이 메서드는 문자열, Set, Map, NodeList와 같은 유사 배열 객체를 배열로 변환할 때 유용하게 사용됩니다. 또한, 두 번째 매개변수로 변환 작업을 수행하는 콜백 함수를 전달할 수 있습니다.




//Array.from(Array(length))은 먼저 길이가 length인 배열을 생성하고, 그 배열을 새로운 배열로 변환합니다. 이렇게 하면 길이가 length인 새로운 배열이 생성되며, 이 배열의 각 요소는 초기값으로 undefined가 설정됩니다.


//mask-image는 CSS의 속성 중 하나로, 요소에 마스킹 이미지를 적용하는 데 사용됩니다. 마스킹은 특정 요소의 일부분을 표시하거나 숨기는 데 사용되며, 마스크 이미지의 색상 또는 알파 값에 따라 요소의 가시성이 결정됩니다.
//mask-image에 할당된 이미지의 투명한 부분은 마스크를 적용하는 요소의 해당 부분을 숨기고, 불투명한 부분은 해당 부분을 표시합니다. 또한, 반투명한 부분은 요소를 부분적으로 표시합니다.