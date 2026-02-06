import { ProductsContainer } from "../components/ProductsContainer.jsx";
import { useState, useEffect, useRef } from "react";
import { useFetchProducts } from "../utils/hooks/useFetchProducts.js";

export function Generals() {
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [searchItems, setSearchItems] = useState([]);
    const searchBarRef = useRef(null);
    const searchButtonRef = useRef(null);
    const { userData, loading, error } = useFetchProducts();

    // Load search items from localStorage
    const loadFromStorage = () => {
        const storedItems = JSON.parse(localStorage.getItem("searchItems")) || [];
        setSearchItems(storedItems);
        console.log("Loaded from storage:", storedItems);
    };

    // Save search items to localStorage
    const saveToStorage = (items) => {
        localStorage.setItem("searchItems", JSON.stringify(items));
        console.log("Saved to storage:", items);
    };

    // Perform search and update filtered products
    const performSearch = (query) => {
        console.log("Performing search for:", query);
        const searched = products.filter((product) =>
            product.keywords.some((keyword) => keyword.includes(query))
        );
        console.log("Search Results:", searched);
        setFilteredProducts(searched);
    };

    // Update URL with search query
    const updateURL = (query) => {
        const baseURL = "/My-Code/amazon.html";
        const newURL = `${baseURL}?search=${encodeURIComponent(query)}`;
        window.history.pushState({}, "", newURL);
        console.log("Updated URL:", newURL);
    };

    // Handle search on button click or Enter key
    const handleSearch = () => {
        const query = searchBarRef.current.value.trim().toLowerCase();
        console.log("Search Query:", query);
        if (!query) return;

        const updatedSearchItems = [query];
        setSearchItems(updatedSearchItems);
        saveToStorage(updatedSearchItems);
        updateURL(query);
        performSearch(query);
    };

    // Fetch products on initial load and handle errors
    useEffect(() => {
        console.log("Fetched Data:", userData);
        if (!error && userData?.products?.length > 0) {
            setProducts(userData.products);
            setFilteredProducts(userData.products); // Initialize filtered products
        }
    }, [userData, error]);

    // Initialize search logic and event listeners
    useEffect(() => {
        loadFromStorage();

        const searchBar = searchBarRef.current;
        const searchButton = searchButtonRef.current;

        // Parse query from URL if present
        const urlParams = new URLSearchParams(window.location.search);
        const query = urlParams.get("search");
        if (query) {
            searchBar.value = query;
            performSearch(query.toLowerCase());
        }

        // Event listener for search button and Enter key
        const handleKeyDown = (event) => {
            if (event.key === "Enter") handleSearch();
        };

        searchButton.addEventListener("click", handleSearch);
        searchBar.addEventListener("keydown", handleKeyDown);

        return () => {
            // Cleanup event listeners
            searchButton.removeEventListener("click", handleSearch);
            searchBar.removeEventListener("keydown", handleKeyDown);
        };
    }, [products]);

    return (
        <div>
            <div style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
                <input
                    type="text"
                    placeholder="Search products..."
                    ref={searchBarRef}
                    aria-label="Search products"
                    style={{ flex: 1, padding: "10px", fontSize: "16px" }}
                />
                <button
                    ref={searchButtonRef}
                    style={{
                        padding: "10px 20px",
                        fontSize: "16px",
                        backgroundColor: "#007BFF",
                        color: "white",
                        border: "none",
                        borderRadius: "5px",
                        cursor: "pointer",
                    }}
                >
                    Search
                </button>
            </div>

            {loading && <p>Loading products...</p>}
            {error && <p>Error loading products. Please try again.</p>}

            {!loading && filteredProducts.length === 0 && (
                <p style={{ textAlign: "center", fontSize: "20px" }}>
                    No products found.
                </p>
            )}

            {!loading && filteredProducts.length > 0 && (
                <ProductsContainer products={filteredProducts} />
            )}
        </div>
    );
}
