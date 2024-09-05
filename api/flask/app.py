"""
Flask Froogle Lens Image Classification API.

Provides an API for image classification using pre-trained MobileNetV2 model.
"""

import io
import json
import os
import redis
import tensorflow as tf

from dotenv import load_dotenv
from flask import Flask, jsonify, request, Response
from flask_cors import CORS
from PIL import Image
from tensorflow.keras.applications import MobileNetV2
from tensorflow.keras.applications.mobilenet_v2 import (
    preprocess_input,
    decode_predictions,
)

# Load environment variables
load_dotenv()

# Initialize Redis connection
r = redis.from_url(os.getenv("REDIS_URL"))

# Create Flask app with CORS enabled
app = Flask(__name__)
CORS(app)

# Initialize JSON object in Redis for storing results
try:
    r.execute_command("JSON.SET", "image_classification_results", ".", "{}")
except Exception as e:
    print(e)

# Load pre-trained MobileNetV2 model
model = MobileNetV2(weights="imagenet")


@app.route("/classify", methods=["POST"])
def classify():
    """
    Image Classification Endpoint.

    Accepts an image upload and returns the top 3 predicted labels with
    confidence percentages.
    """
    if "image" not in request.files:
        return jsonify({"error": "No image provided."}), 400

    try:
        image_file = request.files["image"]

        # Preprocess image and predict
        img = Image.open(io.BytesIO(image_file.read()))
        img = img.resize((224, 224))
        img = img.convert("RGB")
        img_array = tf.keras.preprocessing.image.img_to_array(img)
        img_array = tf.expand_dims(img_array, 0)
        img_array = preprocess_input(img_array)

        predictions = model.predict(img_array)
        decoded_predictions = decode_predictions(predictions, top=3)[0]

        results = {
            "first": {
                "label": decoded_predictions[0][1],
                "confidence": decoded_predictions[0][2] * 100,
            },
            "second": {
                "label": decoded_predictions[1][1],
                "confidence": decoded_predictions[1][2] * 100,
            },
            "third": {
                "label": decoded_predictions[2][1],
                "confidence": decoded_predictions[2][2] * 100,
            },
        }

        # Store results in Redis
        r.execute_command(
            "JSON.SET", "image_classification_results", ".", json.dumps(results)
        )
        response_data = {"message": "Image classification result stored in database."}
        status_code = 200

    except Exception as e:
        print(e)
        response_data = {"message": "Error running image classification."}
        status_code = 500

    return Response(
        json.dumps(response_data), status=status_code, mimetype="application/json"
    )


@app.route("/results", methods=["GET"])
def results():
    """
    Image Classification Results Endpoint.

    Returns the latest image classification results from the database.
    """
    try:
        # Get results from Redis
        results = json.loads(
            r.execute_command("JSON.GET", "image_classification_results")
        )

        response_data = results
        status_code = 200

    except Exception as e:
        print(e)
        response_data = {"message": "Error getting image classification results."}
        status_code = 500

    return Response(
        json.dumps(response_data), status=status_code, mimetype="application/json"
    )


if __name__ == "__main__":
    # Start Flask app with environment-specific settings
    host = os.environ.get("FLASK_HOST", "0.0.0.0")
    port = os.environ.get("FLASK_PORT", 5000)
    debug = os.environ.get("FLASK_DEBUG", False)

    app.run(host=host, port=int(port), debug=debug)
