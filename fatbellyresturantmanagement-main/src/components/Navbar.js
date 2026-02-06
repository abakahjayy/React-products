import React from 'react'
import { Menu, MenuButton, IconButton, Flex, Box, Spacer, Text } from '@chakra-ui/react';
import { FaCartPlus,FaDollarSign } from "react-icons/fa";

function Navbar(props) {
    return (
        <>
            <Flex p='2' borderBottom='1px'  borderColor='gray.100' bg={props.styleAColorHex} >
                <Box fontSize='2xl'  minW={'200px'} fontWeight='bold'>
                    <Text color={'white'}>
                    {props.companyName}
                    </Text>
                </Box>
            <Spacer/>
            <Box>
                <Menu>
                <MenuButton  m='2' as={IconButton} icon={<FaCartPlus />}  /> 
                <MenuButton  m='2' as={IconButton} icon={<FaDollarSign />}  />
                </Menu>
            </Box>    
            </Flex>   
        </>
    )
}

export default Navbar