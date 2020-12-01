const blob = new Blob([
	'importScripts("https://cdn.jsdelivr.net/npm/lzma@2.3.2/src/lzma_worker.min.js");',
]);
const lzma = new LZMA(window.URL.createObjectURL(blob));

let editor = null;
let select = null;
let clipboard = null;
let statsEl = null;

const init = () => {
	initCodeEditor();
	editor.setValue(
		location.hash.length > 1 ? atob(location.hash.substr(1)) : ''
	);
	initClipboard();
	initModals();
};

const initCodeEditor = () => {
	CodeMirror.modeURL =
		'https://cdn.jsdelivr.net/npm/codemirror@5.58.1/mode/%N/%N.js';
	editor = new CodeMirror(byId('editor'), {
		lineNumbers: true,
		theme: 'dracula',
		readOnly: false,
		lineWrapping: false,
		scrollbarStyle: 'simple',
	});

	statsEl = document.querySelector('#stats');
	editor.on('change', () => {
		location.hash = btoa(editor.getValue());
		document.querySelector('#view-md').href = '../' + location.hash;
		statsEl.innerHTML = `Length: ${editor.getValue().length} |  Lines: ${
			editor['doc'].size
		}`;
		hideCopyBar();
	});
};

const initClipboard = () => {
	clipboard = new ClipboardJS('.clipboard');
	clipboard.on('success', () => {
		hideCopyBar(true);
	});
};

const initModals = () => {
	MicroModal.init({
		onClose: () => editor.focus(),
	});
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

const disableLineWrapping = () => {
	byId('disable-line-wrapping').classList.add('hidden');
	byId('enable-line-wrapping').classList.remove('hidden');
	editor.setOption('lineWrapping', false);
};

const enableLineWrapping = () => {
	byId('enable-line-wrapping').classList.add('hidden');
	byId('disable-line-wrapping').classList.remove('hidden');
	editor.setOption('lineWrapping', true);
};
const byId = (id) => document.querySelector('#' + id);

function viewPage() {
	location.href = '../' + location.hash;
}

document.addEventListener(
	'keydown',
	function (e) {
		if (
			e.key == 's' &&
			(navigator.platform.match('Mac') ? e.metaKey : e.ctrlKey)
		) {
			e.preventDefault();
			if (byId('copy').classList.contains('hidden')) {
				showCopyBar(document.querySelector('#view-md').href);
			} else {
				hideCopyBar(false);
			}
		}
	},
	false
);

init();
