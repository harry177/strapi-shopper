import { IProduct } from "../features/api/api";

export const Product = ({Title, Image, Price}: IProduct) => {
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <img width={300} height={300} src={`http://localhost:1337${Image[0].url}`}></img>
      <p>{Title}</p>
      <p>{`${Price} €`}</p>
    </div>
  );
};
