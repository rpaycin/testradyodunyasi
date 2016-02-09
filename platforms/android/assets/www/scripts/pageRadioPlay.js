$(document).on('pagebeforeshow', '#pageRadioPlay', function () {
    $("#spanCategoryName").text(radio.categoryName);
    $("#imgRadioStation").attr('src', radio.imageUrl);
    
    SetValueLocal(valueRadioUrl, radio.radioUrl);
    SetValueLocal(valueImageUrl, radio.imageUrl);

    audioPlayStop(true, radio.radioName);
});

