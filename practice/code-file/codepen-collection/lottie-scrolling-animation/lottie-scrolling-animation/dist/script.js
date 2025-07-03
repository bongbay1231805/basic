LottieInteractivity.create({
  mode: 'scroll',
  player: '#firstLottie',
  actions: [
      {
        visibility: [0,0.2],
        type: 'stop',
        frames: [0, 0],
      },
    {
        visibility: [0.2,0.6],
        type: 'seek',
        frames: [0, 20],
      },
    ],
});

 LottieInteractivity.create({
  mode: 'cursor',
  player: '#secondLottie',
  actions: [
   {
            position: { x: [0, 1], y: [-1, 2] },
            type: 'seek',
            frames: [0, 20],
        }
    ],
});