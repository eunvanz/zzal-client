import { useCallback, useEffect, useMemo, useState } from "react";
import { AutoFixHigh } from "@mui/icons-material";
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
  IconButton,
  Fade,
} from "@mui/material";
import { debounce, isEqual } from "lodash-es";
import { nanoid } from "nanoid";
import { Controller, useForm } from "react-hook-form";
import { FORBIDDEN_PATHS } from "~/constants/rules";
import useExistingPathQuery from "~/queries/useExistingPathQuery";
import { Content } from "~/types";
import Alert from "../Alert";
import SelectAndCrop from "../SelectAndCrop";
import TagsInput from "../TagsInput";

export interface RegistrationFormValues {
  title: string;
  path: string;
  thumbnail: string;
  description: string;
  imageFile?: File | null;
  tags: string;
}

export interface RegistrationFormProps {
  onChangeForm: (values: RegistrationFormValues) => void;
  onSubmit: (values: RegistrationFormValues) => Promise<void>;
  isSubmitting: boolean;
  content?: Content;
}

const RegistrationForm: React.FC<RegistrationFormProps> = ({
  onChangeForm,
  onSubmit,
  isSubmitting,
  content,
}) => {
  const defaultValues = useMemo(() => {
    return {
      title: content?.title || "",
      path: content?.path || "",
      thumbnail: content?.images[0].url || "",
      description: content?.description || "",
      tags: content?.tags.map((tag) => tag.name).join(",") || "",
      thumbnailFile: null,
      imageFile: null,
    };
  }, [
    content?.description,
    content?.images,
    content?.path,
    content?.tags,
    content?.title,
  ]);

  const isModification = useMemo(() => {
    return !!content;
  }, [content]);

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
    defaultValues,
  });

  const [selectAndCropKey, setSelectAndCropKey] = useState(0);

  const watchedValues = watch();

  const { path, title, description, thumbnail, tags } = watchedValues;

  const isModified = useMemo(() => {
    return !isEqual(
      {
        ...defaultValues,
        thumbnail: undefined,
      },
      { ...watchedValues, thumbnail: undefined },
    );
  }, [defaultValues, watchedValues]);

  const handleOnCropImage = useCallback(
    (image?: string) => {
      setValue("thumbnail", image || "");
      clearErrors("thumbnail");
    },
    [clearErrors, setValue],
  );

  const handleOnSelectImage = useCallback(
    (file?: File) => {
      setValue("imageFile", file);
    },
    [setValue],
  );

  useEffect(() => {
    onChangeForm({
      path,
      title,
      description,
      thumbnail,
      tags,
    });
  }, [description, onChangeForm, path, tags, thumbnail, title]);

  const {
    refetch,
    data: isExistingPath,
    isFetched: isExistingPathFetched,
    remove: resetExistingPath,
    isFetching: isExistingPathFetching,
  } = useExistingPathQuery(path, {
    enabled: false,
  });

  const handleOnReset = useCallback(() => {
    reset(defaultValues);
    setSelectAndCropKey((key) => ++key);
    resetExistingPath();
  }, [defaultValues, reset, resetExistingPath]);

  const existingMessage = useMemo(() => {
    const message = isExistingPathFetched
      ? (content ? isExistingPath && path !== content.path : isExistingPath)
        ? "이미 등록된 경로입니다."
        : "사용 가능한 경로입니다."
      : undefined;
    if (message === "사용 가능한 경로입니다.") {
      formState.errors?.path?.type === "isExisting" && clearErrors("path");
    } else if (message === "이미 등록된 경로입니다.") {
      setError("path", { type: "isExisting", message });
    }
    return message;
  }, [
    clearErrors,
    content,
    formState.errors?.path?.type,
    isExistingPath,
    isExistingPathFetched,
    path,
    setError,
  ]);

  const [isPathValidating, setIsPathValidating] = useState(false);

  const handleOnChangePath = useCallback(
    debounce(() => {
      refetch();
      setIsPathValidating(false);
    }, 500),
    [],
  );

  const handleOnGenerateAutoPath = useCallback(() => {
    const randomPath = nanoid(4);
    setValue("path", randomPath);
    setIsPathValidating(true);
    clearErrors("path");
    handleOnChangePath();
  }, [clearErrors, handleOnChangePath, setValue]);

  const handleOnSubmit = useCallback(async () => {
    await handleSubmit(async (values) => {
      if (isExistingPathFetching || isPathValidating) {
        Alert.show({ content: "아직 경로 유효성 검증 중이에요." });
        return;
      }
      if (values.thumbnail) {
        await onSubmit(values);
        if (!content) {
          handleOnReset();
        }
      } else {
        setError("thumbnail", { message: "이미지를 선택해주세요." });
      }
    })();
  }, [
    content,
    handleOnReset,
    handleSubmit,
    isExistingPathFetching,
    isPathValidating,
    onSubmit,
    setError,
  ]);

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
              required: "경로를 입력해주세요.",
              minLength: 1,
              maxLength: { value: 100, message: "경로가 너무 길어요." },
              pattern: {
                value: /([-a-zA-Z0-9ㄱ-ㅎㅏ-ㅣ가-힣()@:%_\+.~&//=]*)/,
                message: "허용되지 않은 문자가 포함되어있어요.",
              },
              validate: {
                hasSpace: (v: string) => !v.includes(" ") || "공백은 허용되지 않아요.",
                isRandom: (v: string) =>
                  !v.startsWith("랜덤") || "'랜덤'으로 시작할 수 없어요.",
                isForbidden: (v: string) =>
                  !FORBIDDEN_PATHS.includes(v) || "사용할 수 없는 경로예요.",
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
                      <Fade in={isExistingPathFetching || isPathValidating}>
                        <CircularProgress size={16} />
                      </Fade>
                      <IconButton
                        onClick={handleOnGenerateAutoPath}
                        disabled={isSubmitting}
                      >
                        <AutoFixHigh />
                      </IconButton>
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
            이미지 및 썸네일 *
          </Typography>
          <SelectAndCrop
            key={selectAndCropKey}
            onSelectImage={handleOnSelectImage}
            onCropImage={handleOnCropImage}
            errorMessage={formState.errors.thumbnail?.message}
            disabled={isSubmitting}
            defaultValue={defaultValues.thumbnail}
            isCropOnly
            fixedRatio={2 / 1}
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
                message: "제목이 너무 길어요.",
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
                message: "세부내용이 너무 길어요.",
              },
            }}
            render={({ field }) => <Input {...field} disabled={isSubmitting} />}
          />
        </FormControl>
        <Controller
          name="tags"
          control={control}
          render={({ field }) => (
            <TagsInput
              {...field}
              disabled={isSubmitting}
              max={10}
              label="태그"
              fullWidth
            />
          )}
        />
        <Box
          sx={{
            display: "flex",
            pt: 2,
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
              disabled={isSubmitting || !isModified}
            >
              {isSubmitting
                ? isModification
                  ? "수정 중.."
                  : "등록 중.."
                : isModification
                ? "수정"
                : "등록"}
            </Button>
          </Box>
        </Box>
      </Stack>
    </Box>
  );
};

export default RegistrationForm;
