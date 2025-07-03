
        var bm = document.getElementsByClassName('bm');
    
        Array.prototype.forEach.call(bm, icon => {
            
            var anim = bodymovin.loadAnimation({
                container: icon, 
                path: `https://s3-us-west-2.amazonaws.com/s.cdpn.io/2621168/${icon.dataset.file}.json`,
                renderer: 'canvas',
                loop: false, 
                autoplay: false
            })

            icon.addEventListener('mouseenter', () => {
                anim.setDirection(1)
                anim.play();
            })
            icon.addEventListener('mouseleave', () => {
                anim.setDirection(-1)
                anim.play();
            })
        })
        