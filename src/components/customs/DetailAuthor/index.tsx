import { IMAGES } from "@/assets/imgs";
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import { getAuthor } from "@/store/reducer/product/product.reducer";
import Image from "next/image";
import { useEffect } from "react";
import Button from "../Button";
import Link from "next/link";
import RelatedProducts from "../RelatedProducts";

type Props = {
  uid_creator: string;
  uuid_product: string;
};

export default function DetailAuthor({ uid_creator, uuid_product }: Props) {
  const dispatch = useAppDispatch();
  const author = useAppSelector((state) => state.product.author);

  useEffect(() => {
    dispatch(getAuthor({ uid: uid_creator }));
  }, [uid_creator]);

  return (
    <div className="md:my-8 my-16 flex flex-col gap-4 items-center">
      <div className="w-full flex justify-between relative items-center">
        <div className="w-full h-[0.1rem] bg-gray-300"></div>
        <div className="absolute flex flex-col gap-2 items-center left-1/2 -translate-x-1/2 px-4 md:px-8 bg-white md:bg-gray-100">
          <div className="h-[4rem] w-[4rem] rounded-full overflow-hidden ">
            <Image
              src={author?.avatar ? author?.avatar : IMAGES.avatar}
              alt={author?.displayName ? author?.displayName : "Anonymous"}
              width={500}
              height={500}
              className=" w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
      <h1 className="font-bold text-gray-700 mt-8 text-base">
        {author?.displayName}
      </h1>
      <Link
        href={`/account/${author?.uid}/profile`}
        className="flex justify-center items-center"
      >
        <Button kind="primary-dark-full" className="font-medium px-4 text-sm">
          Xem thông tin
        </Button>
      </Link>
      {author?.uid && (
        <RelatedProducts
          uid_creator={author?.uid}
          uuid_product={uuid_product}
          displayName={author?.displayName ? author?.displayName : "Anonymous"}
          kindProfile={author?.kindProfile ? author?.kindProfile : "user"}
        />
      )}
    </div>
  );
}
