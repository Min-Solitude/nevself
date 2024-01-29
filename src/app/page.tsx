import Banner from "@/components/customs/Banner";
import MainLayout from "./(main)/layout";
import IonIcon from "@reacticons/ionicons";
import AnimateText from "@/components/motions/AnimateText";
import View from "@/components/motions/View";
import { Each } from "@/helper/Each";
import WhileInView from "@/components/motions/WhileInView";
import Image from "next/image";
import Title from "@/components/customs/Title";
import Link from "next/link";

const dataCard = [
  {
    lable: "Chủ đề và thiết kế",
    text: "của riêng bạn",
    img: "https://i.pinimg.com/originals/09/3f/18/093f1861fc92b3a0ba497ece177b27e6.gif",
  },
  {
    lable: "Nhúng ứng dụng",
    text: "yêu thích của bạn",
    img: "https://i.pinimg.com/originals/76/9f/94/769f94e3bbbbc703648e355e27c71ea9.gif",
  },
  {
    lable: "Theo dõi mọi thứ",
    text: "chỉ dành cho bạn",
    img: "https://i.pinimg.com/originals/1c/92/dd/1c92dd6073a7ea0f88c715570ee5eca4.gif",
  },
  {
    lable: "Mọi thứ bạn cần cho một ",
    text: "trang web hoàn chỉnh",
    img: "https://i.pinimg.com/originals/d0/99/87/d0998749289c8d765c9b561d746f6091.gif",
  },
];

const dataCardVip = [
  {
    label: "Tạo trang web",
    text: "không giới hạn",
    img: "https://i.pinimg.com/originals/16/f1/d6/16f1d6eadfa1ccd785c91f64b535aabb.gif",
  },
  {
    label: "Sử dụng tên miền của riêng bạn",
    text: "để lưu trữ trang web của bạn",
    img: "https://i.pinimg.com/originals/71/0c/90/710c90fec4dd8b0b7cc2c6d9991db407.gif",
  },
  {
    label: "Xây dựng danh sách email, tài sản",
    text: "lớn nhất của người sáng tạo",
    img: "https://i.pinimg.com/originals/db/e6/b9/dbe6b90d0fd0d209001cb64eefd038d7.gif",
  },
  {
    label: "Xuất bản bài viết và cảnh báo",
    text: "người đăng ký của bạn",
    img: "https://i.pinimg.com/originals/17/a5/4f/17a54faf20bf05b668659aeaa296a079.gif",
  },
];

const dataMember = [
  {
    name: "Lina",
    thumbnail:
      "https://i.pinimg.com/564x/2f/12/b1/2f12b1abc00c244c5de454f77d68530e.jpg",
    link: "https://www.facebook.com/",
  },
  {
    name: "Lonently",
    thumbnail:
      "https://i.pinimg.com/564x/26/45/a8/2645a8c2e4468c2f7a86801716db74d8.jpg",
    link: "https://www.facebook.com/",
  },
  {
    name: "Ayumi",
    thumbnail:
      "https://i.pinimg.com/564x/e8/0a/c5/e80ac589e93ac6d2b926ff0f2f482074.jpg",
    link: "https://www.facebook.com/",
  },
  {
    name: "Goehl",
    thumbnail:
      "https://i.pinimg.com/564x/9d/a3/65/9da365441e04f61ed790117331e762cb.jpg",
    link: "https://www.facebook.com/",
  },
  {
    name: "Josan",
    thumbnail:
      "https://i.pinimg.com/736x/33/97/79/33977932aff3658dd374d2715e4f2438.jpg",
    link: "https://www.facebook.com/",
  },
];

export default function Home() {
  return (
    <MainLayout>
      <div className="w-full md:w-[90%] px-4 md:px-0 lg:w-[80%] flex flex-col duration-150 items-center">
        <Banner />
        <section className="w-full flex flex-col items-center ">
          <Title
            text="miễn phí."
            label="Hàng loạt tính năng"
            className="flex gap-4 items-center mb-16 md:mt-16 md:mb-24 max-w-[30rem]"
          />
          <div className="w-full flex relative justify-center flex-col gap-16 items-center md:grid md:grid-cols-2 md:m-auto md:w-auto 3xl:grid-cols-4">
            {
              <Each
                of={dataCard}
                render={(item, index) => (
                  <WhileInView
                    className="w-[18rem] h-[24rem] bg-white p-4 rounded-2xl relative overflow-hidden shadow-primary"
                    delay={index}
                    kind="spin-around"
                  >
                    <h1 className="font-semibold text-xl mt-4 text-[#000000d3]">
                      {item.lable} <br />
                      <AnimateText
                        text={item.text}
                        className="text-gradient"
                        el="span"
                      />
                    </h1>
                    <div className="bg-white mt-8 h-[12rem] rounded-xl overflow-hidden">
                      <Image
                        src={item.img}
                        width={400}
                        height={400}
                        className="w-full h-full object-cover"
                        alt="img"
                      />
                    </div>
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-[2rem] h-1 rounded-full bg-gradient" />
                  </WhileInView>
                )}
              />
            }
          </div>
        </section>
        <section className="w-full flex flex-col items-center mt-32">
          <WhileInView className="bg-black text-white w-full rounded-2xl shadow-primary px-4 md:px-8 py-16 flex flex-col items-center">
            <Title
              text="VIP."
              label="Dành cho những người sáng tạo."
              className="max-w-[20rem] lg:max-w-[30rem]"
            />
            <div className="mt-16 grid grid-cols-1 gap-8 w-full md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
              {
                <Each
                  of={dataCardVip}
                  render={(item, index) => (
                    <WhileInView
                      className="w-full bg-dark p-4 md:p-8 max-w-[22rem] lg:max-w-[30rem] md:max-w-full m-auto md:mx-auto md:my-0 rounded-xl border border-[#222222] shadow-primary flex flex-col items-center"
                      delay={index}
                      kind="spin-around"
                    >
                      <div className="h-[15rem] rounded-xl overflow-hidden w-full">
                        <Image
                          src={item.img}
                          width={400}
                          height={400}
                          className="w-full h-full object-cover"
                          alt="img"
                        />
                      </div>
                      <div className="py-8 text-center">
                        <h1 className="font-semibold text-white text-xl">
                          {item.label}{" "}
                          <span className="text-gradient">{item.text}</span>
                        </h1>
                      </div>
                    </WhileInView>
                  )}
                />
              }
            </div>
          </WhileInView>
        </section>
        <section className="w-full flex flex-col items-center mt-8">
          <Title
            text="sáng tạo yêu thích."
            label="Được hơn 500.000 người"
            className="flex gap-4 items-center mb-16 md:mt-16 md:mb-24 max-w-[35rem]"
          />
          <div className=" w-full hidden-scrollbar overflow-x-auto lg:justify-center lg:gap-16 flex gap-8 items-center h-[12rem] scroll-smooth">
            {
              <Each
                of={dataMember}
                render={(item, index) => (
                  <WhileInView
                    className="flex flex-col h-[12rem] items-center gap-2"
                    delay={index}
                  >
                    <div className="w-[8rem] min-w-[8rem] h-[8rem] rounded-full overflow-hidden bg-gray-300">
                      <Image
                        src={item.thumbnail}
                        width={400}
                        height={400}
                        alt=""
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="bg-pink flex flex-col items-center">
                      <div className="font-semibold text-lg text-gradient">
                        {item.name}
                        <IonIcon
                          name="checkmark-circle"
                          className="text-green-500 ml-1 translate-y-[20%]"
                        />
                      </div>
                      <Link
                        href={item.link}
                        className="font-medium underline text-gray-700 text-sm"
                      >
                        Xem trang
                      </Link>
                    </div>
                  </WhileInView>
                )}
              />
            }
          </div>
        </section>
      </div>
    </MainLayout>
  );
}
