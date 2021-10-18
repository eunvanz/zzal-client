import { useRef } from "react";
import path from "path";
import { useMutation, useQueryClient } from "react-query";
import api, { CreateContentDto } from "~/api";
import { RegistrationFormValues } from "~/components/RegistrationForm";
import { convertURLtoFile } from "~/helpers/imageHelpers";
import { QUERY_KEY } from "~/types";

const usePutContentMutation = (contentId?: number) => {
  const newContentRef = useRef<CreateContentDto | null>(null);

  const queryClient = useQueryClient();

  return useMutation(
    async (values: RegistrationFormValues) => {
      if (!contentId) return;
      const { file } = values;
      let image: File | null = null;
      if (file) {
        image = await convertURLtoFile(
          values.thumbnail,
          path.extname(file!.name.replace(".", "")),
        );
      }
      newContentRef.current = {
        path: values.path,
        images: image ? [image] : [],
        description: values.description,
        title: values.title,
        tags: values.tags,
      };
      return api.putContent(contentId, newContentRef.current);
    },
    {
      // TODO: refetch content
      onSuccess: () => {},
    },
  );
};

export default usePutContentMutation;