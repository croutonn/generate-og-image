import { getOctokit } from '@actions/github'
import { GITHUB_TOKEN } from './constants'

const octokit = getOctokit(GITHUB_TOKEN as string)

export default octokit
