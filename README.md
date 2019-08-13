# Code for the Cure

## Website

https://codeforthecure.herokuapp.com/

## Motivation & Summary

Breast cancer is the most prevalent type of cancer across the globe, and the United States specifically has the highest rate of cancer diagnosis. Currently, the only way to diagnose breast cancer is to have the cell tissue inspected by a pathologist; however, many medical centers do not have in-house pathologist, requiring these tissue samples to be sent to an outside facility, sometimes located a great distance. This can cause a significant delay in the start of treatment. Any delay in treatment can have a detrimental affect on prognosis. 

The purpose of the app is: to help hospitals to assign patients to either benign or malignant group in order to: 
* Prevent delays in treatment
* Reduce anxiety while waiting for the test results from pathologist
* Save patient’s money for pathologist test.

NOTE: Both of the datasets that we used were extremely small. (Wisconsin:  We have 212 malignant results and 357 benign results with 569 rows in our table overall, for the cytology dataset we had 239 malignant results and 444 benign results with 683 rows in our table overall) That being said, before real-world implementation, machine learning algorithms would have to be trained and tested on a much larger data sets that hospitals have in their systems, hence, we believe increasing the accuracy of the predictions.

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
    jQuery
    
HTML
    foundation
    fontawesom
    
CSS
```

## Sources

* Breast Cancer Wisconsin (Diagnostic) Data Set 
(https://archive.ics.uci.edu/ml/datasets/Breast+Cancer+Wisconsin+(Diagnostic))
* Breast Cancer Cytology Data Set 
(https://archive.ics.uci.edu/ml/datasets/Breast%2BCancer%2BWisconsin%2B(Original))
* Cancer Data Sets
(https://ourworldindata.org/cancer)

## Workflow

### Step 1: Data Extraction

* Downloaded data as csv files and inspected it in Jupyter notebook
* Diagnostic Breast Cancer Data Set was loaded directly from the sklearn library.

### Step 2: Data Cleaning

* Cleaned the data utilizing python and pandas libraries in Jupyter notebook
* Created a sqlite database and connected the engine 
* Created multiple tables and dumped the data into database
* Performed inspection within Jupyter notebook to make sure that tables reflect the data.

### Step 3: Flask Script

* Connected our Flask to SQLite database
* Used python and flask library to set up routes to render html files.

### Step 4: Machine Learning

* Used python and sklearn library, trained and tested multiple models on the Diagnostic Breast Cancer in a Jupyter notebook as well as cytology dataset in separate notebook. We have trained and tested 6 machine learning models and algorithms performed well (all exceeded 90% test accuracy) on the classification task
* Trained and testes the following models: Logistic Regression, Random Forest, Decison Tree, Deep Learning, Neural Network and KNN Neighbour Models
* Determined the Random Forest model produced the most accurate results and saved this model, using joblib, to be used in the app
* Developed `/submit` route using joblib and sklearn that returns a diagnosis prediction based on data entered in the calculator form for both datasets
* Combined two datasets, using D3 so the features populates at once giving a patientID
* After selceting a PatientID user is getting a diagnosis instantly. 

### Step 5: Front-End Development

* We are introduced to the website with a silhouette of a healthy woman, following with who we are, what service we provide and an immediate call to action for prospective doctors to get in touch with us. 
 
For our web app, we have included tabs for each of the following:
Our story: Why we, data scientists, decided to use ML to solve the largest cancer epidemic of our time. We use visuals for US cancer incidence and mortality in order to get an idea which area of USA we should focus on the most. We used Leaflet for this purpose and D3 to show the trend of breast cancer spread for the course of 26 yeras (1990 - 2016)
Demo: Our machine learning app to address this problem.
Our main front-end development tools are:
Foundation (to be different from the Bootstrap framework)
jQuery (for a mock consultation form)
fontawesome (for social links)
To make our website aesthetically appealing, achieve visual harmony, and to maximize UX, we used resources such as Google Fonts, Unsplash, Coverr, Colorhunt, and Color Converter (for HSLA specifically) to make the background and the font color the same with different saturation, lightness and opacity which helps to keep with a soft monochromatic feel.
Overall, the main goal for the website is to make prospective doctors find our service as a valuable asset to their business through our ML service.

### Step 6: Deploy on Heroku

* Created a `requirements.txt` and a `Procfile`.
* Deployed app on Heroku.
