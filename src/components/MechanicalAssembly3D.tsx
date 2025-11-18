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
      const innerRadius = radius * 0.6
      const toothHeight = radius * 0.2
      const toothWidth = (Math.PI * 2 * radius) / teeth / 2

      for (let i = 0; i < teeth; i++) {
        const angle = (i / teeth) * Math.PI * 2
        const nextAngle = ((i + 1) / teeth) * Math.PI * 2

        if (i === 0) {
          shape.moveTo(
            Math.cos(angle) * (radius + toothHeight),
            Math.sin(angle) * (radius + toothHeight)
          )
        }

        const midAngle = (angle + nextAngle) / 2
        shape.lineTo(
          Math.cos(angle) * (radius + toothHeight),
          Math.sin(angle) * (radius + toothHeight)
        )
        shape.lineTo(
          Math.cos(midAngle - toothWidth / radius) * radius,
          Math.sin(midAngle - toothWidth / radius) * radius
        )
        shape.lineTo(
          Math.cos(midAngle + toothWidth / radius) * radius,
          Math.sin(midAngle + toothWidth / radius) * radius
        )
        shape.lineTo(
          Math.cos(nextAngle) * (radius + toothHeight),
          Math.sin(nextAngle) * (radius + toothHeight)
        )
      }

      shape.closePath()

      const holePath = new THREE.Path()
      holePath.absarc(0, 0, innerRadius, 0, Math.PI * 2, false)
      shape.holes.push(holePath)

      const extrudeSettings = {
        depth: depth,
        bevelEnabled: true,
        bevelThickness: 0.05,
        bevelSize: 0.05,
        bevelSegments: 2
      }

      const geometry = new THREE.ExtrudeGeometry(shape, extrudeSettings)
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

    const gear1 = createGear(1.8, 12, 0.3, primaryColor)
    gear1.position.set(-2.2, 0, 0)
    mainGroup.add(gear1)

    const gear2 = createGear(1.3, 9, 0.25, accentColor)
    gear2.position.set(0.4, 0, 0)
    mainGroup.add(gear2)

    const gear3 = createGear(0.9, 8, 0.2, secondaryColor)
    gear3.position.set(2.3, 0, 0)
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

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate)

      gear1.rotation.z += 0.005
      gear2.rotation.z -= 0.007
      gear3.rotation.z += 0.009

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
