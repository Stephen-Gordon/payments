import { useState } from "react";
//import Modal from "../Modal/Modal";
export default function Send () {
   /*  const [modal, setModal] = useState(false)

    const onClose = () => {
        setModal(false)
    } */
    return (
			<>
				<button
					onClick={() => {
						//setModal(true);
					}}
					className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
				>
					Send
				</button>
				
			</>
		);
}