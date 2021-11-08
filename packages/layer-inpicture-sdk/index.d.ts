import { Config } from './src/types'

declare global {
	interface Window {
		initInPicture: (v: Config) => void
	}
}

export {}
