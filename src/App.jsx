import {
  Box,
  Flex,
  Heading,
  HStack,
  SimpleGrid,
  Text,
  useColorModeValue as mode,
} from "@chakra-ui/react";
import { useState, createContext } from "react";
import { SortbySelect } from "./SortBySelect";
import {
  CheckboxFilterPopover,
  PriceFilterPopover,
  LangFilterPopover,
  CountryFilterPopover,
  DurationFilterPopover,
} from "./Filter";
// import { MobileFilter } from "./MobileFilter";
import { products } from "./_data";
import { Applications } from "./Applications";
import ReactPaginate from "react-paginate";

export const ProductsContext = createContext();
function App() {
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [page, setPage] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(6);

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = filteredProducts.slice(
    indexOfFirstPost,
    indexOfLastPost
  );

  const paginate = ({ selected }) => {
    setCurrentPage(selected + 1);
  };

  const sortChange = (value) => {
    if (value === "application-deadline") {
      const newSorted = [...filteredProducts];
      newSorted.sort((a, b) => {
        return (
          new Date(a.applicationDeadline) - new Date(b.applicationDeadline)
        );
      })
      setFilteredProducts(newSorted);
    } else if (value === "low-to-high") {
      const newSorted = [...filteredProducts];
      newSorted.sort((a, b) => {
        return a.price - b.price;
      });
      setFilteredProducts(newSorted);
    } else if (value === "high-to-low") {
      const newSorted = [...filteredProducts];
      newSorted.sort((a, b) => {
        return b.price - a.price;
      });
      setFilteredProducts(newSorted);
    }
  };

  return (
    <ProductsContext.Provider value={setFilteredProducts}>
      <Box
        maxW="7xl"
        mx="auto"
        px={{
          base: "4",
          md: "8",
          lg: "12",
        }}
        py={{
          base: "6",
          md: "8",
          lg: "12",
        }}
      >
        <Heading
          size="lg"
          mt={{
            base: "6",
            md: "10",
          }}
          mb="8"
        >
          Applications
        </Heading>

        <Flex
          justify="space-between"
          align="center"
          display={{
            base: "none",
            md: "flex",
          }}
        >
          <HStack spacing="6">
            <Text
              color={mode("gray.600", "gray.400")}
              fontWeight="medium"
              fontSize="sm"
            >
              Filter by
            </Text>
            <SimpleGrid display="inline-grid" spacing="4" columns={5}>
              <LangFilterPopover />
              <CountryFilterPopover />
              <PriceFilterPopover />
              <CheckboxFilterPopover />
              <DurationFilterPopover />
            </SimpleGrid>
          </HStack>

          <HStack flexShrink={0}>
            <Text
              as="label"
              htmlFor="sort-by"
              color={mode("gray.600", "gray.400")}
              fontWeight="medium"
              fontSize="sm"
              whiteSpace="nowrap"
            >
              Sort by
            </Text>
            <SortbySelect onChange={sortChange} />
          </HStack>
        </Flex>

        {/* <MobileFilter /> */}

        <Applications apps={currentPosts} page={page} />
        <ReactPaginate
          onPageChange={paginate}
          pageCount={Math.ceil(filteredProducts.length / postsPerPage)}
          previousLabel={"Prev"}
          nextLabel={"Next"}
          containerClassName={"pagination"}
          pageLinkClassName={"page-number"}
          previousLinkClassName={"page-number"}
          nextLinkClassName={"page-number"}
          activeLinkClassName={"active"}
        />
      </Box>
    </ProductsContext.Provider>
  );
}

export default App;
