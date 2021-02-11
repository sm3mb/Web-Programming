var imageTag = document.getElementById('image'); // Reading the tag with id image as imageTag
function upDate(previewPic) {
    // Assigning the background image to imageTag from previewPic I am getting the tag that mouse is hovered
    imageTag.style.backgroundImage = `url(${previewPic.src})`; 
    // Assigning the alt text from tag to imageTag innerHTML
    imageTag.innerHTML = previewPic.alt;
}

function unDo() {
  // Assigning the previous url as background to the imageTag
  imageTag.style.backgroundImage = `url('')`;
  // Assigning the default text to imageTag 
  imageTag.innerHTML = `Hover over an image below to display here.`;
}
