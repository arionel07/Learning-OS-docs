module.exports = {
	content: [],
	theme: {
		extend: {
			keyframes: {
				shimmer: {
					'0%': { transform: 'translateX(-200%)' }, // ← начинает слева за экраном
					'100%': { transform: 'translateX(400%)' } // ← уходит вправо за экран
				}
			},
			animation: {
				shimmer: 'shimmer 1.8s ease-in-out infinite'
			}
		}
	}
}
