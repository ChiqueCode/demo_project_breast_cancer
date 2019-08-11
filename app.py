# Import dependencies
import csv
import os
import pandas as pd
import random
import numpy as np
from flask import (
    Flask,
    render_template,
    request,
    jsonify)
from joblib import load
from sklearn.datasets import load_breast_cancer

# Sqlite 
import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine
from flask import Flask, jsonify, render_template, request
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.sql import func

#Set up Flask
app = Flask(__name__)

# Database Setup
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///breast_cancer.sqlite"
db = SQLAlchemy(app)

# Reflect an existing database and tables
Base = automap_base()
Base.prepare(db.engine, reflect=True)

# Rename tables for reference
States_percentage = Base.classes.states_percentage_table
Trend = Base.classes.cancer_trend_table
Model = Base.classes.model_table

# Deaths/incidents percentage by state route
@app.route("/percentage")
def percentage_func():
    # stmt = datasets.session.query(usa_table).statement
    # df = pd.read_sql_query(stmt, datasets.session.bind)
    # return jsonify(list(df))

 #TODO: Change "sel" to select all
 
    sel = [
        States_percentage.state,
        States_percentage.abr,
        States_percentage.lat,
        States_percentage.lng,
        States_percentage.incidence,
        States_percentage.population,
        States_percentage.percentage_incident,
        States_percentage.death_count,
        States_percentage.percentage_deaths
    ]

    # Query the records
    percentage_results = db.session.query(*sel).all()

    # Creating Pandas DataFrame
    percentage_df = pd.DataFrame(percentage_results, columns=["state", "abr", "lat", "lng", "incidence", "population", "percentage_incidence", "death_count", "percentage_deaths"])

    # Return results in JSON format
    return jsonify(percentage_df.to_dict(orient="records"))

@app.route("/trend")
def trend_func():
 
    sel = [
        Trend.year,
        Trend.incidents,
        Trend.deaths,
    ]

    # Query the records
    trend_results = db.session.query(*sel).all()
    # percentage_results = db.session.query.all()

    # Creating Pandas DataFrame
    trend_df = pd.DataFrame(trend_results, columns=["year", "incidents", "deaths"])

    # Return results in JSON format
    return jsonify(trend_df.to_dict(orient="records"))

# Home route
@app.route("/")
def index():
    return render_template("index.html")


# Map route
@app.route("/map")
def map_func():
    return render_template("map.html")
    app.add_url_rule('/', 'map_func', map_func)


# Vizualisations route
@app.route("/story")
def story():
    return render_template("story.html")


# Case studies route
@app.route("/cases")
def cases():
    return render_template("cases.html")


# Demo/calculator route
@app.route("/calculator")
def calc():
    return render_template("calculator.html")


# Call to action/request assesment route 
@app.route("/cta")
def cta():
    return render_template("cta.html")
   
# Route for wisconsin features
@app.route("/features/<patientID>")
def features(patientID):
    """Returns list of features for given patient ID"""

    # Create list of feature names
    feature_names = ["Radius (worst)", "Texture (worst)", "Perimeter (worst)",\
        "Area (worst)", "Smoothness (worst)", "Compactness (worst)", \
        "Concavity (worst)", "Concave points (worst)", "Symmetry (worst)", \
        "Fractal dimension (worst)"]
    
    row = int(patientID) - 19000
   
    # Load dataset from sklearn and set X to feature array
    X = load_breast_cancer().data
    feature_values = X[row]

    print(X)

    # Select only features to be displayed
    feature_values = feature_values[20:]

    # Create dictionary of keys feature names and values
    features_dict = dict(zip(feature_names, feature_values))

    return jsonify(features_dict)


@app.route("/analyze/<patientID>")
def analyze(patientID):
    """Submit data to calculator"""

    # Translate patient ID to row
    row = (int(patientID) - 19000)

    # Load features, model, and scaler 
    X = load_breast_cancer().data
    model = load("rf_model.joblib")
    scaler = load("scaler.out")

    # Get features for selected row and scale
    row = np.array([row])
    feature_values = X[row]
    feature_values = scaler.transform(feature_values)

    # Predict diagnosis
    prediction = model.predict(feature_values)
    if prediction == 0:
        diagnosis = "Benign"
    else:
        diagnosis = "Malignant"

    return jsonify(diagnosis)
    # return render_template("calculator.html",diagnosis=diagnosis)

# Route for cytology features
@app.route("/model/<patientID>")
def model(patientID):
    """Returns list of features for given patient ID"""

    # Converting data into Pandas DF in order to assign X and label

    sel = [
        Model.thickness,
        Model.size,
        Model.shape,
        Model.adhesion,
        Model.single,
        Model.nuclei,
        Model.chromatin,
        Model.nucleoli,
        Model.mitosis,
        Model.diagnosis
    ]

    # Query the records
    model_results = db.session.query(*sel).all()

    # Creating Pandas DataFrame
    model_df = pd.DataFrame(model_results, columns=["thickness", "size", "shape", "adhesion", "single", "nuclei", "chromatin", "nucleoli", "mitosis", "diagnosis"])

    # Create list of feature names
    feature_names_model = ["Thickness", "Size", "Shape",\
        "Adhesion", "Single", "Nuclei", \
        "Chromatin", "Nucleoli", "Mitosis"]
    
    row_model = int(patientID) - 19000

    # Assign features and labels
    X = model_df.drop(columns=["diagnosis"])
    y = model_df["diagnosis"]

    # convert X to list of lists 
    features_list = X.values.tolist()
    
    feature_values_model = features_list[row_model]

    # Create dictionary of keys feature names and values
    features_dict_model = dict(zip(feature_names_model, feature_values_model))

    return jsonify(features_dict_model)    

if __name__ == "__main__":
    # TODO: Remeber to turn debugging off when going live! 
    app.run(debug=True, port=8000, host="localhost", threaded=True)
