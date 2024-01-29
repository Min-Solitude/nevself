import IonIcon from "@reacticons/ionicons";
import Button from "../Button";

type CloseProps = {
  className?: string;
  onClick?: () => void;
};

export default function Close({ className, onClick }: CloseProps) {
  return (
    <Button
      className={`flex justify-center items-center ${className}`}
      onClick={onClick}
    >
      <IonIcon name="close" className="text-3xl text-gray-600" />
    </Button>
  );
}
