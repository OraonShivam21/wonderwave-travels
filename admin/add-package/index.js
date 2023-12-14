let packagesURL = "https://wonderwave-api.onrender.com/packages";
let package_form = document.getElementById("package-form");
let package_submit = document.getElementById("package-submit");

package_submit.addEventListener("click", function (e) {
    e.preventDefault();
    let title = document.getElementById("package-title").value;
    let description = document.getElementById("package-description").value;
    let destination = document.getElementById("package-destination").value;
    let duration = document.getElementById("package-duration").value;
    let price = document.getElementById("package-price").value;
    let currency = document.getElementById("package-currency").value;
    let accomodation = document.getElementById("package-accomodation").value;
    let transportation = document.getElementById("package-transportation").value;
    let meals = document.getElementById("package-meal").value;
    let activities = [];
    let package_activities = document.getElementsByClassName("package-activities-checkbox");
    for(let index = 0; package_activities[index]; index++) {
        if(package_activities[index].checked)
            activities.push(package_activities[index].value);
    }

    let image = document.getElementById("package-image").value;

    let newPackageObj = {
        title, description, destination, duration, price, currency, accomodation, transportation, meals, activities, image
    };

    // console.log(newPackageObj);

    fetch(packagesURL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(newPackageObj),
    })
        .then((res) => res.json())
        .then((data) => {
            window.location.replace("../admin-packages/index.html");
        });
});