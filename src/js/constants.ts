export const baseURL = "http://localhost:3000";
export const garage = `${baseURL}/garage`;
export const engine = `${baseURL}/engine`;
export const winners = `${baseURL}/winners`;

export const ANIMATION_TIME_500 = 500;
export const ANIMATION_TIME_6000 = 6000;

export const VIEW = {
  garage: 1,
  garagePages: 1,
  winners: 1,
  winnersPages: 1,
  cars_amount: 0,
  winners_amount: 0,
  input_create_text: "",
  input_create_color: "",
  input_update_text: "",
  input_update_color: "",
  sort_column: "wins",
  sort_order: "DESC",
};

export const CURRENT_CAR: Array<IWinner> = [];

export const STATUSES = {
  race: false,
  reset: false,
};

export interface ICarBase {
  name: string;
  color: string;
}

export interface ICar extends ICarBase {
  id: number;
  moving: boolean;
  start: number;
  requestID: number;
}

export interface IWinner {
  id: number;
  wins: number;
  time: number;
}

export interface IWinnerLocal extends ICarBase {
  id: number;
  wins: number;
  time: number;
}

export const CARS_MAX = 100;
export const CAR_PER_PAGE = 7;

export const CARS: Array<ICar> = [];
export const WINNERS: Array<IWinnerLocal> = [];
export const WINNERS_PER_PAGE = 10;

export const RACE_TIME_COEFFICIENT = 5;

export const CAR_BRANDS_LENGTH = 14;
export const CAR_MODELS_LENGTH = 14;
export const CAR_BRANDS = [
  "Audi",
  "BMW",
  "Chevrolet",
  "Daewoo",
  "Ford",
  "Honda",
  "Kia",
  "Mazda",
  "Mercedes",
  "Nissan",
  "Opel",
  "Subaru",
  "Toyota",
  "Volvo",
];
export const CAR_MODELS = [
  "Blade",
  "Caprice",
  "Dream",
  "Escape",
  "Frontier",
  "Integro",
  "Laplander",
  "Matiz",
  "Omega",
  "Proceed",
  "Rex",
  "Sonet",
  "Fox",
  "Turismo",
];

export const BODY = document.getElementsByTagName("body")[0] as HTMLElement;
