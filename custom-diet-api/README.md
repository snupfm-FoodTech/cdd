# Customized Dietary Back-End

## Overview
This project is built using the eGovFramework and aims to provide a flexible solution for managing diets

## Description
```
This section provides an overview of the Customized Dietary System designed for the organization. The Customized Dietary System is a customized dietary system aimed at enhancing the management of dietary plans for customer users within hospital settings. It serves as a critical tool for improving patient care by allowing users to create personalized meal plans, calculate the corresponding nutritional values, and estimate costs effectively.
The system integrates a user-friendly interface that enables customer users to easily navigate through various functionalities, such as selecting dietary standards and accessing nutritional information. Admin users from the Korean government will utilize the system to promote public health initiatives and disseminate valuable knowledge related to nutrition.
By leveraging this system, the organization aims to streamline dietary management processes, support informed decision-making, and foster healthier lifestyle choices among patients. The system is designed to be compliant with regulatory standards, ensuring that it meets the needs of both users and administrators while contributing to the overarching goals of improved health outcomes and operational efficiency within the healthcare environment.
```

## Getting started

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/project-name.git
   cd project-name
2. Set up PostgreSQL:
- **Create a new PostgreSQL database for the project. You can do this with the following commands:**
    ```bash
    psql -U postgres
    CREATE DATABASE your_database_name;
- **Update the database connection settings in src/main/resources/application.properties:**:
    ```bash
    Globals.postgresql.DriverClassName=org.postgresql.Driver
    Globals.postgresql.Url=jdbc:postgresql://localhost:5432/your_database_name
    Globals.postgresql.UserName=your_username
    Globals.postgresql.Password=your_password
3. Build the project: Run the following command to build the project:
    ```bash
    mvn clean install
4. Run the project: Once the build is complete, you can run the project using the following command:
    ```bash
    mvn spring-boot:run
5. Access the application: Open your browser and navigate to:
    ```bash
    http://localhost:8080

## Project Structure
    .
    ├── src/
    │   ├── main/
    │   │   ├── java/
    │   │   │   └── egovframework/
    │   │   │       ├── com/                         
    │   │   │       │   ├── cmm/                    # Common files
    │   │   │       │   │   ├── aop/                # Spring AOP (audit entity & authorization)
    │   │   │       │   │   ├── dto/                # Common DTO (data transfer objects)
    │   │   │       │   │   ├── entity/             # Common entities
    │   │   │       │   │   ├── exception/          # Global exception handlers
    │   │   │       │   │   ├── interceptor/        # Interceptors to perform an action
    │   │   │       │   │   ├── service/            # Common services
    │   │   │       │   │   ├── util/               # Utility classes
    │   │   │       │   │   └── validation/         # Validation (annotations and validators for handling mapping from requests)
    │   │   │       │   └── config/                 # Contain project configurations
    │   │   │       │       ├── caching/            # Caching (Caffeine library)
    │   │   │       │       ├── mapper/             # Provide mapping between objects in Model Mapping
    │   │   │       │       └── mybatis/            # Mapping json result from database query to object
    │   │   │       ├── jwt/                        # JWT Filter (check auth token)
    │   │   │       └── security/                   # Spring Security
    │   │   │       └── let/                        # Contain all components (each component will have controller, service, entity, dao, etc.)
    │   │   │           ├── auth/                   # Auth folder (login, register, verify email)
    │   │   │           ├── company/                # Company component
    │   │   │           ├── consult_request/        # Consulting request component     
    │   │   │           ├── diet/                   # Diet component
    │   │   │           ├── faq/                    # FAQ component
    │   │   │           ├── file/                   # File component
    │   │   │           ├── knowledge/              # Knowledge component
    │   │   │           ├── mail/                   # Mail component
    │   │   │           ├── notice/                 # Notice component
    │   │   │           ├── open/                   # Open component    
    │   │   │           ├── role/                   # Role component
    │   │   │           ├── solution/               # Solution component
    │   │   │           ├── user/                   # User component
    │   │   │           └── user_question/          # User question component
    │   │   ├── resources/
    │   │   │   ├── egovframework/
    │   │   │   │   ├── mapper/   
    │   │   │   │   │   ├── config/                 # Mapper configuration (alias)
    │   │   │   │   │   └── let/                    # Container all SQL mappings for each component
    │   │   │   │   └── message/                    # Message source (korean & english)
    │   │   │   ├── templates/                      # Mail templates
    │   │   │   ├── uploads/                        # Uploaded files from users
    │   │   │   ├── application.properties          # Properties definition for project
    │   │   │   └── logback-spring.xml              # Logging configuration
    ├── log                                         # Logged files
    └── pom.xml                                     # Maven configuration file that manages dependencies and build settings.