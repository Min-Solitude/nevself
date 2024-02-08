import IonIcon from "@reacticons/ionicons";
import Button from "../Button";

type CloseProps = {
  className?: string;
  onClick?: () => void;
  size?: string;
};

export default function Close({
  className,
  onClick,
  size = "3xl",
}: CloseProps) {
  return (
    <Button
      className={`flex justify-center items-center ${className}`}
      onClick={onClick}
    >
      <IonIcon name="close" className={`text-${size} text-gray-600`} />
    </Button>
  );
}
