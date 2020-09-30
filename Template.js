
function toggleTrayActive(elementId) {
	var next = document.getElementById(elementId);
	var current = document.getElementsByClassName('tray-active');
	current[0].className = current[0].className.replace('tray-active', '');
	next.className += ' tray-active';
}

function showDescription(elem) {
	var name = elem.childNodes[3].innerHTML;
	var description = elem.childNodes[5].innerHTML;
	var repoLink = elem.childNodes[7].innerHTML;
	var websiteLink = elem.childNodes[9].innerHTML;
	// console.log(name, description, repoLink, websiteLink);
	// console.log(elem.childNodes[3].innerHTML);
	document.getElementById('projects-description-section').style.display =
		'block';
	document.getElementById('project-name').innerHTML = name;
	document.getElementById('project-description-box').innerHTML = description;
	document.getElementById('repo-link').setAttribute('href', repoLink);
	document.getElementById('website-link').setAttribute('href', websiteLink);
	var pos = document
		.getElementById('projects-description-section')
		.getBoundingClientRect();
	window.scrollBy(pos.left, pos.top);
	// console.log(pos.left, pos.top);
}

async function sendUserMessage() {
	document.getElementById('message-response').style.display = 'none';
	document.getElementById('message-error').style.display = 'none';
	var username = document.getElementById('user-name').value;
	var useremail = document.getElementById('user-email').value;
	var usermessage = document.getElementById('user-message').value;

	var error = document.getElementById('message-error');
	if (username == '') {
		error.style.display = 'block';
		return;
	}
	if (usermessage == '') {
		error.style.display = 'block';
		return;
	}
	if (!validateEmail(useremail)) {
		error.style.display = 'block';
		return;
	}

	url = 'https://chitrank0614-all-in-one.herokuapp.com/portfolio/send-email/';
	// url = 'http://127.0.0.1:5000/portfolio/send-email/';
	// console.log('sending msg to ', url);
	queryObj = {
		Name: username,
		Contact: useremail,
		Message: usermessage,
	};

	try {
		query = await makeAsyncPostRequest(url, queryObj);
		if (query['Status'] == 'Sent') {
			document.getElementById('message-response').innerHTML = 'Message Sent';
			document.getElementById('message-response').style.display = 'block';
		} else {
			document.getElementById('message-response').innerHTML = 'Server Error';
			document.getElementById('message-response').style.display = 'block';
		}
	} catch {
		document.getElementById('message-response').innerHTML = 'Server Error';
		document.getElementById('message-response').style.display = 'block';
	}
}
