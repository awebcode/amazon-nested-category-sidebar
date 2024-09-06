"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MoveLeftIcon, MoveRightIcon, Trash } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
interface CategoryItem {
    name: string;
    subItems?: CategoryItem[];
}
const categories: CategoryItem[] = [
    {
        name: "Electronics",
        subItems: [
            {
                name: "Phones",
                subItems: [
                    { name: "Smartphones" },
                    { name: "Feature Phones" },
                ],
            },
            {
                name: "Laptops",
                subItems: [
                    { name: "Gaming Laptops" },
                    { name: "Ultrabooks" },
                ],
            },
        ],
    },
    {
        name: "Fashion",
        subItems: [
            {
                name: "Men",
                subItems: [
                    { name: "Shirts" },
                    { name: "Trousers" },
                ],
            },
            {
                name: "Women",
                subItems: [
                    { name: "Dresses", subItems: [{ name: "Casual" }, { name: "Formal" }] },
                    { name: "Tops" },
                ],
            },
        ],
    },
];

const Sidebar: React.FC = () => {
    const [currentCategoryName, setCurrentCategoryName] = useState("");
    const [history, setHistory] = useState<Array<{ items: CategoryItem[]; activeItem: CategoryItem | null }>>([
        { items: categories, activeItem: null },
    ]);


    const handleItemClick = (item: CategoryItem) => {
        if (item.subItems) {
            setCurrentCategoryName(item.name);
            setHistory([...history, { items: item.subItems, activeItem: item }]);
        }
    };

    const currentLevel = history[history.length - 1];
    const currentItems = currentLevel.items;


    // Back button logic
    const handleBackClick = () => {
        if (history.length > 1) {
            // Go back to the previous level
            const newHistory = history.slice(0, -1);
            setHistory(newHistory);

            // Find the parent category name based on the previous level's first item
            // const parentCategoryName = newHistory[newHistory.length - 1][0]?.name || "";
            const findParentCategory = (items: CategoryItem[], targetCategoryName: string): string => {
                for (const item of items) {
                    if (item.subItems && item.subItems.some(subItem => subItem.name === targetCategoryName)) {
                        return item.name;
                    }
                    if (item.subItems) {
                        const result = findParentCategory(item.subItems, targetCategoryName);
                        if (result) return result;
                    }
                }
                return "";
            };

            setCurrentCategoryName(findParentCategory(categories, currentCategoryName));
        }
    };



    // Handle breadcrumb click
    const handleBreadcrumbClick = (index: number) => {
        // Slice the history to the clicked breadcrumb's level
        const newHistory = history.slice(0, index + 1);
        setHistory(newHistory);

        // Update the current category name to the clicked breadcrumb's category
        const clickedCategory = newHistory[index].activeItem?.name || "";
        setCurrentCategoryName(clickedCategory);
    };
    // Breadcrumb data logic
    const getBreadcrumbTrail = () => {
        return history.map((level, index) => ({
            name: level.activeItem?.name || "Categories", // Show the category or "Categories" for the root
            isLast: index === history.length - 1,
        }));
    };
    return (
        <div className="relative min-w-80 max-w-[500px] m-4  bg-gray-100/30  backdrop-blur-lg rounded-xl ring-2 overflow-hidden  h-full p-4">

            <h2 className="text-xl text-gray-700 font-semibold mb-4">Categories {currentCategoryName ? "- " + currentCategoryName : ""} </h2>
            {/* Breadcrumbs */}
            <Breadcrumb>
                <BreadcrumbList>
                    {getBreadcrumbTrail().map((crumb, index) => (
                        <BreadcrumbItem key={index}>
                            <BreadcrumbLink

                                onClick={() => handleBreadcrumbClick(index)} // Pass the index as a prop(crumb)}
                                className={crumb.isLast ? "cursor-not-allowed hover:text-inherit" : "text-gray-600 hover:underline cursor-pointer"}
                            >
                                {crumb.name}
                            </BreadcrumbLink>
                            {!crumb.isLast && <BreadcrumbSeparator className="text-gray-400"></BreadcrumbSeparator>}

                        </BreadcrumbItem>
                    ))}
                </BreadcrumbList>
            </Breadcrumb>
            {/* End Breadcrumbs */}
            <AnimatePresence mode="wait">
                <motion.div
                    key={history.length} // Change key based on history length to trigger re-animation
                    initial={{ x: "100%" }}
                    animate={{ x: 0 }}
                    exit={{ x: "-100%" }}
                    transition={{ type: "tween", duration: 0.2 }}

                    className="space-y-2"
                >
                    {/* Back button (only show if we are not at the top level) */}
                    {history.length > 1 && (
                        <button
                            className="w-full text-left px-4 py-2 font-medium text-blue-500 hover:bg-gray-200"
                            onClick={handleBackClick}
                        >
                            <MoveLeftIcon className="inline-block mr-2" /> {currentCategoryName}
                        </button>
                    )}

                    {/* Display the current category items */}
                    {currentItems.map((item, index) => (
                        <button
                            key={index}
                            className="w-full text-left px-4 py-2 font-medium text-gray-700 hover:bg-gray-200"
                            onClick={() => handleItemClick(item)}
                        >
                            {item.name} {item.subItems && <MoveRightIcon size={16} className="inline-block ml-2 " />}
                        </button>
                    ))}
                </motion.div>
            </AnimatePresence>
        </div>
    );
};

export default Sidebar;
