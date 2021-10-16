import { useCallback, useEffect, useState, forwardRef, useImperativeHandle } from "react";
import { Input, FormHelperText, Button, Chip, Box, Typography } from "@mui/material";
import { Controller, useForm } from "react-hook-form";

export interface TagsInputProps {
  max: number;
  onChange: (value: string[]) => void;
  name?: string;
  onBlur?: VoidFunction;
  value?: string[];
}

const TagsInput: React.FC<TagsInputProps> = forwardRef(
  ({ max, onChange, name, onBlur, value }, ref) => {
    const { control, handleSubmit, reset } = useForm<{ tag: string }>({
      mode: "onChange",
    });

    const [tags, setTags] = useState<string[]>(value || []);

    useImperativeHandle(
      ref,
      () => ({
        name,
        value: tags,
        onBlur,
      }),
      [name, onBlur, tags],
    );

    useEffect(() => {
      onChange(tags);
    }, [onChange, tags]);

    useEffect(() => {
      value && setTags(value);
    }, [value]);

    const onSubmit = useCallback(async () => {
      await handleSubmit(async (values) => {
        const { tag } = values;
        if (tag) {
          setTags((tags) => [...tags, tag]);
          reset({ tag: "" });
        }
      })();
    }, [handleSubmit, reset]);

    const handleOnDeleteTag = useCallback((value: string) => {
      setTags((tags) => tags.filter((tag) => tag !== value));
    }, []);

    return (
      <>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            onSubmit();
          }}
        >
          <Controller
            name="tag"
            control={control}
            defaultValue=""
            rules={{
              minLength: 1,
              maxLength: { value: 50, message: "태그가 너무 길어요" },
              validate: {
                isExisting: (v: string) => {
                  return !tags.includes(v) || "이미 추가된 태그예요";
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
                      disabled={field.value?.length === 0 || !!fieldState.error}
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
                />
                <FormHelperText error>{fieldState.error?.message}</FormHelperText>
              </>
            )}
          />
        </form>
        <Box
          component="ul"
          sx={{
            display: "flex",
            justifyContent: "start",
            flexWrap: "wrap",
            p: 0,
            m: 0,
            mt: 1,
          }}
        >
          {tags.length === 0 ? (
            <Typography variant="body2" sx={{ color: "text.secondary" }} component="i">
              태그를 추가하시면 검색이 쉬워져요
            </Typography>
          ) : (
            tags.map((tag) => (
              <Chip
                sx={{ mr: 0.5 }}
                key={tag}
                label={tag}
                onDelete={() => handleOnDeleteTag(tag)}
              />
            ))
          )}
        </Box>
      </>
    );
  },
);

export default TagsInput;
