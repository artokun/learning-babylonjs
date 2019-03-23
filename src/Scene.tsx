import React, { useState } from 'react'
import { FreeCamera, Vector3, HemisphericLight, Mesh } from 'babylonjs'
import { Game, SceneEventArgs } from './Game'

export interface State {
  assets: any[]
  currentLevel: number
  player: any
  level: any
}

const initialState: State = {
  assets: [],
  currentLevel: 1,
  player: null,
  level: null
}

const Scene: React.SFC = () => {
  const [state, setState] = useState(initialState)

  const handleSceneMount = (e: SceneEventArgs) => {
    // Middleware
    initScene(e)
    initGame(e, state, setState)

    // Start Update Loop
    e.engine.runRenderLoop(() => {
      if (e.scene) {
        e.scene.render()
      }
    })
  }

  const engineOptions = {
    preserveDrawingBuffer: true,
    stencil: true
  }

  return <Game onSceneMount={handleSceneMount} engineOptions={engineOptions} />
}

const initGame = (
  e: SceneEventArgs,
  state: State,
  setState: React.Dispatch<React.SetStateAction<State>>
) => {}

const initScene = (e: SceneEventArgs) => {
  const { canvas, scene } = e

  const camera = new FreeCamera('camera', new Vector3(2.5, 6, -6.5), scene)
  camera.rotation = new Vector3(Math.PI / 3.5, 0, 0)
  camera.attachControl(canvas, true)

  const light = new HemisphericLight('light', new Vector3(0, 1, 0), scene)
  light.intensity = 0.7
}

export { Scene }
