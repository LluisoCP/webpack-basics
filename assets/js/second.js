import text from './text.js'
const second = (function($){
		$('#btn').click(function() {
		if ($('input').val()) {
			let newText = text($('input').val());
			$('#container').append(newText);
		}
	})
	console.log('Here!')	
})(jQuery)

export default second