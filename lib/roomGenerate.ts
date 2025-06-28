import { v4 as uuidv4 } from "uuid";

export function generateRoomCode() {
    return uuidv4().slice(0, 8);
}