# Afghan Proverbs & Sayings Application

A beautiful React application that showcases and manages Afghan proverbs and sayings in multiple languages.

## Features

- View a collection of Afghan proverbs in Dari, Pashto, and English
- See detailed information about each proverb, including cultural context and meaning
- Add new proverbs to the collection
- Edit existing proverbs
- Delete proverbs
- Filter proverbs by category
- Search across all languages
- View a random proverb feature

## Technologies Used

- React
- React Router for navigation
- Axios for API requests
- CSS for styling (no frameworks)
- Lucide React for icons

## Setup Instructions

### Backend Setup

1. Clone the backend API repository:

   ```
   git clone https://github.com/ladymary99/Afghan-proverbs-api.git
   ```

2. Navigate to the backend directory:

   ```
   cd Afghan-proverbs-api
   ```

3. Install dependencies:

   ```
   npm install
   ```

4. Start the backend server:
   ```
   npm start
   ```

The API should now be running on `http://localhost:3000`.

### Frontend Setup

1. Clone this repository
2. Install dependencies:
   ```
   npm install
   ```
3. Start the development server:
   ```
   npm run dev
   ```
4. Open your browser and navigate to the URL shown in your terminal

## API Endpoints

The application interacts with the following endpoints:

- `GET /proverbs` - Get all proverbs
- `GET /proverbs/:id` - Get a single proverb by ID
- `GET /proverbs/random` - Get a random proverb
- `POST /proverbs` - Add a new proverb
- `PUT /proverbs/:id` - Update an existing proverb
- `DELETE /proverbs/:id` - Delete a proverb
- `GET /proverbs?category=wisdom` - Filter proverbs by category

## Bonus Features Implemented

- Filter proverbs by category
- Display a random proverb
- Search functionality across all languages

## Screenshots

[Include screenshots or a link to a live demo when available]

## Future Enhancements

- Multi-language interface
- User authentication
- Favorites/bookmarking system
- Audio pronunciations
- Share proverbs on social media

## License

MIT
