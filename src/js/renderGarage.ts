import * as moving from "./movingFunctions";
import * as DOM from "./DOM";
import * as api from "./api";
import {
  ANIMATION_TIME_500,
  ICar,
  CARS,
  BODY,
  CARS_MAX,
  VIEW,
  CAR_PER_PAGE,
  STATUSES,
  CURRENT_CAR,
} from "./constants";
import * as generalModule from "./generalFunctions";

export async function moveToGarage() {
  const sectionWinners = document.querySelector(
    ".section-winners"
  ) as HTMLElement;
  if (sectionWinners) {
    generalModule.saveViewWinners(sectionWinners);
    sectionWinners.remove();
  }

  await getCarsFromAPI();
  createGarageInnerStructure();
  disableStopButtons();
}

async function getCarsFromAPI() {
  await api.getCars(VIEW.garage);
}

function createGarageInnerStructure() {
  let sectionGarage = document.querySelector(".section-garage") as HTMLElement;
  if (sectionGarage) {
    sectionGarage.remove();
  }
  sectionGarage = document.createElement("section");
  sectionGarage.classList.add("section", "section-garage");
  sectionGarage.innerHTML = DOM.renderGarage();
  BODY.append(sectionGarage);

  addEventListenersToMainGarageButtons(sectionGarage);
  addCarsToTheDOM(sectionGarage);
  updatePageConstants(sectionGarage);
  addPrevNextButtons(sectionGarage);
  getViewGarage(sectionGarage);
}

function addEventListenersToMainGarageButtons(sectionGarage: HTMLElement) {
  const buttonCreate = sectionGarage.querySelector(
    ".button-create"
  ) as HTMLButtonElement;
  const buttonUpdate = sectionGarage.querySelector(
    ".button-update"
  ) as HTMLButtonElement;
  const buttonRace = sectionGarage.querySelector(
    ".button-race"
  ) as HTMLButtonElement;
  const buttonReset = sectionGarage.querySelector(
    ".button-reset"
  ) as HTMLButtonElement;
  const buttonGenerate = sectionGarage.querySelector(
    ".button-generate"
  ) as HTMLButtonElement;

  buttonCreate.addEventListener("click", () => {
    createCar();
  });

  buttonUpdate.addEventListener("click", () => {
    updateCar();
  });

  buttonRace.addEventListener("click", race);

  buttonReset.addEventListener("click", resetRace);

  buttonGenerate.addEventListener("click", generateCars);
}

async function createCar() {
  await api.createCar(false);
  const sectionGarage = document.querySelector(
    ".section-garage"
  ) as HTMLElement;

  await getCarsFromAPI();
  updatePageConstants(sectionGarage);
}

function race() {
  disableCarButtons();
  switchRaceButton();
  switchResetButton();
  api.race();
}

async function resetRace() {
  STATUSES.reset = true;
  for (const car of CARS) {
    if (car.moving) {
      await api.stopEngine(car.id);
    }
    moving.stopCar(String(car.id));
    setTimeout(() => {
      moving.returnCarToStart(String(car.id));
      enableCarButtons();
      disableStopButtons();
    }, ANIMATION_TIME_500);
  }

  STATUSES.reset = false;
  STATUSES.race = false;
  switchRaceButton();
  switchResetButton();
}

async function generateCars() {
  await generateApiCars();
  const sectionGarage = document.querySelector(
    ".section-garage"
  ) as HTMLElement;

  await getCarsFromAPI();
  createGarageInnerStructure();
  updatePageConstants(sectionGarage);
}

async function generateApiCars() {
  for (let i = 0; i < CARS_MAX; i += 1) {
    await api.createCar(true);
  }
}

async function updateCar() {
  const sectionGarage = document.querySelector(
    ".section-garage"
  ) as HTMLElement;
  const inputUpdateName = sectionGarage.querySelector(
    ".input-update-name"
  ) as HTMLInputElement;
  const inputUpdateColor = sectionGarage.querySelector(
    ".input-update-color"
  ) as HTMLInputElement;

  const domCarRoad = sectionGarage.querySelector(".selected") as HTMLElement;
  const id = domCarRoad.getAttribute("data-car-id") || "0";

  await api.updateCar(Number(id), {
    name: inputUpdateName.value,
    color: inputUpdateColor.value,
  });

  updateDomCar(id);
}

function updateDomCar(id: string): void {
  const domCarRoad = generalModule.getDomRoadById(id);
  const car = generalModule.getCarById(id);
  addCarToTheDOM(domCarRoad, car);
}

function addCarsToTheDOM(sectionGarage: HTMLElement) {
  CARS.forEach((car) => {
    addRoadToTheDOM(sectionGarage, car);
  });
  disableStopButtons();
}

function addRoadToTheDOM(sectionGarage: HTMLElement, car: ICar) {
  const pageCars = sectionGarage.querySelector(".page-cars") as HTMLElement;
  const domCarRoad = document.createElement("div");
  domCarRoad.classList.add("section-car");
  domCarRoad.setAttribute("data-car-id", String(car.id));
  domCarRoad.innerHTML = DOM.renderCarRoad(car);
  pageCars.append(domCarRoad);
  addCarToTheDOM(domCarRoad, car);
  addEventsListenersToDomRoad(sectionGarage, domCarRoad);
}

function addCarToTheDOM(domCarRoad: HTMLElement, car: ICar) {
  let domCar = domCarRoad.querySelector(".car") as HTMLElement;
  let transform = "";
  if (domCar) {
    const carStyle = getComputedStyle(domCar);
    transform = carStyle.transform;
    domCar.remove();
  }
  const domCarName = domCarRoad.querySelector(".car-name") as HTMLElement;
  domCarName.textContent = car.name;
  const carWrapper = document.createElement("div");
  carWrapper.classList.add("wrapper", "car-wrapper");
  carWrapper.innerHTML = DOM.renderCar(car);
  const domWrapperStart = domCarRoad.querySelector(
    ".wrapper-start"
  ) as HTMLElement;
  domWrapperStart.before(carWrapper);
  domCar = domCarRoad.querySelector(".car") as HTMLElement;
  if (transform) {
    domCar.style.transform = transform;
  }
  domCarRoad.classList.remove("selected");
}

function addEventsListenersToDomRoad(
  sectionGarage: HTMLElement,
  domSectionCar: HTMLElement
) {
  const inputUpdateName = sectionGarage.querySelector(
    ".input-update-name"
  ) as HTMLInputElement;
  const inputUpdateColor = sectionGarage.querySelector(
    ".input-update-color"
  ) as HTMLInputElement;
  const carId = domSectionCar.getAttribute("data-car-id") || "0";
  const buttonSelect = domSectionCar.querySelector(
    ".button-select"
  ) as HTMLButtonElement;
  const buttonRemove = domSectionCar.querySelector(
    ".button-remove"
  ) as HTMLButtonElement;
  const buttonStart = domSectionCar.querySelector(
    ".button-start"
  ) as HTMLButtonElement;
  const buttonStop = domSectionCar.querySelector(
    ".button-stop"
  ) as HTMLButtonElement;

  const car = generalModule.getCarById(carId);

  buttonSelect.addEventListener("click", () => {
    inputUpdateName.value = car.name;
    inputUpdateColor.value = car.color;
    domSectionCar.classList.add("selected");
  });

  buttonRemove.addEventListener("click", async () => {
    await api.deleteCar(car.id);
    await getCarsFromAPI();
    createGarageInnerStructure();
    updatePageConstants(sectionGarage);
    CURRENT_CAR.length = 0;
    await api.getWinner(car.id);
    if (CURRENT_CAR.length > 0) {
      api.deleteWinner(CURRENT_CAR[0].id);
    }
  });

  buttonStart.addEventListener("click", async () => {
    if (!car.moving) {
      switchCarButtons(car.id);
      api.startEngine(car.id);
    }
  });

  buttonStop.addEventListener("click", async () => {
    if (car.moving) {
      await api.stopEngine(car.id);
      moving.stopCar(carId);
      switchCarButtons(car.id);
    }
    setTimeout(() => {
      moving.returnCarToStart(carId);
    }, ANIMATION_TIME_500);
  });
}

function updatePageConstants(sectionGarage: HTMLElement) {
  const currentGaragePages = Math.ceil(VIEW.cars_amount / CAR_PER_PAGE);
  if (VIEW.garagePages !== currentGaragePages) {
    VIEW.garagePages = currentGaragePages;
  }
  const domSectionName = sectionGarage.querySelector(
    ".section-name"
  ) as HTMLElement;
  domSectionName.textContent = `Garage (${VIEW.cars_amount})`;
  const domPage = sectionGarage.querySelector(".page") as HTMLElement;
  domPage.textContent = `Page #${VIEW.garage}`;
}

function addPrevNextButtons(sectionGarage: HTMLElement) {
  const wrapper = document.createElement("div");
  wrapper.classList.add("wrapper");
  wrapper.innerHTML = DOM.renderPrevNextButtons();
  const buttonPrev = wrapper.querySelector(".button-prev") as HTMLElement;
  const garageWrapper = sectionGarage.querySelector(
    ".garage-wrapper"
  ) as HTMLElement;
  garageWrapper.append(wrapper);

  buttonPrev.addEventListener("click", async () => {
    VIEW.garage = VIEW.garage === 1 ? 1 : VIEW.garage - 1;
    updatePageConstants(sectionGarage);
    await getCarsFromAPI();
    createGarageInnerStructure();
  });

  const buttonNext = wrapper.querySelector(".button-next") as HTMLElement;

  buttonNext.addEventListener("click", async () => {
    VIEW.garage =
      VIEW.garage === VIEW.garagePages ? VIEW.garagePages : VIEW.garage + 1;
    updatePageConstants(sectionGarage);
    await getCarsFromAPI();
    createGarageInnerStructure();
  });
}

export function getViewGarage(sectionGarage: HTMLElement) {
  (
    sectionGarage.querySelector(".input-create-name") as HTMLInputElement
  ).value = VIEW.input_create_text;
  (
    sectionGarage.querySelector(".input-create-color") as HTMLInputElement
  ).value = VIEW.input_create_color;
  (
    sectionGarage.querySelector(".input-update-name") as HTMLInputElement
  ).value = VIEW.input_update_text;
  (
    sectionGarage.querySelector(".input-update-color") as HTMLInputElement
  ).value = VIEW.input_update_color;
}

function disableStopButtons() {
  const stopButtons = document.querySelectorAll(".stop-button");
  stopButtons.forEach((button) => {
    (button as HTMLButtonElement).disabled = true;
  });
}

function disableCarButtons() {
  const carButtons = document.querySelectorAll(".car-button");
  carButtons.forEach((button) => {
    (button as HTMLButtonElement).disabled = true;
  });
}

function enableCarButtons() {
  const carButtons = document.querySelectorAll(".car-button");
  carButtons.forEach((button) => {
    (button as HTMLButtonElement).disabled = false;
  });
}

function switchRaceButton() {
  const raceButton = document.querySelector(
    ".button-race"
  ) as HTMLButtonElement;
  raceButton.disabled = !raceButton.disabled;
}
function switchResetButton() {
  const resetButton = document.querySelector(
    ".button-reset"
  ) as HTMLButtonElement;
  resetButton.disabled = !resetButton.disabled;
}

export function switchCarButtons(id: number) {
  const domRoad = document.querySelector(
    `[data-car-id="${String(id)}"]`
  ) as HTMLElement;

  const startButton = domRoad.querySelector(
    ".start-button"
  ) as HTMLButtonElement;
  const stopButton = domRoad.querySelector(".stop-button") as HTMLButtonElement;

  startButton.disabled = !startButton.disabled;
  stopButton.disabled = !stopButton.disabled;
}
