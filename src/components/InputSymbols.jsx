import { useContext } from "react";
import { Context } from "../Context";


export default function InputSymbols({simSelected}) {

  const {
    symbolsIcon
  } = useContext(Context);
  return (
    <div>{simSelected.map((item, index) => {
      <img src={symbolsIcon[item].src} alt="" key={index} />
    })}</div>
  )
}
