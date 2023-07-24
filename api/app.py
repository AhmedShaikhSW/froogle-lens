from flask import Flask, jsonify, request
from flask_cors import CORS
from PIL import Image
import io
import uuid

import tensorflow as tf
from tensorflow.keras.applications import MobileNetV2
from tensorflow.keras.applications.mobilenet_v2 import (
    preprocess_input,
    decode_predictions,
)

app = Flask(__name__)
CORS(app)

# Load the pre-trained MobileNetV2 model
model = MobileNetV2(weights="imagenet")
# Initialize empty dictionary to store classification results
# Will replace with a database like Firebase/MongoDB in prod
classification_results = {}


@app.route("/upload", methods=["POST"])
def upload():
    if "image" not in request.files:
        return jsonify({"error": "No image provided."}), 400

    image_file = request.files["image"]

    # Preprocess the image
    img = Image.open(io.BytesIO(image_file.read()))
    img = img.resize((224, 224))
    img = img.convert("RGB")
    img_array = tf.keras.preprocessing.image.img_to_array(img)
    img_array = tf.expand_dims(img_array, 0)
    img_array = preprocess_input(img_array)

    # Make predictions using the pre-trained model
    predictions = model.predict(img_array)

    # Get top 3 predictions
    decoded_predictions = decode_predictions(predictions, top=3)[0]

    results = []
    for _, label, confidence in decoded_predictions:
        results.append({"label": label, "confidence": float(confidence)})

    # Generate a unique ID for the classification result
    result_id = str(uuid.uuid4())

    # Store the classification result in the dictionary
    classification_results[result_id] = results
    print(classification_results)

    return jsonify({"result_id": result_id}), 200


@app.route("/results/<result_id>", methods=["GET"])
def get_results(result_id):
    # Check if the result_id exists in the classification_results dictionary
    if result_id in classification_results:
        return jsonify(classification_results[result_id]), 200
    else:
        return jsonify({"error": "Result not found."}), 404


if __name__ == "__main__":
    app.run(host="127.0.0.1", port=5000)
