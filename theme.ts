import type { CustomThemeConfig } from '@skeletonlabs/tw-plugin';

export const theme: CustomThemeConfig = {
	name: 'theme',
	properties: {
		// =~= Theme Properties =~=
		'--theme-font-family-base': `Karla, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji'`,
		'--theme-font-family-heading': `Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji'`,
		'--theme-font-color-base': '0 0 0',
		'--theme-font-color-dark': '255 255 255',
		'--theme-rounded-base': '9999px',
		'--theme-rounded-container': '8px',
		'--theme-border-base': '1px',
		// =~= Theme On-X Colors =~=
		'--on-primary': '0 0 0',
		'--on-secondary': '0 0 0',
		'--on-tertiary': '0 0 0',
		'--on-success': '0 0 0',
		'--on-warning': '0 0 0',
		'--on-error': '0 0 0',
		'--on-surface': '255 255 255',
		// =~= Theme Colors  =~=
		// primary | #8897F4
		'--color-primary-50': '237 239 253', // #edeffd
		'--color-primary-100': '231 234 253', // #e7eafd
		'--color-primary-200': '225 229 252', // #e1e5fc
		'--color-primary-300': '207 213 251', // #cfd5fb
		'--color-primary-400': '172 182 247', // #acb6f7
		'--color-primary-500': '136 151 244', // #8897F4
		'--color-primary-600': '122 136 220', // #7a88dc
		'--color-primary-700': '102 113 183', // #6671b7
		'--color-primary-800': '82 91 146', // #525b92
		'--color-primary-900': '67 74 120', // #434a78
		// secondary | #f2a272
		'--color-secondary-50': '253 241 234', // #fdf1ea
		'--color-secondary-100': '252 236 227', // #fcece3
		'--color-secondary-200': '252 232 220', // #fce8dc
		'--color-secondary-300': '250 218 199', // #fadac7
		'--color-secondary-400': '246 190 156', // #f6be9c
		'--color-secondary-500': '242 162 114', // #f2a272
		'--color-secondary-600': '218 146 103', // #da9267
		'--color-secondary-700': '182 122 86', // #b67a56
		'--color-secondary-800': '145 97 68', // #916144
		'--color-secondary-900': '119 79 56', // #774f38
		// tertiary | #D181E9
		'--color-tertiary-50': '248 236 252', // #f8ecfc
		'--color-tertiary-100': '246 230 251', // #f6e6fb
		'--color-tertiary-200': '244 224 250', // #f4e0fa
		'--color-tertiary-300': '237 205 246', // #edcdf6
		'--color-tertiary-400': '223 167 240', // #dfa7f0
		'--color-tertiary-500': '209 129 233', // #D181E9
		'--color-tertiary-600': '188 116 210', // #bc74d2
		'--color-tertiary-700': '157 97 175', // #9d61af
		'--color-tertiary-800': '125 77 140', // #7d4d8c
		'--color-tertiary-900': '102 63 114', // #663f72
		// success | #26B877
		'--color-success-50': '222 244 235', // #def4eb
		'--color-success-100': '212 241 228', // #d4f1e4
		'--color-success-200': '201 237 221', // #c9eddd
		'--color-success-300': '168 227 201', // #a8e3c9
		'--color-success-400': '103 205 160', // #67cda0
		'--color-success-500': '38 184 119', // #26B877
		'--color-success-600': '34 166 107', // #22a66b
		'--color-success-700': '29 138 89', // #1d8a59
		'--color-success-800': '23 110 71', // #176e47
		'--color-success-900': '19 90 58', // #135a3a
		// warning | #EEBB3A
		'--color-warning-50': '252 245 225', // #fcf5e1
		'--color-warning-100': '252 241 216', // #fcf1d8
		'--color-warning-200': '251 238 206', // #fbeece
		'--color-warning-300': '248 228 176', // #f8e4b0
		'--color-warning-400': '243 207 117', // #f3cf75
		'--color-warning-500': '238 187 58', // #EEBB3A
		'--color-warning-600': '214 168 52', // #d6a834
		'--color-warning-700': '179 140 44', // #b38c2c
		'--color-warning-800': '143 112 35', // #8f7023
		'--color-warning-900': '117 92 28', // #755c1c
		// error | #ff6181
		'--color-error-50': '255 231 236', // #ffe7ec
		'--color-error-100': '255 223 230', // #ffdfe6
		'--color-error-200': '255 216 224', // #ffd8e0
		'--color-error-300': '255 192 205', // #ffc0cd
		'--color-error-400': '255 144 167', // #ff90a7
		'--color-error-500': '255 97 129', // #ff6181
		'--color-error-600': '230 87 116', // #e65774
		'--color-error-700': '191 73 97', // #bf4961
		'--color-error-800': '153 58 77', // #993a4d
		'--color-error-900': '125 48 63', // #7d303f
		// surface | https://www.tints.dev/surface/14151B | 900-0-0-100-0
		'--color-surface-50': '240 241 244', // #F0F1F4
		'--color-surface-100': '226 227 233', // #E2E3E9
		'--color-surface-200': '196 199 212', // #C4C7D4
		'--color-surface-300': '167 171 190', // #A7ABBE
		'--color-surface-400': '138 142 168', // #8A8EA8
		'--color-surface-500': '109 114 146', // #6D7292
		'--color-surface-600': '85 89 114', // #555972
		'--color-surface-700': '63 66 85', // #3F4255
		'--color-surface-800': '41 43 56', // #292B38
		'--color-surface-900': '20 21 27' // #14151B
	}
};
