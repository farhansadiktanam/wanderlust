import { Button, Card, CardHeader, Chip, Separator } from "@heroui/react";
import Image from "next/image";
import Link from "next/link";
import { LuMapPin } from "react-icons/lu";

const DestinationCards = ({ destination }) => {
  return (
    <div>
      <Card className="w-full max-w-sm shadow-md">
        {/* Cover Image */}
        <div className="relative w-full h-48">
          <Image
            src={destination.imageUrl}
            alt={destination.destinationName}
            fill
            className="object-cover rounded-lg"
          />
        </div>

        <CardHeader className="flex justify-between items-start px-4 pt-3 pb-0">
          <div>
            <h2 className="text-lg font-bold">{destination.destinationName}</h2>
            <p className="text-sm text-default-500 flex gap-2 items-center my-1">
              <LuMapPin /> {destination.country}
            </p>
          </div>
          <Chip color="accent" variant="flat" size="sm">
            {destination.category}
          </Chip>
        </CardHeader>

        <Card.Content className="px-4 py-2 text-sm text-default-600">
          <p>{destination.description}</p>
        </Card.Content>

        <Separator />

        <Card.Footer className="flex justify-between items-center px-4 py-3">
          {/* <div className="flex flex-col">
            <span className="text-xs text-default-400">From</span>
            <span className="text-lg font-bold text-primary">
              ${destination.price}
            </span>
            <span className="text-xs text-default-400">
              {destination.duration}
            </span>
          </div> */}
          <div className="flex flex-col items-end gap-2">
            {/* <span className="text-xs text-default-400">
              Departs: {destination.departureDate}
            </span> */}
            <Link href={`/destinations/${destination._id}`}>
              <Button color="primary" size="lg" radius="full">
                Book Now
              </Button>
            </Link>
          </div>
        </Card.Footer>
      </Card>
    </div>
  );
};

export default DestinationCards;
