import puppeteer from 'puppeteer-core'
import { IViewport } from './types'

async function generateImage(viewport: IViewport, html: string) {
  const browser = await puppeteer.launch({
    args: ['--no-sandbox'],
  })
  const page = await browser.newPage()
  page.setViewport({
    width: +viewport.width,
    height: +viewport.height,
  })
  await page.setContent(html)
  await page.evaluateHandle('document.fonts.ready')
  const image = await page.screenshot({ encoding: 'base64' })
  await browser.close()
  return image
}

export default generateImage
