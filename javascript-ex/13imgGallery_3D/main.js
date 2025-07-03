window.onload = function () {
    let gallery = document.querySelector(".gallery");
    let previewImage = document.querySelector(".preview-img img")
    let galleryWrap = document.querySelector("#page4");

    galleryWrap.addEventListener("mousemove", function (event) {
        let x = event.clientX;
        let y = event.clientY;
        //console.log(`${x},${y}`)
        let centerX = window.innerWidth / 2; //window.innerWidth 화면의 넓이
        let centerY = window.innerHeight / 2; //window.innerHeight 화면의 높이

        let percentX = (x - centerX) / centerX; //중앙을 기준으로 오(0.2 0.4) 왼(-0.2 -0.4)
        let percentY = (y - centerY) / centerY; //중앙을 기준으로 아래(0.2 0.4) 위(-0.2 -0.4)
        
        let rotateX = 55 + percentY
        let rotateY = -percentX * 2

        gsap.to(gallery,{
            duration:1,
            ease:"power2.out",
            rotateX:rotateX,
            rotateY:rotateY
        })
    })

    for (let i = 0; i < 150; i++) {
        let item = document.createElement("div")
        item.className = "item"
        let img = document.createElement('img')
        img.src = './assets/img' + ((i % 15) + 1) + ".jpg"
        // console.log(item)
        item.appendChild(img)
        gallery.appendChild(item)
        // console.log(gallery)
    }

    let items = document.querySelectorAll(".item")
    let numberOfItems = items.length
    let angleIncrement = 360 / numberOfItems
    console.log(angleIncrement)

    // //각각의 요소 item, 번호 index
    items.forEach(function(item, index){
        gsap.set(item,{
            rotationY:90,
            rotationZ:index * angleIncrement - 90,
            transformOrigin:"50% 400px"
        })
        item.addEventListener('mouseover',function(){
            let imgInsideItem=item.querySelector('img')
            previewImage.src=imgInsideItem.src
            gsap.to(item,{
                x:10,
                y:10,
                z:10,
                ease:"power2.out"
            })
        })
        item.addEventListener('mouseout',function(){
            previewImage.src="./assets/img1.jpg"
            gsap.to(item,{
                x:0,
                y:0,
                z:0,
                ease:"power2.out"
            })
        })
    })




}