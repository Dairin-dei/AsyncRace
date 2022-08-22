import * as generalModule from "./generalFunctions";
import { switchCarButtons } from "./renderGarage";

export function moveCarForward(id: string, time: number) {
  const car = generalModule.getCarById(id);
  const domRoad = document.querySelector(
    `[data-car-id="${String(id)}"]`
  ) as HTMLElement;

  const domCar = domRoad.querySelector(".car") as HTMLElement;
  const domFinish = domRoad.querySelector(".finish") as HTMLElement;

  const carCoord = domCar.getBoundingClientRect();
  const finishCoord = domFinish.getBoundingClientRect();

  const startX = carCoord.x;
  car.start = startX;
  const finishX = finishCoord.x + finishCoord.width;

  const length = finishX - startX;
  const timeMs = time * 1000;

  let start: number | null = null;
  const velocity = length / time;
  let requestID: number;

  function step(currentTime: number) {
    if (!start) start = currentTime;
    const progress = currentTime - start;
    const newX = (progress / 1000) * velocity;

    domCar.style.transform = `translateX(${newX}px)`;

    if (progress < timeMs) {
      requestID = window.requestAnimationFrame(step);
      car.requestID = requestID;
    }
  }

  requestID = window.requestAnimationFrame(step);
  car.requestID = requestID;
}

export function stopCar(id: string) {
  const car = generalModule.getCarById(id);
  window.cancelAnimationFrame(car.requestID);
  car.requestID = 0;
}

export function returnCarToStart(id: string) {
  const domRoad = document.querySelector(
    `[data-car-id="${String(id)}"]`
  ) as HTMLElement;

  const domCar = domRoad.querySelector(".car") as HTMLElement;
  domCar.style.transform = `translateX(0)`;
  switchCarButtons(Number(id));
}
