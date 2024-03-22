import React from "react";
import {Card, CardHeader, CardBody, Image} from "@nextui-org/react";
import MessImage from '../images/Oakmess.jpg'

export default function MessCard2() {
  return (
    <Card className="py-4">
      <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
        <h4 className="font-bold text-3xl uppercase">Oak Mess</h4>
        <p className=" text-large font-bold">Vendor Name</p>
        <p className="text-medium text-default-500">Vendor Email</p>
        <p className="text-medium capitalize text-default-500 mb-3 ">Vendor contact</p>
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
