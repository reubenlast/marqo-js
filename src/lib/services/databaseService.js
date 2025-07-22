"use client";

// Mock database with sample data
const mockDatabase = {
  db: {
    class: {
      car: {
        hyundai: {
          has: {
            wheel: {
              all: "The Hyundai car model has 4 wheels with advanced suspension system.",
              front:
                "The front wheels of Hyundai car are 18 inches in diameter.",
              rear: "The rear wheels of Hyundai car are 19 inches in diameter.",
            },
            engine: {
              type: "The Hyundai car has a V6 turbocharged engine.",
              power: "The engine produces 350 horsepower and 400 Nm of torque.",
            },
          },
          specs: {
            dimensions: "Length: 4.8m, Width: 1.9m, Height: 1.4m",
            weight: "1,650 kg",
            topSpeed: "250 km/h",
          },
        },
        sedan: {
          has: {
            wheel: {
              all: "The Sedan model has 4 wheels with standard suspension.",
              size: "17 inches in diameter",
            },
          },
        },
        // Example table data: list of car models
        models: [
          {
            name: "Hyundai Elantra",
            year: 2022,
            engine: "2.0L I4",
            horsepower: 147,
            price: "$20,000",
          },
          {
            name: "Hyundai Sonata",
            year: 2023,
            engine: "1.6L Turbo I4",
            horsepower: 180,
            price: "$24,500",
          },
          {
            name: "Hyundai Tucson",
            year: 2023,
            engine: "2.5L I4",
            horsepower: 187,
            price: "$27,000",
          },
        ],
      },
      bike: {
        mountain: {
          has: {
            wheel: {
              all: "Mountain bikes typically have 2 wheels with thick treads for off-road use.",
              size: "26-29 inches in diameter",
            },
            frame: {
              material:
                "Aluminum or carbon fiber frame for durability and light weight.",
            },
          },
        },
      },
    },
    product: {
      electronics: {
        smartphone: {
          specs: {
            display: "6.7 inch OLED display with 120Hz refresh rate",
            processor: "Octa-core processor with 8GB RAM",
            battery: "5000mAh battery with fast charging support",
          },
        },
      },
    },
  },
};

// Function to parse data link and retrieve data
export const getDataFromLink = (link) => {
  if (!link) return null;

  // Remove the angle brackets
  const cleanLink = link.replace(/[<>]/g, "");

  // Split by dots to navigate through the object
  const path = cleanLink.split(".");

  // Check for table() with optional filter, e.g., table(key1,key2)
  const tableMatch = path[path.length - 1].match(/^table\(([^)]*)\)$/);
  if (tableMatch) {
    // Extract filter keys if provided
    const filterKeys = tableMatch[1]
      ? tableMatch[1].split(",").map((k) => k.trim()).filter(Boolean)
      : null;
    // Remove 'table(...)' from path
    const arrayPath = path.slice(0, -1).join(".");
    const arr = getArrayFromPath(arrayPath);
    if (arr && Array.isArray(arr)) {
      const headers = filterKeys && filterKeys.length
        ? filterKeys
        : Object.keys(arr[0] || {});
      const headerRow = `| ${headers.join(" | ")} |`;
      const separatorRow = `| ${headers.map(() => "---").join(" | ")} |`;
      const dataRows = arr.map(
        (item) => `| ${headers.map((h) => item[h] ?? "").join(" | ")} |`
      );
      return [headerRow, separatorRow, ...dataRows].join("\n");
    } else {
      return `No array data found at path: ${arrayPath}`;
    }
  }
  // If the last part is 'table()', handle it as a special case
  if (path[path.length - 1] === "table()") {
    // Remove 'table' from path
    const arrayPath = path.slice(0, -1).join(".");
    const arr = getArrayFromPath(arrayPath);
    if (arr && Array.isArray(arr)) {
      // Generate a simple markdown table
      const headers = Object.keys(arr[0] || {});
      const headerRow = `| ${headers.join(" | ")} |`;
      const separatorRow = `| ${headers.map(() => "---").join(" | ")} |`;
      const dataRows = arr.map(
        (item) => `| ${headers.map((h) => item[h]).join(" | ")} |`
      );
      return [headerRow, separatorRow, ...dataRows].join("\n");
    } else {
      return `No array data found at path: ${arrayPath}`;
    }
  }

  // Navigate through the object to find the data
  let result = mockDatabase;
  for (const key of path) {
    if (result && result[key]) {
      result = result[key];
    } else {
      return `Data not found for path: ${cleanLink}`;
    }
  }

  return typeof result === "string" ? result : JSON.stringify(result, null, 2);
};

// Function to check if a string is a data link
export const isDataLink = (text) => {
  return /^<db\..+>$/.test(text);
};

// Function to extract all data links from text
export const extractDataLinks = (text) => {
  const regex = /<db\.[^>]+>/g;
  return text.match(regex) || [];
};

// Function to get all available database paths
export const getAllDatabasePaths = (
  obj = mockDatabase,
  prefix = "",
  paths = []
) => {
  if (typeof obj !== "object" || obj === null) {
    if (prefix) paths.push(prefix);
    return paths;
  }
  if (Array.isArray(obj)) {
    if (prefix) paths.push(prefix);
    return paths;
  }
  Object.keys(obj).forEach((key) => {
    const newPrefix = prefix ? `${prefix}.${key}` : key;
    if (typeof obj[key] === "object" && obj[key] !== null) {
      getAllDatabasePaths(obj[key], newPrefix, paths);
    } else {
      paths.push(newPrefix);
    }
  });

  return paths;
};

/**
 * Get array from mockDatabase by dot-separated path.
 * Returns the array if found, otherwise null.
 * Example: getArrayFromPath("db.class.car.models")
 */
export const getArrayFromPath = (path) => {
  if (!path) return null;
  const keys = path.split(".");
  let result = mockDatabase;
  for (const key of keys) {
    if (result && result[key] !== undefined) {
      result = result[key];
    } else {
      return null;
    }
  }
  return Array.isArray(result) ? result : null;
};

// Function to search database paths
export const searchDatabasePaths = (query) => {
  if (!query) return [];
  const allPaths = getAllDatabasePaths();
  return allPaths.filter((path) =>
    path.toLowerCase().includes(query.toLowerCase())
  );
};

// Function to get a preview of data at a path
export const getDataPreview = (path) => {
  const data = getDataFromLink(`<${path}>`);
  if (typeof data === "string" && data.length > 100) {
    return data.substring(0, 100) + "...";
  }
  return data;
};

// Function to check if a path is an array in the mockDatabase
export const isDataPathArray = (path) => {
  if (!path) return false;
  const cleanPath = path.replace(/[<>]/g, "");
  const paths = cleanPath.split(".");
  let result = mockDatabase;
  for (const key of paths) {
    if (result && result[key] !== undefined) {
      result = result[key];
    } else {
      return false;
    }
  }
  return Array.isArray(result);
};

// Function to replace data links in text with actual data
export const replaceDataLinksInText = (text) => {
  if (!text) return text;
  const links = extractDataLinks(text);
  let replaced = text;
  links.forEach((link) => {
    // If the link is wrapped in //, remove the backslashes and do not replace with data
    if (replaced.includes(`/${link}/`)) {
      replaced = replaced.replace(`/${link}/`, link);
      return;
    }
    const value = getDataFromLink(link);
    replaced = replaced.replace(link, value);
  });
  return replaced;
};
