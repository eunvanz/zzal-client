import { useCallback, useEffect, useMemo, useState } from "react";
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
  CircularProgress,
} from "@mui/material";
import { debounce } from "lodash-es";
import { Controller, useForm } from "react-hook-form";
import useExistingPathQuery from "~/queries/useExistingPathQuery";
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

  const {
    refetch,
    data: isExistingPath,
    isFetched: isExistingPathFetched,
    remove: resetExistingPath,
    isFetching: isExistingPathFetching,
  } = useExistingPathQuery(path, {
    enabled: false,
  });

  const existingMessage = useMemo(() => {
    return isExistingPathFetched
      ? isExistingPath
        ? "이미 등록된 짤이 있어요. 기존의 짤을 덮어씌웁니다."
        : "새로운 짤을 등록합니다."
      : undefined;
  }, [isExistingPath, isExistingPathFetched]);

  const [isPathValidating, setIsPathValidating] = useState(false);

  const handleOnChangePath = useCallback(
    debounce(() => {
      refetch();
      setIsPathValidating(false);
    }, 500),
    [],
  );

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
                value: /([-a-zA-Z0-9ㄱ-ㅎㅏ-ㅣ가-힣()@:%_\+.~&//=]*)/,
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
                  onChange={(e) => {
                    field.onChange(e);
                    const { value } = e.target;
                    if (!value) {
                      resetExistingPath();
                    } else {
                      setIsPathValidating(true);
                      handleOnChangePath();
                    }
                  }}
                  startAdornment={
                    <InputAdornment position="start">zzal.me/</InputAdornment>
                  }
                  endAdornment={
                    <InputAdornment position="end">
                      {
                        <CircularProgress
                          size={16}
                          sx={{
                            visibility:
                              isExistingPathFetching || isPathValidating
                                ? "visible"
                                : "hidden",
                          }}
                        />
                      }
                    </InputAdornment>
                  }
                  error={!!formState.errors.path}
                  disabled={isSubmitting}
                />
                <FormHelperText error={!!formState.errors.path?.message}>
                  {formState.errors.path?.message || existingMessage}
                </FormHelperText>
              </>
            )}
          />
        </FormControl>
        <FormControl fullWidth sx={{ m: 1 }} variant="standard">
          <Typography
            variant="caption"
            color="text.secondary"
            gutterBottom
            component="label"
          >
            이미지 *
          </Typography>
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
            render={({ field }) => <Input {...field} disabled={isSubmitting} />}
          />
        </FormControl>
        <Box
          sx={{
            display: "flex",
          }}
        >
          <Box sx={{ flexGrow: 1, pr: 0.5 }}>
            <Button
              onClick={handleOnReset}
              size="large"
              variant="outlined"
              fullWidth
              disabled={isSubmitting}
            >
              초기화
            </Button>
          </Box>
          <Box sx={{ flexGrow: 3, pl: 0.5 }}>
            <Button
              onClick={handleOnSubmit}
              variant="contained"
              size="large"
              fullWidth
              disabled={isSubmitting}
            >
              {isSubmitting ? "등록 중.." : "등록"}
            </Button>
          </Box>
        </Box>
      </Stack>
    </Box>
  );
};

export default RegistrationForm;
