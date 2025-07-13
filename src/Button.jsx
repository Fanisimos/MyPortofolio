import { forwardRef, memo } from "react";
import PropTypes from "prop-types";
import "./Button.css";

const Button = memo(
  forwardRef(
    (
      {
        children,
        onClick,
        isActive = false,
        disabled = false,
        variant = "default",
        size = "medium",
        loading = false,
        leftIcon,
        rightIcon,
        className = "",
        type = "button",
        ariaLabel,
        ...rest
      },
      ref,
    ) => {
      const baseClasses = "modern-button";
      const variantClasses = {
        default: "modern-button--default",
        primary: "modern-button--primary",
        secondary: "modern-button--secondary",
        ghost: "modern-button--ghost",
        danger: "modern-button--danger",
      };
      const sizeClasses = {
        small: "modern-button--small",
        medium: "modern-button--medium",
        large: "modern-button--large",
      };

      const buttonClasses = [
        baseClasses,
        variantClasses[variant] || variantClasses.default,
        sizeClasses[size] || sizeClasses.medium,
        isActive && "modern-button--active",
        disabled && "modern-button--disabled",
        loading && "modern-button--loading",
        className,
      ]
        .filter(Boolean)
        .join(" ");

      const handleClick = (event) => {
        if (disabled || loading) {
          event.preventDefault();
          return;
        }
        onClick?.(event);
      };

      const handleKeyDown = (event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          handleClick(event);
        }
      };

      return (
        <button
          ref={ref}
          type={type}
          className={buttonClasses}
          onClick={handleClick}
          onKeyDown={handleKeyDown}
          disabled={disabled || loading}
          aria-label={ariaLabel}
          aria-pressed={isActive}
          aria-busy={loading}
          {...rest}
        >
          {loading && (
            <span className="modern-button__spinner" aria-hidden="true">
              <svg viewBox="0 0 24 24" className="spinner-icon">
                <circle
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="2"
                  fill="none"
                  strokeLinecap="round"
                  strokeDasharray="32"
                  strokeDashoffset="32"
                />
              </svg>
            </span>
          )}

          {leftIcon && !loading && (
            <span
              className="modern-button__icon modern-button__icon--left"
              aria-hidden="true"
            >
              {leftIcon}
            </span>
          )}

          <span className="modern-button__content">{children}</span>

          {rightIcon && !loading && (
            <span
              className="modern-button__icon modern-button__icon--right"
              aria-hidden="true"
            >
              {rightIcon}
            </span>
          )}

          <span className="modern-button__ripple" aria-hidden="true"></span>
        </button>
      );
    },
  ),
);

Button.displayName = "Button";

Button.propTypes = {
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func,
  isActive: PropTypes.bool,
  disabled: PropTypes.bool,
  variant: PropTypes.oneOf([
    "default",
    "primary",
    "secondary",
    "ghost",
    "danger",
  ]),
  size: PropTypes.oneOf(["small", "medium", "large"]),
  loading: PropTypes.bool,
  leftIcon: PropTypes.node,
  rightIcon: PropTypes.node,
  className: PropTypes.string,
  type: PropTypes.oneOf(["button", "submit", "reset"]),
  ariaLabel: PropTypes.string,
};

export { Button };
export default Button;
