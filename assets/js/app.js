import jQuery from 'jquery'
import * as first from './first.js'
import * as second from './second.js'
// import style from '../scss/style.scss'

document.getElementById('load').addEventListener('click', () => {
	import('lodash/debounce').then(debounce => {
		jQuery(window).on('resize', debounce.default(() => console.log(window.innerHeight), 300, {
			'leading' : false,
			'trailing': true
		}))
	})
})
