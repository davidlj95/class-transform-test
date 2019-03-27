import "reflect-metadata";
import "es6-shim";
import {plainToClass, Type} from "class-transformer";
import {IsNotEmpty, ValidateNested} from "class-validator";
import {transformAndValidateSync} from "class-transformer-validator";

// Sample class
class Address {

    @IsNotEmpty() public city: string;

    constructor(public street: string,
                city: string) {
        this.city = city;
    }

    isNear() {
        return this.city === "Andorra"
    }
}

// Sample class with a nested type
class User {
    @Type(() => Address)
    @ValidateNested()
    public address: Address;

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

// Some valid users
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

// Parse them!
try {
    console.info("Will it automagically create the objects from plain JSONs?\n");
    const users = plainToClass(User, usersData);
    users.forEach((user) => {
        console.log(`${user.firstName} is ${user.isAdult() ? "adult" : "young or elder"}`);
        console.log(`   and lives in ${user.address.city} (near: ${user.address.isNear()})`)
    });
    console.info("\nYeahh!\n")
} catch (error) {
    console.error(error);
    console.info("\nNope :(\n");
}

// Now some invalid
let invalidUsersData = [
    {
        "id": 2,
        "firstName": "Maria Lluïsa",
        "lastName": "Plana",
        "age": 26,
        "address": {
            "street": "Fake"
            // I will skip the city because reasons (make it fail)
        }
    }
];

console.info("Will it detect now a failure inside a detected object?");
try {
    const users = transformAndValidateSync(User, invalidUsersData);
    console.info("\nNope, error was not found\n");
} catch (error) {
    console.error(error);
    console.info("\nSeems so!!!\n")
}
