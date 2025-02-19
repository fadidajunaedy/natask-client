# Natask

Natask is a web-based task management platform designed to help teams efficiently assign, track, and manage tasks in real-time (in progress...), enhancing productivity and collaboration. This repository contains the frontend of Natask, built with modern web technologies.

## Features

- **Landing Page**: Showcases the platform’s features and benefits.
- **User Authentication**: Register, Login, Forgot Password, dan Reset Password.
- **Dashboard**: Simple UI for task management.
- **Employee Management**: Create, Read, Update, Delete.
- **Task & Subtask Management**: Create, Read, Update, Delete.
- **Real-time Updates**: Initially implemented with native WebSocket but requires third-party support due to Vercel limitations.

## Tech Stack

- **React.js**: Component-based UI development
- **Redux**: State management
- **Tailwind CSS**: Utility-first styling framework
- **Vite**: Fast development build tool
- **Axios**: API requests handling
- **Web Socket**: Client Server One Connection

### WebSocket Limitation on Vercel

Real-time task status updates were originally implemented using native WebSocket. However, Vercel does not natively support WebSocket connections. To enable real-time features in production, integrating a third-party WebSocket server (e.g., Supabase or Firebase) is necessary.

## Future Improvements

- Implement third-party WebSocket integration for real-time updates.
- Improve dashboard analytics and reporting.
- Enhance UI/UX for better user experience.

### Feel free to contribute and improve Natask! 🚀
