# Milestone 3

## Collections

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

## Heroku
https://floating-basin-00309.herokuapp.com/

## Division of Labor
Gary Szekely
- Landing Page Backend
- Find Members Page Backend
- Find Friends/Clubs Page Backend
- Club Profile Page Backend
- Student Profile Pages Backend
- Create/Read Operations for Student, Club, and Posts
- Login/Logout
- Signup

Dang Le Nguyen
- Student Home Page Backend
- Student Personal Page Backend
- Club Home Page Backend
- Club Personal Page Backend
- Some database modifications
