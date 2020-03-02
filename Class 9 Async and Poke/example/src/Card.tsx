import React, { useState, useEffect } from "react";
import getData from "./getData";
import "./Card.css";
const Card: React.FC<{ name: string; url: string }> = ({ name, url }) => {
  const [data, changeData] = useState(null as any);

  const getInfo = async () => {
    const data = await getData(url);
    changeData(data);
  };

  useEffect(() => {
    getInfo();
  }, []);

  return (
    <div className="Card">
      {data && (
        <>
          <img className="profile" src={data.sprites.front_default} />
          <div className="cardContainer">
            <div className="name">{name}</div>
            <div className="id">#{data.id}</div>
          </div>
        </>
      )}
    </div>
  );
};

export default Card;
