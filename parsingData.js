var parsedData = [];
var allRowsParsed = [];
var utmSources = new Set();
let groupUTMSourceUTMCampaignKeyValBef = {};
function httpGet(theUrl) {
	var xmlHttp = new XMLHttpRequest();
	xmlHttp.open("GET", theUrl, false); // false for synchronous request
	xmlHttp.send();
	return xmlHttp.responseText;
}
function parseData(data) {
	let parsedRows = data.split("\r\n");

	parsedRows.forEach(row => {
		let singleRowParsed = row.split("&");
		let singleRowKeyVal = {};
		singleRowParsed.forEach(rec => {
			let keyValue = rec.split("=");
			singleRowKeyVal[keyValue[0]] = keyValue[1];
		})
		allRowsParsed.push(singleRowKeyVal);
		parsedData.push(singleRowParsed);
	})
	getUniqueUTMSource();
}
parseData(httpGet("https://raw.githubusercontent.com/MarkoVukovic/LeverUPParseData/master/sourceFile.csv"));


function getUniqueUTMSource() {
	let groupUTMSourceUTMCampaign = new Set();
	allRowsParsed.forEach(rec => {
		utmSources.add(rec["utm_source"]);
		groupUTMSourceUTMCampaign.add(rec["utm_source"] + " " + rec["utm_campaign"]);
	})
	groupUTMSourceUTMCampaign.forEach(rec => {
		let params = rec.split(" ");
		if (groupUTMSourceUTMCampaignKeyValBef[params[0]]) {
			if (groupUTMSourceUTMCampaignKeyValBef[params[0]][0] != params[1])
				groupUTMSourceUTMCampaignKeyValBef[params[0]].push(params[1]);
		}
		else
			groupUTMSourceUTMCampaignKeyValBef[params[0]] = [params[1]];
	})
}
function getSpecificUTMSourceAndCampaings(utmSource) {
	return groupUTMSourceUTMCampaignKeyValBef[utmSource];
}