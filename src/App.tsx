import * as React from 'react'
import { FreeCamera, Vector3, HemisphericLight, Mesh } from 'babylonjs'
import { Scene, SceneEventArgs } from './Babylon'

const App: React.SFC = () => {
  const onSceneMount = (e: SceneEventArgs) => {
    const { canvas, scene, engine } = e

    const camera = new FreeCamera('camera1', new Vector3(5, 5, -5), scene)
    camera.setTarget(Vector3.Zero())
    camera.attachControl(canvas, true)

    const light = new HemisphericLight('light1', new Vector3(0, 1, 0), scene)
    light.intensity = 0.7

    const cube = Mesh.CreateBox('box1', 1, scene)

    engine.runRenderLoop(() => {
      if (scene) {
        scene.render()
      }
    })
  }

  return <Scene onSceneMount={onSceneMount} />
}

export { App }
