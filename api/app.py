from flask import Flask, jsonify, request, Response
from flask_cors import CORS
from PIL import Image
import io
import os
from dotenv import load_dotenv
import redis
import json

# Image classification imports
import tensorflow as tf
from tensorflow.keras.applications import MobileNetV2
from tensorflow.keras.applications.mobilenet_v2 import (
    preprocess_input,
    decode_predictions,
)

# Load environment variables
load_dotenv()

# Initialize the Redis connection
r = redis.from_url(os.getenv("REDIS_URL"))

app = Flask(__name__)
CORS(app)

# Initialize JSON object for storing results
try:
    r.execute_command("JSON.SET", "image_classification_results", ".", "{}")
except Exception as e:
    print(e)

# Load the pre-trained MobileNetV2 model
model = MobileNetV2(weights="imagenet")


# Define the /classify route
@app.route("/classify", methods=["POST"])
def classify():
    if "image" not in request.files:
        return jsonify({"error": "No image provided."}), 400

    try:
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

        # Store the results in Redis
        r.execute_command(
            "JSON.SET", "image_classification_results", ".", json.dumps(results)
        )
        response_data = {"message": "Image classification result stored in database."}
        status_code = 200

    # Error handling
    except Exception as e:
        print(e)
        response_data = {"message": "Error running image classification."}
        status_code = 500

    # Return success response
    return Response(
        json.dumps(response_data), status=status_code, mimetype="application/json"
    )


# Define the /results route
@app.route("/results", methods=["GET"])
def results():
    try:
        # Get the results from Redis
        results = json.loads(
            r.execute_command("JSON.GET", "image_classification_results")
        )

        response_data = results
        status_code = 200

    # Error handling
    except Exception as e:
        print(e)
        response_data = {"message": "Error getting image classification results."}
        status_code = 500

    # Return success response
    return Response(
        json.dumps(response_data), status=status_code, mimetype="application/json"
    )


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)
