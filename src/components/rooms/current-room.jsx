import React from "react";
import { useParams } from "react-router-dom";

export default function CurrentRoom() {
  const { _roomId } = useParams();

  const roomId = decodeURIComponent(_roomId);

  return (
    <div className="form">
      <h1>Now showing room {roomId}</h1>
    </div>
  );
}
