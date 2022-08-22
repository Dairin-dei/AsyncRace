import { BODY } from "./constants";
import * as DOM from "./DOM";
import { moveToGarage } from "./renderGarage";
import { moveToWinners } from "./renderWinners";

export function manageHeader() {
  BODY.classList.add("wrapper-vert");
  const sectionHeader = document.createElement("section");
  sectionHeader.classList.add("section", "wrapper", "section-header");
  sectionHeader.innerHTML = DOM.renderHeader();
  BODY.append(sectionHeader);

  const buttonGarage = sectionHeader.querySelector(
    ".button-garage"
  ) as HTMLButtonElement;
  const buttonWinners = sectionHeader.querySelector(
    ".button-winners"
  ) as HTMLButtonElement;

  buttonGarage.addEventListener("click", () => moveToGarage()); 
  buttonWinners.addEventListener("click", () => moveToWinners()); 
}
