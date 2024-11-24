import { Card, Image as AntImage, Typography } from "antd";
import { IProduct } from "./types";

export const Product = ({Title, Image, Price}: IProduct) => {
  return (
    <Card style={{ display: "flex", flexDirection: "column" }}>
      <AntImage width={300} height={300} src={`http://localhost:1337${Image[0].url}`} alt={Image[0].alt} />
      <Typography.Paragraph>{Title}</Typography.Paragraph>
      <Typography.Paragraph>{`${Price} €`}</Typography.Paragraph>
    </Card>
  );
};
