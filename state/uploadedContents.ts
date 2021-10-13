import { atom } from "recoil";
import { Content, STATE_KEY } from "~/types";

const uploadedContentsState = atom<Content[]>({
  key: STATE_KEY.UPLOADED_CONTENTS,
  default: [],
});

export default uploadedContentsState;
