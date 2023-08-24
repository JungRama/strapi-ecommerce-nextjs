export interface ImageInterface {
  id: number
  name: string
  alternativeText: any
  caption: any
  width: number
  height: number
  formats: {
    large: {
      ext: string
      url: string
      hash: string
      mime: string
      name: string
      path: any
      size: number
      width: number
      height: number
    }
    small: {
      ext: string
      url: string
      hash: string
      mime: string
      name: string
      path: any
      size: number
      width: number
      height: number
    }
    medium: {
      ext: string
      url: string
      hash: string
      mime: string
      name: string
      path: any
      size: number
      width: number
      height: number
    }
    thumbnail: {
      ext: string
      url: string
      hash: string
      mime: string
      name: string
      path: any
      size: number
      width: number
      height: number
    }
  }
  hash: string
  ext: string
  mime: string
  size: number
  url: string
  previewUrl: any
  provider: string
  provider_metadata: any
  createdAt: string
  updatedAt: string
}