import { useEffect, useState } from "react";
import {
  Controller,
  FieldValues,
  SubmitHandler,
  useForm,
} from "react-hook-form";

export const SignupPage = () => {
  const [isDisabled, setIsDisabled] = useState(false);
  const [isClicked, setIsClicked] = useState(false);

  //const navigate = useNavigate();

  const {
    formState: { errors, isValid },
    getValues,
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

  /*useEffect(() => {
    isValid && setIsDisabled(false);
  }, [isValid]);*/

  interface IUserData {
    username: string;
    email: string;
    password: string;
  }

  const strapiRegister = async (userData: IUserData) => {
    const response = await fetch("http://localhost:1337/api/auth/local/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      throw new Error(`HTTP error ${response.status}`);
    }

    const data = await response.json();
    return data;
  };

  const handleForm: SubmitHandler<FieldValues> = (data) => {
    const newUser = {
      username: data.nameLabel,
      email: data.emailLabel,
      password: data.passwordLabel,
    };

    strapiRegister(newUser);
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
