// wagmi
'use client'
import { useBalance } from "wagmi";

// Redux
import { address } from '../../../GlobalRedux/Features/address/addressSlice'
import { RootState } from '../../../GlobalRedux/store'
import { useDispatch, useSelector } from 'react-redux'

export default function Balance() {

	const addressState = useSelector((state: RootState) => state.address.value);

	console.log("addressState", addressState)
	const result = useBalance({
		address: addressState,
		token: "0x9999f7Fea5938fD3b1E26A12c3f2fb024e194f97",
	});


	return (
		<div className="text-white">
			{result?.data?.formatted}
		</div>
	);
}