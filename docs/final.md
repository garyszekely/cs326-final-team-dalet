# Team Dalet Club Connect [Fall 2021]
## Overview
Our web application connects clubs on campus to individuals in a much more cohesive way. Clubs will be able to sign up and post about themselves and the various things they have to offer while students can browse through and select which clubs they would like to be a part of. This is related to other web applications as it functions like a Facebook Marketplace for clubs. People are able to freely browse from the comfort of their homes, the clubs on campus without feeling rushed or pressured to make a decision.
Unlike campus pulse where clubs are simply listed alphabetically, our application helps connect students to clubs dynamically by exposing clubs to students through their friends.

## Team Members
**Name:** Gary Szekely  
**GitHub Username:** garyszekely

**Name:** Dang Le Nguyen  
**GitHub Username:** DanGithub200, Dang592

## Division of Labor
### Gary Szekely
- HTML
    - Landing Page
    - Landing Page Signup Modals
    - Profile Interaction Pages
    - Find Clubs HTML
- Scripts
    - Landing Page Script
    - Profile Interaction Pages Scripts (Club, Club to Member, and Student to Student)
    - Find Clubs Scripts
    - APIs associated with above scripts
- Backend
    - Landing Page
    - Find Members Page
    - Find Friends/Clubs
    - Club Profile Page
    - Student Profile
- Create/Read Operations for Student, Club, and Posts
- Login/Logout
- Signup

## Dang Le Nguyen
- HTML
    - Home Pages
    - Personal Pages
    - Find Club Wireframe
- Scripts
    - parts of database.js
    - parts of server.js
- Backend
    - Student Home Page
    - Student Personal Page
    - Club Home Page
    - Club Personal Page

## User Interface:


## URL Routes / Mapping
| URL                 | Description                                         | 
|---------------------|-----------------------------------------------------|
| /                   | goes to landing page                                | 
| /home-page          | goes to their homepage                              |
| /personal-page      | goes to their personal page                         |
| /profile-page       | goes to their profile page                          |
| /find-friends-clubs | view the clubs of friends                           |
| /find-members       | for a club, view their members                      |
| /login              | performs authentication, go to home page or landing |
| /logout             | exits account                                       |
| /is-friend          | for students, check if user is a friend             |
| /add-friend         | for students, add user as friend                    |
| /remove-friend      | for students, remove user as friend                 |
| /is-member          |for clubs, check if user is a member of club         |
| /join-club          | for student, join a club                            |
| /leave-club         | for student, leave a club                           |
| /like-club          | give a club a like                                  |
| /create-student     | create new student user                             |
| /read-student       | send student's information                          |
| /read-students      | send multiple students' information                 |
| /create-club        | create new club user                                |
| /read-club          | send club's information                             |
| /read-clubs         | send multiple clubs' information                    |
| /remove-member      | for clubs, remove a member                          |
| /create-post        | create a post                                       |
| /read-posts         | read posts                                          |
| /update-post        | edit a post                                         |
| /delete-post        | delete post                                         |

## Database:
### Student Collection
| Field         | Data Type | Description                   |
|---------------|-----------|-------------------------------|
| email         | Text      | Registered email              |
| password      | Text[]    | Salt & (encoded) password     |
| name          | Text      | User's name                   |
| bio           | Text      | User's introduction           |
| joined        | Date      | User's joined date            |
| friends       | Text[]    | Users the user friended       |
| clubs         | Text[]    | Clubs the user joined         |
| posts         | _id[]     | Posts the user posted         |

### Club Collection
| Column        | Data Type | Description                   |
|---------------|-----------|-------------------------------|
| email         | Text      | Registered email              |
| password      | Text[]    | Salt & (encoded) password     |
| name          | Text      | Club's name                   |
| bio           | Text      | Club's introduction           |
| totalLikes    | Int       | Times an user likes the club  |
| joined        | Date      | User's joined date            |
| members       | Text[]    | Total number of posts posted  |
| posts         | _id[]     | Posts the club posted         |
| meeting       | Text      | When to members meet          |
| contact       | Text      | Contact club leaders (phone #)|
| location      | Text      | Location of meeting           |

### Post Collection
| Column        | Data Type | Description                   |
|---------------|-----------|-------------------------------|
| name          | Text      | Name                          |
| text          | Text      | The text of the post          |
| timestamp     | Text      | Time of post                  |


## API
MongoDB
Heroku

## Authentication

## Conclusion
We felt we should have more rigorously planned out our project so that there would be less changes from our vision to the final product, which wasted our time.

## Heroku Link
https://floating-basin-00309.herokuapp.com/

## Rubric

## Video

