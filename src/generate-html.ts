import marked from 'marked'
import twemoji from 'twemoji'

import { IRepoProps } from './types'

function createVariables(name: string, value?: string) {
  if (value) {
    return `--${name}: ${value};`
  }
  return ''
}

function getImageUrl(imageUrl?: string) {
  if (!imageUrl) {
    return ''
  }
  if (twemoji.test(imageUrl)) {
    return twemoji.parse(imageUrl, {
      attributes: () => ({
        slot: 'image',
      }),
    })
  }
  return `<img slot="image" src="${imageUrl}" height="100%" />`
}

function getMarked(text?: string) {
  if (!text) {
    return ''
  }
  return marked(text)
}

function generateHtml(prop: Partial<IRepoProps>) {
  return `
    <!doctype html>
    <html lang="ja">
    <head>
      <meta charset="utf-8">
      <link href="https://fonts.googleapis.com/css2?family=Rubik:wght@700&family=Noto+Sans+JP:wght@400;700&family=Open+Sans" rel="stylesheet">
      <style>
        body {
          margin: 0;
          font-family: 'Open Sans', 'Noto Sans JP', sans-serif;
        }
        og-image-element {
          --headingFont: 'Rubik', 'Noto Sans JP', sans-serif;
          --headingWeight: 700;
          ${createVariables('fontColor', prop.fontColor)}
          ${createVariables('background', prop.background)}
          ${createVariables('fontSize', prop.fontSize)}
          ${createVariables('headingSize', prop.headingSize)}
        }
      </style>
      <script type="module" rel="preload" src="${prop.componentUrl}"></script>
    </head>
    <body>
      <og-image-element subtitle="${prop.subtitle || ''}">
        ${getImageUrl(prop.imageUrl)}
        <div slot="title">${getMarked(prop.title)}</div>
      </og-image-element>
    </body>
    </html>
  `
}

export default generateHtml
