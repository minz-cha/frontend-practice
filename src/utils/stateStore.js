import { atom } from "recoil";

export const modalPosState = atom({
    key: "modalPosState",
    default: { x: 0, y: 0 },
});
