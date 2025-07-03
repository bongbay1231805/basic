// import { Application } from '@splinetool/runtime';

// const canvas = document.getElementById('canvas3d');
// const app = new Application(canvas);
// app.load('https://prod.spline.design/ejt5-ivKGLXHUSqd/scene.splinecode');


// 'https://prod.spline.design/t29nRykuta64r9qu/scene.splinecode'

import { Application } from 'https://unpkg.com/@splinetool/runtime';

const canvas = document.getElementById('canvas3d');
const app = new Application(canvas);
app
.load('https://prod.spline.design/ejt5-ivKGLXHUSqd/scene.splinecode') //가져왔을 때
.then(()=>{})

// const canvas2 = document.getElementById('canvas3d2');
// const app2 = new Application(canvas2);
// app2
// .load('https://prod.spline.design/t75vY61hoi6b5a3K/scene.splinecode') //가져왔을 때
// .then(()=>{//load가 성공했다면 할 일
    
// })
