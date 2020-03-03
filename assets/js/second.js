import text from './text.js'
const second = (function($){
		$('#btn').click(function() {
		if ($('input').val()) {
			let newText = text($('input').val());
			$('#container').append(newText);
		}
	})
	let [,b,] = [1,2,3]
	console.log(b)	
})(jQuery)

export default second