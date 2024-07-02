import { useAtom } from "jotai";
import { emptyNotice, noticeAtom } from "../app/atoms";
import Modal from "./Modal/Modal";

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
            <button
              type="button"
              onClick={handleClose}
              className="my-5 px-8 py-3 font-semibold rounded bg-gray-800 dark:bg-gray-100 text-gray-100 hover:bg-green-500 dark:hover:bg-gray-700"
            >
              Fermer
            </button>
          </>
        </Modal>
      </div>
    );
  }
}
