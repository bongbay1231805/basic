let currentCookie=document.cookie; //쿠키를 가져오는 방법
let cookieCheck=currentCookie.indexOf("green")

let noticeElement=document.querySelector(".notice")
let checkboxElement=document.querySelector("#cb")

let closeBtn=document.querySelector(".close")
console.log(checkboxElement)
if(cookieCheck > -1){
    noticeElement.style.display="none"
}else{
    noticeElement.style.display="block"
}
checkboxElement.addEventListener("change",function(){
    //오늘의 날짜 생성
    let date=new Date()
    date.setDate(date.getDate()+7)

    if(checkboxElement.checked){//input에 check가 되었다면
        //쿠키 생성하기
        let setCookie=""
        setCookie += "green=true; " //반드시 ;뒤로 한칸 띄어야한다.
        setCookie += "expires=" + date.toUTCString()

        //쿠키 저장하기
        document.cookie = setCookie
    }
})

closeBtn.addEventListener("click",function(){
    noticeElement.style.display="none"
})