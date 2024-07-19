import { useAtom } from "jotai";
import { emptyNotice, noticeAtom } from "../app/atoms";
import Modal from "./Modal/Modal";
import SubmitButton from "./userConnexion/SubmitButton";

export default function NoticeModal() {
  const [notice, setNotice] = useAtom(noticeAtom);

  const handleClose = () => {
    setNotice(emptyNotice);
  };

  if (notice.message) {
    return (
      <div>
        <Modal show={true} onClose={notice.onClose || handleClose} title={notice.title}>
          <>
            <p>{notice.message}</p>
            <SubmitButton onClick={handleClose} text='Fermer' type='button'/>
          </>
        </Modal>
      </div>
    );
  }
}
