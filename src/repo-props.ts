import { getInput } from '@actions/core'

/**
 * Get repository level property defaults.
 */
async function getRepoProps() {
  const assetPath = getInput(`path`)
  const commitMsg = getInput(`commitMsg`)
  const background = getInput(`background`)
  const fontColor = getInput(`fontColor`)
  const componentUrl = getInput('componentUrl')
  const fontSize = getInput('fontSize')
  const headingSize = getInput('headingSize')
  const width = getInput('width')
  const height = getInput('height')
  return {
    assetPath,
    componentUrl,
    commitMsg,
    background,
    fontColor,
    fontSize,
    headingSize,
    width,
    height,
  }
}

export default getRepoProps
