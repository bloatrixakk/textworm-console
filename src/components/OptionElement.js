import RemoveBtn from "./RemoveBtn";

export default function OptionsElement({ value, removeCb, onChange, placeholder }) {
  return (
    <div style={{
      display: "flex",
      flexDirection: "row"
    }}>
      <input type="text" placeholder={placeholder? placeholder :"answer..."} value={value} onChange={(e) => onChange(e.target.value)}></input>
      <RemoveBtn onClick={removeCb} />
    </div>
  );
}