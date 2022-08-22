import {
  garage,
  engine,
  winners,
  ICarBase,
  ICar,
  CARS,
  IWinner,
  CAR_PER_PAGE,
  WINNERS,
  WINNERS_PER_PAGE,
  VIEW,
  STATUSES,
  CURRENT_CAR,
} from "./constants";

import { createWinnerText } from "./ui";
import * as generalModule from "./generalFunctions";
import * as moving from "./movingFunctions";

let weHaveWinner: boolean;

export async function getCar(id: number): Promise<void> {
  const response = await fetch(`${garage}/${id}`);
  const data = await response.json();
  return data;
}

export async function getCars(page = 0, limit = CAR_PER_PAGE): Promise<void> {
  const param = `${garage}${getParametersForCars(page, limit)}`;
  const response = await fetch(param);
  const data = await response.json();
  CARS.length = 0;
  try {
    VIEW.cars_amount = Number(response.headers.get("X-Total-Count"));
  } catch {
    VIEW.cars_amount = 0;
  }

  data.forEach((element: ICar) => {
    if (!CARS.includes(element)) {
      CARS.push(element);
    }
  });
}

function getParametersForCars(page: number, limit: number): string {
  if (page < 0 && limit < 0) return "";
  let isParameterExist = false;
  let param = `?`;
  if (page >= 0) {
    param += `_page=${page}`;
    isParameterExist = true;
  }
  if (limit >= 0) {
    param += (isParameterExist ? `&` : ``) + `_limit=${limit}`;
  }

  return param;
}

export async function createCar(random: boolean): Promise<void> {
  const newCarBase: ICarBase = random
    ? generalModule.pickNewRandomCar()
    : generalModule.pickNewCar();

  const response = await fetch(`${garage}`, {
    method: "POST",
    body: JSON.stringify(newCarBase),
    headers: { "Content-Type": "application/json" },
  });
  const data = await response.json();

  const newCar: ICar = {
    id: data.id,
    name: data.name,
    color: data.color,
    moving: false,
    start: 0,
    requestID: 0,
  };

  CARS.push(newCar);
}

export async function deleteCar(id: number): Promise<void> {
  const response = await fetch(`${garage}/${id}`, { method: "DELETE" });
  const data = await response.json();
  if (data === null) {
    console.log("error in getting data");
  }
}

export async function updateCar(id: number, carBase: ICarBase): Promise<void> {
  const response = await fetch(`${garage}/${id}`, {
    method: "PUT",
    body: JSON.stringify(carBase),
    headers: { "Content-Type": "application/json" },
  });
  const data = await response.json();
  if (data === null) {
    console.log("error in getting data");
  }
  const car = generalModule.getCarById(id);
  car.name = carBase.name;
  car.color = carBase.color;
}

async function drive(id: number, time: number) {
  const car = generalModule.getCarById(id);
  const response = fetch(`${engine}?id=${id}&status=drive`, {
    method: "PATCH",
  })
    .then(async (res) => {
      if (car.moving) {
        const data = await res.json();
        if (data === null) {
          console.log("error in getting data");
        }
        await stopEngine(id);
        moving.stopCar(String(id));
        if (STATUSES.race && !STATUSES.reset) {
          if (!weHaveWinner) {
            weHaveWinner = true;
            createWinnerText(id, time);
            createOrUpdateWinner(id, time);
          }
          STATUSES.race = false;
        }
      } else {
        if (STATUSES.race && !STATUSES.reset) {
          STATUSES.race = false;
        }
      }
    })
    .catch(async (res) => {
      if (res.status === "500") {
        if (car.moving) {
          await stopEngine(id);
          moving.stopCar(String(id));
        }
      }
    })
    .finally(async () => {
      if (car.moving) {
        await stopEngine(id);
        moving.stopCar(String(id));
      }
    });
  if (response === null) {
    console.log("error in getting data");
  }
}

export async function startEngine(id: number) {
  const response = await fetch(`${engine}?id=${id}&status=started`, {
    method: "PATCH",
  })
    .then(async (res) => {
      const data = await res.json();
      const time = Number((data.distance / data.velocity / 1000).toFixed(2));
      const car = generalModule.getCarById(id);
      car.moving = true;
      moving.moveCarForward(String(id), time);
      await drive(id, time);
    })
    .catch((err) => {
      throw err;
    });
  if (response === null) {
    console.log("error in getting data");
  }
}

export async function stopEngine(id: number) {
  const car = generalModule.getCarById(id);
  const response = await fetch(`${engine}?id=${id}&status=stopped`, {
    method: "PATCH",
  });
  car.moving = false;
  const data = await response.json();
  if (data === null) {
    console.log("error in getting data");
  }
}

export async function race() {
  weHaveWinner = false;
  STATUSES.race = true;
  for (const car of CARS) {
    startEngine(car.id);
  }
}

async function createWinner(winCar: IWinner) {
  const response = await fetch(`${winners}`, {
    method: "POST",
    body: JSON.stringify(winCar),
    headers: { "Content-Type": "application/json" },
  });
  const data = await response.json();
  if (data === null) {
    console.log("error in getting data");
  }
}

export async function getWinners(
  page = -1,
  limit = WINNERS_PER_PAGE,
  sort = "wins",
  order = "DESC"
) {
  const response = await fetch(
    `${winners}${getParametersForWinners(page, limit, sort, order)}`
  );
  const data = await response.json();
  WINNERS.length = 0;

  try {
    VIEW.winners_amount = Number(response.headers.get("X-Total-Count"));
  } catch {
    VIEW.winners_amount = 0;
  }

  for (const element of data) {
    const response1 = await getCar(element.id).then((res) => {
      const car = res as unknown as ICar;
      const winner = {
        name: car.name,
        color: car.color,
        id: element.id,
        time: element.time,
        wins: element.wins,
      };
      if (!WINNERS.includes(winner)) {
        WINNERS.push(winner);
      }
    });
    if (response1 === null) {
      console.log("error in getting data");
    }
  }
}

function getParametersForWinners(
  page: number,
  limit: number,
  sort: string,
  order: string
): string {
  let isParameterExist = false;
  let param = "?";
  if (page >= 0) {
    param += `_page=${page}`;
    isParameterExist = true;
  }
  if (limit >= 0) {
    param += isParameterExist ? "&" : "" + `_page=${limit}`;
    isParameterExist = true;
  }
  param += (isParameterExist ? "&" : "") + `_sort=${sort}&_order=${order}`;

  return param;
}

export async function deleteWinner(id: number) {
  const response = await fetch(`${winners}/${id}`, { method: "DELETE" })
    .then(async (res) => {
      if (res.status === 200) {
        const data = await res.json();
        if (data === null) {
          console.log("error in getting data");
        }
      }
    })
    .catch((res) => {
      alert(res);
    });
  if (response === null) {
    console.log("error in getting data");
  }
}

async function updateWinner(winCar: IWinner) {
  const response = await fetch(`${winners}/${winCar.id}`, {
    method: "PUT",
    body: JSON.stringify(winCar),
    headers: { "Content-Type": "application/json" },
  });
  const data = await response.json();
  if (data === null) {
    console.log("error in getting data");
  }
}

export async function getWinner(id: number): Promise<void> {
  const params = `${winners}/${id}`;
  const response = await fetch(params)
    .then(async (res) => {
      if (res.status === 200) {
        CURRENT_CAR.push(await res.json());
      }
    })
    .catch((err) => {
      throw err;
    });
  if (response === null) {
    console.log("error in getting data");
  }
}

export async function createOrUpdateWinner(id: number, time: number) {
  CURRENT_CAR.length = 0;
  await getWinner(id);

  if (CURRENT_CAR.length === 0) {
    createWinner({ id: id, wins: 1, time: time });
  } else {
    updateWinner({
      id: id,
      wins: CURRENT_CAR[0].wins + 1,
      time: CURRENT_CAR[0].time > time ? time : CURRENT_CAR[0].time,
    });
  }
  getWinners();
}
