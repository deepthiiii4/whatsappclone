# WhatsApp Clone

This is a full-stack WhatsApp Clone application built with Next.js. The application features real-time messaging, authentication, media sharing, and more. It integrates multiple services like Clerk for authentication, Convex for the backend, ZEGOCLOUD for real-time messaging, and OpenAI's ChatGPT and DALL·E for advanced features.

## Features

- Real-time messaging using ZEGOCLOUD.
- Authentication via Clerk.
- Backend services powered by Convex.
- Integration with OpenAI's ChatGPT for conversational AI.
- DALL·E API integration for image generation.
- Responsive design.

## Technologies Used

- **Next.js**: Frontend framework.
- **Clerk**: User authentication and management.
- **Convex**: Serverless backend for real-time data.
- **ZEGOCLOUD**: Real-time messaging platform.
- **OpenAI**: ChatGPT and DALL·E APIs for advanced features.
- **Node.js**: Backend runtime.
- **TypeScript**: Static typing.

## Prerequisites

Before running the project, ensure that you have the following installed:

- **Node.js**: v20.17.0 or higher.
- **npm** or **yarn**: For managing dependencies.
- **Git**: Version control system.
- A **Clerk** account and API keys.
- A **Convex** project with necessary authentication setup.
- **ZEGOCLOUD** credentials.
- OpenAI API keys for ChatGPT and DALL·E.

## Getting Started

To run the project locally, follow these steps:

1. Clone the repository:
    ```bash
    git clone https://github.com/your-username/whatsapp-clone.git
    cd whatsapp-clone
    ```

2. Install the dependencies:
    ```bash
    npm install
    # or
    yarn install
    ```

3. Set up environment variables:

   Create a `.env.local` file in the root of the project and add the following environment variables:

    ```bash
    NEXT_PUBLIC_CLERK_FRONTEND_API=<your_clerk_frontend_api>
    CLERK_API_KEY=<your_clerk_backend_api_key>
    NEXT_PUBLIC_ZEGOCLOUD_APP_ID=<your_zegocloud_app_id>
    NEXT_PUBLIC_ZEGOCLOUD_SERVER_SECRET=<your_zegocloud_server_secret>
    NEXT_PUBLIC_CONVEX_URL=<your_convex_url>
    OPENAI_API_KEY=<your_openai_api_key>
    ```

4. Run the development server:
    ```bash
    npm run dev
    # or
    yarn dev
    ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser to view the app.

## Project Structure

- **app/**: Contains the Next.js application pages.
- **components/**: Reusable UI components.
- **lib/**: Configuration files and helper functions.
- **pages/**: API routes and middleware.
- **public/**: Static files like images and fonts.
- **styles/**: CSS and SCSS files for styling.
- **utils/**: Utility functions used throughout the app.

## Authentication

This project uses Clerk for authentication. The sign-in URL is pre-configured, and unauthenticated users are redirected to the sign-in page.

## Backend

Convex handles the backend logic for this application. Ensure that you configure your Convex project properly and include the correct API keys in your `.env.local` file.

## Deployment

To deploy the application:

1. Use platforms like **Vercel** or **Netlify** to easily deploy your Next.js app.
2. Ensure that all environment variables from `.env.local` are configured in the deployment settings.

For more detailed deployment instructions, refer to the [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying).

## Additional Resources

- [Next.js Documentation](https://nextjs.org/docs) - Learn more about Next.js features and API.
- [Clerk Documentation](https://clerk.dev/docs) - Learn more about user authentication and management.
- [Convex Documentation](https://docs.convex.dev/) - Learn more about Convex backend services.
- [ZEGOCLOUD Documentation](https://www.zegocloud.com/docs) - Learn more about real-time messaging integration.
- [OpenAI Documentation](https://beta.openai.com/docs/) - Learn more about integrating ChatGPT and DALL·E APIs.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
