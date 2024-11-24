import { useEffect, useState } from "react";
import {
  Controller,
  FieldValues,
  SubmitHandler,
  useForm,
} from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { useSignupUserMutation } from "../features/api/api";

export const SignupPage = () => {
  const [isDisabled, setIsDisabled] = useState(false);
  const [isClicked, setIsClicked] = useState(false);

  const [cookies, setCookie] = useCookies(["accessToken", "userId", "userName"]);

  const [signupUser, { data, isSuccess }] = useSignupUserMutation();

  const navigate = useNavigate();

  const {
    formState: { errors, isValid },
    control,
    trigger,
    handleSubmit,
  } = useForm({
    mode: "onChange",
  });

  useEffect(() => {
    if (!isValid && isClicked) {
      trigger();
      setIsDisabled(true);
      setIsClicked(false);
    }
  }, [isClicked]);

  useEffect(() => {
    if (isValid) {
      setIsDisabled(false);
    }
  }, [isValid]);

  useEffect(() => {
    if (isSuccess) {
      const { jwt, user: { id, username } } = data as IAuthUser;
      setCookie("accessToken", jwt, { path: "/" });
      setCookie("userId", id, { path: "/" });
      setCookie("userName", username, { path: "/" });
      navigate("/");
    } else {
      console.error("Signup error");
      console.log(cookies);
    }
  }, [isSuccess]);

  interface IAuthUser {
    jwt: string,
    user: {
      id: number,
      username: string,
    }
  }

  const handleForm: SubmitHandler<FieldValues> = async (data) => {
    const newUser = {
      username: data.nameLabel,
      email: data.emailLabel,
      password: data.passwordLabel,
    };

    await signupUser(newUser);
  };

  return (
    <form className="signup-form" onSubmit={handleSubmit(handleForm)}>
      <div className="form-input__block">
        <label>Username</label>
        <Controller
          control={control}
          rules={{ required: true, minLength: 3, maxLength: 30 }}
          render={({ field: { onChange, value } }) => (
            <input
              onChange={(ev) => onChange(ev)}
              value={value ? value.toString() : ""}
            />
          )}
          name="nameLabel"
        />
        {errors?.nameLabel?.type === "required" && (
          <span>The field cannot be empty.</span>
        )}
        {errors?.nameLabel?.type === "minLength" && (
          <span>Username is too short.</span>
        )}
        {errors?.nameLabel?.type === "maxLength" && (
          <span>Username is too long.</span>
        )}
      </div>
      <div className="form-input__block">
        <label>Email</label>
        <Controller
          control={control}
          rules={{ required: true, minLength: 3, maxLength: 30 }}
          render={({ field: { onChange, value } }) => (
            <input
              onChange={(ev) => onChange(ev)}
              value={value ? value.toString() : ""}
            />
          )}
          name="emailLabel"
        />
        {errors?.nameLabel?.type === "required" && (
          <span>The field cannot be empty.</span>
        )}
        {errors?.nameLabel?.type === "minLength" && (
          <span>Email is too short.</span>
        )}
        {errors?.nameLabel?.type === "maxLength" && (
          <span>Email is too long.</span>
        )}
      </div>
      <div className="form-input__block">
        <label>Password</label>
        <Controller
          control={control}
          rules={{ required: true, minLength: 3, maxLength: 20 }}
          render={({ field: { onChange, value } }) => (
            <input
              onChange={(ev) => onChange(ev)}
              value={value ? value.toString() : ""}
            />
          )}
          name="passwordLabel"
        />
        {errors?.passwordLabel?.type === "required" && (
          <span>The field cannot be empty.</span>
        )}
        {errors?.passwordLabel?.type === "minLength" && (
          <span>Password is too short.</span>
        )}
        {errors?.passwordLabel?.type === "maxLength" && (
          <span>Password is too long.</span>
        )}
      </div>
      <div className="form-input__block">
        <label>Repeat password</label>
        <Controller
          control={control}
          rules={{ required: true }}
          render={({ field: { onChange, value } }) => (
            <input
              onChange={(ev) => onChange(ev)}
              value={value ? value.toString() : ""}
            />
          )}
          name="repeatLabel"
        />
        {errors?.repeatLabel?.type === "required" && (
          <span>The field cannot be empty.</span>
        )}
        {errors?.repeatLabel?.type === "validate" && <span>Not match.</span>}
      </div>
      <button
        type="submit"
        disabled={isDisabled}
        onClick={() => setIsClicked(true)}
      >
        Sign up
      </button>
    </form>
  );
};
