import Image from "next/image";
import Link from "next/link";
import React from "react";

const Navbar = () => {
  return (
    <nav className="flex justify-between p-4 bg-white shadow-lg">
      <ul className="flex gap-3">
        <li>
          <Link href={"/"}>Home</Link>
        </li>
        <li>
          <Link href={"/destinations"}>Destinations</Link>
        </li>
        <li>
          <Link href={"/my-bookings"}>My Bookings</Link>
        </li>
        <li>
          <Link href={"/add-destinations"}>Add-Destinations</Link>
        </li>
      </ul>

      <div>
        <Image
          src={"/assets/wanderlast.png"}
          alt="WanderlastLogo"
          width={150}
          sizes="lg"
          height={150}
        />
      </div>
      <ul className="flex gap-3">
        <li>
          <Link href={"/profile"}>Profile</Link>
        </li>
        <li>
          <Link href={"/login"}>Login</Link>
        </li>
        <li>
          <Link href={"/signup"}>Sign Up</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
