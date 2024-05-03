import { Card, CardHeader, CardBody, Image } from "@nextui-org/react";
import MessImage from "../images/Oakmess.jpg";

export default function MessCard2({ mess, firm, mail }) {
  return (
    <Card className="py-4">
      <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
        <h4 className="font-bold text-xl uppercase">{mess}</h4>
        <p className=" text-lg font-bold w-64">Firm Name: {firm}</p>
        <p className="text-medium text-default-500 w-64">Firm Email: {mail}</p>
        {/* <p className="text-medium capitalize text-default-500 mb-3 ">
          Vendor contact
        </p> */}
      </CardHeader>
      <CardBody className="overflow-visible py-2">
        <Image
          alt="Card background"
          className="object-cover rounded-xl h-52"
          src={MessImage}
          width={270}
        />
      </CardBody>
    </Card>
  );
}
