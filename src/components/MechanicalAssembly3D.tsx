import { useEffect, useRef } from 'react'
import * as THREE from 'three'

export function MechanicalAssembly3D() {
  const containerRef = useRef<HTMLDivElement>(null)
  const mouseRef = useRef({ x: 0, y: 0 })

  useEffect(() => {
    if (!containerRef.current) return

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(
      30,
      containerRef.current.clientWidth / containerRef.current.clientHeight,
      0.1,
      1000
    )
    camera.position.set(0, 0.5, 14)
    camera.lookAt(0, 0, 0)

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true })
    renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.shadowMap.enabled = true
    renderer.shadowMap.type = THREE.PCFSoftShadowMap
    containerRef.current.appendChild(renderer.domElement)

    const primaryColor = new THREE.Color('rgb(71, 99, 204)')
    const accentColor = new THREE.Color('rgb(87, 199, 232)')
    const secondaryColor = new THREE.Color('rgb(62, 64, 84)')

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.4)
    scene.add(ambientLight)

    const directionalLight1 = new THREE.DirectionalLight(0xffffff, 1.2)
    directionalLight1.position.set(5, 8, 5)
    directionalLight1.castShadow = true
    directionalLight1.shadow.mapSize.width = 2048
    directionalLight1.shadow.mapSize.height = 2048
    directionalLight1.shadow.camera.near = 0.5
    directionalLight1.shadow.camera.far = 50
    directionalLight1.shadow.camera.left = -10
    directionalLight1.shadow.camera.right = 10
    directionalLight1.shadow.camera.top = 10
    directionalLight1.shadow.camera.bottom = -10
    directionalLight1.shadow.bias = -0.0001
    scene.add(directionalLight1)

    const directionalLight2 = new THREE.DirectionalLight(accentColor, 0.6)
    directionalLight2.position.set(-5, 3, 4)
    directionalLight2.castShadow = true
    directionalLight2.shadow.mapSize.width = 1024
    directionalLight2.shadow.mapSize.height = 1024
    scene.add(directionalLight2)

    const rimLight = new THREE.DirectionalLight(0xffffff, 0.8)
    rimLight.position.set(-3, -5, -3)
    scene.add(rimLight)

    const fillLight = new THREE.PointLight(0xffffff, 0.3, 20)
    fillLight.position.set(0, -4, 3)
    scene.add(fillLight)

    const mainGroup = new THREE.Group()

    const createInvoluteGear = (
      module: number,
      teeth: number,
      thickness: number,
      color: THREE.Color,
      pressureAngle: number = 20
    ) => {
      const pressureAngleRad = (pressureAngle * Math.PI) / 180
      const pitchRadius = (module * teeth) / 2
      const baseRadius = pitchRadius * Math.cos(pressureAngleRad)
      const outerRadius = pitchRadius + module
      const rootRadius = pitchRadius - 1.25 * module
      const innerRadius = pitchRadius * 0.35

      const shape = new THREE.Shape()
      const angleStep = (2 * Math.PI) / teeth

      for (let i = 0; i < teeth; i++) {
        const toothAngle = i * angleStep
        const halfToothWidth = (Math.PI / teeth) * 0.45
        const filletRadius = module * 0.3

        const rootAngle1 = toothAngle - halfToothWidth
        const rootAngle2 = toothAngle + halfToothWidth
        const tipAngle1 = toothAngle - halfToothWidth * 0.85
        const tipAngle2 = toothAngle + halfToothWidth * 0.85

        if (i === 0) {
          shape.moveTo(
            Math.cos(rootAngle1) * rootRadius,
            Math.sin(rootAngle1) * rootRadius
          )
        } else {
          shape.lineTo(
            Math.cos(rootAngle1) * rootRadius,
            Math.sin(rootAngle1) * rootRadius
          )
        }

        const transitionRadius = (rootRadius + pitchRadius) / 2
        shape.quadraticCurveTo(
          Math.cos(tipAngle1 - 0.05) * transitionRadius,
          Math.sin(tipAngle1 - 0.05) * transitionRadius,
          Math.cos(tipAngle1) * outerRadius,
          Math.sin(tipAngle1) * outerRadius
        )

        shape.lineTo(
          Math.cos(tipAngle2) * outerRadius,
          Math.sin(tipAngle2) * outerRadius
        )

        shape.quadraticCurveTo(
          Math.cos(tipAngle2 + 0.05) * transitionRadius,
          Math.sin(tipAngle2 + 0.05) * transitionRadius,
          Math.cos(rootAngle2) * rootRadius,
          Math.sin(rootAngle2) * rootRadius
        )
      }

      shape.closePath()

      const holePath = new THREE.Path()
      holePath.absarc(0, 0, innerRadius, 0, Math.PI * 2, false)
      shape.holes.push(holePath)

      const extrudeSettings = {
        depth: thickness,
        bevelEnabled: true,
        bevelThickness: 0.02,
        bevelSize: 0.02,
        bevelSegments: 2
      }

      const geometry = new THREE.ExtrudeGeometry(shape, extrudeSettings)
      geometry.center()

      const material = new THREE.MeshStandardMaterial({
        color: color,
        metalness: 0.7,
        roughness: 0.3,
        envMapIntensity: 0.5,
        flatShading: false
      })

      const gear = new THREE.Mesh(geometry, material)
      gear.castShadow = true
      gear.receiveShadow = true

      return { mesh: gear, pitchRadius }
    }

    const module = 0.18
    const gear1Teeth = 18
    const gear2Teeth = 18
    const gear3Teeth = 18

    const gear1Result = createInvoluteGear(module, gear1Teeth, 0.5, primaryColor)
    const gear2Result = createInvoluteGear(module, gear2Teeth, 0.5, accentColor)
    const gear3Result = createInvoluteGear(module, gear3Teeth, 0.5, secondaryColor)

    const gear1 = gear1Result.mesh
    const gear2 = gear2Result.mesh
    const gear3 = gear3Result.mesh

    const pitchRadius1 = gear1Result.pitchRadius
    const pitchRadius2 = gear2Result.pitchRadius
    const pitchRadius3 = gear3Result.pitchRadius

    gear1.position.set(-(pitchRadius1 + pitchRadius2), 0, 0)

    gear2.position.set(0, 0, 0)

    gear3.position.set(pitchRadius2 + pitchRadius3, 0, 0)

    mainGroup.add(gear1)
    mainGroup.add(gear2)
    mainGroup.add(gear3)

    mainGroup.rotation.y = 0
    mainGroup.rotation.x = 0

    scene.add(mainGroup)

    const handleMouseMove = (event: MouseEvent) => {
      mouseRef.current.x = (event.clientX / window.innerWidth) * 2 - 1
      mouseRef.current.y = -(event.clientY / window.innerHeight) * 2 + 1
    }

    window.addEventListener('mousemove', handleMouseMove)

    const handleResize = () => {
      if (!containerRef.current) return
      camera.aspect = containerRef.current.clientWidth / containerRef.current.clientHeight
      camera.updateProjectionMatrix()
      renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight)
    }

    window.addEventListener('resize', handleResize)

    let animationFrameId: number
    const baseSpeed = 0.01

    const toothOffsetAngle1 = Math.PI / gear1Teeth
    const toothOffsetAngle2 = 0
    const toothOffsetAngle3 = Math.PI / gear3Teeth

    gear1.rotation.z = toothOffsetAngle1
    gear2.rotation.z = toothOffsetAngle2
    gear3.rotation.z = toothOffsetAngle3

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate)

      gear1.rotation.z += baseSpeed
      gear2.rotation.z -= baseSpeed * (gear1Teeth / gear2Teeth)
      gear3.rotation.z += baseSpeed * (gear2Teeth / gear3Teeth)

      const targetRotationY = mouseRef.current.x * 0.4
      const targetRotationX = mouseRef.current.y * 0.2

      mainGroup.rotation.y += (targetRotationY - mainGroup.rotation.y) * 0.05
      mainGroup.rotation.x += (targetRotationX - mainGroup.rotation.x) * 0.05

      renderer.render(scene, camera)
    }

    animate()

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('resize', handleResize)
      cancelAnimationFrame(animationFrameId)
      renderer.dispose()
      if (containerRef.current && renderer.domElement) {
        containerRef.current.removeChild(renderer.domElement)
      }
    }
  }, [])

  return (
    <div
      ref={containerRef}
      className="w-full h-full"
    />
  )
}
