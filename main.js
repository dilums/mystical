let renderer, scene, camera;
const { max } = Math;
const { innerHeight, innerWidth, devicePixelRatio } = window;
const canvas = document.querySelector("#canvas");
const s = max(innerHeight, innerWidth) * devicePixelRatio;
canvas.width = s;
canvas.height = s;
renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
const fov = 75;
const aspect = 1;
const near = 0.1;
const far = 20;
camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
camera.position.set(
  0.018642919740713196,
  0.062166257361373406,
  1.8988912022517688
);
camera.rotation.x = -0.032726499473191346;
camera.rotation.y = 0.00981222047356264;
camera.rotation.z = 0.00032122915379875284;

scene = new THREE.Scene();
const uniforms = {
  time: { type: "f", value: 1.0 }
};

const material = new THREE.ShaderMaterial({
  fragmentShader: document.getElementById("fragmentShader").textContent,
  vertexShader: document.getElementById("vertexShader").textContent,
  uniforms
});
const geometry = new THREE.PlaneGeometry(3, 3, 32);
const plane = new THREE.Mesh(geometry, material);
scene.add(plane);
function resizeRendererToDisplaySize(renderer) {
  const canvas = renderer.domElement;
  const { innerHeight, innerWidth, devicePixelRatio } = window;
  const s = max(innerHeight, innerWidth) * devicePixelRatio;
  const needResize = canvas.width !== s || canvas.height !== s;
  if (needResize) {
    renderer.setSize(s, s, false);
  }
  return needResize;
}

function render(time) {
  time *= 0.001;
  uniforms.time.value = time;
  if (resizeRendererToDisplaySize(renderer)) {
    camera.aspect = 1;
    camera.updateProjectionMatrix();
  }

  renderer.render(scene, camera);

  requestAnimationFrame(render);
}

requestAnimationFrame(render);
