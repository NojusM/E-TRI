import { useContext, useState } from "react";
import Cat from "./Cat";
import { VuContext } from "../../context/VuContext";
import FAKE_DATA from "../../data/test.json";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowAltCircleDown,
  faArrowAltCircleUp,
} from "@fortawesome/free-solid-svg-icons";

export default function RouteHistory() {
  const { vuResponse } = useContext(VuContext);
  const FAKE_RESPONSE = FAKE_DATA;
  const [openCats, setOpenCats] = useState<number[]>([]);

  const toggleCat = (index: number) => {
    if (openCats.includes(index)) {
      setOpenCats(openCats.filter((catIndex) => catIndex !== index));
    } else {
      setOpenCats([...openCats, index]);
    }
  };

  return (
    <div className="history-wrapper">
      {FAKE_RESPONSE.map((response, index) => (
        <div key={index}>
          <button className="toggle-button" onClick={() => toggleCat(index)}>
            {openCats.includes(index) ? (
              <>
                <FontAwesomeIcon icon={faArrowAltCircleUp} />
                Hide Route x (date)
              </>
            ) : (
              <>
                <FontAwesomeIcon icon={faArrowAltCircleDown} />
                Show Route x (date)
              </>
            )}
          </button>
          {openCats.includes(index) && <Cat data={response} />}
        </div>
      ))}
    </div>
  );
}
