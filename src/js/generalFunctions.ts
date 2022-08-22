import {
  ICarBase,
  ICar,
  CARS,
  CAR_BRANDS_LENGTH,
  CAR_BRANDS,
  CAR_MODELS_LENGTH,
  CAR_MODELS,
  BODY,
  VIEW,
} from "./constants";

import { getRandomColor } from "./ui";

export function pickNewCar(): ICarBase {
  const sectionGarage = document.querySelector(
    ".section-garage"
  ) as HTMLElement;
  const inputCreateName = sectionGarage.querySelector(
    ".input-create-name"
  ) as HTMLInputElement;
  const inputCreateColor = sectionGarage.querySelector(
    ".input-create-color"
  ) as HTMLInputElement;

  return {
    name: inputCreateName.value,
    color: inputCreateColor.value,
  };
}

export function pickNewRandomCar(): ICarBase {
  const name = `${CAR_BRANDS[Math.floor(Math.random() * CAR_BRANDS_LENGTH)]} ${
    CAR_MODELS[Math.floor(Math.random() * CAR_MODELS_LENGTH)]
  }`;
  return {
    name: name,
    color: getRandomColor(),
  };
}

export function getCarById(id: number | string): ICar {
  if (typeof id === "number") {
    return CARS.filter((item) => item.id === id)[0];
  } else {
    return CARS.filter((item) => item.id === Number(id))[0];
  }
}

export function getDomRoadById(id: number | string): HTMLElement {
  if (typeof id === "number") {
    return document.querySelector(
      `[data-car-id="${String(id)}"]`
    ) as HTMLElement;
  } else {
    return document.querySelector(`[data-car-id="${id}"]`) as HTMLElement;
  }
}

export function addTextChange() {
  const domName = document.createElement("input");
  domName.setAttribute("type", "text");
  BODY.append(domName);
}

export function addColorPicker() {
  const domColorPicker = document.createElement("input");
  domColorPicker.setAttribute("type", "color");
  domColorPicker.setAttribute("id", "picker-append");

  BODY.append(domColorPicker);
}

export function saveViewGarage(sectionGarage: HTMLElement) {
  VIEW.input_create_text = (
    sectionGarage.querySelector(".input-create-name") as HTMLInputElement
  ).value;
  VIEW.input_create_color = (
    sectionGarage.querySelector(".input-create-color") as HTMLInputElement
  ).value;
  VIEW.input_update_text = (
    sectionGarage.querySelector(".input-update-name") as HTMLInputElement
  ).value;
  VIEW.input_update_color = (
    sectionGarage.querySelector(".input-update-color") as HTMLInputElement
  ).value;
}

export function saveViewWinners(sectionWinners: HTMLElement) {
  const columnOrder = sectionWinners.querySelector(".ASC") as HTMLElement;
  if (columnOrder !== null) {
    VIEW.sort_order = "ASC";
    VIEW.sort_column = columnOrder.dataset.sortName || "";
  } else {
    const columnOrder = sectionWinners.querySelector(".DESC") as HTMLElement;
    VIEW.sort_order = "DESC";
    VIEW.sort_column = columnOrder.dataset.sortName || "";
  }
}
