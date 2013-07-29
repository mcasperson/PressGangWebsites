dimmerOverlayID = "pressgang_website_dimmer";
overlayZIndex = 10000;
overlayZIndexElements = 10001;

/**
 * @param url The url 
 */
pressgang_website_build_callout = function (elementTopicData) {
		
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
			
			var calloutDiv = document.createElement("div");
			var contentDiv = document.createElement("div");
			var outerArrowDiv = document.createElement("div");
			var innerArrowDiv = document.createElement("div");
			
			calloutDiv.appendChild(contentDiv);
			calloutDiv.appendChild(outerArrowDiv);
			outerArrowDiv.appendChild(innerArrowDiv);
			
			divContainerDown.className = "callout";
			contentDiv.className = "divContainerDown";
			outerArrowDiv.className = "calloutDown";
			innerArrowDiv.className = "calloutDown2";
			
			
}

pressgang_website_callback = function(data) {
	if (data) {
		
		var changedPositionFromStatic = [];
		var changedPositionFromDefault = [];
		var displaying = false;
		
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
			
			/*
			 * Add an overlay that sits above any regular HTML element
			 */
			
			var overlayDiv = document.createElement("div");
			
			overlayDiv.id = dimmerOverlayID;
			overlayDiv.style.zIndex = overlayZIndex;
    		overlayDiv.style.backgroundColor = "black";
    		overlayDiv.style.opacity= 0.9;
			overlayDiv.style.position = "fixed";
			overlayDiv.style.top = 0;
			overlayDiv.style.bottom = 0;
			overlayDiv.style.left = 0;
			overlayDiv.style.right = 0;
			
			document.body.appendChild(overlayDiv);	
			
			/*
			 * Promote the elements listed in the data
			 */		
			 
			for (var key in data) {
			  	if (data.hasOwnProperty(key)) {
			    	var elements = document.querySelectorAll(key);
			    	for (var i = 0, count = elements.length; i < count; ++i) {
			    		var element = elements[i];
			    		if (element.style.position == "static") {
			    			element.style.position = "relative";
			    			changedPositionFromStatic.push(element);
			    		} else if (element.style.position == "") {
			    			element.style.position = "relative";
			    			changedPositionFromDefault.push(element);
			    		}
			    					    					    	
			    		element.style.zIndex += overlayZIndexElements; 
			    	}
				}
			}
		}
		
		pressgang_website_disable = function() {
			if (!displaying) {
				console.log("displaying should be true");
				return;
			}
			
			displaying = false;
			
			var overlayDiv = document.getElementById(dimmerOverlayID);
			if (overlayDiv != null && overlayDiv.parentNode != null) {
				overlayDiv.parentNode.removeChild(overlayDiv);
			}
			
			if (data.hasOwnProperty(key)) {
		    	var elements = document.querySelectorAll(key);
		    	for (var i = 0, count = elements.length; i < count; ++i) {
		    		var element = elements[i];
		    		element.style.zIndex -= overlayZIndexElements;
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
		}			
	}
}
