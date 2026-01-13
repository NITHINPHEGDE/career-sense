from fastapi import FastAPI
from pydantic import BaseModel

from ml.inference.predict import predict

app = FastAPI(title="CareerSense Salary Predictor")

# Input schema
class PredictionInput(BaseModel):
    Employment_Status: str
    Location: str
    company_size: str
    Job_Roles: str
    skills: str


@app.get("/")
def health_check():
    return {"status": "running"}


@app.post("/predict")
def predict_salary(data: PredictionInput):
    input_dict = {
        "Employment Status": data.Employment_Status,
        "Location": data.Location,
        "company_size": data.company_size,
        "Job Roles": data.Job_Roles,
        "skills": data.skills
    }

    salary = predict(input_dict)

    return {
        "predicted_salary": float(round(salary, 2))
    }
