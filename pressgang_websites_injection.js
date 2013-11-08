/**
 * true if the content being injected into the page from the book should be stripped of any bug links.
 */
pressgang_website_injection_remove_bug_links = true;
/**
 * true if the toc index should be stripped from any heading
 */
pressgang_website_injection_remove_toc_indexes = true;

/**
 * holds the data sent to us from the csprocessor generated script
 */
pressgang_website_injection_data = null;

/**
 * true if jQuery( document ).ready has been triggered
 * @type {boolean}
 */
pressgang_website_injection_ready_called = false;

/**
 * Remove any anchor point in the topics. This is so we don't get any conflicts
 * with the web page the topic is being injected into.
 * @param elements
 */
function pressgang_website_remove_anchors(elements) {
    if (!elements) {
        console.log("elements can not be null");
        return;
    }

    jQuery('a[id]', elements).remove();
}

function pressgang_website_remove_bug_links (elements) {
    if (!elements) {
        console.log("elements can not be null");
        return;
    }

    elements.children('.section').children('.RoleCreateBugPara').remove();
}

function pressgang_website_remove_title (elements) {
    if (!elements) {
        console.log("elements can not be null");
        return;
    }

    elements.children('.section').children('.titlepage').remove();
}

function pressgang_website_remove_all_but_title (elements) {
    if (!elements) {
        console.log("elements can not be null");
        return;
    }

    elements.children('.section').children(':not(.titlepage)').remove();
    var titleParent = jQuery('.section > .titlepage > div > div', elements)
    elements.text(jQuery(':first-child', titleParent).text());
}

function pressgang_website_remove_title_toc_index (elements) {
    if (!elements) {
        console.log("elements can not be null");
        return;
    }

    var regex = /(\d+\.)+&nbsp;/;
    var titles = elements.children('.section').children('.titlepage');
    jQuery("div > div > h3", titles).each(function(index, element){
        element.innerHTML = element.innerHTML.replace(regex, "");
    });

}

function pressgang_website_replace_contents () {

    function postProcessElements(elements) {
        pressgang_website_remove_anchors(elements);

        if (pressgang_website_injection_remove_toc_indexes) {
            pressgang_website_remove_title_toc_index(elements);
        }

        if (pressgang_website_injection_remove_bug_links) {
            pressgang_website_remove_bug_links(elements);
        }
    }

    /*
        When the DOM is loaded and the book data has been returned, we can do the replacement.
        This is so the pressgang_website.js file can be loaded asynchronously.
     */
    if (pressgang_website_injection_data && pressgang_website_injection_ready_called) {

        var holder = {};
        
        for (var i = 0, dataLength = pressgang_website_injection_data.length; i < dataLength; ++i) {
            var dataItem = pressgang_website_injection_data[i];
            var htmlUrl = pressgang_website_base + "/" + dataItem.target + ".html";
            var allElements = jQuery('[data-pressgang-overwrite-withtitle="' + dataItem.topicId + '"], \
                [data-pressgang-overwrite-withouttitle="' + dataItem.topicId + '"], \
                [data-pressgang-overwrite-onlytitle="' + dataItem.topicId + '"], \
                [data-pressgang-append-withtitle="' + dataItem.topicId + '"], \
                [data-pressgang-append-withouttitle="' + dataItem.topicId + '"], \
                [data-pressgang-append-onlytitle="' + dataItem.topicId + '"], \
                [data-pressgang-prepend-withtitle="' + dataItem.topicId + '"], \
                [data-pressgang-prepend-withouttitle="' + dataItem.topicId + '"], \
                [data-pressgang-prepend-onlytitle="' + dataItem.topicId + '"]');

            if (allElements.length != 0) {


                holder[dataItem.topicId] = jQuery('<div data-pressgang-holder="true"></div>').load(htmlUrl + " .section", function(id) {
                    return function(responseText, textStatus, XMLHttpRequest) {
                        /********* data-pressgang-overwrite-withtitle *********/
                        (function(){
                            var elements = jQuery('[data-pressgang-overwrite-withtitle="' + id + '"]');

                            // clear the elements
                            elements.empty();

                            // load the html file
                            elements.append(holder[id].clone());
                            elements.children('[data-pressgang-holder="true"]').children(".section").unwrap();

                            postProcessElements(elements);
                        })();

                        /********* data-pressgang-overwrite-withouttitle *********/
                        (function(){
                            var elements = jQuery('[data-pressgang-overwrite-withouttitle="' + id + '"]');

                            // clear the elements
                            elements.empty();

                            // load the html file
                            elements.append(holder[id].clone());
                            elements.children('[data-pressgang-holder="true"]').children(".section").unwrap();

                            postProcessElements(elements);
                            pressgang_website_remove_title(elements);


                        })();

                        /********* data-pressgang-overwrite-onlytitle *********/
                        (function(){
                            var elements = jQuery('[data-pressgang-overwrite-onlytitle="' + id + '"]');

                            // clear the elements
                            elements.empty();

                            // load the html file
                            elements.append(holder[id].clone());
                            elements.children('[data-pressgang-holder="true"]').children(".section").unwrap();

                            postProcessElements(elements);
                            pressgang_website_remove_all_but_title(elements);
                        })();

                        /********* data-pressgang-append-withtitle *********/
                        (function(){
                            var elements = jQuery('[data-pressgang-append-withtitle="' + id + '"]');

                            // load the html file
                            elements.append(holder[id].clone());
                            elements.children('[data-pressgang-holder="true"]').children(".section").unwrap();

                            postProcessElements(elements);
                        })();

                        /********* data-pressgang-append-withouttitle *********/
                        (function(){
                            var elements = jQuery('[data-pressgang-append-withouttitle="' + id + '"]');

                            // load the html file
                            elements.append(holder[id].clone());
                            elements.children('[data-pressgang-holder="true"]').children(".section").unwrap();

                            postProcessElements(elements);
                            pressgang_website_remove_title(elements);
                        })();

                        /********* data-pressgang-append-onlytitle *********/
                        (function(){
                            var elements = jQuery('[data-pressgang-append-onlytitle="' + id + '"]');

                            // load the html file
                            elements.append(holder[id].clone());
                            elements.children('[data-pressgang-holder="true"]').children(".section").unwrap();

                            postProcessElements(elements);
                            pressgang_website_remove_all_but_title(elements);
                        })();

                        /********* data-pressgang-prepend-withtitle *********/
                        (function(){
                            var elements = jQuery('[data-pressgang-prepend-withtitle="' + id + '"]');

                            // load the html file
                            elements.prepend(holder[id].clone());
                            elements.children('[data-pressgang-holder="true"]').children(".section").unwrap();

                            postProcessElements(elements);
                        })();

                        /********* data-pressgang-prepend-withouttitle *********/
                        (function(){
                            var elements = jQuery('[data-pressgang-prepend-withouttitle="' + id + '"]');

                            // clear the elements
                            elements.empty();

                            // load the html file
                            elements.prepend(holder[id].clone());
                            elements.children('[data-pressgang-holder="true"]').children(".section").unwrap();

                            postProcessElements(elements);
                            pressgang_website_remove_title(elements);
                        })();

                        /********* data-pressgang-prepend-onlytitle *********/
                        (function(){
                            var elements = jQuery('[data-pressgang-prepend-withouttitle="' + id + '"]');

                            // clear the elements
                            elements.empty();

                            // load the html file
                            elements.prepend(holder[id].clone());
                            elements.children('[data-pressgang-holder="true"]').children(".section").unwrap();

                            postProcessElements(elements);
                            pressgang_website_remove_all_but_title(elements);
                        })();
                    }
                }(dataItem.topicId));
            }
        }
    }
}

/**
 * This is called by the pressgang_website.js file.
 * @param data a mapping between topic ids and HTML file names.
 */
function pressgang_website_callback(data) {
    if (!pressgang_website_injection_data) {
        pressgang_website_injection_data = data;
        pressgang_website_replace_contents();
    }
}

/**
 * When the DOM is loaded call pressgang_website_replace_contents().
 */
jQuery( document ).ready(function() {
    if (!pressgang_website_injection_ready_called) {
        pressgang_website_injection_ready_called = true;
        pressgang_website_replace_contents();
    }
});


