import text from '@fns/text.js'
import { a, aFn } from '@fns/someFunctions.js'
import firstConsts from '@uts/constants.js'
import ids from '@uts/variables.js'
let isActive = firstConsts.isActive;
const second = (function($){
		$('#btn').click(function() {
		if ($('input').val()) {
			let newText;
			if (isActive()) {
				newText = text($('input').val() + firstConsts.itemsPerPage)
			} else {
				aFn()
				newText = text($('input').val() + a)
			}
			$('#container').append(newText)
		}
	})
	let [,b,] = [1,2,3]
	ids.itemId = b + 224
	console.log(ids)
})(jQuery)

export default second