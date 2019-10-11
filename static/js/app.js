// Referencing to DOM objects to be changed later
var table = d3.select("#uwds tbody");
var tableCytology = d3.select("#cds tbody");
var resultDisplay = d3.select("#diagnosis");

function createDropdown() {
// Creates dropdown menu of patient ID's

  // Create list of patient ID's
  var patientList = [];
  for (var i = 19000; i <= 19010; i++) {
    patientList.push(i);
  }

  // Add first dropdown item
  d3.select("#selPatient")
    .append("option")
    .property("disabled", true)
    .text("-- Choose Patient ID --");

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
   * Populates form with features from selected patient
   * @param {string}    patientID    ID of selected patient 
   * patient in feature array
   */

  // Clear values for existing feature table and diagnosis
  table.html("");
  tableCytology.html("");
  resultDisplay.html("&nbsp;");

  // url for wisconsin analysis
  var featuresURL = `/features/${patientID}`;
  // url for cytology analysis
  var modelURL = `/model/${patientID}`;

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
  printResult(patientID);
}

// Have to use async await function to wait for both diagnosis to return the results
const fetchMLdata = async url => {
  const data = await d3.json(url);
  return data;
};

// Saving a function in a varaible 'printResult' and 'printResult' is a func from above
const printResult = async patientID => {
  // Results from promise that fethes the data by passing flask url as an argument -> saving in a var
  const data = await Promise.all([
    await fetchMLdata(`/analyze/${patientID}`),
    await fetchMLdata(`/predict/${patientID}`)
  ]);

  uwResult = data[0];
  cResult = data[1]; 

  // Saving result in a var to display it on the page
  var final = "";

  // if statement to return the diagnosis
  if (uwResult === "Malignant" || cResult === "Malignant") {
    final = "Malignant";
  } else {
    final = "Benign";
  }

  resultDisplay.html(final);
};

// Create drop down
createDropdown();
