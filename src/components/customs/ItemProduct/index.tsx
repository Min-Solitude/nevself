import View from "@/components/motions/View";
import WhileInView from "@/components/motions/WhileInView";
import { formatDate } from "@/helper/FormatDate";
import { useAppDispatch } from "@/hooks/useRedux";
import {
  deleteProduct,
  likeProduct,
  unlikeProduct,
} from "@/store/reducer/product/product.reducer";
import IonIcon from "@reacticons/ionicons";
import Image from "next/image";
import { useState } from "react";
import Button from "../Button";
import { toast } from "react-toastify";

type Props = {
  name: string;
  image: string;
  uid_creator: string;
  status: string;
  createdAt: string;
  link: string;
  description: string;
  delay: number;
  uid_account?: string;
  uuid_product: string;
  handleUpdateProduct?: (e: any) => void;
  likes: string[];
};

export default function ItemProduct({
  name,
  image,
  uid_creator,
  status,
  createdAt,
  link,
  description,
  delay,
  uid_account,
  uuid_product,
  likes,
  handleUpdateProduct,
}: Props) {
  const [isShowPopupProduct, setIsShowPopupProduct] = useState<string | null>(
    null
  );

  const dispatch = useAppDispatch();

  const handleLikeProduct = () => {
    if (uid_account) {
      const payload = {
        uid_liker: uid_account,
        uuid_product: uuid_product,
        uid_creator: uid_creator,
        name: name,
      };

      dispatch(likeProduct(payload));
    } else {
      toast.error("Vui lòng đăng nhập để thích sản phẩm");
    }
  };

  const handleUnLikeProduct = () => {
    if (uid_account) {
      const payload = {
        uid_liker: uid_account,
        uuid_product: uuid_product,
        uid_creator: uid_creator,
      };

      dispatch(unlikeProduct(payload));
    } else {
      toast.error("Vui lòng đăng nhập");
    }
  };

  return (
    <WhileInView
      delay={delay}
      className="w-full p-2  bg-white shadow-primary border border-gray-200 rounded-xl"
    >
      <div className="h-[30vh] md:h-[20vh] xl:h-[25vh] relative rounded-xl overflow-hidden">
        {isShowPopupProduct === uuid_product ? (
          <View
            className="absolute top-0 left-0 w-full flex flex-col gap-2 pt-14 bottom-0 bg-gray-100 py-4 px-2"
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
          >
            <Button
              className="w-full font-medium"
              kind="primary"
              onClick={() => {
                handleUpdateProduct && handleUpdateProduct(uuid_product);
                setIsShowPopupProduct(null);
              }}
            >
              Chỉnh sửa
            </Button>
            <Button
              className="w-full font-medium"
              kind="primary"
              onClick={() => {
                dispatch(
                  deleteProduct({
                    uid: uid_creator,
                    uuid: uuid_product,
                  })
                );
              }}
            >
              Xóa
            </Button>
          </View>
        ) : (
          <Image
            src={image}
            alt={name}
            className="w-full h-full object-cover"
            width={1880}
            height={1440}
          />
        )}
        {uid_account === uid_creator && !isShowPopupProduct && (
          <Button
            className={` absolute top-2 right-2 p-2 rounded-lg border bg-white text-gray-800 border-gray-200`}
            onClick={() => {
              setIsShowPopupProduct(uuid_product);
            }}
          >
            <IonIcon name={"ellipsis-horizontal"} className="text-lg " />
          </Button>
        )}
        {uid_account === uid_creator && isShowPopupProduct && (
          <Button
            className={` absolute top-2 right-2 p-2 rounded-lg border bg-red-500 text-white border-red-500`}
            onClick={() => {
              setIsShowPopupProduct(null);
            }}
          >
            <IonIcon name="close" className="text-lg " />
          </Button>
        )}
      </div>
      <div className="px-0 pt-4">
        <div className="w-full flex justify-between gap-2 items-center">
          <div className="flex flex-col">
            <h1 className="font-semibold text-base line-clamp-1 text-gray-700">
              {name}
            </h1>
            <i className="text-xs text-gray-800">{formatDate(createdAt)}</i>
          </div>
          <div className="flex items-center gap-2">
            {likes?.filter((item) => item === uid_account).length > 0 ? (
              <Button
                className="bg-white p-2 rounded-lg border border-gray-200"
                onClick={() => handleUnLikeProduct()}
              >
                <IonIcon name="heart" className="text-red-500" />
              </Button>
            ) : (
              <Button
                className="bg-white p-2 rounded-lg border border-gray-200"
                onClick={() => handleLikeProduct()}
              >
                <IonIcon name="heart-outline" className="text-gray-700" />
              </Button>
            )}
          </div>
        </div>
        <p className="mt-4 line-clamp-2 text-gray-700">{description}</p>
        <div className="w-full mt-4 mb-2 flex justify-end">
          <Button kind="primary" className="font-medium text-sm px-4">
            Xem chi tiết
          </Button>
        </div>
      </div>
    </WhileInView>
  );
}
