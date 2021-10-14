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
  isSubmitting: boolean;
}

const RegistrationForm: React.FC<RegistrationFormProps> = ({
  onChangeForm,
  onSubmit,
  isSubmitting,
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
        setError("thumbnail", { message: "이미지를 선택해주세요" });
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
        <Typography variant="h6">어떤 짤을 공유하고 싶으신가요?</Typography>
        <FormControl fullWidth sx={{ m: 1 }} variant="standard">
          <InputLabel htmlFor="path">경로 *</InputLabel>
          <Controller
            name="path"
            control={control}
            defaultValue=""
            rules={{
              required: "경로를 입력해주세요",
              minLength: 1,
              maxLength: { value: 100, message: "경로가 너무 길어요" },
              pattern: {
                value: /([-a-zA-Z0-9ㄱ-ㅎㅏ-ㅣ가-힣()@:%_\+.~#?&//=]*)/,
                message: "허용되지 않은 문자가 포함되어있어요",
              },
              validate: {
                hasSpace: (v: string) => {
                  return !v.includes(" ") || "공백은 허용되지 않아요";
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
                  disabled={isSubmitting}
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
            disabled={isSubmitting}
          />
        </FormControl>
        <FormControl fullWidth sx={{ m: 1 }} variant="standard">
          <InputLabel htmlFor="title">제목</InputLabel>
          <Controller
            name="title"
            control={control}
            defaultValue=""
            rules={{
              maxLength: {
                value: 100,
                message: "제목이 너무 길어요",
              },
            }}
            render={({ field }) => <Input {...field} disabled={isSubmitting} />}
          />
        </FormControl>
        <FormControl fullWidth sx={{ m: 1 }} variant="standard">
          <InputLabel htmlFor="description">세부내용</InputLabel>
          <Controller
            name="description"
            control={control}
            defaultValue=""
            rules={{
              maxLength: {
                value: 255,
                message: "세부내용이 너무 길어요",
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
            <Button onClick={handleOnReset} size="large" disabled={isSubmitting}>
              초기화
            </Button>
            <Button
              onClick={handleOnSubmit}
              variant="contained"
              size="large"
              disabled={isSubmitting}
            >
              {isSubmitting ? "등록 중.." : "등록"}
            </Button>
          </Stack>
        </Box>
      </Stack>
    </Box>
  );
};

export default RegistrationForm;