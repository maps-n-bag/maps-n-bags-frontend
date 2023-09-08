import React from "react";
import ContentCards from "./contentcards3";

const DayCards = (props) => {
  const cardsData = props.item;
  console.log(cardsData);

  return (
      <div>      
        {cardsData.map((item, index) => (
          <div>
          {item.event && (
            <ContentCards key={index} item={item} />
          )}
          </div>
        ))}
      </div>
  );
};

export default DayCards;
