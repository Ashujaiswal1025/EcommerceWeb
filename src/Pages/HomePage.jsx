import React, { useEffect, useState } from "react";
import ProductBanner from "../components/ProductBanner";
import shoe from "../assets/shoe.jpg";
import pod from "../assets/pod.jpg";
import grocery from "../assets/grocery.webp";
import phone from "../assets/apple-12.jpg";
import dress from "../assets/women-dress.webp";
import ShortBanner from "../components/ShortBanner";

function HomePage() {
  const [active, setActive] = useState(0);
 // const [data, setData] = useState(null);



  const prod1 = [
    {
      image: shoe,
      title: "Shoes",
      category: "mens-shoes",
      des: "UP TO 40% OFF",
    },
    {
      image: grocery,
      title: "Groceries",
      category: "groceries",
      des: "UP TO 50% OFF",
    },
    {
      image: phone,
      title: "SmartPhone",
      category: "smartphones",
      des: "Flat 30% OFF",
    },
    {
      image: dress,
      title: "Women Dresses",
      category: "womens-dresses",
      des: "UP TO 25% OFF",
    },
  ];

  const prod2 = [
    {
      image:
        "https://www.titan.co.in/dw/image/v2/BKDD_PRD/on/demandware.static/-/Sites-titan-master-catalog/default/dw782a5c1a/images/Titan/Catalog/1733KL03_1.jpg?sw=360&sh=360",
      title: "Men's Watches",
      category: "mens-watches",
      des: "From Rs 15000",
    },
    {
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQi1SI3gu97CrqTvQpUStPRrmNiVdHmYxjrfqKeRKKREPrTMy_Ug3E2D8aaBX3ohbOz7wA&usqp=CAU",
      title: "Gadget",
      category: "electronics",
      des: "UP TO 5000rs",
    },
    {
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQotLmflRiF4eqyZSgBpgEA3gziqF0A-KTWCw&s",
      title: "Women's Watches",
      category: "womens-watches",
      des: "Starting at Rs.3500",
    },
    {
      image:
        "https://saudewala.in/cdn/shop/collections/Laptop.jpg?v=1732216115&width=1296",
      title: "Laptops",
      category: "laptops",
      des: "UP TO 25% OFF",
    },
  ];

  const shortappliance = [
    {
      image: shoe,
      title: "Nike Red Sneaker",
      des: "UP TO 40% OFF",
    },
    {
      image: pod,
      title: "Apple earpod",
      des: "UP TO 50% OFF",
    },
    {
      image: phone,
      title: "SmartPhone",
      des: "Flat 30% OFF",
    },
    {
      image: dress,
      title: "Women Dresses",
      des: "UP TO 25% OFF",
    },
  ];

  const imagesbanner = [
    "https://www.cbazaar.com/blog/wp-content/uploads/2023/11/Blog_Banner_Nov02_04.jpg",
    "https://d3jmn01ri1fzgl.cloudfront.net/photoadking/webp_thumbnail/gallery-and-gallery-men-clothing-banner-template-n6a070249c995f.webp",
    "https://t4.ftcdn.net/jpg/03/06/69/49/360_F_306694930_S3Z8H9Qk1MN79ZUe7bEWqTFuonRZdemw.jpg",
  ];

  useEffect(() => {
    const timer = setTimeout(() => {
      setActive((ev) => (ev + 1) % imagesbanner.length);
    }, 5000);

    return () => clearTimeout(timer);
  }, [active]);

  return (
    <>
      <div className="py-5">
        <div
          id="default-carousel"
          className="relative w-full"
          data-carousel="slide"
        >
          {/* Carousel wrapper */}
          <div className="relative h-[500px] overflow-hidden rounded-lg">
            {imagesbanner.map((img, index) => (
              <div
                key={index}
                className={`${
                  index === active ? "block" : "hidden"
                } duration-500 ease-in-out`}
              >
                <img
                  src={img}
                  alt={`banner ${index + 1}`}
                  className="absolute block w-full h-full "
                />
              </div>
            ))}
          </div>
          <div className="absolute z-30 flex -translate-x-1/2 bottom-5 left-1/2 space-x-3">
            {imagesbanner.map((_, index) => (
              <button
                key={index}
                onClick={() => setActive(index)}
                className={`w-2.5 h-2.5 rounded-full ${
                  active === index ? "bg-white" : "bg-gray-400"
                }`}
              ></button>
            ))}
          </div>
        </div>

        <ProductBanner title="Best deals on products" products={prod1} />
        <ProductBanner title="Top deals on electronics" products={prod2} />

        <div className="grid grid-cols-3 py-4 px-3 gap-5 mt-3 mb-7 mx-3">
          <ShortBanner
            title="Best Deals on Electronic"
            products={shortappliance}
          />
          <ShortBanner title="Fashion on top" products={shortappliance} />
          <ShortBanner title="Fashion on top" products={shortappliance} />
        </div>
      </div>
    </>
  );
}

export default HomePage;
