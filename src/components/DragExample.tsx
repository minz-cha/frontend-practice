import React, { useState } from "react";
import Boundary from "./Boundary";
import Box from "./Box";

export default function DragExample() {
  const [{ x, y }, setPosition] = useState({ x: 0, y: 0 });
  const [boundaryDimensions, setBoundaryDimensions] = useState({
    width: 400,
    height: 400,
  });

  const handleMouseDown = (e: React.MouseEvent) => {
    const initX = e.screenX;
    const initY = e.screenY;
    const startX = x;
    const startY = y;

    const mouseMoveHandler = (e: MouseEvent) => {
      //드래그 이동거리 = 현재 마우스 위치 - 초기 마우스 위치
      const deltaX = e.screenX - initX;
      const deltaY = e.screenY - initY;

      //드래그 시작 시 박스의 초기 위치에 드래그 이동 거리를 더하여 계산
      const newX = startX + deltaX;
      const newY = startY + deltaY;

      // 바운더리 중앙 위치 계산
      const boundaryCenterX = boundaryDimensions.width / 2;
      const boundaryCenterY = boundaryDimensions.height / 2;

      // 바운더리 크기 조정
      let newWidth = boundaryDimensions.width;
      let newHeight = boundaryDimensions.height;
      let offsetX = 0;
      let offsetY = 0;

      // 좌측으로 벗어나는 경우
      if (newX < -boundaryCenterX) {
        const expandAmount = Math.abs(newX + boundaryCenterX);
        newWidth += expandAmount;
        offsetX = expandAmount / 2;
      }

      // 우측으로 벗어나는 경우
      if (newX > boundaryCenterX - 96) {
        const expandAmount = newX - (boundaryCenterX - 96);
        newWidth += expandAmount;
        offsetX = -expandAmount / 2;
      }

      // 위쪽으로 벗어나는 경우
      if (newY < -boundaryCenterY) {
        const expandAmount = Math.abs(newY + boundaryCenterY);
        newHeight += expandAmount;
        offsetY = expandAmount / 2;
      }

      // 아래쪽으로 벗어나는 경우
      if (newY > boundaryCenterY - 96) {
        const expandAmount = newY - (boundaryCenterY - 96);
        newHeight += expandAmount;
        offsetY = -expandAmount / 2;
      }

      setBoundaryDimensions({ width: newWidth, height: newHeight });

      // 박스 위치 업데이트
      setPosition({ x: newX + offsetX, y: newY + offsetY });
    };

    const mouseUpHandler = () => {
      document.removeEventListener("mousemove", mouseMoveHandler);
    };

    document.addEventListener("mousemove", mouseMoveHandler);
    document.addEventListener("mouseup", mouseUpHandler, { once: true });
  };

  return (
    <div style={{ padding: "16px" }}>
      <div style={{ marginBottom: "8px" }}>
        <h1 style={{ fontSize: "24px", fontWeight: "bold" }}>Drag</h1>
        <span>location</span>
        <span style={{ marginLeft: "16px" }}>
          x:{x}, y:{y}
        </span>
      </div>

      <Boundary
        style={{
          width: `${boundaryDimensions.width}px`,
          height: `${boundaryDimensions.height}px`,
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            height: "96px",
            width: "96px",
            position: "absolute",
            left: "50%",
            top: "50%",
            transform: `translate(${x}px, ${y}px)`,
          }}
          onMouseDown={handleMouseDown}
        >
          <Box />
        </div>
      </Boundary>
    </div>
  );
}
