function createDropdown() {
  /**
    /* Creates dropdown menu of patient ID's
    */

  // Create list of patient ID's
  var patientList = [];
  for (var i = 19000; i <= 19010; i++) {
    patientList.push(i);
  }

  // Add first dropdown item
  d3.select("#selPatient")
    .append("option")
    .text("");

  // Create dropdown menu of patientID's to populate the select options
  patientList.forEach(patientID => {
    d3.select("#selPatient")
      .append("option")
      .text(patientID)
      .property("value", patientID);
  });
}

function submitdropdownvalue(newvalue) {
  d3.select("#analyze").property("value", newvalue);
}

function selectPatient(patientID) {
  /**
    /* Populates form with features from selected patient
    /* @param {string}    patientID    ID of selected patient 
    /* patient in feature array
    */

  // Saving the table and results as variables
  var table = d3.select("#uwds");
  var tableCytology = d3.select("#cds");
  var resultDisplay = d3.select("#diagnosis");

  // Clear values for existing feature table and diagnosis
  table.html("");
  tableCytology.html("");
  resultDisplay.html("&nbsp;");

  // url for wisconsin analysis
  var featuresURL = `/features/${patientID}`;
  var analysisURL = `/analyze/${patientID}`;

  // url for cytology analysis
  var modelURL = `/model/${patientID}`;
  var predictURL = `/predict/${patientID}`;

  // Fetch dictionary of the name of the features and corresponding values for wisconsin ds
  d3.json(featuresURL).then(function(patientFeatures) {
    // For each feature, enter the feature name and the feature value into a row
    Object.entries(patientFeatures).forEach(([key, value]) => {
      var tableRow = table.append("tr");
      tableRow.append("td").text(key);
      tableRow.append("td").text(value);
    });
  });

  // Fetch dictionary of the name of the features and corresponding values for cytology ds
  d3.json(modelURL).then(function(modelFeatures) {
    // For each feature, enter the feature name and the feature value into a row
    Object.entries(modelFeatures).forEach(([key, value]) => {
      var tableRow = tableCytology.append("tr");
      tableRow.append("td").text(key);
      tableRow.append("td").text(value);
    });
  });


  // // Fetch results and display in #diagnosis
  // d3.json(analysisURL).then(function(resultsWisconsin) {
  //   resultDisplay.html(resultsWisconsin);
  // });
  
  // Save results in variables
  let diagnosisC = d3.json(predictURL).then(function(resultsCytology) {
    console.log(resultsCytology);
  });

  let diagnosisW = d3.json(analysisURL).then(function(resultsW) {
    console.log(resultsW);
  });

  // // if statement to spit out the diagnosis from both datasets 
  // if (diagnosisC === "Malignant" || diagnosisW === "Malignant") {
  //   console.log("Bummer results");
  // } else {
  //   console.log("Good");
  // };  

  async function fethcURLs() {
    try {
      var data = await Promise.all([
        fetch(predictURL).then((response) => response.json()),
        fetch(analysisURL).then((response) => response.json()),
      ])
    }

  }

  //  Attempt 2
  function predictFunc(predictURL, cb) {
    var responseCytology = d3.json(predictURL).then(function(resultsCytology) {
      return(resultsCytology);
    });
    var randomDelay = (Math.round(Math.random() * 1E4) % 8000) + 1000;
  
    console.log("Requesting: " + predictURL);
  
    setTimeout(function(){
      cb(responseCytology[predictURL]);
    },randomDelay);
  };
  predictFunc();

  Attempt 3
  async function predictFunc() {
    
    // read our cytology
    let responseCytology = await fetch(`/predict/${patientID}`);
    let awaitCytology = await responseCytology.json();

      // read our wisconsin
    let responseWisconsin = await fetch(`/analyze/${patientID}`);
    let awaitWisconsin = await responseWisconsin.json();

    await new Promise((resolve, reject) => setTimeout(resolve, 3000));

    return awaitCytology;
    
    // Unreachable
    // return awaitWisconsin;

  }  
  predictFunc()

  // Attempt 4
  async function damn() {
    let results = await Promise.all([
      fetch(`/analyze/${patientID}`),
      fetch(`/predict/${patientID}`),
    ]);
  
    console.log(results);
    };
  damn();  

  let test = fetch(`/analyze/${patientID}`);
  console.log(test);

}

// Create drop down
createDropdown();
