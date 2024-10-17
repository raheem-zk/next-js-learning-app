import userAxios from "@/lib/axios/axios";

export const getCategoryDataApi = async () =>{
    const response = await userAxios.get('/get_category');
    return response.data.categoryData ?? [];
}

export const getCategoryProductDataApi = async (categoryId)=>{
    const response = await userAxios.get(`/get_category/${categoryId}/product`);
    return response.data?.productData ?? [];
}

export const addProductGetCategoryDataApi = async (userId,serviceType, serviceTypeId )=>{
    const response = await userAxios.get(`/store/add_product/get_category/${userId}/${serviceType}/${serviceTypeId}`);
    return response.data.categoryData ?? [];
}

// export const getCategorySubCategoryAndProductApi = async (categoryId )=>{
//     const response = await userAxios.get(`/category_subcategory_products/${categoryId}`);
//     return response?.data;
// }

export const getAllCategoryApi = async (mainCategoryId)=>{
    const response = await userAxios.get(`/get_categories/${mainCategoryId}`);
    return response.data?.categoryData;
}