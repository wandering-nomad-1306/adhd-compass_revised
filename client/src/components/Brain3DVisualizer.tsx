import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { RotateCcw, Eye, Sparkles, Compass } from 'lucide-react';

export type RegionId = 'pfc' | 'parietal' | 'acc' | 'striatum' | 'insula' | 'cerebellum';
export type CircuitId = 'control-action' | 'attention' | 'monitoring' | 'timing';

interface Brain3DVisualizerProps {
  view: 'regions' | 'connections';
  selectedRegionId: RegionId;
  selectedCircuitId: CircuitId;
  onSelectRegion: (id: RegionId) => void;
}

// Parser for BrainFacts / Maya Three.js JSON geometry format 3.0
function parseLegacyModel(json: any): THREE.BufferGeometry {
  const model = json.model || json;
  const vertices: number[] = model.vertices || [];
  const normals: number[] = model.normals || [];
  const uvs: number[] = model.uvs && model.uvs[0] ? model.uvs[0] : [];
  const faces: number[] = model.faces || [];

  const positions: number[] = [];
  const parsedNormals: number[] = [];
  const parsedUvs: number[] = [];

  let offset = 0;
  const zLength = faces.length;

  while (offset < zLength) {
    const type = faces[offset++];
    const isQuad = (type & 1) !== 0;
    const hasMaterial = (type & 2) !== 0;
    const hasFaceUv = (type & 4) !== 0;
    const hasFaceVertexUv = (type & 8) !== 0;
    const hasFaceNormal = (type & 16) !== 0;
    const hasFaceVertexNormal = (type & 32) !== 0;
    const hasFaceColor = (type & 64) !== 0;
    const hasFaceVertexColor = (type & 128) !== 0;

    const a = faces[offset++];
    const b = faces[offset++];
    const c = faces[offset++];
    const d = isQuad ? faces[offset++] : 0;

    if (hasMaterial) offset++;
    if (hasFaceUv) offset++;
    let uvA = 0, uvB = 0, uvC = 0, uvD = 0;
    if (hasFaceVertexUv) {
      uvA = faces[offset++];
      uvB = faces[offset++];
      uvC = faces[offset++];
      if (isQuad) uvD = faces[offset++];
    }
    if (hasFaceNormal) offset++;
    let nA = 0, nB = 0, nC = 0, nD = 0;
    if (hasFaceVertexNormal) {
      nA = faces[offset++];
      nB = faces[offset++];
      nC = faces[offset++];
      if (isQuad) nD = faces[offset++];
    }
    if (hasFaceColor) offset++;
    if (hasFaceVertexColor) offset += isQuad ? 4 : 3;

    const addV = (vIdx: number, nIdx?: number, uvIdx?: number) => {
      positions.push(vertices[vIdx * 3], vertices[vIdx * 3 + 1], vertices[vIdx * 3 + 2]);
      if (nIdx !== undefined && normals.length > nIdx * 3 + 2) {
        parsedNormals.push(normals[nIdx * 3], normals[nIdx * 3 + 1], normals[nIdx * 3 + 2]);
      }
      if (uvIdx !== undefined && uvs.length > uvIdx * 2 + 1) {
        parsedUvs.push(uvs[uvIdx * 2], uvs[uvIdx * 2 + 1]);
      }
    };

    if (!isQuad) {
      addV(a, nA, uvA);
      addV(b, nB, uvB);
      addV(c, nC, uvC);
    } else {
      addV(a, nA, uvA);
      addV(b, nB, uvB);
      addV(d, nD, uvD);

      addV(b, nB, uvB);
      addV(c, nC, uvC);
      addV(d, nD, uvD);
    }
  }

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
  if (parsedNormals.length === positions.length) {
    geometry.setAttribute('normal', new THREE.Float32BufferAttribute(parsedNormals, 3));
  } else {
    geometry.computeVertexNormals();
  }
  if (parsedUvs.length === (positions.length / 3) * 2) {
    geometry.setAttribute('uv', new THREE.Float32BufferAttribute(parsedUvs, 2));
  }
  return geometry;
}

// Region colors matching ADHD Compass color palette
const REGION_COLORS: Record<RegionId, string> = {
  pfc: '#4f7659',       // Sage green
  parietal: '#857004',  // Warm amber gold
  acc: '#925e76',       // Plum rose
  striatum: '#a96952',  // Terracotta copper
  insula: '#5f9aaa',    // Teal cyan
  cerebellum: '#7e8249' // Moss olive
};

const BASE_CORTEX_COLOR = '#ded7cb';
const DIMMED_CORTEX_COLOR = '#ebe6dd';
const STEM_COLOR = '#d0c8bb';
const CALLOSUM_COLOR = '#ede7de';

// Circuit participating nodes
const CIRCUIT_NODES: Record<CircuitId, RegionId[]> = {
  'control-action': ['pfc', 'acc', 'striatum'],
  'attention': ['pfc', 'parietal', 'insula'],
  'monitoring': ['insula', 'acc', 'pfc'],
  'timing': ['pfc', 'striatum', 'cerebellum'],
};

// Anatomical coordinates of region centers for connecting arcs
const REGION_CENTROIDS: Record<RegionId, THREE.Vector3> = {
  pfc: new THREE.Vector3(0, 11.5, 6.5),
  parietal: new THREE.Vector3(0, 14.5, -1.8),
  acc: new THREE.Vector3(0, 10.8, 2.5),
  striatum: new THREE.Vector3(0, 7.8, 1.2),
  insula: new THREE.Vector3(3.4, 7.8, 1.5),
  cerebellum: new THREE.Vector3(0, 2.6, -4.5),
};

export default function Brain3DVisualizer({
  view,
  selectedRegionId,
  selectedCircuitId,
  onSelectRegion,
}: Brain3DVisualizerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [hoveredStructure, setHoveredStructure] = useState<string | null>(null);

  // Three.js scene refs
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const controlsRef = useRef<OrbitControls | null>(null);
  const reqIdRef = useRef<number | null>(null);

  // Mesh refs
  const hemiLeftMeshRef = useRef<THREE.Mesh | null>(null);
  const hemiRightMeshRef = useRef<THREE.Mesh | null>(null);
  const striatumGroupRef = useRef<THREE.Group | null>(null);
  const cerebellumMeshRef = useRef<THREE.Mesh | null>(null);
  const accGroupRef = useRef<THREE.Group | null>(null);
  const insulaGroupRef = useRef<THREE.Group | null>(null);
  const stemGroupRef = useRef<THREE.Group | null>(null);
  const callosumMeshRef = useRef<THREE.Mesh | null>(null);
  const arcsGroupRef = useRef<THREE.Group | null>(null);

  // Original vertex positions for coloring
  const hemiLeftPosRef = useRef<Float32Array | null>(null);
  const hemiRightPosRef = useRef<Float32Array | null>(null);

  // Camera animation target
  const targetCamPosRef = useRef<THREE.Vector3 | null>(null);
  const targetLookAtRef = useRef<THREE.Vector3>(new THREE.Vector3(0, 7.5, 0));

  // Initialize Three.js scene
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const width = container.clientWidth;
    const height = container.clientHeight || 480;

    const scene = new THREE.Scene();
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(38, width / height, 0.1, 200);
    camera.position.set(22, 11, 24);
    cameraRef.current = camera;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    container.innerHTML = '';
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.08;
    controls.target.set(0, 7.5, 0);
    controls.minDistance = 16;
    controls.maxDistance = 58;
    controls.minPolarAngle = 0.15;
    controls.maxPolarAngle = Math.PI - 0.2;
    controlsRef.current = controls;

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.4);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xfffbf2, 2.0);
    keyLight.position.set(25, 30, 25);
    scene.add(keyLight);

    const fillLight = new THREE.DirectionalLight(0xe8f0f8, 1.0);
    fillLight.position.set(-25, 15, -20);
    scene.add(fillLight);

    const bottomLight = new THREE.DirectionalLight(0xf2e8dd, 0.6);
    bottomLight.position.set(0, -25, 5);
    scene.add(bottomLight);

    // Groups
    const striatumGroup = new THREE.Group();
    scene.add(striatumGroup);
    striatumGroupRef.current = striatumGroup;

    const accGroup = new THREE.Group();
    scene.add(accGroup);
    accGroupRef.current = accGroup;

    const insulaGroup = new THREE.Group();
    scene.add(insulaGroup);
    insulaGroupRef.current = insulaGroup;

    const stemGroup = new THREE.Group();
    scene.add(stemGroup);
    stemGroupRef.current = stemGroup;

    const arcsGroup = new THREE.Group();
    scene.add(arcsGroup);
    arcsGroupRef.current = arcsGroup;

    // Model loader
    let isCancelled = false;

    async function loadModels() {
      try {
        setLoading(true);

        const fetchJson = async (url: string) => {
          const res = await fetch(url);
          if (!res.ok) throw new Error(`Failed to load ${url}`);
          return res.json();
        };

        const [
          leftJson,
          rightJson,
          cerebJson,
          caudateJson,
          putamenJson,
          naccJson,
          callosumJson,
          thalamusJson,
          ponsJson,
          midbrainJson,
          medullaJson
        ] = await Promise.all([
          fetchJson('/models/brain/Brain-cerebral_hemisphere-left.js'),
          fetchJson('/models/brain/Brain-cerebral_hemisphere-right.js'),
          fetchJson('/models/brain/Brain-cerebellum.js'),
          fetchJson('/models/brain/Brain-basal_ganglia-caudate_nucleus.js'),
          fetchJson('/models/brain/Brain-basal_ganglia-putamen.js'),
          fetchJson('/models/brain/Brain-basal_ganglia-nucleus_accumbens.js'),
          fetchJson('/models/brain/Brain-corpus_callosum.js'),
          fetchJson('/models/brain/Brain-thalamus.js'),
          fetchJson('/models/brain/Brain-brain_stem-pons.js'),
          fetchJson('/models/brain/Brain-brain_stem-midbrain.js'),
          fetchJson('/models/brain/Brain-brain_stem-medulla_oblongata.js'),
        ]);

        if (isCancelled) return;

        // Parse Left Hemisphere
        const leftGeo = parseLegacyModel(leftJson);
        const leftPos = leftGeo.attributes.position.array as Float32Array;
        hemiLeftPosRef.current = leftPos;
        const leftColors = new Float32Array(leftPos.length);
        leftGeo.setAttribute('color', new THREE.BufferAttribute(leftColors, 3));

        const leftMat = new THREE.MeshStandardMaterial({
          roughness: 0.65,
          metalness: 0.05,
          vertexColors: true,
          side: THREE.DoubleSide,
        });
        const leftMesh = new THREE.Mesh(leftGeo, leftMat);
        leftMesh.name = 'HemisphereLeft';
        scene.add(leftMesh);
        hemiLeftMeshRef.current = leftMesh;

        // Parse Right Hemisphere
        const rightGeo = parseLegacyModel(rightJson);
        const rightPos = rightGeo.attributes.position.array as Float32Array;
        hemiRightPosRef.current = rightPos;
        const rightColors = new Float32Array(rightPos.length);
        rightGeo.setAttribute('color', new THREE.BufferAttribute(rightColors, 3));

        const rightMat = new THREE.MeshStandardMaterial({
          roughness: 0.65,
          metalness: 0.05,
          vertexColors: true,
          side: THREE.DoubleSide,
        });
        const rightMesh = new THREE.Mesh(rightGeo, rightMat);
        rightMesh.name = 'HemisphereRight';
        scene.add(rightMesh);
        hemiRightMeshRef.current = rightMesh;

        // Parse Cerebellum
        const cerebGeo = parseLegacyModel(cerebJson);
        const cerebMat = new THREE.MeshStandardMaterial({
          color: new THREE.Color(REGION_COLORS.cerebellum),
          roughness: 0.6,
          metalness: 0.06,
        });
        const cerebMesh = new THREE.Mesh(cerebGeo, cerebMat);
        cerebMesh.name = 'Cerebellum';
        scene.add(cerebMesh);
        cerebellumMeshRef.current = cerebMesh;

        // Parse Striatum (Caudate + Putamen + Nucleus Accumbens)
        const striatumMat = new THREE.MeshStandardMaterial({
          color: new THREE.Color(REGION_COLORS.striatum),
          roughness: 0.45,
          metalness: 0.12,
        });
        const caudateMesh = new THREE.Mesh(parseLegacyModel(caudateJson), striatumMat);
        const putamenMesh = new THREE.Mesh(parseLegacyModel(putamenJson), striatumMat);
        const naccMesh = new THREE.Mesh(parseLegacyModel(naccJson), striatumMat);
        striatumGroup.add(caudateMesh, putamenMesh, naccMesh);

        // Parse ACC Indicator (an elegant anatomical curved band over the corpus callosum)
        const accCurve = new THREE.CatmullRomCurve3([
          new THREE.Vector3(0, 9.2, 4.4),
          new THREE.Vector3(0, 11.2, 3.2),
          new THREE.Vector3(0, 12.0, 1.2),
          new THREE.Vector3(0, 11.8, -1.2),
        ]);
        const accGeo = new THREE.TubeGeometry(accCurve, 32, 0.45, 12, false);
        const accMat = new THREE.MeshStandardMaterial({
          color: new THREE.Color(REGION_COLORS.acc),
          roughness: 0.4,
          metalness: 0.1,
          emissive: new THREE.Color(REGION_COLORS.acc),
          emissiveIntensity: 0.35,
        });
        const accMesh = new THREE.Mesh(accGeo, accMat);
        accGroup.add(accMesh);

        // Parse Insula (left and right deep lateral sulcus hubs)
        const insulaGeo = new THREE.SphereGeometry(1.1, 24, 20);
        insulaGeo.scale(0.65, 1.4, 1.8);
        const insulaMat = new THREE.MeshStandardMaterial({
          color: new THREE.Color(REGION_COLORS.insula),
          roughness: 0.45,
          metalness: 0.1,
          emissive: new THREE.Color(REGION_COLORS.insula),
          emissiveIntensity: 0.3,
        });
        const insulaLeft = new THREE.Mesh(insulaGeo, insulaMat);
        insulaLeft.position.set(3.4, 7.8, 1.2);
        insulaLeft.rotation.z = -0.3;
        const insulaRight = new THREE.Mesh(insulaGeo, insulaMat);
        insulaRight.position.set(-3.4, 7.8, 1.2);
        insulaRight.rotation.z = 0.3;
        insulaGroup.add(insulaLeft, insulaRight);

        // Parse Corpus Callosum
        const callosumGeo = parseLegacyModel(callosumJson);
        const callosumMat = new THREE.MeshStandardMaterial({
          color: new THREE.Color(CALLOSUM_COLOR),
          roughness: 0.7,
          metalness: 0.05,
        });
        const callosumMesh = new THREE.Mesh(callosumGeo, callosumMat);
        scene.add(callosumMesh);
        callosumMeshRef.current = callosumMesh;

        // Parse Brainstem & Thalamus
        const stemMat = new THREE.MeshStandardMaterial({
          color: new THREE.Color(STEM_COLOR),
          roughness: 0.65,
          metalness: 0.05,
        });
        const thalamusMesh = new THREE.Mesh(parseLegacyModel(thalamusJson), stemMat);
        const ponsMesh = new THREE.Mesh(parseLegacyModel(ponsJson), stemMat);
        const midbrainMesh = new THREE.Mesh(parseLegacyModel(midbrainJson), stemMat);
        const medullaMesh = new THREE.Mesh(parseLegacyModel(medullaJson), stemMat);
        stemGroup.add(thalamusMesh, ponsMesh, midbrainMesh, medullaMesh);

        setLoading(false);
      } catch (err: any) {
        console.error('Failed to load 3D brain models:', err);
        if (!isCancelled) {
          setLoadError(err.message || 'Error loading 3D brain assets');
          setLoading(false);
        }
      }
    }

    loadModels();

    // Render loop with smooth camera damping
    const animate = () => {
      reqIdRef.current = requestAnimationFrame(animate);

      if (controlsRef.current) {
        controlsRef.current.update();
      }

      // Smooth camera repositioning if target is active
      if (cameraRef.current && targetCamPosRef.current) {
        cameraRef.current.position.lerp(targetCamPosRef.current, 0.045);
        if (cameraRef.current.position.distanceTo(targetCamPosRef.current) < 0.1) {
          targetCamPosRef.current = null;
        }
      }

      if (rendererRef.current && sceneRef.current && cameraRef.current) {
        rendererRef.current.render(sceneRef.current, cameraRef.current);
      }
    };
    animate();

    // Resize observer
    const handleResize = () => {
      if (!container || !rendererRef.current || !cameraRef.current) return;
      const w = container.clientWidth;
      const h = container.clientHeight || 480;
      cameraRef.current.aspect = w / h;
      cameraRef.current.updateProjectionMatrix();
      rendererRef.current.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      isCancelled = true;
      window.removeEventListener('resize', handleResize);
      if (reqIdRef.current) cancelAnimationFrame(reqIdRef.current);
      if (rendererRef.current) {
        rendererRef.current.dispose();
      }
      container.innerHTML = '';
    };
  }, []);

  // Update shaders, colors, transparency, and camera according to selectedRegionId and view
  useEffect(() => {
    if (loading) return;

    const leftMesh = hemiLeftMeshRef.current;
    const rightMesh = hemiRightMeshRef.current;
    const cerebMesh = cerebellumMeshRef.current;
    const striatumGroup = striatumGroupRef.current;
    const accGroup = accGroupRef.current;
    const insulaGroup = insulaGroupRef.current;
    const arcsGroup = arcsGroupRef.current;

    if (!leftMesh || !rightMesh || !cerebMesh || !striatumGroup || !accGroup || !insulaGroup || !arcsGroup) {
      return;
    }

    const activeIds: RegionId[] =
      view === 'regions' ? [selectedRegionId] : CIRCUIT_NODES[selectedCircuitId];

    const isSubcorticalFocused =
      view === 'regions' && (selectedRegionId === 'striatum' || selectedRegionId === 'acc' || selectedRegionId === 'insula');

    const isConnectionsMode = view === 'connections';

    // 1. Transparency configuration
    // When focusing on internal structures or connections, cortex becomes translucent
    const hemiMatLeft = leftMesh.material as THREE.MeshStandardMaterial;
    const hemiMatRight = rightMesh.material as THREE.MeshStandardMaterial;

    if (isSubcorticalFocused) {
      hemiMatLeft.transparent = true;
      hemiMatLeft.opacity = 0.22;
      hemiMatLeft.depthWrite = false;

      // In ACC mode, make right hemisphere even more transparent to expose medial surface
      if (selectedRegionId === 'acc') {
        hemiMatRight.transparent = true;
        hemiMatRight.opacity = 0.08;
        hemiMatRight.depthWrite = false;
      } else {
        hemiMatRight.transparent = true;
        hemiMatRight.opacity = 0.22;
        hemiMatRight.depthWrite = false;
      }
    } else if (isConnectionsMode) {
      // In connections mode, keep cortex cleanly translucent so internal circuits stand out clearly
      hemiMatLeft.transparent = true;
      hemiMatLeft.opacity = 0.18;
      hemiMatLeft.depthWrite = false;

      hemiMatRight.transparent = true;
      hemiMatRight.opacity = 0.18;
      hemiMatRight.depthWrite = false;
    } else {
      hemiMatLeft.transparent = false;
      hemiMatLeft.opacity = 1.0;
      hemiMatLeft.depthWrite = true;

      hemiMatRight.transparent = false;
      hemiMatRight.opacity = 1.0;
      hemiMatRight.depthWrite = true;
    }
    hemiMatLeft.needsUpdate = true;
    hemiMatRight.needsUpdate = true;

    // 2. Vertex Coloring for Cerebral Hemispheres
    const applyHemisphereColors = (mesh: THREE.Mesh, pos: Float32Array) => {
      const colorAttr = mesh.geometry.attributes.color;
      if (!colorAttr) return;
      const colors = colorAttr.array as Float32Array;

      const pfcCol = new THREE.Color(REGION_COLORS.pfc);
      const parietalCol = new THREE.Color(REGION_COLORS.parietal);
      const baseCol = new THREE.Color(isSubcorticalFocused || isConnectionsMode ? DIMMED_CORTEX_COLOR : BASE_CORTEX_COLOR);

      // In connections mode, do NOT paint the outer shell with large color patches
      // Keep outer cortex clean and neutral so internal hubs and connecting arcs are distinctly visible!
      const highlightPFC = !isConnectionsMode && activeIds.includes('pfc');
      const highlightParietal = !isConnectionsMode && activeIds.includes('parietal');

      for (let i = 0; i < pos.length; i += 3) {
        const x = pos[i];
        const y = pos[i + 1];
        const z = pos[i + 2];

        // Prefrontal cortex: accurately tuned to the anterior frontal pole (z > 4.8)
        if (highlightPFC && z > 4.8 && y > 4.8) {
          const blend = Math.min(1.0, (z - 4.8) / 1.5);
          colors[i] = THREE.MathUtils.lerp(baseCol.r, pfcCol.r, blend);
          colors[i + 1] = THREE.MathUtils.lerp(baseCol.g, pfcCol.g, blend);
          colors[i + 2] = THREE.MathUtils.lerp(baseCol.b, pfcCol.b, blend);
        }
        // Parietal cortex: accurately tuned to posterior-superior parietal lobule
        else if (highlightParietal && z <= 0.8 && z > -4.8 && y > 11.5) {
          const blend = Math.min(1.0, (y - 11.5) / 1.5);
          colors[i] = THREE.MathUtils.lerp(baseCol.r, parietalCol.r, blend);
          colors[i + 1] = THREE.MathUtils.lerp(baseCol.g, parietalCol.g, blend);
          colors[i + 2] = THREE.MathUtils.lerp(baseCol.b, parietalCol.b, blend);
        }
        // Default cortex color
        else {
          colors[i] = baseCol.r;
          colors[i + 1] = baseCol.g;
          colors[i + 2] = baseCol.b;
        }
      }
      colorAttr.needsUpdate = true;
    };

    if (hemiLeftPosRef.current) applyHemisphereColors(leftMesh, hemiLeftPosRef.current);
    if (hemiRightPosRef.current) applyHemisphereColors(rightMesh, hemiRightPosRef.current);

    // 3. Subcortical highlight states
    // Striatum
    const striatumActive = activeIds.includes('striatum');
    striatumGroup.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        const mat = child.material as THREE.MeshStandardMaterial;
        mat.emissive = new THREE.Color(REGION_COLORS.striatum);
        mat.emissiveIntensity = striatumActive ? (isConnectionsMode ? 0.9 : 0.6) : 0.05;
        mat.color = new THREE.Color(striatumActive ? REGION_COLORS.striatum : '#baa89b');
        mat.needsUpdate = true;
      }
    });

    // ACC
    const accActive = activeIds.includes('acc');
    accGroup.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        const mat = child.material as THREE.MeshStandardMaterial;
        mat.emissiveIntensity = accActive ? (isConnectionsMode ? 0.95 : 0.75) : 0.05;
        mat.color = new THREE.Color(accActive ? REGION_COLORS.acc : '#c2b2a8');
        mat.needsUpdate = true;
      }
    });

    // Insula
    const insulaActive = activeIds.includes('insula');
    insulaGroup.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        const mat = child.material as THREE.MeshStandardMaterial;
        mat.emissiveIntensity = insulaActive ? (isConnectionsMode ? 0.95 : 0.75) : 0.05;
        mat.color = new THREE.Color(insulaActive ? REGION_COLORS.insula : '#b2c1c6');
        mat.needsUpdate = true;
      }
    });

    // Cerebellum
    const cerebActive = activeIds.includes('cerebellum');
    const cerebMat = cerebMesh.material as THREE.MeshStandardMaterial;
    cerebMat.color = new THREE.Color(cerebActive ? REGION_COLORS.cerebellum : '#c7c0b2');
    cerebMat.emissive = new THREE.Color(REGION_COLORS.cerebellum);
    cerebMat.emissiveIntensity = cerebActive ? (isConnectionsMode ? 0.6 : 0.35) : 0.0;
    cerebMat.needsUpdate = true;

    // 4. Connection Arcs & Dedicated Nodal Hubs in Connections Mode
    arcsGroup.clear();
    if (isConnectionsMode) {
      const nodes = CIRCUIT_NODES[selectedCircuitId];
      const circuitColor =
        selectedCircuitId === 'control-action' ? REGION_COLORS.striatum :
        selectedCircuitId === 'attention' ? REGION_COLORS.parietal :
        selectedCircuitId === 'monitoring' ? REGION_COLORS.acc : REGION_COLORS.cerebellum;

      // Add distinct glowing nodal spheres for cortical nodes (PFC, Parietal) so they are evident
      nodes.forEach((nodeId) => {
        if (nodeId === 'pfc' || nodeId === 'parietal') {
          const pos = REGION_CENTROIDS[nodeId];
          const nodeColor = REGION_COLORS[nodeId];
          const sphereGeo = new THREE.SphereGeometry(1.2, 20, 20);
          const sphereMat = new THREE.MeshStandardMaterial({
            color: new THREE.Color(nodeColor),
            emissive: new THREE.Color(nodeColor),
            emissiveIntensity: 0.9,
            roughness: 0.3,
            metalness: 0.1,
          });
          const sphereMesh = new THREE.Mesh(sphereGeo, sphereMat);
          sphereMesh.position.copy(pos);
          arcsGroup.add(sphereMesh);
        }
      });

      // Draw high-visibility 3D connecting pathways
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const start = REGION_CENTROIDS[nodes[i]];
          const end = REGION_CENTROIDS[nodes[j]];
          const mid = new THREE.Vector3().addVectors(start, end).multiplyScalar(0.5);
          mid.y += 2.4; // graceful arching upward

          const curve = new THREE.QuadraticBezierCurve3(start, mid, end);
          const tubeGeo = new THREE.TubeGeometry(curve, 32, 0.32, 10, false);
          const tubeMat = new THREE.MeshStandardMaterial({
            color: new THREE.Color(circuitColor),
            emissive: new THREE.Color(circuitColor),
            emissiveIntensity: 0.95,
            roughness: 0.25,
            metalness: 0.2,
          });
          const tubeMesh = new THREE.Mesh(tubeGeo, tubeMat);
          arcsGroup.add(tubeMesh);
        }
      }
    }

    // 5. Smooth camera angle transitions
    if (view === 'regions') {
      if (selectedRegionId === 'pfc') {
        targetCamPosRef.current = new THREE.Vector3(18, 12, 25);
      } else if (selectedRegionId === 'parietal') {
        targetCamPosRef.current = new THREE.Vector3(22, 22, -10);
      } else if (selectedRegionId === 'acc') {
        targetCamPosRef.current = new THREE.Vector3(26, 11, 2);
      } else if (selectedRegionId === 'striatum') {
        targetCamPosRef.current = new THREE.Vector3(22, 10, 16);
      } else if (selectedRegionId === 'insula') {
        targetCamPosRef.current = new THREE.Vector3(26, 9, 8);
      } else if (selectedRegionId === 'cerebellum') {
        targetCamPosRef.current = new THREE.Vector3(16, -2, -26);
      }
    } else {
      // Connections view: balanced 3/4 perspective
      targetCamPosRef.current = new THREE.Vector3(25, 15, 20);
    }
  }, [view, selectedRegionId, selectedCircuitId, loading]);

  // Camera preset buttons
  const setCameraPreset = (viewName: 'lateral' | 'medial' | 'dorsal' | 'reset') => {
    if (!controlsRef.current || !cameraRef.current) return;
    if (viewName === 'lateral') {
      targetCamPosRef.current = new THREE.Vector3(32, 8, 0);
    } else if (viewName === 'medial') {
      targetCamPosRef.current = new THREE.Vector3(24, 9, 2);
    } else if (viewName === 'dorsal') {
      targetCamPosRef.current = new THREE.Vector3(0, 36, 0.1);
    } else {
      targetCamPosRef.current = new THREE.Vector3(22, 11, 24);
      controlsRef.current.target.set(0, 7.5, 0);
    }
  };

  return (
    <div className="relative mx-auto w-full aspect-[8/5] min-h-[380px] max-h-[520px] overflow-hidden rounded-[24px] bg-[#fdfcf9] border border-stone-200/90 shadow-[0_8px_24px_rgba(89,97,88,0.08)] select-none">
      {/* Three.js canvas container */}
      <div ref={containerRef} className="h-full w-full cursor-grab active:cursor-grabbing" />

      {/* Loading Overlay */}
      {loading && (
        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-warm-cream/90 backdrop-blur-xs">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-sage-green/15 text-sage-green animate-pulse">
            <Compass className="h-6 w-6 animate-spin" />
          </div>
          <p className="mt-3 text-sm font-semibold text-foreground">Loading anatomical 3D brain model…</p>
          <p className="text-xs text-muted-foreground mt-1">Authentic human gyri, sulci, and frontostriatal circuits</p>
        </div>
      )}

      {/* Error Fallback */}
      {loadError && (
        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center p-6 text-center bg-white/95">
          <p className="text-sm font-bold text-red-600">Failed to render 3D brain</p>
          <p className="mt-1 text-xs text-muted-foreground">{loadError}</p>
        </div>
      )}

      {/* Top Floating Controls */}
      <div className="absolute left-3 top-3 z-10 flex flex-wrap items-center gap-1.5">
        <span className="rounded-full border border-stone-200/90 bg-white/90 px-3 py-1 text-[11px] font-semibold text-stone-700 shadow-2xs backdrop-blur-sm">
          3D Interactive Model · Drag to Rotate
        </span>
      </div>

      {/* View Presets Floating Bar */}
      <div className="absolute right-3 top-3 z-10 flex items-center gap-1 rounded-xl border border-stone-200/80 bg-white/90 p-1 shadow-2xs backdrop-blur-sm">
        <button
          type="button"
          onClick={() => setCameraPreset('lateral')}
          className="rounded-lg px-2.5 py-1 text-[11px] font-semibold text-stone-600 hover:bg-stone-100 hover:text-foreground transition"
          title="Side view of the cerebral cortex"
        >
          Side
        </button>
        <button
          type="button"
          onClick={() => setCameraPreset('dorsal')}
          className="rounded-lg px-2.5 py-1 text-[11px] font-semibold text-stone-600 hover:bg-stone-100 hover:text-foreground transition"
          title="Top view of both hemispheres"
        >
          Top
        </button>
        <button
          type="button"
          onClick={() => setCameraPreset('medial')}
          className="rounded-lg px-2.5 py-1 text-[11px] font-semibold text-stone-600 hover:bg-stone-100 hover:text-foreground transition"
          title="Inner midline structures"
        >
          Internal
        </button>
        <button
          type="button"
          onClick={() => setCameraPreset('reset')}
          className="flex items-center gap-1 rounded-lg px-2 py-1 text-[11px] font-semibold text-sage-green hover:bg-sage-green/10 transition"
          title="Reset 3D camera angle"
        >
          <RotateCcw className="h-3 w-3" />
          Reset
        </button>
      </div>

      {/* Active Highlight Badge at bottom */}
      <div className="absolute bottom-3 left-3 z-10 flex items-center gap-2 rounded-xl border border-stone-200/80 bg-white/95 px-3 py-1.5 shadow-2xs backdrop-blur-sm">
        <span
          className="h-2.5 w-2.5 rounded-full"
          style={{
            backgroundColor:
              view === 'regions'
                ? REGION_COLORS[selectedRegionId]
                : selectedCircuitId === 'control-action'
                ? REGION_COLORS.striatum
                : selectedCircuitId === 'attention'
                ? REGION_COLORS.parietal
                : selectedCircuitId === 'monitoring'
                ? REGION_COLORS.acc
                : REGION_COLORS.cerebellum,
          }}
        />
        <span className="text-xs sm:text-sm font-bold text-foreground">
          {view === 'regions'
            ? selectedRegionId === 'pfc'
              ? 'Anterior Prefrontal Cortex · Frontal Pole & Executive Control'
              : selectedRegionId === 'parietal'
              ? 'Posterior Parietal Cortex · Attentional Spotlight'
              : selectedRegionId === 'acc'
              ? 'Anterior Cingulate (ACC) · Error & Conflict Monitor (Translucent Cutaway)'
              : selectedRegionId === 'striatum'
              ? 'Striatum · Caudate & Putamen Dopamine Hub (Translucent Cutaway)'
              : selectedRegionId === 'insula'
              ? 'Insula · Deep Salience & Urgency Hub (Translucent Cutaway)'
              : 'Cerebellum · Internal Clock & Coordination Base'
            : selectedCircuitId === 'control-action'
            ? 'Control & Action Network · Prefrontal Cortex ↔ Anterior Cingulate ↔ Striatum'
            : selectedCircuitId === 'attention'
            ? 'Attention Control Network · Prefrontal Cortex ↔ Parietal Cortex ↔ Insula'
            : selectedCircuitId === 'monitoring'
            ? 'Salience & Monitoring Network · Insula ↔ Anterior Cingulate ↔ Prefrontal Cortex'
            : 'Timing & Coordination Loop · Prefrontal Cortex ↔ Striatum ↔ Cerebellum'}
        </span>
      </div>

      {/* Subtle Hint on bottom right */}
      <div className="absolute bottom-3 right-3 z-10 hidden sm:block text-[11px] text-stone-500 bg-white/80 backdrop-blur-xs px-2.5 py-1 rounded-lg border border-stone-200/60">
        Pinch or scroll to zoom · Click buttons below to isolate
      </div>
    </div>
  );
}
