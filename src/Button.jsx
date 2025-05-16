import "./index.css";

export function Button({ children, onClick, isActive }) {
  return (
    <button onClick={onClick} className={isActive ? "active" : ""}>
      {children}
    </button>
  );
}
