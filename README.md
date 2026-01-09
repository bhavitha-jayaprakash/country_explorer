# Country Explorer

## Project Overview
A comprehensive Country Explorer application built with Next.js and TypeScript. It allows users to browse data from the REST Countries API with a focus on performance, responsiveness, and user experience.

### Features
* Homepage: List of all countries using ISR (Incremental Static Regeneration).
* Search and Filter: Real-time search by name and filtering by region.
* Infinite Scroll: Batched rendering of country cards for better performance.
* Detail Pages: Dynamic routing for specific country data and border navigation.
* Theme Toggle: Dark and Light mode persistence using Zustand.
* Favorites System: Save and manage favorite countries via Local Storage.
* Comparison Tool: Side-by-side comparison of two selected countries.

## Tech Stack
* Framework: Next.js 15 (App Router)
* State Management: Zustand
* Styling: Tailwind CSS
* Animations: Framer Motion
* Language: TypeScript

## Setup and Installation

1. Clone the repository using git clone followed by your repository link.
2. Install dependencies by running npm install in your terminal.
3. Start the development server by running npm run dev.
4. Open http://localhost:3000 in your browser to view the app.
5. To create a production build, use the command npm run build.

## Approach and Architecture
The app uses a hybrid rendering strategy: ISR for the main list to ensure speed and SSR for detail pages to handle dynamic data. I utilized Zustand middleware for state persistence, ensuring user preferences like themes and favorites remain intact across sessions. To maintain a smooth UI with over 200 data points, I implemented an Intersection Observer for infinite scrolling, which significantly reduces the initial DOM load.

## Challenges and Solutions
* Hydration Errors: Accessing Local Storage during the initial render caused mismatches between server and client. I resolved this by implementing mount-tracking with useEffect to ensure client-side state only loads after the component is hydrated.
* API Inconsistency: Some countries lacked specific data like area or borders. I implemented strict TypeScript interfaces and fallback UI strings (N/A) to handle these null/undefined cases gracefully.
* Layout Shifts: Image loading for flags occasionally caused shifts. I used fixed aspect ratios and relative containers to reserve space during the loading state.

## Assumptions and Improvements
* Assumptions: Users prioritize common names over official names for searching. CCA3 codes are used as unique identifiers for all internal routing and favorite logic.
* Future Improvements: Adding unit tests for the filtering logic and integrating TanStack Query for more advanced server-side caching and revalidation.