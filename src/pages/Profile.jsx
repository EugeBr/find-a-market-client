import { useState, useEffect} from "react";
import {Text, Box, Center, SimpleGrid, Grid, useColorModeValue, Avatar, AvatarGroup, Flex} from '@chakra-ui/react';
import '../styles/profile.css';
import DisplayMyMarket from "../components/DisplayMyMarket/DisplayMyMarket";
import service from '../services/apiHandler';
import OneMarketSmall from "../components/OneMarket/OneMarketSmall"
const Profile = () => {
	const [followedUsers, setFollowedUsers] = useState([])
	const [myMarkets, setMyMarkets] = useState([]);
	const getMyMarkets = async () => {
		const response = await service.myMarkets();
		const res = await service.get('/profile/followed')
		console.log(res.data.savedList)
		setMyMarkets(response)
		setFollowedUsers(res.data.savedList)

	}
	
	useEffect(() => {
		getMyMarkets();
	}, []);
	

	return (
		<>
		<Box height='80vh'>
			
			<Center><Text mt='6vh' fontSize='2xl'>My Markets</Text></Center>
		{<SimpleGrid
		bg={useColorModeValue('white', 'gray.700')}
					minChildWidth='10rem'
					spacing='5px'
					className="listMarkets"
					pb={'4rem'}
					px={'3rem'}
					pt={'3rem'}>
		
		
		{myMarkets?.map((market) =>{
			return(
				<OneMarketSmall
								{...market}
								key={market._id}
								id={market._id}
								name={market.name}
							/>
			)
		})}

		</SimpleGrid>}
		
		</Box>

		<Box height='14vh'>
			<Center ><Text  fontSize='2xl'>Users following</Text></Center>
			{/* <Grid
			bg={useColorModeValue('white', 'gray.700')}
					minChildWidth='5vw'
					templateColumns={'repeat(5,1fr)'}
					auto-fit
					spacing='5px'
					className="users"
					pb={'2rem'}
					px={'2rem'}
					pt={'1rem'}
					
			> */}
			<AvatarGroup>

				{followedUsers?.map((user)=>{
					return(
						
						<Avatar
							size='lg'
							mt="0px"
							src={user.profilePicture}
							/>
						
					)
				})}
			</AvatarGroup>
			{/* </Grid> */}
		</Box>
		</>
	)
}

export default Profile
