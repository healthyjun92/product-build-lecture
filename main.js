// The link to your model provided by Teachable Machine export
const URL = "https://teachablemachine.withgoogle.com/models/GY_J2Ej-jp/";

let model, webcam, labelContainer, maxPredictions;

// DOM elements
const imageUpload = document.getElementById('imageUpload');
const previewImage = document.getElementById('previewImage');
const classifyButton = document.getElementById('classifyButton');
const predictionDiv = document.getElementById('prediction');

// Load the image model and setup the event listeners
async function init() {
    const modelURL = URL + "model.json";
    const metadataURL = URL + "metadata.json";

    // load the model and metadata
    // Refer to tmImage.loadFromFiles() in the API to support files from a file picker
    // or tmImage.loadFromURL() support files from a URL
    model = await tmImage.load(modelURL, metadataURL);
    maxPredictions = model.getTotalClasses();

    // Event listener for image upload
    imageUpload.addEventListener('change', handleImageUpload);

    // Event listener for classify button
    classifyButton.addEventListener('click', classifyImage);

    console.log("Model loaded and event listeners set up.");
}

async function handleImageUpload(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            previewImage.src = e.target.result;
            previewImage.style.display = 'block';
            classifyButton.disabled = false; // Enable classify button
            predictionDiv.innerHTML = ''; // Clear previous predictions
        };
        reader.readAsDataURL(file);
    } else {
        previewImage.src = '#';
        previewImage.style.display = 'none';
        classifyButton.disabled = true; // Disable classify button
        predictionDiv.innerHTML = ''; // Clear previous predictions
    }
}

async function classifyImage() {
    if (!model) {
        predictionDiv.innerHTML = "모델이 로드되지 않았습니다.";
        return;
    }
    if (previewImage.style.display === 'none' || !previewImage.src || previewImage.src === '#') {
        predictionDiv.innerHTML = "분류할 이미지가 없습니다. 이미지를 업로드해주세요.";
        return;
    }

    predictionDiv.innerHTML = "분류 중...";
    classifyButton.disabled = true; // Disable button during classification

    // Predict the image
    const prediction = await model.predict(previewImage);

    // Display prediction results
    predictionDiv.innerHTML = ''; // Clear "분류 중..."
    for (let i = 0; i < maxPredictions; i++) {
        const classPrediction =
            prediction[i].className + ": " + prediction[i].probability.toFixed(2);
        predictionDiv.innerHTML += classPrediction + '<br>';
    }
    classifyButton.disabled = false; // Re-enable button after classification
}

// Initialize the application when the window loads
window.onload = init;