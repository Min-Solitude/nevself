"use client";

import Button from "@/components/customs/Button";
import WhileInView from "@/components/motions/WhileInView";
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import { getProfileAccount } from "@/store/reducer/auth/auth.reducer";
import React, { useEffect } from "react";
import CreateDonate from "./components/CreateDonate";

export default function DonatePage({
  params,
}: {
  params: {
    uid: string;
  };
}) {
  const account = useAppSelector((state) => state.auth.account);
  const profile = useAppSelector((state) => state.auth.profile);

  const [isCreateDonate, setIsCreateDonate] = React.useState(false);

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!profile || profile.uid !== params.uid) {
      dispatch(getProfileAccount({ uid: params.uid }));
    }
  }, []);

  return (
    <WhileInView className="w-full rounded-2xl border border-gray-200 shadow-primary flex justify-center items-center p-4 min-h-[30vh]">
      {isCreateDonate ? (
        <CreateDonate />
      ) : account?.uid === params.uid ? (
        <div>
          {profile?.role === "admin" || profile?.role === "vip" ? (
            <div>
              {profile.donate ? (
                <div>Donate của người dùng này</div>
              ) : (
                <div className="w-full flex gap-2 flex-col px-3 md:px-0 items-center">
                  <Button
                    kind="primary"
                    className="font-medium px-4"
                    onClick={() => setIsCreateDonate(true)}
                  >
                    Tạo donate
                  </Button>
                  <i className="text-center text-gray-500">
                    Bạn có thể tạo donate để giúp người dùng này có thêm nguồn
                    thu nhập &nbsp;🎉
                  </i>
                </div>
              )}
            </div>
          ) : (
            <div>2</div>
          )}
        </div>
      ) : (
        <div>
          {profile?.role === "admin" || profile?.role === "vip" ? (
            <div>Người dùng này là người dùng doanh nghiệp</div>
          ) : (
            <div>
              <div>Người dùng này không phải là người dùng doanh nghiệp</div>
            </div>
          )}
        </div>
      )}
    </WhileInView>
  );
}
