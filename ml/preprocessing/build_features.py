#reffered from feature engineering and did this
import ast

from .clean_data import clean_data
from .encode_features import encode_categorical, cast_to_int


SKILLS = ['java', 'kotlin', 'android sdk', 'python', 'django', 'sql']

def map_job_category(title):
    title = str(title).lower()
    if "android" in title:
        return "android"
    elif "ios" in title:
        return "ios"
    elif "backend" in title:
        return "backend"
    elif "frontend" in title:
        return "frontend"
    elif "python" in title:
        return "python"
    elif "java" in title:
        return "java"
    elif "data" in title:
        return "data"
    elif "test" in title:
        return "testing"
    else:
        return "other"


def add_job_category(df):
    if "Job Roles" in df.columns:
        df["job_category"] = df["Job Roles"].apply(map_job_category)
        df = df.drop(columns=["Job Roles"])
    return df


def add_skill_features(df):
    df = df.copy()
    df["skills"] = df["skills"].astype(str).str.lower()

    for skill in SKILLS:
        col = f"skill_{skill.replace(' ', '_')}"
        df[col] = df["skills"].str.contains(skill).astype(int)

    df = df.drop(columns=["skills"])
    return df


def build_features(df):
    df = clean_data(df)
    df = add_job_category(df)
    df = add_skill_features(df)
    df = encode_categorical(df)
    df = cast_to_int(df)
    return df
