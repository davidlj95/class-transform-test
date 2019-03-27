import "reflect-metadata";
import "es6-shim";
import {plainToClass} from "class-transformer";

class User {
    id: number;
    firstName: string;
    lastName: string;
    age: number;

    constructor(id: number, firstName: string, lastName: string, age: number) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.age = age;
    }


    getName() {
        return this.firstName + " " + this.lastName;
    }

    isAdult() {
        return this.age > 36 && this.age < 60;
    }
}

let usersData = [
    {
        "id": 1,
        "firstName": "Johny",
        "lastName": "Cage",
        "age": 27
    },
    {
        "id": 2,
        "firstName": "Ismoil",
        "lastName": "Somoni",
        "age": 50
    },
    {
        "id": 3,
        "firstName": "Luke",
        "lastName": "Dacascos",
        "age": 12
    }];

const users = plainToClass(User, usersData);

users.forEach((user) => { console.log(user.isAdult())});
