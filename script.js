$(document).on("click", '.word', function() {    
    $("th").css("z-index", "0")
    $(this).css("z-index", "1")
    $("ul").hide();
    $(".word ul").show();    
});

$(document).on("click", '.community', function() {    
    $("th").css("z-index", "0")
    $(this).css("z-index", "1")
    $("ul").hide();
    $(".community ul").show();
});

$(document).on("click", '.word li', function(event) {    
    $("table tr").not(":first").hide();
    $("table tr." + $(this).text()).show();
    $(this).parent().hide()
    event.stopPropagation();
});

$(document).on("click", '.community li', function(event) {    
    $("table tr").not(":first").hide();
    $("table tr." + $(this).text()).show();
    $(this).parent().hide()
    event.stopPropagation();
});