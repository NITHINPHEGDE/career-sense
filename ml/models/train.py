import pandas as pd
import joblib

from ml.preprocessing.build_features import build_features
from ml.preprocessing.scaler import fit_scaler
from ml.models.ann_model import build_ann

# 1. Load data ONCE
df = pd.read_csv("data/raw/data_after_eda.csv")

# 2. Build features
X, y = build_features(df, mode="train")

# 3. Save feature columns (CRITICAL)
joblib.dump(X.columns.tolist(), "artifacts/feature_columns.pkl")

# 4. Scale
X_scaled = fit_scaler(X)

# 5. Train model
model = build_ann(X_scaled.shape[1])
model.fit(X_scaled, y, epochs=50, batch_size=32)

# 6. Save model
model.save("artifacts/ann_model.h5")
