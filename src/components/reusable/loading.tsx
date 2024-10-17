// import React, { useEffect } from "react";
// import loadingGif from "../../assets/gif/loading.gif";
// import mobLoading from "../../assets/gif/mobLoading.gif";
// import { useMediaQuery } from "@react-hook/media-query";

// const Loading = () => {
//   const isMobile = useMediaQuery("(max-width: 768px)");

//   useEffect(() => {
//     // Preload both images
//     const preloadImages = [loadingGif, mobLoading];
//     preloadImages.forEach((src) => {
//       const img = new Image();
//       img.src = src;
//     });
//   }, []);

//   return (
//     <div className="fixed inset-0 flex items-center justify-center bg-gray-100 bg-opacity-30 pointer-events-none z-50">
//       <img
//         className="object-contain"
//         src={isMobile ? mobLoading : loadingGif}
//         alt="Loading animation"
//         loading="lazy"
//         decoding="async"
//         width={isMobile ? 40 : 80}
//         height={isMobile ? 40 : 80}
//       />
//     </div>
//   );
// };

// export default Loading;
