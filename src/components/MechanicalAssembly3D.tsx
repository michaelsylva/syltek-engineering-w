import { useEffect, useRef } from 'react'
import * as THREE from 'three'

export function MechanicalAssembly3D() {
  const containerRef = useRef<HTMLDivElement>(null)
  const mouseRef = useRef({ x: 0, y: 0 })

  useEffect(() => {
    if (!containerRef.current) return

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(
      75,
      containerRef.current.clientWidth / containerRef.current.clientHeight,
      0.1,
      1000
    )
    camera.position.z = 5

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true })
    renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    containerRef.current.appendChild(renderer.domElement)

    const primaryColor = new THREE.Color('rgb(71, 99, 204)')
    const accentColor = new THREE.Color('rgb(87, 199, 232)')
    const secondaryColor = new THREE.Color('rgb(62, 64, 84)')

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6)
    scene.add(ambientLight)

    const directionalLight1 = new THREE.DirectionalLight(0xffffff, 0.8)
    directionalLight1.position.set(5, 5, 5)
    scene.add(directionalLight1)

    const directionalLight2 = new THREE.DirectionalLight(accentColor, 0.4)
    directionalLight2.position.set(-5, -5, 2)
    scene.add(directionalLight2)

    const mainGroup = new THREE.Group()

    const createGear = (radius: number, teeth: number, depth: number, color: THREE.Color) => {
      const shape = new THREE.Shape()
      const innerRadius = radius * 0.65
      const toothDepth = radius * 0.15
      const toothWidth = 0.4
      
      const outerRadius = radius
      const pitchRadius = radius - toothDepth / 2
      const rootRadius = radius - toothDepth

      for (let i = 0; i < teeth; i++) {
        const angle = (i / teeth) * Math.PI * 2
        const angleStep = Math.PI * 2 / teeth
        
        const toothStartAngle = angle - toothWidth / pitchRadius
        const toothEndAngle = angle + toothWidth / pitchRadius
        const nextToothStartAngle = angle + angleStep - toothWidth / pitchRadius

        if (i === 0) {
          shape.moveTo(
            Math.cos(toothStartAngle) * outerRadius,
            Math.sin(toothStartAngle) * outerRadius
          )
        } else {
          shape.lineTo(
            Math.cos(toothStartAngle) * outerRadius,
            Math.sin(toothStartAngle) * outerRadius
          )
        }

        shape.lineTo(
          Math.cos(toothEndAngle) * outerRadius,
          Math.sin(toothEndAngle) * outerRadius
        )
        
        shape.lineTo(
          Math.cos(toothEndAngle) * rootRadius,
          Math.sin(toothEndAngle) * rootRadius
        )
        
        shape.lineTo(
          Math.cos(nextToothStartAngle) * rootRadius,
          Math.sin(nextToothStartAngle) * rootRadius
        )
      }

      shape.closePath()

      const holePath = new THREE.Path()
      holePath.absarc(0, 0, innerRadius, 0, Math.PI * 2, false)
      shape.holes.push(holePath)

      const extrudeSettings = {
        depth: depth,
        bevelEnabled: true,
        bevelThickness: 0.02,
        bevelSize: 0.02,
        bevelSegments: 1
      }

      const geometry = new THREE.ExtrudeGeometry(shape, extrudeSettings)
      geometry.center()
      
      const material = new THREE.MeshStandardMaterial({
        color: color,
        metalness: 0.7,
        roughness: 0.3
      })

      const gear = new THREE.Mesh(geometry, material)
      gear.castShadow = true
      gear.receiveShadow = true
      return gear
    }

    const gear1Teeth = 16
    const gear2Teeth = 14
    const gear3Teeth = 12

    const gear1Radius = 1.2
    const gear2Radius = 1.0
    const gear3Radius = 0.8

    const gear1 = createGear(gear1Radius, gear1Teeth, 0.3, primaryColor)
    const gear1Distance = gear1Radius * 0.92
    gear1.position.set(-gear1Distance - gear2Radius * 0.92, 0, 0)
    gear1.rotation.x = Math.PI / 2
    mainGroup.add(gear1)

    const gear2 = createGear(gear2Radius, gear2Teeth, 0.25, accentColor)
    gear2.position.set(0, 0, 0)
    gear2.rotation.x = Math.PI / 2
    mainGroup.add(gear2)

    const gear3 = createGear(gear3Radius, gear3Teeth, 0.2, secondaryColor)
    const gear3Distance = gear2Radius * 0.92 + gear3Radius * 0.92
    gear3.position.set(gear3Distance, 0, 0)
    gear3.rotation.x = Math.PI / 2
    mainGroup.add(gear3)

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
    const baseSpeed = 0.015

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate)

      gear1.rotation.y += baseSpeed
      gear2.rotation.y -= baseSpeed * (gear1Teeth / gear2Teeth)
      gear3.rotation.y += baseSpeed * (gear2Teeth / gear3Teeth)

      const targetRotationY = mouseRef.current.x * 0.15
      const targetRotationX = mouseRef.current.y * 0.15

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
      style={{ minHeight: '400px' }}
    />
  )
}
