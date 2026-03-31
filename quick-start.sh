#!/bin/bash

# StackIt - Quick Start Script
# This script sets up and starts the entire application

echo "🚀 StackIt - Quick Start"
echo "===================================="

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo -e "${YELLOW}⚠️  Node.js is not installed${NC}"
    echo "Download from: https://nodejs.org"
    exit 1
fi

echo -e "${GREEN}✅ Node.js found: $(node --version)${NC}"

# Check if MongoDB is running
if ! command -v mongosh &> /dev/null; then
    echo -e "${YELLOW}⚠️  MongoDB CLI not found${NC}"
    echo "Assuming local MongoDB is running on port 27017"
else
    echo -e "${GREEN}✅ MongoDB CLI found${NC}"
fi

# Setup Backend
echo -e "\n${BLUE}📦 Setting up Backend...${NC}"
cd Backend
if [ ! -d "node_modules" ]; then
    echo "Installing backend dependencies..."
    npm install
else
    echo -e "${GREEN}✅ Backend dependencies already installed${NC}"
fi

# Check if .env exists
if [ ! -f ".env" ]; then
    echo "Creating .env file..."
    cp .env.example .env
    echo -e "${GREEN}✅ .env created${NC}"
else
    echo -e "${GREEN}✅ .env already exists${NC}"
fi

# Seed database if requested
read -p "Do you want to seed the database with sample data? (y/n) " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    echo "🌱 Seeding database..."
    node scripts/seedDatabase.js
    if [ $? -eq 0 ]; then
        echo -e "${GREEN}✅ Database seeded successfully${NC}"
    else
        echo -e "${YELLOW}⚠️  Database seeding failed (MongoDB may not be running)${NC}"
    fi
fi

# Setup Frontend
echo -e "\n${BLUE}📦 Setting up Frontend...${NC}"
cd ../frontend
if [ ! -d "node_modules" ]; then
    echo "Installing frontend dependencies..."
    npm install
else
    echo -e "${GREEN}✅ Frontend dependencies already installed${NC}"
fi

# Check if .env.local exists
if [ ! -f ".env.local" ]; then
    echo "Creating .env.local file..."
    cat > .env.local << EOF
VITE_API_URL=http://localhost:5000/api
VITE_SOCKET_URL=http://localhost:5000
EOF
    echo -e "${GREEN}✅ .env.local created${NC}"
else
    echo -e "${GREEN}✅ .env.local already exists${NC}"
fi

# Summary
echo -e "\n${GREEN}✅ Setup Complete!${NC}"
echo ""
echo -e "${BLUE}🚀 To start the application:${NC}"
echo ""
echo -e "${YELLOW}Terminal 1 (Backend):${NC}"
echo "  cd Backend"
echo "  npm run dev"
echo ""
echo -e "${YELLOW}Terminal 2 (Frontend):${NC}"
echo "  cd frontend"
echo "  npm run dev"
echo ""
echo -e "${YELLOW}Then open:${NC} http://localhost:5173"
echo ""
echo -e "${YELLOW}📝 Demo Credentials:${NC}"
echo "  Email: mike@example.com"
echo "  Password: Password123"
echo ""
echo -e "📖 For detailed setup guide, see: SETUP_GUIDE.md"
echo ""
