import { BODY, ANIMATION_TIME_6000 } from "./constants";
import { getCarById } from "./generalFunctions";

export function getRandomColor() {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i += 1) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

export function createWinnerText(id: number, time: number) {
  const car = getCarById(id);
  const div = document.createElement("div");
  div.classList.add("winner-text", "pop-up-window");
  div.textContent = `The winner is ${car.name}, time is ${time}`;
  BODY.append(div);
  setTimeout(() => {
    div.remove();
  }, ANIMATION_TIME_6000);
}

export function createButtonRace() {
  const button = document.createElement("button");
  button.classList.add("button");
  button.textContent = "Race";

  BODY.append(button);
}
