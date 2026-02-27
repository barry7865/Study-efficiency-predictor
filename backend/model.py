import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score, classification_report

# Load dataset
data = pd.read_csv("performance_data.csv")

# Convert categorical labels to numbers
data["Efficiency"] = data["Efficiency"].map({
    "Low": 0,
    "Medium": 1,
    "High": 2
})

# Convert subject to numeric
data["Subject"] = data["Subject"].map({
    "AIML": 0,
    "Python": 1
})

# Features and target
X = data[["Subject", "Accuracy", "Avg_Time"]]
y = data["Efficiency"]

# Split data
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42
)

# Train model
model = RandomForestClassifier(n_estimators=200, random_state=42)
model.fit(X_train, y_train)

# Predict
y_pred = model.predict(X_test)

# Evaluate
print("Model Accuracy:", accuracy_score(y_test, y_pred))
print("\nClassification Report:\n")
print(classification_report(y_test, y_pred))

import joblib

# Save the trained model
joblib.dump(model, "efficiency_model.pkl")

print("\nModel saved as efficiency_model.pkl")

print("\nModel trained successfully!")