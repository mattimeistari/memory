const urlParams = new URLSearchParams(window.location.search);
const astatus = urlParams.get("status");
		
// update the content of the <p> tag based on the value of the `status` parameter
if (astatus == "fail") {
	const statusMessage = document.querySelector("#textFail");
	statusMessage.textContent = "entry false..";
	statusMessage.style.color = "red";
}