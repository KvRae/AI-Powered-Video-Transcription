# AI-Powered Video Transcription & Translation

A full-stack application that allows users to upload MP4 videos, automatically transcribe the spoken content, and translate it into different languages using AI.

## 🛠️ Technologies Used

### 🛠 Backend Stack
![Python](https://img.shields.io/badge/Python-3.10-blue?logo=python&logoColor=white)
![Flask](https://img.shields.io/badge/Flask-2.x-black?logo=flask&logoColor=white)
![OpenAI API](https://img.shields.io/badge/OpenAI_API-Whisper%20%26%20GPT--3.5_Turbo-4B9CD3?logo=openai&logoColor=white)
![MoviePy](https://img.shields.io/badge/MoviePy-video--processing-ff69b4)
![Docker](https://img.shields.io/badge/Docker-containerized-2496ED?logo=docker&logoColor=white)

### 🛠 Frontend Stack

![Next.js](https://img.shields.io/badge/Next.js-15-black?logo=next.js)
![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-4.x-3178C6?logo=typescript&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.x-06B6D4?logo=tailwindcss&logoColor=white)
![ShadCN UI](https://img.shields.io/badge/ShadCN_UI-components-orange)

## 🌟 Features

- Upload MP4 video files
- Automatic speech transcription using OpenAI Whisper
- Translation to multiple languages (French, Arabic, Spanish, German)
- Asynchronous processing with real-time status updates
- Clean, responsive UI built with Next.js and TailwindCSS

> [!IMPORTANT]
>  This project requires a **ChatGPT API key** from OpenAI to run and test properly.
> - The API key must be from a **paid OpenAI account**.
> - Free-tier accounts **do not** have access to the ChatGPT API.
> - You can obtain an API key at: [https://platform.openai.com/](https://platform.openai.com/)

## 🏗️ Architecture

The application consists of two main components:

### Backend (Flask)

- RESTful API built with Flask
- Asynchronous video processing using threading
- Audio extraction with MoviePy
- Transcription using OpenAI Whisper API
- Translation using OpenAI GPT-3.5 Turbo
- Containerized with Docker

### Frontend (Next.js)

- Modern React application using Next.js
- TypeScript for type safety
- TailwindCSS for styling
- Responsive design that works on all devices
- Client-side form validation

## 📁 Project Structure

```
Full-Stack-AI-Powered-Video-Transcription-Translation/
├── backend/                  # Flask backend application
│   ├── temp/                 # Temporary storage for uploaded videos and audio
│   ├── app.py                # Main Flask application
│   ├── Dockerfile            # Docker configuration for backend
│   └── requirements.txt      # Python dependencies
│
├── frontend/                 # Next.js frontend application
│   ├── public/               # Static assets
│   ├── src/                  # Source code
│   │   ├── app/              # Next.js app directory
│   │   │   ├── hooks/        # Custom React hooks
│   │   │   ├── globals.css   # Global styles
│   │   │   ├── layout.tsx    # App layout component
│   │   │   └── page.tsx      # Main page component
│   │   ├── components/       # React components
│   │   │   └── ui/           # UI components
│   │   │       ├── FileUpload.tsx
│   │   │       ├── LanguageSelector.tsx
│   │   │       ├── ProcessingStatus.tsx
│   │   │       └── ResultDisplayBar.tsx
│   │   └── lib/              # Utility libraries
│   ├── Dockerfile            # Docker configuration for frontend
│   └── package.json          # Node.js dependencies
│
├── docker-compose.yml        # Docker Compose configuration
└── .env                      # Environment variables
```


## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- Python 3.10 or higher
- Docker and Docker Compose (for containerized deployment)
- OpenAI API key

### Environment Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/Full-Stack-AI-Powered-Video-Transcription-Translation.git
   cd Full-Stack-AI-Powered-Video-Transcription-Translation
   ```

2. Create a `.env` file in the root directory with your OpenAI API key:
   ```
   OPENAI_API_KEY=your_openai_api_key_here
   ```

### Running with Docker (Recommended)

The easiest way to run the application is using Docker Compose:

```bash
# Build and start all services
docker-compose up --build

# Run in detached mode (background)
docker-compose up -d

# View logs
docker-compose logs -f
```

This will start both the backend and frontend services:
- Backend API will be available at http://localhost:8000
- Frontend application will be available at http://localhost:3000

#### Stopping Docker Services

To stop the running containers:

```bash
# Stop services but keep containers
docker-compose stop

# Stop and remove containers
docker-compose down

# Stop, remove containers, and delete volumes (will remove all data)
docker-compose down -v
```

#### Docker Troubleshooting

If you encounter issues with Docker:

1. **Port conflicts**: If ports 3000 or 8000 are already in use, modify the port mappings in `docker-compose.yml`
2. **Build errors**: Try rebuilding with `docker-compose build --no-cache`
3. **Container not starting**: Check logs with `docker-compose logs [service_name]`
4. **API connection issues**: Ensure the frontend can reach the backend at `http://backend:8000`

### Manual Setup

#### Backend

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Create and activate a virtual environment:
   ```bash
   python -m venv venv
   # On Windows
   venv\Scripts\activate
   # On macOS/Linux
   source venv/bin/activate
   ```

3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

4. Run the Flask application:
   ```bash
   python app.py
   ```

The backend will be available at http://localhost:8000.

#### Frontend

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```

The frontend will be available at http://localhost:3000.

## 📝 API Documentation

### Upload Video

- **URL**: `/upload`
- **Method**: `POST`
- **Content-Type**: `multipart/form-data`
- **Parameters**:
  - `file`: MP4 video file
  - `target_language`: Language for translation (e.g., "French", "Arabic", "Spanish", "German")
- **Response**: 
  ```json
  {
    "id": "task-uuid"
  }
  ```

### Check Processing Status

- **URL**: `/<task_id>`
- **Method**: `GET`
- **Response**: 
  ```json
  {
    "status": "in-progress|success|error",
    "result": "Translated text or error message"
  }
  ```

## 🧪 Usage Example

1. Open the application in your browser
2. Upload an MP4 video file
3. Select the target language for translation
4. Click "Translate Video"
5. Wait for the processing to complete
6. View the translated transcript

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License—see the LICENSE file for details.

## 🙏 References

- [OpenAI](https://openai.com/) for providing the AI models
- [Next.js](https://nextjs.org/) for the frontend framework
- [Flask](https://flask.palletsprojects.com/) for the backend framework
- [TailwindCSS](https://tailwindcss.com/) for styling
