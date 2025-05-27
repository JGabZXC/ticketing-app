import { Fieldset, Button } from "@headlessui/react";
import { redirect, Form, useActionData, useNavigation } from "react-router-dom";
import { toast } from "react-toastify";
import Fields from "../ui/Fields";

export default function Register() {
  const data = useActionData();
  const errors = data?.errors || null;
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  return (
    <Form method="POST" className="w-full max-w-lg mx-auto">
      <Fieldset className="space-y-6 rounded-xl bg-white/5">
        <Fields
          type="text"
          name="username"
          placeholder="Username"
          error={errors?.username || undefined}
        />
        <Fields
          type="email"
          name="email"
          placeholder="Your Email"
          error={errors?.email || undefined}
        />
        <Fields
          type="text"
          name="firstName"
          placeholder="First Name"
          error={errors?.firstName || undefined}
        />
        <Fields
          type="text"
          name="lastName"
          placeholder="Last Name"
          error={errors?.lastName || undefined}
        />
        <Fields
          type="password"
          name="password"
          placeholder="Enter Password"
          error={errors?.password || undefined}
        />
        <Fields
          type="password"
          name="confirmPassword"
          placeholder="Confirm password"
          error={errors?.confirmPassword || undefined}
        />
        <Button
          type="submit"
          className="px-4 py-2 w-full rounded-full bg-indigo-600 text-slate-50"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Registering..." : "Register"}
        </Button>
      </Fieldset>
    </Form>
  );
}

export async function action({ request }) {
  const formData = await request.formData();
  const userData = {
    username: formData.get("username"),
    email: formData.get("email"),
    firstName: formData.get("firstName"),
    lastName: formData.get("lastName"),
    password: formData.get("password"),
    confirmPassword: formData.get("confirmPassword"),
  };

  const response = await fetch(
    "https://ticketing-app-j94u.onrender.com//api/v1/auth/register",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    }
  );

  if (response.status === 400) {
    const errorData = await response.json();
    return errorData;
  }

  if (response.status === 409) {
    const errorData = await response.json();
    toast.error(errorData.message);
    return errorData;
  }

  if (!response.ok) {
    throw new Response(
      JSON.stringify({ message: "Registration failed" }, { status: 500 })
    );
  }

  toast.success("Registration successful! Please log in.");
  return redirect("/auth?type=login");
}
