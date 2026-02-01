/**
 * threejs-background.js
 * Three.js 3D背景アニメーション
 * Three.js 3D background animation
 * 
 * 注意: このファイルは元のscript.jsの492-713行目のinitializeThreeJS()関数を含みます
 * Note: This file contains the initializeThreeJS() function from lines 492-713 of the original script.js
 * 
 * 機能:
 * - パーティクルシステム（AtCoderカラー）
 * - マウス追従
 * - 波動アニメーション
 * - パーティクル間の接続線
 */

export function initializeThreeJS() {
    console.log('🎨 Initializing Three.js...');
    
    // Three.jsが読み込まれているか確認
    if (typeof THREE === 'undefined') {
        console.warn('Three.js not loaded, skipping 3D background');
        return;
    }
    
    console.log('✅ Three.js loaded successfully');

    const canvas = document.getElementById('hero-canvas');
    if (!canvas) {
        console.error('❌ Canvas element not found');
        return;
    }
    
    console.log('✅ Canvas found, creating scene...');

    // シーン、カメラ、レンダラーの設定
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ 
        canvas: canvas,
        alpha: true,
        antialias: true 
    });

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    camera.position.z = 5;

    // AtCoderカラーパレット
    const colors = [
        new THREE.Color(0xA0A0A0), // Gray
        new THREE.Color(0xA05000), // Brown
        new THREE.Color(0x00FF00), // Green
        new THREE.Color(0x00FFFF), // Cyan
        new THREE.Color(0x4080FF), // Blue
        new THREE.Color(0xFFFF00), // Yellow
        new THREE.Color(0xFFAA00), // Orange
        new THREE.Color(0xFF0000)  // Red
    ];

    // パーティクル群の作成
    const particlesGroups = [];
    
    createParticleGroup(2500, 0.08, 0.9);
    createParticleGroup(200, 0.15, 1.0, true);
    createParticleGroup(50, 0.3, 1.0, true);

    function createParticleGroup(count, size, opacity, glow = false) {
        const geometry = new THREE.BufferGeometry();
        const posArray = new Float32Array(count * 3);
        const colorsArray = new Float32Array(count * 3);
        const sizesArray = new Float32Array(count);

        for (let i = 0; i < count * 3; i += 3) {
            const radius = 8 + Math.random() * 12;
            const theta = Math.random() * Math.PI * 2;
            const phi = Math.random() * Math.PI;
            
            posArray[i] = radius * Math.sin(phi) * Math.cos(theta);
            posArray[i + 1] = radius * Math.sin(phi) * Math.sin(theta);
            posArray[i + 2] = radius * Math.cos(phi);

            const randomColor = colors[Math.floor(Math.random() * colors.length)];
            colorsArray[i] = randomColor.r;
            colorsArray[i + 1] = randomColor.g;
            colorsArray[i + 2] = randomColor.b;
            
            sizesArray[i / 3] = size * (0.5 + Math.random() * 0.5);
        }

        geometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
        geometry.setAttribute('color', new THREE.BufferAttribute(colorsArray, 3));
        geometry.setAttribute('size', new THREE.BufferAttribute(sizesArray, 1));

        const material = new THREE.PointsMaterial({
            size: size,
            vertexColors: true,
            transparent: true,
            opacity: opacity,
            blending: THREE.AdditiveBlending,
            sizeAttenuation: true
        });

        const mesh = new THREE.Points(geometry, material);
        scene.add(mesh);
        particlesGroups.push({ mesh, geometry, glow, speed: 0.2 + Math.random() * 0.3 });
    }

    // マウス追従
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    document.addEventListener('mousemove', (event) => {
        mouseX = (event.clientX / window.innerWidth) * 2 - 1;
        mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
    });

    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });

    // アニメーションループ
    let time = 0;
    function animate() {
        requestAnimationFrame(animate);
        time += 0.005;

        particlesGroups.forEach((group) => {
            const { mesh, geometry, glow, speed } = group;
            
            mesh.rotation.y = time * speed * 0.3;
            mesh.rotation.x = time * speed * 0.2;
            mesh.rotation.z = time * speed * 0.1;

            const positions = geometry.attributes.position.array;
            const sizes = geometry.attributes.size.array;
            
            for (let i = 0; i < positions.length / 3; i++) {
                const i3 = i * 3;
                const x = positions[i3];
                const y = positions[i3 + 1];
                const z = positions[i3 + 2];
                
                const wave = Math.sin(time * 2 + x * 0.3 + y * 0.3 + z * 0.3) * 0.02;
                positions[i3] += wave * Math.cos(time + i * 0.1);
                positions[i3 + 1] += wave * Math.sin(time + i * 0.1);
                positions[i3 + 2] += wave * Math.cos(time * 0.5 + i * 0.1);
                
                if (glow && sizes[i]) {
                    sizes[i] = geometry.attributes.size.array[i] * (1 + Math.sin(time * 3 + i) * 0.3);
                }
            }
            
            geometry.attributes.position.needsUpdate = true;
            if (glow) {
                geometry.attributes.size.needsUpdate = true;
            }
        });

        targetX += (mouseX - targetX) * 0.05;
        targetY += (mouseY - targetY) * 0.05;
        
        camera.position.x = targetX * 2;
        camera.position.y = targetY * 2;
        camera.lookAt(scene.position);

        renderer.render(scene, camera);
    }

    console.log('🚀 Starting animation loop...');
    animate();
}
