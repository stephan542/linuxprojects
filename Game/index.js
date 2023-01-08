let createScreen =()=>{
    let scene = new BABYLON.Scene(engine);

    let camera = new BABYLON.FreeCamera('camera1', new BABYLON.Vector3(0,5,-10),scene);
    let ground = BABYLON.MeshBuilder.CreateGround("ground", {width: 6, height: 6}, scene);
    
    return scene;
}

const canvas = document.getElementById('gameScreen');
const engine = new BABYLON.Engine(canvas,true);

const scene = createScreen();

engine.runRenderLoop(()=>{
    scene.render();
})

window.addEventListener("resize",function(){
    engine.resize;
});