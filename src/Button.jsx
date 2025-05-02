import "./index.css";

export function Button({ children, onClick, isActive }) {
  return (
    <li>
      <button onClick={onClick} className={isActive ? "active" : ""}>
        {children}
      </button>
    </li>
  );
}
