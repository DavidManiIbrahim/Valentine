import { themes } from "../utils/themes";

export default function ThemePicker({ value, onChange }) {
  return (
    <div className="flex gap-3 mt-4">
      {Object.keys(themes).map(theme => (
        <button
          key={theme}
          onClick={() => onChange(theme)}
          className={`px-3 py-2 rounded-lg border ${
            value === theme ? "border-black" : "border-gray-300"
          }`}
        >
          {theme}
        </button>
      ))}
    </div>
  );
}
