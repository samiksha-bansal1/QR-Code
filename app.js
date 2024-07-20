let inputText = document.querySelector(".inputText");
let color = document.querySelector(".color");
let height = document.querySelector(".height");
let width = document.querySelector(".width");
let button = document.querySelector("button");
let img = document.querySelector(".img");
let result = document.querySelector(".result");
let aboutResult = document.querySelector(".aboutResult");

let downloadImg = document.querySelector(".downloadImg");

const url = "https://api.qrserver.com/v1/create-qr-code/?size=";

button.addEventListener("click", () => {
  let colorName = color.value;
  colorName = colorName.substr(1);

  if (inputText.value == "") {
    alert("Please enter text");
    aboutResult.innerHTML = "Enter Link/Text";
  }
  //ERROR
  else {
    aboutResult.innerHTML = "Generating...";

    if (height.value == "") {
      height.value = 150;
    }

    if (width.value == "") {
      width.value = 150;
    }

    generateQRCODE(height.value, width.value, colorName, inputText.value);
    height.value = "";
    width.value = "";
    inputText.value = "";
  }
});

async function generateQRCODE(height, width, color, inputVal) {
  //API
  let response = await fetch(
    `${url}${height}x${width}&data=${inputVal}&color=${color}`
  );
  //image:
  img.src = response.url;
  img.height = height;
  img.width = width;
  //download link
  const blobImage = await response.blob();
  const href = URL.createObjectURL(blobImage);
  downloadImg.href = href;
  downloadImg.download = `QR-CODE-${inputVal}`;
  downloadImg.innerText = "Download QR-Code";
  //inputVal
  aboutResult.innerHTML = "Result!";
}
