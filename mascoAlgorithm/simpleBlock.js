function simpleMosaicify (frame)  {
    let imageData = frame.data
    const iLen = frame.width
    const jLen = frame.height
    const blockSize = 10 // 马赛克块的大小
    //const mosaicifyData = new Array(iLen * jLen)
  
    // 将每一块马赛克中的所有像素点的 rgba 都修改为块中第一个像素点的 rgba
    for (let i = 0; i < iLen; i += blockSize) {
      for (let j = 0; j < jLen; j += blockSize) {
        const index = i * 4 * jLen + j * 4
        const r = imageData[index]
        const g = imageData[index + 1]
        const b = imageData[index + 2]
        const a = imageData[index + 3]
  
        const _iLen = Math.min(i + blockSize, iLen)
        const _jLen = Math.min(j + blockSize, jLen)
        for (let _i = i; _i < _iLen; _i++) {
          for (let _j = j; _j < _jLen; _j++) {
            const currentIndex = _i * 4 * jLen + _j * 4
            imageData[currentIndex] = r
            imageData[currentIndex + 1] = g
            imageData[currentIndex + 2] = b
            imageData[currentIndex + 3] = a
          }
        }
      }
    }

    //return imageData
    
}
import config from './config'
console.log(config)

let Mcanvas = document.getElementById('canvas')
let ctx = Mcanvas.getContext('2d') 
// ctx.fillStyle = "green";
// ctx.fillRect(20, 30, 50, 50)
let masco = document.getElementById('masco')
let mascoCtx = masco.getContext('2d') 

let image = document.querySelector('img')

ctx.drawImage(image, 0, 0, 250, 250)

ctx.drawImage(image, 0, 0, 1080, 1080)

let originalData = ctx.getImageData(0, 0, 250, 250)
let originalDataTem = ctx.getImageData(0, 0, 1080, 1080)

simpleMosaicify(originalData)
mascoCtx.putImageData(originalData, 0, 0)

simpleMosaicify(originalDataTem)
mascoCtx.putImageData(originalDataTem, 300, 0)

image.onload = ()=>{
  console.log('aaa')
  ctx.drawImage(image, 0, 0, 250, 250)
  
  let originalData = ctx.getImageData(0, 0, 250, 250)

  let simpleBlockMoscoData = simpleMosaicify(originalData)

  mascoCtx.drawImage(simpleBlockMoscoData, 0, 0, 250, 250)
}
        