import { Icon } from "./Icon";

export function AddComponent() {
  return (
    <div>
      <div className="add-component-head h-20 w-full" />
      <div
        className="flex flex-col items-center"
        style={{
          transform: "translate(0, -40px)",
        }}
      >
        <div
          style={{
            background: "#414455",
            width: "80px",
            height: "80px",
            borderRadius: "999px",
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="https://assets.codepen.io/3685267/res-react-dash-rocket.svg"
            alt=""
            className="h-full w-full"
          />
        </div>
        <div className="mt-3 font-bold text-white">
          No Components Created Yet
        </div>
        <div className="mt-2">Simply create your first component</div>
        <div className="mt-1">Just click on the button</div>
        <div
          className="mt-3 flex items-center p-3"
          style={{
            background: "#2f49d1",
            borderRadius: "15px",
            padding: "8px 16px",
            justifyContent: "center",
            color: "white",
          }}
        >
          <Icon path="res-react-dash-add-component" className="h-5 w-5" />
          <div className="ml-2">Add Component</div>
          <div
            className="ml-2"
            style={{
              background: "#4964ed",
              borderRadius: "15px",
              padding: "4px 8px 4px 8px",
            }}
          >
            129
          </div>
        </div>
      </div>
    </div>
  );
}
