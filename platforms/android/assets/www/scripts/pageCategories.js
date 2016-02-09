$(document).on('pageinit', '#pageCategories', function () {
    //açılışta tüm kategorileri getirme
    getlistViewAllCategories();

    //category item basıldığı zaman
    $(document).on('vclick', '.categoryItem', function () {
        audioPlayStop(false, '');

        category.categoryId = $(this).attr('categoryId');
        category.categoryName = $(this).attr('categoryName');
        isAllCategory = false;
        isWorkAllRadio = false;

        $.mobile.changePage("#pageAllRadios", { transition: 'slide' });
    });
});

function getlistViewAllCategories() {
    $.ajax({
        beforeSend: function () {
            showLoading('Kategoriler yükleniyor...');
        },
        complete: function () {
            $('#listViewCategories').listview('refresh');

            AddScroll("wrapperCategoriesList");

            hideLoading();
        },
        url: serviceURL + 'radio/GetCategories',
        dataType: 'json',
        success: function (data) {
            if (data.IsSuccess) {
                $('#listViewCategories li').remove();

                $.each(data.Value, function (index, category) {
                    $('#listViewCategories').append(getCategoryItem(category));
                });
            }
        },
        error: function (xhr, ajaxOptions, thrownError) {
            hideLoading();
        },
        timeout: 30000
    });
}

function getCategoryItem(category) {
    var categoryItem = " <li data-theme='d' class='ui-btn  ui-li-has-arrow ui-li ui-corner-bottom ui-btn-up-c'>\
                            <div class='ui-btn-inner ui-li' aria-hidden='true'>\
                                <div class='ui-btn-text'>\
                                    <a categoryId=" + category.Id + " categoryName='" + category.Name + "' class='categoryItem ui-link-inherit'>\
                                        " + category.Name + "<span class='ui-li-count'>" + category.RadioCount + "</span>\
                                    </a>\
                                </div>\
                            </div>\
                        </li>";
    return categoryItem;
}
