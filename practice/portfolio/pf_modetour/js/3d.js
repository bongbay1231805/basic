////////////////////////🎁section1 3d model🎁////////////////////////

// import {
//   Application
// } from 'https://unpkg.com/@splinetool/react-spline/next';

// const canvas = document.getElementById('canvas3d');
// const app = new Application(canvas);
// app
//   .load('https://prod.spline.design/4xQI9uHEcHpeM4eU/scene.splinecode')
//   .then(() => {
//     let plane = app.findObjectByName('plane')
//   })


import Application from '@splinetool/react-spline/next';

const canvas = document.getElementById('canvas3d');
const app = new Application(canvas);
app
  .load('https://prod.spline.design/4xQI9uHEcHpeM4eU/scene.splinecode')
  .then(() => {
    let plane = app.findObjectByName('plane')
  })
