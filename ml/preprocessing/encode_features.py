#refferred feature engineering and did this
import pandas as pd

EMPLOYMENT_COLS = ["Employment Status"]
CAT_COLS = ["Location", "company_size", "job_category"]

def encode_categorical(df):
    df = pd.get_dummies(
        df,
        columns=[c for c in EMPLOYMENT_COLS if c in df.columns],
        drop_first=True
    )

    df = pd.get_dummies(
        df,
        columns=[c for c in CAT_COLS if c in df.columns],
        drop_first=True
    )

    return df


def cast_to_int(df):
    for col in df.columns:
        if df[col].dtype == "bool":
            df[col] = df[col].astype(int)
    return df
