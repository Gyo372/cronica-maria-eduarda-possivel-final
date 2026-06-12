// =====================
// SETUP BÁSICO 3D
// =====================

const canvas = document.querySelector("#scene");

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
75,
window.innerWidth / window.innerHeight,
0.1,
1000
);

const renderer = new THREE.WebGLRenderer({
canvas,
antialias: true
});

renderer.setSize(window.innerWidth, window.innerHeight);

// luz suave medieval
const light = new THREE.PointLight(0xffd1a1, 1.2);
light.position.set(5, 5, 5);
scene.add(light);

// =====================
// LIVRO
// =====================

const book = new THREE.Group();
scene.add(book);

camera.position.z = 6;

// páginas (conteúdo emocional)
const pagesText = [
"25 de Abril...\no destino começou silencioso.",
"Eu te vi novamente...\ne tudo ficou diferente.",
"Na igreja...\num instante eterno aconteceu.",
"Debaixo da árvore...\no tempo parou.",
"Maria Eduarda...\nvocê é meu lar."
];

// criar páginas físicas
const pages = [];

for (let i = 0; i < pagesText.length; i++) {

  const geometry = new THREE.BoxGeometry(3, 4, 0.05);

  const material = new THREE.MeshStandardMaterial({
    color: 0x3a2a1a,
    roughness: 0.9,
    metalness: 0.1
  });

  const page = new THREE.Mesh(geometry, material);

  page.position.x = i * 0.03;
  page.position.z = i * 0.1;

  page.userData = {
    index: i,
    opened: false
  };

  book.add(page);
  pages.push(page);
}

// =====================
// ANIMAÇÃO DE VIRADA
// =====================

let current = 0;
let animating = false;

function turnPage() {

  if (animating) return;
  if (current >= pages.length - 1) return;

  animating = true;

  const page = pages[current];

  let angle = 0;

  function animateFlip() {

    angle += 0.08;

    page.rotation.y = -angle;

    page.position.x = Math.sin(angle) * 0.5;

    if (angle < Math.PI / 2) {
      requestAnimationFrame(animateFlip);
    } else {
      animating = false;
      current++;
    }
  }

  animateFlip();
}

// =====================
// CONTROLES
// =====================

window.addEventListener("keydown", (e) => {
  if (e.key === "ArrowRight") {
    turnPage();
  }
});

// =====================
// LOOP PRINCIPAL
// =====================

function animate() {
  requestAnimationFrame(animate);

  book.rotation.y = Math.sin(Date.now() * 0.0003) * 0.05;

  renderer.render(scene, camera);
}

animate();

// =====================
// RESIZE
// =====================

window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
