import { Icon } from "./Icon";
import { Image } from "./Image";

const countryData = [
  { name: "USA", rise: true, value: 21942.83, id: 1 },
  { name: "Ireland", rise: false, value: 19710.0, id: 2 },
  { name: "Ukraine", rise: false, value: 12320.3, id: 3 },
  { name: "Sweden", rise: true, value: 9725.0, id: 4 },
];

export function TopCountries() {
  return (
    <div className="flex h-full flex-col p-4">
      <div className="flex items-center justify-between">
        <div className="font-bold text-white">Top Countries</div>
        <Icon path="res-react-dash-plus" className="h-5 w-5" />
      </div>
      <div>favourites</div>
      {countryData.map(({ name, rise, value, id }) => (
        <div className="mt-3 flex items-center" key={id}>
          <div>{id}</div>

          <Image
            path={`res-react-dash-flag-${id}`}
            className="ml-2 h-6 w-6"
          />
          <div className="ml-2">{name}</div>
          <div className="flex-grow" />
          <div>{`$${value.toLocaleString()}`}</div>
          <Icon
            path={
              rise
                ? "res-react-dash-country-up"
                : "res-react-dash-country-down"
            }
            className="mx-3 h-4 w-4"
          />
          <Icon path="res-react-dash-options" className="h-2 w-2" />
        </div>
      ))}
      <div className="flex-grow" />
      <div className="flex justify-center">
        <div>Check All</div>
      </div>
    </div>
  );
}
