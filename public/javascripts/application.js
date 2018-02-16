// Shorthand URL
function go(url){
    window.location.href = url;
}

// Allow continue from enter press
$(function() {
    $(".row").keyup(function(event) {
        if(event.keyCode == 13) {
            $(".continue").click();
        }
    });
});