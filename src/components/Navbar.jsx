"use client";
import { authClient } from "@/lib/auth-client";
import { Avatar, Button } from "@heroui/react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Navbar = () => {
  const { data: session } = authClient.useSession();
  const user = session?.user;

  const handleSignOut = async () => {
    await authClient.signOut();
  };

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
      <ul className="flex gap-3 items-center">
        <li>
          <Link href={"/profile"}>Profile</Link>
        </li>
        {user ? (
          <>
            <li>
              <Button
                variant="danger"
                className={"rounded-sm"}
                onClick={handleSignOut}
              >
                Logout
              </Button>
            </li>
            <Avatar>
              <Avatar.Image alt={"John Doe"} src={session?.user.image} />
              <Avatar.Fallback>
                {session?.user.name.slice(0, 2).toUpperCase()}
              </Avatar.Fallback>
            </Avatar>
          </>
        ) : (
          <>
            <li>
              <Link href={"/login"}>Login</Link>
            </li>
            <li>
              <Link href={"/signup"}>Sign Up</Link>
            </li>{" "}
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
