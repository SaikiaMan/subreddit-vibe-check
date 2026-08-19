import { Icon } from "./Icon";

const segmentationData = [
  { c1: "Not Specified", c2: "800", c3: "#363636", color: "#535353" },
  { c1: "Male", c2: "441", c3: "#818bb1", color: "#595f77" },
  { c1: "Female", c2: "233", c3: "#2c365d", color: "#232942" },
  { c1: "Other", c2: "126", c3: "#334ed8", color: "#2c3051" },
];

export function Segmentation() {
  return (
    <div className="h-full p-4">
      <div className="flex items-center justify-between">
        <div className="font-bold text-white">Segmentation</div>

        <Icon path="res-react-dash-options" className="h-2 w-2" />
      </div>
      <div className="mt-3">All users</div>
      {segmentationData.map(({ c1, c2, c3, color }) => (
        <div className="flex items-center" key={c1}>
          <div
            className="h-2 w-2 rounded-full"
            style={{
              background: color,
            }}
          />
          <div className="ml-2" style={{ color }}>
            {c1}
          </div>
          <div className="flex-grow" />
          <div style={{ color }}>{c2}</div>
          <div className="card-stack-border ml-2 w-12" />
          <div className="ml-2 h-8">
            <div
              className="h-28 w-20 overflow-hidden rounded-lg"
              style={{
                background: c3,
              }}
            >
              {c1 === "Other" && (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src="https://assets.codepen.io/3685267/res-react-dash-user-card.svg"
                  alt=""
                />
              )}
            </div>
          </div>
        </div>
      ))}

      <div className="bg-details mt-3 flex h-12 w-36 items-center justify-between rounded-xl px-3">
        <div>Details</div>
        <Icon path="res-react-dash-chevron-right" className="h-4 w-4" />
      </div>
    </div>
  );
}
