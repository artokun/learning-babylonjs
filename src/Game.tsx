import React, { useEffect, useRef } from 'react'
import {
  Engine,
  Scene,
  EngineOptions,
  Mesh,
  Vector2,
  VertexData
} from 'babylonjs'

export type SceneEventArgs = {
  engine: Engine
  scene: Scene
  canvas: HTMLCanvasElement
}

export type SceneProps = {
  engineOptions?: EngineOptions
  adaptToDeviceRatio?: boolean
  onSceneMount?: (args: SceneEventArgs) => void
  width?: number
  height?: number
}

const Game: React.SFC<SceneProps & React.HTMLAttributes<HTMLCanvasElement>> = ({
  engineOptions,
  adaptToDeviceRatio,
  onSceneMount,
  width,
  height,
  ...rest
}) => {
  const canvas: React.RefObject<HTMLCanvasElement> = useRef(null)

  useEffect(() => {
    if (canvas && canvas.current) {
      // Init Engine
      const engine = new Engine(
        canvas.current,
        true,
        engineOptions,
        adaptToDeviceRatio
      )

      // Init Scene
      const scene = new Scene(engine)
      if (typeof onSceneMount === 'function' && canvas.current) {
        onSceneMount({ scene, engine, canvas: canvas.current })
      } else {
        console.error('onSceneMount function not available')
      }

      // Enable Debugger
      scene.debugLayer.show()

      // Listen on Resize
      const onResizeWindow = () => engine && engine.resize()
      window.addEventListener('resize', onResizeWindow)
      return () => window.removeEventListener('resize', onResizeWindow)
    }
  }, [canvas])

  const opts: any = {}

  if (width !== undefined && height !== undefined) {
    opts.width = width
    opts.height = height
  }

  return <canvas {...opts} {...rest} ref={canvas} />
}

class GameObject extends Mesh {
  name: string
  scene: Scene

  constructor(name: string, scene: Scene) {
    super(name, scene)
    this.name = name
    this.scene = scene
  }
}

class Player extends GameObject {
  body: any
  directions: Vector2
  rotations: Vector2

  constructor(scene: Scene) {
    super('player', scene)
    this.body = null
    this.directions = new Vector2(0, 0)
    this.rotations = new Vector2(0, 0)

    const vertexData = VertexData.CreateSphere({
      segments: 16,
      diameter: 0.75,
      sideOrientation: Mesh.DEFAULTSIDE
    })
    vertexData.applyToMesh(this)

    this.position.y = Player.START_HEIGHT

    scene.registerBeforeRender(() => {
      if (this.position.y > -10) {
        this.scene
      }
    })
  }

  static START_HEIGHT = 1
}

export { Game, GameObject }
