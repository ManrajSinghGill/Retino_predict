// Open the chatbot modal
function openChat() {
    document.getElementById('chatbot-modal').style.display = 'block';
}

// Close the chatbot modal
function closeChat() {
    document.getElementById('chatbot-modal').style.display = 'none';
}

document.querySelector('.chatbot-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    let query = document.querySelector('#chat-options').value;
    let responseText = '';

    switch(query) {
        case 'about':
            responseText = 'Diabetic Retinopathy (DR) is a diabetes complication that affects the eyes due to damage to the retina’s blood vessels.';
            break;
        case 'stages':
            responseText = 'The stages of DR include: Mild Nonproliferative Retinopathy, Moderate Nonproliferative Retinopathy, Severe Nonproliferative Retinopathy, and Proliferative Retinopathy.';
            break;
        case 'prevention':
            responseText = 'To prevent DR, manage your blood sugar levels, maintain a healthy diet, and get regular eye screenings.';
            break;
        case 'treatment':
            responseText = 'Treatment options include laser surgery, vitrectomy, and injections to reduce abnormal blood vessel growth.';
            break;
        case 'contact':
            responseText = 'You can contact us at support@retinopredict.com for any further assistance.';
            break;
        default:
            responseText = 'Please select a valid option.';
    }

    document.querySelector('#response').textContent = responseText;
});
