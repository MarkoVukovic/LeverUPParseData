function httpGet(theUrl) {
	var xmlHttp = new XMLHttpRequest();
	xmlHttp.open("GET", theUrl, true); // false for synchronous request
	return xmlHttp.responseText;
}
console.log(httpGet("https://raw.githubusercontent.com/MarkoVukovic/LeverUPParseData/master/sourceFile.csv"))
//console.log("teoi");