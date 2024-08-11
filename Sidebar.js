import React, { useState } from "react";

const categories = [
  {
    title: "Electronics",
    items: [
      { name: "Phones", subItems: ["Smartphones", "Feature Phones"] },
      { name: "Laptops", subItems: ["Gaming Laptops", "Ultrabooks"] },
    ],
  },
  {
    title: "Fashion",
    items: [
      { name: "Men", subItems: ["Shirts", "Trousers"] },
      { name: "Women", subItems: ["Dresses", "Tops"] },
    ],
  },
];

const Sidebar = () => {
  const [activeCategory, setActiveCategory] = useState(null);

  const handleCategoryClick = (index) => {
    setActiveCategory(index === activeCategory ? null : index);
  };

  return (
    <div className="w-64 bg-gray-100 h-full p-4">
      <h2 className="text-lg font-semibold mb-4">Categories</h2>
      <div>
        {categories.map((category, index) => (
          <div key={index}>
            <button
              className="w-full text-left px-4 py-2 font-medium text-gray-700 hover:bg-gray-200"
              onClick={() => handleCategoryClick(index)}
            >
              {category.title}
            </button>
            {activeCategory === index && (
              <div className="pl-4 fixed top-0 left-0 h-screen w-5xl bg-black">
                {/* Back button */}
                <button
                  className="w-full text-left rounded-2xl bg-blue-500 px-4 py-2 font-medium text-gray-700 hover:bg-gray-200"
                  onClick={() => handleCategoryClick(null)}
                >
                  Back
                </button>
                {category.items.map((item, itemIndex) => (
                  <div key={itemIndex}>
                    <h3 className="font-semibold text-gray-600 mt-2">
                      {item.name}
                    </h3>
                    <ul className="list-disc pl-6">
                      {item.subItems.map((subItem, subItemIndex) => (
                        <li key={subItemIndex} className="text-gray-500">
                          {subItem}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
