import Skeleton from "@/components/shared/Skeleton";
import { Each } from "@/helper/Each";
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import { getProducts } from "@/store/reducer/product/product.reducer";
import { useEffect } from "react";
import ItemRelate from "../ItemRelate";

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
      {products?.length === 1 && products[0].uuid === uuid_product ? (
        <div className="w-full flex justify-center  mt-4 py-2">
          Không có sản phẩm nào khác
        </div>
      ) : products && products.length > 0 ? (
        <div className="md:p-4 md:rounded-2xl w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 bg-white md:border md:border-gray-200 mt-8 md:mt-4">
          {products.map((item, index) => {
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
          })}
        </div>
      ) : (
        <Each
          of={[1, 2, 3, 4, 5]}
          render={(_, index) => <Skeleton kind="load-item" />}
        />
      )}
    </div>
  );
}
