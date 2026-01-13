#refferes feature engineering and wrapped all those in codes
def clean_data(df):
    df = df.copy()

   
    drop_cols = ["Company Name", "Job Title"]
    df = df.drop(columns=[c for c in drop_cols if c in df.columns])

   
    if "skills" in df.columns:
        df["skills"] = df["skills"].fillna("[]")

    return df
