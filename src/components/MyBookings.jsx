"use client";

import { authClient } from "@/lib/auth-client";
import { Button, Calendar, DateField, Label } from "@heroui/react";
import { useState } from "react";

const MyBookings = ({ destinationDetails }) => {
  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;
  const [departureDate, setDepartureDate] = useState(null);

  // if (isPending) return <p>Loading....</p>;

  // if (!user) return <p>Please log in to book.</p>;

  const { price, _id, destinationName, country, imageUrl } = destinationDetails;
  const handleBooking = async () => {
    const bookingData = {
      userId: user?.id,
      userImage: user?.image,
      userName: user?.name,
      destinationId: _id,
      destinationName,
      price,
      country,
      imageUrl,
      departureDate: new Date(departureDate),
    };

    const { data: tokenData } = await authClient.token();
    console.log(tokenData);

    const res = await fetch("http://localhost:5000/bookings/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${tokenData?.token}`,
      },
      body: JSON.stringify(bookingData),
    });
    const data = await res.json();
    console.log(data);
  };

  return (
    <div className="space-y-3">
      <DateField className="w-[256px]" name="date" onChange={setDepartureDate}>
        <Label>Departure Date</Label>
        <DateField.Group>
          <DateField.Prefix>
            <Calendar className="size-4 text-muted" />
          </DateField.Prefix>
          <DateField.Input>
            {(segment) => <DateField.Segment segment={segment} />}
          </DateField.Input>
        </DateField.Group>
      </DateField>
      <Button color="primary" size="sm" radius="full" onClick={handleBooking}>
        Confirm
      </Button>
    </div>
  );
};

export default MyBookings;
