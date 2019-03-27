import "reflect-metadata";
import "es6-shim";
import {plainToClass, Type} from "class-transformer";

class Address {
    constructor(public street: string, public city: string) {
    }

    isNear() {
        return this.city === "Andorra"
    }
}

class User {
    @Type(() => Address) public address: Address;

    constructor(
        public id: number,
        public firstName: string,
        public lastName: string,
        public age: number,
        address: Address) {
        this.address = address;
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
        "age": 27,
        "address": {
            "street": "Elm",
            "city": "London"
        }
    },
    {
        "id": 2,
        "firstName": "Ismoil",
        "lastName": "Somoni",
        "age": 50,
        "address": {
            "street": "Girona",
            "city": "Barcelona"
        }
    },
    {
        "id": 3,
        "firstName": "Luke",
        "lastName": "Dacascos",
        "age": 12,
        "address": {
            "street": "Unió",
            "city": "Andorra"
        }
    }];

const users = plainToClass(User, usersData);

users.forEach((user) => {
    console.log(`${user.firstName} is ${user.isAdult() ? "adult" : "young or elder"}`);
    console.log(`   and lives in ${user.address.city} (near: ${user.address.isNear()})`)
});
