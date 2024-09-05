(ns froogle-lens.core
  (:require
    [compojure.core :refer [defroutes GET POST]]
    [compojure.route :as route]
    [ring.adapter.jetty :refer [run-jetty]]
    [ring.middleware.json :refer [wrap-json-body wrap-json-response]]
    [ring.util.response :refer [response]]
    [taoensso.carmine :as car :refer (wcar)]
    [clojure.java.io :as io]
    [cheshire.core :as json]
    [dotenv :refer [load-env]]
    [org.tensorflow SavedModelBundle :as tf])
  (:import
    [java.awt.image BufferedImage]
    [javax.imageio ImageIO]
    [org.tensorflow Tensor]
    [org.tensorflow.framework TensorProto]))

;; Load environment variables
(defn load-env-vars []
  (load-env))

(load-env-vars)

;; Redis connection pool
(def pool {:spec {:uri (System/getenv "REDIS_URL")}})

;; Redis commands using Carmine
(defmacro redis [& body] `(wcar pool ~@body))

;; TensorFlow model loading
(defonce model (tf/SavedModelBundle/load "path/to/mobilenet/saved_model" "serve"))

(defn preprocess-image [image]
  ;; Function to preprocess the image for TensorFlow model
  ;; Resize to 224x224 and convert to the proper format
  ;; Returns a tensor suitable for MobileNetV2
  ;; Placeholder for TensorFlow Java preprocessing code
  )

(defn classify-image [image-bytes]
  (let [img (ImageIO/read (io/input-stream (io/byte-array-input-stream image-bytes)))
        processed-image (preprocess-image img)
        predictions (.predict model processed-image)] ;; Predict using the TensorFlow model
    ;; Decode predictions
    (decode-predictions predictions)))

(defn decode-predictions [predictions]
  ;; Decode top 3 predictions using the TensorFlow Java API
  ;; Placeholder for decoding function
  )

(defn classify-handler [request]
  ;; Image classification endpoint handler
  (let [file (:image (:params request))]
    (if (nil? file)
      (response {:error "No image provided."})
      (try
        (let [image-bytes (:bytes file)
              results (classify-image image-bytes)]
          ;; Store results in Redis
          (redis (car/set "image_classification_results" (json/encode results)))
          (response {:message "Image classification result stored in database."}))
        (catch Exception e
          (println e)
          (response {:message "Error running image classification."}))))))
  
(defn results-handler [request]
  ;; Fetch classification results from Redis
  (try
    (let [results (redis (car/get "image_classification_results"))]
      (response (json/parse-string results)))
    (catch Exception e
      (println e)
      (response {:message "Error getting image classification results."}))))

;; Define routes
(defroutes app
  (POST "/classify" request (classify-handler request))
  (GET "/results" request (results-handler request))
  (route/not-found "Not Found"))

;; Wrap app with JSON middleware
(def wrapped-app
  (-> app
      (wrap-json-body)
      (wrap-json-response)))

;; Run the Jetty server
(defn -main []
  (let [host (System/getenv "FLASK_HOST" "0.0.0.0")
        port (Integer/parseInt (System/getenv "FLASK_PORT" "5000"))
        debug (Boolean/parseBoolean (System/getenv "FLASK_DEBUG" "false"))]
    (run-jetty wrapped-app {:host host :port port :join? false})))
