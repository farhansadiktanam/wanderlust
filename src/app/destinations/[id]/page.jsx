import Image from "next/image";
import { Card, Chip, Button, Separator, Modal } from "@heroui/react";
import Link from "next/link";

import { FaArrowLeft } from "react-icons/fa";
import EditDestination from "@/components/EditDestination";
import DeleteDestination from "@/components/DeleteDestination";

const DestinationDetailsPage = async ({ params }) => {
  const { id } = await params;
  const res = await fetch(`http://localhost:5000/destinations/${id}`);
  const destinationDetails = await res.json();

  return (
    <div className="max-w-7xl mx-auto my-6">
      <div className="flex justify-between items-center">
        <Link href={"/destinations"}>
          <Button variant="tertiary">
            <FaArrowLeft /> Back To Destinations{" "}
          </Button>
        </Link>

        <div className="flex gap-2 items-center">
          <EditDestination destinationDetails={destinationDetails} />
          <DeleteDestination destinationDetails={destinationDetails} />
        </div>
      </div>
      <Card className="w-full max-w-6xl shadow-md overflow-hidden">
        {/* Image */}
        <div className="relative  h-100">
          <Image
            src={destinationDetails.imageUrl}
            alt={destinationDetails.destinationName}
            fill
            className="object-cover rounded-lg"
          />
        </div>

        <Card.Header className="flex justify-between items-start px-4 pt-3 pb-0">
          <div>
            <Card.Title>{destinationDetails.destinationName}</Card.Title>
            <Card.Description>{destinationDetails.country}</Card.Description>
          </div>
          <Chip color="accent" variant="flat" size="sm">
            {destinationDetails.category}
          </Chip>
        </Card.Header>

        <Card.Content className="px-4 py-2 text-sm text-default-600">
          <p>{destinationDetails.description}</p>
        </Card.Content>

        <Separator />

        <Card.Footer className="flex justify-between items-center px-4 py-3">
          <div className="flex flex-col">
            <span className="text-xs text-default-400">From</span>
            <span className="text-lg font-bold text-primary">
              ${destinationDetails.price}
            </span>
            <span className="text-xs text-default-400">
              {destinationDetails.duration}
            </span>
          </div>
          <div className="flex flex-col items-end gap-2">
            <span className="text-xs text-default-400">
              Departs: {destinationDetails.departureDate}
            </span>
            <Button color="primary" size="sm" radius="full">
              Confirm
            </Button>
          </div>
        </Card.Footer>
      </Card>
    </div>
  );
};

export default DestinationDetailsPage;
