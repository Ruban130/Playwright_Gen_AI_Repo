FROM mcr.microsoft.com/playwright:v1.40.0-focal

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy source code
COPY . .

# Install Playwright browsers
RUN npx playwright install --with-deps

# Default command
CMD ["npm", "test"]
