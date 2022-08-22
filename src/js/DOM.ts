import { ICar, IWinnerLocal } from "./constants";

export const renderHeader = () => `    
    <button class="button button-large button-garage">To garage</button>
    <button class="button button-large button-winners">To winners</button>
    <h1>Async-race</h1>
`;

export const renderGarage = () => `
      <div class="wrapper-vert garage-wrapper">
        <div class="garage-header wrapper-vert">
          <div class="wrapper">
            <input type="text" class="input-text input-create-name" />
            <input type="color" class="input-color input-create-color" />
            <button class="button button-large button-create">
              Create car
            </button>
          </div>
          <div class="wrapper">
            <input type="text" class="input-text input-update-name" />
            <input type="color" class="input-color input-update-color" />
            <button class="button button-large button-update">
              Update car
            </button>
          </div>
          <div class="wrapper">
            <button class="button button-large button-race">Race</button>
            <button class="button button-large button-reset stop-button">Reset</button>
            <button class="button button-large button-generate">
              Generate cars
            </button>
          </div>
        </div>
        <h2 class="section-name">Garage</h2>
        <h3 class="page">Page</h3>
        <div class="wrapper-vert page-cars">
        </div>
      </div>
`;

export const renderCarRoad = (car: ICar) => `
        <div class="wrapper-vert">
          <div class="wrapper wrapper-start">
            <button class="button button-small button-select car-button">Select</button>
            <button class="button button-small button-remove car-button">Remove</button>
            <button class="button button-small button-start start-button car-button">Start</button>
            <button class="button button-large button-stop stop-button car-button">Stop/Return</button>
            <h4 class="car-name">${car.name}</h4>
          </div>
          <div class="division"></div>
        </div>
      </div>
`;

export const renderCar = (car: ICar) => `
            <svg
              class="car"
              width="80"
              height="40"
              viewBox="0 0 82 42"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                class="car-svg"
                fill=${car.color}
                stroke="#dae8ec"
                d="m15.532,35.706c-3.977,0 -7.213,-3.242 -7.213,-7.197c0,-3.998 3.236,-7.224 7.213,-7.224c3.987,0 7.226,3.226 7.226,7.224c0,3.954 -3.239,7.197 -7.226,7.197zm0,-11.102c-2.128,0 -3.876,1.75 -3.876,3.883c0,2.129 1.748,3.879 3.876,3.879c2.141,0 3.886,-1.75 3.886,-3.879c0,-2.133 -1.745,-3.883 -3.886,-3.883zm48.605,11.102c-3.987,0 -7.219,-3.242 -7.219,-7.197c0,-3.998 3.231,-7.224 7.219,-7.224c3.977,0 7.208,3.226 7.208,7.224c0,3.954 -3.232,7.197 -7.208,7.197zm0,-11.102c-2.144,0 -3.895,1.75 -3.895,3.883c0,2.129 1.751,3.879 3.895,3.879c2.139,0 3.884,-1.75 3.884,-3.879c0,-2.133 -1.746,-3.883 -3.884,-3.883zm14.001,-1.513c0,-7.011 -4.365,-7.842 -4.365,-7.842c-6.426,-0.912 -17.496,-1.38 -17.496,-1.38c-1.016,-1.766 -5.707,-12.039 -8.44,-12.039c-0.911,0 -20.508,0 -23.975,0c-3.472,0 -9.167,10.024 -10.413,12.285c0,0 -4.36,0.758 -6.416,1.219c-1.142,0.265 -4.301,0.324 -4.301,9.155l-2.732,0l0,3.997l6.654,0c0,-4.908 3.982,-8.885 8.878,-8.885c4.914,0 8.886,3.977 8.886,8.885l30.827,0c0,-4.908 3.967,-8.885 8.892,-8.885c4.898,0 8.875,3.977 8.875,8.885l6.524,0l0,-5.396l-1.398,0l0,0.001zm-42.549,-9.9l-13.838,0c1.872,-5.831 5.339,-9.994 6.801,-9.994c1.841,0 7.037,0 7.037,0l0,9.994zm2.579,0l0,-9.994c0,0 7.141,0 8.974,0c1.854,0 5.893,8.461 7.032,10.625l-16.006,-0.631z"
              />
            </svg>
            <img
            src="./images/finish.svg"
            alt="finish"
            class="finish"
            width="30"
            height="60"
          />
`;

export const renderCarSmall = (color: string) => `
            <svg
              class="car-small"
              width="80"
              height="40"
              viewBox="0 0 82 42"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                class="car-svg"
                fill=${color}
                stroke="#dae8ec"
                d="m15.532,35.706c-3.977,0 -7.213,-3.242 -7.213,-7.197c0,-3.998 3.236,-7.224 7.213,-7.224c3.987,0 7.226,3.226 7.226,7.224c0,3.954 -3.239,7.197 -7.226,7.197zm0,-11.102c-2.128,0 -3.876,1.75 -3.876,3.883c0,2.129 1.748,3.879 3.876,3.879c2.141,0 3.886,-1.75 3.886,-3.879c0,-2.133 -1.745,-3.883 -3.886,-3.883zm48.605,11.102c-3.987,0 -7.219,-3.242 -7.219,-7.197c0,-3.998 3.231,-7.224 7.219,-7.224c3.977,0 7.208,3.226 7.208,7.224c0,3.954 -3.232,7.197 -7.208,7.197zm0,-11.102c-2.144,0 -3.895,1.75 -3.895,3.883c0,2.129 1.751,3.879 3.895,3.879c2.139,0 3.884,-1.75 3.884,-3.879c0,-2.133 -1.746,-3.883 -3.884,-3.883zm14.001,-1.513c0,-7.011 -4.365,-7.842 -4.365,-7.842c-6.426,-0.912 -17.496,-1.38 -17.496,-1.38c-1.016,-1.766 -5.707,-12.039 -8.44,-12.039c-0.911,0 -20.508,0 -23.975,0c-3.472,0 -9.167,10.024 -10.413,12.285c0,0 -4.36,0.758 -6.416,1.219c-1.142,0.265 -4.301,0.324 -4.301,9.155l-2.732,0l0,3.997l6.654,0c0,-4.908 3.982,-8.885 8.878,-8.885c4.914,0 8.886,3.977 8.886,8.885l30.827,0c0,-4.908 3.967,-8.885 8.892,-8.885c4.898,0 8.875,3.977 8.875,8.885l6.524,0l0,-5.396l-1.398,0l0,0.001zm-42.549,-9.9l-13.838,0c1.872,-5.831 5.339,-9.994 6.801,-9.994c1.841,0 7.037,0 7.037,0l0,9.994zm2.579,0l0,-9.994c0,0 7.141,0 8.974,0c1.854,0 5.893,8.461 7.032,10.625l-16.006,-0.631z"
              />
            </svg>
`;

export const renderWinners = () => `
      <h2 class="section-name">Winners</h2>
      <h3 class="page">>Page</h3>
      <table class="table-winners">
        <tr>
          <th class="th">Number</th>
          <th class="th">Car</th>
          <th class="th">Name</th>
          <th class="th" data-sort-name="wins">Wins</th>
          <th class="th" data-sort-name="time">Best time (sec)</th>
        </tr>
      </table>
`;

export const renderWinner = (num: number, winner: IWinnerLocal) => `
          <td>${String(num)}</td>
          <td>${renderCarSmall(winner.color)}</td>
          <td>${winner.name}</td>
          <td>${winner.wins}</td>
          <td>${winner.time}</td>
`;

export const renderPrevNextButtons = () => `    
    <button class="button button-prev-next button-prev">< Prev</button>
    <button class="button button-prev-next button-next">Next ></button>
`;
