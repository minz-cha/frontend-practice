import React from "react";

export default React.forwardRef<HTMLDivElement, React.ComponentProps<"div">>(
  function Box(props, ref) {
    return (
      <div
        {...props}
        ref={ref}
        style={{
          height: "100%",
          width: "100%",
          cursor: "move",
          borderRadius: "12px",
          backgroundColor: "white",
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
          transition: "transform 0.2s, box-shadow 0.2s",
        }}
      />
    );
  }
);
