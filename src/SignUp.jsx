import React, { useEffect, useRef, useState } from "react";
import { Button } from "@chakra-ui/react";
import { checkEmailValidity, checkPasswordMatch } from "../utils";
import { CheckCircleIcon } from "@heroicons/react/outline";
import Card from "./Card";

const SignUp = () => {
  const [name, setName] = useState("");
  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [passwordLength, setPasswordLength] = useState(false);
  const [passwordUppercase, setPasswordUppercase] = useState(false);
  const [passwordNumber, setPasswordNumber] = useState(false);
  const [passwordSpecial, setPasswordSpecial] = useState(false);

  const [isEmailInvalid, setIsEmailInvalid] = useState(false);
  const [isSigningUp, setIsSigningUp] = useState(false);

  const formRef = useRef();

  useEffect(() => {
    if (
      name !== "" &&
      checkEmailValidity(emailAddress) === true &&
      checkPasswordMatch(password, confirmPassword) &&
      password !== "" &&
      passwordLength === true &&
      passwordUppercase === true &&
      passwordNumber === true &&
      passwordSpecial === true
    ) {
      setIsEmailInvalid(false);
    } else {
      setIsEmailInvalid(true);
    }
  }, [name, emailAddress, password, confirmPassword]);

  useEffect(() => {
    if (password.trim().length >= 8) {
      setPasswordLength(true);
    } else {
      setPasswordLength(false);
    }
    if (password.match(/[A-Z]/)) {
      setPasswordUppercase(true);
    } else {
      setPasswordUppercase(false);
    }
    if (password.match(/[0-9]/)) {
      setPasswordNumber(true);
    } else {
      setPasswordNumber(false);
    }
    if (password.match(/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/)) {
      setPasswordSpecial(true);
    } else {
      setPasswordSpecial(false);
    }
  }, [password]);

  const handleNameChange = ({ target }) => {
    setName(target.value);
  };

  const handleEmailChange = ({ target }) => {
    setEmailAddress(target.value);
  };

  const handlePasswordChange = ({ target }) => {
    setPassword(target.value);
  };

  const handleConfirmPasswordChange = ({ target }) => {
    setConfirmPassword(target.value);
  };

  const handleSignUp = async (event) => {
    event.preventDefault();
    setIsSigningUp(true);
    setTimeout(() => {
        window.location.href = '/'
    }, 1000)
  };

  return (
    <div className="max-w-md mx-auto space-y-6">
      <Card>
        <form method="post" action="#" ref={formRef}>
          <div className="space-y-3 border-cyan-700 border p-10 rounded-lg">
            <label className="flex justify-between">
              Full Name
              <input
                className="text-input border rounded-sm px-4"
                type="text"
                id="name"
                name="name"
                placeholder="John Doe"
                value={name}
                onChange={handleNameChange}
                required
              />
            </label>
            <label className="flex justify-between">
              Email address
              <input
                className="text-input border rounded-sm px-4"
                type="email"
                id="email"
                name="email"
                placeholder="example@example.com"
                value={emailAddress}
                onChange={handleEmailChange}
                required
              />
            </label>
            <label className="flex justify-between">
              Password
              <input
                className="text-input border rounded-sm px-4"
                type="password"
                id="password"
                name="password"
                placeholder="********"
                value={password}
                onChange={handlePasswordChange}
                required
              />
            </label>
            <div>
              <ul className="text-sm text-gray-500">
                <p className="font-bold">Password must: </p>
                <li className="flex gap-2 items-center">
                  <CheckCircleIcon
                    style={{ display: passwordLength ? "" : "none" }}
                    className="w-5 h-5 inline text-success-600"
                  />
                  Be at least 8 characters long
                </li>
                <li className="flex gap-2 items-center">
                  <CheckCircleIcon
                    style={{ display: passwordUppercase ? "" : "none" }}
                    className="w-5 h-5 inline text-success-600"
                  />
                  Contain at least one uppercase letter
                </li>
                <li className="flex gap-2 items-center">
                  <CheckCircleIcon
                    style={{ display: passwordNumber ? "" : "none" }}
                    className="w-5 h-5 inline text-success-600"
                  />
                  Contain at least one number
                </li>
                <li className="flex gap-2 items-center">
                  <CheckCircleIcon
                    style={{ display: passwordSpecial ? "" : "none" }}
                    className="w-5 h-5 inline text-success-600"
                  />
                  Contain at least one special character
                </li>
              </ul>
            </div>
            <label className="flex justify-between">
              Confirm Password
              <input
                className="text-input border rounded-sm px-4"
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                placeholder="********"
                value={confirmPassword}
                onChange={handleConfirmPasswordChange}
                required
              />
            </label>
            {!checkPasswordMatch(password, confirmPassword) && (
              <p className="text-loud text-right text-sm px-2">
                {" "}
                Passwords do not match!
              </p>
            )}
            <div className="items-center flex justify-end sm:space-x-3 sm:flex">
              <Button
                className="flex-none"
                type="submit"
                isDisabled={isEmailInvalid}
                isLoading={isSigningUp}
                colorScheme="brand"
                size="sm"
                variant="ghost"
                backgroundColor="blue.200"
                onClick={handleSignUp}
              >
                Create account
              </Button>
            </div>
          </div>
        </form>
      </Card>
    </div>
  );
};

export default SignUp;
