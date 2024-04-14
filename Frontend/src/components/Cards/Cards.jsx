import React from "react";
import "./Cards.css";
import { cardsData } from "../../Data/Data";
import png from "../../imgs/img3.png";
import Card from "../Card/Card";
import { useUserAuth } from "../../Context/UseAuthContext";

const Cards = () => {
  const {rows}=useUserAuth();
  return (
    <div className="Cards">
      {
      rows !== null &&
      rows.length > 0 &&
      rows.map((card, index) => {
        return (
          <div className="parentContainer" key={index}>
            <Card
              title={card.postName}
              color={"pink"}
              barValue={card.userID}
              value={card.postMessage}
              png={png}
              series={["patanahi","hmmpatachal ","ye ","he","kkya"]}
            />
          </div>
        );
      })}
    </div>
  );
};

export default Cards;
