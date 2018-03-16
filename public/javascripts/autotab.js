$(document).ready(function(){
    
    $('.autotab').keyup(function(e) {
        if (e.keyCode == 8 || e.keyCode == 9 || e.keyCode == 16) {
            // do nothing, allow backspace
        } else {
            var target = $(this).attr('target');
            var length = $(this).attr('length');
            if ($(this).val().length == length) {
                $('html').find('#'+target).focus();
            };
        }
    });
});