import pandas as pd
import joblib
import tensorflow as tf

from ml.preprocessing.build_features import build_features
from ml.preprocessing.scaler import transform_scaler
from ml.utils.paths import MODEL_PATH, FEATURE_COLS_PATH

model = tf.keras.models.load_model(MODEL_PATH, compile=False)
cols = joblib.load(FEATURE_COLS_PATH)

def predict(input_dict):
    df = pd.DataFrame([input_dict])

    X, _ = build_features(df, mode="infer")
    X = X.reindex(columns=cols, fill_value=0)
    X_scaled = transform_scaler(X)

    return model.predict(X_scaled)[0][0]

sample = {
    "Employment Status": "Full Time",
    "Location": "Mumbai",
    "company_size": "Mid",
    "Job Roles": "Backend Engineer",
    "skills": "python, sql, django"
}

print(predict(sample))
