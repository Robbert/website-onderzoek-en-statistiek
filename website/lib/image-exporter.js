// based on https://github.com/im-salman/react-component-export-image/blob/master/index.js

import html2canvas from 'html2canvas'

const fileType = {
  PNG: 'image/png',
  JPEG: 'image/jpeg',
}

const DEFAULT_PNG = {
  fileName: 'component.png',
  type: fileType.PNG,
  html2CanvasOptions: {},
}

const DEFAULT_JPEG = {
  fileName: 'component.jpg',
  type: fileType.JPEG,
  html2CanvasOptions: {},
}

const saveAs = (uri, filename) => {
  const link = document.createElement('a')

  if (typeof link.download === 'string') {
    link.href = uri
    link.download = filename
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  } else {
    window.open(uri)
  }
}

const exportComponent = async (
  node,
  { fileName, type, html2CanvasOptions },
) => {
  if (!node.current) {
    throw new Error("'node' must be a RefObject")
  }

  const canvas = await html2canvas(node.current, {
    scrollY: -window.scrollY,
    useCORS: true,
    ...html2CanvasOptions,
  })
  saveAs(canvas.toDataURL(type, 1), fileName)
}

export const exportComponentAsPNG = (node, parameters = {}) =>
  exportComponent(node, { ...DEFAULT_PNG, ...parameters })

export const exportComponentAsJPEG = (node, parameters = {}) =>
  exportComponent(node, { ...DEFAULT_JPEG, ...parameters })
