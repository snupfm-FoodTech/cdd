# Customized Dietary Front-End

## Overview
This project is built using NextJs and aims to provide a flexible solution for managing diets

## Description
```
This section provides an overview of the Customized Dietary System designed for the organization. The Customized Dietary System is a customized dietary system aimed at enhancing the management of dietary plans for customer users within hospital settings. It serves as a critical tool for improving patient care by allowing users to create personalized meal plans, calculate the corresponding nutritional values, and estimate costs effectively.
The system integrates a user-friendly interface that enables customer users to easily navigate through various functionalities, such as selecting dietary standards and accessing nutritional information. Admin users from the Korean government will utilize the system to promote public health initiatives and disseminate valuable knowledge related to nutrition.
By leveraging this system, the organization aims to streamline dietary management processes, support informed decision-making, and foster healthier lifestyle choices among patients. The system is designed to be compliant with regulatory standards, ensuring that it meets the needs of both users and administrators while contributing to the overarching goals of improved health outcomes and operational efficiency within the healthcare environment.
```

## Getting started

```
git clone https://github.com/your-username/project-name.git
git checkout develop
npm i
npm run dev
```

## Project Structure
    .
    ├── public                   # Public files
    ├── env                      # Environment config files
    ├── src                      # Source files
    │   ├── api-client           # API files
    |   ├── atoms                # Reactive global state (Jotai atoms)    
    │   ├── app                  # Application files
    │   │   ├── (client)         # Client pages route
    │   │   │   ├── (auth)       # Authentication pages
    │   │   │   │   ├── change-password
    │   │   │   │   ├── login
    │   │   │   │   ├── policy
    │   │   │   │   ├── register
    │   │   │   │   └── layout.tsx
    │   │   │   └── (root)       # Root pages
    │   │   │       ├── client-info
    │   │   │       ├── corporate-archives
    │   │   │       ├── customer-support
    │   │   │       ├── diet-management
    │   │   │       ├── home
    │   │   │       ├── knowledge-archives
    │   │   │       └── layout.tsx
    │   │   ├── cms              # CMS pages route
    │   │   │   ├── (auth)       # Authentication pages for CMS
    │   │   │   │   ├── home
    │   │   │   │   └── layout.tsx
    │   │   │   └── (root)       # Root pages for CMS
    │   │   │       ├── company
    │   │   │       ├── faq
    │   │   │       ├── knowledge-archives
    │   │   │       ├── memberships
    │   │   │       ├── notices
    │   │   │       ├── qa-manage
    │   │   │       └── layout.tsx
    │   │   ├── global.css       # Global styles
    │   │   └── layout.tsx       # Layout project config file                 
    │   ├── assets               # Asset files
    │   ├── components           # Components used in the application
    │   │   ├── layout           # Layout components
    │   │   ├── modal            # Modal components
    │   │   ├── ui               # ShadCN UI components
    │   │   └── tsx files        # Custom TSX components       
    │   ├── constants            # Constants used throughout the project
    │   ├── hooks                # Custom hooks
    │   ├── lib                  # Library files
    │   ├── types                # Type definitions
    │   ├── utils                # Utility functions
    │   └── middleware.ts        # Authorization middleware               
    ├── .prettierrc.json         # Configuration for code formatting
    ├── package-lock.json        # Locked versions of project dependencies
    ├── package.json             # Project dependencies and scripts
    ├── README.md                # Project documentation
    ├── tailwind.config.ts       # Tailwind CSS configuration file
    └── tsconfig.json            # TypeScript configuration file
