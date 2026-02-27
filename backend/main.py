from fastapi import FastAPI
from pydantic import BaseModel
import joblib
import numpy as np
import csv
import os
import random
from questions import quiz_data
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# -------- Load Model --------
model = joblib.load("efficiency_model.pkl")


# -------- Request Schema --------
class StudentData(BaseModel):
    subject: str
    accuracy: float
    avg_time: float


# -------- Prediction Route --------
@app.post("/predict")
def predict(data: StudentData):

    # Encode subject
    subject_encoded = 0 if data.subject == "AIML" else 1

    input_data = np.array([[subject_encoded, data.accuracy, data.avg_time]])

    prediction = model.predict(input_data)[0]

    # Decode prediction
    if prediction == 0:
        efficiency = "Low"
    elif prediction == 1:
        efficiency = "Medium"
    else:
        efficiency = "High"

    # Save to CSV
    file_exists = os.path.isfile("performance_data.csv")

    with open("performance_data.csv", "a", newline="") as file:
        writer = csv.writer(file)

        if not file_exists:
            writer.writerow(["Subject", "Accuracy", "Avg_Time", "Efficiency"])

        writer.writerow([
            data.subject,
            data.accuracy,
            data.avg_time,
            efficiency
        ])

    return {
        "efficiency": efficiency
    }

# -------- Quiz Questions Route --------
@app.get("/questions/{subject}")
def get_questions(subject: str):

    if subject not in quiz_data:
        return {"error": "Invalid subject"}

    all_questions = quiz_data[subject]

    # Select 10 random questions
    selected = random.sample(list(all_questions.items()), 10)

    formatted_questions = []

    for question, (correct_letter, options) in selected:
        # Convert correct answer letter (e.g., 'a') to zero-based index
        letter = correct_letter.lower()
        correct_index = ord(letter) - ord('a') if len(letter) == 1 and letter.isalpha() else 0
        formatted_questions.append({
            "question": question,
            "options": options,
            "correctAnswer": correct_index,
        })

    return {"questions": formatted_questions}