import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import ItemProduct from "../ItemProduct";
import Image from "next/image";
import ItemRelate from "../ItemRelate";
import { useEffect } from "react";
import {
  getProductByUuid,
  getProducts,
} from "@/store/reducer/product/product.reducer";
import { Each } from "@/helper/Each";
import Skeleton from "@/components/shared/Skeleton";

type Props = {
  uid_creator: string;
  displayName: string;
  uuid_product: string;
  kindProfile: string;
};

export default function RelatedProducts({
  uid_creator,
  displayName,
  uuid_product,
  kindProfile,
}: Props) {
  const products = useAppSelector((state) => state.product.products);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (products === null) {
      if (kindProfile) {
        dispatch(getProducts({ uid: uid_creator }));
      }
    }
  }, []);

  return (
    <div className="w-full mt-8">
      <h1 className="uppercase text-lg md:text-start text-center font-medium underline text-gray-700">
        Sản phẩm của {displayName}
      </h1>
      <div className="md:p-4 md:rounded-2xl w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 bg-white md:border md:border-gray-200 mt-8 md:mt-4">
        {products && products.length > 0 ? (
          products.map((item, index) => {
            if (uuid_product === item.uuid) return null;
            return (
              <ItemRelate
                key={index}
                image={item.image}
                name={item.name}
                uid_creator={item?.uid_creator}
                uuid={item?.uuid}
              />
            );
          })
        ) : (
          <Each
            of={[1, 2, 3, 4, 5]}
            render={(_, index) => <Skeleton kind="load-item" />}
          />
        )}
      </div>
    </div>
  );
}
