from fastapi import FastAPI
from pydantic import BaseModel
from ml.inference.predict import predict

app = FastAPI()

class PredictionInput(BaseModel):
    rating: float
    experience_years: int
    employment_status: str
    location: str
    company_size: str
    job_roles: str
    skills: str

@app.get("/")
def health():
    return {"status": "ok"}

@app.post("/predict")
def predict_salary(data: PredictionInput):
    input_dict = {
        "rating": data.rating,
        "experience_years": data.experience_years,
        "Employment Status": data.employment_status,
        "Location": data.location,
        "company_size": data.company_size,
        "Job Roles": data.job_roles,
        "skills": data.skills,
    }

    salary = predict(input_dict)
    return {"predicted_salary": float(salary)}
