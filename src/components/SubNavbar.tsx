import React, { useState, useEffect, useRef } from "react";

const SubNavbar = () => {
  const [openCategory, setOpenCategory] = useState(null); // Track the open category
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); // Track mobile menu state
  const navbarRef = useRef(null); // Reference to the navbar to detect clicks outside

  // Categories and subcategories data
  const categories = [
    {
      name: "Technology",
      subcategories: ["Web Development", "Mobile Development", "AI & Machine Learning"],
    },
    {
      name: "Health",
      subcategories: ["Fitness", "Nutrition", "Mental Health"],
    },
    {
      name: "Finance",
      subcategories: ["Personal Finance", "Investing", "Cryptocurrency"],
    },
    {
      name: "Education",
      subcategories: ["Online Courses", "Degree Programs", "Workshops"],
    },
  ];

  // Toggle category open/close
  const toggleCategory = (index) => {
    setOpenCategory(openCategory === index ? null : index);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (navbarRef.current && !navbarRef.current.contains(event.target)) {
        setOpenCategory(null); // Close the dropdown if clicked outside
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Toggle mobile menu visibility
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav ref={navbarRef} className="bg-blue-500 text-white px-4">
      <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
        <div className="relative flex items-center justify-between">
          {/* Logo / Title */}
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            <button
              onClick={toggleMobileMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white"
            >
              <span className="sr-only">Open main menu</span>
              {/* Mobile Menu Icon */}
              <svg
                className="block h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                ></path>
              </svg>
            </button>
          </div>

          {/* Desktop Menu */}
          <div className="hidden sm:flex items-center space-x-4">
            {categories.map((category, index) => (
              <div key={index} className="relative group">
                {/* Category Button */}
                <button
                  onClick={() => toggleCategory(index)} // Toggle category on click
                  className="text-white px-3 py-2 text-sm font-medium hover:bg-blue-700 rounded-md"
                >
                  {category.name}
                </button>

                {/* Subcategories Dropdown */}
                {openCategory === index && (
                  <div className="absolute left-0 w-48 mt-2 origin-top-left rounded-md bg-white text-black shadow-lg transition-opacity duration-300 ease-in-out">
                    <div className="py-2">
                      {category.subcategories.map((subcategory, subIndex) => (
                        <a
                          key={subIndex}
                          href="#"
                          className="block px-4 py-2 text-sm hover:bg-blue-100"
                        >
                          {subcategory}
                        </a>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Mobile Menu (visible on small screens) */}
          <div className={`sm:hidden ${isMobileMenuOpen ? "block" : "hidden"}`}>
            <div className="space-y-2">
              {categories.map((category, index) => (
                <div key={index} className="relative">
                  <button
                    onClick={() => toggleCategory(index)} // Toggle category on click
                    className="w-full text-white px-4 py-2 text-sm font-medium hover:bg-blue-700 rounded-md"
                  >
                    {category.name}
                  </button>

                  {/* Subcategories Dropdown */}
                  {openCategory === index && (
                    <div className="bg-white text-black rounded-md shadow-lg">
                      <div className="py-2">
                        {category.subcategories.map((subcategory, subIndex) => (
                          <a
                            key={subIndex}
                            href="#"
                            className="block px-4 py-2 text-sm hover:bg-blue-100"
                          >
                            {subcategory}
                          </a>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default SubNavbar;


