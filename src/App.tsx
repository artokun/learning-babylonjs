import * as React from 'react'
import { FreeCamera, Vector3, HemisphericLight, Mesh } from 'babylonjs'
import { Scene, SceneEventArgs } from './Babylon'

const App: React.SFC = () => {
  const onSceneMount = (e: SceneEventArgs) => {
    const { canvas, scene, engine } = e

    const camera = new FreeCamera('camera1', new Vector3(0, 5, -10), scene)
    camera.setTarget(Vector3.Zero())
    camera.attachControl(canvas, true)

    const light = new HemisphericLight('light1', new Vector3(0, 1, 0), scene)
    light.intensity = 0.7

    const sphere = Mesh.CreateSphere('sphere1', 16, 2, scene)
    sphere.position.y = 1

    const ground = Mesh.CreateGround('ground1', 6, 6, 2, scene)

    engine.runRenderLoop(() => {
      if (scene) {
        scene.render()
      }
    })
  }

  return (
    <Scene
      onSceneMount={onSceneMount}
      width={window.innerWidth}
      height={window.innerHeight}
    />
  )
}

export { App }
