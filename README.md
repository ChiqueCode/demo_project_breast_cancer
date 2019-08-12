# Code for the Cure

## Website

INSERT WEBSITE HERE

## Motivation & Summary

Breast cancer is the most prevalent type of cancer across the globe, and the United States specifically has the highest rate of cancer diagnosis. Currently, the only way to diagnose breast cancer is to have the tissue inspected by a pathologist; however, many medical centers do not have in-house pathologist, requiring these tissue samples to be sent to an outside facility, sometimes located a great distance. This can cause a significant delay in the start of treatment. Any delay in treatment can have a detrimental affect on prognosis. 

The purpose of the app is: to assign patients to either benign or malignant group in order to: 
* Avoid delays in treatment
* Reduce anxiety while waiting for the test results from pathologist
* Save patient’s money for pathologist test

NOTE: Both of the datasets that we used were extremely small. (Wisconsin:  We have 212 malignant results and 357 benign results with 569 rows in our table overall, for the cytology dataset we had 239 malignant results and 444 benign results with 683 rows in our table overall) Now, that being said, before real-world implementation, the ML algorithms would have to be trained and tested on a much larger data sets that hospitals have in their systems, hence, we believe increasing the accuracy of the predictions.

## Group Members

* Sonya Bogoslavskaya
* Gretel Uptegrove

## Languages and Libraries Used

```
Python
    pandas
    matplotlib
    sklearn
    tensorflow
    joblib
    random
    flask

Javascript
    d3
    leaflet
    
HTML
    foundation
    fontawesom
CSS
```

## Sources

* Breast Cancer Wisconsin (Diagnostic) Data Set [UCI Machine Learning Repository](https://archive.ics.uci.edu/ml/datasets/Breast+Cancer+Wisconsin+(Diagnostic))
* Breast Cancer Cytology Data Set [UCI Machine Learning Repository]
(https://archive.ics.uci.edu/ml/datasets/Breast%2BCancer%2BWisconsin%2B(Original))

  * Both Data sets with features computed from a digitized image of a fine needle aspirate (FNA) of a breast mass. They describe characteristics of the cell nuclei present in the image.
  
  #TODO: Add other sources for D3 and Leaflet 

## Workflow

### Step 1: Data Extraction

* Downloaded data as csv files and inspect it in Jupyter notebook.
* Diagnostic Breast Cancer Data Set was loaded directly from the sklearn library.

### Step 2: Data Cleaning

* Cleaned the data utilizing python and pandas libraries in Jupyter notebook
* Created a sqlite database and connect the engine 
* Created multiple tables and dump the data into database
* Performed inspection within Jupyter notebook to make sure that tables reflect the data.

### Step 3: Flask Script

* Connect our Flask to SQLite database
* Used python and flask library to set up routes to render html files.


### Step 4: Machine Learning
* Used python and scikit-learn library, trained and tested multiple models on the Diagnostic Breast Cancer in a jupyter notebook as well as cytology dataset in separate notebook. We have trained and tested 6 machine learning models and algorithms performed well (all exceeded 90% test accuracy) on the classification task.

* Trained and testes the following models: 
~ Logistic regression Model;
~ Random Forest;
~ Decison Tree;
~ Deep Learnign Model;
~ Neural Network Model;
~ KNN Neighbour.

* Determined the Random Forest model produced the most accurate results and saved this model, using joblib, to be used in the app.






### Step 4: Front-End Development

* We have organized our website so that we have our story and what motivates us in a separate tab (white paper), demo and case studies locate in a separate tabs as well. We decided to give a lot of breathing space for our landing page in order not to overwhelm the user. "Breast cancer awareness" is our main goal for this project.

Our Front-End Development tools are: Foundation (for more flexibility) and jQuery (to be toggle our request form), fontawesome (for social links). To make out website so incredibly beautiful and achieve the harmony and to feel the flow of the website we used resources such as: Google Fonts, Unsplash, Coverr, Colorhunt, Color Converter (Hsl specifically) to make the background and the font color the same with different saturation that helps to keep the transition smooth. Overall, the main goal for the website to make it user friendly.


### Step 6: Flask Script

* Developed `/submit` route using joblib and sklearn that returns a diagnosis prediction based on data entered in the calculator form.
* Developed `/random` route using random library that returns a random sample from the Breast Cancer Diagnosis data set.

### Step 7: Deploy on Heroku

* Created a `requirements.txt` and a `Procfile`.
* Deployed app on Heroku.
