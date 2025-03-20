import NavBar from "@/components/NavBar";
import { Grid, GridItem } from "@chakra-ui/react";
import Home from "./Home";

function HomeGird() {
    return (
        <Grid
            templateAreas={`"header header"
                            "nav main"
                            "nav footer"`}
            gridTemplateRows={'50px 1fr 50px'}
            gridTemplateColumns={'1fr 5fr'}
            h='100vh'
            gap='1'
            color='blackAlpha.700'
            fontWeight='bold'
            >
            <GridItem pl='2' area={'header'}>
                <NavBar />
            </GridItem>
            <GridItem pl='2' bg='pink.300' area={'nav'}>
                Nav
            </GridItem>
            <GridItem pl='2' area={'main'}>
                <Home />
            </GridItem>
            <GridItem pl='2' bg='blue.300' area={'footer'}>
                Footer
            </GridItem>
        </Grid>
    );
}

export default HomeGird;