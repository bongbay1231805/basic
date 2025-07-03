let contentWraps = document.querySelectorAll('.contentWrap');

contentWraps[0].querySelectorAll("img").forEach((img) => img.classList.add("active"))

contentWraps.forEach((contentWrap, index) => {
  let imgArr = contentWrap.querySelectorAll('img');
  let title = document.querySelector('.textWrap h2');
  let pageNum = 0
  let totalNum = contentWraps.length; // contentWrap의 이미지 수

  //초기설정
  // == title.innerHTML //글자 사이에 <>태그도 들어감
  // title.textContent //글자만 넣는 것
  title.textContent = "PAGE : " + (pageNum + 1) + "/" + totalNum

  //다음버튼
  document.querySelector(".buttonWrap .btn2").addEventListener("click", () => {
    if (pageNum < totalNum - 1) {
      pageNum++
    }else{
      pageNum=0
    }
    updateGallery(imgArr, title, pageNum, totalNum)
  })

  //이전버튼
  document.querySelector(".buttonWrap .btn1").addEventListener("click", () => {
    if (pageNum > 0) {
      pageNum--
    }else{
      pageNum=totalNum - 1
    }
    updateGallery(imgArr, title,pageNum, totalNum)
  })
})

function updateGallery(imgArr, title, pageNum, totalNum){
  imgArr.forEach((img)=>img.classList.remove("active"))
  contentWraps[pageNum].querySelectorAll("img").forEach((img) => img.classList.add("active"))
  title.textContent = "PAGE : " + (pageNum + 1) + "/" + totalNum
}