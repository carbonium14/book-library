import goodStorage from 'good-storage'
export class ImgUtil {
  static imgList: Record<string, string> = {}
  static storageImgList() {
    this.imgList = goodStorage.get('imgList') || {}
    if (this.isEmpty()) {
      this.loadAllImg()
      goodStorage.set('imgList', this.imgList)
    }
  }
  static isEmpty() {
    return !Object.getOwnPropertyNames(this.imgList).length
  }
  static getImg(imgName: string) {
    return ImgUtil.imgList[imgName]
  }
  static loadAllImg() {
    const imgMap: Record<string, any> = import.meta.glob('../assets/img/**/*.png', { eager: true })
    let absolutePath: string = ''
    let imgName: string = ''
    for (const relativePath in imgMap) {
      absolutePath = imgMap[relativePath].default
      if (absolutePath) {
        imgName = absolutePath.substring(absolutePath.lastIndexOf('/') + 1)
        this.imgList[imgName] = absolutePath
      }
    }
  }
}
export default ImgUtil.getImg