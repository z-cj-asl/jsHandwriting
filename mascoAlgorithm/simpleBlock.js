const mosaicify = (imageData) => {
    
    const iLen = imageData.height
    const jLen = imageData.width
    const blockSize = 10 // 马赛克块的大小
    const mosaicifyData = new Array(iLen * jLen)
  
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
            mosaicifyData[currentIndex] = r
            mosaicifyData[currentIndex + 1] = g
            mosaicifyData[currentIndex + 2] = b
            mosaicifyData[currentIndex + 3] = a
          }
        }
      }
    }

    return mosaicifyData
    
}