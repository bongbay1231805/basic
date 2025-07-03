import * as THREE from "https://esm.sh/three";

// variables
const imageContainers = document.querySelectorAll(".imageContainer");
const buttons = document.querySelectorAll(".btn");
const imageElements = document.querySelectorAll(".image");

let easeFactor = 0.02;
let scene, camera, renderer, planeMesh;

// shaders
const vertexShader = `
            varying vec2 vUv;
            void main() {
            vUv = uv;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
            }
        `;

const fragmentShader = `
            varying vec2 vUv;
            uniform sampler2D u_texture;    
            uniform float u_opacity;

            float random(vec2 st) {
                return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);
            }

            void main() {
                vec2 gridUV = floor(vUv * vec2(20.0, 20.0)) / vec2(20.0, 20.0);
                vec2 pixel = gridUV + vec2(1.0/20.0, 1.0/20.0);

                float rand = random(pixel);
                float opacity = step(0.1, rand);
                opacity *= step(rand, u_opacity);

                vec4 color = texture2D(u_texture, vUv);
                gl_FragColor = vec4(color.rgb, opacity);
            }
        `;

imageContainers.forEach((imageContainer, index) => {
  const button = buttons[index];
  const imageElement = imageElements[index];

  function initializeScene(texture) {
    // scene creation
    const scene = new THREE.Scene();

    // camera setup
    const camera = new THREE.PerspectiveCamera(
      80,
      imageElement.offsetWidth / imageElement.offsetHeight,
      0.01,
      10
    );
    camera.position.z = 1;

    // uniforms
    let shaderUniforms = {
      u_texture: { type: "t", value: texture },
      u_opacity: { type: "f", value: 0.0 }
    };

    // creating a plane mesh with materials
    const planeMesh = new THREE.Mesh(
      new THREE.PlaneGeometry(2, 2),
      new THREE.ShaderMaterial({
        uniforms: shaderUniforms,
        vertexShader,
        fragmentShader
      })
    );

    // add mesh to scene
    scene.add(planeMesh);

    // render
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(imageElement.offsetWidth, imageElement.offsetHeight);

    // create a canvas
    imageContainer.appendChild(renderer.domElement);

    // animate scene
    function animateScene() {
      requestAnimationFrame(animateScene);
      renderer.render(scene, camera);
    }

    animateScene();

    // event listeners
    button.addEventListener("mouseover", function () {
      gsap.to(planeMesh.material.uniforms.u_opacity, {
        duration: 0.5,
        value: 1
      });
    });

    button.addEventListener("mouseout", function () {
      gsap.to(planeMesh.material.uniforms.u_opacity, {
        duration: 0.5,
        value: 0
      });
    });
  }

  initializeScene(new THREE.TextureLoader().load(imageElement.src));
});