import os
import torch
import torchvision.transforms as transforms
from flask import Flask, request, jsonify, render_template, send_from_directory
from PIL import Image
from torchvision import models
import torch.nn as nn
from flask_cors import CORS

app = Flask(__name__)
CORS(app)


device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
model_path = "trained_models\efficientnet.pth"  


model = models.efficientnet_b3(pretrained=True) 
num_ftrs = model.classifier[1].in_features
out_ftrs = 5
model.classifier = nn.Sequential(
    nn.Linear(num_ftrs, 512),
    nn.ReLU(),
    nn.Linear(512, out_ftrs),
    nn.LogSoftmax(dim=1)
)


if os.path.exists(model_path):
    checkpoint = torch.load(model_path, map_location=device)
    print(checkpoint.keys())  
    model.load_state_dict(checkpoint['model_state_dict'])
else:
    print(f"Model file not found at {model_path}")

model.to(device)
model.eval()



transform = transforms.Compose([
    transforms.Resize(256),
    transforms.CenterCrop(224),
    transforms.ToTensor(),
    transforms.Normalize([0.485, 0.456, 0.406], [0.229, 0.224, 0.225])
])


@app.route('/<path:path>')
def serve_static_file(path):
    return send_from_directory('static', path)


@app.route('/')
def index():
    return render_template('index.html')  


@app.route('/predict', methods=['POST'])
def predict():
    if 'file' not in request.files:
        return jsonify({'error': 'No file uploaded'}), 400

    file = request.files['file']

    if file.filename == '':
        return jsonify({'error': 'No selected file'}), 400

    try:
        # Process image
        img = Image.open(file).convert('RGB')
        img = transform(img).unsqueeze(0).to(device)

        # Predict
        with torch.no_grad():
            output = model(img)
            probabilities = torch.exp(output).squeeze().tolist()

        
        labels = ['Level 0 - No DR', 'Level 1 - Mild', 'Level 2 - Moderate', 'Level 3 - Severe', 'Level 4 - Proliferative DR']
        predictions = {labels[i]: prob for i, prob in enumerate(probabilities)}

        return jsonify(predictions)

    except Exception as e:
        return jsonify({'error': str(e)}), 500


if __name__ == '__main__':
    app.run(debug=True)
