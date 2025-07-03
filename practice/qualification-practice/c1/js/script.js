$(function(){
  let tabBtn=$(".tab_btn>a")
  let tabCont=$(".tab_conts>div")
  tabCont.hide().eq(0).show()

  tabBtn.click(function(){
    let index=$(this).index()
    $(this).addClass("active").siblings().removeClass("active");  
    tabCont.eq(index).show().siblings().hide()
  })
})