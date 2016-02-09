//cihaz ready, pause ve resume eventleri
$(function () {
    $(document).on('pagebeforeshow', '#pageRadioPlay', function () {
        $('#radioPlayerContent').css('margin-top', ($(window).height() - $('[data-role=header]').height() - $('[data-role=footer]').height() - $('#radioPlayerContent').outerHeight()) / 4);
    });

    //radioplayer başlangıç
    $("#jplayerRadio").jPlayer({
        swfPath: "../../dist/jplayer",
        supplied: "m4a, oga, mp3",
        useStateClassSkin: true,
        autoBlur: true,
        smoothPlayBar: true,
        keyEnabled: true,
        remainingDuration: true,
        toggleDuration: true
    });
    
    document.addEventListener('deviceready', onDeviceReady.bind(this), false);

    function onDeviceReady() {
        document.addEventListener('pause', onPause.bind(this), false);
        document.addEventListener('resume', onResume.bind(this), false);
    };

    function onPause() {
    };

    function onResume() {
    };
});

$(function () {
    //ana menuyu sayfalara ekleme
    mainMenuAdd();

    //statusbari aşağı kaydırma ios için
    //addHeaderMarginTop();
});

function mainMenuAdd() {
    var menuHtml = '<ul>' +
       '<li class="allRadios"><a href="#pageAllRadios" data-transition="slide" title="Tüm Radyolar">Tüm Radyolar</a></li>' +
       '<li class="categories"><a href="#pageCategories" data-transition="slide" title="Kategoriler">Kategoriler</a></li>' +
       //'<li class="favourites"><a href="#" data-transition="slide" title="Favorilerim">Favorilerim</a></li>' +
   '</ul>';

    $("#panelAllRadios").append(menuHtml);
    $("#panelCategories").append(menuHtml);
}

function addHeaderMarginTop() {
    var isios = isIOS();
    if (isios != null && isios) {
        var px = "20px";
        $("#headerAllRadios").css("margin-top", px);
        $("#panelAllRadios").css("margin-top", px);
        $("#headerCategories").css("margin-top", px);
        $("#panelCategories").css("margin-top", px);
        $("#headerRadioPlay").css("margin-top", px);
        //$(".wrapperList").css("top", "65px");
    }
}

$(document).on("pagecontainershow", function () {
    ScaleContentToDevice();

    $(window).on("resize orientationchange", function () {
        ScaleContentToDevice();
    })
});

function ScaleContentToDevice() {
    scroll(0, 0);
    var content = $.mobile.getScreenHeight() - $(".ui-header").outerHeight() - $(".ui-footer").outerHeight() - $(".ui-content").outerHeight() + $(".ui-content").height();
    $(".ui-content").height(content);
}