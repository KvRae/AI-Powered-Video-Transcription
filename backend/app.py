import os
import uuid
import threading
from flask import Flask, request, jsonify
from flask_cors import CORS
from dotenv import load_dotenv
import moviepy as mp
import openai

# Load environment variables from .env
load_dotenv()
openai.api_key = os.getenv("OPENAI_API_KEY")

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Store task status and result in memory
tasks = {}

@app.route("/upload", methods=["POST"])
def upload_video():
    if 'file' not in request.files:
        return jsonify({
            "error": "Missing file",
            "message": "Please provide a video file for processing",
            "details": "The request must include a file in the 'file' field"
        }), 400

    if 'target_language' not in request.form:
        return jsonify({
            "error": "Missing target language",
            "message": "Please specify a target language for translation",
            "details": "The request must include a 'target_language' field"
        }), 400

    video_file = request.files['file']
    target_language = request.form['target_language']

    # Validate file type
    if not video_file.filename or '.' not in video_file.filename:
        return jsonify({
            "error": "Invalid file",
            "message": "The uploaded file appears to be invalid",
            "details": "Please ensure you're uploading a valid video file"
        }), 400

    task_id = str(uuid.uuid4())

    os.makedirs("temp", exist_ok=True)
    video_path = os.path.join("temp", f"{task_id}.mp4")
    video_file.save(video_path)

    # Store original filename for reference
    original_filename = video_file.filename

    tasks[task_id] = {
        "status": "in-progress",
        "stage": "initializing",
        "message": "Your video has been uploaded and is queued for processing",
        "progress": 0,
        "original_filename": original_filename,
        "target_language": target_language,
        "result": None
    }

    # Run processing in background thread
    thread = threading.Thread(target=process_video, args=(task_id, video_path, target_language))
    thread.start()

    return jsonify({
        "id": task_id,
        "message": "Video uploaded successfully and processing has begun",
        "status": "in-progress"
    })

@app.route("/<task_id>", methods=["GET"])
def check_status(task_id):
    if task_id not in tasks:
        return jsonify({
            "error": "Invalid ID",
            "message": "The requested task could not be found",
            "details": "Please check that you're using the correct task ID and try again"
        }), 404

    # Return the task data with a consistent message field
    task_data = tasks[task_id].copy()

    # Add a user-friendly message based on status if not already present
    if "message" not in task_data:
        if task_data["status"] == "success":
            task_data["message"] = "Your video has been successfully processed"
        elif task_data["status"] == "error":
            task_data["message"] = "An error occurred while processing your video"
        elif task_data["status"] == "in-progress":
            task_data["message"] = "Your video is currently being processed"

    return jsonify(task_data)


def process_video(task_id, video_path, target_language):
    try:
        # Step 1: Extract audio
        tasks[task_id].update({
            "stage": "extracting_audio",
            "message": "Extracting audio from your video",
            "progress": 25
        })

        audio_path = f"temp/{task_id}.mp3"
        try:
            clip = mp.VideoFileClip(video_path)
            clip.audio.write_audiofile(audio_path)
        except Exception as e:
            raise Exception(f"Failed to extract audio: {str(e)}")

        # Step 2: Transcribe using OpenAI Whisper API
        tasks[task_id].update({
            "stage": "transcribing",
            "message": "Transcribing audio to text",
            "progress": 50
        })

        try:
            with open(audio_path, "rb") as audio_file:
                transcript = openai.Audio.transcribe("whisper-1", audio_file)
        except Exception as e:
            raise Exception(f"Failed to transcribe audio: {str(e)}")

        # Step 3: Translate using OpenAI GPT
        tasks[task_id].update({
            "stage": "translating",
            "message": f"Translating text to {target_language}",
            "progress": 75
        })

        try:
            prompt = f"Translate this to {target_language}:\n\n{transcript['text']}"
            chat_response = openai.ChatCompletion.create(
                model="gpt-3.5-turbo",
                messages=[{"role": "user", "content": prompt}]
            )
            translation = chat_response.choices[0].message.content
        except Exception as e:
            raise Exception(f"Failed to translate text: {str(e)}")

        # Step 4: Save result
        tasks[task_id].update({
            "status": "success",
            "stage": "completed",
            "message": f"Your video has been successfully transcribed and translated to {target_language}",
            "progress": 100,
            "result": translation,
            "original_text": transcript['text']
        })

        # Clean up temporary files
        try:
            os.remove(video_path)
            os.remove(audio_path)
        except Exception:
            # Non-critical error, just log it
            pass

    except Exception as e:
        error_message = str(e)
        tasks[task_id].update({
            "status": "error",
            "message": f"An error occurred during processing: {error_message}",
            "error_details": error_message
        })


if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=8000)
