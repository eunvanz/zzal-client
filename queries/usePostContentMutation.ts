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
      const { file } = values;
      const image = await convertURLtoFile(values.thumbnail, path.extname(file!.name));
      newContentRef.current = {
        path: values.path,
        images: [image],
        description: values.description,
        title: values.title,
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
