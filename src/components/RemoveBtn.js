export default function RemoveBtn({ onClick }) {
  return (
    <button onClick={onClick}>
      <img className="Small-icon" src="icons\remove-icon.png"></img>
    </button>
  );
}