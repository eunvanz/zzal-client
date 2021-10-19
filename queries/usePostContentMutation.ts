import { useRef } from "react";
import path from "path";
import { useMutation } from "react-query";
import { useRecoilState } from "recoil";
import api, { CreateContentDto } from "~/api";
import { RegistrationFormValues } from "~/components/RegistrationForm";
import { convertURLtoFile } from "~/helpers/imageHelpers";
import uploadedContentsState from "~/state/uploadedContents";

const usePostContentMutation = () => {
  const [uploadedContents, setUploadedContents] = useRecoilState(uploadedContentsState);

  const newContentRef = useRef<CreateContentDto | null>(null);

  return useMutation(
    async (values: RegistrationFormValues) => {
      const { imageFile } = values;
      const thumbnailFile = await convertURLtoFile(
        values.thumbnail,
        path.extname(imageFile!.name).replace(".", ""),
        `${imageFile!.name}_thumbnail`,
      );
      newContentRef.current = {
        path: values.path,
        images: [thumbnailFile, imageFile!],
        description: values.description,
        title: values.title,
        tags: values.tags,
      };
      return api.postContent(newContentRef.current);
    },
    {
      onSuccess: async (_, values) => {
        setUploadedContents([
          ...uploadedContents,
          { ...newContentRef.current, thumbnail: values.thumbnail },
        ]);
      },
    },
  );
};

export default usePostContentMutation;
