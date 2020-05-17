import jQuery from 'jquery'
import * as second from './second.js'
import * as first from './first.js'
document.getElementById('load').addEventListener('click', () => {
	import('lodash/debounce').then(debounce => {
		jQuery(window).on('resize', debounce.default(() => console.log(window.innerHeight), 300, {
			'leading' : false,
			'trailing': true
		}))
	})
})
