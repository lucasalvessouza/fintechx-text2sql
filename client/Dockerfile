FROM node:20-alpine
# Add a work directory
WORKDIR /app
# Cache and Install dependencies
COPY package.json .
RUN npm install
# Copy app files
COPY . .
# Expose port
EXPOSE 3001
RUN npm run build
# Start the app
CMD [ "npm", "start" ]