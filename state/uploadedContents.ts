import { atom } from "recoil";
import { PreviewProps } from "~/components/Preview";
import { STATE_KEY } from "~/types";

const uploadedContentsState = atom<PreviewProps[]>({
  key: STATE_KEY.UPLOADED_CONTENTS,
  default: [],
});

export default uploadedContentsState;
