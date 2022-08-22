import "./css/style.css";
import * as renderHeader from "./js/Header";
import * as renderGarage from "./js/renderGarage";

async function mainFunc() {
  renderHeader.manageHeader();
  renderGarage.moveToGarage();
}

mainFunc();
