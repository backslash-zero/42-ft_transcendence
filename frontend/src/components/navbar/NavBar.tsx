import React from 'react'

// Components
import NavBarButtonPrimary from		'../commons/buttons/NavBarButtonPrimary';
import { FiZap } from 'react-icons/fi'
//import NavBarButtonSecondary from 	'../commons/buttons/NavBarButtonSecondary'

// Hooks
import { useSelector, useDispatch } from 'react-redux'
import { logout } from '../../store/global/reducer'
import { useNavigate } from "react-router-dom";

const NavBar = () => {
	let navigate = useNavigate();
	const global = useSelector((state: any) => state.global)
	const dispatch = useDispatch()

	return (
		
		<div className="flex justify-between items-center w-full h-[112px] bg-slate-700"> 

			<div>
				<NavBarButtonPrimary cta="Play Now" icon={FiZap}/>
				{/* <NavBarButtonSecondary/> */}
			</div>

			<div>
				<button onClick={() => {navigate('profile')}}>{global.username}</button>
				<button onClick={() => {dispatch(logout())}}>Log out</button>
			</div>
	
		</div>
	)
}

export default NavBar