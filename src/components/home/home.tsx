"use client"
import React, { useState, useEffect } from "react";
import { getCategoryProductDataApi } from "@/api/categoryApi/categoryApi";
import HomeCategoryProductCard from "../card/homeCategoryProductCard";

const categoryData = {
  _id: "66f67e4f9ba73eca029c5494",
  mainCategoryId: "66f672e40e9a5a0798d905fd",
  mainCategoryName: "Jewellery Accessories",
  mainCategoryStatus: true,
  name: "Jewellery",
  image:
    "https://res.cloudinary.com/trydecgrandcafe/image/upload/v1726122490/zle8i16owbuaf8up2u82.jpg",
};

const HomeProducts = () => {
  const [productData, setProductData] = useState([]); // State to store product data
  const [loading, setLoading] = useState(true); // State to handle loading state

  // Fetch category products asynchronously
  const getCategoryProduct = async () => {
    try {
      const response = await getCategoryProductDataApi(categoryData?._id);
      setProductData(response); // Set the product data
    } catch (error) {
      console.error("Error fetching product data:", error); // Handle any errors
    } finally {
      setLoading(false); // Stop loading once data is fetched
    }
  };

  useEffect(() => {
    getCategoryProduct(); // Call the function to fetch product data on component mount
  }, []);

  if (loading) {
    return <p>Loading...</p>; // Show a loading message while data is being fetched
  }

  return (
    <div className="grid grid-cols-4 lg:grid-cols-5 gap-4">
      {productData && productData.length > 0 ? (
        productData.map((item, index) => (
          <HomeCategoryProductCard key={index} rental={item} />
        ))
      ) : (
        <p>No products available</p> // Show a message if there are no products
      )}
    </div>
  );
};

export default HomeProducts;
