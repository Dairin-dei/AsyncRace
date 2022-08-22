import { BODY, VIEW, WINNERS, WINNERS_PER_PAGE } from "./constants";
import * as DOM from "./DOM";
import * as api from "./api";
import * as generalModule from "./generalFunctions";

export async function moveToWinners() {
  const domGarage = document.querySelector(".section-garage") as HTMLElement;
  if (domGarage) {
    generalModule.saveViewGarage(domGarage);
    domGarage.remove();
  }

  await getWinnersFromAPI(VIEW.sort_column, VIEW.sort_order);
  createWinnersInnerStructure();
}

function createWinnersInnerStructure() {
  let sectionWinners = document.querySelector(
    ".section-winners"
  ) as HTMLElement;
  if (sectionWinners) {
    sectionWinners.remove();
  }
  sectionWinners = document.createElement("section");
  sectionWinners.classList.add("section", "section-winners");
  sectionWinners.innerHTML = DOM.renderWinners();
  BODY.append(sectionWinners);
  addWinnersTableToTheDOM(sectionWinners);
  addEventListenersToTheTable(sectionWinners);

  updatePageConstants(sectionWinners);
  addPrevNextButtons(sectionWinners);
  setOrderSign(sectionWinners);
}

function addWinnersTableToTheDOM(sectionWinners: HTMLElement) {
  sectionWinners.innerHTML = DOM.renderWinners();
  const domTable = sectionWinners.querySelector(
    ".table-winners"
  ) as HTMLElement;
  WINNERS.forEach((winner, index) => {
    const domWinner = document.createElement("tr");
    domWinner.innerHTML = DOM.renderWinner(
      (VIEW.winners - 1) * WINNERS_PER_PAGE + index + 1,
      winner
    );
    domTable.append(domWinner);
  });
}

function updatePageConstants(sectionWinners: HTMLElement) {
  const currentWinnersPages = Math.ceil(VIEW.winners_amount / WINNERS_PER_PAGE);
  if (VIEW.winnersPages !== currentWinnersPages) {
    VIEW.winnersPages = currentWinnersPages;
  }
  const domSectionName = sectionWinners.querySelector(
    ".section-name"
  ) as HTMLElement;
  domSectionName.textContent = `Winners (${VIEW.winners_amount})`;
  const domPage = sectionWinners.querySelector(".page") as HTMLElement;
  domPage.textContent = `Page #${VIEW.winners}`;
}

function addPrevNextButtons(sectionWinners: HTMLElement) {
  const wrapper = document.createElement("div");
  wrapper.classList.add("wrapper");
  wrapper.innerHTML = DOM.renderPrevNextButtons();
  const buttonPrev = wrapper.querySelector(".button-prev") as HTMLElement;
  sectionWinners.append(wrapper);

  buttonPrev.addEventListener("click", async () => {
    VIEW.winners = VIEW.winners === 1 ? 1 : VIEW.winners - 1;
    updatePageConstants(sectionWinners);
    await getWinnersFromAPI(VIEW.sort_column, VIEW.sort_order);
    createWinnersInnerStructure();
  });

  const buttonNext = wrapper.querySelector(".button-next") as HTMLElement;

  buttonNext.addEventListener("click", async () => {
    VIEW.winners =
      VIEW.winners === VIEW.winnersPages ? VIEW.winnersPages : VIEW.winners + 1;
    updatePageConstants(sectionWinners);
    await getWinnersFromAPI(VIEW.sort_column, VIEW.sort_order);
    createWinnersInnerStructure();
  });
}

async function getWinnersFromAPI(sort = "wins", order = "DESC") {
  await api.getWinners(VIEW.winners, WINNERS_PER_PAGE, sort, order);
}

function addEventListenersToTheTable(sectionWinners: HTMLElement) {
  const tableHead = sectionWinners.querySelector(
    ".table-winners"
  ) as HTMLElement;
  tableHead.addEventListener("click", (event: MouseEvent) =>
    changeSortOrder(event, sectionWinners)
  );
}

async function changeSortOrder(event: MouseEvent, sectionWinners: HTMLElement) {
  const node = event.target as HTMLElement;
  changeOrderSign(node);
  setOrderSign(sectionWinners);
  generalModule.saveViewWinners(sectionWinners);
  await getWinnersFromAPI(VIEW.sort_column, VIEW.sort_order);
  createWinnersInnerStructure();
}

function changeOrderSign(node: HTMLElement) {
  if (node && node.classList.contains("th")) {
    if (node.dataset.sortName === "wins" || node.dataset.sortName === "time") {
      if (VIEW.sort_column === node.dataset.sortName) {
        VIEW.sort_order = VIEW.sort_order === "ASC" ? "DESC" : "ASC";
      } else {
        VIEW.sort_column = VIEW.sort_column === "wins" ? "time" : "wins";
        VIEW.sort_order = "ASC";
      }
    }
  }
}

export function setOrderSign(sectionWinners: HTMLElement) {
  const tableWinners = sectionWinners.querySelector(
    ".table-winners"
  ) as HTMLElement;
  const thWins = tableWinners.querySelector(
    `[data-sort-name="wins"]`
  ) as HTMLElement;
  const thTime = tableWinners.querySelector(
    `[data-sort-name="time"]`
  ) as HTMLElement;

  if (VIEW.sort_column === "wins") {
    thWins.className = `th ${VIEW.sort_order}`;
    thTime.className = "th";
  } else {
    thTime.className = `th ${VIEW.sort_order}`;
    thWins.className = "th";
  }
}
