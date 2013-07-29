/*
 * INSTRUCTIONS FOR USE
 * 1. Include this script: <script type="application/javascript" src="pressgang_websites.js"></script>
 * 2. Include the script generated by the csprocessor: <script type="application/javascript" src="pressgang_website.js"></script>
 * 3. Set the base URL to the chunked HTML sections: <script type="application/javascript">pressgang_website_base = "file:///home/matthew/Documents/PressGang_Website_Sample/PressGang_Website_Sample/tmp/en-US/html";</script>
 * 4. Add the data-pressgangtopic attribute with the value of the topic id to elements that should display a help topic: data-pressgangtopic="21465"
 * 5. Call the pressgang_website_enable() function to display the help overlay.
 */

/**
 * The id assigned to the div that dims elements that have no help topic.
 */
pressgang_website_dimmerOverlayID = "pressgang_website_dimmer";
/**
 * The id assigned to the div that sits over all elements, blocking mouse interactions.
 */
pressgang_website_blockerOverlayID = "pressgang_website_blocker";
/**
 * The id assigned to the callout.
 */
pressgang_website_calloutID = "pressgang_website_callout";
/**
 * The last element that displayed a callout.
 */
pressgang_website_lastSelectedElement = null;
/**
 * This needs to be set by the page that includes this script. It will point to the base URL
 * where the HTML files displayed in the callout are located. 
 */
pressgang_website_base = "";
/**
 * This needs to be set by the page that includes this script. It will point to the base URL
 * where the HTML files that are part of the original documentation are found. 
 */
pressgang_website_doc_base = "";

/**
 * Closes the help overlay when escape is pressed
 * @param e the event data
 */
pressgang_website_esc_key_handler = function(e) {
	pressgang_website_disable();		
}

/**
 * @return the highest Z index used by the page
 */
pressgang_website_get_highest_zindex = function() {
	var elements = document.getElementsByTagName("*");
	var highest_index = 0;
	
	for (var i = 0; i < elements.length - 1; i++) {
	    if (parseInt(elements[i].style.zIndex) > highest_index) {
	        highest_index = parseInt(elements[i].style.zIndex);
	    }
	}
	
	return highest_index;
}

/**
 * Builds a callout and positions it on the page.
 * @param element The element displaying the help topic.
 * @param elementTopicData The help data associated with this topic.
 */
pressgang_website_build_callout = function (element, elementTopicData, calloutZIndex) {
		
			if (!element) {
				console.log("element should not be null");
				return;
			}	
			
			if (!elementTopicData) {
				console.log("elementTopicData should not be null");
				return;
			}	
			
			if (!elementTopicData.target) {
				console.log("elementTopicData.target should not be null");
				return;	
			}
			
			if (!elementTopicData.topicId) {
				console.log("elementTopicData.topicId should not be null");
				return;	
			}			
			
			var oldCallout = document.getElementById(pressgang_website_calloutID);
			if (oldCallout) {				
				oldCallout.parentElement.removeChild(oldCallout);	
			}
			
			var calloutDiv = document.createElement("div");
			var contentDiv = document.createElement("div");
			var outerArrowDiv = document.createElement("div");
			var innerArrowDiv = document.createElement("div");
			var iframe = document.createElement("iframe");
			var bookIcon = document.createElement("img");
			var bookLink = document.createElement("a");
			var closeIcon = document.createElement("img");
			var closeLink = document.createElement("a");
			
			bookLink.style.position = closeLink.style.position = "absolute";
			
			bookLink.href = pressgang_website_doc_base + "#" + elementTopicData.target;
			bookLink.target = "_blank";
			bookIcon.src = "book.png";
			bookLink.style.top = "4px";
			bookLink.style.right = "24px";
			bookIcon.style.width = bookIcon.style.height = "16px";
			bookLink.style.zIndex = 2;
			bookLink.appendChild(bookIcon);			
			contentDiv.appendChild(bookLink);
			
			closeIcon.src = "close.png";
			closeLink.style.top = "4px";
			closeLink.style.right = "4px";
			closeIcon.style.width = closeIcon.style.height = "16px";
			closeLink.style.zIndex = 2;
			closeLink.appendChild(closeIcon);
			contentDiv.appendChild(closeLink);
			closeLink.onclick = pressgang_website_close_callout;
			
						
			iframe.className = "contentIFrame";
			
			iframe.src = pressgang_website_base + "/" + elementTopicData.target + ".html";
			
			calloutDiv.id = pressgang_website_calloutID;
			calloutDiv.style.zIndex = calloutZIndex || 0;		
			
			document.body.appendChild(calloutDiv);
		
			/*
			 * Get the viewport dimensions
			 */
			var w = window,
			    d = document,
			    e = d.documentElement,
			    g = d.getElementsByTagName('body')[0],
			    x = w.innerWidth || e.clientWidth || g.clientWidth,
			    y = w.innerHeight|| e.clientHeight|| g.clientHeight,
			    hy = y/2,
			    hx = x/2;
			
			/*
			 * Get the elements position
			 */
			var elementPosition = element.getBoundingClientRect();
			var calloutPosition = calloutDiv.getBoundingClientRect();
			
			
			if (elementPosition.left < hx) {
				/*
			 	 * The element is on the left hand side of the screen
			 	 */	
			 	 			 	 
 	 				outerArrowDiv.appendChild(innerArrowDiv);
	 				
	 				calloutDiv.appendChild(outerArrowDiv);
	 				calloutDiv.appendChild(contentDiv);
	 				
	 				contentDiv.appendChild(iframe);
	 				
	 				calloutDiv.className = "callout";
					outerArrowDiv.className = "calloutUp";
					innerArrowDiv.className = "calloutUp2";
			 	 
			 	 if (elementPosition.top < hy) {
			 	 	/*
				 	 * The element is on the top of the screen
				 	 */
					contentDiv.className = "divContainerUp";
					
					calloutDiv.style.top = elementPosition.bottom;
					calloutDiv.style.left = elementPosition.left;
				 			
			 	 } else {
			 	 	/*
				 	 * The element is on the bottom of the screen
				 	 */	
					contentDiv.className = "divContainerDown";
					
					calloutDiv.style.top = elementPosition.top - (calloutPosition.bottom - calloutPosition.top);
					calloutDiv.style.left = elementPosition.left;
			 	 }
			} else {
				/*
			 	 * The element is on the right hand side of the screen
			 	 */
 	 				outerArrowDiv.appendChild(innerArrowDiv);
	 				
	 				calloutDiv.appendChild(contentDiv);
	 				calloutDiv.appendChild(outerArrowDiv);
	 					 				
	 				contentDiv.appendChild(iframe);
	 				
	 				calloutDiv.className = "callout";
					contentDiv.className = "divContainerUp";
					
					innerArrowDiv.className = "calloutUp2";
			 		
			 	 if (elementPosition.top < hy) {
			 	 	/*
				 	 * The element is on the top of the screen
				 	 */
					outerArrowDiv.className = "calloutUpRight";									
										
					calloutDiv.style.top = elementPosition.bottom;
					calloutDiv.style.left = elementPosition.left;
				 			
			 	 } else {
			 	 	/*
				 	 * The element is on the bottom of the screen
				 	 */	
					outerArrowDiv.className = "calloutDownRight";
					
					calloutDiv.style.top = elementPosition.top - (calloutPosition.bottom - calloutPosition.top);
					calloutDiv.style.left = elementPosition.left;
			 	 }			
			}					
}

/**
 * This is called by the pressgang_website.js file.
 * @param data a mapping between topic ids and HTML file names. 
 */
pressgang_website_callback = function(data) {
	if (data) {
		
		var changedPositionFromStatic = [];
		var changedPositionFromDefault = [];
		var displaying = false;
		var zIndexDiff = 0;
		
		/**
		 * Enabled the help overlay.
		 */
		pressgang_website_enable = function() {
			if (displaying) {
				console.log("displaying should be false");
				return;
			}
			
			if (changedPositionFromStatic.length != 0) {
				console.log("changedPositionFromStatic should be empty");
				return;
			}
			
			if (changedPositionFromDefault.length != 0) {
				console.log("changedPositionFromDefault should be empty");
				return;
			}
			
			displaying = true;
			
			document.addEventListener("keydown", pressgang_website_esc_key_handler, false);
			
			var highestZIndex = pressgang_website_get_highest_zindex();
			var dimmerOverlayZIndex = highestZIndex + 1;				
			zIndexDiff = highestZIndex + 2;
			var mouseBlockZIndex = highestZIndex + zIndexDiff + 1;
			var calloutZIndex = mouseBlockZIndex + 1;	 
			
			/*
			 * Add an overlay that sits above any regular HTML element
			 */			
			var overlayDiv = document.createElement("div");
			
			overlayDiv.id = pressgang_website_dimmerOverlayID;
			overlayDiv.style.zIndex = dimmerOverlayZIndex;
    		overlayDiv.style.backgroundColor = "black";
    		overlayDiv.style.opacity= 0.9;
			overlayDiv.style.position = "fixed";
			overlayDiv.style.top = 0;
			overlayDiv.style.bottom = 0;
			overlayDiv.style.left = 0;
			overlayDiv.style.right = 0;
			
			document.body.appendChild(overlayDiv);	
			
			/*
			 * Add an overlay that sits above the promoted ui elements
			 */			
			var blockerDiv = document.createElement("div");
			
			blockerDiv.id = pressgang_website_blockerOverlayID;
			blockerDiv.style.zIndex = mouseBlockZIndex;
			blockerDiv.style.position = "fixed";
			blockerDiv.style.top = 0;
			blockerDiv.style.bottom = 0;
			blockerDiv.style.left = 0;
			blockerDiv.style.right = 0;
			
			document.body.appendChild(blockerDiv);	
			
			/*
			 * Promote the elements listed in the data
			 */					 
			for (var i = 0, dataLength = data.length; i < dataLength; ++i) {
		    	var dataItem = data[i];
		    	var elements = document.querySelectorAll('[data-pressgangtopic="' + dataItem.topicId + '"]');
		    	for (var j = 0, elementsLength = elements.length; j < elementsLength; ++j) {
		    		var element = elements[j];
		    		if (element.style.position == "static") {
		    			element.style.position = "relative";
		    			changedPositionFromStatic.push(element);
		    		} else if (element.style.position == "") {
		    			element.style.position = "relative";
		    			changedPositionFromDefault.push(element);
		    		}
		    					    					    	
		    		element.style.zIndex += zIndexDiff; 
		    	}
				
			}
			
			/*
			 * Handle mouse movements to detect a collection with an element that has a help topic.
			 * @param e the event data
			 */
			pressgang_website_mouse_move = function(e) {
				for (var i = 0, dataLength = data.length; i < dataLength; ++i) {
		    		var dataItem = data[i];
		    		var elements = document.querySelectorAll('[data-pressgangtopic="' + dataItem.topicId + '"]');
			    	for (var j = 0, elementsLength = elements.length; j < elementsLength; ++j) {
			    		var element = elements[j];
			    		var elementPosition = element.getBoundingClientRect();
			    		
			    		if (e.clientX >= elementPosition.left &&
			    			e.clientX <= elementPosition.right &&
			    			e.clientY >= elementPosition.top &&
			    			e.clientY <= elementPosition.bottom) {
		    				if (element != pressgang_website_lastSelectedElement) {
		    					pressgang_website_build_callout(element, dataItem, calloutZIndex);
		    					pressgang_website_lastSelectedElement = element;
		    				}
		    				break;
	    				}				    						    	
				    }
			   	}			    			
			}
			
			document.addEventListener("mousemove", pressgang_website_mouse_move, false);
		}
		
		/**
		 * Disables the help overlay.
		 */
		pressgang_website_disable = function() {
			if (!displaying) {
				console.log("displaying should be true");
				return;
			}
			
			displaying = false;
			
			
			document.removeEventListener("keydown", pressgang_website_esc_key_handler);
			document.removeEventListener("mousemove", pressgang_website_mouse_move);
			
			var overlayDiv = document.getElementById(pressgang_website_dimmerOverlayID);
			if (overlayDiv != null && overlayDiv.parentNode != null) {
				overlayDiv.parentNode.removeChild(overlayDiv);
			}
			
			var mouseBlockDiv = document.getElementById(pressgang_website_blockerOverlayID);
			if (mouseBlockDiv != null && mouseBlockDiv.parentNode != null) {
				mouseBlockDiv.parentNode.removeChild(mouseBlockDiv);
			}
			
			pressgang_website_close_callout();
						
			for (var i = 0, dataLength = data.length; i < dataLength; ++i) {
	    		var dataItem = data[i];
		    	var elements = document.querySelectorAll('[data-pressgangtopic="' + dataItem.topicId + '"]');
		    	for (var j = 0, elementsLength = elements.length; j < elementsLength; ++j) {
		    		var element = elements[j];
		    		element.style.zIndex -= zIndexDiff;			    
			    }
			}
		    
		    for (var i = 0, count = changedPositionFromStatic.length; i < count; ++i) {
		    	changedPositionFromStatic[i].style.position = "static";	
		    }
		    
		    for (var i = 0, count = changedPositionFromDefault.length; i < count; ++i) {
		    	changedPositionFromDefault[i].style.position = "";	
		    }
		    
		    changedPositionFromDefault = [];			
			changedPositionFromStatic = [];	
			zIndexDiff = 0;
		}			
	}
	
	pressgang_website_close_callout = function() {
			var callout = document.getElementById(pressgang_website_calloutID);
			if (callout != null && callout.parentNode != null) {
				callout.parentNode.removeChild(callout);
			}
			pressgang_website_lastSelectedElement = null;
	}
}
