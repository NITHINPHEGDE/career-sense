# large features need scaling
import joblib
from sklearn.preprocessing import StandardScaler

SCALER_PATH = "artifacts/scaler.pkl"

def fit_scaler(X):
    scaler = StandardScaler()
    X_scaled = scaler.fit_transform(X)
    joblib.dump(scaler, SCALER_PATH)
    return X_scaled

def transform_scaler(X):
    scaler = joblib.load(SCALER_PATH)
    return scaler.transform(X)
