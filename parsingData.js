function httpGet(theUrl) {
	var xmlHttp = new XMLHttpRequest();
	xmlHttp.open("GET", theUrl, false); // false for synchronous request
	xmlHttp.send();
	return xmlHttp.responseText;
}
console.log(httpGet("https://raw.githubusercontent.com/MarkoVukovic/LeverUPParseData/master/sourceFile.csv"))
//console.log("teoi");