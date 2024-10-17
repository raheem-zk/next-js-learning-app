"use client"
import React, { useEffect, useState } from "react";
import {
  MdKeyboardArrowRight,
  MdOutlineKeyboardArrowLeft,
} from "react-icons/md";
import RatingStars from "../reusable/ratingStars";
// import { useMediaQuery } from "@react-hook/media-query";
import { productCardPriceFrom } from "../../utils/product/productCardPrice";
import { formatProductNameForUrl } from "../../utils/product/formatProductNameForUrl";
// import { getEachSubCategoryDataApi } from "../../api/subCategoryApi";
import { FaLocationDot } from "react-icons/fa6";
import { getPlaceName } from "../../utils/product/getPlaceName";
import { useDispatch, useSelector } from "react-redux";
// import { addOrUpdateSubCategoryData } from "../../redux/subCategory/allSubCategoryDataSlice";
import { differenceInHours } from "date-fns";
import Link from "next/link";

const HomeCategoryProductCard = ({ rental }) => {
  // const isMobile = useMediaQuery("(max-width: 768px)");
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showButtons, setShowButtons] = useState(false);
  const dispatch = useDispatch();

  const { allSubCategoryData } = useSelector((state)=>state.allSubCategory);

  const showNextImage = () => {
    if (Array.isArray(rental?.images)) {
      setCurrentImageIndex(
        (prevIndex) => (prevIndex + 1) % rental?.images.length
      );
    }
  };

  const showPrevImage = () => {
    if (Array.isArray(rental?.images)) {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === 0 ? rental?.images.length - 1 : prevIndex - 1
      );
    }
  };

  const [subCategoryData, setSubCategoryData] = useState(null);

  const getSubCategoryData = async () => {
    if(!rental?.subCategoryId) return;
    if(allSubCategoryData && allSubCategoryData?.length !== 0 ){
      const storedSubCategoryData = allSubCategoryData.find((subCategory) => subCategory?.data?._id == rental?.subCategoryId);

      if(storedSubCategoryData){
          const storedDate = new Date(storedSubCategoryData?.date);
          const currentDate = new Date();
          const hoursDifference = differenceInHours(currentDate, storedDate);
  
          if (hoursDifference <= 24) {
            setSubCategoryData(storedSubCategoryData?.data);
            return;
          }
      }
    }
    try {
      // const response = await getEachSubCategoryDataApi(rental?.subCategoryId);
      // if(response){
      //   const newSubCategoryData = {
      //     data: response,
      //     date: new Date(),
      //   };
      //   dispatch(addOrUpdateSubCategoryData(newSubCategoryData))
      //   setSubCategoryData(response);
      // }
    } catch (error) {
      console.error(error);
    }
  };
  const [cityName, setCityName] = useState(null);

  useEffect(() => {
    if (rental) {
      getSubCategoryData();
    }
    const locationAddress =
      rental?.locationData && rental?.locationData?.locationAddress
        ? rental?.locationData?.locationAddress
        : rental?.storeId?.locationAddress || "";
    setCityName(getPlaceName(locationAddress));
  }, [rental]);

  const [featuredFieldValue, setFeaturedFieldValue] = useState([]);

  useEffect(() => {
    if (subCategoryData && rental && subCategoryData?.customFields) {
      const val = subCategoryData?.customFields?.reduce((acc, customField) => {
        if (
          (customField?.type === "dropdown" ||
            customField?.type === "checkbox") &&
          customField.featuredField
        ) {
          const productField = rental?.customFields.find(
            (field) => field.name === customField.name
          );
          if (productField) {
            acc.push(...productField?.value);
          }
        }
        return acc;
      }, []);

      if (val?.length) {
        setFeaturedFieldValue(val.slice(0, 1)); // Limit the array to a maximum length of 2
      }
    }
  }, [subCategoryData, rental]);

  return (
    <>
      <div className="justify-center md:mr-2 items-center relative border p-2 rounded-md ">
        <div
          className="relative h-40 lg:h-56 xs:w-full  hover:cursor-pointer"
          onMouseEnter={() => setShowButtons(true)}
          onMouseLeave={() => setShowButtons(false)}
        >
          <Link href={`/rentals/product/${formatProductNameForUrl(rental?.name)}/${
              rental?._id
            }`}
          >
            <img
              src={
                Array.isArray(rental?.images)
                  ? rental?.images[currentImageIndex]?.replace(
                      "upload/",
                      "upload/w_450,q_auto,f_auto/"
                    )
                  : rental?.images?.replace(
                      "upload/",
                      "upload/w_450,q_auto,f_auto/"
                    )
              }
              loading="lazy"
              fetchpriority="medium"
              alt={`Rentals ${rental?.name}`}
              className="absolute inset-0 w-full lg:h-56 h-full object-contain rounded"
              style={{
                position: "absolute",
                top: "50%",
                transform: "translateY(-50%)",
                display: "block",
                margin: "0 auto",
              }}
            />
          </Link>
          {Array.isArray(rental?.images) && (
            <>
              {currentImageIndex > 0 && showButtons && (
                <button
                  onClick={showPrevImage}
                  className={`absolute left-0 top-1/2 transform -translate-y-1/2 text-gray-500 px-1 py-1 bg-white rounded-full ml-2 ${
                    showButtons ? "slide-in-left" : ""
                  }`}
                >
                  <MdOutlineKeyboardArrowLeft size={"20px"} />
                </button>
              )}
              {currentImageIndex < rental?.images.length - 1 && showButtons && (
                <button
                  onClick={showNextImage}
                  className={`absolute right-0 top-1/2 transform -translate-y-1/2 text-gray-500 px-1 py-1 bg-white rounded-full mr-2 ${
                    showButtons ? "slide-in-right" : ""
                  }`}
                >
                  <MdKeyboardArrowRight size={"20px"} />
                </button>
              )}
            </>
          )}
          {Array.isArray(rental?.images) && (
            <div
              className={`flex items-center justify-center absolute bottom-0 w-full mb-2 ${
                showButtons ? "opacity-100" : "opacity-0"
              }`}
            >
              {rental?.images.map((image, index) => (
                <div
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`w-1 h-1.5 mx-1 rounded-full ${
                    index === currentImageIndex ? "bg-gray-400" : "bg-white"
                  } cursor-pointer`}
                ></div>
              ))}
            </div>
          )}
        </div>
        <div className="p-1 text-black flex justify-between items-center">
          <div className="flex h-5 bg -red-400">
            <p className="font-normal lg:w-full text-sm overflow-hidden overflow-ellipsis underline">
              {rental?.name}
            </p>
          </div>
        </div>
        <div className="flex gap-2 flex-wrap">
          {featuredFieldValue &&
            featuredFieldValue?.length !== 0 &&
            featuredFieldValue.map((item, index) => {
              return (
                <div
                  key={index}
                  className="rounded-md text-xs px-2 border w-fit"
                >
                  {item}
                </div>
              );
            })}
        </div>
        {cityName && (
          <h1 className="text-md flex items-center gap-1 text-gray-500 py-1 overflow-hidden whitespace-nowrap">
            <FaLocationDot className="text-gray-700" />
            <span className="overflow-hidden text-ellipsis">{cityName}</span>
          </h1>
        )}
        <div className="pl-1 font-semibold text-sm">
          From ₹ {productCardPriceFrom(rental?.pricing)}
        </div>
        <div className="flex justify-start overflow-hidden items-center md:ga p-1">
          <RatingStars rating={rental?.rating} size={true ? 16 : 24} />
          <h3>({rental?.rating || 1})</h3>
        </div>
      </div>
    </>
  );
};

export default HomeCategoryProductCard;
