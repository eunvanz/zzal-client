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
        ? "?????? ????????? ???????????????."
        : "?????? ????????? ???????????????."
      : undefined;
    if (message === "?????? ????????? ???????????????.") {
      formState.errors?.path?.type === "isExisting" && clearErrors("path");
    } else if (message === "?????? ????????? ???????????????.") {
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
        Alert.show({ content: "?????? ?????? ????????? ?????? ????????????." });
        return;
      }
      if (values.thumbnail) {
        await onSubmit(values);
        if (!content) {
          handleOnReset();
        }
      } else {
        setError("thumbnail", { message: "???????????? ??????????????????." });
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
        <Typography variant="h6">?????? ?????? ???????????? ????????????????</Typography>
        <FormControl fullWidth sx={{ m: 1 }} variant="standard">
          <InputLabel htmlFor="path">?????? *</InputLabel>
          <Controller
            name="path"
            control={control}
            defaultValue=""
            rules={{
              required: "????????? ??????????????????.",
              minLength: 1,
              maxLength: { value: 100, message: "????????? ?????? ?????????." },
              pattern: {
                value: /([-a-zA-Z0-9???-??????-??????-???()@:%_\+.~&//=]*)/,
                message: "???????????? ?????? ????????? ?????????????????????.",
              },
              validate: {
                hasSpace: (v: string) => !v.includes(" ") || "????????? ???????????? ?????????.",
                isRandom: (v: string) =>
                  !v.startsWith("??????") || "'??????'?????? ????????? ??? ?????????.",
                isForbidden: (v: string) =>
                  !FORBIDDEN_PATHS.includes(v) || "????????? ??? ?????? ????????????.",
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
            ????????? ??? ????????? *
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
          <InputLabel htmlFor="title">??????</InputLabel>
          <Controller
            name="title"
            control={control}
            defaultValue=""
            rules={{
              maxLength: {
                value: 100,
                message: "????????? ?????? ?????????.",
              },
            }}
            render={({ field }) => <Input {...field} disabled={isSubmitting} />}
          />
        </FormControl>
        <FormControl fullWidth sx={{ m: 1 }} variant="standard">
          <InputLabel htmlFor="description">????????????</InputLabel>
          <Controller
            name="description"
            control={control}
            defaultValue=""
            rules={{
              maxLength: {
                value: 255,
                message: "??????????????? ?????? ?????????.",
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
              label="??????"
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
              ?????????
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
                  ? "?????? ???.."
                  : "?????? ???.."
                : isModification
                ? "??????"
                : "??????"}
            </Button>
          </Box>
        </Box>
      </Stack>
    </Box>
  );
};

export default RegistrationForm;
