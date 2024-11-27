import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Controller,
  FieldValues,
  SubmitHandler,
  useForm,
} from "react-hook-form";
import { useCookies } from "react-cookie";
import { useLoginUserMutation } from "../features/api/api";

export const LoginPage = () => {
  const [isDisabled, setIsDisabled] = useState(false);
  const [isClicked, setIsClicked] = useState(false);

  const [cookies, setCookie] = useCookies(["accessToken", "userId", "userName"]);

  const [loginUser, { data, isSuccess }] = useLoginUserMutation();

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
      console.error("Login error");
      console.log(cookies);
    }
  }, [isSuccess]);

  interface IAuthUser {
    jwt: string,
    user: {
      id: string,
      username: string,
    }
  }

  const handleForm: SubmitHandler<FieldValues> = async (data) => {
    const authUser = {
      identifier: data.emailLabel,
      password: data.passwordLabel,
    };

    await loginUser(authUser);
  };



  return (
    <form className="login-form" onSubmit={handleSubmit(handleForm)}>
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
          <span>Username is too short.</span>
        )}
        {errors?.nameLabel?.type === "maxLength" && (
          <span>Username is too long.</span>
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
      <button
        type="submit"
        disabled={isDisabled}
        onClick={() => setIsClicked(true)}
      >
        Login
      </button>
    </form>
  );
};
