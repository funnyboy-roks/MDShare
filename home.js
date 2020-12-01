if (location.hash.length > 1) {
	document.getElementById('content').innerHTML = marked(
		atob(location.hash.substr(1))
	);
	// document.querySelector('a#button').href = './edit/' + location.hash;
}

window.onload = () => {
	document.querySelector('#edit-md').href = './edit/' + location.hash;
};

// Open the "Copy" bar and select the content
const showCopyBar = (dataToCopy) => {
	byId('copy').classList.remove('hidden');
	const linkInput = byId('copy-link');
	linkInput.value = dataToCopy;
	linkInput.focus();
	linkInput.setSelectionRange(0, dataToCopy.length);
};

// Close the "Copy" bar
const hideCopyBar = (success) => {
	const copyButton = byId('copy-btn');
	const copyBar = byId('copy');
	if (!success) {
		copyBar.classList.add('hidden');
		return;
	}
	copyButton.innerText = 'Copied !';
	setTimeout(() => {
		copyBar.classList.add('hidden');
		copyButton.innerText = 'Copy';
	}, 800);
};

const byId = id => document.querySelector('#' + id);