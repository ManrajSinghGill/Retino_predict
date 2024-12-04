// Open and Close Chatbot Modal
function openChat() {
    document.getElementById('chatbot-modal').style.display = 'block';
}

function closeChat() {
    document.getElementById('chatbot-modal').style.display = 'none';
}

// Handle Chatbot Queries
document.querySelector('.chatbot-form').addEventListener('submit', function (e) {
    e.preventDefault();

    const query = document.querySelector('#chat-options').value;
    const responseMap = {
        about: 'Diabetic Retinopathy is a diabetes complication that affects the retina due to prolonged high blood sugar.',
        stages: 'Stages include Mild, Moderate, Severe Nonproliferative Retinopathy, and Proliferative Retinopathy.',
        prevention: 'Prevent it by controlling blood sugar, regular eye exams, and managing blood pressure.',
        treatment: 'Treatment includes laser surgery, vitrectomy, and anti-VEGF injections.',
    };
    document.querySelector('#response').textContent = responseMap[query] || 'Please select a valid option.';
});

// Handle Prediction Form
document.getElementById('predictionForm').addEventListener('submit', function (e) {
    e.preventDefault();

    // Simulate a prediction result
    const predictionStages = ['Mild Nonproliferative', 'Moderate Nonproliferative', 'Severe Nonproliferative', 'Proliferative'];
    const randomStage = predictionStages[Math.floor(Math.random() * predictionStages.length)];

    document.getElementById('predictionOutput').style.display = 'block';
    document.getElementById('predictionStage').textContent = randomStage;
});

// Glucose Tracking
const glucoseForm = document.getElementById('glucoseForm');
const glucoseTable = document.getElementById('glucoseTable').querySelector('tbody');

glucoseForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const glucose = document.getElementById('glucose').value;
    const date = document.getElementById('date').value;

    const row = glucoseTable.insertRow();
    row.innerHTML = `<td>${date}</td><td>${glucose}</td>`;
    glucoseForm.reset();
});

// Calorie Tracking
const calorieForm = document.getElementById('calorieForm');
const calorieTable = document.getElementById('calorieTable').querySelector('tbody');

calorieForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const calories = document.getElementById('calories').value;
    const date = document.getElementById('date').value;

    const row = calorieTable.insertRow();
    row.innerHTML = `<td>${date}</td><td>${calories}</td>`;
    calorieForm.reset();
});

// Visualizations
const ctx = document.getElementById('trendChart').getContext('2d');
new Chart(ctx, {
    type: 'line',
    data: {
        labels: ['Day 1', 'Day 2', 'Day 3'],
        datasets: [
            {
                label: 'Glucose Levels',
                data: [120, 140, 110],
                borderColor: '#4DD0E1',
                borderWidth: 2,
            },
            {
                label: 'Calorie Intake',
                data: [1800, 2000, 1700],
                borderColor: '#1a1764',
                borderWidth: 2,
            },
        ],
    },
});


// Dummy Data for Metrics
let glucoseEntries = [110, 120, 130];
let calorieEntries = [1800, 2000, 1900];

// Update Dashboard Metrics
document.addEventListener("DOMContentLoaded", () => {
    const avgGlucose = glucoseEntries.length
        ? glucoseEntries.reduce((a, b) => a + b, 0) / glucoseEntries.length
        : "--";
    const totalCalories = calorieEntries.length
        ? calorieEntries.reduce((a, b) => a + b, 0)
        : "--";
    const entriesCount = glucoseEntries.length || "--";

    document.getElementById("avgGlucose").textContent = `${avgGlucose.toFixed(1)} mg/dL`;
    document.getElementById("totalCalories").textContent = `${totalCalories} kcal`;
    document.getElementById("entriesCount").textContent = entriesCount;
});
