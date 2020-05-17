import ids from '@uts/variables'
import firstConsts from '@uts/contants'
const first = (function($) {
	$('body').css("background-color", '#FF00DD')
	console.log(ids.itemId)
	$('#btn-delete').click(function() {
		if (firstConsts.isActive()) {
			ids.itemId--;
			$('#carousel-item').remove()
		}
	})
})(jQuery)

export default first