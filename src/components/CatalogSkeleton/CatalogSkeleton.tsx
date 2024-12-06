import { Card, Skeleton } from "antd";
import "./catalog-skeleton.scss";

export const CatalogSkeleton = () => {
  return (
    <Card>
      <Skeleton.Image active className="catalog__skeleton-image"></Skeleton.Image>
      <Skeleton />
    </Card>
  );
};
