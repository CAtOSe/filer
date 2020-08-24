// Drag and drop support check. Pulled from Modernizr.
const isAdvancedUpload = (function isAdvancedUpload() {
  const div = document.createElement('div');
  return (('draggable' in div) || ('ondragstart' in div && 'ondrop' in div)) && 'FormData' in window && 'FileReader' in window;
}());

const uploadForm = document.getElementById('file-upload-form');
if (isAdvancedUpload) {
  let droppedFiles;

  // Add --drag-and-drop class if browser supports drag & drop
  uploadForm.classList.add('--drag-and-drop');

  const dragEvents = function dragEvents(event) {
    event.preventDefault();
    event.stopPropagation();
  };
  uploadForm.addEventListener('drag', dragEvents);
  uploadForm.addEventListener('dragstart', dragEvents);
  uploadForm.addEventListener('dragend', dragEvents);
  uploadForm.addEventListener('dragover', dragEvents);
  uploadForm.addEventListener('dragenter', dragEvents);
  uploadForm.addEventListener('dragleave', dragEvents);
  uploadForm.addEventListener('drop', dragEvents);

  const dragOverEvent = function dragOverEvent() {
    uploadForm.classList.add('--is-draged');
  };
  uploadForm.addEventListener('dragover', dragOverEvent);
  uploadForm.addEventListener('dragenter', dragOverEvent);

  const dragLeaveEvent = function dragLeaveEvent() {
    uploadForm.classList.remove('--is-draged');
  };
  uploadForm.addEventListener('dragleave', dragLeaveEvent);
  uploadForm.addEventListener('dragend', dragLeaveEvent);
  uploadForm.addEventListener('drop', dragLeaveEvent);

  const submit = function submit(event) {
    event.preventDefault();

    // UI element update
    const statusUploading = document.getElementsByClassName('c-upload-box__status__uploading')[0];
    statusUploading.style.display = 'block';
    const uploadMessage = document.getElementsByClassName('c-upload-box__label-message')[0];

    const formData = new FormData(uploadForm);

    if (droppedFiles) {
      formData.delete('file'); // Remove left over files

      for (let i = 0; i < droppedFiles.length; i += 1) {
        formData.append('file', droppedFiles[i]);
      }
    }

    // Uploading ... files message
    if (formData.getAll('file').length > 0) {
      uploadMessage.innerHTML = `Uploading ${formData.getAll('file').length} `;
      if (formData.getAll('file').length > 1) uploadMessage.innerHTML += 'files';
      else uploadMessage.innerHTML += 'file';
    }

    fetch('', {
      method: 'PUT',
      body: formData,
    })
      .then((response) => {
        statusUploading.style.display = 'none';

        // Check response
        if (!response.ok) throw Error(response.statusText);
        return response;
      })
      .then(() => {
        // Success
        const statusSuccess = document.getElementsByClassName('c-upload-box__status__success')[0];
        statusSuccess.style.display = 'block';

        // Reset form
        formData.delete('file');
        droppedFiles = undefined;

        window.location.reload();
      })
      .catch(() => {
        const statusError = document.getElementsByClassName('c-upload-box__status__error')[0];
        statusError.style.display = 'block';
      });
  };
  uploadForm.addEventListener('drop', (event) => {
    droppedFiles = event.dataTransfer.files;
    submit(event);
  });
  document.getElementById('file').addEventListener('change', submit);
}

(function attachOpenDialogAction() {
  const uploadDialog = document.getElementsByClassName('c-upload-box')[0];
  const uploadButton = document.getElementsByClassName('c-browser-window__upload')[0];

  uploadButton.addEventListener('click', () => {
    // Open dialog
    uploadDialog.style.display = 'flex';
  });

  // Hide when clicked putside
  uploadDialog.addEventListener('click', (event) => {
    if (event.target === uploadDialog) uploadDialog.style.display = 'none';
  });
  // Hide when press Esc
  document.addEventListener('keyup', (event) => {
    if (event.code === 'Escape') uploadDialog.style.display = 'none';
  });
}());
