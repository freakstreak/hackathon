"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import AuthLayout from "@/components/AuthLayout";

import { useMutation } from "@tanstack/react-query";

import { signup } from "@/services/auth";
import { useAuth } from "@/contexts/AuthContext";

function SignupForm() {
  const { login } = useAuth();

  const router = useRouter();

  const [form, setForm] = useState({ name: "", email: "", password: "" });

  const signupMutation = useMutation({
    mutationFn: signup,
  });

  const isDisabled =
    signupMutation.isPending || !form.name || !form.email || !form.password;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      signupMutation.mutate(form, {
        onSuccess: (data) => {
          login(data.data);
          setForm({ name: "", email: "", password: "" });

          router.push("/applications");
        },
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <AuthLayout>
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md p-5 border rounded-md shadow-md bg-background"
      >
        <h1 className="text-2xl font-bold mb-4 text-center">Sign Up</h1>

        <div className="space-y-4">
          <div className="space-y-0.5">
            <Label className="required" htmlFor="name">
              Name
            </Label>

            <Input
              id="name"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Your Name"
            />
          </div>

          <div className="space-y-0.5">
            <Label className="required" htmlFor="email">
              Email
            </Label>

            <Input
              id="email"
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Your Email"
            />
          </div>

          <div className="space-y-0.5">
            <Label className="required" htmlFor="password">
              Password
            </Label>

            <Input
              id="password"
              name="password"
              type="password"
              value={form.password}
              onChange={handleChange}
              placeholder="Your Password"
            />
          </div>
        </div>

        <div className="space-y-3 mt-6">
          <p className="text-sm text-center mt-4">
            Already have an account?{" "}
            <Link href="/login" className="underline">
              Login
            </Link>
          </p>

          <Button disabled={isDisabled} type="submit" className="w-full">
            {signupMutation.isPending ? "Signing up..." : "Sign Up"}
          </Button>
        </div>
      </form>
    </AuthLayout>
  );
}

export default SignupForm;
