import typography from '@tailwindcss/typography';
import type { Config } from 'tailwindcss';
import daisyui from 'daisyui';

export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			colors: {
				text: {
					default: '#ffd6fb',
					50: '#ffe5fc',
					100: '#ffccfa',
					200: '#ff99f5',
					300: '#ff66f0',
					400: '#ff33eb',
					500: '#ff00e6',
					600: '#cc00b8',
					700: '#99008a',
					800: '#66005c',
					900: '#33002e',
					950: '#1a0017'
				},
				background: {
					default: '#270135',
					50: '#f8e6fe',
					100: '#f1cdfe',
					200: '#e39bfd',
					300: '#d569fc',
					400: '#c737fb',
					500: '#b905fa',
					600: '#9404c8',
					700: '#6f0396',
					800: '#4a0264',
					900: '#250132',
					950: '#120119'
				},
				primary: {
					default: '#ff2ab4',
					50: '#ffe5f6',
					100: '#ffcced',
					200: '#ff99db',
					300: '#ff66c9',
					400: '#ff33b8',
					500: '#ff00a6',
					600: '#cc0085',
					700: '#990063',
					800: '#660042',
					900: '#330021',
					950: '#1a0011'
				},
				secondary: {
					default: '#c3009d',
					50: '#ffe5fa',
					100: '#ffccf5',
					200: '#ff99eb',
					300: '#ff66e0',
					400: '#ff33d6',
					500: '#ff00cc',
					600: '#cc00a3',
					700: '#99007a',
					800: '#660052',
					900: '#330029',
					950: '#1a0014'
				},
				accent: {
					default: '#8327fb',
					50: '#f1e6fe',
					100: '#e2cdfe',
					200: '#c59bfd',
					300: '#a969fc',
					400: '#8c37fb',
					500: '#6f05fa',
					600: '#5904c8',
					700: '#430396',
					800: '#2c0264',
					900: '#160132',
					950: '#0b0119'
				}
			}
		}
	},

	plugins: [typography, daisyui],

	daisyui: {
		themes: [
			{
				mytheme: {
					primary: '#ff2ab4',
					secondary: '#c3009d',
					accent: '#8327fb',
					neutral: '#ffd6fb',
					'base-100': '#000000',
					info: '#0000ff',
					success: '#00ff00',
					warning: '#00ff00',
					error: '#ff0000'
				}
			}
		]
	}
} satisfies Config;
