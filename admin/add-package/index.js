let package_form = document.getElementById("package-form");
let package_submit = document.getElementById("package-submit");

package_submit.addEventListener("click", function (e) {
    let title = document.getElementById("package-title").value;
    let description = document.getElementById("package-description").value;
    let destination = document.getElementById("package-destination").value;
    let duration = document.getElementById("package-duration").value;
    let price = document.getElementById("package-price").value;
    let currency = document.getElementById("package-currency").value;
    let accomodation = document.getElementById("package-accomodation").value;
    let transportation = document.getElementById("package-transportation").value;
    let meals = document.getElementById("package-meal").value;
    let package_activities = document.querySelectorAll("package-activities-checkbox");

    let image = document.getElementById("package-image").value;
});