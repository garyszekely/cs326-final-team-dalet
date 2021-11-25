# Milestone 3

## Collections

### Student Collection
| Field         | Data Type | Description                   |
|---------------|-----------|-------------------------------|
| email         | Text      | Registered email              |
| password      | Text[]    | Salt & (encoded) password     |
| name          | Text      | User's name                   |
| friends       | Text[]    | Users the user friended       |
| clubs         | Text[]    | Clubs the user joined         |
| posts         | _id[]     | Posts the user posted         |

### Club Collection
| Column        | Data Type | Description                   |
|---------------|-----------|-------------------------------|
| email         | Text      | Registered email              |
| password      | Text[]    | Salt & (encoded) password     |
| name          | Text      | Club's name                   |
| totalLikes    | Int       | Times an user likes the club  |
| members       | Text[]    | total number of posts posted  |
| posts         | _id[]     | posts the club posted         |

### Post Collection
| Column        | Data Type | Description                   |
|---------------|-----------|-------------------------------|
| name          | Text      | Name                          |
| text          | Text      | The text of the post          |
| timestamp     | Text      | Time of post                  |

## Heroku

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
