import { useCallback, useEffect, useState } from "react";
import {
  Box,
  FormControl,
  InputLabel,
  Input,
  InputAdornment,
  Typography,
  Stack,
  Button,
  FormHelperText,
} from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import SelectAndCrop from "../SelectAndCrop";

export interface RegistrationFormValues {
  title: string;
  path: string;
  thumbnail: string;
  description: string;
}

export interface RegistrationFormProps {
  onChangeForm: (values: RegistrationFormValues) => void;
  onSubmit: (values: RegistrationFormValues) => Promise<boolean>;
}

const RegistrationForm: React.FC<RegistrationFormProps> = ({
  onChangeForm,
  onSubmit,
}) => {
  const {
    control,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState,
    setError,
    clearErrors,
  } = useForm<RegistrationFormValues>({
    mode: "onChange",
    defaultValues: {
      title: "",
      path: "",
      thumbnail: "",
      description: "",
    },
  });

  const [selectAndCropKey, setSelectAndCropKey] = useState(0);

  const { path, title, description, thumbnail } = watch() as RegistrationFormValues;

  const handleOnSettleImage = useCallback(
    (image: string) => {
      setValue("thumbnail", image);
      clearErrors("thumbnail");
    },
    [clearErrors, setValue],
  );

  useEffect(() => {
    onChangeForm({
      path,
      title,
      description,
      thumbnail,
    });
  }, [description, onChangeForm, path, thumbnail, title]);

  const handleOnReset = useCallback(() => {
    reset();
    setSelectAndCropKey((key) => ++key);
  }, [reset]);

  const handleOnSubmit = useCallback(async () => {
    await handleSubmit(async (values) => {
      if (values.thumbnail) {
        const isSuccessful = await onSubmit(values);
        if (isSuccessful) {
          handleOnReset();
        }
      } else {
        setError("thumbnail", { message: "Image is required" });
      }
    })();
  }, [handleOnReset, handleSubmit, onSubmit, setError]);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        p: 2,
      }}
    >
      <Stack direction="column" spacing={2}>
        <Typography variant="h6">What meme do you like to share?</Typography>
        <FormControl fullWidth sx={{ m: 1 }} variant="standard">
          <InputLabel htmlFor="path">Path *</InputLabel>
          <Controller
            name="path"
            control={control}
            defaultValue=""
            rules={{
              required: "Path is required",
              minLength: 1,
              maxLength: { value: 100, message: "Path is too long" },
              pattern: {
                value: /\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/,
                message: "Invalid character is included",
              },
              validate: {
                hasSpace: (v: string) => {
                  return !v.includes(" ") || "Space is not allowed";
                },
              },
            }}
            render={({ field }) => (
              <>
                <Input
                  {...field}
                  startAdornment={
                    <InputAdornment position="start">zzal.me/</InputAdornment>
                  }
                  error={!!formState.errors.path}
                />
                <FormHelperText error>{formState.errors.path?.message}</FormHelperText>
              </>
            )}
          />
        </FormControl>
        <FormControl fullWidth sx={{ m: 1 }} variant="standard">
          <SelectAndCrop
            key={selectAndCropKey}
            onSettleImage={handleOnSettleImage}
            errorMessage={formState.errors.thumbnail?.message}
          />
        </FormControl>
        <FormControl fullWidth sx={{ m: 1 }} variant="standard">
          <InputLabel htmlFor="title">Title</InputLabel>
          <Controller
            name="title"
            control={control}
            defaultValue=""
            rules={{
              maxLength: {
                value: 100,
                message: "Title is too long",
              },
            }}
            render={({ field }) => <Input {...field} />}
          />
        </FormControl>
        <FormControl fullWidth sx={{ m: 1 }} variant="standard">
          <InputLabel htmlFor="description">Description</InputLabel>
          <Controller
            name="description"
            control={control}
            defaultValue=""
            rules={{
              maxLength: {
                value: 255,
                message: "Description is too long",
              },
            }}
            render={({ field }) => <Input {...field} />}
          />
        </FormControl>
        <Box
          sx={{
            display: "flex",
            justifyContent: "end",
          }}
        >
          <Stack direction="row" spacing={1}>
            <Button onClick={handleOnReset} size="large">
              Reset
            </Button>
            <Button onClick={handleOnSubmit} variant="contained" size="large">
              Submit
            </Button>
          </Stack>
        </Box>
      </Stack>
    </Box>
  );
};

export default RegistrationForm;
