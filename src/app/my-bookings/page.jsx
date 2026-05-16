import { BookingCancel } from "@/components/BookingCancel";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import Image from "next/image";

const Booking = async () => {
  const session = await auth.api.getSession({
    headers: await headers(), // you need to pass the headers object.
  });
  const { token } = await auth.api.getToken({
    headers: await headers(),
  });

  const user = session?.user;
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/bookings/${user?.id}`,
    {
      headers: {
        authorization: `Bearer ${token}`,
      },
    },
  );
  const bookings = await res?.json();
  console.log(bookings);

  return (
    <div className="max-w-7xl mx-auto px-4 my-8">
      <h2 className="font-bold text-2xl mb-6">My Bookings</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {bookings.map((booking) => (
          <div
            key={booking._id}
            className="rounded-2xl overflow-hidden shadow-md border border-default-200 bg-background hover:shadow-lg transition-shadow duration-300"
          >
            {/* Image */}
            <div className="relative w-full h-48">
              <Image
                src={booking.imageUrl}
                alt={booking.destinationName}
                fill
                className="object-cover"
              />
              {/* Category badge */}
              {booking.category && (
                <span className="absolute top-3 left-3 bg-primary text-white text-xs font-medium px-3 py-1 rounded-full">
                  {booking.category}
                </span>
              )}
            </div>

            {/* Content */}
            <div className="p-4 flex flex-col gap-3">
              <div>
                <h3 className="font-bold text-lg leading-tight">
                  {booking.destinationName}
                </h3>
                <p className="text-default-500 text-sm">{booking.country}</p>
              </div>

              {/* Details row */}
              <div className="flex flex-wrap gap-3 text-sm text-default-600">
                <div className="flex items-center gap-1">
                  <span>🗓</span>
                  <span>
                    {new Date(booking.departureDate).toLocaleDateString(
                      "en-US",
                      {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      },
                    )}
                  </span>
                </div>

                {booking.duration && (
                  <div className="flex items-center gap-1">
                    <span>⏱</span>
                    <span>{booking.duration}</span>
                  </div>
                )}
              </div>
              <p className="text-default-500 text-sm">
                Booking Id: {booking._id}
              </p>

              {/* Footer */}
              <div className="flex items-center justify-between pt-2 border-t border-default-100">
                <div>
                  <p className="text-xs text-default-400">Total Price</p>
                  <p className="text-primary font-bold text-lg">
                    ${booking.price}
                  </p>
                </div>
              </div>
            </div>
            <BookingCancel bookingId={booking._id} />
          </div>
        ))}
      </div>

      {/* Empty state */}
      {bookings.length === 0 && (
        <div className="flex flex-col items-center justify-center py-20 text-default-400">
          <span className="text-5xl mb-4">🧳</span>
          <p className="text-lg font-medium">No bookings yet</p>
          <p className="text-sm">Start exploring destinations!</p>
        </div>
      )}
    </div>
  );
};

export default Booking;
