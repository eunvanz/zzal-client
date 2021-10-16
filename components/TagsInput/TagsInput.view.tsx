import {
  useCallback,
  useEffect,
  useState,
  forwardRef,
  useImperativeHandle,
  useMemo,
} from "react";
import {
  Input,
  FormHelperText,
  Button,
  Chip,
  Box,
  Typography,
  FormControl,
  InputLabel,
} from "@mui/material";
import { Controller, useForm } from "react-hook-form";

export interface TagsInputProps {
  max: number;
  onChange: (value: string) => void;
  name?: string;
  onBlur?: VoidFunction;
  value?: string;
  disabled?: boolean;
  label?: string;
  fullWidth?: boolean;
}

const TagsInput: React.FC<TagsInputProps> = forwardRef(
  ({ max, onChange, name, onBlur, value, disabled, label, fullWidth }, ref) => {
    const valueArray = useMemo(() => {
      return value?.length ? value.split(",") : [];
    }, [value]);

    const { control, handleSubmit, reset } = useForm<{ tag: string }>({
      mode: "onChange",
    });

    const [tags, setTags] = useState<string[]>(valueArray || []);

    useImperativeHandle(
      ref,
      () => ({
        name,
        onBlur,
        value: tags,
        onChange: setTags,
      }),
      [name, onBlur, tags],
    );

    useEffect(() => {
      valueArray && setTags(valueArray);
    }, [value, valueArray]);

    const onSubmit = useCallback(async () => {
      await handleSubmit(async (values) => {
        const { tag } = values;
        if (tag) {
          const newTags = [...tags, tag];
          setTags(newTags);
          onChange(newTags.join(","));
          reset({ tag: "" });
        }
      })();
    }, [handleSubmit, onChange, reset, tags]);

    const handleOnDeleteTag = useCallback(
      (value: string) => {
        const newTags = tags.filter((tag) => tag !== value);
        setTags(newTags);
        onChange(newTags.join(","));
      },
      [onChange, tags],
    );

    return (
      <Box>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            onSubmit();
          }}
        >
          <FormControl variant="standard" fullWidth={fullWidth}>
            {label && <InputLabel>{label}</InputLabel>}
            <Controller
              name="tag"
              control={control}
              defaultValue=""
              rules={{
                minLength: 1,
                maxLength: { value: 50, message: "태그가 너무 길어요." },
                validate: {
                  isExisting: (v: string) => {
                    return !tags.includes(v) || "이미 추가된 태그입니다.";
                  },
                },
              }}
              render={({ field, fieldState }) => (
                <>
                  <Input
                    {...field}
                    endAdornment={
                      <Button
                        onClick={onSubmit}
                        variant="outlined"
                        size="small"
                        disabled={
                          field.value?.length === 0 || !!fieldState.error || disabled
                        }
                        sx={{ mb: 1 }}
                        type="submit"
                      >
                        추가
                      </Button>
                    }
                    sx={{
                      display: tags?.length === max ? "none" : undefined,
                    }}
                    error={!!fieldState.error}
                    disabled={disabled}
                  />
                  <FormHelperText error>{fieldState.error?.message}</FormHelperText>
                </>
              )}
            />
          </FormControl>
        </form>
        <Box
          sx={{
            display: "flex",
            justifyContent: "start",
            flexWrap: "wrap",
            p: 0,
            m: 0,
            mt: 0.5,
          }}
        >
          {tags.length === 0 ? (
            <Typography variant="body2" sx={{ color: "text.secondary" }} component="i">
              검색이 잘 될수 있도록 태그를 추가해주세요. (최대 {max}개)
            </Typography>
          ) : (
            tags.map((tag) => (
              <Chip
                sx={{ mr: 0.5 }}
                key={tag}
                label={tag}
                onDelete={() => !disabled && handleOnDeleteTag(tag)}
              />
            ))
          )}
        </Box>
      </Box>
    );
  },
);

export default TagsInput;
