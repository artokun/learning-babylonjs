import React, { useEffect, useRef } from 'react'
import { Engine, Scene, EngineOptions } from 'babylonjs'

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

export { Game }
