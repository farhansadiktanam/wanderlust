import DestinationCards from "@/components/DestinationCards";
const DestinationPage = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/destinations`);
  const destinaions = await res.json();
  console.log(destinaions);

  return (
    <div>
      <h2 className="my-4 text-2xl font-bold text-center">Destinations</h2>

      <div className="grid grid-cols-3 gap-3">
        {destinaions.map((destinaion) => (
          <DestinationCards key={destinaion._id} destination={destinaion} />
        ))}
      </div>
    </div>
  );
};

export default DestinationPage;
