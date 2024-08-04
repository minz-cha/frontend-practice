import React from "react";

export default React.forwardRef<HTMLDivElement, React.ComponentProps<"div">>(
  function Boundary(props, ref) {
    return (
      <div
        {...props}
        ref={ref}
        style={{
          position: "relative",
          height: "256px",
          borderRadius: "12px",
          backgroundColor: "#e5e7eb",
          ...props.style,
        }}
      />
    );
  }
);
