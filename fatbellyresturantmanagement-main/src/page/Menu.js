import { Box, Button, Flex,
    Image,} from '@chakra-ui/react';
import React from 'react';

import { resturantInfo } from '../data/ResturantInfo';
import { categories } from '../data/Categories';
import { menuList } from '../data/MenuList';

import Navbar from '../components/Navbar';
import IndividualItems from '../components/IndividualItems';
import CategoriesItems from '../components/CategoriesItems';



export default function Menu() {
  return (
    <>
        <Navbar companyName={resturantInfo.name} styleAColorHex={'#FF2C55'} />   
         <Flex justifyContent="center" alignContent="center" my={2}>
            <Image minW={"300px"} maxW={"300px"}  src={resturantInfo.logo}/>
            </Flex>
            <CategoriesItems styleAColorHex={'#FF2C55'}  uniqueCategory={categories.categories}/>
           <Flex flexWrap='wrap' m='5'  justifyContent='center'  borderColor='gray.100' alignContent={"center"}>
             
           {menuList.items.map((item,index)=>(
                    <Box key={index}>
                        <IndividualItems currency={"SGD"}  item={item} styleAColorHex={'#FF2C55'} />
                    </Box>           
                ))}  


         </Flex>
         <Flex flexWrap='wrap' m='5'  alignContent={"center"}>
        <Button bg={'grey'} color='white' onClick={()=>{}}>
                 
                    Back
                </Button> 
                </Flex>
    </>
  );
}
