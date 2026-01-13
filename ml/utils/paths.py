from pathlib import Path

# Project root = careersense/
PROJECT_ROOT = Path(__file__).resolve().parents[2]

# Artifacts directory
ARTIFACTS_DIR = PROJECT_ROOT / "artifacts"
ARTIFACTS_DIR.mkdir(exist_ok=True)

# Data directory
DATA_DIR = PROJECT_ROOT / "data"

# Artifact paths
SCALER_PATH = ARTIFACTS_DIR / "scaler.pkl"
MODEL_PATH = ARTIFACTS_DIR / "ann_model.h5"
FEATURE_COLS_PATH = ARTIFACTS_DIR / "feature_columns.pkl"

"""
parents[0] → utils

parents[1] → ml

parents[2] → careersense ✅ (project root)
"""