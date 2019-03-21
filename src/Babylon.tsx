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

const BabylonScene: React.SFC<
  SceneProps & React.HTMLAttributes<HTMLCanvasElement>
> = ({
  engineOptions,
  adaptToDeviceRatio,
  onSceneMount,
  width,
  height,
  ...rest
}) => {
  let scene: Scene
  let engine: Engine
  const canvas: React.RefObject<HTMLCanvasElement> = useRef(null)

  useEffect(() => {
    // basic init
    engine = new Engine(canvas.current, true, engineOptions, adaptToDeviceRatio)
    scene = new Scene(engine)

    // scene mount
    if (typeof onSceneMount === 'function' && canvas.current) {
      onSceneMount({ scene, engine, canvas: canvas.current })
    } else {
      console.error('onSceneMount function not available')
    }

    // resize handler
    window.addEventListener('resize', onResizeWindow)
    return () => window.removeEventListener('resize', onResizeWindow)
  }, [])

  const onResizeWindow = () => {
    if (engine) {
      engine.resize()
    }
  }

  const opts: any = {}

  if (width !== undefined && height !== undefined) {
    opts.width = width
    opts.height = height
  }

  return <canvas {...opts} {...rest} ref={canvas} />
}

export { BabylonScene as Scene }
