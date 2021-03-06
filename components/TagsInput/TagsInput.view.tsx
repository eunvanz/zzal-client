import {
  useCallback,
  useEffect,
  useState,
  forwardRef,
  useImperativeHandle,
  useMemo,
} from "react";
import { AddOutlined } from "@mui/icons-material";
import {
  Input,
  FormHelperText,
  Chip,
  Box,
  Typography,
  FormControl,
  InputLabel,
  IconButton,
  InputAdornment,
} from "@mui/material";
import { AnimatePresence, motion } from "framer-motion";
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

    const isMaxReached = useMemo(() => {
      return tags?.length === max;
    }, [max, tags?.length]);

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
                maxLength: { value: 50, message: "????????? ?????? ?????????." },
                validate: {
                  isExisting: (v: string) => {
                    return !tags.includes(v) || "?????? ????????? ???????????????.";
                  },
                },
              }}
              render={({ field, fieldState }) => (
                <>
                  <Input
                    {...field}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          onClick={onSubmit}
                          disabled={
                            field.value?.length === 0 || !!fieldState.error || disabled
                          }
                          type="submit"
                        >
                          <AddOutlined />
                        </IconButton>
                      </InputAdornment>
                    }
                    error={!!fieldState.error}
                    disabled={disabled || isMaxReached}
                    placeholder={isMaxReached ? "?????? ????????? ??????????????????." : undefined}
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
          <AnimatePresence>
            {tags.length === 0 ? (
              <motion.div
                initial={{
                  opacity: 0,
                  position: "absolute",
                }}
                animate={{
                  opacity: 1,
                  position: "relative",
                }}
                exit={{
                  opacity: 0,
                  position: "absolute",
                }}
              >
                <Typography
                  variant="body2"
                  sx={{
                    color: "text.secondary",
                    py: 1,
                  }}
                  component="i"
                >
                  ????????? ??? ?????? ????????? ????????? ??????????????????. (?????? {max}???)
                </Typography>
              </motion.div>
            ) : (
              tags.map((tag, index) => (
                <motion.div
                  key={tag}
                  initial={{
                    transform: "scale(0)",
                  }}
                  animate={{
                    transform: "scale(1)",
                  }}
                  exit={{
                    transform: "scale(0)",
                    position: index === 0 && tags.length === 1 ? "absolute" : undefined,
                  }}
                >
                  <Chip
                    sx={{ mr: 0.5, mb: 0.5 }}
                    key={tag}
                    label={tag}
                    onDelete={() => !disabled && handleOnDeleteTag(tag)}
                  />
                </motion.div>
              ))
            )}
          </AnimatePresence>
        </Box>
      </Box>
    );
  },
);

export default TagsInput;
