# Milestone 3

## Server Documentation

## Collection

### User Table
| Column        | Data Type | Description                   |
|---------------|-----------|-------------------------------|
| Email         | Text      | Registered email              |
| Password      | Text[]    | Salt & (encoded) password     |
| Name          | Text      | User's name                   |
| totalClubs    | int       | Total number of clubs joined  |
| totalPosts    | int       | Total number of posts posted  |
| friends       | User[]    | Users the user friended       |
| clubs         | Club[]    | Clubs the user joined         |
| posts         | Text[]    | Posts the user posted         |

### Club Table
| Column        | Data Type | Description                   |
|---------------|-----------|-------------------------------|
| Email         | Text      | Registered email              |
| Password      | Text[]    | Salt & (encoded) password     |
| Name          | Text      | Club's name                   |
| likes         | Int       | Times an user likes the club  |
| members       | User[]    | total number of posts posted  |
| posts         | Text[]    | posts the club posted         |

## Division of Labor
- Gary Szekely
    - 

- Dang Le Nguyen
    - 

## [Heroku Link]([insert link here])
