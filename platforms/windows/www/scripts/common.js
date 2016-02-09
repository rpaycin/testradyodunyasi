function isAndroid() {
    var nua = navigator.userAgent;

    var isAndroid = (nua.indexOf('Mozilla/5.0') > -1 && nua.indexOf('Android') > -1 && nua.indexOf('AppleWebKit') > -1);
    return isAndroid;
    }

function isIpad() {
    var nua = navigator.userAgent;

    var isiPad = nua.match(/iPad/i) != null;
    return isiPad;
}

function isIOS() {
    return navigator.userAgent.match(/(iPad|iPhone|iPod)/g);
}

//scroll
function AddScroll(wrapperName) {
    myScroll = new IScroll('#' + wrapperName, { mouseWheel: true });
    document.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);

}

//htm5 set local storage
function SetValueLocal(key, value) {
    if (typeof (Storage) !== "undefined") {
        localStorage.setItem(key, value);
    }
}

//htm5 get local storage
function GetValueLocal(key) {
    if (typeof (Storage) !== "undefined") {
        return localStorage.getItem(key)
    }
    return "";
}

//audio play and stop
function audioPlayStop(isPlay, radioTitle) {
    if (isPlay) {
        var radioUrl = GetValueLocal(valueRadioUrl);
        var imageUrl = GetValueLocal(valueImageUrl);

        $('#jplayerRadio').jPlayer('setMedia', {
            oga: radioUrl,
            m4a: radioUrl,
            mp3: radioUrl,
            poster:imageUrl,
            title: radioTitle
        }).jPlayer("play");
    }
    else
        $("#jplayerRadio").jPlayer("stop");
}

function showLoading(loadingText) {
    setTimeout(function () {
        $.mobile.loading('show', {
            text: loadingText,
            textVisible: true,
            theme: 'c',
            html: ""
        });
    }, 1);
}

function hideLoading() {
    setTimeout(function () {
        $.mobile.loading('hide');
    }, 2000);
}
