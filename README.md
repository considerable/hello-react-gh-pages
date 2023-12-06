# Hello React App with AskButton.js

## Overview

This repository contains a simple React application with an `AskButton.js` component. When the user clicks the "Ask" button, the app makes an HTTP request to an AWS Lambda URL, processes the response, and updates the UI with the received data.

## How It Works

The user interacts with the GitHub Pages-hosted React app and clicks the "Ask" button.

```mermaid
sequenceDiagram
  participant User
  participant GitHubPages
  participant AWSLambda

  User->>GitHubPages: Clicks "Ask" button
  GitHubPages->>AWSLambda: HTTP Request

  activate AWSLambda
  AWSLambda-->>GitHubPages: JSON Response
  deactivate AWSLambda

  GitHubPages-->>User: Updates UI with Response
