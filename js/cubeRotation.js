import * as THREE from "three";
import { ColladaLoader } from "three/addons/loaders/ColladaLoader.js";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

// サイズ設定
const width = window.innerWidth;
const height = window.innerHeight - 200;

let isRotateX = false;
let isRotateY = false;
let isRotateZ = false;

const xrotateElement = document.getElementById("xrotate");
xrotateElement.onclick = () => {
  isRotateX = !isRotateX;
};
const yrotateElement = document.getElementById("yrotate");
yrotateElement.onclick = () => {
  isRotateY = !isRotateY;
};
const zrotateElement = document.getElementById("zrotate");
zrotateElement.onclick = () => {
  isRotateZ = !isRotateZ;
};

document.getElementById("white-bg").onclick = () => {
  scene.background = new THREE.Color(0xffffff);
};
document.getElementById("black-bg").onclick = () => {
  scene.background = new THREE.Color(0x000000);
};
document.getElementById("green-bg").onclick = () => {
  scene.background = new THREE.Color(0x00ff00);
};

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);

camera.position.z = 5;

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector("#myCanvas"),
});
renderer.setSize(width, height);

const controls = new OrbitControls(camera, renderer.domElement);

// 環境光を追加
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);

// Collada 形式のモデルデータを読み込む
const loader = new ColladaLoader();
// dae ファイルのパスを指定
let model;
loader.load("models/vrm/human.vrm", (collada) => {
  model = collada.scene;
  model.rotation.x += getRadian(30);
  model.rotation.y += getRadian(-15);
  scene.add(model); // 読み込み後に3D空間に追加
});

function getRadian(kakudo) {
  return (kakudo * Math.PI) / 180;
}

function animate() {
  if (model) {
    if (isRotateX) {
      model.rotation.x += getRadian(1);
    }
    if (isRotateY) {
      model.rotation.y += getRadian(1);
    }
    if (isRotateZ) {
      model.rotation.z += getRadian(1);
    }
  }

  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}
animate();
