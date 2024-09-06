import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Category {
  title: string;
  items?: CategoryItem[];
}

interface CategoryItem {
  name: string;
  subItems?: string[] | CategoryItem[];
}

const categories: Category[] = [
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

const SidebarItem: React.FC<{
  item: CategoryItem;
  depthLevel: number;
}> = ({ item, depthLevel }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const hasSubItems = item.subItems && item.subItems.length > 0;

  // Animation variants for collapse and expand
  const variants = {
    collapsed: { height: 0, opacity: 0 },
    expanded: { height: "auto", opacity: 1 },
  };

  return (
    <div style={{ paddingLeft: `${depthLevel * 10}px` }}>
      <button
        className="w-full text-left px-4 py-2 font-medium text-gray-700 hover:bg-gray-200"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        {item.name}
      </button>

      {hasSubItems && (
        <AnimatePresence initial={false}>
          {isExpanded && (
            <motion.div
              initial="collapsed"
              animate="expanded"
              exit="collapsed"
              variants={variants}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              {item.subItems?.map((subItem, index) =>
                typeof subItem === "string" ? (
                  <div
                    key={index}
                    className="pl-4 text-gray-500"
                    style={{ paddingLeft: `${(depthLevel + 1) * 10}px` }}
                  >
                    {subItem}
                  </div>
                ) : (
                  <SidebarItem key={index} item={subItem} depthLevel={depthLevel + 1} />
                )
              )}
            </motion.div>
          )}
        </AnimatePresence>
      )}
    </div>
  );
};

const Sidebar: React.FC = () => {
  return (
    <div className="w-64 bg-gray-100 h-full p-4">
      <h2 className="text-lg font-semibold mb-4">Categories</h2>
      {categories.map((category, index) => (
        <div key={index}>
          <h3 className="font-bold text-gray-800">{category.title}</h3>
          {category.items?.map((item, itemIndex) => (
            <SidebarItem key={itemIndex} item={item} depthLevel={1} />
          ))}
        </div>
      ))}
    </div>
  );
};

export default Sidebar;
