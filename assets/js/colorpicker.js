
// Add custom colors to the Iris colorpicker palette 
// ref: https://wordpress.org/support/topic/universally-change-iris-palette

jQuery(document).ready(function($){
	$.wp.wpColorPicker.prototype.options = {
		hide: true,
		palettes: ['#121212', '#333333','#666666','#999999','#cccccc']
	};
});