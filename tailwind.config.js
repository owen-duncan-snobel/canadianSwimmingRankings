module.exports = {
	future: {},
	purge: [],
	theme: {
		extend: {
			colors: {
				babyBlue: '#00aad8',
				spaceGrey: '#000000',
			},
		},
	},
	extend: {},
	variants: {},
	plugins: [require('tailwindcss'), require('autoprefixer')],
};
