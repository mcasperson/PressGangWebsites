/**
 * true if the content being injected into the page from the book should be stripped of any bug links.
 */
pressgang_website_injection_remove_bug_links = true;

/**
 * holds the data sent to us from the csprocessor generated script
 */
pressgang_website_injection_data = null;

/**
 * true if jQuery( document ).ready has been triggered
 * @type {boolean}
 */
pressgang_website_injection_ready_called = false;

pressgang_website_remove_bug_links = function(elements) {
    if (!elements) {
        console.log("elements can not be null");
        return;
    }

    elements.children('.section').children('.RoleCreateBugPara').remove();
}

pressgang_website_remove_title = function(elements) {
    if (!elements) {
        console.log("elements can not be null");
        return;
    }

    elements.children('.section').children('.titlepage').remove();
}

pressgang_website_remove_all_but_title = function(elements) {
    if (!elements) {
        console.log("elements can not be null");
        return;
    }

    elements.children('.section').children(':not(.titlepage)').remove();
}

pressgang_website_replace_contents = function() {
    /*
        When the DOM is loaded and the book data has been returned, we can do the replacement.
        This is so the pressgang_website.js file can be loaded asynchronously.
     */
    if (pressgang_website_injection_data && pressgang_website_injection_ready_called) {
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
                var holder = jQuery('<div data-pressgang-holder="true"></div>').load(htmlUrl + " .section", function(id) {
                    return function(responseText, textStatus, XMLHttpRequest) {
                        /********* data-pressgang-overwrite-withtitle *********/
                        (function(){
                            var elements = jQuery('[data-pressgang-overwrite-withtitle="' + id + '"]');

                            // clear the elements
                            elements.empty();

                            // load the html file
                            elements.append(holder.clone());
                            elements.children('[data-pressgang-holder="true"]').children(".section").unwrap();

                            if (pressgang_website_injection_remove_bug_links) {
                                pressgang_website_remove_bug_links(elements);
                            }
                        })();

                        /********* data-pressgang-overwrite-withouttitle *********/
                        (function(){
                            var elements = jQuery('[data-pressgang-overwrite-withouttitle="' + id + '"]');

                            // clear the elements
                            elements.empty();

                            // load the html file
                            elements.append(holder.clone());
                            elements.children('[data-pressgang-holder="true"]').children(".section").unwrap();

                            pressgang_website_remove_title(elements);

                            if (pressgang_website_injection_remove_bug_links) {
                                pressgang_website_remove_bug_links(elements);
                            }
                        })();

                        /********* data-pressgang-overwrite-onlytitle *********/
                        (function(){
                            var elements = jQuery('[data-pressgang-overwrite-onlytitle="' + id + '"]');

                            // clear the elements
                            elements.empty();

                            // load the html file
                            elements.append(holder.clone());
                            elements.children('[data-pressgang-holder="true"]').children(".section").unwrap();

                            pressgang_website_remove_all_but_title(elements);

                            if (pressgang_website_injection_remove_bug_links) {
                                pressgang_website_remove_bug_links(elements);
                            }
                        })();

                        /********* data-pressgang-append-withtitle *********/
                        (function(){
                            var elements = jQuery('[data-pressgang-append-withtitle="' + id + '"]');

                            // load the html file
                            elements.append(holder.clone());
                            elements.children('[data-pressgang-holder="true"]').children(".section").unwrap();

                            if (pressgang_website_injection_remove_bug_links) {
                                pressgang_website_remove_bug_links(elements);
                            }
                        })();

                        /********* data-pressgang-append-withouttitle *********/
                        (function(){
                            var elements = jQuery('[data-pressgang-append-withouttitle="' + id + '"]');

                            // clear the elements
                            elements.empty();

                            // load the html file
                            elements.append(holder.clone());
                            elements.children('[data-pressgang-holder="true"]').children(".section").unwrap();

                            pressgang_website_remove_title(elements);

                            if (pressgang_website_injection_remove_bug_links) {
                                pressgang_website_remove_bug_links(elements);
                            }
                        })();

                        /********* data-pressgang-append-onlytitle *********/
                        (function(){
                            var elements = jQuery('[data-pressgang-append-withouttitle="' + id + '"]');

                            // clear the elements
                            elements.empty();

                            // load the html file
                            elements.append(holder.clone());
                            elements.children('[data-pressgang-holder="true"]').children(".section").unwrap();

                            pressgang_website_remove_all_but_title(elements);

                            if (pressgang_website_injection_remove_bug_links) {
                                pressgang_website_remove_bug_links(elements);
                            }
                        })();

                        /********* data-pressgang-prepend-withtitle *********/
                        (function(){
                            var elements = jQuery('[data-pressgang-prepend-withtitle="' + id + '"]');

                            // load the html file
                            elements.prepend(holder.clone());
                            elements.children('[data-pressgang-holder="true"]').children(".section").unwrap();

                            if (pressgang_website_injection_remove_bug_links) {
                                pressgang_website_remove_bug_links(elements);
                            }
                        })();

                        /********* data-pressgang-prepend-withouttitle *********/
                        (function(){
                            var elements = jQuery('[data-pressgang-prepend-withouttitle="' + id + '"]');

                            // clear the elements
                            elements.empty();

                            // load the html file
                            elements.prepend(holder.clone());
                            elements.children('[data-pressgang-holder="true"]').children(".section").unwrap();

                            pressgang_website_remove_title(elements);

                            if (pressgang_website_injection_remove_bug_links) {
                                pressgang_website_remove_bug_links(elements);
                            }
                        })();

                        /********* data-pressgang-prepend-onlytitle *********/
                        (function(){
                            var elements = jQuery('[data-pressgang-prepend-withouttitle="' + id + '"]');

                            // clear the elements
                            elements.empty();

                            // load the html file
                            elements.prepend(holder.clone());
                            elements.children('[data-pressgang-holder="true"]').children(".section").unwrap();

                            pressgang_website_remove_all_but_title(elements);

                            if (pressgang_website_injection_remove_bug_links) {
                                pressgang_website_remove_bug_links(elements);
                            }
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
pressgang_website_callback = function(data) {
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


