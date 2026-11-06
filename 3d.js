import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.module.js";

const canvas = document.querySelector("#hero3d");
const toggle = document.querySelector("#motionToggle");

if (canvas && window.WebGLRenderingContext) {
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  let motionOn = !reduced && localStorage.getItem("parasram-motion") !== "off";
  const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.7));
  renderer.setSize(canvas.clientWidth, canvas.clientHeight, false);
  renderer.outputColorSpace = THREE.SRGBColorSpace;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(38, 1, 0.1, 100);
  camera.position.set(0, 0, 8);

  const group = new THREE.Group();
  scene.add(group);

  const coreGeometry = new THREE.TorusKnotGeometry(1.05, 0.29, 180, 24, 2, 5);
  const coreMaterial = new THREE.MeshPhysicalMaterial({
    color: 0x719cff, metalness: 0.72, roughness: 0.2,
    clearcoat: 1, clearcoatRoughness: 0.12,
    emissive: 0x20164f, emissiveIntensity: 0.34
  });
  const core = new THREE.Mesh(coreGeometry, coreMaterial);
  group.add(core);

  const wire = new THREE.Mesh(
    new THREE.IcosahedronGeometry(1.82, 2),
    new THREE.MeshBasicMaterial({ color: 0x8dc4ff, wireframe: true, transparent: true, opacity: 0.16 })
  );
  group.add(wire);

  const ringMaterial = new THREE.MeshBasicMaterial({ color: 0xb38cff, transparent: true, opacity: 0.55 });
  const ring = new THREE.Mesh(new THREE.TorusGeometry(2.25, 0.008, 8, 180), ringMaterial);
  ring.rotation.set(1.1, 0.25, 0.4);
  group.add(ring);

  scene.add(new THREE.AmbientLight(0xffffff, 1.15));
  const key = new THREE.PointLight(0xb38cff, 32, 18);
  key.position.set(3, 3, 4);
  scene.add(key);
  const fill = new THREE.PointLight(0x6c7cff, 24, 18);
  fill.position.set(-3, -2, 2);
  scene.add(fill);

  const particleCount = 420;
  const positions = new Float32Array(particleCount * 3);
  for (let i = 0; i < particleCount; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 10;
    positions[i * 3 + 1] = (Math.random() - 0.5) * 7;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 5 - 1;
  }
  const particleGeometry = new THREE.BufferGeometry();
  particleGeometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
  const particles = new THREE.Points(particleGeometry, new THREE.PointsMaterial({
    color: 0xa7b9dc, size: 0.018, transparent: true, opacity: 0.7
  }));
  scene.add(particles);

  let pointerX = 0, pointerY = 0, drag = false, lastX = 0, lastY = 0;
  canvas.addEventListener("pointerdown", e => { drag = true; lastX = e.clientX; lastY = e.clientY; canvas.setPointerCapture(e.pointerId); });
  canvas.addEventListener("pointermove", e => {
    if (drag) {
      group.rotation.y += (e.clientX - lastX) * 0.008;
      group.rotation.x += (e.clientY - lastY) * 0.008;
      lastX = e.clientX; lastY = e.clientY;
    } else {
      const r = canvas.getBoundingClientRect();
      pointerX = ((e.clientX - r.left) / r.width - 0.5) * 0.5;
      pointerY = ((e.clientY - r.top) / r.height - 0.5) * 0.35;
    }
  });
  canvas.addEventListener("pointerup", () => { drag = false; });
  canvas.addEventListener("pointercancel", () => { drag = false; });

  function resize() {
    const w = Math.max(1, canvas.clientWidth), h = Math.max(1, canvas.clientHeight);
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
  }
  new ResizeObserver(resize).observe(canvas);

  function updateToggle() {
    if (!toggle) return;
    toggle.setAttribute("aria-pressed", String(motionOn));
    toggle.innerHTML = motionOn ? "✦ <span>MOTION ON</span>" : "Ⅱ <span>MOTION OFF</span>";
  }
  updateToggle();
  toggle?.addEventListener("click", () => {
    motionOn = !motionOn;
    localStorage.setItem("parasram-motion", motionOn ? "on" : "off");
    updateToggle();
  });

  let frame = 0;
  function animate() {
    requestAnimationFrame(animate);
    if (motionOn) {
      frame += 0.006;
      if (!drag) {
        group.rotation.y += (pointerX * 0.22 - group.rotation.y) * 0.012;
        group.rotation.x += (-pointerY * 0.22 - group.rotation.x) * 0.012;
        core.rotation.x += 0.0025;
        core.rotation.y += 0.003;
        wire.rotation.y -= 0.0012;
        ring.rotation.z += 0.0018;
      }
      group.position.y = Math.sin(frame * 1.4) * 0.08;
      particles.rotation.y += 0.00025;
    }
    renderer.render(scene, camera);
  }
  animate();
}
