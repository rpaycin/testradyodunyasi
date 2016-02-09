var per_page = 20; //max images per page
var page = 1; //initialize page number
$(document).ready(function () {
    loadFlckr(20, 1); //load some images onload
});

//Handler for scrolling toward end of document
$(window).scroll(function () {
    if ($(window).scrollTop() >= $(document).height() - $(window).height() - 100) {
        //End of page, load next content here
        if (!loading) loadNextPage();
    }
});

//Load content for next page
function loadNextPage() {
    loadFlckr(per_page, ++page);
}

//Load images from Datasource (Flickr in this case)
function loadFlckr(per_page, page) {
    loading = true; //interlock to prevent multiple calls
    $.mobile.loading('show');
    var flickerAPI = "https://api.flickr.com/services/rest/?method=flickr.people.getPublicPhotos&format=json&api_key=2fd4e1a42e243e332b7e334aa219698e&user_id=74038643@N00&jsoncallback=?";

    //Calling to service provider
    $.getJSON(flickerAPI, {
        per_page: per_page || 20,
        page: page || 1
    })
        .done(function (data) {
            $.each(data.photos.photo, function (i, item) {
                var url = String.format("http://farm{0}.staticflickr.com/{1}/{2}_{3}_{4}.jpg", item.farm, item.server, item.id, item.secret, 't');
                var img = $("<img/>").attr("src", url);
                var li = $("<li/>").append(img);
                var title = $("<h2/>").append(item.title || 'No Title');
                var desc = $("<p/>").append(item.owner);
                li.append(title);
                li.append(desc);
                //Append new list item to listview
                li.appendTo("#list-lazyloader");
            });
            //refresh listview
            $('#list-lazyloader').listview('refresh');
            loading = false;
            $.mobile.loading('hide');
            //Update page index
            page = data.photos.page;
            //Update photos count
            $('#photoCount').text($('#list-lazyloader li').size());
        });
};

//C#-like feature to concat strings
String.format = function () {
    var s = arguments[0];
    for (var i = 0; i < arguments.length - 1; i++) {
        var reg = new RegExp("\\{" + i + "\\}", "gm");
        s = s.replace(reg, arguments[i + 1]);
    }
    return s;
}