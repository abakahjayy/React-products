import React from 'react'
import {
    Flex,
    Box,
    Image,
    useColorModeValue,
    Button,
  } from '@chakra-ui/react';

function IndividualItems(props) {
    
    return (
        <>
        <Flex mx={5} px={5} py={2} alignItems="center" justifyContent="center" >
        <Box
        m={2}
        p={2}
        maxW="250px"
        minW="250px"
        borderWidth="1px"
        rounded="lg"
        shadow="lg"
        position="relative">
              <Flex justifyContent="center" alignContent="center">
                <Box
              fontSize="xl"
              fontWeight="semibold"
              as="h4"
              lineHeight="tight">
                {props.item.name}
                </Box>
                </Flex>
                <Flex justifyContent="center" alignContent="center">
                {props.item.category}
                </Flex>
                <Flex justifyContent="center" alignContent="center">
                <Image
                 align={'center'}
                 alt={`Name of item`}
                 roundedTop="lg"
                 maxH='200px'
                 fit 
                    src={props.item.image}/>
                {/* </AspectRatio> */}
                </Flex>
                <Flex justifyContent="center" alignContent="center">
         
                <Box fontSize="xl" color={useColorModeValue('gray.800', 'white')}>
                {props.item.price} {props.currency}
                </Box>
                </Flex>
                <Flex justifyContent="center" alignContent="center">
                <Button onClick={()=>props.AddItemToTheCart(props.item)}  bg={props.styleAColorHex} color={'white'}>
                    Add to cart
                </Button>
                </Flex>
            </Box>
        </Flex>    
        </>
    )
}

export default IndividualItems