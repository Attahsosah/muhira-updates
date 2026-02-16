import React, { useEffect, useState } from 'react'

import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import { MdDelete, MdEdit } from "react-icons/md";
import { useSession } from 'next-auth/react';

function AdminModal() {
    const { data: session } = useSession()
    const [adminOpen, setAdminOpen] = useState(false);

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
      
        setAdminOpen(false);
      };

      const style = {
        position: 'absolute',
        top: '40%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        boxShadow: 24,
        p: 4,
      
      
      }
  

      useEffect(() => {
        if(session){
            setAdminOpen(true)
        }
      },[session])
      
    return (
    <Modal 
    open={adminOpen}
    onClose={handleClose}
    aria-labelledby="modal-modal-title"
    aria-describedby="modal-modal-description"
    >
      <Box 
      sx={style}
      className="bg-black bg-opacity-75 focus:outline-none"
      >
       <div className="block">
         <div className="flex justify-center">
            <div className="block">
                <p className="text-gray-200 text-center font-serif">Welcome {session?.user.name}</p>
                <h5 className="font-serif font-bold  text-gray-300">You have activated admin mode!</h5>

            </div>
         </div>
           <div>
             <p className="text-thin text-sm font-serif text-gray-200">You can now edit various features of your website, such as the menu</p>
           </div>

           <div className="flex items-center mt-[16px]">
             <p className="text-thin text-sm font-serif text-gray-200">Simply scroll to a section that you would like to edit, and click the Edit button</p>
             <MdEdit className="text-green-400 text-[32px]"/>
           </div>


           <div className="flex items-center mt-4">
             <p className="text-thin text-sm font-serif text-gray-200">You can also delete some sections if you like. Simply press the delete button</p>
             <MdDelete className="text-red-400 text-[32px]"/>
           </div>


           <div className="flex justify-center mt-4">
             <p className="text-thin text-lg font-serif text-coolYellow">Have fun!</p>
           </div>
       </div>
      </Box>

    </Modal>
    )
}

export default AdminModal