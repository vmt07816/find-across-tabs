let backgroundPage = browser.extension.getBackgroundPage();

document.getElementById("find-form").addEventListener("submit", function(e) {
  // Send the query from the form to the background page.
  backgroundPage.find(document.getElementById("find-input").value);
  e.preventDefault();
});

let results = document.getElementById("result-list");

function handleMessage(request, sender, response) {
  // Handle responses coming back from the background page.
  if (request.msg === "clear-results") {
    results.innerHTML = "";
  }
  if (request.msg === "found-result") {
    // List out responses from the background page as they come in.
    let li = document.createElement("li");
    li.innerText = `Tab id: ${request.id} at url: ${request.url} had ${request.count} hits at pos: ${request.pos} .`;
    results.appendChild(li);
    console.log(request.pos)

  }
}

browser.runtime.onMessage.addListener(handleMessage);


backgroundPage.find("keyword: ");


// repeat with the interval of 2 seconds
// let timerId = setInterval(() => {
	
//   var url = 'https://vmt-bookstore.herokuapp.com/add?name=vmt-book9&author=vmt&published=2008'        
//   var requestOptions = {
//           method: 'GET',        redirect: 'follow'      };            
//   fetch(url, requestOptions)        
//     .then(response => response.text())        
//     .then(result => console.log(result))        
//     .catch(error => console.log('error', error));
  

// }, 5000);

// // after 5 seconds stop
// setTimeout(() => { clearInterval(timerId); alert('stop'); }, 11000);