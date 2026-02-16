import { useContext, useEffect, useState } from "react";
import { DeleteContext, DeleteIdContext, DeleteNameContext, DeleteTypeContext, DoneContext } from "./context/CrudContext";
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../../firestore";

export default function ConfirmDeleteModal() {
    const [deleteOpen, setDeleteOpen] = useContext(DeleteContext);
    const [deleteId, setDeleteId] = useContext(DeleteIdContext);
    const [deleteType, setDeleteType] = useContext(DeleteTypeContext)
    const [deleteName, setDeleteName] = useContext(DeleteNameContext)
    const [done, setDone] = useContext(DoneContext);
    const confirmDelete = async () => {
        const deleteRef = doc(db, `${deleteName}`, deleteId);
        await deleteDoc(deleteRef);

        console.log("Document succesfully deleted!");
        setDone(true);
        setDeleteOpen(false);

        try {
              const deleteRef = doc(db, `${deleteName}`, deleteId);
              await deleteDoc(deleteRef);
            
              console.log('Document successfully deleted!');
            } catch (error) {
              console.error('Error deleting document:', error);
            }

    }
    useEffect(() => {
        console.log("Open ?", deleteOpen)
        },[deleteOpen])
  return (
    <>
    
      {deleteOpen ? (
        <>
          <div
            className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
          >
            <div className="relative w-auto my-6 mx-auto max-w-sm">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                  <h3 className="text-3xl font-semibold">
                    Confirm Deletion
                  </h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setDeleteOpen(false)}
                  >
                    <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>
                {/*body*/}
                <div className="relative p-6 block ">
                    <p className="text-center">Are You sure you want to Delete this {deleteType}?</p>
                    {/* <div className="flex justify-center space-x-[10px] mt-[10px]" >
                        <button className="text-red-400 cursor-pointer">Confirm</button>
                        <button className="text-gray-700 cursor-pointer">Cancel</button>


                    </div> */}

                </div>
                {/*footer*/}
                <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => {setDeleteOpen(false); setDeleteId("")}}
                  >
                    Close
                  </button>
                  <button
                    className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={confirmDelete}
                  >
                    Confirm
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  );
}