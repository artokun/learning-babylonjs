import React, { useEffect, useRef } from 'react'

import * as BABYLON from 'babylonjs'

export type SceneEventArgs = {
  engine: BABYLON.Engine
  scene: BABYLON.Scene
  canvas: HTMLCanvasElement
}

export type SceneProps = {
  engineOptions?: BABYLON.EngineOptions
  adaptToDeviceRatio?: boolean
  onSceneMount?: (args: SceneEventArgs) => void
  width?: number
  height?: number
}

export const Scene: React.SFC<
  SceneProps & React.HTMLAttributes<HTMLCanvasElement>
> = ({
  engineOptions,
  adaptToDeviceRatio,
  onSceneMount,
  width,
  height,
  ...rest
}) => {
  let scene: BABYLON.Scene
  let engine: BABYLON.Engine
  const canvas: React.RefObject<HTMLCanvasElement> = useRef(null)

  useEffect(() => {
    // basic init
    engine = new BABYLON.Engine(
      canvas.current,
      true,
      engineOptions,
      adaptToDeviceRatio
    )
    scene = new BABYLON.Scene(engine)

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

  // const onCanvasLoaded = (c: HTMLCanvasElement) => {
  //   if (c !== null) {
  //     canvas = c
  //   }
  // }

  const opts: any = {}

  if (width !== undefined && height !== undefined) {
    opts.width = width
    opts.height = height
  }

  return <canvas {...opts} {...rest} ref={canvas} />
}
