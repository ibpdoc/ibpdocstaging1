//For each possible version (at time of writing 7.0, 7.1, 7.2), what we do is take the URL and use cross-origin calls to determine if a page exists with each other version, since 
//all we have to do is change the version number in the URL. If the page exists, great, we build a URL for it and assign it to the tab attributes. 
//Should note, CORS doesn't work when running locally, so if you're doing any local testing, you won't see any other tabs because they'll all fail to find and therefore disable. 
function loadedAction() { 
	var items = document.getElementsByClassName("tab-link"); 
	//If there are no tabs (perhaps this is a page that hasn't implemented them yet), nothing happens. 
	if(items.length == 0) {return;} 
	//This regular expression breaks down the URL into three elements: the URL before the version number, the version number, and the rest of the URL. 
	var URLBreakdown = /(.*\/[^\/]*)(\d\d)(\/.*)/.exec(window.location.href); 
	var currentVersion = URLBreakdown[2]; 
 
	for (var i = 0; i < items.length; i++) { 
		var itemVersion = items[i].id; 
		//This is going to construct a URL featuring the version number provided by each HTML element in the list.  
		//Then it checks that URL to determine if the page exists (gets a 200 response) or if it doesn't (gets any other response). 
		var client = new XMLHttpRequest(); 
		client.timeout = 0; 
		client.open("HEAD", buildURL(URLBreakdown, itemVersion)); 
		client.send(); 
        
		client.onreadystatechange = function() { 
				if(this.readyState == 4){ 
					const responseVersion = /(.*\/[^\/]*)(\d\d)(\/.*)/.exec(this.responseURL)[2]; 
					//If the URL exists, an <a> tag is added to the button featuring the constructed URL. 
					if(this.status == 200) {     
						document.getElementById(responseVersion).getElementsByTagName("a")[0].setAttribute("href", buildURL(URLBreakdown, responseVersion)); 
						document.getElementById(responseVersion).style.display = "block"; 
						//By default, each list element is set to not display, this is just an insurance measure to ensure that a user doesn't see a version option that isn't real. 
					} else {                       document.getElementById(responseVersion).style.display = "none"; 
					}} 
			} 
		//If the version is the current version for the page, set it to be current and look nice. 
		if(itemVersion == currentVersion){ 
			items[i].classList.toggle("current"); 
			items[i].style.display = "block"; 
 
		}                        

	}    

} 
 
//We outsource to this function mostly for readability. There's a lot of weird, tricky stuff in the above function, might as well reduce cognitive load where we can. 
//This just takes in a version number and the URL breakdown and constructs a URL. This is used for checking URLs and for adding them to <a> tags. 
function buildURL(URLBreakdown, version) { 
	var newURL = URLBreakdown[1] + version + URLBreakdown[3]; 
	return newURL; 
} 