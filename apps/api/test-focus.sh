#!/bin/bash

# Start the server in the background
bun start src/server.ts &

# Wait for the server to start
sleep 5

# Test the /focus endpoint
curl -X POST http://localhost:3000/focus -H "Content-Type: application/json" -d '{"mode": "work"}'
