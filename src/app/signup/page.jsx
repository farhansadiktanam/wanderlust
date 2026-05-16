"use client";
import { authClient } from "@/lib/auth-client";
import {
  Button,
  Card,
  Description,
  FieldError,
  Form,
  Input,
  Label,
  Separator,
  TextField,
} from "@heroui/react";
import { redirect } from "next/navigation";
import { toast } from "react-toastify";
import { FcGoogle } from "react-icons/fc";

const SignUpPage = () => {
  const handleGoogleSignIn = async () => {
    await authClient.signIn.social({
      provider: "google",
    });
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const user = Object.fromEntries(formData.entries());
    console.log(user);

    const { data, error } = await authClient.signUp.email({
      name: user.name,
      email: user.email, // required
      image: user.image,
      password: user.password,
    });
    console.log(data, error);

    if (data) {
      toast.success("Sign Up successfull");
      redirect("/");
    }
    if (error) {
      toast.error(error);
    }
  };
  return (
    <div className="min-w-xl my-5 mx-auto">
      <div className="text-center my-3">
        <h3 className="font-bold text-2xl">Create Account</h3>
        <p className="text-gray-500">Start your adventure with Wanderlust</p>
      </div>
      <Card className="border rounded-md">
        <Form
          className="flex flex-col gap-4 space-y-3 min-h-[35vh]"
          onSubmit={onSubmit}
        >
          <TextField isRequired name="name" type="text">
            <Label>Name</Label>
            <Input placeholder="Enter Your Name" />
            <FieldError />
          </TextField>
          <TextField
            isRequired
            name="email"
            type="email"
            validate={(value) => {
              if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
                return "Please enter a valid email address";
              }
              return null;
            }}
          >
            <Label>Email</Label>
            <Input placeholder="john@example.com" />
            <FieldError />
          </TextField>
          <TextField name="image" type="url">
            <Label>Image Url</Label>
            <Input placeholder="Image Url" />
            <FieldError />
          </TextField>
          <TextField
            isRequired
            minLength={8}
            name="password"
            type="password"
            validate={(value) => {
              if (value.length < 8) {
                return "Password must be at least 8 characters";
              }
              if (!/[A-Z]/.test(value)) {
                return "Password must contain at least one uppercase letter";
              }
              if (!/[0-9]/.test(value)) {
                return "Password must contain at least one number";
              }
              return null;
            }}
          >
            <Label>Password</Label>
            <Input placeholder="Enter your password" />
            <Description>
              Must be at least 8 characters with 1 uppercase and 1 number
            </Description>
            <FieldError />
          </TextField>
          <div className="flex gap-2">
            <Button type="submit" className={"rounded-sm w-full"}>
              Create Account
            </Button>
          </div>
        </Form>
        <Separator />
        <div className=" whitespace-nowrap text-center">
          Or Sign Up with google
        </div>
        <Separator />
        <div className="text-center">
          <Button
            variant="tertiary"
            className={"rounded-sm w-full"}
            onClick={handleGoogleSignIn}
          >
            <FcGoogle /> Sing Up with Google
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default SignUpPage;
