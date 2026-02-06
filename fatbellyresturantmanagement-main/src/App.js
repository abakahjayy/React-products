import { extendTheme, ChakraProvider, Box, Text } from '@chakra-ui/react'
import {Switch,Route,BrowserRouter} from 'react-router-dom'
import Menu from './page/Menu';


function App() {
  return (
  
      <ChakraProvider>
        <BrowserRouter>   
        <Switch>
        <Route exact path ="/"><Menu/></Route>
        </Switch>
        </BrowserRouter>   
      </ChakraProvider>
  );
}

export default App;
