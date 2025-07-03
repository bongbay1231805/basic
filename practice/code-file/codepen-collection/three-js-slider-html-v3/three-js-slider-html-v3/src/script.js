import * as THREE from 'three'

document.addEventListener('DOMContentLoaded', async () => {
  const canvasEl = document.getElementById('canvas')
  const imgElements = document.querySelectorAll('.slide-img')
  const loadingEl = document.getElementById('loading')
  
  const initialWidth = canvasEl.parentElement.clientWidth
  const initialHeight = canvasEl.parentElement.clientHeight
  canvasEl.width = initialWidth
  canvasEl.height = initialHeight
  
  const renderer = new THREE.WebGLRenderer({ canvas: canvasEl })
  renderer.setSize(initialWidth, initialHeight)
  renderer.setPixelRatio(window.devicePixelRatio)
  
  const fov = 45
  const aspect = initialWidth / initialHeight
  const camera = new THREE.PerspectiveCamera(fov, aspect, 1, 10000)
  camera.position.z = initialHeight / 2 / Math.tan(fov * Math.PI / 360)
  
  const scene = new THREE.Scene()
  const loader = new THREE.TextureLoader()
  const loadTexture = (src) => new Promise((resolve) => {
    loader.load(src, resolve)
  })

  const promises = Array.from(imgElements).map(img => loadTexture(img.getAttribute('src')))
  const sliderImages = await Promise.all(promises)
  
  const maskTexture = await loadTexture('https://picsum.photos/id/115/1280/720.webp?grayscale')
  
  loadingEl.style.display = 'none'
  
  const geometry = new THREE.PlaneGeometry(initialWidth, initialHeight)
  
  const shaderMaterial = new THREE.ShaderMaterial({
    uniforms: {
      uTexture1: { value: sliderImages[0] },
      uTexture2: { value: sliderImages[1] },
      uMask: { value: maskTexture },
      intensity: { value: 0.5 },
      uBlend: { value: 0.0 },
    },
    vertexShader: `
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
    fragmentShader: `
      uniform sampler2D uTexture1;
      uniform sampler2D uTexture2;
      uniform sampler2D uMask;
      uniform float intensity;
      uniform float uBlend;
      varying vec2 vUv;
      
      void main() {
        vec2 uv = vUv;
        vec4 mask = texture(uMask, uv);
        
        vec2 shiftedUV1 = vec2(uv.x, uv.y - uBlend * (mask.r * intensity));
        vec2 shiftedUV2 = vec2(uv.x, uv.y + (1.0 - uBlend) * (mask.r * intensity));
        
        vec4 _uTexture1 = texture(uTexture1, shiftedUV1);
        vec4 _uTexture2 = texture(uTexture2, shiftedUV2);

        gl_FragColor = mix(_uTexture1, _uTexture2, uBlend);
      }
    `,
    transparent: true,
  })

  const mesh = new THREE.Mesh(geometry, shaderMaterial)
  scene.add(mesh)

  function render() {
    requestAnimationFrame(render)
    renderer.render(scene, camera)
  }

  render()
  
  let currentImageIndex = 0
  
  canvasEl.addEventListener('click', () => {
    const nextImageIndex = (currentImageIndex + 1) % sliderImages.length
    
    shaderMaterial.uniforms.uTexture1.value = sliderImages[currentImageIndex]
    shaderMaterial.uniforms.uTexture2.value = sliderImages[nextImageIndex]
    
    gsap.to(shaderMaterial.uniforms.uBlend, {
      value: 1.0,
      duration: 0.5,
      ease: 'power2.out',
      onUpdate: render,
      onComplete: () => {
        shaderMaterial.uniforms.uTexture1.value = shaderMaterial.uniforms.uTexture2.value
        shaderMaterial.uniforms.uBlend.value = 0.0
        currentImageIndex = nextImageIndex
      }
    })
  })
  
  window.addEventListener('resize', () => onWindowResize(camera, renderer, canvasEl), false)
})

function onWindowResize(camera, renderer, canvas) {
  const width = canvas.parentElement.clientWidth
  const height = canvas.parentElement.clientHeight
  renderer.setSize(width, height)
  camera.aspect = width / height
  camera.updateProjectionMatrix()
}