export function debounce(fn, delay = 50, immediate) {
	let timer
	
	return function() {
		if (immediate) {
			fn.apply(this, arguments)
		}

		if (timer) clearTimeout(timer)

		timer = setTimeout(() => {
			fn.apply(this, arguments)
		}, delay)
	}
}
