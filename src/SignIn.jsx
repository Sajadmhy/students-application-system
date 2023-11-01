import Card from "../components/Card";
import { useForm } from "react-hook-form";
import { Button, useToast } from "@chakra-ui/react";

const SignIn = () => {
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm();

  async function onSubmit(data) {
    const { email, password } = { ...data };
    if (email === "test@test.com" && password === "test") {
      setTimeout(() => {
        window.location.href = "/";
      }, 1000);
    } else {
      alert("wrong credentials");
    }
  }

  return (
    <div className="max-w-md mx-auto space-y-6">
      <Card>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-3 border-cyan-700 border p-10 rounded-lg">
            <label className="flex justify-between">
              Email address
              <input
                className="text-input border rounded-sm px-4"
                name="email"
                type="email"
                {...register("email")}
              />
            </label>
            <label className="flex justify-between">
              Password
              <input
                className="text-input border rounded-sm px-4"
                name="password"
                type="password"
                {...register("password")}
              />
            </label>
            <div className="items-center flex justify-end sm:space-x-3 sm:flex">
              <Button
                colorScheme="brand"
                type="submit"
                size="sm"
                variant="ghost"
                backgroundColor="blue.200"
                isLoading={isSubmitting}
                loadingText="Signing in..."
              >
                Sign in
              </Button>
            </div>
          </div>
        </form>
      </Card>
    </div>
  );
};

export default SignIn;
