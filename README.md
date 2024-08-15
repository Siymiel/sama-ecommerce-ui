# Simple eCommerce Application

This is a simple eCommerce web application that sells clothing items. The application is built using React for the frontend, Material UI for styling, and Stripe for payment processing.

## Features

- **Product Search**: Users can search for products by name or description.
- **Product Filtering**: Users can filter products by categories, price range, and other attributes.
- **Product Sorting**: Users can sort products by `newest`, `price(asc)` and `price(desc)`.
- **Add to Cart**: Users can add products to their shopping cart.
- **Persistent Cart State**: The application maintains the state of the cart using local storage. When a user reloads the page, the cart state is preserved.
- **Checkout with Stripe**: Users can securely checkout and make payments using Stripe.

## Getting Started

To get started with this application, follow the steps below:

### Prerequisites

- Node.js and npm installed on your machine.

### Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/yourusername/simple-ecommerce.git
    ```

2. Navigate to the project directory:

    ```bash
    cd sama-ecommerce-ui
    ```

3. Install the necessary dependencies:

    ```bash
    npm install
    ```

### Running the Application

To start the application, run:

```bash
npm start
